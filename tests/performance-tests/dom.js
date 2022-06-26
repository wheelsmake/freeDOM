var test = document.getElementById("test");
function ce(num){
    var testCreateElement = [];
    var a = document.createElement("div");
    var p;
    for(let i = 0; i < num; i++){
        p = i;
    }
    a.innerText = p;
    testCreateElement.push(a);
    for(let i = 0; i < testCreateElement.length; i++){
        i;
    }
    console.log(testCreateElement[0]);
}