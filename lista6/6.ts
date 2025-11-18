type Rectangle = {
  width: number;
  height?: number;
  color?: {
    red: number;
    green: number;
    blue: number;
  };
};

type Shape =
  | { kind: "circle"; radius: number }
  | { kind: "square"; x: number }
  | { kind: "triangle"; x: number; y: number };

type ShapeWithX = Extract<Shape, { x: number }>;

type Circle = Exclude<Shape, { x: number }>;

type StringMap = Record<string, string>;

type RequiredRectangle = Required<Rectangle>;
type ReadOnlyRectangle = Readonly<Rectangle>;
type PartialRectangle = Partial<Rectangle>;

type Color = Pick<Rectangle, "color">;

type RectangleNoWidth = Omit<Rectangle, "width">;

type RectangleBool = {
  [Key in keyof Rectangle]-?: Boolean;
};
