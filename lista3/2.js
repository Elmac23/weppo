function divisiors(n) {
  const ans = [];
  let divisor = 2;
  while (divisor <= n) {
    if (n % divisor === 0) {
      ans.push(divisor);
      n /= divisor;
    } else divisor++;
  }
  return ans;
}

function divisiors_fun(n) {
  function it(n, result, iterator) {
    if (iterator > n) return result;
    if (n % iterator === 0)
      return it(n / iterator, [iterator, ...result], iterator);
    else it(n, result, iterator + 1);
  }

  return it(n, [], 2);
}
