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

export type ParamTypeToObjectValueMap<
  T extends ValidParamTypes,
  VT extends ValidParamValueTypes = undefined
> = T extends "BOOLEAN"
  ? boolean
  : T extends "TIME"
  ? VT extends "INTERVAL"
    ? ParamIntervalObject<T>
    : Date
  : T extends "MONEY"
  ? VT extends "INTERVAL"
    ? ParamIntervalObject<T>
    : string
  : T extends "TEXT"
  ? VT extends "INTERVAL"
    ? ParamIntervalObject<T>
    : string
  : T extends "NUMBER"
  ? VT extends "INTERVAL"
    ? ParamIntervalObject<T>
    : number
  : any;

export interface IParameterItem<
  T extends ValidParamTypes = undefined,
  VT extends ValidParamValueTypes = undefined
> {
  name: string;
  description: string;
  type: ValidParamTypes;
  valueType: ValidParamValueTypes;
  value: ParamTypeToObjectValueMap<T, VT>;
}

export interface ParamIntervalObject<T extends ValidParamTypes = undefined> {
  start: ParamTypeToObjectValueMap<T>;
  end: ParamTypeToObjectValueMap<T>;
}

const test = {
  name: "Banana Expiration Date",
  description: "The date the banana goes yuck",
  type: "TIME" as "TIME",
  valueType: "INTERVAL" as "INTERVAL",
  value: null as ParamIntervalObject<'TIME'>,
};

const fn = <T extends IParameterItem<T["type"], T["valueType"]>>(
  obj: T
): IParameterItem<T["type"], T["valueType"]> => obj;

const t00 = fn(test);
