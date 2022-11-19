export function setItemLocalStorage(key: string, data: any) {
	localStorage.setItem(key, JSON.stringify(data));
}

export function getItemLocalStorage(key: string) {
	const getItem = localStorage.getItem(key);
	if(getItem) return JSON.parse(getItem);
}

export function removeItemLocalStorage(key: string) {
	localStorage.removeItem(key);
}
