import { endOfDay, isSameDay, startOfDay } from 'date-fns'

type DateQueryObject = { date: { $gte?: Date; $lte?: Date } } | {}

export function formatDateQuery(
	date: DateSearchInput,
	keyName = 'date'
): DateQueryObject {
	if (!date || (!date.gte && !date.lte)) return {}

	const { gte, lte } = date

	const isSameDate = gte && lte && isSameDay(gte, lte)

	const $gte = isSameDate ? startOfDay(gte) : gte

	const $lte = isSameDate ? endOfDay(lte) : lte

	const query = {
		[keyName]: {
			...($gte ? { $gte } : {}),
			...($lte ? { $lte } : {})
		}
	}

	return query
}
