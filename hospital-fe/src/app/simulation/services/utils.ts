export function mapToArray<T extends string>(str: string): T[] {
  return str.split(',').filter(x => x !== '') as T[];
}
