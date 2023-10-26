document.getElementById("RunButton").addEventListener("click",(event) => {
    if (window.connect) {
        console.log("Hi")
        save()
        SerialWriteCustom(3)
        for (i in compile(loadLastReturn()).split("\n")) {
            var command = compile(loadLastReturn()).split("\n")[i]
            SerialWriteCustom(13)
            serialWrite(command)
            if ((command.slice(0,4) != "    " && compile(loadLastReturn()).split("\n")[i+1].slice(0,4) != "    ") && command.replaceAll(" ","").slice(0,5) != "while" || compile(loadLastReturn()).split("\n").reverse()[0] == command) {
                SerialWriteCustom(13)
                SerialWriteCustom(13)
            }
        }
        compile(loadLastReturn()).split("\n").forEach(command => {
        });
        SerialWriteCustom(13)
    }
})
document.getElementById("ConsoleButton").addEventListener("click",(event) => {
    if (window.connect) {
        console.log("Disaplying console")
        if (document.getElementById("term").style.display == "block") {
            document.getElementById("term").style.display = "none"
        } else {
            document.getElementById("term").style.display = "block"
        }
        document.getElementById("term").style.position = "fixed"
    }
})
window.BeforeUnloadEvent = function(){
    SerialWriteCustom(3)
}