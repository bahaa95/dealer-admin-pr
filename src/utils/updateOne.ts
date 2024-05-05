/**
 * Update first matched item within an array.
 */
export function updateOne<T = unknown>(arr: T[], search: (item: T) => boolean, update: (item: T) => T): T[] {
    const copy = [...arr];
    let result: T[] = [];
    let i = 0;

    for (; i < arr.length; i++) {
        const item = copy[i];
        if (search(item)) {
            result.push(update(item));
            break;
        }
        result.push(item);
    }

    if (++i < arr.length) {
        result = [...result, ...copy.slice(i)];
    }

    return result;
}
