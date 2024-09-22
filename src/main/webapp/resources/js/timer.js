window.onload = function () {
    updateTime ();
}
function updateTime () {
    const now = new Date();
    document.querySelector("#timer").textContent = "Time now: " +
        now.getHours() +
        ':' +
        now.getMinutes() +
        ':' +
        now.getSeconds();
}
setInterval(updateTime, 11000);