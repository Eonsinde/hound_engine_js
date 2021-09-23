var hEngine = hEngine || {}; 

/*
    This class handles initialization of default resources
*/

hEngine.DefaultResources = (function(){
   // Simple Shader GLSL Shader file paths
    var kSimpleVSPath = "src/GLSLShaders/SimpleVS.glsl"; // Path to the simpleVS
    var kSimpleFSPath = "src/GLSLShaders/SimpleFS.glsl"; // Path to the simpleFS

    var mConstColorShader = null; // variable for the SimpleShader object
    var getConstColorShader = function() { return mConstColorShader; }; // assessor

    // callback function after loadings are done
    var createShaders = function(callBackFunction) { // callBackFunc triggers the startScene function in EngineCore
        mConstColorShader = new SimpleShader(kSimpleVSPath, kSimpleFSPath);
        callBackFunction(); // initialize game and start gameloop
    };

    // initiate asynchronous loading of GLSL Shader files
    var initialize = function(callBackFunction) { // callBackFunc triggers the startScene function in EngineCore
        // constant color shader: SimpleVS, and SimpleFS
        hEngine.TextFileLoader.loadRemoteTextFile(kSimpleVSPath, hEngine.TextFileLoader.eTextFileType.eTextFile);
        hEngine.TextFileLoader.loadRemoteTextFile(kSimpleFSPath, hEngine.TextFileLoader.eTextFileType.eTextFile);
        hEngine.ResourceMap.setLoadCompleteCallBack(function() { createShaders(callBackFunction); });
    };

    var mPublic = {
        initialize,
        getConstColorShader
    };

    return mPublic;
}());