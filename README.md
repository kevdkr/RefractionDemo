# Typescript + WebGL
### A live demo can be found [here](https://kkrohn18.github.io/RefractionDemo/index.html)

This is a demonstration of using WebGL, a graphics library based on OpenGL, and Typescript to simulate single-sided refraction of light passing through an object.

# How it works
### The Skybox environment is rendered
- The skybox consists of 6 images rendered to a texture and applied to each side of the cube

### Rendering the skybox environment and rendering the sphere with the effect of refraction requires 2 different shader programs 
- The two shader programs are found in the SkyboxShaders and RefractionShaders directories

### The sphere is rendered in the Skybox environment.
- To simulate the effect of refraction through the sphere (as if it were a glass sphere or a sphere of water) the texture of the environment gets mapped onto the sphere with a calculation of texture coordinates in the fragment shader.

### The Fragment shader used to render the sphere calculates the texture coordinates of the environment on the sphere.
- The texture coordinates on the sphere used to simulate the refraction are the
refraction vectors calculated in the fragment shader. The skybox is environment mapped onto the object. Then the use of the object’s normal vectors and the eye vectors calculated in world space are passed into the fragment shader and used in the “refract” function to calculate the refraction vector. The refraction vector is then used as the texture coordinates on the object to simulate single-sided refraction.


