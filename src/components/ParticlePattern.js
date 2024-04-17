import React, { useRef, useMemo, useEffect } from "react";
import * as THREE from "three";

const ParticlePattern = () => {
    const canvasRef = useRef(null);
    const cameraRef = useRef(null);
    const targetRef = useRef(null);
    const starsRef = useRef(null);
    const canvasSizeRef = useRef({ width: 0, height: 0 });

    const createCircleTextureParticle = () => {
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

    const particles = useMemo(() => {
        const starsGeometry = new THREE.BufferGeometry();
        const positions = [];
        const velocities = [];
        const originalPositions = [];
        const colors = [];
        const sizes = [];

        const totalStars = 20000;
        const spiralLoops = 5;
        const spiralRadius = 1000;
        const randomSpread = 100; // Increased random spread for initial positions

        for (let i = 0; i < totalStars; i++) {
            const theta = spiralLoops * Math.PI * Math.sqrt(i / totalStars);
            const phi = 4 * Math.PI * (i / totalStars);

            const x = spiralRadius * Math.sin(theta) * Math.cos(phi);
            const y = spiralRadius * Math.sin(theta) * Math.sin(phi);
            const z = spiralRadius * Math.cos(theta);

            const randomOffsetX = (Math.random() - 0.5) * randomSpread;
            const randomOffsetY = (Math.random() - 0.5) * randomSpread;
            const randomOffsetZ = (Math.random() - 0.5) * 12 * randomSpread;

            const initialVelocityX = (Math.random() - 0.5) * 0.1; // Initial random velocity
            const initialVelocityY = (Math.random() - 0.5) * 0.1;
            const initialVelocityZ = 0;

            positions.push(
                x + randomOffsetX,
                y + randomOffsetY,
                z + randomOffsetZ
            );
            velocities.push(
                initialVelocityX,
                initialVelocityY,
                initialVelocityZ
            );
            originalPositions.push(x, y, z); // Store original center position

            const color = new THREE.Color().lerpColors(
                new THREE.Color("#03ffff"),
                new THREE.Color("#5931b1"),
                1
            );
            const opacity = 0.5 * Math.random();
            colors.push(color.r, color.g, color.b, opacity);
            sizes.push(10 + Math.random() * 35);
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

        const circleTexture = createCircleTextureParticle();

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

    const moveParticles = () => {
        const positions = starsRef.current.geometry.attributes.position.array;
        const velocities = starsRef.current.geometry.attributes.velocity.array;
        const originalPositions =
            starsRef.current.geometry.attributes.originalPosition.array;

        for (let i = 0; i < positions.length; i += 3) {
            const randomStrength = 0.00025;

            const dx = originalPositions[i] - positions[i];
            const dy = originalPositions[i + 1] - positions[i + 1];

            if (Math.random() < 0.00005) {
                // 5% chance to update random velocities per frame
                for (let i = 0; i < velocities.length; i += 3) {
                    velocities[i] += (Math.random() - 0.5) * randomStrength;
                    velocities[i + 1] += (Math.random() - 0.5) * randomStrength;
                }
            }

            // Apply a gentle restoring force only if the distance is too great
            velocities[i] += dx * 0.00000025 * (Math.random() + 1);
            velocities[i + 1] += dy * 0.00000025 * (Math.random() + 1);
            positions[i] += velocities[i];
            positions[i + 1] += velocities[i + 1];
            positions[i + 2] += velocities[i + 2];
        }

        starsRef.current.geometry.attributes.position.needsUpdate = true;
        starsRef.current.geometry.attributes.velocity.needsUpdate = true;
    };

    const initParticles = () => {
        const scene = new THREE.Scene();
        const camera = new THREE.PerspectiveCamera(
            75,
            window.innerWidth / window.innerHeight,
            0.01,
            2000
        );
        cameraRef.current = camera;
        camera.position.z = 200;

        targetRef.current = new THREE.Vector3();

        const renderer = new THREE.WebGLRenderer({
            antialias: true,
            canvas: canvasRef.current,
            alpha: true,
        });
        renderer.setSize(window.innerWidth, window.innerHeight);

        canvasSizeRef.current = {
            width: window.innerWidth,
            height: window.innerHeight,
        };

        scene.add(particles);

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
        };

        const animate = () => {
            requestAnimationFrame(animate);
            // renderer.setSize(window.innerWidth, window.innerHeight);

            moveParticles();

            const camera = cameraRef.current;
            const target = targetRef.current;

            camera.position.x += (target.x - camera.position.x) * 0.01;
            camera.position.y += (target.y - camera.position.y) * 0.01;
            camera.lookAt(scene.position);

            renderer.render(scene, cameraRef.current);
            // composer.render();
        };

        window.addEventListener("mousemove", handleMouseMove);
        animate();
    };

    useEffect(() => {
        initParticles();
    }, []);

    return (
        <canvas
            ref={canvasRef}
            style={{
                position: "absolute",
                height: "100vh",
                maxWidth: "100%",
                zIndex: 6,
                filter: "blur(4px)",
            }}
        />
    );
};

export default ParticlePattern;
