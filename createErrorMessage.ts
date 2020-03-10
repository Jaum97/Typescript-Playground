export const isValidObj = (obj): boolean =>
	obj === Object(obj) && !Array.isArray(obj)

export const isObjEmpty = (obj): boolean => !(obj && Object.keys(obj).length)

/**
 * - isObjValidAndNotEmpty checks if object is valid and not empty
 * @param x object to verify
 * @returns boolean
 */
export const isObjValidAndNotEmpty = (x): boolean =>
	isValidObj(x) && !isObjEmpty(x)

export function replaceInTemplate(template: string, value: string, matcher = '{PARAM}'): string {
	return String(template).replace(matcher, value)
}

interface IParamsToValidate {
	[name: string]: any	
}

/**
 * getMissingDataMessage
 * @param paramsToValidate object with the parameters to validate in the format 
 * { nameToPrint: valueToValidate }
 * @param baseMessage message to use as base of the template
 * @example 
 	getMissingDataMessage({
		nome: 'joao',
		potato: 1,
		skills: [],
		'Cidade enviada': {},
		banana: '',
		potat1: undefined
	}, 'getCities {PARAM} faltando')
	// returns 'getCities skills, Cidade enviada, banana e potat1 faltando'

	* @example
	getMissingDataMessage({
		skills: [],
		banana: '',	
	})
	// returns 'skills e banana faltando no corpo da requisiçāo'
 */
export function getMissingDataMessage(
	paramsToValidate: IParamsToValidate, 
	baseMessage: string = '{PARAM} faltando no corpo da requisiçāo'
): string {
	if(!paramsToValidate || !Object.keys(paramsToValidate).length) {
		return
	}

	const missing = Object.entries(paramsToValidate).map(([name, value]) => {
		if(
			Array.isArray(value) && !value.length 
			|| isValidObj(value) && isObjEmpty(value) 
			|| !value
		) {
			return name
		}
	}).filter(Boolean)

	const len = missing.length

	const formattedParams = `${missing.slice(0, len - 1).join(', ')} e ${missing[len - 1]}`

	return missing.length ? replaceInTemplate(baseMessage, formattedParams) : ''
}
