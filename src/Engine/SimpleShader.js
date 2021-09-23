// basic shader class

function SimpleShader(vertexShaderPath, fragmentShaderPath, htmlLoad=false) {
    // instance variables (Convention: all instance variables: mVariables)
    this.mProgram = null;
    this.mShaderVertexPositionAttribute = null;
    this.mPixelLoc = null; // fragcolor 

    this.mModelTransformLoc = null;
    this.mViewProjTransformLoc = null;

    var gl = hEngine.Core.getGL(); // get engine's WebGL context object
   
    // Step A: load and compile vertex and fragment shaders
    // load from HTML or File
    var vertexShader, fragmentShader;
    if (htmlLoad){ // use HTML tag 
        vertexShader = this._loadAndCompileShaderFromHTML(vertexShaderPath, gl.VERTEX_SHADER);
        fragmentShader = this._loadAndCompileShaderFromHTML(fragmentShaderPath, gl.FRAGMENT_SHADER);
    }else{
        // vertexShader = this._loadAndCompileShaderRemote(vertexShaderPath, gl.VERTEX_SHADER);
        // fragmentShader = this._loadAndCompileShaderRemote(fragmentShaderPath, gl.FRAGMENT_SHADER);
        vertexShader = this._compileShaderDefaultRes(vertexShaderPath, gl.VERTEX_SHADER);
        fragmentShader = this._compileShaderDefaultRes(fragmentShaderPath, gl.FRAGMENT_SHADER);
    }
    
   
    // Step B: Create and link the shaders into a program.
    this.mProgram = gl.createProgram();
    gl.attachShader(this.mProgram, vertexShader);
    gl.attachShader(this.mProgram, fragmentShader);
    gl.linkProgram(this.mProgram);
    // Step C: check for error
    if (!gl.getProgramParameter(this.mProgram, gl.LINK_STATUS)) {
        alert("Error linking shader");
        return null;
    }
   
    // Step D: Gets a reference to the aSquareVertexPosition attribute
    this.mShaderVertexPositionAttribute = gl.getAttribLocation(this.mProgram, "aSquareVertexPosition");
    this.mPixelLoc = gl.getUniformLocation(this.mProgram, "uPixelColor");
    this.mModelTransformLoc = gl.getUniformLocation(this.mProgram, "uModel");
    this.mViewProjTransformLoc = gl.getUniformLocation(this.mProgram, "uViewProjTransform");

    // Step E: Activates the vertex buffer loaded in Engine.Core_VertexBuffer
    gl.bindBuffer(gl.ARRAY_BUFFER, hEngine.VertexBuffer.getGLVertexRef());
   
    /// Step F: Describe the characteristic of the vertex position attribute
    gl.vertexAttribPointer(
        this.mShaderVertexPositionAttribute, // input vertex attrib location
        3, 
        gl.FLOAT, 
        false, // if the content is normalized vectors
        0, 
        0);
}

// The id is the id of the script in the html tag.
SimpleShader.prototype._loadAndCompileShaderFromHTML = function(id, shaderType) { // assumes shader code is coming from script tag
    var shaderText, shaderSource, compiledShader;
    var gl = hEngine.Core.getGL();
    // Step A: Get the shader source from index.html
    shaderText = document.getElementById(id);
    shaderSource = shaderText.firstChild.textContent;
    // Step B: Create the shader based on the shader type: vertex or fragment
    compiledShader = gl.createShader(shaderType);
    // Step C: Compile the created shader
    gl.shaderSource(compiledShader, shaderSource);
    gl.compileShader(compiledShader);
    
    if (!gl.getShaderParameter(compiledShader, gl.COMPILE_STATUS)) {
        alert("A shader compiling error occurred: " +
        gl.getShaderInfoLog(compiledShader));
    }
    return compiledShader;
};

// using default resources; no need for loading
SimpleShader.prototype._compileShaderDefaultRes = function(filePath, shaderType){
    var gl = hEngine.Core.getGL();

    let shaderCode=null, compiledShader=null;
    shaderCode = hEngine.ResourceMap.retrieveAsset(filePath);

    if (shaderCode === null) {
        alert("WARNING: Loading of:" + filePath + " Failed!");
        return null;
    }

    compiledShader = gl.createShader(shaderType);
    // Step C: Compile the created shader
    gl.shaderSource(compiledShader, shaderCode);
    gl.compileShader(compiledShader);
    
    if (!gl.getShaderParameter(compiledShader, gl.COMPILE_STATUS)) {
        alert("A shader compiling error occurred: " +
        gl.getShaderInfoLog(compiledShader));
    }
    return compiledShader;
}

SimpleShader.prototype._loadAndCompileShaderRemote = function(filePath, shaderType){
    var gl = hEngine.Core.getGL();
    var xmlReq = new XMLHttpRequest();
    xmlReq.open('GET', filePath, false);

    try {
        xmlReq.send();
    } catch (error) {
        alert("Failed to load shader: " + filePath);
        return null;
    }
    
    let shaderCode = xmlReq.responseText;

    if (shaderCode === null) {
        alert("WARNING: Loading of:" + filePath + " Failed!");
        return null;
    }

    var compiledShader = gl.createShader(shaderType);
    // Step C: Compile the created shader
    gl.shaderSource(compiledShader, shaderCode);
    gl.compileShader(compiledShader);
    
    if (!gl.getShaderParameter(compiledShader, gl.COMPILE_STATUS)) {
        alert("A shader compiling error occurred: " +
        gl.getShaderInfoLog(compiledShader));
    }
    return compiledShader;
}

SimpleShader.prototype.activateShader = function(pixelColor, vpMatrix) {
    var gl = hEngine.Core.getGL();

    gl.useProgram(this.mProgram);
    gl.enableVertexAttribArray(this.mShaderVertexPositionAttribute);
    gl.uniformMatrix4fv(this.mViewProjTransformLoc, false, vpMatrix);
    gl.uniform4fv(this.mPixelLoc, pixelColor);
};

SimpleShader.prototype.loadObjectTransform = function(modelTransform) {
    var gl = hEngine.Core.getGL();
    gl.uniformMatrix4fv(this.mModelTransformLoc, false, modelTransform);
};

SimpleShader.prototype.getShader = function() { return this.mProgram; };