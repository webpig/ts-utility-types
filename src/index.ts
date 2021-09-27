declare type MyPartial<T> = {
    [P in keyof T]?: T[P]
}

declare type MyRequired<T> = {
    [P in keyof T]-?: T[P]
}

declare type MyReadonly<T> = {
    readonly [P in keyof T]: T[P]
}

declare type MyRecord<K extends keyof any, T> = {
    [P in K]: T
}

declare type MyPick<T, K extends keyof T> = {
    [P in K]: T[P]
}

declare type MyExclude<T, U> = T extends U ? never : T

declare type MyOmit<T, K extends keyof any> = MyPick<T, MyExclude<keyof T, K>>

declare type MyExtract<T, U> = T extends U ? T : never