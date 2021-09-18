"use strict";

var hEngine = hEngine || {};


hEngine.VertexBuffer = (function(){
    // First: define the vertices for a square
    var verticesOfSquare = [
        0.5, 0.5, 0.0,
        -0.5, 0.5, 0.0,
        0.5, -0.5, 0.0,
        -0.5, -0.5, 0.0
    ];
   
    // reference to the vertex positions for the square in the gl context
    var mSquareVertexBuffer = null;
   
    var getGLVertexRef = function() { return mSquareVertexBuffer; }; //public accessor to get vertexbufferreference
   
    var initialize = function() { // public getter to create buffer
        var gl = hEngine.Core.getGL();
        // Step A: Create a buffer on the gGL context for our vertex positions
        mSquareVertexBuffer = gl.createBuffer();
        // Step B: Activate vertexBuffer
        gl.bindBuffer(gl.ARRAY_BUFFER, mSquareVertexBuffer);
        // Step C: Loads verticesOfSquare into the vertexBuffer
        gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(verticesOfSquare), gl.STATIC_DRAW);
    };
   
    var mPublic = { initialize, getGLVertexRef };
    return mPublic;
}());