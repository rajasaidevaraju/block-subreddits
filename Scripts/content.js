let subReddits=document.querySelectorAll("a[data-click-id]")
for(let i=0;i<subReddits.length;i++){
    let attributes=subReddits[i].attributes;
    if(attributes["data-click-id"].nodeValue=="subreddit"){
        if(subReddits[i].text!==''){
            if(attributes['href'].nodeValue==="/r/pics/")
            //remove the article from the page
            removeParent(subReddits[i],8)  
        }
        
    }
}

// number is the number of times that the element should climb to reach parent
function removeParent(element, number){

    let parent = element;
    for (let i = 0; i < number; i++) {
        if (parent.parentNode) {
            parent = parent.parentNode;
        }
    }
    parent.remove();
}