import bcrypt from 'bcrypt'

export async function hashPassword(password: string): Promise<string> {
	const hash = bcrypt.hash(password, 15)

	return hash
}

