var sum_to_n_a = function (n) {
  // your code here
  let sum = 0;
  for (let i = 1; i <= n; i++) sum += i;
  return sum;
};

var sum_to_n_b = function (n) {
  // your code here
  return (n * (n + 1)) / 2;
};

var sum_to_n_c = function (n) {
  // your code here
  if (n === 0) return 0;
  if (n === 1) return 1;
  else return n + sum_to_n_c(n - 1);
};
console.log(sum_to_n_a(23), sum_to_n_b(132), sum_to_n_c(8));
