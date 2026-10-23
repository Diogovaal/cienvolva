/**
 * Simulador de lançamento oblíquo (cinemática 2D).
 * Calcula trajetória parabólica a partir de ângulo, velocidade inicial e gravidade.
 */
(function initProjectileSimulator() {
  const canvas = document.getElementById("simCanvas");
  if (!canvas) return;

  const ctx = canvas.getContext("2d");

  const sliderAngle = document.getElementById("sliderAngle");
  const sliderVel = document.getElementById("sliderVel");
  const sliderGrav = document.getElementById("sliderGrav");

  const labelAngle = document.getElementById("labelAngle");
  const labelVel = document.getElementById("labelVel");
  const labelGrav = document.getElementById("labelGrav");

  const metricHmax = document.getElementById("metricHmax");
  const metricRange = document.getElementById("metricRange");
  const metricTime = document.getElementById("metricTime");

  const telemetryPos = document.getElementById("telemetryPos");
  const telemetryVel = document.getElementById("telemetryVel");
  const telemetryTime = document.getElementById("telemetryTime");
  const simStatus = document.getElementById("simStatus");

  const btnLaunch = document.getElementById("btnLaunch");
  const btnPause = document.getElementById("btnPause");
  const btnReset = document.getElementById("btnReset");
  const btnToggleTrails = document.getElementById("btnToggleTrails");
  const btnFullscreen = document.getElementById("btnFullscreen");
  const btnShare = document.getElementById("btnShare");
  const canvasWrapper = document.getElementById("canvasWrapper");

  let animationFrameId = null;
  let isRunning = false;
  let isPaused = false;
  let showTrails = true;

  let angleDeg = parseFloat(sliderAngle.value);
  let v0 = parseFloat(sliderVel.value);
  let g = parseFloat(sliderGrav.value);

  let t = 0;
  const dt = 0.016;
  let trajectoryPoints = [];
  let pastTrajectories = [];

  const originX = 40;
  let originY = 0;
  const scale = 4.2;

  /** Ajusta o canvas ao tamanho visível e à densidade de pixels da tela. */
  function resizeCanvas() {
    const rect = canvas.getBoundingClientRect();
    canvas.width = rect.width * window.devicePixelRatio;
    canvas.height = rect.height * window.devicePixelRatio;
    ctx.setTransform(window.devicePixelRatio, 0, 0, window.devicePixelRatio, 0, 0);
    originY = rect.height - 40;
    updateStaticCalculations();
    drawScene();
  }

  /**
   * Atualiza altura máxima, alcance e tempo de voo com as fórmulas clássicas:
   * Hmáx = v0y² / (2g) | Alcance = v0² sen(2θ) / g | t = 2 v0y / g
   */
  function updateStaticCalculations() {
    const rad = toRadians(angleDeg);
    const v0y = v0 * Math.sin(rad);
    const flightTime = (2 * v0y) / g;
    const hMax = (v0y * v0y) / (2 * g);
    const maxRange = (v0 * v0 * Math.sin(2 * rad)) / g;

    metricHmax.textContent = hMax.toFixed(2);
    metricRange.textContent = maxRange.toFixed(2);
    metricTime.textContent = flightTime.toFixed(2);
  }

  function toRadians(degrees) {
    return (degrees * Math.PI) / 180;
  }

  /** Desenha grade, eixos e legendas do simulador. */
  function drawGrid() {
    const rect = canvas.getBoundingClientRect();
    const w = rect.width;
    const h = rect.height;

    ctx.clearRect(0, 0, w, h);

    ctx.strokeStyle = "#283044";
    ctx.lineWidth = 1;
    const step = 20;

    for (let x = originX; x < w; x += step * (scale / 4)) {
      ctx.beginPath();
      ctx.moveTo(x, 0);
      ctx.lineTo(x, h - 30);
      ctx.stroke();
    }

    for (let y = originY; y > 20; y -= step * (scale / 4)) {
      ctx.beginPath();
      ctx.moveTo(originX, y);
      ctx.lineTo(w, y);
      ctx.stroke();
    }

    ctx.strokeStyle = "#57dffe";
    ctx.lineWidth = 2;
    ctx.beginPath();
    ctx.moveTo(originX - 10, originY);
    ctx.lineTo(w - 20, originY);
    ctx.stroke();

    ctx.beginPath();
    ctx.moveTo(originX, originY + 10);
    ctx.lineTo(originX, 20);
    ctx.stroke();

    ctx.fillStyle = "#dae2fd";
    ctx.font = "10px Inter, sans-serif";
    ctx.fillText("0,0", originX - 18, originY + 16);
    ctx.fillText("Eixo X (Alcance - m)", w - 130, originY - 8);
    ctx.fillText("Eixo Y (Altura - m)", originX + 8, 30);

    for (let meters = 10; meters <= 150; meters += 10) {
      const cx = originX + meters * scale;
      if (cx < w - 20) {
        ctx.fillStyle = "#767586";
        ctx.fillRect(cx, originY - 3, 1, 6);
        ctx.fillText(meters + "m", cx - 8, originY + 16);
      }
    }
  }

  /** Canhão na origem, rotacionado conforme o ângulo de disparo. */
  function drawCannon() {
    const rad = toRadians(angleDeg);
    ctx.save();
    ctx.translate(originX, originY);

    ctx.fillStyle = "#6063ee";
    ctx.beginPath();
    ctx.arc(0, 0, 10, 0, Math.PI * 2);
    ctx.fill();

    ctx.rotate(-rad);
    ctx.fillStyle = "#acedff";
    ctx.fillRect(0, -5, 30, 10);
    ctx.restore();
  }

  /** Rastros anteriores (tracejado) e trajetória atual (linha contínua). */
  function drawTrajectories() {
    if (showTrails && pastTrajectories.length > 0) {
      pastTrajectories.forEach((traj) => {
        ctx.strokeStyle = "rgba(218, 226, 253, 0.25)";
        ctx.lineWidth = 1.5;
        ctx.setLineDash([4, 4]);
        ctx.beginPath();
        traj.forEach((point, index) => {
          const cx = originX + point.x * scale;
          const cy = originY - point.y * scale;
          if (index === 0) ctx.moveTo(cx, cy);
          else ctx.lineTo(cx, cy);
        });
        ctx.stroke();
        ctx.setLineDash([]);
      });
    }

    if (trajectoryPoints.length > 1) {
      ctx.strokeStyle = "#57dffe";
      ctx.lineWidth = 3;
      ctx.beginPath();
      trajectoryPoints.forEach((point, index) => {
        const cx = originX + point.x * scale;
        const cy = originY - point.y * scale;
        if (index === 0) ctx.moveTo(cx, cy);
        else ctx.lineTo(cx, cy);
      });
      ctx.stroke();
    }
  }

  /** Projétil e vetor velocidade instantânea. */
  function drawProjectile(x, y) {
    const cx = originX + x * scale;
    const cy = originY - y * scale;

    ctx.fillStyle = "#ffd9e4";
    ctx.beginPath();
    ctx.arc(cx, cy, 7, 0, Math.PI * 2);
    ctx.fill();

    ctx.fillStyle = "#d23284";
    ctx.beginPath();
    ctx.arc(cx, cy, 4, 0, Math.PI * 2);
    ctx.fill();

    const rad = toRadians(angleDeg);
    const vx = v0 * Math.cos(rad);
    const vy = v0 * Math.sin(rad) - g * t;

    ctx.strokeStyle = "#ffd9e4";
    ctx.lineWidth = 1.5;
    ctx.beginPath();
    ctx.moveTo(cx, cy);
    ctx.lineTo(cx + vx * 0.8, cy - vy * 0.8);
    ctx.stroke();
  }

  function drawScene() {
    drawGrid();
    drawTrajectories();
    drawCannon();

    const rad = toRadians(angleDeg);
    const vx = v0 * Math.cos(rad);
    const vy0 = v0 * Math.sin(rad);
    const curX = vx * t;
    let curY = vy0 * t - 0.5 * g * t * t;
    if (curY < 0) curY = 0;

    drawProjectile(curX, curY);
  }

  /** Loop de animação: avança o tempo até o projétil tocar o solo. */
  function loop() {
    if (!isRunning || isPaused) return;

    t += dt;
    const rad = toRadians(angleDeg);
    const vx = v0 * Math.cos(rad);
    const vy0 = v0 * Math.sin(rad);
    const currentY = vy0 * t - 0.5 * g * t * t;
    const currentX = vx * t;
    const currentVy = vy0 - g * t;
    const currentV = Math.sqrt(vx * vx + currentVy * currentVy);

    if (currentY >= 0) {
      trajectoryPoints.push({ x: currentX, y: currentY });
      telemetryPos.textContent = `X: ${currentX.toFixed(2)}m | Y: ${currentY.toFixed(2)}m`;
      telemetryVel.textContent = `v: ${currentV.toFixed(1)}m/s (vx: ${vx.toFixed(1)}, vy: ${currentVy.toFixed(1)})`;
      telemetryTime.textContent = `t: ${t.toFixed(2)}s`;
      drawScene();
      animationFrameId = requestAnimationFrame(loop);
      return;
    }

    const flightTime = (2 * vy0) / g;
    const finalRange = vx * flightTime;
    trajectoryPoints.push({ x: finalRange, y: 0 });
    telemetryPos.textContent = `X: ${finalRange.toFixed(2)}m | Y: 0.00m`;
    telemetryVel.textContent = "Impacto no solo";
    telemetryTime.textContent = `t: ${flightTime.toFixed(2)}s`;

    isRunning = false;
    simStatus.textContent = "Disparo finalizado";
    simStatus.className =
      "font-label-sm text-label-sm px-2 py-0.5 rounded-full bg-secondary-fixed text-on-secondary-fixed";
    pastTrajectories.push([...trajectoryPoints]);
    drawScene();
  }

  /** Inicia um disparo novo ou retoma um disparo pausado. */
  function startLaunch() {
    if (isRunning && !isPaused) return;

    if (isPaused) {
      isPaused = false;
      simStatus.textContent = "Em movimento...";
      simStatus.className = "font-label-sm text-label-sm px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-800";
      loop();
      return;
    }

    t = 0;
    trajectoryPoints = [];
    isRunning = true;
    isPaused = false;
    simStatus.textContent = "Em voo...";
    simStatus.className = "font-label-sm text-label-sm px-2 py-0.5 rounded-full bg-primary-fixed text-on-primary-fixed";
    loop();
  }

  function pauseLaunch() {
    if (!isRunning) return;

    isPaused = !isPaused;
    if (isPaused) {
      simStatus.textContent = "Pausado";
      btnPause.innerHTML = '<span class="material-symbols-outlined text-[20px]">play_arrow</span> Retomar';
      return;
    }

    simStatus.textContent = "Em voo...";
    btnPause.innerHTML = '<span class="material-symbols-outlined text-[20px]">pause</span> Pausar';
    loop();
  }

  /** Zera tempo, rastros e telemetria. */
  function resetSim() {
    cancelAnimationFrame(animationFrameId);
    isRunning = false;
    isPaused = false;
    t = 0;
    trajectoryPoints = [];
    pastTrajectories = [];
    btnPause.innerHTML = '<span class="material-symbols-outlined text-[20px]">pause</span> Pausar';
    simStatus.textContent = "Pronto para disparar";
    simStatus.className =
      "font-label-sm text-label-sm px-2 py-0.5 rounded-full bg-surface-container-high text-on-surface-variant";
    telemetryPos.textContent = "X: 0.00m | Y: 0.00m";
    telemetryVel.textContent = `v: ${v0.toFixed(1)}m/s`;
    telemetryTime.textContent = "t: 0.00s";
    drawScene();
  }

  function copyShareLink() {
    if (!navigator.clipboard) return;
    navigator.clipboard.writeText(window.location.href);
    const original = btnShare.innerHTML;
    btnShare.innerHTML =
      '<span class="material-symbols-outlined text-[18px] text-emerald-600">done</span> <span>Copiado!</span>';
    setTimeout(() => {
      btnShare.innerHTML = original;
    }, 2000);
  }

  sliderAngle.addEventListener("input", (event) => {
    angleDeg = parseFloat(event.target.value);
    labelAngle.textContent = `${angleDeg}°`;
    updateStaticCalculations();
    if (!isRunning) drawScene();
  });

  sliderVel.addEventListener("input", (event) => {
    v0 = parseFloat(event.target.value);
    labelVel.textContent = `${v0} m/s`;
    updateStaticCalculations();
    if (!isRunning) drawScene();
  });

  sliderGrav.addEventListener("input", (event) => {
    g = parseFloat(event.target.value);
    labelGrav.textContent = `${g.toFixed(1)} m/s²`;
    updateStaticCalculations();
    if (!isRunning) drawScene();
  });

  btnLaunch.addEventListener("click", startLaunch);
  btnPause.addEventListener("click", pauseLaunch);
  btnReset.addEventListener("click", resetSim);

  btnToggleTrails.addEventListener("click", () => {
    showTrails = !showTrails;
    btnToggleTrails.classList.toggle("text-primary", showTrails);
    drawScene();
  });

  btnFullscreen.addEventListener("click", () => {
    if (!document.fullscreenElement) {
      canvasWrapper.requestFullscreen?.().catch(() => {});
    } else {
      document.exitFullscreen?.().catch(() => {});
    }
  });

  btnShare?.addEventListener("click", copyShareLink);

  window.addEventListener("resize", resizeCanvas);
  setTimeout(resizeCanvas, 50);
})();
