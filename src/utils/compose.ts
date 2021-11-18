export const compose = <TriggerType>(...fns: ((v: any) => any)[]) => (trigger: TriggerType): any => {
  return fns.reduceRight((temp, fn) => {
    return fn(temp);
  }, trigger)
}
