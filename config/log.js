function log(message) {
    if (window.runLog == undefined){
        window.runLog = []
    }
    window.runLog.push(message)
}

function clearLog() {
    if (window.runLog == undefined){
        window.runLog = []
    }
    window.runLog = []
    document.getElementById("logs").innerHTML = ""
}

function loadLog() {
    document.getElementById("logs").innerHTML = window.runLog.join("<br>")
}