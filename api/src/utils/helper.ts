import * as bcrypt from 'bcrypt';

export async function hasPassword(password: string) {
  const salt = await bcrypt.genSalt();
  return await bcrypt.hash(password, salt);
}

export async function compareHash(password, hasPassword) {
  return bcrypt.compare(password, hasPassword);
}
