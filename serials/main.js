document.getElementById("RunButton").addEventListener("click",(event) => {
    if (window.connect) {
        console.log("Hi")
        save()
        SerialWriteCustom(3)
        serialWrite(compile(loadLastReturn()))
        SerialWriteCustom(13)
    }
})