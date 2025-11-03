function createFs(n) {
  var fs = [];
  for (var i = 0; i < n; i++) {
    (function (j) {
      fs[j] = function () {
        return j;
      };
    })(i); // przekazujemy i jako argument
  }
  return fs;
}
