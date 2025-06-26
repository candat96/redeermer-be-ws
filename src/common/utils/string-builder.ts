export class StringBuilder {
  private arrayString = [];

  constructor(initializeString?: string) {
    this.arrayString.push(initializeString);
  }

  append = (value: string): StringBuilder => {
    if (value) {
      this.arrayString.push(value);
    }
    return this;
  };

  clear() {
    this.arrayString.length = 1;
    return this;
  }

  toString = () => {
    return this.arrayString.join('');
  };
}
