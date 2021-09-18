function MyGame(htmlCanvasID) {
    // variables of the constant color shader
    this.mConstColorShader = null;

    // The camera
    this.mCamera = null;

    // the squares
    this.mWhiteSq = null;
    this.mRedSq = null;

    // initialize webGl context
    hEngine.Core.initializeWebGL(htmlCanvasID);

    // initialize game
    this.initialize();
}


MyGame.prototype.initialize = function(){
    var gl = hEngine.Core.getGL();
    let vWidth = gl.canvas.clientWidth; // viewport Width
    let vHeight = gl.canvas.clientHeight; // viewport height

    // The shader for drawing
    this.mConstColorShader = new SimpleShader("vertex", "fragment");
    this.mCamera = new Camera2D(
        vec2.fromValues(0, 0),
        20,
        [0, 0, vWidth, vHeight]
    );

    this.mWhiteSq = new Renderable(this.mConstColorShader);
    this.mWhiteSq.setColor([1, 0, 1, 1]);
    this.mRedSq = new Renderable(this.mConstColorShader);
    this.mRedSq.setColor([1, 0, 0, 1]);
   
    // start game loop
    hEngine.GameLoop.start(this);
}

// The update function, updates the application state. Make sure to _NOT_ draw
// anything from this function!
MyGame.prototype.update = function() {
    this.mWhiteSq.getTransformComponent().setPosition(.5, .5);
    // For this very simple game, let's move the white square and pulse the red
    // Step A: move the white square
    var whiteTransform = this.mWhiteSq.getTransformComponent();
    // var deltaX = 0.05;
    
    // if (whiteTransform.getXPos() > 30) // this is the right-bound of the window
    //     whiteTransform.setPosition(10, 60);
    // whiteTransform.incXPosBy(deltaX);
    whiteTransform.incRotationByDegree(1);
    
    // // Step B: pulse the red square
    var redTransform = this.mRedSq.getTransformComponent();
    if (redTransform.getWidth() > .7)
        redTransform.setSize(.2, .2);
    redTransform.incSizeBy(0.005);
};

MyGame.prototype.draw = function() {
    // Step A: clear the canvas
    // hEngine.Core.clearCanvas([0.9, 0.9, 0.9, 1.0]); // clear to light gray
    
    // Step B: Activate the drawing Camera
    this.mCamera.setupViewProjection();
    
    // draw squares
    this.mWhiteSq.draw(this.mCamera.getVPMatrix());
    this.mRedSq.draw(this.mCamera.getVPMatrix());
};


document.body.onload = new MyGame("game-viewport");