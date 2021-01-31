const createObjIdentifier = <K extends string>(...keys: K[]) => <
  V extends { [key in K]: V[K] }
>(
  obj: V
): string => {
  return keys.reduce((identifier, key) => `${identifier}${obj[key]}`, "");
};

const groupByIdentifier = <K extends string>(...keys: K[]) => <
  V extends { [key in K]: V[K] }
>(
  arr: V[]
): { [identifier: string]: V[] } => {
  const args = Array.isArray(keys[0]) ? keys[0] : keys;

  const createId = createObjIdentifier(...args);

  return arr.reduce((obj, el) => {
    const id = createId(el as any);

    return {
      ...obj,
      [id]: [...(obj[id] || []), el],
    };
  }, {});
};

const arr = [
  {
    city: "1",
    name: "a",
  },
  {
    city: "1",
    name: "b",
  },
  {
    city: "1",
    name: "a",
  },
];

const pipe = (...fns) => (init) => fns.reduce((cV, cF) => cF(cV), init);

const t00 = groupByIdentifier("city", "name")(arr);

const prop = (key) => (obj) => obj[key];

const tFn = (...keys) => (arr) => {
  const val = groupByIdentifier(...keys)(arr);

  const vals = Object.values(val);

  return vals.map(prop("0"));
};

const map = (callback) => (arr) => arr.map(callback);

const tFn2 = (k) => pipe(groupByIdentifier(k), Object.values, map(prop("0")));

const t01 = tFn2(["city", "name"])(arr);

t01;
