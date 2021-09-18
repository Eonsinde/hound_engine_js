
function Renderable(shader){
    this.mShader = shader;
    this.mColor = [1,1,1,1];
    this.mTransform = new Transform();
}

Renderable.prototype.draw = function(vpMatrix){
    var gl = hEngine.Core.getGL();
    
    this.mShader.activateShader(this.mColor, vpMatrix);
    // to apply Model matrix transform
    this.mShader.loadObjectTransform(this.mTransform.getTransformMatrix());
    
    gl.drawArrays(gl.TRIANGLE_STRIP, 0, 4);
}

Renderable.prototype.setColor = function(color) { this.mColor = color; };
Renderable.prototype.getColor = function() { return this.mColor; };

Renderable.prototype.getTransformComponent = function() { return this.mTransform; }