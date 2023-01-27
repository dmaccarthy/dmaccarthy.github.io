function loadVoices() {
    voices = speechSynthesis.getVoices();
    if (voices.length) console.log(voices);
    else setTimeout(loadVoices, 200);  
}

loadVoices();

function say(text) {
    let u = new SpeechSynthesisUtterance(text);
    Object.assign(u, {lang:"en-CA"});
    Object.assign(u, say.voice);
    u.onend = function() {
        play.timeout = setTimeout(nextItem, 1);
    }
    speechSynthesis.speak(u);
}

say.cast = [0];

function play() {
    let err;
    goTime(0);
    try {initPlay()}
    catch(err) {}
    clearTimeout(play.timeout);
    play.item = 0;
    nextItem();
}

play.script = [];

function nextItem() {
    let s = play.script;
    if (play.item >= s.length) {
        console.log("Fin!");
        return;
    }
    let item = s[play.item++];
    console.log(item);
    if (typeof(item) == "string") say(item);
    else {
        let a = item.action, p = item.pause;
        if (a) {
            if (typeof(a) == "string") eval(a);
            else a();
        }
        if (item.voice != null) {
            let v = Object.assign({}, item);
            let n = v.voice;
            if (typeof(n) == "number") v.voice = voices[say.cast[n]];
            say.voice = v;
            console.log(say.voice);
        }
        play.timeout = setTimeout(nextItem, p ? p : 1);
    }
}

function loadScript(url) {
    $.getScript(url, function() {
        let n = say.cast.length;
        let s = "";
        for (let i=0; i<n; i++) {
            s += (i ? ", " : "") + i;
        }
        // console.log(`To set voices, type 'say.cast = [${s}]'`);
    });
}

function setCast(...names) {
    let c = [];
    for (let j=0;j<names.length;j++) {
        c.push(0);
        for (let i=0;i<voices.length;i++) {
            if (voices[i].name.indexOf(names[j]) > -1) {
                c[j] = i;
            }
        }
    }
    say.cast = c;
}
