import Axios from 'axios';
import { BASE_URL } from './Constants';
import APIError from './APIError';

export default class Util {
	static readonly axios = Axios.create({
		baseURL: BASE_URL,
	});

	static async request(options: RequestOptions, token: string) {
		const res = await this.axios.request({
			url: options.endpoint,
			method: options.method,
			headers: {
				'Authorization': `Bot ${token}`,
				'Content-Type': 'application/json',
				'Accept': 'application/json',
			},
			data: options.data,
		});

		if (res.status - (res.status % 100) !== 200) throw new APIError(res.status, res.statusText);
		return res.data;
	}

	static transformRequestResult<V>(requestResult: V[]): [number, V][];
	static transformRequestResult<V>(requestResult: V[], key: keyof PickByType<V, string>): [string, V][];
	static transformRequestResult<V>(requestResult: V[], key?: keyof PickByType<V, string>) {
		if (key) {
			// If a key is specified, use this key to index elements
			const entries: [string, V][] = [];

			for (const requestResultItem of requestResult) {
				entries.push([requestResultItem[key] as string, requestResultItem]);
			}

			return entries;
		} else {
			// Otherwise index elements by their position in the array
			const entries: [number, V][] = [];

			for (let i = 0; i < requestResult.length; i++) {
				entries.push([i, requestResult[i]]);
			}

			return entries;
		}
	}
}

interface RequestOptions {
	method: 'GET' | 'POST' | 'PUT';
	endpoint: `/${string}`;
	data?: any;
}

export type PickByType<T, V> = {
	[P in keyof T as T[P] extends V | undefined ? P : never]: T[P];
};
