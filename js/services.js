class Service{
    constructor(){}
    fetchData() {
        return axios({
          url: "https://625569798646add390d6709e.mockapi.io/api/TodoList",
          method: "GET",
        });
      };
    
    deleteToDo(id) {
        return axios({
          url: `https://625569798646add390d6709e.mockapi.io/api/TodoList/${id}`,
          method: "DELETE",
        });
      };
    
    addToDo(todo) {
        return axios({
          url: "https://625569798646add390d6709e.mockapi.io/api/TodoList",
          method: "POST",
          data: todo,
        });
      };
    
    getToDoById(id) {
        return axios({
          url: `https://625569798646add390d6709e.mockapi.io/api/TodoList/${id}`,
          method: "GET",
        });
      };
    
    updateToDo(id, toDo) {
        return axios({
          url: `https://625569798646add390d6709e.mockapi.io/api/TodoList/${id}`,
          method: "PUT",
          data: toDo,
        });
      };  
}


export default Service;