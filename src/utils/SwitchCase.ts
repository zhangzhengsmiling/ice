export class SwitchCase<ConditionType, ResultType> {

  _map: Map<ConditionType, ResultType>;

  constructor(map: Map<ConditionType, ResultType>) {
    this._map = map;
  }

  static of<ConditionType, ResultType>() {
    return new SwitchCase(new Map<ConditionType, ResultType>());
  }

  case(condition: ConditionType, result: ResultType) {
    const _map = new Map(this._map);
    _map.set(condition, result);
    return new SwitchCase(_map);
  }

  switch(condition: ConditionType) {
    return this._map.get(condition);
  }
}
