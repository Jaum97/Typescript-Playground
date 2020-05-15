declare type ClassDecorator = <TFunction extends Function>(
  target:TFunction
) => TFunction | void;

declare type PropertyDecorator = (
  target: Object, 
  propertyKey: string | symbol
) => void;

declare type MethodDecorator = <T>(
  target: Object, 
  propertyKey: string | symbol, 
  descriptor: TypedPropertyDescriptor<T>
) => TypedPropertyDescriptor<T> | void;

declare type ParameterDecorator = (
  target: Object, 
  propertyKey: string | symbol, 
  parameterIndex: number
) => void;

@Frozen
class IceCream {}

function Frozen(constructor: Function) {
  Object.freeze(constructor);
  Object.freeze(constructor.prototype);
}

console.log(Object.isFrozen(IceCream)); // true

class FroYo extends IceCream {} // error, cannot be extended
