import {Pojam} from "./pojam.js";
import { ispisHof } from "./functions.js";
import { sreditiUnos } from "./functions.js";
import { random } from "./functions.js";
import {vsComp} from "./vsComp.js";


let divUsername = document.querySelector("#divUsername");
let trigger = document.querySelector(".trigger");
let closeButton = document.querySelector(".close-button");
let usernameForm = document.querySelector("#usernameForm");
let usernameInput = document.querySelector("#usernameInput");
let noviUnosForm = document.querySelector("#noviUnosForm");
let kategorijaSelect = document.querySelector("#kategorijaSelect");
let pojamInput = document.querySelector("#pojamInput");

let divHof = document.querySelector("#divHof");
let olHof = document.querySelector("#olHof");

let formIgraKomp = document.querySelector("#formIgraKomp");
let spanIzabranoSlovo = document.querySelector("#spanIzabranoSlovo");
let btnNovaIgra = document.querySelector("#btnNovaIgra");

let inputDrzava = document.querySelector("#inputDrzava");
let inputGrad = document.querySelector("#inputGrad");
let inputBiljka = document.querySelector("#inputBiljka");
let inputZivotinja = document.querySelector("#inputZivotinja");
let inputPredmet = document.querySelector("#inputPredmet");
let inputReka = document.querySelector("#inputReka");
let inputPlanina = document.querySelector("#inputPlanina");
let preostaloVreme = document.querySelector("#preostaloVreme");
let zavrsioSam = document.querySelector("#zavrsioSam");

let divOdgovori = document.querySelector("#divOdgovori");
let tabelaIgrac = document.querySelector("#tabelaIgrac");
let tabelaKomp = document.querySelector("#tabelaKomp");
let zatvoriIgru = document.querySelector("#zatvoriIgru");
let brPoenaIgrac = document.querySelector("#brPoenaIgrac");
let brPoenaKomp = document.querySelector("#brPoenaKomp");
let pobednik = document.querySelector("#pobednik");



let toggleModal = (id) => {
    id.classList.toggle("show-modal");
}

function windowOnClick(event, id) {
    if (event.target === id) {
        toggleModal(id);
    }
}


//deo za username formu i dugme promeniti username
trigger.addEventListener("click", e => {
    toggleModal(divUsername);
});
closeButton.addEventListener("click", e => {
    toggleModal(divUsername);
});

if(localStorage.usernameLS){
    closeButton.setAttribute("style", `visibility: visible`);
    window.addEventListener("click", e => {
        windowOnClick(e, divUsername);
    });
} else {
    toggleModal(divUsername);
    closeButton.setAttribute("style", `visibility: hidden`);
}


usernameForm.addEventListener('submit' , e => {
    e.preventDefault();
    
    let patternUsername =  /^[\S]*[\S]$/;
    let username = usernameInput.value;
    
    if(patternUsername.test(username)){
        localStorage.setItem('usernameLS', username);
        toggleModal(divUsername);
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
    let pojam = sreditiUnos(pojamInput.value);

    if(!pojam) {
        alert('Unos nije validan');
        
    }
    else {
        let unos = new Pojam (kategorija, pojam);
        unos.proveraPojma();
        console.log(kategorija, pojam);
    }
    noviUnosForm.reset();
});


//ne diraj
//ispisHof(olHof);


//formIgraKomp.classList.toggle("no-visible");
//divOdgovori.classList.toggle("no-visible");



let vreme;
let izabranoSlovo;
let slova = ['A', 'B', 'C', 'Č', 'Ć', 'D', 'Dž', 'Đ', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'Lj', 'M', 'N', 'Nj', 'O', 'P', 'R', 'S', 'Š', 'T', 'U', 'V', 'Z', 'Ž'];
let timer;
var qwe;
var rezIgrac = [];
var rezKomp = [];


btnNovaIgra.addEventListener('click', e => {
    e.preventDefault();
    //formIgraKomp.classList.toggle("no-visible");
    formIgraKomp.reset();
    zavrsioSam.disabled = false;
    izabranoSlovo = random(slova);
    spanIzabranoSlovo.innerHTML=`Izabrano slovo je: ${izabranoSlovo}`;

    let time = 60;
    if(vreme) {clearInterval(vreme)};

    vreme = setInterval(() => {
        if (time > 0){
            time--;
            preostaloVreme.innerHTML =`${time}s`;   
        }
        else {
            clearInterval(vreme);
            zavrsioSam.click();
        }
    }, 1000);

});

formIgraKomp.addEventListener('submit', e => {
    e.preventDefault();
    clearInterval(vreme);
    zavrsioSam.disabled = true;
    
    preostaloVreme.innerHTML =``;
    spanIzabranoSlovo.innerHTML =``;
    
    //formIgraKomp.classList.toggle("no-visible");
    //divOdgovori.classList.toggle("no-visible");
    
    rezIgrac = [];
    rezKomp = [];
    
    let drzava = sreditiUnos(inputDrzava.value) || "nista";
    let grad = sreditiUnos(inputGrad.value) || "nista";
    let reka = sreditiUnos(inputReka.value) || "nista";
    let planina = sreditiUnos(inputPlanina.value) || "nista";
    let zivotinja = sreditiUnos(inputZivotinja.value) || "nista";
    let biljka = sreditiUnos(inputBiljka.value) || "nista";
    let predmet = sreditiUnos(inputPredmet.value) || "nista";

    let nizOdgovora = [drzava, grad, reka, planina, zivotinja, biljka, predmet]

    
    vsComp(izabranoSlovo, nizOdgovora, rezKomp, rezIgrac, tabelaIgrac, tabelaKomp);
    

    console.log(rezIgrac);
    console.log(rezKomp);

    let prekid = 0;
    qwe = setInterval(()=> {
        if(rezIgrac.length==7 && rezKomp.length==7 || prekid==25){
            console.log(rezIgrac);
            console.log(rezKomp);
            let igrac = rezIgrac.reduce(function(a, b){return a + b}, 0);
            let komp = rezKomp.reduce(function(a, b){return a + b}, 0);
            brPoenaIgrac.innerHTML = `${igrac}`;
            brPoenaKomp.innerHTML = `${komp}`;

            if(igrac > komp) {
                pobednik.textContent = `Igrač je pobedio`;
            } else if( komp > igrac){
                pobednik.textContent = `Komp je pobedio`;
            } else {
                pobednik.textContent = `Nerešeno`;
            }
            console.log(igrac, komp);
            toggleModal(divOdgovori);
            clearInterval(qwe);
        }
        else {
            prekid+=1;
        }
    }, 200);

    
    formIgraKomp.reset();
    
});

window.addEventListener("click", e => {
    windowOnClick(e, divOdgovori);
});
zatvoriIgru.addEventListener("click", e => {
    pobednik.textContent = '';
    tabelaIgrac.innerHTML = '';
    tabelaKomp.innerHTML = '';
    toggleModal(divOdgovori);
});




// let wordArray = [];
// let words = '';


// //let words2 = ''

// wordArray = words.split(" ");

// console.log(wordArray);
// let blabla = new Set (wordArray);
// console.log(blabla);

// blabla.forEach((word,i) => {
//     let p = new Pojam("Planina", word);
//     p.proveraPojma();
//     console.log(word);
// });