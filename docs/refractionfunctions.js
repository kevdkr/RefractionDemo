"use strict";
import { initFileShaders, lookAt, perspective, rotateX, rotateY, scalem, vec4 } from "./helperfunctions.js";
import { renderSkybox } from "./renderSkybox.js";
import { renderSphere } from "./renderSphere.js";
let gl;
let canvas;
let skyboxProgram;
let envMapProgram;
let umv;
let uproj;
let uCameraPosition;
let uRotation;
let skybox;
let texture;
let sphere;
let objectTexture;
let indexOfRefraction;
let xAngle;
let yAngle;
let mouse_button_down = false;
let prevMouseX = 0;
let prevMouseY = 0;
window.onload = function init() {
    xAngle = 0;
    yAngle = 0;
    canvas = document.getElementById("gl-canvas");
    gl = canvas.getContext('webgl2', { antialias: true });
    if (!gl) {
        alert("WebGL isn't available");
    }
    gl.clearColor(0.0, 0.0, 0.0, 1.0);
    gl.enable(gl.DEPTH_TEST);
    umv = [];
    uproj = [];
    skyboxProgram = initFileShaders(gl, "SkyboxShaders/vshader-skybox.glsl", "SkyboxShaders/fshader-skybox.glsl");
    gl.useProgram(skyboxProgram);
    umv.push(gl.getUniformLocation(skyboxProgram, "model_view"));
    uproj.push(gl.getUniformLocation(skyboxProgram, "projection"));
    envMapProgram = initFileShaders(gl, "RefractionShaders/vshader-refraction.glsl", "RefractionShaders/fshader-refraction.glsl");
    gl.useProgram(envMapProgram);
    // The shaders that make up envMapProgram need the camera position and rotation matrix
    uCameraPosition = gl.getUniformLocation(envMapProgram, "cameraPosition");
    uRotation = gl.getUniformLocation(envMapProgram, "rotation");
    umv.push(gl.getUniformLocation(envMapProgram, "model_view"));
    uproj.push(gl.getUniformLocation(envMapProgram, "projection"));
    // uniform for passing in which material the user selected
    indexOfRefraction = gl.getUniformLocation(envMapProgram, "indexOfRefraction");
    // start with 1.33, which is for water
    gl.uniform1f(indexOfRefraction, 1.33);
    gl.viewport(0, 0, gl.drawingBufferWidth, gl.drawingBufferHeight);
    initTextures();
    skybox = new renderSkybox(gl, skyboxProgram);
    sphere = new renderSphere(gl, envMapProgram, 60);
    canvas.addEventListener("mousedown", mouse_down);
    canvas.addEventListener("mousemove", mouse_drag);
    canvas.addEventListener("mouseup", mouse_up);
    // sends a different uniform for the index of refraction based on which material the user selects
    let index = document.getElementById("refractionIndex");
    index.onchange = function (event) {
        if (index.options.selectedIndex == 0) {
            gl.uniform1f(indexOfRefraction, 1.33);
        }
        else if (index.options.selectedIndex == 1) {
            gl.uniform1f(indexOfRefraction, 1.309);
        }
        else if (index.options.selectedIndex == 2) {
            gl.uniform1f(indexOfRefraction, 1.52);
        }
        else if (index.options.selectedIndex == 3) {
            gl.uniform1f(indexOfRefraction, 2.42);
        }
    };
    window.setInterval(update, 16);
};
// Loads each image to a texture used by each side of the cube for the skybox
function initTextures() {
    texture = gl.createTexture();
    gl.bindTexture(gl.TEXTURE_CUBE_MAP, texture);
    // images taken from https://opengameart.org/content/elyvisions-skyboxes
    let faces = [
        {
            target: gl.TEXTURE_CUBE_MAP_POSITIVE_X,
            source: "Images/arch3_ft.png"
        },
        {
            target: gl.TEXTURE_CUBE_MAP_NEGATIVE_X,
            source: "Images/arch3_bk.png"
        },
        {
            target: gl.TEXTURE_CUBE_MAP_POSITIVE_Y,
            source: "Images/arch3_up.png"
        },
        {
            target: gl.TEXTURE_CUBE_MAP_NEGATIVE_Y,
            source: "Images/arch3_dn.png"
        },
        {
            target: gl.TEXTURE_CUBE_MAP_POSITIVE_Z,
            source: "Images/arch3_rt.png"
        },
        {
            target: gl.TEXTURE_CUBE_MAP_NEGATIVE_Z,
            source: "Images/arch3_lf.png"
        }
    ];
    // create a face for each of the 6 sides that contain a target texture and the source of the image
    faces.forEach((face) => {
        const { target, source } = face;
        gl.texImage2D(target, 0, gl.RGBA, gl.drawingBufferWidth, gl.drawingBufferHeight, 0, gl.RGBA, gl.UNSIGNED_BYTE, null);
        let image = new Image();
        image.onload = function () { handleTextureLoaded(image, texture, target); };
        image.src = source;
    });
    gl.generateMipmap(gl.TEXTURE_CUBE_MAP);
    gl.texParameteri(gl.TEXTURE_CUBE_MAP, gl.TEXTURE_MIN_FILTER, gl.LINEAR_MIPMAP_LINEAR);
    // set the texture used by the object to the same texture
    objectTexture = texture;
}
function handleTextureLoaded(image, texture, target) {
    gl.bindTexture(gl.TEXTURE_CUBE_MAP, texture);
    gl.texImage2D(target, 0, gl.RGBA, gl.RGBA, gl.UNSIGNED_BYTE, image);
    gl.generateMipmap(gl.TEXTURE_CUBE_MAP);
}
function update() {
    requestAnimationFrame(render);
}
function render() {
    //TODO 1) enable front face culling
    //TODO 2) render back face to texture
    //TODO 3) disable front face culling
    //TODO 4) enable back face culling
    //TODO 5) render front face to texture
    //TODO 6) change fshader-refraction to include back face normals and front face normals
    gl.clearColor(1.0, 1.0, 1.0, 1.0);
    gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);
    gl.viewport(0, 0, gl.drawingBufferWidth, gl.drawingBufferHeight);
    let p = perspective(45.0, 1, 1.0, 100.0);
    gl.useProgram(skyboxProgram);
    gl.uniformMatrix4fv(uproj[0], false, p.flatten());
    let mv = lookAt(new vec4(0, 0, 4.5, 1), new vec4(0, 0, 0, 1), new vec4(0, 1, 0, 0));
    // camera position that will be sent to the envMapProgram
    let cameraPosition = new vec4(0, 0, 4.5, 1);
    // rotation matrix that will be sent to the envMapProgram
    let rotation = mv = mv.mult(rotateY(yAngle).mult(rotateX(xAngle)));
    mv = mv.mult(scalem(10, 10, 10));
    gl.uniformMatrix4fv(umv[0], false, mv.flatten());
    skybox.draw();
    gl.useProgram(envMapProgram);
    gl.uniformMatrix4fv(uproj[1], false, p.flatten());
    let objectmv = lookAt(new vec4(0, 0, 7, 1), new vec4(0, 0, 0, 1), new vec4(0, 1, 0, 0));
    gl.uniformMatrix4fv(umv[1], false, objectmv.flatten());
    gl.uniformMatrix4fv(uRotation, false, rotation.flatten());
    gl.uniform4fv(uCameraPosition, cameraPosition);
    sphere.draw();
}
function mouse_drag(event) {
    let thetaY, thetaX;
    if (mouse_button_down) {
        thetaY = 360.0 * (event.clientX - prevMouseX) / canvas.clientWidth * .5;
        thetaX = 360.0 * (event.clientY - prevMouseY) / canvas.clientHeight * .5;
        prevMouseX = event.clientX;
        prevMouseY = event.clientY;
        xAngle += thetaX;
        yAngle += thetaY;
    }
}
function mouse_down(event) {
    mouse_button_down = true;
    prevMouseX = event.clientX;
    prevMouseY = event.clientY;
}
function mouse_up() {
    mouse_button_down = false;
}
//# sourceMappingURL=refractionfunctions.js.map