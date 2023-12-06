const letterContainer= document.getElementById("letter-container");
const optionsContainer = document.getElementById ("options-container");
const userInputSection = document.getElementById("user-input-section");
const newGameContainer = document.getElementById("new-game-container" );
const newGameButton = document.getElementById("new-game-button");
const canvas = document.getElementById("canvas");
const resultText =document.getElementById("result-text");
console.log(letterContainer) //Para imprimir el contenido de letterContainer

let nombres = ["Juli","joaquin","Ignacio"];
//manejo de indices
console.log(nombres[0])
console.log(nombres[1])
console.log(nombres[2])

//corchetes alt+91 y alt+93
//longitud
console.log(nombres.length);
let options = {
    frutas: [
        "manzana",
        "frutilla",
        "pera",
        "sandia",
        "naranja",
        "mandarina",
        "uvas",
        "kiwi",
    ],
    animales: [
        "perro",
        "gato",
        "nutria",
        "jirafa",
        "rinoceronte",
        "leon",
        "pantera",
        "tortuga",
        "mamut",
        "hamster",
    ],
    paises: [
        "australia",
        "argentina",
        "suecia",
        "alemania",
        "chile",
        "irlanda",
        "africa",
        "españa",
        "mexico",
        "francia",
        "brasil",
        "camerun",
        "escocia",
        "inglaterra",
    ],
};
//contadores
let winCount= 0;
let count =0;
let chosenWord = "";

//alt+96 template literal (`)
//trabajar con el display de las opciones
const displayOptions = ()=> {
    optionsContainer.innerHTML += `<h3>Por favor seleccione una opcion</h3>`;
    //innerHTML nos sirve para poder ingresar codigo html en js
    let buttonCon = document.createElement("div");
    for (let value in options){
        buttonCon.innerHTML += `<button class="options" onClick="generateWord('${value}')">${value}</button>`;
    };
    //appendChild es agregar al ultimo (en este caso el boton)
    optionsContainer.appendChild(buttonCon);

};
//funcion para poder bloquear todos los botones
const blocker = ()=>{
    //crear dos variables
    let optionsButton = document.querySelectorAll(".options");
    let letterButton = document.querySelectorAll(".letters");

    optionsButton.forEach((button)=> {
        button.disabled = true;
    });

    letterButton.forEach((button)=>{
        button.disabled = true;
    });
    //eliminar la clase de la lista de elementos (deja sin estilos)
    newGameContainer.classList.remove("hide"); //va a mostrarlo

};
//generador de palabras
const generateWord = (optionValue)=>{
    let optionsButton = document.querySelectorAll(".options");
    optionsButton.forEach ((button)=>{
        if (button.innerText.toLowerCase()=== optionValue){
            button. classList.add("active");
        }
        button.disabled=true;
    });
    //inicializamos el contenido de las letras en cero y limpiamos lo anterior

letterContainer.classList.remove("hide");
userInputSection.innerText="";

let optionArray = options[optionValue];

//elegir una palabra aleatoria
chosenWord = optionArray [Math.floor(Math.random()* optionArray.length)];
chosenWord = chosenWord.toUpperCase();

//una vez que ya seleccione la palabra
//por cada letra vamos a reemplazarlo por un signo
let displayItem= chosenWord.replace(/./g,'<span class="dashes">_</span>');
userInputSection.innerHTML = displayItem;

};

//cuando hagamos click en el boton de "nuevo juego", se reinicie todo
const initializer = () => {
    winCount = 0;
    count = 0;

    userInputSection.innerHTML = "";
    optionsContainer.innerHTML = "";
    letterContainer.classList.add("hide");
    newGameContainer.classList.add ("hide");
    letterContainer.innerHTML="";

    //crear las letras //letras en mayuscula
    for (let i = 65; i <91; i++) {
        let button = document.createElement("button");
        button.classList.add("letters");
        button.innerText = String.fromCharCode (i);

        button.addEventListener("click", ()=>{
            let charArray = chosenWord.split("");
            let dashes = document.getElementsByClassName ("dashes");

            if (charArray.includes(button.innerText)){
                charArray.forEach((char,index)=>{
                    if (char === button.innerText){
                        dashes [index].innerText = char;
                        winCount +=1;
                        if (winCount === charArray.length){
                            resultText.innerHTML = `<h2 class="win-msg"> Ganaste</h2>`;
                            //esta es la funcion cuando estan activados los botones
                            blocker ();
                        }
                    }
                })
            } else{
                //contador de cuando perdemos
                count +=1;
                dibujarHombre(count);
                //contador= 6 (head,body,left arm,right arm,left leg,right leg)
                if (count==6) {
                    resultText.innerHTML=  `<h2 class="lose-msg">Perdiste</h2><p>La palabra era <span>${chosenWord}</span></p>`;
                    blocker ();
                }
            }
            //desactivar todos los botones
            button.disabled= true;
            });
            letterContainer.append(button);
        }
        displayOptions();
        let {initialDrawning} = canvasCreator();
        initialDrawning();
};   

//funcion para dibujar el hombrecito
const canvasCreator=()=>{
    //trabajar en una representacion bidimensional (x e y)
    let context = canvas.getContext("2d")
    context.beginPath();
    context.strokeStyle= "#000"; //color a la linea
    context.lineWidth= 2; //tamaño de la linea

    //como se van a dibujar las líneas
    const drawnLine  = (fromX, fromY, toX, toY) =>{
        context.moveTo(fromX,fromY)
        context.lineTo(toX,toY)
        context.stroke(); //metodo para dibujar trazos
    };

    //funcion para dibujar head
    const head = () =>{
        context.beginPath;
        context.arc(70,30,10,0,Math.PI*2,true);
        //calculos para la circunferencia
        context.stroke();
    };
    //funcion para dibujar el body
    const body = ()=>{
        drawnLine(70,40,70,80);
        //desde x, desde y, hasta x, hasta y
    };

    //funcion para dibujar el brazo izq
    const leftArm = ()=>{
        drawnLine(70,50,50,70);
    };

    //funcion para dibujar el brazo derecho
    const rightArm =()=>{
        drawnLine(70,50,90,70);
    };
    //funcion para dibujar la pierna izq
    const leftLeg=()=>{
        drawnLine(70,80,50,110);
    };
    //funcion para dibujar la pierna derecha
    const rightLeg=()=>{
    drawnLine(70,80,90,110);
    };
    const initialDrawning=()=>{
        //va a limpiar el dibujo
        context.clearRect(0,0,context.canvas.width,context.canvas.height);
        drawnLine(10,130,130,130);
        drawnLine(10,10,10,131);
        drawnLine(10,10,70,10);
        drawnLine(70,10,70,20);
    };
    //retornar todas las funciones creadas
    return{initialDrawning , head , body , leftArm , rightArm , leftLeg , rightLeg };
};

//funcion para dibujar al hombre dependiendo de como vayamos jugando
const dibujarHombre=(count)=>{
    //destructuramos la funcion
    let {head,body,leftArm,rightArm,leftLeg,rightLeg} = canvasCreator ();
    switch (count){
        case 1:
            head();
            break;
        case 2:
            body ();
            break;
        case 3:
            leftArm();
        case 4:
            rightArm();
            break;
        case 5:
            leftLeg();
            break;
        case 6:
            rightLeg();
            break;
        default:
            break;
    }
};
newGameButton.addEventListener("click",initializer)
window.onload=initializer;

        
        
        
    







//camelCase : la primera palabra toda en minúscula y a partir de la segunda
//palabra en adelante se pone la primera letra en Mayúscula