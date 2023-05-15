
let previousLength=0;
let GsubNames=[]
let done=false;
window.setInterval(()=>{
    let qr=document.getElementById("nsfw-qr-dialog");
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