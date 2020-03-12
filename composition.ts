const compose = (...fns) => (value) => fns.reduceRight((currVal, currFn) => currFn(currVal), value)

const add = (a, b) => a + b

const add5 = (a) => add(a, 5)

const toTuple = (a) => [a, a]

const t00 = compose(toTuple, add5)(42)

t00 // [ 47, 47 ]
