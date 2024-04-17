import React, { useRef, useMemo, useEffect } from "react";
import * as THREE from "three";
import { EffectComposer } from "three/examples/jsm/postprocessing/EffectComposer.js";
import { RenderPass } from "three/examples/jsm/postprocessing/RenderPass.js";
import { UnrealBloomPass } from "three/examples/jsm/postprocessing/UnrealBloomPass.js";
import { ShaderPass } from "three/examples/jsm/postprocessing/ShaderPass.js";
import { HorizontalBlurShader } from "three/examples/jsm/shaders/HorizontalBlurShader.js";
import { VerticalBlurShader } from "three/examples/jsm/shaders/VerticalBlurShader.js";

const ParticlePattern = () => {
    const canvasRef = useRef(null);
    const cameraRef = useRef(null);
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
        const originalPositions = [];
        const colors = [];
        const sizes = [];

        const totalStars = 10000;
        const spiralLoops = 5;
        const spiralRadius = 1000;
        const randomSpread = 150; // Increased random spread for initial positions

        for (let i = 0; i < totalStars; i++) {
            const theta = spiralLoops * Math.PI * Math.sqrt(i / totalStars);
            const phi = 4 * Math.PI * (i / totalStars);

            const randomOffsetX = (Math.random() - 0.5) * randomSpread;
            const randomOffsetY = (Math.random() - 0.5) * randomSpread;
            const randomOffsetZ = (Math.random() - 0.5) * randomSpread;

            const x =
                spiralRadius * Math.sin(theta) * Math.cos(phi) + randomOffsetX;
            const y =
                spiralRadius * Math.sin(theta) * Math.sin(phi) + randomOffsetY;
            const z = spiralRadius * Math.cos(theta) + randomOffsetZ;

            positions.push(x, y, z);
            originalPositions.push(x, y, z); // Store slightly randomized original position
            velocities.push(Math.random(), Math.random(), Math.random()); // Start with no initial velocity

            const color = new THREE.Color().lerpColors(
                new THREE.Color("#0096FF"),
                new THREE.Color("#b441fb"),
                Math.random()
            );
            const opacity = 0.3 + Math.random() * 0.5;
            colors.push(color.r, color.g, color.b, opacity);
            sizes.push(10 + Math.random() * 15);
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
            "originalPosition",
            new THREE.Float32BufferAttribute(originalPositions, 3)
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
            size: 10,
            vertexColors: true,
            map: circleTexture,
            alphaTest: 0.1,
            depthWrite: false,
            transparent: true,
            sizeAttenuation: true,
        });

        const stars = new THREE.Points(starsGeometry, starsMaterial);
        starsRef.current = stars;
        return stars;
    }, []);

    const move = () => {
        const positions = starsRef.current.geometry.attributes.position.array;
        const velocities = starsRef.current.geometry.attributes.velocity.array;
        const originalPositions =
            starsRef.current.geometry.attributes.originalPosition.array;

        const restoringForce = 0.001 / 1000; // Gentle restoring force
        const randomStrength = 1; // Lower random strength for smoother effect
        const damping = 0.1; // Lower damping to sustain movement longer

        // Update random velocity less frequently
        if (Math.random() < 0.005) {
            // 5% chance to update random velocities per frame
            for (let i = 0; i < velocities.length; i += 3) {
                velocities[i] += (Math.random() - 0.5) * randomStrength;
                velocities[i + 1] += (Math.random() - 0.5) * randomStrength;
                velocities[i + 2] += (Math.random() - 0.5) * randomStrength;
            }
        }

        for (let i = 0; i < positions.length; i += 3) {
            const dx = originalPositions[i] - positions[i] / 1000;
            const dy = originalPositions[i + 1] - positions[i + 1] / 1000;
            const dz = originalPositions[i + 2] - positions[i + 2] / 1000;

            velocities[i] += restoringForce * dx - damping * velocities[i];
            velocities[i + 1] +=
                restoringForce * dy - damping * velocities[i + 1];
            velocities[i + 2] +=
                restoringForce * dz - damping * velocities[i + 2];

            positions[i] += velocities[i];
            positions[i + 1] += velocities[i + 1];
            positions[i + 2] += velocities[i + 2];
        }

        starsRef.current.geometry.attributes.position.needsUpdate = true;
        starsRef.current.geometry.attributes.velocity.needsUpdate = true;
    };
    const init = () => {
        const scene = new THREE.Scene();
        const camera = new THREE.PerspectiveCamera(
            75,
            window.innerWidth / window.innerHeight,
            0.01,
            2000
        );
        cameraRef.current = camera;
        camera.position.z = 50;

        targetRef.current = new THREE.Vector3();

        const renderer = new THREE.WebGLRenderer({
            antialias: true,
            canvas: canvasRef.current,
        });
        renderer.setSize(window.innerWidth, window.innerHeight);

        canvasSizeRef.current = {
            width: window.innerWidth,
            height: window.innerHeight,
        };
        // Setup post-processing
        const composer = new EffectComposer(renderer);
        composer.addPass(new RenderPass(scene, cameraRef.current));

        // Add horizontal blur pass
        const horizontalBlurPass = new ShaderPass(HorizontalBlurShader);
        composer.addPass(horizontalBlurPass);

        // Add vertical blur pass
        const verticalBlurPass = new ShaderPass(VerticalBlurShader);
        composer.addPass(verticalBlurPass);

        const bloomPass = new UnrealBloomPass(
            new THREE.Vector2(window.innerWidth, window.innerHeight),
            1.5,
            0.4,
            0.85
        );
        bloomPass.threshold = 0.21;
        bloomPass.strength = 1.0; // Adjust the strength of the glow
        bloomPass.radius = 0.55;
        composer.addPass(bloomPass);

        scene.add(stars);

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
            // renderer.setSize(window.innerWidth, window.innerHeight);

            move();

            const camera = cameraRef.current;
            const target = targetRef.current;

            camera.position.x += (target.x - camera.position.x) * 0.1;
            camera.position.y += (target.y - camera.position.y) * 0.1;
            camera.lookAt(scene.position);

            renderer.render(scene, cameraRef.current);
            // composer.render();
        };

        window.addEventListener("mousemove", handleMouseMove);
        animate();
    };

    useEffect(() => {
        init();
    }, []);

    return (
        <canvas
            ref={canvasRef}
            style={{ position: "absolute", height: "100vh", maxWidth: "100%" }}
        />
    );
};

export default ParticlePattern;
