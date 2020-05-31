import {random} from "./functions.js"


export let vsComp = (slovo, nizOdgovora, rezKomp, rezIgrac, destination1, destination2) => {

    let kategorije = ["Drzava", "Grad", "Reka", "Planina", "Zivotinja", "Biljka", "Predmet"];

    kategorije.forEach((k,i) => {
        proveraRezultata(k, slovo, nizOdgovora[i], rezKomp, rezIgrac, destination1, destination2);
    });
    
}

let proveraRezultata = (kategorija, pocetnoSlovo, vrednostPolja, rezKomp, rezIgrac, destination1, destination2) => {

    db.collection('pojmovi')
    .where('kategorija', '==', kategorija)
    .where('pocetnoSlovo', '==', pocetnoSlovo)
    .get()
    .then(snapshot => {
        let prisutan = false;
        let brIgrac;
        let brKomp;
        let komp;
        
        if (snapshot.docs.length > 0) {

            // odabir kompjuterovog odgovora
            //let komp;
            if(Math.random() < 0.8) {
                komp = random(snapshot.docs).data().pojam;
                console.log(komp);
            } else {
                komp = "nema pojam";
                console.log(komp);
            }
        
            if(vrednostPolja === komp) {
                brKomp = 5;
                brIgrac = 5;
            }
            else {
                snapshot.docs.forEach( doc => {
                    if(doc.data().pojam == vrednostPolja) {
                        prisutan = true;
                    }
                });

                if (prisutan) {
                    if(komp=="nema pojam") {
                        brKomp = 0;
                        brIgrac = 15;
                    }
                    else {
                        brKomp = 10;
                        brIgrac = 10;
                    }
                } else {
                    if (komp=="nema pojam") {
                        brKomp = 0;
                        brIgrac = 0;
                    } else {
                        brKomp = 15;
                        brIgrac = 0;
                    }
                }
            }

        } else {
            komp = "nema pojam";

            brKomp = 0;
            brIgrac = 0;
        }         
        rezKomp.push(brKomp);
        rezIgrac.push(brIgrac);

        if(kategorija=="Zivotinja") {kategorija="Životinja"};
        if(kategorija=="Drzava") {kategorija="Država"}; 
        
        destination1.innerHTML += `<tr> <td>${kategorija}</td> <td>${vrednostPolja}</td> <td>${brIgrac}</td></tr>`;
        destination2.innerHTML += `<tr> <td>${brKomp}</td> <td>${komp}</td> <td>${kategorija}</td></tr>`;
    });


}