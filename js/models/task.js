class Todo {
    constructor(id, title, content, is_done){
        this.id = id;
        this.title = title;
        this.content = content;
        this.is_done = is_done;
    }
    showContent(){
        console.log(this.content);
    }
}

export default Todo;