export const space = (num: number) => {
  return new Array(num).fill(' ').join('');
}

export const padStart = (length: number, pattern: string) => {
  return (str: string) => {
    return str.padStart(length, pattern);
  }
}

export const padEnd = (length: number, pattern: string) => {
  return (str: string) => {
    return str.padEnd(length, pattern);
  }
}

export const toString = (target: { toString: () => string }): string => {
  return target.toString()
}
