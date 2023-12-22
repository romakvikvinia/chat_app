#NGINX
FROM nginx:latest

RUN rm /etc/nginx/conf.d/default.conf

COPY config/nginx.conf /etc/nginx/conf.d/default.conf

COPY comingsoon/ /usr/share/nginx/html