import isNegative from "~/src/utils/isNegative";

/**
 * This function returns a color class based on the value of the number passed in.
 * So if the change price is down, we'll make the text red
 * usage: <span className={colorize(commodity.results[0].change)}>{change}</span>
 **/

export const colorize = (n: number): string => {
  if (isNegative(n)) {
    return "text-red-500";
  }
  return "text-green-500";
};
