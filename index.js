import DATA from './data.js';

const playAudio = (audio,key) =>{
    audio.currentTime = 0;
    audio.play();
    key.classList.add('active');
}

const keyMaker = props =>{
    const key = document.createElement('div');
    key.setAttribute('class','key');
    key.setAttribute('data-key', props.code);

    const keyText = document.createElement('p');
    keyText.setAttribute('class','key-text');
    keyText.innerText = props.key;

    const description = document.createElement('p');
    description.setAttribute('class','key-description');
    description.innerText = props.sound.toUpperCase();

    const audio = document.createElement('audio');
    audio.setAttribute('src',`sounds/${props.sound}.wav`)
    audio.setAttribute('data-key', props.code);

    key.appendChild(keyText);
    key.appendChild(description);
    key.appendChild(audio);
    key.addEventListener('click', e=>{
        playAudio(audio,key);
    })
    key.addEventListener('transitionend', e=>{
        key.classList.remove('active')
    })

    return key;
}


const body = document.querySelector('body');

const container = document.createElement('div');

container.setAttribute('class', 'container');

DATA.forEach(obj=>{
    container.appendChild(keyMaker(obj));    
})

window.addEventListener('keydown', e=>{
    let audio = document.querySelector(`audio[data-key="${e.keyCode}"]`);
    if(!audio) return;
    const key = document.querySelector(`.key[data-key="${e.keyCode}"]`); 
    playAudio(audio,key);
})

body.appendChild(container);
console.log(DATA)