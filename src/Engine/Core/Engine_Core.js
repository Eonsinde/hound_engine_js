"use strict";

var hEngine = hEngine || {};

hEngine.Core = (function(){ // the function is defined and automatically called after returning mPublic
    // instance variable: the graphical context for drawing
    var mGL = null;

    // initialize webGL context
    var _initializeWebGL = function(htmlCanvasID){
        var canvas = document.querySelector(`#${htmlCanvasID}`);

        // Get the standard or experimental webgl and binds to the Canvas area
        mGL = canvas.getContext("webgl") || canvas.getContext("experimental-webgl");

        if (mGL === null) {
            document.write("<br><b>WebGL is not supported!</b>");
            return;
        }
    }

    var initializeEngineCore = function(htmlCanvasID, myGame) {
        _initializeWebGL(htmlCanvasID);
        hEngine.VertexBuffer.initialize();
        hEngine.Input.initialize();
        hEngine.DefaultResources.initialize(function() { startScene(myGame); } );
    };

    var startScene = function(myGame) {
        myGame.initialize.call(myGame); // Called in this way to keep correct context
        hEngine.GameLoop.start(myGame); // start the game loop after initialization
    };

    // set clear color for the color buffer
    var clearCanvas = function(color){
        mGL.clearColor(color[0], color[1], color[2], color[3]); 
        mGL.clear(mGL.COLOR_BUFFER_BIT); 
    }

    // Accessor of the webgl context / getter
    var getGL = function() { return mGL; };
    // Contains the functions and variables that will be accessible.
    var mPublic = { _initializeWebGL, initializeEngineCore, getGL, clearCanvas };
    return mPublic;
}());

