var term;

function calculate_size(win) {
    var cols = Math.max(80, Math.min(150, (win.innerWidth) / 6)) | 0;
    var rows = Math.max(24, Math.min(80, (win.innerHeight) / 12)) | 0;
    return [cols, rows];
}

(function () {
    window.onload = function () {

        var size = calculate_size(self);
        term = new Terminal({
            cols: size[0],
            rows: size[1],
            useStyle: true,
            screenKeys: true,
            cursorBlink: false
        });
        term.open(document.getElementById("term"));
    };
    window.addEventListener('resize', function () {
        var size = calculate_size(self);
        term.resize(size[0], size[1]);
    });
}).call(this);

const connectButton = document.getElementById('SerialConnectButton');
let port;

if ('serial' in navigator) {
    connectButton.addEventListener('click', function () {
        if (port) {
            SerialWriteCustom(3)
            term.write('\x1b[31mDisconnected from Serial Port\x1b[m\r\n');
            port = undefined;
            connectButton.innerText = 'Connect';

            document.getElementById('SerialSpeed').disabled = false;
            term.close()
            port.close();
        }
        else {
            connectButton.innerText = 'Disconnect';
            getReader();
        }
    });

    connectButton.disabled = false;
}
else {
    const error = document.createElement('p');
    error.innerHTML = '<p>Support for Serial Web API not enabled. Please enable it using chrome://flags/ and enable Experimental Web Platform fetures</p>';

}


let lineBuffer = '';
let latestValue = 0;

async function serialWrite(data) {
    encoder = new TextEncoder();
    const dataArrayBuffer = encoder.encode(data);
    console.log(dataArrayBuffer)

    if (port && port.writable) {
        const writer = port.writable.getWriter();
        writer.write(dataArrayBuffer);
        writer.releaseLock();
    }
}
async function SerialWriteCustom(d, size = 1) {
    var g = new Uint8Array(size)
    g[0] = d
    console.log(g)
    const dataArrayBuffer = g
    console.log(dataArrayBuffer)

    if (port && port.writable) {
        const writer = port.writable.getWriter();
        writer.write(dataArrayBuffer);
        writer.releaseLock();
    }
}

async function getReader() {
    port = await navigator.serial.requestPort({});
    var e = document.getElementById("SerialSpeed");
    var strSpd = e.options[e.selectedIndex].value;

    var speed = parseInt(strSpd);
    await port.open({ baudRate: [speed] });

    document.getElementById('SerialSpeed').disabled = true;
    document.getElementById('RunButton').disabled = false;
    document.getElementById('ConsoleButton').disabled = false;
    window.connect = true

    connectButton.innerText = 'Disconnect';
    term.write('\x1b[31mConnected using Web Serial API !\x1b[m\r\n');

    const appendStream = new WritableStream({
        write(chunk) {
            log(chunk)
            term.write(chunk);
            if (window.SerialOutputS) {
                SerialOutput(chunk)
            }
        }
    });

    port.readable
        .pipeThrough(new TextDecoderStream())
        .pipeTo(appendStream);


    term.on('data', function (data) {
        serialWrite(data);
    });

}

function SetSerialOutput() {
    if (window.SerialOutputS) {
        window.SerialOutputS = false
    } else {
        window.SerialOutputS = true
    }
}

function SerialOutput(chunk) {
    console.log(chunk)
}
window.SerialOutputS = false


function stop() {
    window.SerialOutputS = false
    SerialWriteCustom(3)
}