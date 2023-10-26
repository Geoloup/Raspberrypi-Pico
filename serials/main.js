document.getElementById("RunButton").addEventListener("click",(event) => {
    if (window.connect) {
        console.log("Hi")
        save()
        SerialWriteCustom(3)
        compile(loadLastReturn()).split("\n").forEach(command => {
            SerialWriteCustom(13)
            serialWrite(command)
            console.log(command.slice(0,4))
            if (command.slice(0,4) == "    ") {
                window.tab = true
            } else if (window.tab) {
                window.tab = false
                SerialWriteCustom(13)
                SerialWriteCustom(13)
                SerialWriteCustom(13)
            }
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