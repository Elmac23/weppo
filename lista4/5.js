function Foo() {
  function Qux() {
    console.log("Foo::Qux (private)");
  }

  this.Bar = function () {
    console.log("Foo::Bar (public) wywołuje Qux)");
    Qux();
  };
}

const foo = new Foo();

foo.Bar();
console.log(typeof foo.Qux);
