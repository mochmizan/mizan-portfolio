import { useEffect, useRef } from 'react';

interface RetroGlobeProps {
  size?: number;
  interactive?: boolean;
}

export function RetroGlobe({ size = 400, interactive = true }: RetroGlobeProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const stateRef = useRef({
    hoverX: 0, hoverY: 0,
    targetHoverX: 0, targetHoverY: 0,
    isDragging: false,
    dragLastX: 0, dragLastY: 0,
    dragAngleX: 0, dragAngleY: 0,
    momentumX: 0, momentumY: 0,
  });

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId: number;
    let time = 0;

    const bayer4x4 = [
      [ 0.0, 0.5, 0.125, 0.625],
      [ 0.75, 0.25, 0.875, 0.375],
      [ 0.1875, 0.6875, 0.0625, 0.5625],
      [ 0.9375, 0.4375, 0.8125, 0.3125]
    ];

    const colors = {
      highlight: '#90d596',
      body: '#588a5e',
      shadow: '#2a462d',
      faint: '#203522',
      phosphor: '#1c301e',
      bg: '#1f3320'
    };

    const lx = 1.0 / Math.sqrt(3);
    const ly = 1.2 / Math.sqrt(3);
    const lz = 1.0 / Math.sqrt(3);

    if (interactive) canvas.style.cursor = 'grab';

    const handleMouseMove = (e: MouseEvent) => {
      if (!interactive) return;
      const rect = canvas.getBoundingClientRect();
      const s = stateRef.current;

      if (s.isDragging) {
        const dx = (e.clientX - s.dragLastX) / rect.width;
        const dy = (e.clientY - s.dragLastY) / rect.height;
        const scaledDx = dx * 5;
        const scaledDy = dy * 5;
        s.dragAngleY += scaledDx;
        s.dragAngleX += scaledDy;
        s.momentumY = scaledDx * 0.4;
        s.momentumX = scaledDy * 0.4;
        s.dragLastX = e.clientX;
        s.dragLastY = e.clientY;
      } else {
        const cx = rect.left + rect.width / 2;
        const cy = rect.top + rect.height / 2;
        s.targetHoverX = (e.clientX - cx) / (rect.width / 2);
        s.targetHoverY = (e.clientY - cy) / (rect.height / 2);
      }
    };

    const handleMouseDown = (e: MouseEvent) => {
      if (!interactive) return;
      const s = stateRef.current;
      s.isDragging = true;
      s.dragLastX = e.clientX;
      s.dragLastY = e.clientY;
      s.momentumX = 0;
      s.momentumY = 0;
      canvas.style.cursor = 'grabbing';
    };

    const handleMouseUp = () => {
      if (!interactive) return;
      stateRef.current.isDragging = false;
      canvas.style.cursor = 'grab';
    };

    const handleMouseLeave = () => {
      if (!interactive) return;
      const s = stateRef.current;
      s.isDragging = false;
      s.targetHoverX = 0;
      s.targetHoverY = 0;
      canvas.style.cursor = 'grab';
    };

    canvas.addEventListener('mousemove', handleMouseMove);
    canvas.addEventListener('mousedown', handleMouseDown);
    canvas.addEventListener('mouseup', handleMouseUp);
    canvas.addEventListener('mouseleave', handleMouseLeave);

    const render = () => {
      time += 0.015;
      const s = stateRef.current;

      s.hoverX += (s.targetHoverX - s.hoverX) * 0.05;
      s.hoverY += (s.targetHoverY - s.hoverY) * 0.05;

      if (!s.isDragging) {
        s.dragAngleY += s.momentumY;
        s.dragAngleX += s.momentumX;
        s.momentumX *= 0.94;
        s.momentumY *= 0.94;
      }

      ctx.fillStyle = colors.bg;
      ctx.fillRect(0, 0, size, size);

      const cellSize = 5;
      const gridWidth = Math.floor(size / cellSize);
      const gridHeight = Math.floor(size / cellSize);

      const ry = time * 0.35 + s.dragAngleY + s.hoverX * 0.4;
      const rx = s.dragAngleX + s.hoverY * 0.3;

      const cosRy = Math.cos(ry);
      const sinRy = Math.sin(ry);
      const cosRx = Math.cos(rx);
      const sinRx = Math.sin(rx);

      for (let row = 0; row < gridHeight; row++) {
        for (let col = 0; col < gridWidth; col++) {
          const x = (col - gridWidth / 2) / (gridWidth / 2.3);
          const y = (row - gridHeight / 2) / (gridHeight / 2.3);
          const distSq = x * x + y * y;

          const z0 = Math.sqrt(Math.max(0, 1.0 - distSq));

          const xRot1 = x * cosRy - z0 * sinRy;
          const zRot1 = x * sinRy + z0 * cosRy;
          const yRot2 = y * cosRx - zRot1 * sinRx;
          const zRot2 = y * sinRx + zRot1 * cosRx;

          const deform =
            Math.sin(xRot1 * 3.0) * Math.cos(yRot2 * 3.0) * Math.sin(zRot2 * 3.0) * 0.15 +
            Math.sin(xRot1 * 7.0 + time * 1.5) * Math.cos(yRot2 * 7.0) * Math.sin(zRot2 * 7.0) * 0.05;

          const R = 1.0 + deform;
          const R2 = R * R;

          const drawX = col * cellSize;
          const drawY = row * cellSize;

          if (distSq <= R2) {
            const z = Math.sqrt(Math.max(0, R2 - distSq));

            const nx = x / R;
            const ny = y / R;
            const nz = z / R;

            const nxRot1 = nx * cosRy - nz * sinRy;
            const nzRot1 = nx * sinRy + nz * cosRy;
            const nyRot2 = ny * cosRx - nzRot1 * sinRx;
            const nzRot2 = ny * sinRx + nzRot1 * cosRx;

            const diffuse = nxRot1 * lx + nyRot2 * ly + nzRot2 * lz;
            const bump = Math.sin(nxRot1 * 12.0) * Math.cos(nyRot2 * 12.0) * Math.sin(nzRot2 * 12.0) * 0.12;
            const intensity = Math.min(1.0, Math.max(0.0, diffuse * 0.65 + bump + 0.45));

            const bayerVal = bayer4x4[row % 4][col % 4];

            if (intensity > bayerVal) {
              if (intensity > 0.78) {
                ctx.fillStyle = colors.highlight;
              } else if (intensity > 0.45) {
                ctx.fillStyle = colors.body;
              } else if (intensity > 0.25) {
                ctx.fillStyle = colors.shadow;
              } else {
                ctx.fillStyle = colors.faint;
              }
              ctx.fillRect(drawX + 0.5, drawY + 0.5, cellSize - 1, cellSize - 1);
            } else {
              ctx.fillStyle = colors.phosphor;
              ctx.fillRect(drawX + 2, drawY + 2, 1, 1);
            }
          } else {
            ctx.fillStyle = colors.bg;
            ctx.fillRect(drawX + 2, drawY + 2, 1, 1);
          }
        }
      }

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      canvas.removeEventListener('mousemove', handleMouseMove);
      canvas.removeEventListener('mousedown', handleMouseDown);
      canvas.removeEventListener('mouseup', handleMouseUp);
      canvas.removeEventListener('mouseleave', handleMouseLeave);
      cancelAnimationFrame(animationFrameId);
    };
  }, [size, interactive]);

  return (
    <div className="relative flex items-center justify-center rounded-full overflow-hidden" style={{ width: size, height: size }}>
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: 'repeating-linear-gradient(rgba(18, 16, 16, 0) 0px, rgba(18, 16, 16, 0) 2px, rgba(0, 0, 0, 0.2) 3px, rgba(0, 0, 0, 0.2) 4px)',
          mixBlendMode: 'overlay'
        }}
      />
      <canvas
        ref={canvasRef}
        width={size}
        height={size}
        className="block"
        style={{
          imageRendering: 'pixelated',
          borderRadius: '50%'
        }}
      />
    </div>
  );
}
