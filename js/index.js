import Todo from "./models/task.js";
import Service from "./services.js";

const service = new Service();
function GetEleID(id){
    return document.getElementById(id);
}

async function getTodoList(){
    try{
        let result = await service.fetchData();
        return result.data;

    }
    catch(error){
        return [];
    }
}
// const data = await getTodoList();
// console.log(data);
async function bindingTodoList(){
    const data = await getTodoList();
    console.log(data);
    const todoList = data.map((item, index)=>{
        let todo = new Todo(item.id, item.title, item.content, item.is_done);
        return todo;
    })
    console.log(todoList);
    const resultHtml = todoList.reduce((result,todoObj)=>{
        const {content} = todoObj;
        console.log(result);
        return result += `
            <li>${content} 
            <span class="">
            <i class="fa fa-trash" aria-hidden="true" ></i>
            <i class="fa fa-check-circle" aria-hidden="true"></i></span>
            </li>
        `;
    },"");

    GetEleID("todo").innerHTML = resultHtml;
}
bindingTodoList();
// const promise = new Promise((resolve, reject)=>{
//     const test = axios({
//         url: "https://625569798646add390d6709e.mockapi.io/api/TodoList",
//         method: "GET",
//     })
//     console.log(test);
//     if (test.status == 200){
//         resolve(test.data);
//     }
//     resolve(test.data);
// })

// promise.
// then((result)=>{
//     console.log("bma")
//     console.log(result);
// })