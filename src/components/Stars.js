import React, { useRef, useMemo, useEffect } from "react";
import * as THREE from "three";
// import { EffectComposer } from "three/examples/jsm/postprocessing/EffectComposer.js";
// import { RenderPass } from "three/examples/jsm/postprocessing/RenderPass.js";
// import { UnrealBloomPass } from "three/examples/jsm/postprocessing/UnrealBloomPass.js";

const Stars = () => {
    const canvasRef = useRef(null);
    const cameraRef = useRef(null);
    const targetRef = useRef(null);
    const starsRef = useRef([]);
    const gravityRef = useRef(new THREE.Vector3());
    const canvasSizeRef = useRef({ width: 0, height: 0 });

    const stars = useMemo(() => {
        const stars = [];
        const geometry = new THREE.SphereGeometry(1, 8, 8);

        // THE CPU KILLER
        for (let i = 0; i < 10000; i++) {
            const x = (Math.random() * 2 - 1) * 2000;
            const y = (Math.random() * 2 - 1) * 2000;
            const z = (Math.random() * 2 - 1) * 2000;

            const transparency = Math.random() * 0.5 + 0.3;

            // Generate a random color between #b441fb and 0x55a5fa
            const colorStart = new THREE.Color("#b441fb");
            const colorEnd = new THREE.Color(0x55a5fa);
            const colorRatio = Math.random();
            const color = new THREE.Color().lerpColors(
                colorStart,
                colorEnd,
                colorRatio
            );

            const material = new THREE.MeshBasicMaterial({
                color: color,
                transparent: true,
            });
            material.opacity = transparency;

            const star = new THREE.Mesh(geometry, material);
            star.position.set(x, y, z);

            const vx = (Math.random() * 2 - 1) * 0.1;
            const vy = (Math.random() * 2 - 1) * 0.1;
            const vz = (Math.random() * 2 - 1) * 0.1;
            star.velocity = new THREE.Vector3(vx, vy, vz);

            stars.push(star);
        }

        starsRef.current = stars;
        return stars;
    }, []);

    const move = () => {
        const gravity = gravityRef.current;
        const { width, height } = canvasSizeRef.current;

        starsRef.current.forEach((star) => {
            star.position.add(star.velocity);
            star.velocity.add(gravity);

            // Cap velocity between -5 and 5
            star.velocity.x = Math.max(-0.25, Math.min(0.25, star.velocity.x));
            star.velocity.y = Math.max(-0.25, Math.min(0.25, star.velocity.y));
            star.velocity.z = Math.max(-0.25, Math.min(0.25, star.velocity.z));

            // Loop stars back to the other end of the canvas
            if (star.position.x > width / 2) star.position.x -= width;
            else if (star.position.x < -width / 2) star.position.x += width;

            if (star.position.y > height / 2) star.position.y -= height;
            else if (star.position.y < -height / 2) star.position.y += height;
        });
    };

    const init = () => {
        const scene = new THREE.Scene();
        const camera = new THREE.PerspectiveCamera(
            75,
            window.innerWidth / window.innerHeight,
            0.001,
            2000
        );
        cameraRef.current = camera;
        camera.position.z = 500;

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
        // const composer = new EffectComposer(renderer);
        // composer.addPass(new RenderPass(scene, cameraRef.current));

        // const bloomPass = new UnrealBloomPass(
        //     new THREE.Vector2(window.innerWidth, window.innerHeight),
        //     1.5,
        //     0.4,
        //     0.85
        // );
        // bloomPass.threshold = 0.21;
        // bloomPass.strength = 1.5; // Adjust the strength of the glow
        // bloomPass.radius = 0.55;
        // composer.addPass(bloomPass);

        stars.forEach((star) => {
            scene.add(star);
        });

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

export default Stars;
