document.getElementById("RunButton").addEventListener("click",(event) => {
    if (window.connect) {
        console.log("Hi")
        save()
        SerialWriteCustom(4)
        SerialWriteCustom(3)
        serialWrite("def main():")
        for (i in compile(loadLastReturn()).split("\n")) {
            var command = compile(loadLastReturn()).split("\n")[i]
            SerialWriteCustom(13)
            serialWrite("    " + command)
        }
        SerialWriteCustom(13)
        SerialWriteCustom(13)
        SerialWriteCustom(13)
        SerialWriteCustom(13)
        serialWrite("main()")
        setTimeout(SerialWriteCustom,1000,3)
        setTimeout(SerialWriteCustom,1500,13)
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