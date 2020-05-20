export class Pojam {
    constructor(k, v){
        this.kategorija = k;
        this.vrednost = v;
        this.pojmovi = db.collection("pojmovi");
    }

    set kategorija (k) {
        this._kategorija = k;
    }
    set vrednost (v) {
        this._vrednost = v;
    }
    get kategorija () {
        return this._kategorija;
    }
    get vrednost () {
        return this._vrednost;
    }

    async addPojam(){
        let date = new Date();

        let docPojam = {
            kategorija : this.kategorija ,
            korisnik : localStorage.usernameLS,
            pocetnoSlovo : this.vrednost[0],
            pojam : this.vrednost,
            vreme : firebase.firestore.Timestamp.fromDate(date)  
        }   
        // da sacuvamo dokument u bazi
        let response = await this.pojmovi.add(docPojam);
        
        return response;
    }

    async proveraPojma() {
        this.pojmovi
        .where('kategorija', '==', this.kategorija)
        .where('pojam', "==", this.vrednost)
        .get()
        .then(snapshot => {
            if (snapshot.docs.length == 0) {
                this.addPojam();
                alert("Uspesno dodat pojam");
            } else {
                alert("Pojam vec postoji u bazi podataka");
            }
            
        })
        .catch(error => {
            console.error("Error getting documents: ", error);
        });
        
    }
}