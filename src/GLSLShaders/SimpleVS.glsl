uniform mat4 uModel;
uniform mat4 uViewProjTransform;

attribute vec3 aSquareVertexPosition;

void main(void) {
    gl_Position =  uViewProjTransform * uModel * vec4(aSquareVertexPosition, 1.0);
}