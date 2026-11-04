"use client";

import React, { useEffect, useRef, useState, useCallback } from "react";
import { useGame } from "@/context/GameContext";
import { Volume2, VolumeX, RotateCcw, X, Trophy, Play, ArrowLeft, ArrowRight, ArrowUp } from "lucide-react";

// ── Web Audio 8-Bit Retro Sound Synthesizer ───────────────────────────────────
class RetroAudio {
  private ctx: AudioContext | null = null;
  public enabled = true;

  private init() {
    if (!this.ctx && typeof window !== "undefined") {
      const AudioCtx = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      if (AudioCtx) this.ctx = new AudioCtx();
    }
    if (this.ctx && this.ctx.state === "suspended") {
      this.ctx.resume();
    }
  }

  playJump() {
    if (!this.enabled) return;
    this.init();
    if (!this.ctx) return;
    const now = this.ctx.currentTime;
    const osc = this.ctx.createOscillator();
    const gain = this.ctx.createGain();
    osc.type = "square";
    osc.frequency.setValueAtTime(160, now);
    osc.frequency.exponentialRampToValueAtTime(480, now + 0.12);
    gain.gain.setValueAtTime(0.15, now);
    gain.gain.exponentialRampToValueAtTime(0.01, now + 0.12);
    osc.connect(gain);
    gain.connect(this.ctx.destination);
    osc.start(now);
    osc.stop(now + 0.13);
  }

  playCoin() {
    if (!this.enabled) return;
    this.init();
    if (!this.ctx) return;
    const now = this.ctx.currentTime;
    const osc = this.ctx.createOscillator();
    const gain = this.ctx.createGain();
    osc.type = "sine";
    osc.frequency.setValueAtTime(987.77, now); // B5
    osc.frequency.setValueAtTime(1318.51, now + 0.08); // E6
    gain.gain.setValueAtTime(0.18, now);
    gain.gain.exponentialRampToValueAtTime(0.01, now + 0.22);
    osc.connect(gain);
    gain.connect(this.ctx.destination);
    osc.start(now);
    osc.stop(now + 0.23);
  }

  playLand() {
    if (!this.enabled) return;
    this.init();
    if (!this.ctx) return;
    const now = this.ctx.currentTime;
    const osc = this.ctx.createOscillator();
    const gain = this.ctx.createGain();
    osc.type = "triangle";
    osc.frequency.setValueAtTime(120, now);
    osc.frequency.exponentialRampToValueAtTime(40, now + 0.08);
    gain.gain.setValueAtTime(0.14, now);
    gain.gain.exponentialRampToValueAtTime(0.01, now + 0.08);
    osc.connect(gain);
    gain.connect(this.ctx.destination);
    osc.start(now);
    osc.stop(now + 0.09);
  }

  playWin() {
    if (!this.enabled) return;
    this.init();
    if (!this.ctx) return;
    const now = this.ctx.currentTime;
    const notes = [523.25, 659.25, 783.99, 1046.5]; // C5, E5, G5, C6
    notes.forEach((freq, idx) => {
      if (!this.ctx) return;
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();
      const startTime = now + idx * 0.1;
      osc.type = "square";
      osc.frequency.setValueAtTime(freq, startTime);
      gain.gain.setValueAtTime(0.16, startTime);
      gain.gain.exponentialRampToValueAtTime(0.01, startTime + 0.2);
      osc.connect(gain);
      gain.connect(this.ctx.destination);
      osc.start(startTime);
      osc.stop(startTime + 0.22);
    });
  }
}

// ── 3D Background Geometry Definitions ─────────────────────────────────────────
interface Point3D {
  x: number;
  y: number;
  z: number;
}

interface Mesh3D {
  vertices: Point3D[];
  edges: [number, number][];
  x: number;
  y: number;
  z: number;
  rx: number;
  ry: number;
  rz: number;
  vrx: number;
  vry: number;
  vrz: number;
  color: string;
}

function createCubeMesh(size: number, x: number, y: number, z: number, color: string): Mesh3D {
  const s = size / 2;
  const vertices: Point3D[] = [
    { x: -s, y: -s, z: -s },
    { x: s, y: -s, z: -s },
    { x: s, y: s, z: -s },
    { x: -s, y: s, z: -s },
    { x: -s, y: -s, z: s },
    { x: s, y: -s, z: s },
    { x: s, y: s, z: s },
    { x: -s, y: s, z: s },
  ];
  const edges: [number, number][] = [
    [0, 1], [1, 2], [2, 3], [3, 0], // front
    [4, 5], [5, 6], [6, 7], [7, 4], // back
    [0, 4], [1, 5], [2, 6], [3, 7], // connectors
  ];
  return {
    vertices,
    edges,
    x,
    y,
    z,
    rx: Math.random() * Math.PI,
    ry: Math.random() * Math.PI,
    rz: Math.random() * Math.PI,
    vrx: (Math.random() - 0.5) * 0.02,
    vry: (Math.random() - 0.5) * 0.02,
    vrz: (Math.random() - 0.5) * 0.02,
    color,
  };
}

function createOctahedronMesh(size: number, x: number, y: number, z: number, color: string): Mesh3D {
  const s = size / 2;
  const vertices: Point3D[] = [
    { x: 0, y: -s * 1.3, z: 0 },
    { x: -s, y: 0, z: -s },
    { x: s, y: 0, z: -s },
    { x: s, y: 0, z: s },
    { x: -s, y: 0, z: s },
    { x: 0, y: s * 1.3, z: 0 },
  ];
  const edges: [number, number][] = [
    [0, 1], [0, 2], [0, 3], [0, 4],
    [5, 1], [5, 2], [5, 3], [5, 4],
    [1, 2], [2, 3], [3, 4], [4, 1],
  ];
  return {
    vertices,
    edges,
    x,
    y,
    z,
    rx: Math.random() * Math.PI,
    ry: Math.random() * Math.PI,
    rz: Math.random() * Math.PI,
    vrx: (Math.random() - 0.5) * 0.025,
    vry: (Math.random() - 0.5) * 0.025,
    vrz: (Math.random() - 0.5) * 0.025,
    color,
  };
}

// ── Game Data Structures ───────────────────────────────────────────────────────
interface Platform {
  id: string;
  x: number;
  y: number;
  baseY: number;
  width: number;
  height: number;
  text: string;
  badge: string;
  accent: string;
  vy: number;
  tilt: number;
  vtilt: number;
  isGoal?: boolean;
}

interface Coin {
  id: number;
  x: number;
  y: number;
  collected: boolean;
  angle: number;
}

interface Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  size: number;
  color: string;
  alpha: number;
  life: number;
  maxLife: number;
}

interface FloatingText {
  x: number;
  y: number;
  text: string;
  color: string;
  alpha: number;
  vy: number;
}

export function PlatformerGame() {
  const { setGameMode } = useGame();
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const audioRef = useRef<RetroAudio | null>(null);

  // Game UI States
  const [score, setScore] = useState(0);
  const [coinsCollected, setCoinsCollected] = useState(0);
  const [totalCoins, setTotalCoins] = useState(15);
  const [elapsedTime, setElapsedTime] = useState(0);
  const [isWon, setIsWon] = useState(false);
  const [soundEnabled, setSoundEnabled] = useState(true);

  // Key tracking
  const keysRef = useRef<{ left: boolean; right: boolean; jump: boolean }>({
    left: false,
    right: false,
    jump: false,
  });

  // Touch control helper
  const handleTouch = (key: "left" | "right" | "jump", active: boolean) => {
    keysRef.current[key] = active;
  };

  const restartGame = useCallback(() => {
    setIsWon(false);
    setScore(0);
    setCoinsCollected(0);
    setElapsedTime(0);
    if ((window as unknown as { __resetPortfolioGame?: () => void }).__resetPortfolioGame) {
      (window as unknown as { __resetPortfolioGame: () => void }).__resetPortfolioGame();
    }
  }, []);

  const toggleSound = () => {
    if (audioRef.current) {
      audioRef.current.enabled = !audioRef.current.enabled;
      setSoundEnabled(audioRef.current.enabled);
    }
  };

  useEffect(() => {
    audioRef.current = new RetroAudio();
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animationId: number;
    let running = true;
    let startTime = Date.now();
    let gameWon = false;

    // Responsive Canvas
    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resizeCanvas();
    window.addEventListener("resize", resizeCanvas);

    // ── Generate The Portfolio Text Platforms Circuit ──
    const platformDefs = [
      { text: "PEDRO HENRIQUE VARALDA", badge: "SOFTWARE ENGINEER // START", accent: "#22c55e", side: "center" },
      { text: "GRUPO RI HAPPY", badge: "AI-ASSISTED ARCHITECTURE", accent: "#38bdf8", side: "left" },
      { text: "DIVERTUDO PLATFORM", badge: "R$ 1M+ IN YEAR 1 REVENUE", accent: "#f59e0b", side: "right" },
      { text: "CHECK-IN DIGITAL", badge: "3,000+ CRM LEADS CAPTURED", accent: "#ec4899", side: "left" },
      { text: "NODE.JS · POSTGRESQL · REACT", badge: "PRODUCTION CORE STACK", accent: "#10b981", side: "right" },
      { text: "ALGAR EASY BUY", badge: "1ST PLACE TALENTOS DE FIBRA", accent: "#8b5cf6", side: "left" },
      { text: "AI-DRIVEN CI/CD AUTOMATION", badge: "CYCLE TIME CUT BY 45%", accent: "#06b6d4", side: "right" },
      { text: "LUIZALABS", badge: "HIGH-SCALE E-COMMERCE APIS", accent: "#eab308", side: "left" },
      { text: "AWS · DOCKER · REDIS", badge: "MICROSERVICES & INFRA", accent: "#6366f1", side: "right" },
      { text: "R$ 6 MILLION", badge: "STALLED SALES UNLOCKED", accent: "#14b8a6", side: "left" },
      { text: "LET'S BUILD SOMETHING IMPACTFUL", badge: "OPEN FOR OPPORTUNITIES", accent: "#f43f5e", side: "right" },
      { text: "EMAIL: PHVARALDA@GMAIL.COM", badge: "UTC-3 READY TO SHIP", accent: "#3b82f6", side: "center" },
      { text: "🏆 FINISH LINE 🏆", badge: "SPEEDRUN COMPLETE! PRESS TO WIN", accent: "#eab308", side: "center", isGoal: true },
    ];

    const circuitWidth = Math.min(1000, canvas.width - 60);
    const centerX = canvas.width / 2;
    const startY = 160;
    const ySpacing = 170;
    // Extra gap before the Finish Line so it's clearly reachable
    const finishExtraGap = 130;

    let platforms: Platform[] = platformDefs.map((item, idx) => {
      const pWidth = Math.min(380, canvas.width * 0.44);
      const pHeight = 44;
      let px = centerX - pWidth / 2;
      if (item.side === "left") {
        px = centerX - circuitWidth / 2 + 10;
      } else if (item.side === "right") {
        px = centerX + circuitWidth / 2 - pWidth - 10;
      }
      // All platforms at regular spacing; Finish Line (last) gets extra gap
      const py = startY + idx * ySpacing + (item.isGoal ? finishExtraGap : 0);
      return {
        id: `p-${idx}`,
        x: px,
        y: py,
        baseY: py,
        width: pWidth,
        height: pHeight,
        text: item.text,
        badge: item.badge,
        accent: item.accent,
        vy: 0,
        tilt: 0,
        vtilt: 0,
        isGoal: item.isGoal,
      };
    });

    // ── Generate Floating Coins along the Circuit ──
    let coins: Coin[] = [];
    let coinId = 0;
    platforms.forEach((p, idx) => {
      // 1 coin directly on top of the platform
      coins.push({
        id: coinId++,
        x: p.x + p.width / 2,
        y: p.y - 32,
        collected: false,
        angle: Math.random() * Math.PI,
      });

      // Arc coin between alternating platforms
      if (idx < platforms.length - 1) {
        const nextP = platforms[idx + 1];
        coins.push({
          id: coinId++,
          x: (p.x + p.width / 2 + nextP.x + nextP.width / 2) / 2,
          y: (p.y + nextP.y) / 2 - 24,
          collected: false,
          angle: Math.random() * Math.PI,
        });
      }
    });
    setTotalCoins(coins.length);

    // ── Generate 3D Background Meshes ──
    const meshes3D: Mesh3D[] = [];
    const colors3D = ["#38bdf8", "#a855f7", "#ec4899", "#22c55e", "#f59e0b"];
    for (let i = 0; i < 28; i++) {
      const x = (Math.random() - 0.5) * 1600;
      const y = Math.random() * (platforms[platforms.length - 1].y + 400);
      const z = 200 + Math.random() * 600; // depth
      const col = colors3D[i % colors3D.length];
      if (i % 2 === 0) {
        meshes3D.push(createCubeMesh(70 + Math.random() * 50, x, y, z, col));
      } else {
        meshes3D.push(createOctahedronMesh(80 + Math.random() * 60, x, y, z, col));
      }
    }

    // ── Particle & Floating Text Systems ──
    let particles: Particle[] = [];
    let floatingTexts: FloatingText[] = [];

    const spawnParticles = (x: number, y: number, color: string, count = 8) => {
      for (let i = 0; i < count; i++) {
        const angle = Math.random() * Math.PI * 2;
        const speed = 1.5 + Math.random() * 4;
        particles.push({
          x,
          y,
          vx: Math.cos(angle) * speed,
          vy: Math.sin(angle) * speed - 1,
          size: 2 + Math.random() * 3,
          color,
          alpha: 1,
          life: 0,
          maxLife: 20 + Math.random() * 20,
        });
      }
    };

    const spawnFloatingText = (x: number, y: number, text: string, color: string) => {
      floatingTexts.push({
        x,
        y,
        text,
        color,
        alpha: 1,
        vy: -1.8,
      });
    };

    // ── Player Object ──
    const player = {
      x: platforms[0].x + platforms[0].width / 2 - 14,
      y: platforms[0].y - 50,
      width: 26,
      height: 34,
      vx: 0,
      vy: 0,
      grounded: true,
      facing: 1, // 1 = right, -1 = left
      coyoteTimer: 0,
      jumpBuffer: 0,
      runFrame: 0,
      currentPlatform: null as Platform | null,
    };

    // Camera following character
    let cameraY = player.y - canvas.height / 3;

    // Reset handler for outside trigger
    (window as unknown as { __resetPortfolioGame?: () => void }).__resetPortfolioGame = () => {
      player.x = platforms[0].x + platforms[0].width / 2 - 14;
      player.y = platforms[0].y - 50;
      player.vx = 0;
      player.vy = 0;
      player.grounded = true;
      cameraY = player.y - canvas.height / 3;
      coins.forEach((c) => (c.collected = false));
      particles = [];
      floatingTexts = [];
      startTime = Date.now();
      gameWon = false;
    };

    // ── Keyboard Listeners ──
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "ArrowLeft" || e.key === "a" || e.key === "A") {
        keysRef.current.left = true;
      }
      if (e.key === "ArrowRight" || e.key === "d" || e.key === "D") {
        keysRef.current.right = true;
      }
      if (e.key === "ArrowUp" || e.key === "w" || e.key === "W" || e.key === " " || e.key === "Spacebar") {
        keysRef.current.jump = true;
      }
      if (e.key === "r" || e.key === "R") {
        restartGame();
      }
      if (e.key === "Escape") {
        setGameMode(false);
      }
    };

    const handleKeyUp = (e: KeyboardEvent) => {
      if (e.key === "ArrowLeft" || e.key === "a" || e.key === "A") {
        keysRef.current.left = false;
      }
      if (e.key === "ArrowRight" || e.key === "d" || e.key === "D") {
        keysRef.current.right = false;
      }
      if (e.key === "ArrowUp" || e.key === "w" || e.key === "W" || e.key === " " || e.key === "Spacebar") {
        keysRef.current.jump = false;
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    window.addEventListener("keyup", handleKeyUp);

    // ── Main Game Loop ──
    const gameLoop = () => {
      if (!running) return;

      // Update timer if still playing
      if (!gameWon) {
        setElapsedTime((Date.now() - startTime) / 1000);
      }

      // Physics Constants — Mario-like feel
      const gravity = 0.30;         // light ascent gravity
      const fallGravity = 0.52;     // heavier gravity on the way down / when not holding jump
      const moveAccel = 0.55;       // smooth but responsive acceleration
      const maxSpeed = 5.0;         // controlled top speed
      const friction = 0.80;        // snappy stop on release
      const jumpStrength = -10.2;   // lighter, floatier jump

      // ── Horizontal Movement ──
      if (keysRef.current.left) {
        player.vx -= moveAccel;
        player.facing = -1;
      }
      if (keysRef.current.right) {
        player.vx += moveAccel;
        player.facing = 1;
      }
      player.vx *= friction;
      if (Math.abs(player.vx) > maxSpeed) {
        player.vx = Math.sign(player.vx) * maxSpeed;
      }
      player.x += player.vx;

      // Screen boundary clamps
      if (player.x < 10) {
        player.x = 10;
        player.vx = 0;
      }
      if (player.x + player.width > canvas.width - 10) {
        player.x = canvas.width - 10 - player.width;
        player.vx = 0;
      }

      // ── Vertical Movement & Coyote Time ──
      // Variable gravity: lighter while ascending & holding jump, heavier otherwise
      const isHoldingJump = keysRef.current.jump;
      const appliedGravity = (player.vy > 0 || !isHoldingJump) ? fallGravity : gravity;
      player.vy += appliedGravity;
      if (player.grounded) {
        player.coyoteTimer = 6;
      } else if (player.coyoteTimer > 0) {
        player.coyoteTimer--;
      }

      if (keysRef.current.jump) {
        player.jumpBuffer = 5;
      } else if (player.jumpBuffer > 0) {
        player.jumpBuffer--;
      }

      // Jump execution
      if (player.jumpBuffer > 0 && player.coyoteTimer > 0) {
        player.vy = jumpStrength;
        player.grounded = false;
        player.coyoteTimer = 0;
        player.jumpBuffer = 0;
        audioRef.current?.playJump();
        spawnParticles(player.x + player.width / 2, player.y + player.height, "#38bdf8", 6);
      }

      player.y += player.vy;
      player.grounded = false;

      // ── Platform Collisions & Spring Physics ──
      platforms.forEach((p) => {
        // Platform spring damping update
        const springK = 0.14;
        const damping = 0.82;
        const dispY = p.y - p.baseY;
        p.vy -= dispY * springK;
        p.vy *= damping;
        p.y += p.vy;

        // Platform tilt damping
        const tiltK = 0.08;
        const tiltDamp = 0.85;
        p.vtilt -= p.tilt * tiltK;
        p.vtilt *= tiltDamp;
        p.tilt += p.vtilt;

        // Collision check when moving downwards
        const isAbove = player.y + player.height - player.vy <= p.y + 12;
        const isLanding = player.y + player.height >= p.y && player.y + player.height <= p.y + p.height + 10;
        const isWithinX = player.x + player.width > p.x - 4 && player.x < p.x + p.width + 4;

        if (player.vy > 0 && isAbove && isLanding && isWithinX) {
          player.y = p.y - player.height;
          player.grounded = true;

          // Reacting text platform physics: bounce down + tilt!
          const impact = Math.min(8, player.vy * 0.45);
          p.vy += impact;

          // Tilt based on landing offset from platform center
          const pCenter = p.x + p.width / 2;
          const playerCenter = player.x + player.width / 2;
          const offset = (playerCenter - pCenter) / (p.width / 2); // -1 to 1
          p.vtilt += offset * 0.035;

          if (player.vy > 2.5) {
            audioRef.current?.playLand();
            spawnParticles(playerCenter, p.y, p.accent, 5);
          }
          player.vy = 0;
          player.currentPlatform = p;

          // Check if reached Goal Platform
          if (p.isGoal && !gameWon) {
            gameWon = true;
            setIsWon(true);
            audioRef.current?.playWin();
            spawnParticles(canvas.width / 2, p.y - 20, "#eab308", 40);
            spawnParticles(canvas.width / 2 - 100, p.y - 40, "#38bdf8", 30);
            spawnParticles(canvas.width / 2 + 100, p.y - 40, "#ec4899", 30);
          }
        }
      });

      // ── Fall Safety Check (Respawn if fallen into abyss) ──
      const lowestPlatform = platforms[platforms.length - 1];
      if (player.y > lowestPlatform.y + 400) {
        // Find nearest platform above
        const safeP = platforms[Math.max(0, platforms.findIndex((p) => p.y > player.y) - 2)] || platforms[0];
        player.x = safeP.x + safeP.width / 2 - 14;
        player.y = safeP.y - 60;
        player.vx = 0;
        player.vy = 0;
        audioRef.current?.playLand();
        spawnParticles(player.x, player.y, "#f43f5e", 12);
        spawnFloatingText(player.x, player.y - 20, "RESPAWN!", "#f43f5e");
      }

      // ── Coins Collection ──
      coins.forEach((c) => {
        if (!c.collected) {
          c.angle += 0.05;
          const dist = Math.hypot(player.x + player.width / 2 - c.x, player.y + player.height / 2 - c.y);
          if (dist < 32) {
            c.collected = true;
            setScore((s) => s + 100);
            setCoinsCollected((n) => n + 1);
            audioRef.current?.playCoin();
            spawnParticles(c.x, c.y, "#fbbf24", 12);
            spawnFloatingText(c.x, c.y - 12, "+100 PTS", "#fbbf24");
          }
        }
      });

      // ── Camera Tracking ──
      const targetCamY = player.y - canvas.height * 0.42;
      cameraY += (targetCamY - cameraY) * 0.1;

      // ── DRAWING ──
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // 1. Dark Retro CRT Background
      ctx.fillStyle = "#07080d";
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      // Retro background perspective grid lines
      ctx.strokeStyle = "rgba(56, 189, 248, 0.05)";
      ctx.lineWidth = 1;
      const gridSize = 40;
      const camGridOffsetY = cameraY % gridSize;
      for (let x = 0; x < canvas.width; x += gridSize) {
        ctx.beginPath();
        ctx.moveTo(x, 0);
        ctx.lineTo(x, canvas.height);
        ctx.stroke();
      }
      for (let y = -camGridOffsetY; y < canvas.height; y += gridSize) {
        ctx.beginPath();
        ctx.moveTo(0, y);
        ctx.lineTo(canvas.width, y);
        ctx.stroke();
      }

      // 2. Render 3D Background Wireframe Meshes
      const fov = 340;
      const cx = canvas.width / 2;
      const cy = canvas.height / 2;

      meshes3D.forEach((mesh) => {
        mesh.rx += mesh.vrx;
        mesh.ry += mesh.vry;
        mesh.rz += mesh.vrz;

        // Parallax relative to camera
        const relY = mesh.y - cameraY * 0.45;

        // Rotate vertices in 3D
        const sinX = Math.sin(mesh.rx), cosX = Math.cos(mesh.rx);
        const sinY = Math.sin(mesh.ry), cosY = Math.cos(mesh.ry);
        const sinZ = Math.sin(mesh.rz), cosZ = Math.cos(mesh.rz);

        const projected = mesh.vertices.map((v) => {
          // Rotate around X
          let y1 = v.y * cosX - v.z * sinX;
          let z1 = v.y * sinX + v.z * cosX;
          // Rotate around Y
          let x2 = v.x * cosY + z1 * sinY;
          let z2 = -v.x * sinY + z1 * cosY;
          // Rotate around Z
          let x3 = x2 * cosZ - y1 * sinZ;
          let y3 = x2 * sinZ + y1 * cosZ;

          const totalX = mesh.x + x3;
          const totalY = relY + y3;
          const totalZ = mesh.z + z2;

          const scale = fov / Math.max(50, totalZ);
          return {
            x: cx + totalX * scale,
            y: cy + totalY * scale,
            scale,
          };
        });

        // Draw edges
        ctx.strokeStyle = mesh.color;
        ctx.lineWidth = 1.2;
        ctx.globalAlpha = 0.22;
        ctx.beginPath();
        mesh.edges.forEach(([i, j]) => {
          const p1 = projected[i];
          const p2 = projected[j];
          ctx.moveTo(p1.x, p1.y);
          ctx.lineTo(p2.x, p2.y);
        });
        ctx.stroke();
        ctx.globalAlpha = 1.0;
      });

      // 3. Render Circuit Track Lines between Platforms
      ctx.save();
      ctx.translate(0, -cameraY);
      ctx.strokeStyle = "rgba(168, 85, 247, 0.25)";
      ctx.lineWidth = 2;
      ctx.setLineDash([8, 8]);
      ctx.beginPath();
      for (let i = 0; i < platforms.length - 1; i++) {
        const p1 = platforms[i];
        const p2 = platforms[i + 1];
        ctx.moveTo(p1.x + p1.width / 2, p1.y + p1.height / 2);
        ctx.lineTo(p2.x + p2.width / 2, p2.y + p2.height / 2);
      }
      ctx.stroke();
      ctx.setLineDash([]);
      ctx.restore();

      // 4. Render Text Platforms with Physics (Bounce & Tilt)
      platforms.forEach((p) => {
        const drawY = p.y - cameraY;
        if (drawY < -100 || drawY > canvas.height + 100) return;

        ctx.save();
        // Translate to platform center for tilt
        const pCenterX = p.x + p.width / 2;
        const pCenterY = drawY + p.height / 2;
        ctx.translate(pCenterX, pCenterY);
        ctx.rotate(p.tilt);
        ctx.translate(-pCenterX, -pCenterY);

        // Platform Glow / Shadow
        ctx.shadowColor = p.accent;
        ctx.shadowBlur = p.isGoal ? 20 : 10;

        // Platform Card Body
        ctx.fillStyle = "rgba(15, 17, 26, 0.95)";
        ctx.strokeStyle = p.accent;
        ctx.lineWidth = p.isGoal ? 3 : 2;

        ctx.beginPath();
        const r = 6;
        ctx.roundRect(p.x, drawY, p.width, p.height, r);
        ctx.fill();
        ctx.stroke();
        ctx.shadowBlur = 0;

        // Top Highlight Bar
        ctx.fillStyle = p.accent;
        ctx.fillRect(p.x + 2, drawY + 2, p.width - 4, 3);

        // Platform Text & Sub-Badge
        ctx.textAlign = "left";
        ctx.textBaseline = "middle";

        // Main Title Text
        ctx.font = "bold 13px 'Courier New', monospace, sans-serif";
        ctx.fillStyle = "#ffffff";
        ctx.fillText(p.text, p.x + 12, drawY + 16, p.width - 24);

        // Subtitle / Impact Metric Badge
        ctx.font = "bold 9px 'Courier New', monospace, sans-serif";
        ctx.fillStyle = p.accent;
        ctx.fillText(p.badge, p.x + 12, drawY + 31, p.width - 24);

        // Left/Right circuit node lights
        ctx.fillStyle = p.accent;
        ctx.beginPath();
        ctx.arc(p.x + 5, drawY + p.height / 2, 2.5, 0, Math.PI * 2);
        ctx.arc(p.x + p.width - 5, drawY + p.height / 2, 2.5, 0, Math.PI * 2);
        ctx.fill();

        ctx.restore();
      });

      // 5. Render Coins (Spinning 3D Retro Coin)
      coins.forEach((c) => {
        if (c.collected) return;
        const drawY = c.y - cameraY;
        if (drawY < -40 || drawY > canvas.height + 40) return;

        ctx.save();
        ctx.translate(c.x, drawY);

        const widthScale = Math.cos(c.angle);
        ctx.scale(Math.abs(widthScale) < 0.1 ? 0.1 : widthScale, 1);

        // Gold coin outer
        ctx.shadowColor = "#fbbf24";
        ctx.shadowBlur = 10;
        ctx.fillStyle = "#f59e0b";
        ctx.beginPath();
        ctx.arc(0, 0, 10, 0, Math.PI * 2);
        ctx.fill();

        // Inner rim
        ctx.fillStyle = "#fde047";
        ctx.beginPath();
        ctx.arc(0, 0, 7, 0, Math.PI * 2);
        ctx.fill();

        // Coin symbol "$" or "C"
        ctx.fillStyle = "#78350f";
        ctx.font = "bold 9px sans-serif";
        ctx.textAlign = "center";
        ctx.textBaseline = "middle";
        ctx.fillText("★", 0, 0);

        ctx.restore();
      });

      // 6. Render Particles
      for (let i = particles.length - 1; i >= 0; i--) {
        const pt = particles[i];
        pt.x += pt.vx;
        pt.y += pt.vy;
        pt.life++;
        pt.alpha = 1 - pt.life / pt.maxLife;

        if (pt.life >= pt.maxLife) {
          particles.splice(i, 1);
          continue;
        }

        ctx.fillStyle = pt.color;
        ctx.globalAlpha = Math.max(0, pt.alpha);
        ctx.fillRect(pt.x, pt.y - cameraY, pt.size, pt.size);
      }
      ctx.globalAlpha = 1.0;

      // 7. Render Floating Text (+100 PTS)
      for (let i = floatingTexts.length - 1; i >= 0; i--) {
        const ft = floatingTexts[i];
        ft.y += ft.vy;
        ft.alpha -= 0.02;

        if (ft.alpha <= 0) {
          floatingTexts.splice(i, 1);
          continue;
        }

        ctx.save();
        ctx.font = "bold 13px 'Courier New', monospace";
        ctx.fillStyle = ft.color;
        ctx.globalAlpha = ft.alpha;
        ctx.textAlign = "center";
        ctx.fillText(ft.text, ft.x, ft.y - cameraY);
        ctx.restore();
      }

      // 8. Render Playable Character (Retro Cyber Sprite)
      const playerDrawY = player.y - cameraY;
      ctx.save();
      ctx.translate(player.x + player.width / 2, playerDrawY + player.height / 2);
      ctx.scale(player.facing, 1);

      // Character body glow
      ctx.shadowColor = "#38bdf8";
      ctx.shadowBlur = 8;

      // Armor / Torso
      ctx.fillStyle = "#0284c7";
      ctx.fillRect(-8, -6, 16, 15);

      // Belt / Details
      ctx.fillStyle = "#38bdf8";
      ctx.fillRect(-7, 2, 14, 3);

      // Head / Helmet
      ctx.fillStyle = "#0369a1";
      ctx.fillRect(-7, -15, 14, 10);

      // Glowing Visor
      ctx.fillStyle = "#38bdf8";
      ctx.shadowColor = "#38bdf8";
      ctx.shadowBlur = 12;
      ctx.fillRect(0, -13, 7, 4);

      // Antenna
      ctx.fillStyle = "#f43f5e";
      ctx.fillRect(-2, -18, 3, 4);
      ctx.beginPath();
      ctx.arc(-0.5, -19, 2, 0, Math.PI * 2);
      ctx.fill();

      // Running Animated Legs
      if (Math.abs(player.vx) > 0.5 && player.grounded) {
        player.runFrame = (player.runFrame + 0.25) % 4;
        const legOffset = Math.sin(player.runFrame * Math.PI) * 4;
        ctx.fillStyle = "#0f172a";
        ctx.fillRect(-6, 9, 5, 8 + legOffset);
        ctx.fillRect(2, 9, 5, 8 - legOffset);
      } else if (!player.grounded) {
        // Jumping legs pose
        ctx.fillStyle = "#0f172a";
        ctx.fillRect(-6, 8, 5, 5);
        ctx.fillRect(1, 9, 6, 7);
      } else {
        // Idle legs
        ctx.fillStyle = "#0f172a";
        ctx.fillRect(-6, 9, 5, 8);
        ctx.fillRect(2, 9, 5, 8);
      }

      ctx.restore();

      // 9. Retro CRT Scanline Shader Effect
      ctx.fillStyle = "rgba(0, 0, 0, 0.12)";
      for (let y = 0; y < canvas.height; y += 4) {
        ctx.fillRect(0, y, canvas.width, 2);
      }

      // CRT Vignette Border
      const gradient = ctx.createRadialGradient(
        canvas.width / 2,
        canvas.height / 2,
        canvas.height * 0.45,
        canvas.width / 2,
        canvas.height / 2,
        canvas.height * 0.85
      );
      gradient.addColorStop(0, "rgba(0,0,0,0)");
      gradient.addColorStop(1, "rgba(0,0,0,0.65)");
      ctx.fillStyle = gradient;
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      animationId = requestAnimationFrame(gameLoop);
    };

    animationId = requestAnimationFrame(gameLoop);

    return () => {
      running = false;
      cancelAnimationFrame(animationId);
      window.removeEventListener("resize", resizeCanvas);
      window.removeEventListener("keydown", handleKeyDown);
      window.removeEventListener("keyup", handleKeyUp);
    };
  }, [restartGame, setGameMode]);

  return (
    <div className="fixed inset-0 z-50 overflow-hidden select-none font-mono">
      {/* HTML5 Game Canvas */}
      <canvas ref={canvasRef} className="absolute inset-0 block w-full h-full cursor-crosshair" />

      {/* ── Retro Arcade Top HUD ── */}
      <div className="absolute top-0 left-0 right-0 p-4 pointer-events-none flex flex-wrap items-center justify-between gap-3">
        {/* Left: Score & Coins */}
        <div className="flex items-center gap-4 bg-zinc-950/80 backdrop-blur-md px-4 py-2 rounded-lg border border-purple-500/40 shadow-[0_0_15px_rgba(168,85,247,0.2)]">
          <div className="flex flex-col">
            <span className="text-[10px] text-zinc-400 uppercase tracking-widest">SCORE</span>
            <span className="text-base sm:text-lg font-bold text-yellow-400 tracking-wider">
              {score.toString().padStart(6, "0")}
            </span>
          </div>
          <div className="h-6 w-px bg-zinc-800" />
          <div className="flex items-center gap-1.5">
            <span className="text-yellow-400 text-sm">🪙</span>
            <span className="text-sm sm:text-base font-bold text-zinc-200">
              {coinsCollected} / {totalCoins}
            </span>
          </div>
        </div>

        {/* Center: Speedrun Timer */}
        <div className="hidden sm:flex flex-col items-center bg-zinc-950/80 backdrop-blur-md px-5 py-2 rounded-lg border border-cyan-500/40 shadow-[0_0_15px_rgba(6,182,212,0.2)]">
          <span className="text-[10px] text-cyan-400 font-bold uppercase tracking-widest animate-pulse">
            SPEEDRUN TIMER
          </span>
          <span className="text-lg font-bold text-cyan-200 tracking-widest">
            {Math.floor(elapsedTime / 60)
              .toString()
              .padStart(2, "0")}
            :{(elapsedTime % 60).toFixed(2).padStart(5, "0")}
          </span>
        </div>

        {/* Right: Controls & Actions */}
        <div className="flex items-center gap-2 pointer-events-auto">
          <button
            onClick={toggleSound}
            title={soundEnabled ? "Mute Retro Audio" : "Unmute Audio"}
            className="p-2 rounded-lg bg-zinc-900/80 border border-zinc-700 text-zinc-300 hover:text-white hover:border-zinc-500 transition-colors"
          >
            {soundEnabled ? <Volume2 className="w-4 h-4" /> : <VolumeX className="w-4 h-4 text-red-400" />}
          </button>
          <button
            onClick={restartGame}
            title="Restart Run (R)"
            className="inline-flex items-center gap-1.5 px-3 py-2 rounded-lg bg-zinc-900/80 border border-zinc-700 text-xs text-zinc-300 hover:text-white hover:border-zinc-500 transition-colors"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span className="hidden md:inline">RESTART</span>
          </button>
          <button
            onClick={() => setGameMode(false)}
            title="Exit Game (ESC)"
            className="inline-flex items-center gap-1.5 px-3 py-2 rounded-lg bg-red-950/50 border border-red-800 text-xs text-red-300 hover:bg-red-900/60 transition-colors"
          >
            <X className="w-3.5 h-3.5" />
            <span>EXIT</span>
          </button>
        </div>
      </div>

      {/* ── Desktop Controls Hint ── */}
      <div className="hidden md:block absolute bottom-4 left-6 pointer-events-none bg-zinc-950/80 backdrop-blur-md px-3.5 py-2 rounded-lg border border-zinc-800 text-[11px] text-zinc-400">
        <span className="text-purple-400 font-semibold">[A][D]</span> or{" "}
        <span className="text-purple-400 font-semibold">[←][→]</span> Move •{" "}
        <span className="text-purple-400 font-semibold">[SPACE]</span> or{" "}
        <span className="text-purple-400 font-semibold">[W]</span> Jump • Reach the bottom!
      </div>

      {/* ── Mobile On-Screen Controls ── */}
      <div className="sm:hidden absolute bottom-5 left-0 right-0 px-6 flex items-center justify-between pointer-events-none">
        <div className="flex items-center gap-3 pointer-events-auto">
          <button
            onPointerDown={() => handleTouch("left", true)}
            onPointerUp={() => handleTouch("left", false)}
            onPointerLeave={() => handleTouch("left", false)}
            className="w-14 h-14 rounded-full bg-zinc-900/80 border-2 border-purple-500/50 flex items-center justify-center text-purple-300 active:bg-purple-600/30"
          >
            <ArrowLeft className="w-6 h-6" />
          </button>
          <button
            onPointerDown={() => handleTouch("right", true)}
            onPointerUp={() => handleTouch("right", false)}
            onPointerLeave={() => handleTouch("right", false)}
            className="w-14 h-14 rounded-full bg-zinc-900/80 border-2 border-purple-500/50 flex items-center justify-center text-purple-300 active:bg-purple-600/30"
          >
            <ArrowRight className="w-6 h-6" />
          </button>
        </div>

        <button
          onPointerDown={() => handleTouch("jump", true)}
          onPointerUp={() => handleTouch("jump", false)}
          onPointerLeave={() => handleTouch("jump", false)}
          className="w-16 h-16 rounded-full bg-cyan-950/80 border-2 border-cyan-400 flex items-center justify-center text-cyan-200 active:bg-cyan-600/40 pointer-events-auto shadow-[0_0_15px_rgba(6,182,212,0.4)]"
        >
          <ArrowUp className="w-8 h-8" />
        </button>
      </div>

      {/* ── Victory Modal Screen ── */}
      {isWon && (
        <div className="absolute inset-0 bg-black/85 backdrop-blur-md flex items-center justify-center p-4 z-50 animate-in fade-in duration-300">
          <div className="max-w-md w-full bg-zinc-950 border-2 border-yellow-500/80 rounded-xl p-6 sm:p-8 text-center shadow-[0_0_40px_rgba(234,179,8,0.3)]">
            <div className="w-14 h-14 mx-auto mb-3 rounded-full bg-yellow-500/20 border border-yellow-500/50 flex items-center justify-center text-yellow-400 animate-bounce">
              <Trophy className="w-7 h-7" />
            </div>

            <h2 className="text-2xl sm:text-3xl font-extrabold text-yellow-400 tracking-wider">
              CIRCUIT CLEARED!
            </h2>
            <p className="text-xs text-zinc-400 mt-1 uppercase tracking-widest">
              You navigated Pedro's entire career circuit!
            </p>

            <div className="my-6 space-y-3 bg-zinc-900/60 p-4 rounded-lg border border-zinc-800">
              <div className="flex justify-between items-center text-sm">
                <span className="text-zinc-400">FINISH TIME:</span>
                <span className="font-bold text-cyan-400">
                  {Math.floor(elapsedTime / 60)
                    .toString()
                    .padStart(2, "0")}
                  :{(elapsedTime % 60).toFixed(2).padStart(5, "0")}s
                </span>
              </div>
              <div className="flex justify-between items-center text-sm">
                <span className="text-zinc-400">COINS COLLECTED:</span>
                <span className="font-bold text-yellow-400">
                  {coinsCollected} / {totalCoins}
                </span>
              </div>
              <div className="flex justify-between items-center text-sm">
                <span className="text-zinc-400">FINAL SCORE:</span>
                <span className="font-bold text-emerald-400">
                  {(score + Math.max(0, Math.floor(1000 - elapsedTime * 10))).toLocaleString()} PTS
                </span>
              </div>
              <div className="pt-2 border-t border-zinc-800 flex justify-between items-center text-sm">
                <span className="text-zinc-400">ENGINEER RANK:</span>
                <span className="font-bold text-purple-400 text-base">
                  {coinsCollected >= totalCoins ? "RANK: S (LEAD ARCHITECT)" : "RANK: A (SENIOR DEV)"}
                </span>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <button
                onClick={restartGame}
                className="flex-1 inline-flex items-center justify-center gap-2 py-3 px-4 rounded-lg bg-zinc-800 hover:bg-zinc-700 text-zinc-100 font-bold text-xs uppercase tracking-wider transition-colors"
              >
                <Play className="w-4 h-4" /> Play Again
              </button>
              <button
                onClick={() => setGameMode(false)}
                className="flex-1 inline-flex items-center justify-center gap-2 py-3 px-4 rounded-lg bg-yellow-500 hover:bg-yellow-400 text-zinc-950 font-bold text-xs uppercase tracking-wider transition-colors shadow-[0_0_15px_rgba(234,179,8,0.4)]"
              >
                View Portfolio
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
