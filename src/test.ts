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

