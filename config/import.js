function script(file) {
    var elem = document.createElement("script");
    elem.src = file
    document.getElementsByTagName("head")[0].appendChild(elem)
}
function asyncScript(file) {
    var elem = document.createElement("script");
    elem.src = file
    elem.async = true
    document.getElementsByTagName("head")[0].appendChild(elem)
}
function importScript(file) {
    var elem = document.createElement("script");
    elem.src = file
    elem.type = "module"
    document.getElementsByTagName("head")[0].appendChild(elem)
}
function importScripts(file) {
    var elem = document.createElement("script");
    elem.src = file
    elem.type = "module"
    document.getElementsByTagName("head")[0].appendChild(elem)
}