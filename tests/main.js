const freeDOM = new FreeDOM("#app");
function asd(e){
    console.log(this);
    console.log(e);
}
var aa = asd;
//(aa)();
var event1 = document.getElementById("event-test");
event1.addEventListener("click", asd);