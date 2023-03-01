export const NumberFormat = (sum: number) => {
  return sum?.toLocaleString('en-US', {
    style: 'currency',
    currency: 'USD',
    compactDisplay: 'short',
    maximumFractionDigits: 0,
  });
};

export const fillArray = (start: number, end: number, step = 1) => {
  const array = [];
  for (let i = start; i <= end; i += step) {
    array.push(i);
  }
  return array;
};
