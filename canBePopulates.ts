type StringOrT<T, P = false> = P extends true ? T : string

interface Hooman {
	name: string
	age: number
}

interface Potato<p = false> {
	person: StringOrT<Hooman, p>
}

const obj: Potato<true> = {
	person: {
		name: 'john',
		age: 2
	}
}

const t = obj.person.name
