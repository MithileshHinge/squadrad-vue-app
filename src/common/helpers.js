/* eslint-disable import/prefer-default-export */
export async function forEachAsync(arr, cb) {
	const promises = arr.map((val) => cb(val));
	await Promise.all(promises);
}
