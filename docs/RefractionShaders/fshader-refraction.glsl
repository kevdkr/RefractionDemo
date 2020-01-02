#version 300 es
precision mediump float;

in vec4 veyepos;
in vec3 V;
in vec3 N;

uniform samplerCube objectTexture;

uniform float indexOfRefraction;

out vec4 fColor;

void main() {

    vec3 fV = normalize(V);
    vec3 fN = normalize(N);

    // 1.00 for air
    float ratio = 1.00 / indexOfRefraction;
    vec3 refracted = refract(fV, fN, ratio);

    fColor = texture(objectTexture, refracted);
}