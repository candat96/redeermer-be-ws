export function toArray(value: any) {
  if (Array.isArray(value)) return value;
  return [value];
}

export function toBoolean(data: string): boolean {
  const value = { true: true, false: false };
  return value[data];
}

export function generateRandomString(length: number): string {
  const lowercase = 'abcdefghijklmnopqrstuvwxyz';
  const uppercase = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
  const numbers = '0123456789';
  const specialChars = '!@#$%^&*()_+[]{}|;:,.<>?';
  const allChars = lowercase + uppercase + numbers + specialChars;

  const getRandomChar = (chars: string) =>
    chars[Math.floor(Math.random() * chars.length)];

  const requiredChars = [
    getRandomChar(lowercase),
    getRandomChar(uppercase),
    getRandomChar(numbers),
    getRandomChar(specialChars),
  ];

  for (let i = requiredChars.length; i < length; i++) {
    requiredChars.push(getRandomChar(allChars));
  }

  return requiredChars.sort(() => 0.5 - Math.random()).join('');
}
