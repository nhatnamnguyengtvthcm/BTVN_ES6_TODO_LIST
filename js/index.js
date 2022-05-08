import Todo from "./models/task.js";
import Service from "./services.js";

const service = new Service();
function GetEleID(id) {
  return document.getElementById(id);
}

async function getTodoList() {
  try {
    let result = await service.fetchData();
    return result.data;
  } catch (error) {
    return [];
  }
}
// const data = await getTodoList();
// console.log(data);
async function bindingTodoList() {
  const data = await getTodoList();
//   console.log(data);
  // const todoList = data.map((item, index)=>{
  //     let todo = new Todo(item.id, item.title, item.content, item.is_done);
  //     return todo;
  // });
  const todoList = data.filter((item, index) => {
    return item.is_done == false;
  });
//   console.log(todoList);
  const resulTodotHtml = todoList.reduce((result, todoObj) => {
    const { id, content } = todoObj;
    // console.log(result);
    return (result += `
            <li>${content} 
                <div class="buttons">
                        <button>
                            <i class="fa fa-trash" aria-hidden="true" onclick="deleteTodo(${id})"></i>
                        </button>
                        <button class="" onclick="updateState(${id}, true)"><i class="fa fa-check-circle" aria-hidden="true"></i>
                        </button>
                </div>
            </li>
        `);
  }, "");
  const todoCompleteList = data.filter((item, index) => {
    return item.is_done == true;
  });
  const resulTodoCompletetHtml = todoCompleteList.reduce((result, todoObj) => {
    const { content } = todoObj;
    // console.log(result);
    return (result += `
            <li>${content} 
            <div class="buttons">
                <button>
                    <i class="fa fa-trash" aria-hidden="true" ></i>
                </button>
                <span class=""><i class="fa fa-check-circle fa-1.5x" aria-hidden="true"></i></span>
            </div>
                           
            </li>
        `);
  }, "");
  GetEleID("todo").innerHTML = resulTodotHtml;
  GetEleID("completed").innerHTML = resulTodoCompletetHtml;
}
bindingTodoList();

async function addTodoList(content){
    try{
        const addTodo = await service.addToDo(content);
        console.log(addTodo);
        if(addTodo.status == 201){
            GetEleID("message-body").innerHTML = "Sucessfully";
            GetEleID("message-title").innerHTML = "ADD TODO";
            GetEleID("showMessageBtn").click();
        }
    }
    catch(err){
        console.log("err");
        GetEleID("message-body").innerHTML = "Unsucessfully";
        GetEleID("message-title").innerHTML = "ADD TODO";
        GetEleID("showMessageBtn").click();
    }
}

GetEleID("addItem").addEventListener("click", async()=>{
    let todoContent = GetEleID("newTask").value;
    let todo = {
        "content": todoContent,
        "is_done": fas
    }
    // console.log(todo);
    await addTodoList(todo);
    bindingTodoList();
});

window.updateState =  async(id, status)=>{
    console.log("he");
    let dct = {
        "is_done": status
    };
    try{
        console.log("k");
        let toDoUpdate = await service.updateToDo(id, dct);
        console.log(toDoUpdate);
        if(toDoUpdate.status == 200){
            GetEleID("message-body").innerHTML = "Sucessfully";
            GetEleID("message-title").innerHTML = "UPDATE STATE";
            GetEleID("showMessageBtn").click();
            bindingTodoList();
        }
    }
    catch(err){
        // console.log("err");
        GetEleID("message-body").innerHTML = "Unsucessfully";
        GetEleID("message-title").innerHTML = "UPDATE STATE";
        GetEleID("showMessageBtn").click();
    }
    
}

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
