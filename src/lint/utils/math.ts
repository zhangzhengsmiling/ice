
export const max = (numbers: number[]) => {
  let _max = -Infinity;
  numbers.forEach(num => {
    _max = Math.max(num, _max);
  });
  return _max;
};
