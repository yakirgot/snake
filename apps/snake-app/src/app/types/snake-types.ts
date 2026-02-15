declare const brand: unique symbol;

export type Brand<T, TBrand> = T & { [brand]: TBrand };

export type XCoordinate = Brand<number, "XCoordinate">;
export type YCoordinate = Brand<number, "YCoordinate">;

export type Position = [XCoordinate, YCoordinate];

export type SnakeDirection = "up" | "down" | "left" | "right";
