/**
 * 暂时直接使用官方例子进行测试
 */

// test MyPartial
interface Todo {
    title: string;
    description: string;
}
   
function updateTodo(todo: Todo, fieldsToUpdate: MyPartial<Todo>) {
    return { ...todo, ...fieldsToUpdate }
}
   
const todo1 = {
    title: "organize desk",
    description: "clear clutter",
}
   
const todo2 = updateTodo(todo1, {
    description: "throw out trash",
})

// test MyRequired
interface Props {
    a?: number;
    b?: string;
}
   
const obj: Props = { a: 5 };

const obj2: MyRequired<Props> = { a: 5 }; // Property 'b' is missing in type '{ a: number; }' but required in type 'MyRequired<Props>'.

// test MyReadonly
interface Todo3 {
    title: string;
}
   
const todo3: MyReadonly<Todo3> = {
    title: "Delete inactive users",
};
   
todo3.title = "Hello"; // Cannot assign to 'title' because it is a read-only property.

// test Record
interface CatInfo {
    age: number;
    breed: string;
}
   
type CatName = "miffy" | "boris" | "mordred";
   
const cats: MyRecord<CatName, CatInfo> = {
    miffy: { age: 10, breed: "Persian" },
    boris: { age: 5, breed: "Maine Coon" },
    mordred: { age: 16, breed: "British Shorthair" },
};
   
cats.boris; // const cats: MyRecord<CatName, CatInfo>

// test Pick
interface Todo {
    title: string;
    description: string;
    completed: boolean;
}
   
type TodoPreview = MyPick<Todo, "title" | "completed">;
   
const todo: TodoPreview = {
    title: "Clean room",
    completed: false,
};
   
todo; // const todo: TodoPreview

// test Exclude
type T0 = MyExclude<"a" | "b" | "c", "a">; // type T0 = 'b' | 'c'
type T1 = MyExclude<"a" | "b" | "c", "a" | "b">; // type T1 = 'c'
type T2 = MyExclude<string | number | (() => void), Function>; // type T2 = string | number

// test Omit
interface OmitTodo {
    title: string;
    description: string;
    completed: boolean;
    createdAt: number;
}
   
type OmitTodoPreview = MyOmit<OmitTodo, "description">;
   
const omitTodo: OmitTodoPreview = {
    title: "Clean room",
    completed: false,
    createdAt: 1615544252770,
};
   
type TodoInfo = MyOmit<Todo, "completed" | "createdAt">;
   
const todoInfo: TodoInfo = {
    title: "Pick up kids",
    description: "Kindergarten closes at 5pm",
};

// text Extract
type ExtractT0 = MyExtract<"a" | "b" | "c", "a" | "f">; // type ExtractT0 = 'a'
type ExtractT1 = MyExtract<string | number | (() => void), Function>; // type ExtractT1 = () => void

// test  NonNullable
type NonNullableT0 = MyNonNullable<string | number | undefined>; // type NonNullableT0 = string | number
type NonNullableT1 = MyNonNullable<string[] | null | undefined>; // type NonNullableT1 = string[]

// test Parameters
declare function f1(arg: { a: number; b: string }): void;
 
type MyParametersT0 = Parameters<() => string>; // type MyParametersT0 = []
type MyParametersT1 = Parameters<(s: string) => void>; // type MyParametersT1 = [s: string]
type MyParametersT2 = Parameters<<T>(arg: T) => T>; // type MyParametersT2 = [arg: unknown]
type MyParametersT3 = Parameters<typeof f1>; // type MyParametersT3 = [arg: { a: number, b: dtring }]
type MyParametersT4 = Parameters<any>; // type MyParametersT4 = unknown[]
type MyParametersT5 = Parameters<never>; // type MyParametersT5 = never
type MyParametersT6 = Parameters<string>; // type MyParametersT6 = never
type MyParametersT7 = Parameters<Function>; // type MyParametersT7 = never

// type ConstructorParameters
type ConstructorParametersT0 = MyConstructorParameters<ErrorConstructor>;
type ConstructorParametersT1 = MyConstructorParameters<FunctionConstructor>;     
type ConstructorParametersT2 = MyConstructorParameters<RegExpConstructor>;     
type ConstructorParametersT3 = MyConstructorParameters<any>;
type ConstructorParametersT4 = MyConstructorParameters<Function>;


// test ReturnType
declare function f1(): { a: number; b: string };
 
type ReturnTypeT0 = MyReturnType<() => string>;
type ReturnTypeT1 = MyReturnType<(s: string) => void>;
type ReturnTypeT2 = MyReturnType<<T>() => T>;
type ReturnTypeT3 = MyReturnType<<T extends U, U extends number[]>() => T>;
type ReturnTypeT4 = MyReturnType<typeof f1>;
type ReturnTypeT5 = MyReturnType<any>;
type ReturnTypeT6 = MyReturnType<never>;
type ReturnTypeT7 = MyReturnType<string>;
type ReturnTypeT8 = MyReturnType<Function>;

// test InstanceType
class C {
    x = 0;
    y = 0;
}
   
type InstanceTypeT0 = MyInstanceType<typeof C>;
type InstanceTypeT1 = MyInstanceType<any>;
type InstanceTypeT2 = MyInstanceType<never>;
type InstanceTypeT3 = MyInstanceType<string>;
type InstanceTypeT4 = MyInstanceType<Function>;

// test ThisParameterType
function toHex(this: Number) {
    return this.toString(16);
}
   
function numberToString(n: MyThisParameterType<typeof toHex>) {
    return toHex.apply(n);
}