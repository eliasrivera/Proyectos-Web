const tasks=[]; //Arreglo para almacenar tareas
let time=0;
let timer = null; //Variable para setInterval
let timerBreak = null; //Variable para descanso
let current = null;

//Referencias a elementos HTML
const btnAdd=document.querySelector('#btnAdd');
const txtTask=document.querySelector('#txtTask');
const form=document.querySelector('#form');

form.addEventListener("submit",e=>{
    e.preventDefault();                 //Cancela el evento submit
    if(txtTask.value != ''){            //Si existe una tarea en el input
        createTask(txtTask.value);      //Llama a la función createTask y pasa como argumento el valor del input
        txtTask.value='';               //Elimina el contenido del input
    }
    renderTasks();
});

function createTask(value){
    const newTask={                                             //Crea una nueva tarea "Objeto"
        id: (Math.random()*100).toString(36).slice(3),          //Genera un número random para el Id
        title: value, 
        completed: false
    };
    console.log(newTask);
    tasks.unshift(newTask);                                     //Agrega la nueva tarea al inicio del arreglo
}

function renderTasks(){                                         //Toma las tareas, genera un html que se inyecta en un contenedor
    const html=tasks.map((task)=>{                                //Mapea, y por cada elemento del arreglo escribe el siguiente código
        return `
            <div class=task>
                <div class="completed">${task.completed 
                    ? `<span class="done">"Done"</span>`        //Operador ternario afirmativo si la tarea está completada
                    : `<button class="start-button" data-id="${task.id}">Start</button>`    //Si no está completada coloca un botón para iniciar tarea
                }   
                </div>
                <div class="title">${task.title}
                </div>
            </div>
        `;
    });
    const tasksContainer=document.querySelector(".tasks");
    tasksContainer.innerHTML=html.join("");                       //El método map genera una matriz de strings, con el método join los une en una cadena
}