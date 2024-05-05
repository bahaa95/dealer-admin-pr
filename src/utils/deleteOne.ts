/**
 * Delete first matched item from an array.
 */
export function deleteOne<T = unknown>(arr: T[], cb: (item: T) => boolean): T[] {
    const copy = [...arr];
    const result: T[] = [];

    for (let i = 0; i < arr.length; i++) {
        const item = copy.shift();

        if (item && cb(item)) {
            break;
        }

        result.push(item as T);
    }

    return [...result, ...copy];
}
