import { resolve } from 'path'
import { fromBlankAsync, fromFileAsync } from 'xlsx-populate'
import { WorkBook } from 'xlsx/types'

import { guarded } from './error'

// import { resolve } from 'path'

export const downloadExcelFromBlank = guarded(
	async <T>(data: Array<Array<T>>): Promise<WorkBook> => {
		const workbook = await fromBlankAsync()

		if (data.length === 0) return

		workbook
			.sheet(0)
			.cell('A1')
			.value(data)

		return workbook.outputAsync()
	}
)

export const downloadExcelFromTemplate = guarded(
	async <T>(
		data: Array<Array<T>>,
		templateName: string,
		options = { sheet: 0, cell: 'A3' }
	): Promise<WorkBook> => {
		const localPath = __dirname + './../assets/templates'

		const pathResolved = resolve(localPath) + `/${templateName}.xlsx`

		const workbook = await fromFileAsync(pathResolved)

		if (data.length === 0) return

		workbook
			.sheet(options.sheet)
			.cell(options.cell)
			.value(data)

		return workbook.outputAsync()
	}
)
