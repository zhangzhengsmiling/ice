
export const max = (nums: number[]) => {
  let _max = -Infinity;
  nums.forEach(num => {
    _max = Math.max(num, _max);
  })
  return _max;
}
