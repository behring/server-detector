$(function () {
    setTimeout(reload, 10000);
});

function reload() {
    $("#panel-cotainer").load("/")
}