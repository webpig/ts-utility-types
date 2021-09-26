declare type MyPartial<T> = {
    [P in keyof T]?: T[P]
}

declare type MyRequired<T> = {
    [P in keyof T]-?: T[P]
}

declare type MyReadonly<T> = {
    readonly [P in keyof T]: T[P]
}