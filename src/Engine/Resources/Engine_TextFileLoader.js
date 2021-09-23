var hEngine = hEngine || {}; 

/*
    this class handles text file loading and is 
    dependent on the ResourceMap class
*/

hEngine.TextFileLoader = (function(){
    var eTextFileType = Object.freeze({
        eXMLFile: 0,
        eTextFile: 1
    });

    const pickerOpts = {
        types: [
          {
            description: 'Text/XML files',
            accept: {
              'text/*': ['.txt', '.glsl', '.vert', '.frag', '.xml']
            }
          },
        ],
        excludeAcceptAllOption: true,
        multiple: false
    };

    var loadRemoteTextFile = function(filePath, fileType, callbackFunction) {
        if (!(hEngine.ResourceMap.isAssetLoaded(filePath))) {
            // Update resources in load counter.
            hEngine.ResourceMap.asyncLoadRequested(filePath);

           // Asyncrounsly request the data from server.
            var req = new XMLHttpRequest();
            req.onreadystatechange = function () {
                if ((req.readyState === 4) && (req.status !== 200)) {
                    alert(
                        fileName + `: loading failed!
                        [Hint: you cannot double click index.html to run this
                        project. ` +
                        "The index.html file must be loaded by a web-server.]"
                    );
                }
            };

            req.open('GET', filePath, true);
            req.setRequestHeader('Content-Type', 'text/xml');
            
            req.onload = function () { // after getting data
                var fileContent = null;

                if (fileType === eTextFileType.eXMLFile) {
                    var parser = new DOMParser();
                    fileContent = parser.parseFromString(req.responseText, "text/xml");
                } else {
                    fileContent = req.responseText;
                }
                // store the retrieved data
                hEngine.ResourceMap.asyncLoadCompleted(filePath, fileContent);

                if ((callbackFunction !== null) &&(callbackFunction !== undefined))
                    callbackFunction(filePath);
            };

            req.send();
        }
        else { // if asset is already loaded
            if ((callbackFunction !== null) && (callbackFunction !== undefined))
                callbackFunction(filePath);
        }
    }

    var unloadTextFile= function(fileName) {
        hEngine.ResourceMap.unloadAsset(fileName);
    };

    var mPublic = {
        eTextFileType,
        loadRemoteTextFile,
        unloadTextFile
    };
    return mPublic;
}());