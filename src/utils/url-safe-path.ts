// this function was created because i was watching logs and saw this one..
// {"urlAlias":"/opinions/app/%252e%252e%255c%252e%252e%255c%252e%252e%255c%252e%252e%255c%252e%252e%255c%252e%252e%255c%252e%252e%255c%252e%252e%255cetc/passwd","auHash":""}: 564.464ms

export function urlSafePath(path: string) {
  return path.toLowerCase().replace(/[^a-z0-9]+/g, "-");
}
