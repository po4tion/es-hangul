export function excludeLastElement(array: string[]): [string[], string] {
  const lastElement = array[array.length - 1];
  return [array.slice(0, -1), lastElement ?? ''];
}

export function joinString(...args: string[]) {
  return args.join('');
}

export function isBlank(character: string) {
  return /^\s$/.test(character);
}

export default function assert(condition: boolean, errorMessage?: string): asserts condition {
  if (condition === false) {
    throw new Error(errorMessage ?? 'Invalid condition');
  }
}

export function isNotUndefined<T>(value: T | undefined): value is T {
  return value !== undefined;
}

export function defined<T>(value: T | undefined): T {
  assert(value !== undefined);

  return value as T;
}

export function arrayIncludes<Type>(array: Type[] | readonly Type[], item: unknown, fromIndex?: number): item is Type {
  return array.includes(item as Type, fromIndex);
}
