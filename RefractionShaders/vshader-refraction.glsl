#version 300 es

in vec4 vPosition;
in vec4 vNormal;

uniform mat4 projection;
uniform mat4 model_view;

uniform mat4 rotation;
uniform vec4 cameraPosition;

out vec3 V;
out vec3 N;

void main() {

    vec4 veyepos = rotation * vPosition;

    V = normalize(veyepos.xyz - cameraPosition.xyz);
    N = normalize(rotation*vNormal).xyz;

    gl_Position = projection * model_view * vPosition;
}
