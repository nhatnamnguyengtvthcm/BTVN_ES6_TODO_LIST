import Todo from "./models/task.js";
import Service from "./services.js";
let deleteId = -1;
const service = new Service();
function getEleID(id){
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
async function bindingTodoList(sort_key="") {
  const data = await getTodoList();
  if(sort_key==="dsc"){
    data.sort((a, b)=>{
      let fa = a.content.toLowerCase();
      let fb = b.content.toLowerCase();
      console.log();
      if(fa < fb){
        return -1;
      }
      if(fa > fb){
        return 1;
      }
      return 0;
    })
  }
  else if(sort_key==="desc"){
    data.sort((a, b)=>{
      let fa = a.content.toLowerCase();
      let fb = b.content.toLowerCase();
      console.log(fa);
      console.log(fb);
      if(fa > fb){
        return -1;
      }
      if(fa < fb){
        return 1;
      }
      return 0;
    })
  };
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
                        <button data-toggle="modal" data-target="#deleteModalId" onclick="getTodoDeleted(${id})">
                            <i class="fa fa-trash" aria-hidden="true"></i>
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
    const { id, content } = todoObj;
    // console.log(result);
    return (result += `
            <li>${content} 
            <div class="buttons">
                <button data-toggle="modal" data-target="#deleteModalId" onclick="getTodoDeleted(${id})">
                    <i class="fa fa-trash" aria-hidden="true" ></i>
                </button>
                <span class=""><i class="fa fa-check-circle fa-1.5x" aria-hidden="true"></i></span>
            </div>
                           
            </li>
        `);
  }, "");
  getEleID("todo").innerHTML = resulTodotHtml;
  getEleID("completed").innerHTML = resulTodoCompletetHtml;
}
bindingTodoList();

async function addTodoList(content){
    try{
        const addTodo = await service.addToDo(content);
        console.log(addTodo);
        if(addTodo.status == 201){
            getEleID("message-body").innerHTML = "Sucessfully";
            getEleID("message-title").innerHTML = "ADD TODO";
            getEleID("showMessageBtn").click();
        }
    }
    catch(err){
        console.log("err");
        getEleID("message-body").innerHTML = "Unsucessfully";
        getEleID("message-title").innerHTML = "ADD TODO";
        getEleID("showMessageBtn").click();
    }
}

getEleID("addItem").addEventListener("click", async()=>{
    let todoContent = getEleID("newTask").value;
    let todo = {
        "content": todoContent,
        "is_done": false
    }
    // console.log(todo);
    await addTodoList(todo);
    bindingTodoList();
});

window.updateState =  async(id, status)=>{
    // console.log("he");
    let dct = {
        "is_done": status
    };
    try{
        // console.log("k");
        let toDoUpdate = await service.updateToDo(id, dct);
        console.log(toDoUpdate);
        if(toDoUpdate.status == 200){
            getEleID("message-body").innerHTML = "Sucessfully";
            getEleID("message-title").innerHTML = "UPDATE STATE";
            getEleID("showMessageBtn").click();
            bindingTodoList();
        }
    }
    catch(err){
        // console.log("err");
        getEleID("message-body").innerHTML = "Unsucessfully";
        getEleID("message-title").innerHTML = "UPDATE STATE";
        getEleID("showMessageBtn").click();
    }
    
}

window.confirmDeleteUser = async()=>{
  try{
    // console.log("k");
    let ToDoDeleted = await service.deleteToDo(deleteId);
    console.log(ToDoDeleted);
    if(ToDoDeleted.status == 200){
        getEleID("message-body").innerHTML = "Sucessfully";
        getEleID("message-title").innerHTML = "DELETE TODO";
        getEleID("showMessageBtn").click();
        deleteId = -1;
        bindingTodoList();
    }
  }
  catch(err){
    // console.log("err");
    getEleID("message-body").innerHTML = "Unsucessfully";
    getEleID("message-title").innerHTML = "DELETE TODO";
    getEleID("showMessageBtn").click();
  }
};


window.getTodoDeleted = (id) => {
  deleteId = id;
};

console.log("lll");
getEleID("two").addEventListener("click", ()=>{
  console.log("nam");
  bindingTodoList("dsc");
});

getEleID("three").addEventListener("click", ()=>{
  console.log("nam");
  bindingTodoList("desc");
});
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
