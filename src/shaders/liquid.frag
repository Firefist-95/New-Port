precision highp float;

uniform float u_time;
uniform vec2 u_mouse;
uniform vec2 u_resolution;
uniform sampler2D u_texture;
uniform sampler2D u_envMap;

varying vec2 v_uv;

#define PI 3.14159265359

vec3 mod289(vec3 x) {
  return x - floor(x * (1.0 / 289.0)) * 289.0;
}

vec2 mod289(vec2 x) {
  return x - floor(x * (1.0 / 289.0)) * 289.0;
}

vec3 permute(vec3 x) {
  return mod289(((x * 34.0) + 1.0) * x);
}

float snoise(vec2 v) {
  const vec4 C = vec4(0.211324865405187, 0.366025403784439, -0.577350269189626, 0.024390243902439);
  vec2 i = floor(v + dot(v, C.yy));
  vec2 x0 = v - i + dot(i, C.xx);
  vec2 i1 = (x0.x > x0.y) ? vec2(1.0, 0.0) : vec2(0.0, 1.0);
  vec4 x12 = x0.xyxy + C.xxzz;
  x12.xy -= i1;
  i = mod289(i);
  vec3 p = permute(permute(i.y + vec3(0.0, i1.y, 1.0)) + i.x + vec3(0.0, i1.x, 1.0));
  vec3 m = max(0.5 - vec3(dot(x0, x0), dot(x12.xy, x12.xy), dot(x12.zw, x12.zw)), 0.0);
  m = m * m;
  m = m * m;
  vec3 x = 2.0 * fract(p * C.www) - 1.0;
  vec3 h = abs(x) - 0.5;
  vec3 ox = floor(x + 0.5);
  vec3 a0 = x - ox;
  m *= 1.79284291400159 - 0.85373472095314 * (a0 * a0 + h * h);
  vec3 g;
  g.x = a0.x * x0.x + h.x * x0.y;
  g.yz = a0.yz * x12.xz + h.yz * x12.yw;
  return 130.0 * dot(m, g);
}

float fbm(vec2 x) {
  float v = 0.0;
  float a = 0.5;
  vec2 shift = vec2(100.0);
  mat2 rot = mat2(cos(0.5), sin(0.5), -sin(0.5), cos(0.50));
  for (int i = 0; i < 5; i++) {
    v += a * snoise(x);
    x = rot * x * 2.0 + shift;
    a *= 0.5;
  }
  return v;
}

float fluidWobble(vec2 uv, float t) {
  vec2 movement = vec2(fbm(uv * 0.5 + t * 0.1), fbm(uv * 0.5 + t * 0.13 + 2.0));
  return snoise(uv * 1.5 + movement + t * 0.05) * 0.5;
}

vec3 chromaticDistortion(vec2 uv, float amount) {
  return vec3(amount * 0.02, amount * 0.03, amount * 0.05);
}

float mouseInfluence(vec2 uv, vec2 mouse) {
  float dist = distance(uv, mouse);
  return smoothstep(0.5, 0.0, dist) * 0.3;
}

void main() {
  vec2 uv = v_uv;
  uv.x *= u_resolution.x / u_resolution.y;
  float t = u_time * 0.5;
  float wobble = fluidWobble(uv, t);
  float mouseDist = mouseInfluence(uv, vec2(u_mouse.x * u_resolution.x / u_resolution.y, u_mouse.y));
  wobble += mouseDist;
  vec3 distortion = chromaticDistortion(uv, wobble + mouseDist);
  float r = texture2D(u_texture, uv + vec2(wobble * 0.05 + distortion.r, wobble * 0.03)).r;
  float g = texture2D(u_texture, uv + vec2(wobble * 0.05 + distortion.g, wobble * 0.03 + 0.01)).g;
  float b = texture2D(u_texture, uv + vec2(wobble * 0.05 + distortion.b, wobble * 0.03 - 0.01)).b;
  vec4 texColor = vec4(r, g, b, 1.0);
  vec2 reflectUV = uv * 0.8 + vec2(wobble * 0.02);
  vec4 envColor = texture2D(u_envMap, reflectUV);
  float envMask = smoothstep(0.2, 0.8, wobble + 0.5);
  vec4 color = mix(texColor, envColor, envMask * 0.4);
  color.rgb = pow(color.rgb, vec3(1.5, 1.5, 2.0));
  gl_FragColor = color;
}
