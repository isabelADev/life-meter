'strict mode';
var liveMeter;
var streamTime = {
    hours: 0,
    mins: 5,
};

var vConf = {
    maxHP: 130,
    maxMP: 100,
    startHp: 25,
    startMp: 100,
    hpTitle: 'PS',
    mpTitle: 'PE'
};

window.onload = function () {

    var socket;

    socket = new WebSocket("ws://localhost:8081");
    socket.onopen = function (event) {
        console.log("Connection established with Twitch bot");
    };
    socket.onclose = function (event) {
        console.log(event);
    };


    liveMeter = new LiveMeter(vConf.maxHP, vConf.maxMP, vConf.startHp, vConf.startMp, vConf.hpTitle, vConf.mpTitle);
    let healthBar = document.getElementById("health"),
        healthBGBar = document.getElementById("hpBGBar"),
        magicBGBar = document.getElementById("mpBGBar"),
        magicBar = document.getElementById("magic"),
        hpNumber = document.getElementById("hpNumber"),
        mpNumber = document.getElementById("mpNumber");
        hpTitle = document.getElementById("hpTitle"),
        mpTitle = document.getElementById("mpTitle");

    hpTitle.innerHTML = liveMeter.hpTitle;
    mpTitle.innerHTML = liveMeter.mpTitle;

    onPropModified('hp', hpNumber, healthBar, healthBGBar);
    onPropModified('mp', mpNumber, magicBar, magicBGBar);

    liveMeter = new Proxy(liveMeter, {
        set: (target, name, value) => {
            if (name in target) {
                target[name] = value;
            }

            switch (name) {
                case 'maxHP':
                case 'hp':
                    console.log("proxy " + liveMeter.hp);
                    return onPropModified('hp', hpNumber, healthBar, healthBGBar);
                    break;
                case 'maxMP':
                case 'mp':
                    return onPropModified('mp', mpNumber, magicBar, magicBGBar);
                    break;
                default:
            }
            return false;
        }
    });

    var elapsedTime = 0;
    var totalStreamTime = getStreamTime();
    setInterval(function () {
        elapsedTime += 1;
        if (liveMeter.hp > 0) {
            liveMeter.addHP(-(1/totalStreamTime*liveMeter.maxHP));
        }
    }, 60000);

    socket.onmessage = function (event) {
        let data = event.data;

        if (data) {
            try {
                data = JSON.parse(data);
            } catch (err) {
                console.log(err);
            }

            if (data.fieldName) {
                let value = parseInt(data.value);
                switch (data.fieldName) {
                    case 'hp':
                        liveMeter.addHP(value);
                        break;
                    case 'mp':
                        liveMeter.addMP(value);
                        break;
                    default:
                }
            }
        } else {
            console.log('No data received');
        }
        console.log("Message received: " + event.data);
    };

    function getStreamTime() {
        var time = 0;
        if (streamTime.hours) {
            time += streamTime.hours * 60;
        }
        if (streamTime.mins) {
            time += streamTime.mins;
        }
        return time;
    }

    function addWarningClasses(value, numberElem, barElem) {
        let warning = 'warning';

        if (liveMeter.hp / liveMeter.maxHP * 100 > 20) {
            if (numberElem.classList.contains(warning)) {
                numberElem.classList.remove(warning);
                barElem.classList.remove(warning);
            }
        } else {
            if (!numberElem.classList.contains(warning)) {
                numberElem.classList.add(warning);
                barElem.classList.add(warning);
            }
        }
    }

    function onPropModified(name, numberElem, barElem, bgBarElem) {
        try {
            let value = name in liveMeter && typeof liveMeter[name] === 'number' ? liveMeter[name].toString() : '100';
            while (value.length < 3) {
                value = '0' + value;
            }
            if (name === 'hp') {
                addWarningClasses(value, numberElem, bgBarElem);
            }
            numberElem.innerHTML = value;
            barElem.style.width = (liveMeter[name] / liveMeter['max' + name.toUpperCase()] * 100) + "%";
        } catch (err) {
            return false;
        }
        return true;
    }

};
