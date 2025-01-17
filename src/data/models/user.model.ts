export interface User {
	_id?: string;
	name: string;
	email: string;
	password: string;
	gender: string;
	birthdate: string | Date;
	address: {
		state: string,
		city: string,
		country: string
	},
	profile: {
		username: string;
		photoURL: string;
		about: string;
	}
	followers: Array<string>;
	following: Array<string>;
}