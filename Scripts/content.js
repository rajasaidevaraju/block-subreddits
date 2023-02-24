
let previousLength=0;

let subs=[];

// Will execute removeSub every 1 seconds 
var intervalID = window.setInterval(removeSub, 1000);



function removeSub() {
    let subReddits=document.querySelectorAll("a[data-click-id]")
    // execute only if there is a change in sub length
    if(subReddits.length!=previousLength){
        previousLength=subReddits.length;
        console.log(previousLength);
        for(let i=0;i<subReddits.length;i++){
        
            let attributes=subReddits[i].attributes;
            if(attributes["data-click-id"].nodeValue=="subreddit" && subReddits[i].text!=='' && attributes['href'].nodeValue==="/r/pics/"){
                
                //remove the article from the page
                removeParent(subReddits[i],8)  
                
            }
        }
    }
    
    
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