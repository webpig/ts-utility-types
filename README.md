# ts-utility-types

TypeScript Utility Types 实现。

[utility-types 官方文档](https://www.typescriptlang.org/docs/handbook/utility-types.html)

### `Partial` 、`Required` 、`Readonly`

`Partial` 、`Required` 、`Readonly` 实现的关键在于 [`keyof`](https://www.typescriptlang.org/docs/handbook/2/keyof-types.html) ，它能获取对象的所有键值的数字或者字符串字面量联合类型。

### `Partial<Type>`

`Partial` 类型让对象属性是可选的，这里只要加个 [`?`](https://www.typescriptlang.org/docs/handbook/2/objects.html#optional-properties) 操作符即可：

```ts
type Partial<T> = {
    [P in keyof T]?: T[P]
}
```

### `Required<Type>`

`Required` 类型强制所有属性必须都要有，所以需要把原有类型属性里的 `?` 操作符给去掉，这里使用 [`-`](https://www.typescriptlang.org/docs/handbook/2/mapped-types.html#mapping-modifiers) 操作符即可：

```ts
type Required<T> = {
    [P in keyof T]-?: T[P]
}
```

### `Readonly<Type>`

`Readonly` 类型规定属性只可读，不能修改。这里我们给每个属性加上 [`readonly`](https://www.typescriptlang.org/docs/handbook/2/objects.html#readonly-properties) 就行了：

```ts
type Readonly<T> = {
    readonly [P in keyof T]: T[P]
}
```

`Record<Keys, Type>` , 属性名是 `key` , 对应的值为 `Type` 。`Keys` 通常为一个联合类型或者单独得可作为 `key` 的类型，比如 `number/string/symbol` 。这里的 `Keys` 应该定义为任意类型的 `keyof` ，指定该类型为 `keyof` 的结果。

```ts
type Record<P extends keyof any, T> = {
    [P in K]: T
}
```

### `Pick<Type, Keys>`

`Pick` 从 `Type` 中选一组属性来构造新的类型，`Keys` 为 `Type` 属性集合的子集，即 `keyof Type` 的子集。

```ts
type Pick<T, K extends keyof T> = {
    [P in K]: T[P]
}
```

### `Exclude<Type, ExcludedUnion>`

`Exclude` 需要排序 `ExcludedUnion` 中的类型，这里要用到 [`Conditional Types`](https://www.typescriptlang.org/docs/handbook/2/conditional-types.html) 。通过 `extends` 来判断是否满足条件，然后通过 [`never`](https://www.typescriptlang.org/docs/handbook/2/narrowing.html#the-never-type) 来去除不需要的类型。判断表达式:

```ts
SomeType extends OtherType ? TrueType : FalseType;
```

这里 `ExcludeUnion` 为 `Union Type` , 将会处理所有的子类型，详请见 [Distributive Conditional Types](https://www.typescriptlang.org/docs/handbook/2/conditional-types.html#distributive-conditional-types) 。 `Exclude` 实现为：

```ts
type Exclude<T, U> = T extends U ? never : T
```

### `Omit<Type, Keys>`

与 `Pick` 不同的是，`Omit` 是要忽略 `Keys` 中的属性，即选取 `Type` 中除了 `Keys` 中之外的属性。这里我们可以利用 `Pick` 和 `Exclude` 来实现：先用 `Exclude` 进行属性的筛选，然后用 `Pick` 进行选取。

```ts
type Omit<T, K extends keyof any> = Pick<T, Exclude<keyof T, K>> 
```

### `Extract<Type, Union>`

与 `Exclude` 判断相反即可：

```ts
type Extract<T, U> = T extends U ? T : never
```