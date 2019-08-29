import { Column } from 'react-table'

type fnReturn<
	T extends IReactTableExtraProps,
	K extends { [x: string]: string }
> = (header?: string, extraProps?: T, maskNames?: K) => Column<unknown>

export const createReactTableCell = <
	T extends IReactTableExtraProps,
	K extends { [x: string]: string }
>(
	cell: cellProp,
): fnReturn<T, K> => (
	header = '',
	extraProps?: T,
	maskNames?: K,
): Column<unknown> => ({
	Header: maskNames ? maskNames[header] : header,
	accessor: header,
	Cell: cell,
	...extraProps,
})
