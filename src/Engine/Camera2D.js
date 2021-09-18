function Camera2D(wcCenter, wcWidth, viewportData){
    // WC and viewport position and size
    this.mWCCenter = wcCenter;
    this.mWCWidth = wcWidth;
    this.mViewport = viewportData; // [x, y, width, height]
    this.mNearPlane = 0;
    this.mFarPlane = 1000;

    // transformation matrices
    this.mViewMatrix = mat4.create();
    this.mProjMatrix = mat4.create();
    this.mVPMatrix = mat4.create();

    // background color
    // this.mBgColor = [0.8, 0.8, 0.8, 1]; // RGB and Alpha
    this.mBgColor = [0.1, 0.12, 0.15, 1]; 
}

// getters and setters
Camera2D.prototype.setWCCenter = function(xPos, yPos) {
    this.mWCCenter[0] = xPos;
    this.mWCCenter[1] = yPos;
};

Camera2D.prototype.getWCCenter = function() { return this.mWCCenter; };
Camera2D.prototype.setWCWidth = function(width) { this.mWCWidth = width; };

Camera2D.prototype.setViewport = function(viewportArray) {
    this.mViewport = viewportArray;
};
Camera2D.prototype.getViewport = function() { return this.mViewport; };

Camera2D.prototype.setBackgroundColor = function(newColor) {
    this.mBgColor = newColor; 
};
Camera2D.prototype.getBackgroundColor = function() { return this.mBgColor; };
    
// Getter for the View-Projection transform operator
Camera2D.prototype.getVPMatrix = function() { return this.mVPMatrix; };

// Initializes the camera to begin drawing
Camera2D.prototype.setupViewProjection = function() {
    var gl = hEngine.Core.getGL();
    // Step A: Configure the viewport
    gl.viewport(
        this.mViewport[0], // x position of bottom-left corner
        this.mViewport[1], // y position of bottom-left corner
        this.mViewport[2], // width of the area to be drawn
        this.mViewport[3]  // height of the area to be drawn
    );

    // Step A2: set up the corresponding scissor area to limit clear area
    gl.scissor( 
        this.mViewport[0], // x position of bottom-left corner
        this.mViewport[1], // y position of bottom-left corner
        this.mViewport[2], // width of the area to be drawn
        this.mViewport[3] // height of the area to be drawn
    ); 
        
    // Step A3: set the color to be clear to black
    gl.clearColor(this.mBgColor[0], this.mBgColor[1],
        this.mBgColor[2], this.mBgColor[3]
    );

    // Step A4: enable and clear the scissor area
    gl.enable(gl.SCISSOR_TEST);
    gl.clear(gl.COLOR_BUFFER_BIT);
    gl.disable(gl.SCISSOR_TEST);

    // Step B: define the View-Projection matrix
    // Step B1: define the view matrix
    // mat4.lookAt(this.mViewMatrix,
    //     [this.mWCCenter[0], this.mWCCenter[1], 10],// WC center
    //     [this.mWCCenter[0], this.mWCCenter[1], 0], //
    //     [0, 1, 0] // camUp
    // ); 

    this.mViewMatrix = m4.lookAt([this.mWCCenter[0], this.mWCCenter[1], 1], 
                            [this.mWCCenter[0], this.mWCCenter[1], 0], 
                            [0, 1, 0]); // pos, target, up
    
    // var halfWCWidth = 0.5 * this.mWCWidth;
    // // WCHeight = WCWidth * viewportHeight / viewportWidth
    // var halfWCHeight = halfWCWidth * this.mViewport[3] / this.mViewport[2];
    
    // this.mProjMatrix = m4.ortho(-halfWCHeight, halfWCHeight, 
    //                             -halfWCWidth, halfWCWidth, 
    //                             this.mNearPlane, this.mFarPlane); // bottom, top, left, right, zNear, zFar

    this.mProjMatrix = m4.ortho(-1, 1, 
                                -1, 1, 
                                this.mNearPlane, this.mFarPlane); // bottom, top, left, right, zNear, zFar                            
    
    // mat4.ortho(this.mProjMatrix,
    //     -halfWCWidth, // distant to left of WC
    //     halfWCWidth, // distant to right of WC
    //     -halfWCHeight, // distant to bottom of WC
    //     halfWCHeight, // distant to top of WC
    //     this.mNearPlane, // z-distant to near plane
    //     this.mFarPlane  // z-distant to far plane
    // ); 

    // Step B3: concatnate view and project matrices
    this.mVPMatrix = m4.multiply(this.mProjMatrix, this.mViewMatrix);
};