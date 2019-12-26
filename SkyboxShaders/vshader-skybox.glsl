#version 300 es

in vec4 vPosition;

out vec4 ftexCoord;

uniform mat4 model_view;
uniform mat4 projection;

void main() {

    ftexCoord = vPosition;

    gl_Position = projection * model_view * vPosition;

}
