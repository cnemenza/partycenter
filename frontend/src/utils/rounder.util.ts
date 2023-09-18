const roundTwoDecimals = (num: number) => {
  if (isNaN(num)) return 0;

  const m = Number((Math.abs(num) * 100).toPrecision(15));
  return (Math.round(m) / 100) * Math.sign(num);
};

export { roundTwoDecimals };
