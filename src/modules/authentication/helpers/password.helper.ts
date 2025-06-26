import * as bcrypt from 'bcrypt';

export async function hashPassword(
  password: string,
  saltOrRounds: number = 10,
): Promise<string> {
  return await bcrypt.hash(password, saltOrRounds);
}

export async function comparePassword(
  password: string,
  hash: string,
): Promise<boolean> {
  return await bcrypt.compare(password, hash);
}
