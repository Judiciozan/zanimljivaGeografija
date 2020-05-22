import {Pojam} from "./pojam.js";
import { ispisHof } from "./functions.js";





let modal = document.querySelector(".modal");
let trigger = document.querySelector(".trigger");
let closeButton = document.querySelector(".close-button");

let usernameForm = document.querySelector("#usernameForm");
let usernameInput = document.querySelector("#usernameInput");

let noviUnosForm = document.querySelector("#noviUnosForm");
let kategorijaSelect = document.querySelector("#kategorijaSelect");
let pojamInput = document.querySelector("#pojamInput");
let divHof = document.querySelector("#divHof");




function toggleModal() {
    modal.classList.toggle("show-modal");
}

function windowOnClick(event) {
    if (event.target === modal) {
        toggleModal();
    }
}

//deo za 
trigger.addEventListener("click", toggleModal);
closeButton.addEventListener("click", toggleModal);

if(localStorage.usernameLS){
    closeButton.setAttribute("style", `visibility: visible`);
    window.addEventListener("click", windowOnClick);
    
} else {
    toggleModal();
    closeButton.setAttribute("style", `visibility: hidden`);
}

usernameForm.addEventListener('submit' , e => {
    e.preventDefault();
    
    let patternUsername =  /^[\S]*[\S]$/;
    let username = usernameInput.value;
    
    if(patternUsername.test(username)){
        localStorage.setItem('usernameLS', username);
        toggleModal();
        location.reload(); 
    } else {
        alert('Username nevalidan. Polje ne sme biti prazno ili da sadrzi razmak.');
    }

    usernameForm.reset();
    console.log(username);
});


noviUnosForm.addEventListener("submit", e => {
    e.preventDefault();

    let kategorija = kategorijaSelect.value;
    let pojam =  pojamInput.value.replace(/[^a-žA-Ž]+/g, '');

    if(!pojam) {
        alert('Unos nije validan');
    }
    else {
        pojam = pojam[0].toUpperCase() + pojam.slice(1).toLowerCase(); 
        let unos = new Pojam (kategorija, pojam);
        unos.proveraPojma();
        console.log(kategorija, pojam);
    }
    noviUnosForm.reset();
});


//ne diraj
ispisHof(divHof);

