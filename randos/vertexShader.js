const webgl = {}

webgl.vertexShaderSource = `
	attribute vec3 a_position;
	uniform int u_mode;
	uniform float u_tick;
	uniform vec2 u_resolution;
	varying vec3 v_data;

	void main(){
		vec2 pos = a_position.x * vec2(cos(a_position.y), sin(a_position.y));

		vec2 p2 = u_mode == 1 ? pos : a_position.xy;

		gl_Position = vec4(
			vec2(1, -1) * (p2 / u_resolution) * 2.0,
			0,
			1
		);

		v_data = vec3(0, a_position.z + u_tick, u_mode );

		if (u_mode == 1) {
			v_data.x = a_position.y;
		}
	}
`;


webgl.fragmentShaderSource = `
	precision mediump float;
	varying vec3 v_data;

	vec3 h2rgb(float h){
		return clamp(
			abs(
				mod(
					h * 6.0 + vec3(4, 2, 0),
					6.0
				) - 3.0
			) - 1.0,
			0.0,
			1.0
		);
	}

	void main(){
		vec4 color = vec4(0, 0, 0, mod(v_data.y, 1.0));

		if (v_data.z == 1.0) {
			float h = v_data.x / 6.28 + floor(v_data.y) / 1000.0;
			color.rgb = h2rgb(h);
		}

		gl_FragColor = color;
	}
`;
