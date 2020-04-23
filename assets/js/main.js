var liveMeter;

window.onload = function () {

    let socket = new WebSocket("ws://ip:port");
    socket.onopen = function (event) {
        console.log("Connection established with Twitch bot");
    };

    liveMeter = new LiveMeter(100, 100, 60, 80, 'HP', 'MP');
    let healthBar = document.getElementById("health"),
        magicBar = document.getElementById("magic"),
        hpNumber = document.getElementById("hpNumber"),
        mpNumber = document.getElementById("mpNumber");

    onPropModified('hp', hpNumber, healthBar);
    onPropModified('mp', mpNumber, magicBar);

    liveMeter = new Proxy(liveMeter, {
        set: (target, name, value) => {
            if (name in target) {
                target[name] = value;
            }

            switch (name) {
                case 'maxHP':
                case 'hp':
                    console.log("proxy " + liveMeter.hp);
                    return onPropModified('hp', hpNumber, healthBar);
                    break;
                case 'maxMP':
                case 'mp':
                    return onPropModified('mp', mpNumber, magicBar);
                    break;
                default:
            }
            return false;
        }
    });

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

    function onPropModified(name, numberElem, barElem) {
        try {
            let value = name in liveMeter && liveMeter[name] ? liveMeter[name].toString() : '100';
            while (value.length < 3) {
                value = '0' + value;
            }
            numberElem.innerHTML = value;
            barElem.style.width = (liveMeter.hp / liveMeter.maxHP * 100) + "%";
        } catch (err) {
            return false;
        }
        return true
    }

};
