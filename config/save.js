function save() {
    if (window.savelist == undefined) {
        window.savelist = []
    }
    var random = String(Math.random()).split(".")[1]
    window.savelist.push(random)
    var val = monaco.editor.getEditors()[0].getValue().replaceAll('"',"gcode.custom1").replaceAll("console.log","log")
    eval(`window.saved${random} = ` + "`" + val + "`" +`;window.saved = "${random}";`)
    return window.saved
}

function runFromString(func) {
    var func2 = Function(func); 
    var result = func2()
    return result 
}

function createBackup() {
    runFromString(`window.backup = "${monaco.editor.getEditors()[0].getValue().replaceAll('gcode.custom1','"').replaceAll("console.log","log")}"`)
}

function load(id) {
    createBackup()
    monaco.editor.getEditors()[0].setValue(runFromString(`return window.saved${id};`).replaceAll('gcode.custom1','"'))
}


function loadLast() {
    load(window.saved)
}
function loadLastReturn() {
    return runFromString(`return window.saved${window.saved};`).replaceAll('gcode.custom1','"')
}

function loadFromBackup() {
    monaco.editor.getEditors()[0].setValue(runFromString(`return window.backup`).replaceAll('gcode.custom1','"'))
}

function cacheSave(code) {
    localStorage.setItem("last",code.replaceAll('gcode.custom1','"'))
}
function cacheGet() {
    var last = localStorage.getItem("last")
    if (last != undefined) {
        return last
    } else if (last != "" && last != " ") {
        return "// Rp pico serial extention editor"
    } else {
        return "// Rp pico serial extention editor"
    }
}

function flashsave() {
    save()
    var flashvalue = loadLastReturn()
    var flashingcode = `open('last.py').write(open('main.py','r').read())`
    pythonrunnner(flashingcode)
    var flashingcode = `open('pythonrunner.py').write(${flashvalue})`    
    pythonrunnner(flashingcode)
    var flashingcode = `open('main.py').write('import pythonrunner')`    
    pythonrunnner(flashingcode)
}

function pythonrunnner(code)  {
    if (window.connect) {
        document.getElementById("StopButton").disabled = false;
        save()
        SerialWriteCustom(3)
        for (i in compile(code).split("\n")) {
            var command = compile(code).split("\n")[i]
            SerialWriteCustom(13)
            serialWrite(command)
        }
        SerialWriteCustom(13)
        setTimeout(SerialWriteCustom,1000,3)
        setTimeout(SetSerialOutput,1250)
        setTimeout(SerialWriteCustom,1500,13)
    }
}
