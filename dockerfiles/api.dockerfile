###################
# Development stage
###################
FROM node:20.10.0-alpine as development

WORKDIR /app

COPY --chown=node:node api/package*.json ./

RUN npm ci --force

COPY --chown=node:node api/ ./

USER node


###################
# BUILD FOR PRODUCTION
###################

FROM node:20.10.0-alpine As build

WORKDIR /app

COPY --chown=node:node api/package*.json ./

# Copy node modeulse from previus stage 
COPY --chown=node:node --from=development /app/node_modules ./node_modules

COPY --chown=node:node api/ ./

# Run the build command which creates the production bundle
RUN npm run build

# Set NODE_ENV environment variable
ENV NODE_ENV production

# Running `npm ci` removes the existing node_modules directory and passing in --only=production ensures that only the production dependencies are installed. This ensures that the node_modules directory is as optimized as possible
RUN npm ci --only=production && npm cache clean --force

USER node







###################
# PRODUCTION
###################

FROM node:20.10.0-alpine As production

WORKDIR /app
# Copy the bundled code from the build stage to the production image
COPY --chown=node:node --from=build /app/node_modules ./node_modules
COPY --chown=node:node --from=build /app/dist ./dist

ENV NODE_ENV production
# Start the server using the production build
CMD [ "node", "dist/main.js" ]