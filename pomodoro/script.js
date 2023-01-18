const tasks=[]; //Arreglo para almacenar tareas
let time=0;
let timer = null; //Variable para controlar el tiempo de ejecución de tarea
let timerBreak = null; //Variable para controlar el tiempo de descanso
let current = null;

//Referencias a elementos HTML
const btnAdd=document.querySelector('#btnAdd');
const txtTask=document.querySelector('#txtTask');
const form=document.querySelector('#form');
let taskName=document.querySelector('#time #taskName');

renderTime();
renderTasks();

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
                    ? `<span class="done">Completada</span>`        //Operador ternario afirmativo si la tarea está completada
                    : `<button class="start-button" data-id="${task.id}">Iniciar</button>`    //Si no está completada coloca un botón para iniciar tarea
                }   
                </div>
                <div class="title">${task.title}
                </div>
            </div>
        `;
    });
    const tasksContainer=document.querySelector(".tasks");
    tasksContainer.innerHTML=html.join("");                       //El método map genera una matriz de strings, con el método join los une en una cadena

    const startButtons = document.querySelectorAll(".task .start-button");  //Devuelve una NodeList que coincide con los elementos indicados
    startButtons.forEach((button)=>{                                        //Recorre la nodelist y ejecuta:
        button.addEventListener("click",(e)=>{                              //Busca qué botón ha sido presionado
            if(!timer){                                                     //Si el timer está vacío
                const id=  button.getAttribute("data-id");
                startButtonHandler(id);
                button.textContent="En progreso...";
            }
        })
    })
}

function startButtonHandler(id){
    time=25*60;
    current=id;
    const taskIndex=tasks.findIndex(task=>task.id==id);                     //Almacena el índice del elemento del arreglo de tasks que coincida con el id pasado como argumento
    
    taskName.textContent=tasks[taskIndex].title;
    renderTime();
    timer=setInterval(()=>{                                                 //Cada seg. se llama a la función que resta el tiempo
        timeHandler(id);
    },1000);
}

function timeHandler(id){
    time--;                                                                 //Resta el tiempo en un seg
    renderTime();                                                           //Llama a función que actualiza el cronometro

    if(time==0){                                                            //Cuando el tiempo llega a cero
        clearInterval(timer);                                               //Detiene el intervalo    
        timer=null;
        markCompleted(id);                                                  //Llama a función que cambia la propiedad completed
        renderTasks();                                                      //Actualiza la sección de tareas
        startBreak();                                                       //Llama a función que inicia el descanso
    }
}

function startBreak(){
    time=5*60;
    taskName.textContent="Break";
    renderTime();
    timerBreak=setInterval(()=>{
        timerBreakHandler();
    },1000);
}

function timerBreakHandler(){
    time--;                                                                 
    renderTime();                                                           

    if(time==0){                                                            
        clearInterval(timerBreak);
        timerBreak=null;
        current=null;
        taskName.textContent="";                                                       
        renderTasks();                                                      
    }
}

function renderTime(){
    const minutes=parseInt(time/60);
    const seconds=parseInt(time%60);
    const timeDiv=document.querySelector('#time #value');   
    timeDiv.textContent=`${minutes<10 ? `0` :``}${minutes}:${seconds<10 ? `0` : ``}${seconds}`; //Coloca en la sección de time el cronómetro con el formato 00:00

}

function markCompleted(id){
    const taskIndex=tasks.findIndex(task=>task.id==id);                     //Busca en el arreglo de tareas la que coincida con el id de tarea y almacena el índice
    tasks[taskIndex].completed=true;                                        //Cambia la propiedad completed a True
}