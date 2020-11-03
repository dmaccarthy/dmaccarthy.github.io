function randint(n) {return Math.floor(n * Math.random())}

function shuffle(a) {
    for (let i=a.length-1; i>0;i--) {
        let j = randint(i + 1); //Math.floor(Math.random() * (i + 1));
        [a[i], a[j]] = [a[j], a[i]];
    }
}