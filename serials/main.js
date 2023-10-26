document.getElementById("RunButton").addEventListener("click",(event) => {
    if (window.connect) {
        console.log("Hi")
        save()
        SerialWriteCustom(3)
        serialWrite(compile(loadLastReturn()))
        SerialWriteCustom(13)
    }
})
document.getElementById("ConsoleButton").addEventListener("click",(event) => {
    if (window.connect) {
        console.log("Disaplying console")
        document.getElementById("term").style.display = "block"
        document.getElementById("term").style.position = "fixed"
    }
})