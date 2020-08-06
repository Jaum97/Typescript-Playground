const arr = [1, 2, 3];

function arrayMap<
  C extends (any: any) => any,
  T extends any[] | undefined
>(callback: C, arr: T = undefined): T extends undefined ? <T2 extends any[]>(arr: T2) => T2 : T {
  const created = [];

  if (arguments.length < 2) {
    return function (arr) {
      for (const [index, item] of arr.entries()) {
        created.push(callback(item, index, arr));
      }

      return created;
    };
  }

  for (const [index, item] of arr.entries()) {
    created.push(callback(item, index, arr));
  }

  return created;
}

const arr2 = arrayMap((x) => x * 2);

arr2;

const arr3 = arr2(arr);

arr3;
