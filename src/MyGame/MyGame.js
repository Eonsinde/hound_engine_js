function MyGame(htmlCanvasID) {
    hEngine.Core.initializeWebGL(htmlCanvasID);

    // The shader for drawing
    this.mShader = new SimpleShader("vertex", "fragment");
    this.mCamera = new Camera2D(
        vec2.fromValues(20, 60),
        20,
        [20, 40, 600, 300]
    );

    this.mWhiteSq = new Renderable(this.mShader);
    this.mWhiteSq.setColor([1, 0, 1, 1]);
    this.mRedSq = new Renderable(this.mShader);
    this.mRedSq.setColor([1, 0, 0, 1]);
    // this.mRedSq.getTransformComponent().setSize(50, 50);
    this.mRedSq.getTransformComponent().setPosition(0, 0);


    // Step C1: Clear the canvas
    hEngine.Core.clearCanvas([0.1, 0.12, 0.15, 1]);

    this.mCamera.setupViewProjection();

    var gl = hEngine.Core.getGL();

    // gl.viewport(20, 40, 600, 300);
    // gl.scissor(20, 40, 600, 300);
    gl.viewport(0, 0, 640, 480);
    gl.scissor(0, 0, 640, 480);
    
    gl.enable(gl.SCISSOR_TEST);
    hEngine.Core.clearCanvas([0.8, 0.8, 0.8, 1.0]); // clear the scissor area
    gl.disable(gl.SCISSOR_TEST);

    // vpMatrix
    var viewMatrix = mat4.create();
    var projMatrix = mat4.create();
    // Step F1: define the view matrix
    // mat4.lookAt(viewMatrix, [20, 60, 10], [20, 60, 0], [0, 1, 0]); // pos, target, up
    // viewMatrix = m4.lookAt([20, 60, 10], [20, 60, 0], [0, 1, 0]); // pos, target, up
    viewMatrix = m4.lookAt([0, 0, 10], [0, 0, 0], [0, 1, 0]); // pos, target, up

    // mat4.ortho(projMatrix, -100, 100, -50, 50, 0, 1000);
    projMatrix = m4.ortho(-100, 100, -100, 100, 0, 1000); // Left, Right, Bottom, Up, zNear, zFar
    // projMatrix = m4.ortho(gl.canvas.clientWidth, gl.canvas.clientHeight);
    console.log(projMatrix);

    var vpMatrix = mat4.create();
    mat4.multiply(vpMatrix, projMatrix, viewMatrix);


    // make changes to game objects
    // this.mRedSq.getTransformComponent().setSize(1.2, 1.2); 
    // trying to use manual translation for the view matrix which is represented by vpMatrix for now
    // mat4.translate(vpMatrix, vpMatrix, vec3.fromValues(.5, .5, 0));
    // mat4.multiply(vpMatrix, projMatrix, vpMatrix);

    vpMatrix = m4.multiply(projMatrix, viewMatrix);
    this.mRedSq.draw(vpMatrix);
}

document.body.onload = new MyGame("game-viewport");