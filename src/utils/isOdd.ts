type OddlyEnough = (n: number) => boolean;

const isOdd: OddlyEnough = (n: number) => {
  const zeroOrOne = n % 2;
  if (zeroOrOne !== 1) {
    return false;
  }
  return true;
};

export default isOdd;
