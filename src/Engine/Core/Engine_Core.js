"use strict";

var hEngine = hEngine || {};

hEngine.Core = (function(){ // the function is defined and automatically called after returning mPublic
    // instance variable: the graphical context for drawing
    var mGL = null;

    // initialize webGL context
    var initializeWebGL = function(htmlCanvasID){
        var canvas = document.querySelector(`#${htmlCanvasID}`);

        // Get the standard or experimental webgl and binds to the Canvas area
        mGL = canvas.getContext("webgl") || canvas.getContext("experimental-webgl");

        if (mGL === null) {
            document.write("<br><b>WebGL is not supported!</b>");
            return;
        }

        // now initialize the VertexBuffer
        hEngine.VertexBuffer.initialize();
    }

    // set clear color for the color buffer
    var clearCanvas = function(color){
        mGL.clearColor(color[0], color[1], color[2], color[3]); 
        mGL.clear(mGL.COLOR_BUFFER_BIT); 
    }

    // Accessor of the webgl context / getter
    var getGL = function() { return mGL; };
    // Contains the functions and variables that will be accessible.
    var mPublic = { initializeWebGL, getGL, clearCanvas };
    return mPublic;
}());

