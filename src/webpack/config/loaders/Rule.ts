import { RuleSetConditionAbsolute, RuleSetRule } from 'webpack';
type RuleCondition = string | RegExp | ((value: string) => boolean) | RuleSetConditionAbsolute

export default class Rule {
  _options: RuleSetRule = {};

  static of() {
    return new Rule();
  }

  getOptions() {
    return this._options;
  }

  test(regexp: RegExp) {
    this._options.test = regexp;
    return this;
  }

  enforce(type: 'pre' | 'post') {
    this._options.enforce = type;
    return this;
  }

  include(path: RuleCondition) {
    if (!this._options.include) this._options.include = [];
    (this._options.include as Array<RuleCondition>).push(path);
    return this;
  }

  exclude(path: string) {
    if (!this._options.exclude) this._options.exclude = [];
    (this._options.exclude as Array<RuleCondition>).push(path);
    return this;
  }

  use(loader: any) {
    if (!this._options.use) this._options.use = [];
    (this._options.use as Array<RuleCondition>).unshift(loader);
    return this;
  }

  issuer(condition: RuleCondition) {
    if (!this._options.issuer) this._options.issuer = [];
    (this._options.issuer as Array<RuleCondition>).push(condition);
    return this;
  }

  layer(layer: string) {
    this._options.layer = layer;
  }

  issuerLayer(condition: RuleCondition) {
    if (!this._options.issuerLayer) this._options.issuerLayer = [];
    (this._options.issuerLayer as Array<RuleCondition>).push(condition);
    return this;
  }

  mimetype(mimetype: string) {
    this._options.mimetype = mimetype;
  }

}