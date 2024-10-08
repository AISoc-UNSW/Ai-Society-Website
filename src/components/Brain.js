import { Canvas, useFrame } from "@react-three/fiber";
import { OrbitControls, shaderMaterial } from "@react-three/drei";
import { data } from "../util/data";
import { extend } from "@react-three/fiber";
import * as THREE from "three";
import { useMemo, useRef, useEffect } from "react";
import { Tubes } from "./BrainTubes";
import { Box, Typography, useTheme, useMediaQuery } from "@mui/material";

const PATHS = data.paths;

const randomRange = (min, max) => Math.random() * (max - min) + min;

let brainCurves = [];

PATHS.forEach((path) => {
  let points = [];
  for (let i = 0; i < path.length; i += 3) {
    points.push(new THREE.Vector3(path[i], path[i + 1], path[i + 2]));
  }
  let tempcurve = new THREE.CatmullRomCurve3(points);
  brainCurves.push(tempcurve);
});

function BrainParticles({ allTheCurves }) {
  let density = 10;
  let numberOfPoints = density * allTheCurves.length;
  const myPoints = useRef([]);
  const brainGeo = useRef();

  let positions = useMemo(() => {
    let positions = [];
    for (let i = 0; i < numberOfPoints; i++) {
      positions.push(
        randomRange(-1, 1),
        randomRange(-1, 1),
        randomRange(-1, 1)
      );
    }
    return new Float32Array(positions);
  }, [numberOfPoints]);

  let randoms = useMemo(() => {
    let randoms = [];
    for (let i = 0; i < numberOfPoints; i++) {
      randoms.push(randomRange(0.3, 1));
    }
    return new Float32Array(randoms);
  }, [numberOfPoints]);

  useEffect(() => {
    for (let i = 0; i < allTheCurves.length; i++) {
      for (let j = 0; j < density; j++) {
        myPoints.current.push({
          currentOffset: Math.random(),
          speed: Math.random() * 0.001,
          curve: allTheCurves[i],
          curPosition: Math.random(),
        });
      }
    }
  });

  useFrame(({ clock }) => {
    let curPositions = brainGeo.current.attributes.position.array;
    for (let i = 0; i < myPoints.current.length; i++) {
      myPoints.current[i].curPosition += myPoints.current[i].speed;
      myPoints.current[i].curPosition = myPoints.current[i].curPosition % 1;

      let curPoint = myPoints.current[i].curve.getPointAt(
        myPoints.current[i].curPosition
      );

      curPositions[i * 3] = curPoint.x;
      curPositions[i * 3 + 1] = curPoint.y;
      curPositions[i * 3 + 2] = curPoint.z;
    }
    brainGeo.current.attributes.position.needsUpdate = true;
  });

  const BrainParticleMaterial = shaderMaterial(
    { time: 0, color: new THREE.Color(0.1, 0.3, 0.6) },
    // vertex shader
    /*glsl*/ `
          varying vec2 vUv;
          uniform float time;
          varying float vProgress;
          attribute float randoms;
          void main() {
            vUv = uv;
            gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
            vec4 mvPosition = modelViewMatrix * vec4(position, 1.0);
            gl_PointSize = randoms*2. * (1. / -mvPosition.z);
            // gl_PointSize = mvPosition.z;
            // console.log(mvPosition);
          }
        `,
    // fragment shader
    /*glsl*/ `
          uniform float time;
          void main() {
            float disc = length(gl_PointCoord.xy - vec2(0.5));
            float opacity = 0.3*smoothstep(0.5,0.4,disc);
            gl_FragColor = vec4(vec3(opacity),1.);
          }
        `
  );

  // declaratively
  extend({ BrainParticleMaterial });
  return (
    <>
      <points>
        <bufferGeometry attach="geometry" ref={brainGeo}>
          <bufferAttribute
            attach="attributes-position"
            count={positions.length / 3}
            array={positions}
            itemSize={3}
          />
          <bufferAttribute
            attach="attributes-randoms"
            count={randoms.length}
            array={randoms}
            itemSize={1}
          />
        </bufferGeometry>
        <brainParticleMaterial
          attach="material"
          depthTest={false}
          transparent={true}
          depthWrite={false}
          blending={THREE.AdditiveBlending}
        />
      </points>
    </>
  );
}

const Brain = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("lg"));
  return (
    <>
      <Box
        sx={{
          display: "flex",
          flexDirection: isMobile ? "column" : "row",
          position: "relative",
          height: "100vh",
          //   backgroundColor: "black",
          alignItems: "center",
          justifyContent: "center",
          scrollSnapAlign: "start",
        }}
      >
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            alignContent: "center",
            maxWidth: isMobile ? "100%" : "40%",
            maxHeight: "100%",
            padding: isMobile ? "20px" : "5%",
            paddingLeft: isMobile ? "5%" : "10%",
            marginTop: isMobile ? "15%" : 0,
            textAlign: isMobile ? "center" : "left", // Center text on mobile
          }}
        >
          <Typography
            sx={{
              color: "white",
              fontSize: isMobile ? "2rem" : "5.5vh", // Smaller text on mobile
              fontWeight: "300",
              zIndex: 3,
              userSelect: "none",
              fontFamily: "Ubuntu Sans",
            }}
          >
            Artificial Intelligence Society
          </Typography>
          <Typography
            style={{
              color: "white",
              zIndex: 3,
              opacity: "0.8",
              userSelect: "none",
              fontFamily: "Ubuntu Sans",
            }}
          >
            We are the foremost advocate for AI enthusiasts at UNSW, nurturing a
            dedicated community of passionate individuals eager to explore the
            frontiers of artificial intelligence.
          </Typography>
        </Box>

        <Canvas
          style={{
            width: isMobile ? "100%" : "auto",
            height: isMobile ? "50%" : "100%", // Adjust height on mobile
            minWidth: isMobile ? "100%" : "60%",
            zIndex: 3,
          }}
          camera={{ position: [0, 0, 0.3], near: 0.001, far: 5 }}
          gl={{ alpha: true }}
        >
          <ambientLight />
          <pointLight position={[10, 10, 10]} />
          <Tubes allTheCurve={brainCurves} />
          <BrainParticles allTheCurves={brainCurves} />
          <OrbitControls enableZoom={false} enablePan={false} />
        </Canvas>
      </Box>
    </>
  );
};

export default Brain;
