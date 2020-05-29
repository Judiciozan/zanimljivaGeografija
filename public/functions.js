export let ispisHof = (destination) => {
    
    db.collection('pojmovi')
        .get()
        .then(snapshot => {
            let setKorisnika = new Set();
            let nizKorisnika = [];
            let nizObjekata = [];

            snapshot.docs.forEach(doc => {
                setKorisnika.add(doc.data().korisnik);
                nizKorisnika.push(doc.data().korisnik);
            });

            setKorisnika.forEach(korisnik => {
                let br = 0;
                nizKorisnika.forEach( k => {if(k == korisnik) {br++}});
                nizObjekata.push({korisnik : korisnik, br: br});
            });
            
            nizObjekata.sort((a,b) => (a.br < b.br) ? 1 : -1 );
            let hofList = nizObjekata.slice(0, 5);

            hofList.forEach((obj, i) => {
                let li = `<li> ${i+1}. ${obj.korisnik} : ${obj.br} </li> `;
                destination.innerHTML += li;
            });
            
                })
        .catch(error => {
            console.error("Error getting documents: ", error);
    });
}

export let sreditiUnos = (value) => {
    let unos = value.replace(/[^a-žA-Ž]+/g, '');
    unos = unos.slice(0,1).toUpperCase() + unos.slice(1).toLowerCase(); 
    return unos;
}

export let random = (niz) => {
    let x = Math.floor(Math.random() * niz.length);
    return niz[x];
}
