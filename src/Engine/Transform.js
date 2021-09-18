function Transform(){
    this.mPosition = vec2.fromValues(0, 0);
    this.mScale = vec2.fromValues(1,1);
    this.mRotationInRad = 0.0;
}

// Note that the vec in glMath is an array

// Position getters and setters
Transform.prototype.setXPos = function (value){ // set x
    this.mPosition[0] = value;
} 
Transform.prototype.getXPos = function (){ return this.mPosition[0]; }

Transform.prototype.setYPos = function (value){ // set y
    this.mPosition[1] = value;
} 
Transform.prototype.getYPos = function (){ return this.mPosition[1]; }

Transform.prototype.setPosition = function(xPos,yPos) { // set both
    this.setXPos(xPos);
    this.setYPos(yPos);
}
Transform.prototype.getPosition = function() { return this.mPosition; }
   
// scale getter and setter
Transform.prototype.setWidth = function(value){ // set x
    this.mScale[0] = value;
} 
Transform.prototype.getWidth = function(){ return this.mScale[0]; }

Transform.prototype.setHeight = function(value){ // set y
    this.mScale[1] = value;
} 
Transform.prototype.getHeight = function(){ return this.mScale[1]; }

Transform.prototype.setSize = function(width, height) { 
    this.setWidth(width);
    this.setHeight(height); 
}
Transform.prototype.getSize = function(){ return this.mScale; }
   
// rotation getter and setter
Transform.prototype.setRotationInRad = function(rotationInRadians) {
    this.mRotationInRad = rotationInRadians;
    while (this.mRotationInRad > (2*Math.PI))
        this.mRotationInRad -= (2*Math.PI);
}
Transform.prototype.getRotationInRad = function() { return this.mRotationInRad; }
// convert rotation given rotation value in deg to rad
Transform.prototype.setRotationInDegree = function (rotationInDegree){ this.setRotationInRad(rotationInDegree * Math.PI/180.0); };


// create our matrix data
Transform.prototype.getTransformMatrix = function() {
    // Creates a blank identity matrix
    var matrix = mat4.create();
    mat4.translate(matrix, matrix, vec3.fromValues(this.getXPos(), this.getYPos(), 0.0));
    mat4.rotateZ(matrix, matrix, this.getRotationInRad());
    mat4.scale(matrix, matrix, vec3.fromValues(this.getWidth(), this.getHeight(), 0.0));
    return matrix;
}