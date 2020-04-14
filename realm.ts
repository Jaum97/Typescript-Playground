import { realm } from '@modules/Realm/service'
import { RealmObjectType, ValidRealmSchemas } from '@modules/Realm/types'
import { deepCopy } from './object'
import { Results } from 'realm'

type GetRealmReturnType<K extends ValidRealmSchemas, T> = {
	0: Results<RealmObjectType<K> & Realm.Object>
	1: (RealmObjectType<K> & Object)[]
}[T extends true ? 1 : 0]

export function getRealm(
	type: 'SENT' | 'PENDING' | 'ALL'
): (
	id: string
) => <K extends ValidRealmSchemas, P extends boolean>(
	schema: K,
	pojo?: P
) => GetRealmReturnType<K, P> {
	return (id) =>
		function <K extends ValidRealmSchemas>(schema: K, pojo = false) {
			const all = type === 'ALL'

			const sentDate = `sentDate ${type === 'SENT' ? '==' : '!='} null`

			const query = `user = $0${all ? '' : ` AND ${sentDate}`}`

			const realmObjects = realm
				.objects<RealmObjectType<K>>(schema)
				.filtered(query, id)

			return pojo ? realmObjects.map(deepCopy) : realmObjects
		}
}

/**
 * - extractPendingFromRealm extract objects
 * from a schema that haven't been sent
 * @param schema Realm schema to extract objects from
 * @param id logged user Id
 */
export const getPendingRealm = getRealm('PENDING')

/**
 * - extractSentFromRealm extract objects
 * from a schema that have been sent
 * @param schema Realm schema to extract objects from
 * @param id logged user Id
 */
export const getSentRealm = getRealm('SENT')

export const getAllRealm = getRealm('ALL')

/**
 * - persistInRealm function to persist an object in realmDB,
 * does a create followed by a write
 * @param schema Realm Schema
 * @param objects object or objects to persist
 */
export function saveRealm<K extends ValidRealmSchemas>(
	schema: K,
	objects: RealmObjectType<K> | Array<RealmObjectType<K>>
): void {
	try {
		const isArray = Array.isArray(objects)

		const createObject = () => {
			realm.create(schema, objects)
		}

		const createObjects = () => {
			;(objects as Array<RealmObjectType<K>>).map((o) =>
				realm.create(schema, o)
			)
		}

		const toWrite = isArray ? createObjects : createObject

		realm.write(toWrite)
	} catch (err) {
		console.log(err)
	}
}
