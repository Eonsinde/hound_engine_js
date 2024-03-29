function MyGame(htmlCanvasID) {
    // variables of the constant color shader
    this.mConstColorShader = null;

    // The camera
    this.mCamera = null;

    // the squares
    this.mWhiteSq = null;
    this.mRedSq = null;
}

MyGame.prototype.initialize = function(){
    var gl = hEngine.Core.getGL();
    let vWidth = gl.canvas.clientWidth; // viewport Width
    let vHeight = gl.canvas.clientHeight; // viewport height

    // The shader for drawing
    this.mConstColorShader = hEngine.DefaultResources.getConstColorShader();
    this.mCamera = new Camera2D(
        vec2.fromValues(0, 0),
        20,
        [0, 0, vWidth, vHeight]
    );

    this.mWhiteSq = new Renderable(this.mConstColorShader);
    this.mWhiteSq.setColor([1, 0, 1, 1]);
    this.mRedSq = new Renderable(this.mConstColorShader);
    this.mRedSq.setColor([1, 0, 0, 1]);
}

// The update function, updates the application state. Make sure to _NOT_ draw
// anything from this function!
MyGame.prototype.update = function() {
    if (hEngine.Input.isKeyClicked(hEngine.Input.keys.Zero)){
        console.log("Zero clicked");
        hEngine.TextFileLoader.loadTextFile("assets/Shazam.img");
    }

    if (hEngine.Input.isKeyPressed(hEngine.Input.keys.Up)){
        var redTransform = this.mRedSq.getTransformComponent();
        if (redTransform.getWidth() > 1)
            redTransform.setSize(1, 1);
        redTransform.incSizeBy(0.005);
    }
    else if(hEngine.Input.isKeyPressed(hEngine.Input.keys.Down)){
        var redTransform = this.mRedSq.getTransformComponent();
        if (redTransform.getWidth() <= .2)
            redTransform.setSize(.2, .2);
        redTransform.dcrSizeBy(0.005);
    }
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
