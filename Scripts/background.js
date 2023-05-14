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
        else if(request["require"]==="redirect"){
            let url=sender.tab.url;
            url=url.replace("www","old")
            chrome.tabs.update(sender.tab.id,{url: url});
        }
        return true;
    }
  );