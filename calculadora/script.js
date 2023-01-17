const display=document.querySelector("#display");
const buttons=document.querySelectorAll("button");

buttons.forEach((item)=>{
    item.onclick=()=>{
        if(item.id=="clear"){
            display.innerText="";
        }else if(item.id=="backspace"){
            let cadena = display.innerText.toString();
            display.innerText=cadena.substr(0,cadena.length-1);
        }else if(display.innerText !="" && item.id=="equal"){
            display.innerText=eval(display.innerText);
        }else if(display.innerText=="" && item.id=="equal"){
            display.innerText="null";
            setTimeout(()=>display.innerText="",1500)
        }else if(item.id=="btn-toggler"){

        }else{
            display.innerText+=item.id;
        }
    }
})

const themeToggleBtn =document.querySelector(".theme-toggler");
const calculator=document.querySelector(".calculator");

let isDark = true; 
themeToggleBtn.onclick = () =>{
    calculator.classList.toggle("dark");
    themeToggleBtn.classList.toggle("active");
    isDark=!isDark;
}