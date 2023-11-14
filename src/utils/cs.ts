/**
 * A helper function to convert an array of css modules to a string
 * @param arr (array of css module strings)
 */

function cs(arr) {
  return arr.filter((e) => e).join(" ");
}

export default cs;
