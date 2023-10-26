document.getElementById("RunButton").addEventListener("click",(event) => {
    if (window.connect) {
        console.log("Hi")
        save()
        SerialWriteCustom(3)
        compile(loadLastReturn()).split("\n").forEach(command => {
            SerialWriteCustom(13)
            if (command.slice(0,4) == "    ")
            serialWrite(command)
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