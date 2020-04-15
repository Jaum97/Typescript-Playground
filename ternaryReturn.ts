export declare type TernaryReturn<
	Condition extends boolean,
	ReturnIfTrue,
	ReturnIfFalse
	> = Condition extends true ? ReturnIfTrue : ReturnIfFalse;

type FnReturn<T extends boolean> = TernaryReturn<T, string, number>

const fn = <T extends boolean = false>(item, isStr = false as T): FnReturn<T> => {
	return (isStr ? String(item) : Number(item)) as FnReturn<T>
}

const t00 = fn('1')
//const t00: number

const t01 = fn('2', false)
//const t01: number

const t02 = fn('3', true)
//const t02: string
