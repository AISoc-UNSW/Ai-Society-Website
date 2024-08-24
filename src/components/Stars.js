import React, { useRef, useMemo, useEffect } from "react";
import * as THREE from "three";
import { EffectComposer } from "three/examples/jsm/postprocessing/EffectComposer.js";
import { RenderPass } from "three/examples/jsm/postprocessing/RenderPass.js";
import { UnrealBloomPass } from "three/examples/jsm/postprocessing/UnrealBloomPass.js";

const Stars = () => {
  const canvasRef = useRef(null);
  const cameraRef = useRef(null);
  const rendererRef = useRef(null);
  const composerRef = useRef(null);
  const targetRef = useRef(null);
  const starsRef = useRef(null);
  const gravityRef = useRef(new THREE.Vector3());
  const canvasSizeRef = useRef({ width: 0, height: 0 });

  const createCircleTexture = () => {
    const size = 128;
    const canvas = document.createElement("canvas");
    canvas.width = size;
    canvas.height = size;
    const context = canvas.getContext("2d");
    const center = size / 2;
    const radius = size / 2;

    context.beginPath();
    context.arc(center, center, radius, 0, 2 * Math.PI, false);
    context.fillStyle = "white";
    context.fill();

    return new THREE.CanvasTexture(canvas);
  };

  const stars = useMemo(() => {
    const starsGeometry = new THREE.BufferGeometry();
    const positions = [];
    const velocities = [];
    const colors = [];
    const sizes = [];

    const numStars = 2000;

    for (let i = 0; i < numStars; i++) {
      const x = (Math.random() * 2 - 1) * 2000;
      const y = (Math.random() * 2 - 1) * 2000;
      const z = -Math.random() * 300 + 450;
      positions.push(x, y, z);
      velocities.push(
        (Math.random() * 2 - 1) * 0.1,
        (Math.random() * 2 - 1) * 0.1,
        0
      );

      const color = new THREE.Color().lerpColors(
        new THREE.Color("#0096FF"),
        new THREE.Color("#b441fb"),
        Math.random()
      );
      const transparency = 0.4 * Math.random();
      colors.push(color.r, color.g, color.b, transparency);
      sizes.push(5); // Size of each star
    }

    starsGeometry.setAttribute(
      "position",
      new THREE.Float32BufferAttribute(positions, 3)
    );
    starsGeometry.setAttribute(
      "velocity",
      new THREE.Float32BufferAttribute(velocities, 3)
    );
    starsGeometry.setAttribute(
      "color",
      new THREE.Float32BufferAttribute(colors, 4)
    );
    starsGeometry.setAttribute(
      "size",
      new THREE.Float32BufferAttribute(sizes, 1)
    );

    const circleTexture = createCircleTexture();

    const starsMaterial = new THREE.PointsMaterial({
      size: 5,
      vertexColors: true,
      map: circleTexture,
      alphaTest: 0,
      depthWrite: false,
      transparent: true,
    });

    const stars = new THREE.Points(starsGeometry, starsMaterial);
    starsRef.current = stars;
    return stars;
  }, []);

  const move = () => {
    const gravity = gravityRef.current;
    const positions = starsRef.current.geometry.attributes.position.array;
    const velocities = starsRef.current.geometry.attributes.velocity.array;

    for (let i = 0; i < positions.length; i += 3) {
      let vx = velocities[i];
      let vy = velocities[i + 1];
      let vz = velocities[i + 2];

      positions[i] += vx;
      positions[i + 1] += vy;
      positions[i + 2] += vz;

      vx += gravity.x;
      vy += gravity.y;
      vz += gravity.z;

      vx = Math.max(-0.01, Math.min(0.01, vx));
      vy = Math.max(-0.01, Math.min(0.01, vy));
      vz = Math.max(-0.01, Math.min(0.01, vz));

      velocities[i] = vx;
      velocities[i + 1] = vy;
      velocities[i + 2] = vz;
    }

    starsRef.current.geometry.attributes.position.needsUpdate = true;
    starsRef.current.geometry.attributes.velocity.needsUpdate = true;
  };

  const resize = () => {
    const camera = cameraRef.current;
    const renderer = rendererRef.current;
    const composer = composerRef.current;

    // Update camera aspect ratio and renderer size
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
    composer.setSize(window.innerWidth, window.innerHeight);

    // canvasSizeRef.current = {
    //     width: window.innerWidth,
    //     height: window.innerHeight,
    // };
  };

  useEffect(() => {
    const init = () => {
      const scene = new THREE.Scene();
      const camera = new THREE.PerspectiveCamera(
        75,
        window.innerWidth / window.innerHeight,
        0.01,
        2000
      );
      cameraRef.current = camera;
      // cameraRef.current.aspect = window.innerWidth / window.innerHeight;
      // cameraRef.current.updateProjectionMatrix();
      camera.position.z = 500;

      targetRef.current = new THREE.Vector3();

      const renderer = new THREE.WebGLRenderer({
        antialias: true,
        canvas: canvasRef.current,
        alpha: true,
        powerPreference: "low-power",
        precision: "lowp",
      });
      renderer.setSize(window.innerWidth, window.innerHeight);

      canvasSizeRef.current = {
        width: window.innerWidth,
        height: window.innerHeight,
      };
      // Setup post-processing
      const composer = new EffectComposer(renderer);
      composer.addPass(new RenderPass(scene, cameraRef.current));

      scene.add(stars);

      starsRef.current.geometry.attributes.position.needsUpdate = true;

      const handleMouseMove = (event) => {
        const { clientX, clientY } = event;
        const aspectRatio = window.innerWidth / window.innerHeight;
        const x = (clientX / window.innerWidth) * 2 - 1;
        const y = -(clientY / window.innerHeight) * 2 + 1;

        targetRef.current.set(
          x * Math.PI,
          y * Math.PI * aspectRatio,
          camera.position.z
        );

        gravityRef.current.set(x * 0.001, y * 0.001, 0);
      };

      const animate = () => {
        requestAnimationFrame(animate);
        renderer.setSize(window.innerWidth, window.innerHeight);

        const camera = cameraRef.current;
        const target = targetRef.current;

        camera.position.x += (target.x - camera.position.x) * 0.1;
        camera.position.y += (target.y - camera.position.y) * 0.1;
        camera.lookAt(scene.position);

        move();

        renderer.render(scene, cameraRef.current);
        composer.render();
      };

      window.addEventListener("mousemove", handleMouseMove);
      animate();
      rendererRef.current = renderer;
      composerRef.current = composer;
    };
    init();
    const handleResize = () => {
      resize();
    };

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, [stars]);

  return (
    <canvas
      ref={canvasRef}
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        width: "100%",
        height: "100vh",
        zIndex: -1,
      }}
    />
  );
};

export default Stars;
