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

declare type MyNonNullable<T> = T extends null | undefined ? never : T

declare type MyParameters<T extends (...args: any) => any> = T extends (...args: infer P) => any ? P : never

declare type MyConstructorParameters<T extends abstract new (...args: any) => any> = T extends abstract new (...args: infer P) => any ? P : never

declare type MyReturnType<T extends (...args: any) => any> = T extends (...args: any) => infer R ? R : never

declare type MyInstanceType<T extends abstract new (...args: any) => any> = T extends abstract new (...args: any) => infer R ? R : never

declare type MyThisParameterType<T> = T extends (this: infer P, ...args: any[]) => any ? P : unknown
