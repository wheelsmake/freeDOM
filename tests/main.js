var freeDOM = new FreeDOM();
freeDOM.new({
    id: "as",
    rootNode: "#app"
});
freeDOM.id("as").render(document=>{
   var a = document.createElement("div");
   a.innerText = "aa";
   document.getElementById("app").append(a);
});