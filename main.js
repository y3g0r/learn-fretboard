// DATA
const NOTES = {
    "C": {name: "C"},
    "C#": {name: "C#"},
    "Db": {name: "Db"},
    "D": {name: "D"},
    "D#": {name: "D#"},
    "Eb": {name: "Eb"},
    "E": {name: "E"},
    "F": {name: "F"},
    "F#": {name: "F#"},
    "Gb": {name: "Gb"},
    "G": {name: "G"},
    "G#": {name: "G#"},
    "Ab": {name: "Ab"},
    "A": {name: "A"},
    "A#": {name: "A#"},
    "Bb": {name: "Bb"},
    "B": {name: "B"},
}


const BARE = [
  "C",
  "D",
  "E",
  "F",
  "G",
  "A",
  "B",
]

const SHARP = [
  "C#",
  "D#",
  "F#",
  "G#",
  "A#",
]

const FLAT = [
  "Db",
  "Eb",
  "Gb",
  "Ab",
  "Bb",
]
// finish DATA

// utility functions
function getRandInt(max) {
    return Math.floor(Math.random() * (max));
}
// finish utility functions


// state
let intervalId;
let curNote;
let includeNotes;
// finish state

// event listeners
function updateIncludeNotes() {
    includeNotes = [];
    if (document.querySelector("#include_bare").checked) {
        includeNotes = [...includeNotes, ...BARE];
    }
    if (document.querySelector("#include_sharp").checked) {
        includeNotes = [...includeNotes, ...SHARP];
    }
    if (document.querySelector("#include_flat").checked) {
        includeNotes = [...includeNotes, ...FLAT];
    }
    console.log(includeNotes);
}
function noteUpdater() {
    if (includeNotes.length === 0) {
      document.getElementById("main").innerHTML = "Choose some notes";
      return;
    }
    let nextNote = curNote;
    let randNum;
    // avoid repeating the same note
    while (nextNote === curNote) {
        randNum = getRandInt(includeNotes.length);
        nextNote = includeNotes[randNum];
    }
    curNote = nextNote;
    document.getElementById("main").innerHTML = curNote;
    document.getElementById(`audio_${curNote}`).play();
}
function pauseChanged() {
  const pause = document.querySelector('#pause')
  const output = document.querySelector('.pause-output')
  output.textContent = pause.value

  clearInterval(intervalId);
  intervalId = setInterval(noteUpdater, pause.value * 1000);
};
// finish event listeners


// add event listeners
document.querySelector("#pause").addEventListener('input', pauseChanged)
for (let id of ["include_bare", "include_sharp", "include_flat"]) {
    let element = document.querySelector(`#${id}`);
    element.addEventListener('input', updateIncludeNotes);
}
// finish add event listeners

updateIncludeNotes();
noteUpdater();
pauseChanged();

