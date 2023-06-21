// content script for old.reddit
window.addEventListener('load', 
  ()=>{
    let element = document.getElementsByClassName("dismiss-pinnable c-close c-hide-text")[0];
    if(element){
      element.click();
    }
    element = document.getElementsByClassName("listingsignupbar__close")[0];
    if(element){
      element.click();
    }
    
    //Removing Sidebar
    const sideBar = document.getElementsByClassName("side")[0];
    sideBar.parentElement.removeChild(sideBar)


}, false);