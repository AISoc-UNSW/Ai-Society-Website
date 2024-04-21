import React, { useRef, useMemo, useEffect } from "react";
import * as THREE from "three";
import { EffectComposer } from "three/examples/jsm/postprocessing/EffectComposer.js";
import { RenderPass } from "three/examples/jsm/postprocessing/RenderPass.js";
import { UnrealBloomPass } from "three/examples/jsm/postprocessing/UnrealBloomPass.js";
import ParticlePattern from "./ParticlePattern";

const Stars = () => {
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
            const transparency = 0.1 * Math.random();
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
        const { width, height } = canvasSizeRef.current;
        const positions = starsRef.current.geometry.attributes.position.array;
        const velocities = starsRef.current.geometry.attributes.velocity.array;

        for (let i = 0; i < positions.length; i += 3) {
            positions[i] += velocities[i];
            positions[i + 1] += velocities[i + 1];
            positions[i + 2] += velocities[i + 2];

            velocities[i] += gravity.x;
            velocities[i + 1] += gravity.y;
            velocities[i + 2] += gravity.z;

            velocities[i] = Math.max(-0.01, Math.min(0.01, velocities[i]));
            velocities[i + 1] = Math.max(
                -0.01,
                Math.min(0.01, velocities[i + 1])
            );
            velocities[i + 2] = Math.max(
                -0.01,
                Math.min(0.01, velocities[i + 2])
            );

            if (positions[i] > width / 2) positions[i] -= width;
            else if (positions[i] < -width / 2) positions[i] += width;

            if (positions[i + 1] > height / 2) positions[i + 1] -= height;
            else if (positions[i + 1] < -height / 2) positions[i + 1] += height;
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
        cameraRef.current.aspect = window.innerWidth / window.innerHeight;
        cameraRef.current.updateProjectionMatrix();
        camera.position.z = 500;

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
        // Setup post-processing
        const composer = new EffectComposer(renderer);
        composer.addPass(new RenderPass(scene, cameraRef.current));

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

        // Recalculate star positions to maintain density
        const positions = starsRef.current.geometry.attributes.position.array;
        const newWidth = window.innerWidth;
        const newHeight = window.innerHeight;
        const aspectRatio = newWidth / newHeight;

        for (let i = 0; i < positions.length; i += 3) {
            positions[i] = (Math.random() * 2 - 1) * newWidth;
            positions[i + 1] =
                (Math.random() * 2 - 1) * newHeight * aspectRatio;
            // Adjust z position if needed, depending on your specific needs
        }

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

            // gravityRef.current.set(x * 0.001, y * 0.001, 0);
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
    };

    useEffect(() => {
        init();
        const handleResize = () => {
            init(); // Reinitialize on resize
        };

        window.addEventListener("resize", handleResize);

        return () => {
            window.removeEventListener("resize", handleResize);
        };
    }, []);

    return (
        <canvas
            ref={canvasRef}
            style={{
                position: "absolute",
                height: "100vh",
                maxWidth: "100%",
                zIndex: 2,
            }}
        />
    );
};

export default Stars;
