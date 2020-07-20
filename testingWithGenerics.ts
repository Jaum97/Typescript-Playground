export interface IProps {}

export enum ParamTypes {
  BOOLEAN = "BOOLEAN",
  TIME = "TIME",
  MONEY = "MONEY",
  TEXT = "TEXT",
  NUMBER = "NUMBER",
}

export type ValidParamTypes = keyof typeof ParamTypes;

export type ValidParamValueTypes = "UNIQUE" | "INTERVAL";

export type ParamTypeToValueMap<T extends ValidParamTypes> = T extends "BOOLEAN"
  ? boolean
  : T extends "TIME"
  ? Date
  : T extends "MONEY"
  ? string
  : T extends "TEXT"
  ? string
  : T extends "NUMBER"
  ? number
  : any;

export interface IParameterItem<
  T extends ValidParamTypes = undefined,
  VT extends ValidParamValueTypes = undefined
> {
  name: string;
  description: string;
  type: ValidParamTypes;
  valueType: ValidParamValueTypes;
  value: ParamTypeToValueMap<T>;
}

export interface ParamIntervalObject {
  start: any;
  end: any;
}

const test: IParameterItem = {
    name: 'Banana Expiration Date',
    description: 'The date the banana goes yuck',
    type: 'TIME',
    valueType: 'UNIQUE',
    value: ''
}

const fn = <T extends IParameterItem<T['type'], T['valueType']>>(obj: T) => obj

const t00 = fn(test)
