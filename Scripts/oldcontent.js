// content script for old.reddit
window.addEventListener('load', 
  ()=>{
    document.getElementsByClassName("dismiss-pinnable c-close c-hide-text")[0].click()
    console.log("HERE");
}, false);