type cellProp = ({ value: any }) => JSX.Element

interface IReactTableExtraProps {
	width?: number
	filterable?: boolean
	className?: string
	id?: string
	maxWidth?: number
}

export const createTableCell = (cell: cellProp): any => <
	T extends IReactTableExtraProps
>(
	header = '',
	extraProps?: T,
): any => ({
	Header: header,
	accessor: header,
	Cell: cell,
	...extraProps,
})
