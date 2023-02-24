
let subNames=[];

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

// Function to create a box with sub name
function createBlock(name){
    const node=document.createElement("p");
    node.appendChild(document.createTextNode(name))
    node.classList.add('sub-name')
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
    document.getElementById("hideDiv").addEventListener("click",()=>toggleDiv(false))
    // If no subNames, set default as []
    chrome.storage.sync.get({"subNames":[]}).then((data) => {
        
        subNames=data.subNames;   
        populate(); 
    });
}
