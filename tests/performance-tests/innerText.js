var test = document.getElementById("test");
function ce(num){
    //var testCreateElement = [];
    var a = document.createElement("div");
    //var p;
    test.append(a);
    for(let i = 0; i < num; i++){
        //p = i;
        a.innerText += i;
    }
    /*testCreateElement.push(a);
    for(let i = 0; i < testCreateElement.length; i++){
        i;
    }
    console.log(testCreateElement[0]);*/
}
function tce(num){
    var a = document.createElement("div");
    test.append(a);
    for(let i = 0; i < num; i++){
        a.textContent += i;
    }
}