"use client";

import { useEffect, useRef, useState, useCallback } from "react";

const CANVAS_WIDTH = 500;
const CANVAS_HEIGHT = 700;
const LANE_WIDTH = 150;

export default function PandaRoll() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [score, setScore] = useState(0);
  const [highScore, setHighScore] = useState(0);
  const [gameActive, setGameActive] = useState(false);
  const [gameOver, setGameOver] = useState(false);

  const pandaRef = useRef({
    lane: 1,
    x: 0,
    y: CANVAS_HEIGHT - 110,
    w: 56,
    h: 56,
    vy: 0,
    gravity: 0.55,
    jump: -14,
    roll: false,
    rollTimer: 0,
  });

  const obstaclesRef = useRef<Array<{
    x: number;
    lane: number;
    type: "bamboo" | "wall";
    h: number;
    w: number;
    passed: boolean;
  }>>([]);
  const framesRef = useRef(0);
  const speedRef = useRef(3.5);
  const rafRef = useRef<number | null>(null);

  const lanes = [CANVAS_WIDTH / 2 - LANE_WIDTH, CANVAS_WIDTH / 2, CANVAS_WIDTH / 2 + LANE_WIDTH];

  const resetGame = useCallback(() => {
    pandaRef.current.lane = 1;
    pandaRef.current.x = lanes[1];
    pandaRef.current.y = CANVAS_HEIGHT - 110;
    pandaRef.current.vy = 0;
    pandaRef.current.roll = false;
    pandaRef.current.rollTimer = 0;
    pandaRef.current.h = 56;
    obstaclesRef.current = [];
    setScore(0);
    speedRef.current = 3.5;
    framesRef.current = 0;
    setGameActive(true);
    setGameOver(false);
    loop();
  }, []);

  const jump = useCallback(() => {
    if (!gameActive) return;
    const p = pandaRef.current;
    if (!p.roll && p.y >= CANVAS_HEIGHT - 60 - p.h) {
      p.vy = p.jump;
    }
  }, [gameActive]);

  const roll = useCallback(() => {
    if (!gameActive || pandaRef.current.roll) return;
    pandaRef.current.roll = true;
    pandaRef.current.rollTimer = 28;
  }, [gameActive]);

  const switchLane = useCallback((dir: -1 | 1) => {
    if (!gameActive) return;
    pandaRef.current.lane = Math.max(0, Math.min(2, pandaRef.current.lane + dir));
  }, [gameActive]);

  const spawnObstacle = useCallback(() => {
    const lane = Math.floor(Math.random() * 3);
    const type = Math.random() < 0.55 ? "bamboo" : "wall";
    const h = type === "bamboo" ? 55 : 85;
    obstaclesRef.current.push({
      x: CANVAS_WIDTH + 80,
      lane,
      type,
      h,
      w: 52,
      passed: false,
    });
  }, []);

  const loop = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const p = pandaRef.current;

    if (!gameActive) {
      ctx.fillStyle = "rgba(0,0,0,0.6)";
      ctx.fillRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);
      ctx.fillStyle = "#fff";
      ctx.font = "26px Cormorant Garamond, Georgia, serif";
      ctx.textAlign = "center";
      ctx.fillText("Game Over", CANVAS_WIDTH / 2, CANVAS_HEIGHT / 2 - 20);
      ctx.font = "17px ui-monospace, monospace";
      ctx.fillStyle = "#c9b8e3";
      ctx.fillText(`Final Score: ${score}`, CANVAS_WIDTH / 2, CANVAS_HEIGHT / 2 + 10);
      ctx.fillText("Tap to restart", CANVAS_WIDTH / 2, CANVAS_HEIGHT / 2 + 40);
      return;
    }

    ctx.clearRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);

    ctx.fillStyle = "#4b126b";
    ctx.fillRect(0, CANVAS_HEIGHT - 60, CANVAS_WIDTH, 60);
    ctx.fillStyle = "#3a0e5a";
    ctx.fillRect(0, CANVAS_HEIGHT - 60, CANVAS_WIDTH, 8);

    ctx.strokeStyle = "rgba(255,255,255,0.12)";
    ctx.setLineDash([24, 24]);
    ctx.beginPath();
    ctx.moveTo(lanes[0], 0);
    ctx.lineTo(lanes[0], CANVAS_HEIGHT - 60);
    ctx.stroke();
    ctx.beginPath();
    ctx.moveTo(lanes[2], 0);
    ctx.lineTo(lanes[2], CANVAS_HEIGHT - 60);
    ctx.stroke();
    ctx.setLineDash([]);

    const targetX = lanes[p.lane];
    p.x += (targetX - p.x) * 0.22;
    if (p.roll) {
      p.rollTimer--;
      if (p.rollTimer <= 0) p.roll = false;
      p.h = 34;
      p.y = CANVAS_HEIGHT - 60 - p.h;
    } else {
      p.vy += p.gravity;
      p.y += p.vy;
      const groundY = CANVAS_HEIGHT - 60 - p.h;
      if (p.y > groundY) {
        p.y = groundY;
        p.vy = 0;
      }
    }
    if (p.y < 0) {
      p.y = 0;
      p.vy = 0;
    }

    framesRef.current++;
    if (framesRef.current % 100 === 0) spawnObstacle();

    for (let i = obstaclesRef.current.length - 1; i >= 0; i--) {
      const o = obstaclesRef.current[i];
      o.x -= speedRef.current;
      if (o.x + o.w < 0) {
        obstaclesRef.current.splice(i, 1);
        continue;
      }
      if (!o.passed && p.x > o.x + o.w) {
        o.passed = true;
        setScore((s) => s + 1);
        if ((score + 1) % 4 === 0) speedRef.current += 0.35;
      }

      const laneX = lanes[o.lane];
      const laneW = LANE_WIDTH * 0.62;
      const pandaBottom = p.y + p.h;
      const obsTop = CANVAS_HEIGHT - 60 - o.h;
      if (Math.abs(p.x - laneX) < laneW && pandaBottom > obsTop) {
        if (!(o.type === "bamboo" && p.roll)) {
          setGameActive(false);
          setGameOver(true);
          if (score > highScore) setHighScore(score);
        }
      }
    }

    obstaclesRef.current.forEach((o) => {
      ctx.save();
      ctx.translate(o.x + o.w / 2, CANVAS_HEIGHT - 60 - o.h / 2);
      if (o.type === "bamboo") {
        ctx.fillStyle = "#4ade80";
        ctx.fillRect(-o.w / 2, -o.h / 2, o.w, o.h);
        ctx.fillStyle = "#22c55e";
        ctx.fillRect(-o.w / 2, -o.h / 2 + 16, o.w, 5);
        ctx.fillRect(-o.w / 2, -o.h / 2 + 34, o.w, 5);
        ctx.fillRect(-o.w / 2, -o.h / 2 + 52, o.w, 5);
        ctx.strokeStyle = "#16a34a";
        ctx.lineWidth = 2;
        ctx.beginPath();
        ctx.moveTo(-o.w / 2, -o.h / 2 + 16);
        ctx.lineTo(o.w / 2, -o.h / 2 + 16);
        ctx.moveTo(-o.w / 2, -o.h / 2 + 34);
        ctx.lineTo(o.w / 2, -o.h / 2 + 34);
        ctx.moveTo(-o.w / 2, -o.h / 2 + 52);
        ctx.lineTo(o.w / 2, -o.h / 2 + 52);
        ctx.stroke();
      } else {
        ctx.fillStyle = "#fb7185";
        ctx.fillRect(-o.w / 2, -o.h / 2, o.w, o.h);
        ctx.strokeStyle = "#72212f";
        ctx.lineWidth = 2;
        ctx.strokeRect(-o.w / 2, -o.h / 2, o.w, o.h);
      }
      ctx.restore();
    });

    ctx.save();
    ctx.translate(p.x + p.w / 2, p.y + p.h / 2);
    ctx.fillStyle = "rgba(0,0,0,0.3)";
    ctx.beginPath();
    ctx.ellipse(0, p.h / 2 + 4, p.w * 0.6, 8, 0, 0, Math.PI * 2);
    ctx.fill();
    ctx.fillStyle = "#0a0a0a";
    ctx.beginPath();
    ctx.arc(0, 0, p.w / 2, 0, Math.PI * 2);
    ctx.fill();
    ctx.fillStyle = "#e8e8e8";
    ctx.beginPath();
    ctx.ellipse(0, 6, p.w * 0.5, p.h * 0.45, 0, 0, Math.PI * 2);
    ctx.fill();
    ctx.fillStyle = "#0a0a0a";
    ctx.beginPath();
    ctx.arc(-20, -24, 14, 0, Math.PI * 2);
    ctx.arc(20, -24, 14, 0, Math.PI * 2);
    ctx.fill();
    ctx.fillStyle = "#fff";
    ctx.beginPath();
    ctx.arc(-16, -2, 3.5, 0, Math.PI * 2);
    ctx.arc(16, -2, 3.5, 0, Math.PI * 2);
    ctx.fill();
    ctx.fillStyle = "#444";
    ctx.beginPath();
    ctx.arc(0, 5, 4.5, 0, Math.PI * 2);
    ctx.fill();
    ctx.strokeStyle = "#444";
    ctx.lineWidth = 2;
    ctx.beginPath();
    ctx.arc(0, 10, 5, 0, Math.PI);
    ctx.stroke();
    ctx.restore();

    rafRef.current = requestAnimationFrame(loop);
  }, [gameActive, score, highScore, spawnObstacle]);

  useEffect(() => {
    if (gameActive) {
      rafRef.current = requestAnimationFrame(loop);
    }
    return () => {
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
  }, [gameActive, loop]);

  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if (e.code === "Space" || e.code === "ArrowUp") {
        e.preventDefault();
        if (!gameActive && gameOver) { resetGame(); return; }
        if (gameActive) jump();
      }
      if (e.code === "ArrowDown" || e.code === "KeyS") {
        e.preventDefault();
        roll();
      }
      if (e.code === "ArrowLeft") switchLane(-1);
      if (e.code === "ArrowRight") switchLane(1);
    };
    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, [gameActive, gameOver, jump, roll, switchLane, resetGame]);

  return (
    <div className="min-h-[90vh] bg-[#1a0a1e] text-white px-6 py-12">
      <div className="max-w-md mx-auto">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
          <div>
            <h1 className="font-display text-3xl md:text-4xl font-bold text-white mb-1">Panda Roll</h1>
            <p className="text-paper-200 text-sm">An endless runner starring a rolling panda.</p>
          </div>
          <div className="flex gap-2 text-sm">
            <span className="text-paper-200/70">Score</span>
            <span className="font-mono font-bold text-white">{score}</span>
            <span className="text-paper-200/50">•</span>
            <span className="text-pink-500 font-mono font-bold">Best: {highScore}</span>
          </div>
        </div>

        <div className="relative">
          <canvas
            ref={canvasRef}
            width={CANVAS_WIDTH}
            height={CANVAS_HEIGHT}
            className="w-full max-w-md rounded-[2rem] border border-white/10 shadow-soft bg-gradient-to-b from-[#5c3aa6] to-[#1a0a1e]"
          />
          {!gameActive && gameOver ? (
            <div className="absolute inset-0 flex flex-col items-center justify-center bg-black/70 rounded-[2rem]">
              <p className="text-2xl font-bold text-white mb-2">Game Over</p>
              <p className="text-paper-200 mb-6">Final score: {score}</p>
              <button
                onClick={resetGame}
                className="px-8 py-3 bg-white text-[#1a0a1e] font-semibold rounded-full hover:bg-paper-200 transition"
              >
                Play again
              </button>
            </div>
          ) : !gameActive ? (
            <div className="absolute inset-0 flex flex-col items-center justify-center bg-black/50 rounded-[2rem]">
              <p className="text-xl font-bold text-white mb-2">Panda Roll</p>
              <p className="text-paper-200 text-sm mb-6 text-center max-w-xs">
                Tap or SPACE to jump • DOWN/S to roll • LEFT/RIGHT to switch lanes<br />
                Roll under bamboo • Jump over walls
              </p>
              <button
                onClick={resetGame}
                className="px-8 py-3 bg-white text-[#1a0a1e] font-semibold rounded-full hover:bg-paper-200 transition"
              >
                Start
              </button>
            </div>
          ) : null}
        </div>

        <div className="mt-6 text-xs text-paper-200/50 text-center">
          Keyboard: SPACE/↑ jump • ↓/S roll • ←/→ lanes
        </div>
      </div>
    </div>
  );
}
