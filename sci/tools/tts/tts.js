let voices, cast = {}, script = [];
let names = [
    "David", "Hazel", "Zira", "Susan", "Richard", "George", "Linda", "Mark",
    "US English", "UK English Female", "UK English Male"
];
let alias = {"US English":"Sara", "UK English Female":"Liz", "UK English Male":"Phil"};
let pitch = {Sara:0.9, Linda:1.1, Hazel:0.8, Zira:1.2, Richard:0.9, Liz:0.9};

function loadVoices() {
    voices = speechSynthesis.getVoices();
    if (voices.length == 0) setTimeout(loadVoices, 200);
    else {
        for (let i=0;i<voices.length;i++) {
            let key = i;
            for (let j=0;j<names.length;j++) {
                let c = voices[i].name.search(names[j]);
                if (c != -1) key = names[j];
            }
            if (alias[key]) key = alias[key];
            if (typeof(key) == "number") key = "#" + key;
            cast[key] = voices[i];
        }
        if (!script.length) testScript();
        loadVoices.done();
    }
}

loadVoices.done = () => {};

function testScript() {
   let key;
    script = [];
    for (key in cast) {
        if (key.charAt(0) != "#") {
            script.push([`I'm ${key}. This is a test of your browser's speech synthesis feature.`, key]);
            console.log(key);
        }
    }
}

function play() {
    play.i = 0;
    play.start();
    sayNext();
}

play.start = function() {
    pluck.play();
    $("#Screen").css("background-color", "red");
    setTimeout(() => {$("#Screen").css("background-color", "white")}, 250);
}

function sayNext() {
    let err;
    try {say(...script[play.i++])}
    catch (err) {console.log("Done!")}
}

function say(text, name, pause, opt) {
    if (pause == null) pause = 0.5;
    let u = play.u = new SpeechSynthesisUtterance(text);
    Object.assign(u, {voice:cast[name], rate:1, lang:"en-CA"});
    if (pitch[name]) u.pitch = pitch[name];
    if (opt) Object.assign(u, opt);
    u.onend = function() {
        say.callback(u, name, 1);
        play.timeout = setTimeout(sayNext, 1000 * pause);
    }
    speechSynthesis.speak(u);
    say.callback(u, name, 0);
}

say.callback = function(u, name, when) {
    if (when == 0) say.log(u, name, 0);
}

say.log = function(u, name) {console.log(`${name}: ${u.text}`)}

function stop() {
    play.u.onend = function() {};
    clearTimeout(play.timeout);
}

// function loadScript() {
//     if (play.u) stop();
//     let url = $("#scriptURL").val();
//     if (url.substr(0, 4) != "http")
//         url = `script/${url}.js`;
//     $.getScript({url:url, cache:false, success:loadScript.done});
// }

// loadScript.done = function() {
//     console.log(`Loaded ${script.length} lines.`);
// }

$(function() {
    $.ajax({url:"../nav.htm", success:(e) => {
        $("body").append(e);
   }});
});