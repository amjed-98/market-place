type ValueOf<T extends object> = T[keyof T];

// eslint-disable-next-line import/prefer-default-export
export type { ValueOf };
