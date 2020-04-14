/**
 * -arrayReplace - creates a new array replacing the index item for the payload
 * @param arr array to replace an item from
 * @param index index of the item to replace
 * @param payload value to put in the given index
 */

type MaybeFn<T> = T extends (...args: any[]) => any ? (...args: Parameters<T>) => ReturnType<T> : any

const isFn = <T = any>(
  arg: T
): arg is MaybeFn<T> => arg instanceof Function;

// A type predicate's type must be assignable to its parameter's type.
//   Type 'MaybeFn<T>' is not assignable to type 'T'.
//     'MaybeFn<T>' is assignable to the constraint of type 'T', but 'T' could be instantiated with a different subtype of constraint '{}'.
//       Type '(...args: Parameters<T>) => ReturnType<T>' is not assignable to type 'T'.
//         '(...args: Parameters<T>) => ReturnType<T>' is assignable to the constraint of type 'T', but 'T' could be instantiated with a different subtype of constraint '{}'.ts(2677)



// export declare function arrayReplace<T extends Record<string, any>,P extends T>(index: number, payload: P, arr: Array<T>): Array<T>

// export declare function arrayReplace<T extends Record<string, any>,P extends ((arg: T) => any)>(index: number, payload: P, arr: Array<T>): Array<T>

export function arrayReplace<
  T extends Record<string, any>,
  P extends ((arg: T) => any) | T
>(index: number, payload: P, arr: Array<T>): Array<T> {
  const created: Array<T> = [];

  const len = arr.length;

  for (let i = 0; i < len; i++) {
    if (i !== index) {
      created.push(arr[i]);
    } else {
      const toPush = isFn(payload) ? payload(arr[i]) : payload;

      created.push(toPush);
    }
  }

  return created;
}

const findAndReplace = (callback) => (payload) => (arr) => {
  const index = arr.findIndex(callback);

  if (!index) return arr;

  if (payload instanceof Function) {
    return arrayReplace(index, payload(arr[index]), arr);
  }

  return arrayReplace(index, payload, arr);
};

const arr = [
  { id: 0, name: "pop0" },
  { id: 1, name: "pop1" },
  { id: 2, name: "pop2" },
  { id: 3, name: "pop3" },
  { id: 4, name: "pop4" },
];

const isWantedId = (x) => x.id === 3;

const appendFound = (x) => ({ ...x, found: true });

const t00 = findAndReplace(isWantedId)(appendFound)(arr);

t00;
