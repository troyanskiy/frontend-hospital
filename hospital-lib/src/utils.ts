export function isSubsetOf<T>(set: T[], subset: T[]): boolean {
    return subset.every(val => set.includes(val));
}
