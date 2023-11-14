const FRACTION_DIGITS = 3;

function isEmptyNumber(value) {
  return value === "NaN" || value === "";
}

function calculate(value) {
  const result = value.toFixed(FRACTION_DIGITS);
  if (isEmptyNumber(result)) {
    return "-";
  }
  return result;
}

export function renderNumberSafely(value) {
  if (isEmptyNumber(value)) {
    return "-";
  }
  return value;
}

export function dwtToOunce(value) {
  return calculate(parseFloat(value) / 18.229);
}

export function dwtToGram(value) {
  return calculate(parseFloat(value) * 1.555);
}

export function ozToDwt(value) {
  return calculate(parseFloat(value) * 18.229);
}

export function ozToGram(value) {
  return calculate(parseFloat(value) * 28.35);
}

export function gramToDwt(value) {
  return calculate(parseFloat(value) / 1.555);
}

export function gramToOz(value) {
  return calculate(parseFloat(value) * 28.35);
}
