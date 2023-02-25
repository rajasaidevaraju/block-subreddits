
let subNames=[];

// If pause is true, show pause button, meaning that the extension is running
// If pause is false, show resume button, meaning that the exyension is not running
let pause=true;
let del=false;

const XImage = new Image(40, 40);
XImage.src = './SVG/x.svg';
XImage.setAttribute("style","position:absolute; opacity:0.5")

// toggleDiv is used to change the display status of the block responsible for entering a sub name
function toggleDiv(status){
    // clearing the input field
    document.getElementById("subName").value='';
    if(status){
        document.getElementById("subNameDiv").classList.remove('no-display')
    }else{
        document.getElementById("subNameDiv").classList.add('no-display')
    }
    
}

function togglePause(){
    if(pause==true){
        pause=false;
    }
    else{
        pause=true;
    }
    chrome.storage.sync.set({ "pause": pause }).then(() => {
        displayPause();
    });
    
}

function displayPause(){
    if(pause==true){
        document.getElementById("pause").classList.remove('no-display')
        document.getElementById("resume").classList.add('no-display')
    }else{
        document.getElementById("resume").classList.remove('no-display')
        document.getElementById("pause").classList.add('no-display')
    }
}

function callAddTick(event){
    if (event.key == "Enter") {
        document.getElementById("addTick").click();
    }
}

function toggleDelete(){
    if(del){
        del=false;
        document.getElementById("deleteSub").classList.remove('del-btn-red');
        
    }
    else{
        del=true;
        document.getElementById("deleteSub").classList.add('del-btn-red');
    }
}

// addTick is used to store the entered sub name
function addTick(){
    let subName=document.getElementById("subName").value;
    if(subName!==''){
        subNames.push(subName)
        chrome.storage.sync.set({ "subNames": subNames }).then(() => {
            console.log(subName+" added");
            populate()
            document.getElementById("subName").value='';
        });
    }
    
}


// deleting a subreddit name
function handleSubClick(node){

    if(del){
        let subToDelete=node.textContent;
        subNames=subNames.filter(e => e !== subToDelete);
        chrome.storage.sync.set({ "subNames": subNames }).then(() => {
            console.log(subName+" deleted");
            populate()
        });
    }
}

function handleMouseEnter(node){
    if(del){
        node.appendChild(XImage);
    }
}
function handleMouseLeave(node){
    if(XImage.parentNode!==null){
        XImage.parentNode.removeChild(XImage)
    }
    
}

// Function to create a box with sub name
function createBlock(name){
    const node=document.createElement("p");
    node.appendChild(document.createTextNode(name))
    node.classList.add('sub-name')
    node.addEventListener('click',()=>handleSubClick(node))
    node.addEventListener('mouseenter',()=>handleMouseEnter(node))
    node.addEventListener('mouseleave',()=>handleMouseLeave(node))
    
    return node;
}

function populate(){
    let targetDiv=document.getElementById("subs")
    targetDiv.innerHTML='';
    for(let i=0;i<subNames.length;i++){
        targetDiv.appendChild(createBlock(subNames[i]))
    }
}


window.onload=function(){

    document.getElementById("addNewSub").addEventListener("click", ()=>toggleDiv(true));
    document.getElementById("addTick").addEventListener("click",addTick)
    document.getElementById("subName").addEventListener("keypress",(event)=>callAddTick(event))
    document.getElementById("hideDiv").addEventListener("click",()=>toggleDiv(false))
    document.getElementById("pause").addEventListener("click",togglePause)
    document.getElementById("resume").addEventListener("click",togglePause)
    document.getElementById("deleteSub").addEventListener("click",toggleDelete)
    // If no subNames, set default as []
    chrome.storage.sync.get({"subNames":[]}).then((data) => { 
        subNames=data.subNames;   
        populate(); 
    });
    chrome.storage.sync.get({"pause":true}).then((data) => { 
        pause=data.pause;   
        displayPause(); 
    });
}
