export const curry = <RetType>(fn: (...args: unknown[]) => unknown, ...curryArgs: unknown[]) => {
  return (...args: unknown[]): RetType => {
    return fn(curryArgs, args) as RetType;
  };
};
