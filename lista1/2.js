function isDivisible(num, arr) {
  for (const n of arr) {
    if (num % n !== 0) return false;
  }

  return true;
}

for (let i = 1; i <= 100_000; i++) {
  const digits = i.toString().split("").map(Number);
  if (digits.includes(0)) continue;

  const sum = digits.reduce((acc, curr) => acc + curr, 0);

  if (i % sum === 0 && isDivisible(i, digits)) console.log(i);
}
