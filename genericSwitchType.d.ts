interface IAnswer1 {
	name: string
}

interface IAnswer2 {
	title: string
}

interface IAnswer3 {
	text: string
}

type GenericAnswer<T = 1> = T extends 3 ? IAnswer3 : T extends 2 ? IAnswer2 : IAnswer1

const t1: GenericAnswer = {
	title: 'potato'
}

// Type '{ title: string; }' is not assignable to type 'IAnswer1'.
//   Object literal may only specify known properties, and 'title' does not exist in type 'IAnswer1'.

const t2: GenericAnswer<2> = {
	title: 'potato'
}
