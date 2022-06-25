var freeDOM = new FreeDOM();
freeDOM.new("#app","as");
freeDOM.id("as").render(document=>{
   var a = document.createElement("div");
   a.innerText = "aa";
   document.getElementById("app").append(a);
});