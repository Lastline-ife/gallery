function showDiv() {
    var doc = document,
        sWidth = doc.body.scrollWidth,
        sHeight = doc.body.scrollHeight;
    var oMask = doc.getElementById('popWindow');
    doc.getElementById('mask-img').style.display = 'block';
    oMask.style.height = sHeight + "px";
    oMask.style.width = sWidth + "px";
}
function closeDiv() {
    var doc = document;
    doc.getElementById('mask-img').style.display = 'none';
}