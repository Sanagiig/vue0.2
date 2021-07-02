/**
 * Mix properties into target object.
 */
export function extend(to: { [key: string]: any },from: { [key: string]: any }): any {
  for (const key in from) {
    to[key] = from[key];
  }
  return to;
}