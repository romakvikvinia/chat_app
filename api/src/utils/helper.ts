import * as bcrypt from 'bcrypt';

export async function hasPassword(password: string) {
  const salt = await bcrypt.genSalt();
  return await bcrypt.hash(password, salt);
}
