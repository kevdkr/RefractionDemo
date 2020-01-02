import { flatten, vec4 } from "./helperfunctions.js";
// class to render a skybox
// only has vPosition attribute since
// the texture coordinates are based
// on the same coordinates as the position
export class renderSkybox {
    constructor(gl, program) {
        this.verts = [];
        this.gl = gl;
        this.program = program;
        this.bufferId = this.gl.createBuffer();
        this.gl.bindBuffer(this.gl.ARRAY_BUFFER, this.bufferId);
        this.gl.useProgram(this.program);
        this.vPosition = gl.getAttribLocation(program, "vPosition");
        //front face
        this.verts.push(new vec4(1.0, -1.0, 1.0, 1.0));
        this.verts.push(new vec4(1.0, 1.0, 1.0, 1.0));
        this.verts.push(new vec4(-1.0, 1.0, 1.0, 1.0));
        this.verts.push(new vec4(-1.0, 1.0, 1.0, 1.0));
        this.verts.push(new vec4(-1.0, -1.0, 1.0, 1.0));
        this.verts.push(new vec4(1.0, -1.0, 1.0, 1.0));
        //back face
        this.verts.push(new vec4(-1.0, -1.0, -1.0, 1.0));
        this.verts.push(new vec4(-1.0, 1.0, -1.0, 1.0));
        this.verts.push(new vec4(1.0, 1.0, -1.0, 1.0));
        this.verts.push(new vec4(1.0, 1.0, -1.0, 1.0));
        this.verts.push(new vec4(1.0, -1.0, -1.0, 1.0));
        this.verts.push(new vec4(-1.0, -1.0, -1.0, 1.0));
        //left face
        this.verts.push(new vec4(1.0, 1.0, 1.0, 1.0));
        this.verts.push(new vec4(1.0, -1.0, 1.0, 1.0));
        this.verts.push(new vec4(1.0, -1.0, -1.0, 1.0));
        this.verts.push(new vec4(1.0, -1.0, -1.0, 1.0));
        this.verts.push(new vec4(1.0, 1.0, -1.0, 1.0));
        this.verts.push(new vec4(1.0, 1.0, 1.0, 1.0));
        //right face
        this.verts.push(new vec4(-1.0, 1.0, -1.0, 1.0));
        this.verts.push(new vec4(-1.0, -1.0, -1.0, 1.0));
        this.verts.push(new vec4(-1.0, -1.0, 1.0, 1.0));
        this.verts.push(new vec4(-1.0, -1.0, 1.0, 1.0));
        this.verts.push(new vec4(-1.0, 1.0, 1.0, 1.0));
        this.verts.push(new vec4(-1.0, 1.0, -1.0, 1.0));
        //top
        this.verts.push(new vec4(1.0, 1.0, 1.0, 1.0));
        this.verts.push(new vec4(1.0, 1.0, -1.0, 1.0));
        this.verts.push(new vec4(-1.0, 1.0, -1.0, 1.0));
        this.verts.push(new vec4(-1.0, 1.0, -1.0, 1.0));
        this.verts.push(new vec4(-1.0, 1.0, 1.0, 1.0));
        this.verts.push(new vec4(1.0, 1.0, 1.0, 1.0));
        //bottom
        this.verts.push(new vec4(1.0, -1.0, -1.0, 1.0));
        this.verts.push(new vec4(1.0, -1.0, 1.0, 1.0));
        this.verts.push(new vec4(-1.0, -1.0, 1.0, 1.0));
        this.verts.push(new vec4(-1.0, -1.0, 1.0, 1.0));
        this.verts.push(new vec4(-1.0, -1.0, -1.0, 1.0));
        this.verts.push(new vec4(1.0, -1.0, -1.0, 1.0));
        this.gl.bufferData(gl.ARRAY_BUFFER, flatten(this.verts), gl.STATIC_DRAW);
    }
    draw() {
        this.gl.bindBuffer(this.gl.ARRAY_BUFFER, this.bufferId);
        this.gl.vertexAttribPointer(this.vPosition, 4, this.gl.FLOAT, false, 16, 0);
        this.gl.enableVertexAttribArray(this.vPosition);
        this.gl.drawArrays(this.gl.TRIANGLES, 0, this.verts.length);
    }
}
//# sourceMappingURL=renderSkybox.js.map