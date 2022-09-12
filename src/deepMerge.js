const {isObject, isArray, isSameType} = require("./helpers");
const deepMerge = (obj1, obj2) => {
    //если типы не совпадают - вернется последнее передаваемое значение

    if (!isObject(obj1) && !isArray(obj1) || !isSameType(obj1, obj2)) {
        if (isArray(obj2) || isObject(obj2)) {
            return deepCopy(obj2);
        }
        return obj2;
    }

    if (isArray(obj1)) {
        return deepMergeArrays(obj1, obj2);
    }

    return deepMergeObjects(obj1, obj2);

}


const deepCopy= (item) => {

    if (!isArray(item) && !isObject(item))  {
        throw  new Error('Wrong arguments!')
    }

    const result = isArray(item) ? [...item] : {...item};

    for (const i of Object.keys(result)) {
        if (isArray(i) || isObject(i)) {
            result[i] = deepCopy(result[i])
        }
    }

    return result;
}


const deepMergeArrays = (arr1, arr2) => {
    return deepCopy([...arr1, arr2])
}

const deepMergeObjects = (obj1, obj2) => {
    const result = deepCopy(obj1);

    for (const key of Object.keys(result)) {
        if(!result.hasOwnProperty(key)) {
            if (isArray(obj2[key]) || isObject(obj2[key])) {
                result[key] = deepCopy(obj2[key]);
            }
            result[key] = obj2[key];
        }

        result[key] = deepMerge(result[key], obj2[key])
    }

    return result;
}