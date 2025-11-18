// expected to be string
type HelloWorld = string;

interface Todo {
  title: string;
  description: string;
  completed: boolean;
}

type MyPick<T, U extends keyof T> = {
  [Key in U]: T[Key];
};

type TodoPreview = MyPick<Todo, "title" | "completed">;

type MyReadonly<T> = {
  readonly [Key in keyof T]: T[Key];
};

type ReadOnlyTodo = MyReadonly<Todo>;

const tuple = ["tesla", "model 3", "model X", "model Y"] as const;

type TupleToObject<T extends readonly string[]> = {
  [Key in T[number]]: Key;
};

type result = TupleToObject<typeof tuple>; // expected { 'tesla': 'tesla', 'model 3': 'model 3', 'model X': 'model X', 'model Y': 'model Y'}

type arr1 = ["a", "b", "c"];
type arr2 = [3, 2, 1];

type First<T extends any[]> = T extends [infer P, ...any[]] ? P : never;

type head1 = First<arr1>; // expected to be 'a'
type head2 = First<arr2>; // expected to be 3

type tesla = ["tesla", "model 3", "model X", "model Y"];
type spaceX = [
  "FALCON 9",
  "FALCON HEAVY",
  "DRAGON",
  "STARSHIP",
  "HUMAN SPACEFLIGHT"
];

type Length<ARR extends any[]> = ARR["length"];

type teslaLength = Length<tesla>; // expected 4
type spaceXLength = Length<spaceX>; // expected 5

type MyExclude<T, U> = T extends U ? never : T;

type Result = MyExclude<"a" | "b" | "c", "a">; // 'b' | 'c'

type ExampleType = Promise<string>;

type MyAwaited<T> = T extends Promise<infer U> ? U : never;

type ResultAwaited = MyAwaited<ExampleType>; // string

type If<I extends Boolean, T, U> = I extends true ? T : U;

type A = If<true, "a", "b">; // expected to be 'a'
type B = If<false, "a", "b">; // expected to be 'b'

type Concat<T extends any[], U extends any[]> = [...T, ...U];

type ResultConcat = Concat<[1], [2]>; // expected to be [1, 2]

type Includes<T extends string[], U> = U extends T[number] ? true : false;

type isPillarMen = Includes<["Kars", "Esidisi", "Wamuu", "Santana"], "Sanraa">; // expected to be `false`

type Push<T, U> = T extends Array<any> ? [...T, U] : never;

type ResultPush = Push<[1, 2], "3">; // [1, 2, '3']

type Unshift<T, U> = T extends Array<any> ? [U, ...T] : never;

type ResultUnshift = Unshift<[1, 2], 0>; // [0, 1, 2]

const foo = (arg1: string, arg2: number): void => {};

type MyParameters<T> = T extends (...args: infer U) => any ? U : never;

type FunctionParamsType = MyParameters<typeof foo>;
