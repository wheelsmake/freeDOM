const freeDOM = FreeDOM.new("#app");
function asd(e){
    console.log(this);
    console.log(e);
}
var aa = asd;
//(aa)();
var event1 = document.getElementById("event-test");
event1.addEventListener("click", asd,{
    capture: true
});
event1.addEventListener("click", as=>{},{
    capture: true,
    once:true
});
event1.addEventListener("dblclick", asd,{
    capture: true,
    once: true
});
event1.addEventListener("click", asd,{
    capture: true,
    once: true
});
event1.addEventListener("click", asd,{
    capture: false,
    once: true,
    passive: true
});
event1.addEventListener("click", asd, false);
event1.addEventListener("click", f=>{}, true);
event1.removeEventListener("click", asd, true);
event1.removeEventListener("click", asd, false);