import { renderObject } from "./renderObject.js";
import { flatten, vec4 } from "./helperfunctions.js";
// child of renderObject to generate a Sphere
export class renderSphere extends renderObject {
    constructor(gl, program, subdiv) {
        super(gl, program);
        this.subdiv = subdiv;
        let step = (360.0 / subdiv) * (Math.PI / 180.0);
        for (let lat = 0; lat <= Math.PI; lat += step) { //latitude
            for (let lon = 0; lon + step <= 2 * Math.PI; lon += step) { //longitude
                this.verts.push(new vec4(Math.sin(lat) * Math.cos(lon), Math.sin(lon) * Math.sin(lat), Math.cos(lat), 1.0)); //position
                this.verts.push(new vec4(Math.sin(lat) * Math.cos(lon), Math.sin(lon) * Math.sin(lat), Math.cos(lat), 0.0)); //normal
                this.verts.push(new vec4(Math.sin(lat) * Math.cos(lon + step), Math.sin(lat) * Math.sin(lon + step), Math.cos(lat), 1.0));
                this.verts.push(new vec4(Math.sin(lat) * Math.cos(lon + step), Math.sin(lat) * Math.sin(lon + step), Math.cos(lat), 0.0));
                this.verts.push(new vec4(Math.sin(lat + step) * Math.cos(lon + step), Math.sin(lon + step) * Math.sin(lat + step), Math.cos(lat + step), 1.0));
                this.verts.push(new vec4(Math.sin(lat + step) * Math.cos(lon + step), Math.sin(lon + step) * Math.sin(lat + step), Math.cos(lat + step), 0.0));
                this.verts.push(new vec4(Math.sin(lat + step) * Math.cos(lon + step), Math.sin(lon + step) * Math.sin(lat + step), Math.cos(lat + step), 1.0));
                this.verts.push(new vec4(Math.sin(lat + step) * Math.cos(lon + step), Math.sin(lon + step) * Math.sin(lat + step), Math.cos(lat + step), 0.0));
                this.verts.push(new vec4(Math.sin(lat + step) * Math.cos(lon), Math.sin(lat + step) * Math.sin(lon), Math.cos(lat + step), 1.0));
                this.verts.push(new vec4(Math.sin(lat + step) * Math.cos(lon), Math.sin(lat + step) * Math.sin(lon), Math.cos(lat + step), 0.0));
                this.verts.push(new vec4(Math.sin(lat) * Math.cos(lon), Math.sin(lon) * Math.sin(lat), Math.cos(lat), 1.0));
                this.verts.push(new vec4(Math.sin(lat) * Math.cos(lon), Math.sin(lon) * Math.sin(lat), Math.cos(lat), 0.0));
            }
        }
        this.gl.bufferData(this.gl.ARRAY_BUFFER, flatten(this.verts), this.gl.STATIC_DRAW);
    }
}
//# sourceMappingURL=renderSphere.js.map