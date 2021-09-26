# ts-utility-types
implement ts utility types.

[utility-types 官方文档](https://www.typescriptlang.org/docs/handbook/utility-types.html)

`Partial` 、`Required` 、`Readonly` 实现的关键在于 [`keyof`](https://www.typescriptlang.org/docs/handbook/2/keyof-types.html) ，它能获取对象的所有键值的数字或者字符串字面量联合类型。

`Partial` 类型让对象属性是可选的，这里只要加个 [`?`](https://www.typescriptlang.org/docs/handbook/2/objects.html#optional-properties) 操作符即可：

```ts
type Partial<T> = {
    [P in keyof T]?: T[P]
}
```

`Required` 类型强制所有属性必须都要有，所以需要把原有类型属性里的 `?` 操作符给去掉，这里使用 [`-`](https://www.typescriptlang.org/docs/handbook/2/mapped-types.html#mapping-modifiers) 操作符即可。

`Readonly` 类型规定属性只可读，不能修改。这里我们给每个属性加上 [`readonly`](https://www.typescriptlang.org/docs/handbook/2/objects.html#readonly-properties) 就行了。
