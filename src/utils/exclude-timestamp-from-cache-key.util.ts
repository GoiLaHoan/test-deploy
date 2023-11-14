export function excludeTimestampFromCacheKey(args: any) {
  if (args && args?.timestamp) {
    const map = new Map(Object.entries(args));
    if (map.has("timestamp")) {
      map.delete("timestamp");
    }

    return Object.fromEntries(map);
  }
  return args;
}
