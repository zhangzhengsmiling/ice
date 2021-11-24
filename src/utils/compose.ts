export const compose = <TriggerType, RetType>(...fns: unknown[]) =>
  (trigger: TriggerType) => {
    return fns.reduceRight((temp, fn) => {
      if (typeof fn === 'function')
        return fn(temp);
      else return temp;
    }, trigger) as RetType;
  };
