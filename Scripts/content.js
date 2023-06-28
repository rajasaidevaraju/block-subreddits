
let previousLength=0;
let GsubNames=[]
let done=false;

function insertSelect(){
    let element=document.querySelectorAll('[bundlename="comment_body_header"]');
    if(element.length>0){
        element=element[0];
        let sort= document.createElement("select");
        sort.setAttribute("id","a-comment-sort")
        addOption(sort,"sort",true)
        addOption(sort,"controversial");
        addOption(sort,"new");
        addOption(sort,"best");
        addOption(sort,"top");
        addOption(sort,"old");

        sort.onchange= function(event){
            let url=location.protocol + '//' + location.host + location.pathname+"?sort="+event.target.value;
            window.open(url);

        }
        element.parentNode.replaceChild(sort,element);
    }
}

function addOption(parent,text,selected=false){
    let option=document.createElement("option");
    option.value=text
    option.textContent=text
    if(selected){
        option.selected=true;
        option.disabled=true;
        option.hidden=true;
    }
    parent.appendChild(option);
} 


window.setInterval(()=>{
    insertSelect()
    let qr=document.querySelector("body > shreddit-app > shreddit-experience-tree").shadowRoot.querySelector("#nsfw-qr-dialog");
   if(qr==null){
    qr=document.querySelector("#nsfw-qr-dialog")
   }
    if(qr!=null && done==false){
       
        chrome.runtime.sendMessage({require: "redirect"});
        done=true;
    }
}, 1000);
    
    
chrome.runtime.sendMessage({require: "pause"},(pause)=>{
    // if result is true, do not pause 
    if(pause){
        chrome.runtime.sendMessage({require: "subNames"},(subNames)=>{
            GsubNames=subNames;
            console.log(subNames);
            if(subNames.length>0){
                // Will execute removeSub every 1 seconds 
                window.setInterval(()=>{removeSub(subNames)}, 1000);
            }
            
        })
    }
})


function removeSub(subNames) {
    
    let subReddits=document.querySelectorAll("a[data-click-id]")
    // execute only if there is a change in sub length
    if(subReddits.length!=previousLength){
        previousLength=subReddits.length;
        for(let i=0;i<subReddits.length;i++){
        
            let attributes=subReddits[i].attributes;
            if(attributes["data-click-id"].nodeValue=="subreddit" && subReddits[i].text!=='' && includes(attributes['href'].nodeValue,subNames)){
                
                //remove the article from the page
                removeParent(subReddits[i],8)  
                
            }
        }
    }
     
}

// subNames:[pics, aww] and subName /r/pics/, /r/aww/
function includes(subName, subNames){

    for(let i=0;i<subNames.length;i++){
        let bannedName="/r/"+subNames[i]+"/"
        if(bannedName.toUpperCase()===subName.toUpperCase()){
            return true;
        }
    }
    return false;

}

// number param is the number of times that the element should climb to reach parent
function removeParent(element, number){

    let parent = element;
    for (let i = 0; i < number; i++) {
        if (parent.parentNode) {
            parent = parent.parentNode;
        }
    }
    
    parent.remove();
}