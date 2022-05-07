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
          url: `https://5a6451dcf2bae00012ca1a6a.mockapi.io/api/TodoList/${id}`,
          method: "DELETE",
        });
      };
    
    addToDo(todo) {
        return axios({
          url: "https://5a6451dcf2bae00012ca1a6a.mockapi.io/api/TodoList",
          method: "POST",
          data: product,
        });
      };
    
    getToDoById(id) {
        return axios({
          url: `https://5a6451dcf2bae00012ca1a6a.mockapi.io/api/TodoList/${id}`,
          method: "GET",
        });
      };
    
    updateToDo(todo) {
        return axios({
          url: `https://5a6451dcf2bae00012ca1a6a.mockapi.io/api/TodoList/${todo.id}`,
          method: "PUT",
          data: product,
        });
      };
}


export default Service;