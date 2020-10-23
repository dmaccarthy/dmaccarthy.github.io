let delim; // ⌚

function reset() {
    localStorage.removeItem("voice_cast");
    location.reload();
}

function test(txt) {
    stop();
    let u = new SpeechSynthesisUtterance(txt[0]);
    u.lang = "en-CA";
    u.voice = speak.voice;
    u.text = txt;
    speechSynthesis.speak(u);
}

// speechSynthesis.onvoiceschanged = function() {
//     if (voiceList.length == 0) {
//         voiceList = speechSynthesis.getVoices();
//         getCast();
// 		showVoices();
//     }
// }

// let voiceList = speechSynthesis.getVoices();
let voiceList;

function loadVoices() {
    voiceList = speechSynthesis.getVoices();
    if (voiceList.length) {
        getCast();
		showVoices();
    }
    else setTimeout(loadVoices, 250);
}

$(loadVoices);

let cast = {};

function showVoices() {
	let k;
	let div = $("#Cast").html("");
	for (let i=0;i<voiceList.length;i++) {
		let v = voiceList[i];
		let n = v.name;
		for (k in cast) if (n == cast[k].name) {
			n = `<b>${k}</b>: ${n}`;
		}
		let s = $("<span>").html(n).click(selectVoice);
		s[0].voice = v;
		div.append($("<p>").html(s));
	}
}

function selectVoice() {
    let name = prompt("Voice nickname?");
    if (name) {
        cast[name] = this.voice;
        let c = {};
        for (name in cast) {
            c[name] = cast[name].name;
        }
        localStorage.setItem("voice_cast", JSON.stringify(c));
		showVoices();
    }
}

function getVoice(name) {
    name = name.toLowerCase();
    for (let i=0;i<voiceList.length;i++) {
        if (voiceList[i].name.toLowerCase() == name)
            return voiceList[i];
    }
}

function getCast() {
    let c = localStorage.getItem("voice_cast");
    if (c) {
        c = JSON.parse(c);
        let name, i, names = [];
        for (name in c) names.push(name);
        for (i=0;i<names.length;i++) {
            let v = getVoice(c[names[i]]);
            if (v) {
                cast[names[i]] = v;
            }
        }
    }
}

function loadFile() {
    stop();
	let f = $("#file")[0].files[0];
	var reader = new FileReader();
	reader.addEventListener("load", scriptLoaded);
	reader.readAsText(f, "utf8");
}

function scriptLoaded(e) {
    e = e.target.result.trim().split("\n");
    delim = e[0].charAt(0);
	let data = [];
	scriptLoaded.scenes = [];
	let v;
    for (let i=0;i<e.length;i++) {
        let txt = e[i].split("###")[0].trim();
        if (txt.length) {
            let c = txt.charAt(0);
			if (c == "$") scriptLoaded.scenes.push(data.length);
			else if (c == delim) speak.pause = parseInt(txt.slice(1));
			else if (c == "@") {
				v = txt.slice(1).split("@");
				if (v.length > 1) v[1] = JSON.parse(v[1]);
                v[0] = v[0].trim();
			}
			else {
				txt = txt.split(delim);
				if (txt.length > 1) txt[1] = parseInt(txt[1]);
				data.push([txt, v]);
			}
		}
    }
    scriptLoaded.data = scriptLoaded.current = data;
	makeSelect(data);
}

function makeSelect(data) {
	let s = $("select")[0];
    s.selectedIndex = 0;
    s = s.options;
	s.length = 1 + scriptLoaded.scenes.length;
	$("#Hide").show();
	for (let i=1;i<s.length;i++) s[i].text = `Scene ${i}`;

}

function scene() {
	stop();
	let i = $("select")[0].selectedIndex - 1;
	if (i < 0) scriptLoaded.current = scriptLoaded.data;
	else {
		let s = scriptLoaded.scenes[i];
		let e = scriptLoaded.scenes[i+1];
		scriptLoaded.current = scriptLoaded.data.slice(s, e);
	}
    speak(0);
	return i == null ? "All scenes" : "Scene " + i;
}

function speak(n) {
    if (n == null) n = speak.n + 1;
    speak.n = n;
    let data = scriptLoaded.current[n];
    if (data) {
        delete speak.stopped;
		let txt = data[0], v = data[1];
        let u = new SpeechSynthesisUtterance(txt[0]);
        u.lang = "en-CA";
        let t = txt.length > 1 ? txt[1] : speak.pause;
        speak.voice = u.voice = cast[v[0]];

        let key = speak.voice.name;
        let opt = v.length > 1 ? v[1] : speak.options[key];
        if (opt) {
            speak.options[key] = opt;
            Object.assign(u, opt);
        }
		u.onend = function() {
            if (!speak.stopped) speak.queue = setTimeout(speak, t);
        }
        speechSynthesis.speak(u);
		console.log(`${v[0]}: ${u.text}`);
    }
}

speak.pause = 0;
speak.options = {};

function stop() {
    clearTimeout(speak.queue);
    speechSynthesis.cancel();
    speak.stopped = true;
}
