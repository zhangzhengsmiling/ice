export const curry = <RetType>(fn: Function, ...curryArgs: any[]) => {
  return (...args: any[]): RetType => {
    return fn(curryArgs, args);
  };
};
