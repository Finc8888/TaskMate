class Task {
    taskList: any[];
    constructor() {
        this.taskList = [
        ]
    }
   async getTasks(url:string){
        let response = await fetch(url);
        try{
            if (response.ok) {             
                let json = await response.json();
                console.log(json);
                return Promise.resolve(json);
              } else {
                console.warn("Ошибка HTTP: " + response.status);
              }
        }
        catch(err){
            console.error(`Обнаружена ошибка : ${err}`)
        }

    }
}
export default Task;