
function addSub(){
    document.getElementById("subNameDiv").classList.remove('no-display')
    console.log("I am here")

}

window.onload=function(){

    document.getElementById("addSub").addEventListener("click", addSub);

}