export const omitKeys = < T,
    K extends keyof T > (
        obj: T,
        keysToOmit: Array < K >
    ): Omit < T, K > => {
        if (Object.keys(obj).length) {
            const wantedKeys = Object.keys(obj).filter(key =>
                keysToOmit.every(omit => omit !== key)
            )

            const resultObj = wantedKeys.reduce((resultObj, key) => Object
                .assign(resultObj, {
                    [key]: obj[key]
                }), ({}
                    as unknown) as T)

            return resultObj
        }
        return obj
    }

    
    function omitKeys2(obj, keysToOmit) {

      const created = {}

      const objKeys = Object.keys(obj)

      for(const key of objKeys) {
        
        if(!keysToOmit.includes(key) ) {

          created[key] = obj[key]
          
        }
      }

      return created
    }


export const omitKeys3 = <K extends ValidPropType>(keys: Array<K>) => <
	O extends { [key in K]?: any }
>(
	obj: O
): Omit<O, K> => {
	const created = {} as O

	const objKeys = Object.keys(obj)

	for (const key of objKeys) {
		if (!keys.includes(key as any)) {
			;(created as any)[key] = (obj as any)[key]
		}
	}

	return created
}
