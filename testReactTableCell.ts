
type cellProp = ({ value: any }) => JSX.Element

interface IReactTableExtraProps {
	width?: number
	filterable?: boolean
	className?: string
	id?: string
	maxWidth?: number
	style?: {
		[x: string]: any
	}
}

type CreateReactTableCellType = (
	cell: cellProp,
) => <T extends IReactTableExtraProps, K extends { [x: string]: string }>(
	header?: string,
	extraProps?: T,
	maskNames?: K,
) => Column<unknown>

/**
 * - createReactTableCell - HOF receives JSX element to place in table cell
 * then returns a function that receives the props to pass to the table cell
 * @param cell JSX.Element element that will be placed in the cell
 * @returns
 */

// eslint-disable-next-line
export const createReactTableCell: CreateReactTableCellType = (
	cell = DefaultTableCell,
) => (header = '', extraProps?, maskNames?): Column<unknown> => ({
	Header: maskNames ? maskNames[header] : header,
	accessor: header,
	Cell: cell,
	...extraProps,
})

export const invertCalls = fn => (...p1) => (...p2) => fn(p2)(p1)

--
import * as React from 'react'

//TODO: pass prop JSX.Instrinsic....
function DefaultTableCell({ value }, style = {}, className = ''): JSX.Element {
	const props = {
		style,
		className: `ellipsis ${className}`,
	}
	return <div {...props}>{String(value)}</div>
}
--
export default DefaultTableCell


const testinvert = invertCalls(createReactTableCell)

		const defaultMask = header =>
			testinvert(
				header,
				{
					maxWidth: 200,
				},
				groupTableNames,
			)

		// const reinvert = invertCalls()

		const t = defaultMask('isMulti')(defaultTableCell)

		console.log({ t })
