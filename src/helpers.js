

export const isObject = (obj) => Object.prototype.toString.call(obj) === '[object Object]'

export const isArray = (array) => Array.isArray(array);

export const isSameType = (item1, item2) => Object.prototype.toString.call(item1) === Object.prototype.toString.call(item2)
