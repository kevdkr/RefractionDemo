// Parent class for generating objects, gets extended by renderSphere
export class renderObject {

    verts:any[];
    gl:WebGLRenderingContext;
    program:WebGLProgram;
    bufferId:WebGLBuffer;

    vPosition:GLint;
    vNormal:GLint;

    constructor(gl:WebGLRenderingContext, program:WebGLProgram) {

        this.verts = [];
        this.gl = gl;
        this.program = program;

        this.bufferId = this.gl.createBuffer();
        this.gl.bindBuffer(this.gl.ARRAY_BUFFER, this.bufferId);

        this.gl.useProgram(this.program);

        this.vPosition = gl.getAttribLocation(program, "vPosition");
        this.vNormal = gl.getAttribLocation(program, "vNormal");
    }

    draw() {
        this.gl.bindBuffer(this.gl.ARRAY_BUFFER, this.bufferId);

        this.gl.vertexAttribPointer(this.vPosition, 4, this.gl.FLOAT, false, 32, 0);
        this.gl.enableVertexAttribArray(this.vPosition);

        this.gl.vertexAttribPointer(this.vNormal, 4, this.gl.FLOAT, false, 32, 16);
        this.gl.enableVertexAttribArray(this.vNormal);

        this.gl.drawArrays(this.gl.TRIANGLES, 0, this.verts.length/2);
    }
}