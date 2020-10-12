const camelizeWithArray = (str) => {
  const arrStr = [...str];
  let newStr = "";
  for (const [i, char] of arrStr.entries()) {
    const condition = arrStr[i - 1] === "_";
    newStr += condition ? char.toUpperCase() : char.toLowerCase();
  }

  return newStr.replace(/_/g, "");
};

const camelCaseRegex = /(?:^\w|[A-Z]|\b\w|\s+|_|(?<=_)[a-z])/g;

const testStr =
  "potato_machine_mandiocapotato_machine_mandiocapotato_machine_mandiocapotato_machine_mandiocapotato_machine_mandiocapotato_machine_mandiocapotato_machine_mandiocapotato_machine_mandiocapotato_machine_mandiocapotato_machine_mandiocapotato_machine_mandiocapotato_machine_mandiocapotato_machine_mandiocapotato_machine_mandioca";

const replacer = (match, index) => {
  if (+match === 0 || match === "_") return ""; // or if (/\s+/.test(match)) for white spaces

  return index === 0 ? match.toLowerCase() : match.toUpperCase();
};

function camelize(str: string): string {
  return str.replace(camelCaseRegex, replacer);
}

console.time("regex");

const t03 = camelize(testStr);

console.timeEnd("regex");

console.time("array");

const t04 = camelizeWithArray(testStr);

console.timeEnd("array");

const t05 = t03 === t04;

t05;

const camelizeObj = (obj) => {
  const newObj = {};

  for (const key in obj) newObj[camelize(key)] = obj[key];

  return newObj;
};

const snakeCasedObj = {
  i_save_keys_in_snake_case: "bad",
};

const coolObj = camelizeObj(snakeCasedObj);

coolObj; // { iSaveKeysInSnakeCase: 'bad' }

regex: 0.132ms

array: 0.566ms
