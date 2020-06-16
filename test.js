const string = `
.skin * {
    box-sizing: border-box;
    margin: 0;
    padding: 0;
}

.skin *::before,.skin *::after {
    box-sizing: border-box;
}

.skin {
    background: #ffe600;
    position: relative;
    height: 100vh;
}

.nose {
    border: 10px solid black;
    border-color: black transparent transparent transparent;
    width: 0;
    height: 0;
    position: relative;
    left: 50%;
    top: 145px;
    margin-left: -10px;
    z-index: 10;
}

.nose:hover {
    animation: wave 300ms infinite linear;
    transform-origin: center bottom;
}

@keyframes wave {
    0% {
        transform: rotate(0deg);
    }
    25% {
        transform: rotate(5deg);
    }
    50% {
        transform: rotate(-0deg);
    }
    75% {
        transform: rotate(-5deg);
    }
    100% {
        transform: rotate(0deg);
    }
}

.noseArc {
    position: absolute;
    width: 20px;
    height: 6px;
    border: 1px solid black;
    top: -16px;
    left: -10px;
    border-radius: 10px 10px 0 0;
    background: black;
}

.eye {
    border: 2px solid black;
    width: 64px;
    height: 64px;
    position: absolute;
    left: 50%;
    top: 100px;
    background: #2e2e2e;
    border-radius: 50%;
    margin-left: -32px;
}

.eye::before {
    content: '';
    display: block;
    border: 3px solid black;
    width: 28px;
    height: 28px;
    background: white;
    border-radius: 50%;
    position: relative;
    left: 8px;
    top: 4px;
}

.eye.eyeLeft {
    transform: translateX(-130px);
}

.eye.eyeRight {
    transform: translateX(130px);
}

.mouth {
    position: absolute;
    width: 200px;
    height: 200px;
    left: 50%;
    margin-left: -100px;
    top: 170px;
}

.mouth .top .lip {
    background: #ffe600;
    z-index: 5;
    position: relative;
    top: -25px;
    position: absolute;
    left: 50%;
    margin-left: -50px;
    border: 3px solid black;
    height: 30px;
    width: 100px;
}

.mouth .top .lip.left {
    border-radius: 0 0 0 50px;
    border-left-color: transparent;
    border-top-color: transparent;
    transform: rotate(-15deg) translate(-53px);
}

.mouth .top .lip.right {
    border-radius: 0 0 50px 0px;
    border-right-color: transparent;
    border-top-color: transparent;
    transform: rotate(15deg) translate(53px);
}

.mouth .top .lip::before {
    content: '';
    display: block;
    width: 7px;
    height: 30px;
    position: absolute;
    background-color: #ffe600;
    bottom: 0;
}

.mouth .top .lip.left::before {
    right: -6px;
}

.mouth .top .lip.right::before {
    left: -6px;
}

.mouth .bottom {
    height: 180px;
    position: absolute;
    top: 5px;
    width: 100%;
    overflow: hidden;
}

.mouth .bottom .circle1 {
    z-index: 0;
    border: 3px solid black;
    width: 150px;
    position: absolute;
    height: 1000px;
    bottom: 0;
    left: 50%;
    margin-left: -75px;
    border-radius: 75px/300px;
    background: #9b000a;
    overflow: hidden;
}

.mouth .bottom .circle2 {
    width: 200px;
    height: 300px;
    position: absolute;
    background: #ff485f;
    bottom: -150px;
    left: 50%;
    margin-left: -100px;
    border-radius: 100px;
}

.face {
    position: absolute;
    left: 50%;
    border: 3px solid black;
    width: 88px;
    height: 88px;
    top: 200px;
    margin-left: -44px;
    z-index: 3;
}

.face.left {
    transform: translate(-180px);
    background: #ff0000;
    border-radius: 50%
}

.face.right {
    transform: translate(180px);
    background: #ff0000;
    border-radius: 50%
}

.face>img {
    position: absolute;
    top: 50%;
    left: 50%;
    display: none;
}

.face.left>img {
    transform-origin: 0 0;
    transform: rotateY(180deg);
}

.face:hover>img {
    display: block;
}

`

const player = {
    n: 1,
    time: 20,
    id: 0,
    ui: {
        demo: document.querySelector("#demo"),
        demo2: document.querySelector("#demo2")
    },
    events: {
        "#btnPlay": "play",
        "#btnPause": "pause",
        "#btnSlow": "slow",
        "#btnNormal": "normal",
        "#btnFast": "fast"
    },
    bindEvent: () => {
        for (let key in player.events) {
            if (player.events.hasOwnProperty(key)) {
                document.querySelector(key).onclick = player[player.events[key]]
            }
        }

    },
    init: () => {
        player.ui.demo.innerText = string.substr(0, player.n);
        player.ui.demo2.innerHTML = string.substr(0, player.n);
        player.bindEvent()
        player.play()
    },
    run: () => {
        player.n += 1;
        if (player.n > string.length) {
            window.clearInterval(player.id)
        }
        player.ui.demo.innerText = string.substr(0, player.n);
        player.ui.demo2.innerHTML = string.substr(0, player.n);
        player.ui.demo.scrollTop = player.ui.demo.scrollHeight
    },
    play: () => {
        player.id = setInterval(player.run, player.time)
    },
    pause: () => {
        for (let i = 1; i <= player.id; i++) {
            window.clearInterval(i)
        }
    },
    slow: () => {
        player.pause()
        player.time = 100;
        player.play()
    },
    normal: () => {
        player.pause()
        player.time = 20;
        player.play()
    },
    fast: () => {
        player.pause()
        player.time = 0;
        player.play()
    }

}

player.init()

