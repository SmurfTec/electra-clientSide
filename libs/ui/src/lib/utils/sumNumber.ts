export const SumNumber = (array: number[]) => {
  let sum = 0;
  array.map((item) => (sum += Number(item)));
  return sum;
};
