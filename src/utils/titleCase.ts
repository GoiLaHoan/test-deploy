export function titleCase(str: string) {
  return str.toLowerCase().replace(/(^|\s)\S/g, function (l) {
    return l.toUpperCase();
  });
}
