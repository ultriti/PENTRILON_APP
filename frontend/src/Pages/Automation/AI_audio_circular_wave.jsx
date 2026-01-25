import React, { useRef, useEffect, useCallback, useState } from 'react';
import "./Ai_audio_circular_wave.css"

const AudioRingVisualizer = ({ isSpeaking, className = "" }) => {
    const canvasRef = useRef(null);
    const rafRef = useRef(null);
    const contextRef = useRef(null);
    const analyserRef = useRef(null);
    const dataArrayRef = useRef(null);

    // Resize canvas responsively
    useEffect(() => {
        const resizeCanvas = () => {
            if (canvasRef.current) {
                const canvas = canvasRef.current;
                const size = Math.min(window.innerWidth, window.innerHeight) * 0.12;
                canvas.width = size;
                canvas.height = size;
            }
        };

        resizeCanvas();
        window.addEventListener('resize', resizeCanvas);
        return () => window.removeEventListener('resize', resizeCanvas);
    }, []);

    const updateAndDraw = useCallback(() => {
        const canvas = canvasRef.current;
        if (!canvas || !isSpeaking) return;

        const ctx = canvas.getContext('2d');
        const centerX = canvas.width / 2;
        const centerY = canvas.height / 2;
        const maxSize = Math.min(canvas.width, canvas.height) * 0.42;

        // Pure black fade
        ctx.fillStyle = 'rgba(0, 5, 15, 0.2)';
        ctx.fillRect(0, 0, canvas.width, canvas.height);

        const time = Date.now() * 0.002;

        // INNER WAVE-CREATING RINGS (3 LARGER rings that expand/contract)
        for (let ring = 0; ring < 3; ring++) {
            ctx.save();

            // Slight rotation for organic movement
            const rotationOffset = time * (0.3 + ring * 0.2);
            ctx.translate(centerX, centerY);
            ctx.rotate(rotationOffset);
            ctx.translate(-centerX, -centerY);

            // **LARGE INNER RINGS** - CHANGED THIS LINE ONLY:
            const baseRadius = maxSize * (0.38 + ring * 0.08); // 👈 WAS 0.25, NOW 0.38
            const wavePhase = (time * 1.5 + ring * 2) % (Math.PI * 2);
            const expand = Math.sin(wavePhase) * 0.12;
            const radius = baseRadius + expand * maxSize * 0.15;

            ctx.beginPath();
            const points = 110;
            for (let i = 0; i <= points; i++) {
                const angle = (i / points) * Math.PI * 2;

                const wave1 = Math.sin(angle * 5 + time * 2 + ring) * 0.025;
                const wave2 = Math.sin(angle * 8 + time * 3.5 - ring) * 0.015;

                const finalRadius = radius + wave1 + wave2;
                const x = centerX + Math.cos(angle) * finalRadius;
                const y = centerY + Math.sin(angle) * finalRadius;

                if (i === 0) ctx.moveTo(x, y);
                else ctx.lineTo(x, y);
            }
            ctx.closePath();

            const opacity = Math.max(0.3, 0.9 - Math.abs(expand) * 2);

            const innerGradient = ctx.createLinearGradient(
                centerX - maxSize * 0.4, centerY,
                centerX + maxSize * 0.4, centerY
            );
            innerGradient.addColorStop(0, `rgba(0, 255, 200, ${opacity * 0.7})`);
            innerGradient.addColorStop(0.5, `rgba(0, 220, 255, ${opacity})`);
            innerGradient.addColorStop(1, `rgba(0, 180, 220, ${opacity * 0.5})`);

            ctx.strokeStyle = innerGradient;
            ctx.lineWidth = maxSize * (0.02 + ring * 0.005);
            ctx.lineJoin = 'round';
            ctx.lineCap = 'round';
            ctx.shadowBlur = 8 + ring * 3;
            ctx.shadowColor = `rgba(0, 255, 200, ${opacity * 0.6})`;
            ctx.stroke();

            ctx.restore();
        }

        // PULSING CENTER DOT
        const pulse = (Math.sin(time * 3) + 1) * 0.5;
        const dotSize = maxSize * (0.04 + pulse * 0.04);

        const dotGradient = ctx.createRadialGradient(
            centerX, centerY, 0,
            centerX, centerY, dotSize * 2
        );
        dotGradient.addColorStop(0, `rgba(0, 255, 200, ${0.9 + pulse * 0.2})`);
        dotGradient.addColorStop(0.7, `rgba(0, 220, 255, ${0.6 + pulse * 0.3})`);
        dotGradient.addColorStop(1, 'rgba(0, 0, 0, 0)');

        ctx.shadowBlur = 12 + pulse * 8;
        ctx.shadowColor = 'rgba(0, 255, 200, 0.7)';
        ctx.fillStyle = dotGradient;
        ctx.beginPath();
        ctx.arc(centerX, centerY, dotSize, 0, Math.PI * 2);
        ctx.fill();

        rafRef.current = requestAnimationFrame(updateAndDraw);
    }, [isSpeaking]);





    // Handle speaking state changes
    useEffect(() => {
        if (isSpeaking) {
            // Start canvas animation
            rafRef.current = requestAnimationFrame(updateAndDraw);
        } else {
            // Stop animation
            if (rafRef.current) {
                cancelAnimationFrame(rafRef.current);
            }
            // Clear canvas on stop
            if (canvasRef.current) {
                const ctx = canvasRef.current.getContext('2d');
                ctx.clearRect(0, 0, canvasRef.current.width, canvasRef.current.height);
            }
        }
    }, [isSpeaking, updateAndDraw]);

    // Cleanup on unmount
    useEffect(() => {
        return () => {
            if (rafRef.current) {
                cancelAnimationFrame(rafRef.current);
            }
        };
    }, []);

    return (
        <div
            className={`audio-visualizer ${isSpeaking ? 'speaking' : ''} ${className}`}
            style={{
                position: 'relative',
                width: '7vw',
                height: '7vw',
                maxWidth: '150px',
                maxHeight: '150px',
                margin: '0 auto',
            }}
        >
            {/* Pulse rings */}
            <div className="pulse-ring"></div>
            <div className="pulse-ring delay"></div>

            <canvas
                ref={canvasRef}
                style={{
                    width: '100%',
                    height: '100%',
                    borderRadius: '50%',
                    display: 'block',
                }}
            />
        </div>
    );
};

export default AudioRingVisualizer;

