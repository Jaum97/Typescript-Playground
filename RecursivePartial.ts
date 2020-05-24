// https://stackoverflow.com/questions/47914536/use-partial-in-nested-property-with-typescript

type RecursivePartial<T> = {
    [P in keyof T]?: RecursivePartial<T[P]>;
};
