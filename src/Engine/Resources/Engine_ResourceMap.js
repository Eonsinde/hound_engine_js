var hEngine = hEngine || { };

/*
    this class handles storing of engine resources and 
    needed assets for games
*/

hEngine.ResourceMap = (function(){ // In C++, this class should derive from the singleton interface
    var MapEntry = function(rName) { // a class that stores assets
        this.mAsset = rName;
    }; // in C++, create a class for this - mAsset : std::string

    // Resource storage
    // holds MapEntry objects:- "asset_name": Asset_Object
    var mResourceMap = {};  // std::map<std::string, Hound::MapEntry>
    // Number of outstanding load operations
    var mNumOutstandingLoads = 0;
    // Callback function when all textures are loaded
    var mLoadCompleteCallback = null;
    
    var _checkForAllLoadCompleted = function(){
        if ((mNumOutstandingLoads === 0) && (mLoadCompleteCallback !== null)){
             // ensures the load complete call back will only be called once!
            var funToCall = mLoadCompleteCallback;
            mLoadCompleteCallback = null;
            funToCall();
        }
    }

    // Make sure to set the callback _AFTER_ all load commands are issued
    var setLoadCompleteCallBack = funct => {
        mLoadCompleteCallback = funct;
        // in case all loading are done
        _checkForAllLoadCompleted();
    }

    var asyncLoadRequested = rName => { // resource name
        mResourceMap[rName] = new MapEntry(rName);
        // place holder for the resource to be loaded
        ++mNumOutstandingLoads;
    }

    var asyncLoadCompleted = (rName, loadedAsset) => {
        if (!isAssetLoaded(rName))
            alert("hEngine.asyncLoadCompleted: [" + rName + "] not in map");
        mResourceMap[rName].mAsset = loadedAsset;
        --mNumOutstandingLoads;
        _checkForAllLoadCompleted();
    }

    var isAssetLoaded = rName => {
        return (rName in mResourceMap);
    };

    var retrieveAsset = rName => {
        let r = null;
        if (rName in mResourceMap)
            r = mResourceMap[rName].mAsset;
        return r;
    };

    var unloadAsset = function(rName) {
        if (rName in mResourceMap) {
            delete mResourceMap[rName];
        }
    };

    var mPublic = {
        // asynchronous resource loading support
        asyncLoadRequested,
        asyncLoadCompleted,
        setLoadCompleteCallBack,

        // resource storage
        retrieveAsset,
        unloadAsset,
        isAssetLoaded
    };

    return mPublic;
}());