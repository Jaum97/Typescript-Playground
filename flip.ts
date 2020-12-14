const flip = <F extends (...args: any[]) => any>(fn: F) => <A extends Parameters<F>>(...args: A): ReturnType<F> => fn(args[1], args[0], ...args.slice(2))

const pass = <T>(x: T): T => x

const fn00 = (x: number) => x

const fn01 = flip(fn00)(2) // fn01: number

const fn02 = flip(pass)

// WIP t01: unknown[], cant infer number[]
const t01 = (Array(10).fill(0) as number[]).map(fn02)

t01 // [ 0, 1, 2, 3, 4, 5, 6, 7, 8, 9 ] 
