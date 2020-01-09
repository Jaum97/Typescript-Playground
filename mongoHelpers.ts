import { Schema, Model, DocumentQuery } from 'mongoose'
import {
	ValidMongoCollection,
	ValidMongoId,
	ValidMongoDocument,
} from '../interfaces/mongo'

export const createRefObject = (
	collection: ValidMongoCollection,
	required = false,
) => ({
	type: Schema.Types.ObjectId,
	ref: collection,
	required,
})

export function getMongoDocumentById<T extends ValidMongoDocument>(
	collection: Model<T, {}>,
): (_id: ValidMongoId) => DocumentQuery<T, T, {}> {
	return function(_id: ValidMongoId): DocumentQuery<T, T, {}> {
		if (!_id) {
			throw {
				code: 420,
				message: 'O id é obrigatório',
			}
		}

		return collection.findById(_id)
	}
}

export function getMongoDocuments<T extends ValidMongoDocument>(
	collection: Model<T, {}>,
): () => DocumentQuery<Array<T>, T, {}> {
	return function(): DocumentQuery<Array<T>, T, {}> {
		return collection.find()
	}
}

// TODO: test
export function updateMongoDocument<
	T extends ValidMongoDocument,
	P extends Partial<T>
>(
	collection: Model<T, {}>,
): (_id: ValidMongoId, payload: P) => DocumentQuery<Array<T>, T, {}> {
	return function(_id, payload) {
		return collection.findOneAndUpdate(_id, payload)
	}
}
