import { Db, Collection, Filter, ObjectId } from 'mongodb'

import { User } from '../models/user.model'

export class UsersRepository {
	private db: Db
	private collection: Collection<User>

	constructor(db: Db) {
		this.db = db
		this.collection = db.collection<User>('users')
	}

	async createUser(user: Omit<User, '_id'>): Promise<User | null> {
		const { insertedId } = await this.collection.insertOne(user)

		return this.collection.findOne({ _id: insertedId })
	}

	async updateUser({ _id: userId, ...updateData }: Partial<User>): Promise<User | null> {
		await this.collection.updateOne({ _id: userId }, { $set: updateData })

		return this.findOne({ _id: userId })
	}

	async findOne(user: Partial<User>): Promise<User | null> {
		const filters: Filter<User> = user

		return this.collection.findOne(filters)
	}

	async findAll(user: Partial<User>): Promise<User[] | null> {
		return this.collection.find(user).toArray()
	}

	async deleteOne(userId: string): Promise<void> {
		await this.collection.deleteOne({ _id: userId })
	}

	async deleteAll(usersIds: string[]): Promise<void> {
		await this.collection.deleteMany({ _id: usersIds })
	}
}