export function shuffle<T>(array: Array<T>): Array<T> {
    let currentIndex = array.length, randomIndex;

    // While there remain elements to shuffle.
    while (currentIndex > 0) {

        // Pick a remaining element.
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex--;

        // And swap it with the current element.
        [array[currentIndex], array[randomIndex]] = [
            array[randomIndex], array[currentIndex]];
    }

    return array;
}

export function isArray(arr: any, type: "string" | "number" | "object"): boolean {
    const isArray = Array.isArray(arr);
    if (Array.isArray(arr)) {
        const isStringArray = arr.length > 0 && arr.every((value) => {
            return typeof value === type
        });
        return isStringArray
    }
    return false
}
