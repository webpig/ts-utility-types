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