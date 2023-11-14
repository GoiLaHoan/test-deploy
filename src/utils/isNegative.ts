type NegativeCheck = (n: number) => boolean;

const isNegative: NegativeCheck = (n: number) => {
  if (Math.sign(n) == -1) {
    return true;
  }
  return false;
};

export default isNegative;
