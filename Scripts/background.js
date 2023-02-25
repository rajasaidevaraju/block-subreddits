chrome.runtime.onMessage.addListener(
    (request, sender, sendResponse)=> {
        if(request["require"]==="pause"){
            chrome.storage.sync.get({"pause":true}).then((data) => { 
                pause=data.pause;   
                sendResponse(pause);
            });
        }
        else if(request["require"]==="subNames"){
            chrome.storage.sync.get({"subNames":[]}).then((data) => { 
                subNames=data.subNames;   
                sendResponse(subNames);
            });
        }
        return true;
    }
  );