document.getElementById("RunButton").addEventListener("click",(event) => {
    if (window.connect) {
        console.log("Hi")
        save()
        serialWrite(compile(loadLastReturn()))
        SerialWriteCustom(13)
    }
})