import Task from './task';
$('#exampleModal').on('shown.bs.modal', function () {
    $('#myInput').trigger('focus')
  })
const task = new Task;
const UrlTasks = '/get_all_tasks';
const UrlClearTasks = '/truncate_tasks';
const UrlRemoveTask = '/remove_task'
const UrlCreateTask = '/create_task'

/**
 * Обработчик создания новой задачи
 */
document.getElementById("btn-create-task")?.addEventListener("click",async (e) =>{
    const form = document.forms[0];
    await fetch(UrlCreateTask, {method:'post', body: new FormData(form)});
    await buildTasks();
    //TODO type any
    ($('#taskModal') as any).modal('hide');
    e.preventDefault();
})
/**
 * Обработчик удаление всех текущих задач
 */
document.getElementById('btn-truncate-tasks')?.addEventListener('click',async (e) =>{
    await fetch(UrlClearTasks, {method:'post',body:''});
    await buildTasks();
    e.preventDefault();
})
/**
 * Построение списка всех текущих задач, хранящихся в базе
 */
const buildTasks = async ( ) => {
    task.taskList = await task.getTasks(UrlTasks);
    // очистка списка задач на странице
    let listElement = document.getElementsByClassName('task-list')[0];
    while (listElement.firstChild) {
        listElement.removeChild(listElement.firstChild);
    }
    for(let taskObj of task.taskList){

        let item = `
        <div class="card-group">
            <div class="card text-white bg-secondary mb-3" style="max-width: 18rem;">
                <div class="card-header">
                    <div class="date">${taskObj.created_on}</div>
                        <button type="button" data-id=${taskObj.id} id="btn-delete-task_${taskObj.id}" class="btn btn-danger btn-delete-task">X</button>
                    </div>
                <div class="card-body">
                    <h5 class="card-title">${taskObj.name}</h5>
                    <p class="card-text">${taskObj.comment ? taskObj.comment : ''}</p>
                </div>
            </div>
        </div>
        `;
        let listElement = document.getElementsByClassName('task-list')[0];
        listElement?.insertAdjacentHTML('beforeend',item);
        // на каждую кнопку вешаем свой обработчик удаления задачи
        document.getElementById(`btn-delete-task_${taskObj.id}`)?.addEventListener('click',async (e:any) =>{
            const id = e.target.dataset.id;
            await fetch(`${UrlRemoveTask}/${id}`, {method:'delete',body:''});
            await buildTasks();
            e.preventDefault();
        });
    }
}
/**
 * Запуск текущего функционала приложения
 */
const run = () => {
    buildTasks();

}

run();