#version 300 es
precision mediump float;

in vec4 ftexCoord;

uniform samplerCube textureSampler;

out vec4 fColor;

void main() {

    fColor = texture(textureSampler, ftexCoord.xyz);
}