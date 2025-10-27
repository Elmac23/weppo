function Tree(val, left = null, right = null) {
  this.val = val;
  this.left = left;
  this.right = right;
}

Tree.prototype.dfsIterator = function* () {
  yield this.val;
  if (this.left) yield* this.left.dfsIterator();
  if (this.right) yield* this.right.dfsIterator();
};

Tree.prototype.bfsIterator = function* () {
  const queue = [this];

  while (queue.length > 0) {
    const node = queue.shift();
    yield node.val;

    if (node.left) queue.push(node.left);
    if (node.right) queue.push(node.right);
  }
};

//       1
//     /   \
//    2     4
//   /
//  3
var root = new Tree(1, new Tree(2, new Tree(3)), new Tree(4));

console.log("DFS (w głąb):");
for (var e of root.dfsIterator()) {
  console.log(e);
}

console.log("BFS (wszerz):");
for (var e of root.bfsIterator()) {
  console.log(e);
}
