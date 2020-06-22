export function createNativeRef<T>(initialValue?: T): { current: T | null } {
  return { current: initialValue || null }
}
