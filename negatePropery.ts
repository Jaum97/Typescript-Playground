export function negateProperty<T, K extends keyof T>(obj: T, key: K): T {
  return Object.assign({}, obj, { [key]: !obj[key]})
}
