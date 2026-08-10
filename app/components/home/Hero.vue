<script setup lang="ts">
import { onMounted, onUnmounted, ref } from 'vue'

const canvasRef = ref<HTMLCanvasElement | null>(null)
let animId: number | null = null
let spawnTimer: ReturnType<typeof setTimeout> | null = null

interface ShootingStar {
  x: number
  y: number
  dx: number
  dy: number
  length: number
  speed: number
  opacity: number
  maxLife: number
  life: number
  headRadius: number
}

const stars: ShootingStar[] = []

function spawnStar(width: number, height: number) {
  if (document.hidden) return
  const angle = (Math.PI / 180) * (34 + Math.random() * 14)
  const speed = 12 + Math.random() * 9
  stars.push({
    x: Math.random() * (width * 0.7) + width * 0.05,
    y: Math.random() * (height * 0.35) + height * 0.05,
    dx: Math.cos(angle) * speed,
    dy: Math.sin(angle) * speed,
    length: 150 + Math.random() * 130,
    speed,
    opacity: 0,
    maxLife: 42 + Math.random() * 28,
    life: 0,
    headRadius: 1.6 + Math.random() * 1.1
  })
}

function scheduleNextSpawn(width: number, height: number) {
  if (spawnTimer) clearTimeout(spawnTimer)
  const delay = 3200 + Math.random() * 4000
  spawnTimer = setTimeout(() => {
    if (!document.hidden) {
      spawnStar(width, height)
    }
    scheduleNextSpawn(width, height)
  }, delay)
}

function stopAnimation() {
  if (animId) {
    cancelAnimationFrame(animId)
    animId = null
  }
  if (spawnTimer) {
    clearTimeout(spawnTimer)
    spawnTimer = null
  }
}

function startAnimation() {
  stopAnimation()
  const canvas = canvasRef.value
  if (!canvas) return

  stars.length = 0
  scheduleNextSpawn(canvas.width, canvas.height)
  animId = requestAnimationFrame(animate)
}

function handleVisibilityChange() {
  if (document.hidden) {
    stopAnimation()
    stars.length = 0
  } else {
    startAnimation()
  }
}

function animate() {
  if (document.hidden) return
  const canvas = canvasRef.value
  if (!canvas) return
  const ctx = canvas.getContext('2d')
  if (!ctx) return

  ctx.clearRect(0, 0, canvas.width, canvas.height)

  for (let i = stars.length - 1; i >= 0; i--) {
    const s = stars[i]
    if (!s) continue
    s.life++
    s.x += s.dx
    s.y += s.dy

    const progress = s.life / s.maxLife
    if (progress < 0.18) {
      s.opacity = progress / 0.18
    } else if (progress > 0.68) {
      s.opacity = (1 - progress) / 0.32
    } else {
      s.opacity = 1
    }

    if (s.life >= s.maxLife || s.opacity <= 0) {
      stars.splice(i, 1)
      continue
    }

    const tailX = s.x - (s.dx / s.speed) * s.length
    const tailY = s.y - (s.dy / s.speed) * s.length

    ctx.save()
    const grad = ctx.createLinearGradient(s.x, s.y, tailX, tailY)
    grad.addColorStop(0, `rgba(255, 255, 255, ${s.opacity})`)
    grad.addColorStop(0.18, `rgba(186, 220, 255, ${s.opacity * 0.78})`)
    grad.addColorStop(0.55, `rgba(100, 160, 255, ${s.opacity * 0.32})`)
    grad.addColorStop(1, 'rgba(100, 160, 255, 0)')

    ctx.strokeStyle = grad
    ctx.lineWidth = 2.2
    ctx.lineCap = 'round'
    ctx.beginPath()
    ctx.moveTo(s.x, s.y)
    ctx.lineTo(tailX, tailY)
    ctx.stroke()

    ctx.shadowColor = 'rgba(186, 220, 255, 0.95)'
    ctx.shadowBlur = 12
    ctx.fillStyle = `rgba(255, 255, 255, ${s.opacity})`
    ctx.beginPath()
    ctx.arc(s.x, s.y, s.headRadius, 0, Math.PI * 2)
    ctx.fill()

    ctx.restore()
  }

  animId = requestAnimationFrame(animate)
}

function handleResize() {
  const canvas = canvasRef.value
  if (!canvas || !canvas.parentElement) return
  canvas.width = canvas.parentElement.clientWidth
  canvas.height = canvas.parentElement.clientHeight
}

onMounted(() => {
  handleResize()
  window.addEventListener('resize', handleResize)
  document.addEventListener('visibilitychange', handleVisibilityChange)
  if (!document.hidden) {
    startAnimation()
  }
})

onUnmounted(() => {
  window.removeEventListener('resize', handleResize)
  document.removeEventListener('visibilitychange', handleVisibilityChange)
  stopAnimation()
  stars.length = 0
})
</script>

<template>
  <section class="hero relative min-h-screen overflow-hidden px-[4.5vw] pt-32 pb-8 bg-[radial-gradient(circle_at_78%_35%,rgba(56,122,255,0.34),transparent_24%),radial-gradient(circle_at_82%_36%,rgba(146,188,255,0.14),transparent_12%),linear-gradient(135deg,#04132f_0%,#082d78_55%,#071a3f_100%)] text-white max-lg:min-h-auto max-md:px-5 max-md:pt-24 max-md:pb-6">
    <!-- Starfield SVG Background -->
    <svg
      class="hero-stars absolute inset-x-0 top-0 z-0 w-full h-[46%] pointer-events-none select-none opacity-70 [mask-image:linear-gradient(to_bottom,#000_0%,#000_66%,transparent_100%)] [&_circle]:fill-[#dceaff] [&_circle]:[filter:drop-shadow(0_0_4px_rgba(152,196,255,0.9))] [&_circle]:animate-[constellation-twinkle-a_4.7s_ease-in-out_infinite] [&_.star-bright]:fill-white [&_.star-bright]:[filter:drop-shadow(0_0_7px_rgba(183,216,255,1))]"
      viewBox="0 0 1440 520"
      preserveAspectRatio="none"
      aria-hidden="true"
    >
      <circle cx="34" cy="42" r="1.2" />
      <circle cx="82" cy="126" r="1.8" />
      <circle cx="137" cy="75" r="1.1" />
      <circle class="star-bright" cx="191" cy="184" r="2.2" />
      <circle cx="248" cy="38" r="1.5" />
      <circle cx="303" cy="118" r="1.1" />
      <circle cx="356" cy="213" r="1.7" />
      <circle class="star-bright" cx="414" cy="68" r="2.4" />
      <circle cx="468" cy="151" r="1.2" />
      <circle cx="523" cy="28" r="1.6" />
      <circle cx="576" cy="196" r="1.1" />
      <circle class="star-bright" cx="632" cy="104" r="2.1" />
      <circle cx="687" cy="47" r="1.3" />
      <circle cx="742" cy="168" r="1.7" />
      <circle cx="796" cy="81" r="1.1" />
      <circle class="star-bright" cx="851" cy="224" r="2.3" />
      <circle cx="906" cy="35" r="1.5" />
      <circle cx="961" cy="137" r="1.1" />
      <circle cx="1016" cy="73" r="1.8" />
      <circle class="star-bright" cx="1071" cy="189" r="2.2" />
      <circle cx="1126" cy="27" r="1.2" />
      <circle cx="1181" cy="113" r="1.6" />
      <circle cx="1236" cy="218" r="1.1" />
      <circle class="star-bright" cx="1291" cy="61" r="2.4" />
      <circle cx="1346" cy="147" r="1.3" />
      <circle cx="1402" cy="92" r="1.8" />
      <circle cx="59" cy="263" r="1.1" />
      <circle cx="151" cy="322" r="1.5" />
      <circle class="star-bright" cx="269" cy="276" r="2.1" />
      <circle cx="389" cy="354" r="1.2" />
      <circle cx="505" cy="297" r="1.7" />
      <circle cx="621" cy="373" r="1.1" />
      <circle class="star-bright" cx="736" cy="287" r="2.3" />
      <circle cx="852" cy="341" r="1.4" />
      <circle cx="968" cy="269" r="1.1" />
      <circle class="star-bright" cx="1084" cy="358" r="2.2" />
      <circle cx="1200" cy="287" r="1.6" />
      <circle cx="1316" cy="337" r="1.2" />
      <circle cx="1390" cy="274" r="1.8" />
    </svg>

    <!-- Realistic Shooting Stars Canvas -->
    <canvas
      ref="canvasRef"
      class="shooting-stars-canvas absolute inset-x-0 top-0 z-[5] w-full h-[55%] pointer-events-none select-none"
      aria-hidden="true"
    />

    <div class="hero-content relative z-10 grid grid-cols-1 lg:grid-cols-[minmax(0,1.03fr)_minmax(480px,0.97fr)] items-center min-h-[calc(100vh-235px)] max-md:min-h-0">
      <!-- Left Copy Column -->
      <div class="hero-copy py-16 lg:pr-[4vw] max-md:py-8">
        <p class="eyebrow reveal mb-7 font-akrobat text-xs tracking-[0.12em] uppercase text-[#a7c7ff]">
          Разработка цифровых решений для бизнеса
        </p>
        <h1 class="reveal text-5xl md:text-7xl lg:text-[clamp(56px,6.1vw,104px)] font-extrabold tracking-tight leading-[0.92]">
          Создаём продукты,<br><em class="not-italic text-[#b8d1ff]">которые двигают бизнес.</em>
        </h1>
        <p class="hero-lead reveal max-w-[660px] mt-8.5 text-base md:text-lg leading-relaxed text-white/70 max-md:mt-6">
          Проектируем и разрабатываем сайты, веб-сервисы, личные кабинеты
          и внутренние системы. Соединяем их с данными, командами и процессами компании.
        </p>
        <div class="hero-actions reveal flex flex-wrap items-center gap-8 mt-10.5 max-md:flex-col max-md:items-start max-md:gap-6 max-md:mt-7.5">
          <UButton
            to="#contacts"
            color="neutral"
            variant="link"
            class="button button-light inline-flex! justify-center! items-center! gap-7! min-h-13! px-5.5! py-0! rounded-full! text-[13px]! font-[650]! text-(--blue)! bg-white! hover:bg-white! transition-all duration-250 hover:-translate-y-0.5"
          >
            Обсудить проект <span>↗</span>
          </UButton>
          <ULink
            to="#services"
            class="text-link inline-flex items-center gap-4 text-xs  pb-1.75 text-white/90 hover:text-white transition-colors"
          >
            <span>Смотреть направления</span>
            <span>↓</span>
          </ULink>
        </div>
      </div>

      <!-- Right Mountain Peak Section (Layered SVG Images - Selection Disabled) -->
      <div
        class="peak-scene reveal relative min-h-[660px] grid place-items-center isolate overflow-visible -mb-[118px] select-none pointer-events-none max-lg:min-h-[620px] max-lg:-mb-[92px] max-md:min-h-[560px] max-md:mx-[-20px] max-md:-mb-[80px] max-md:overflow-hidden"
        aria-label="Фирменный образ вершины — точки роста бизнеса"
      >
        <!-- Peak Glowing Background -->
        <div
          class="peak-mountain relative -top-2 w-[min(165%,1040px)] h-[720px] filter drop-shadow-[0_34px_55px_rgba(0,10,41,0.42)] animate-[peak-breathe_7s_ease-in-out_infinite] select-none max-md:top-2 max-md:w-[500px] max-md:h-[555px]"
          aria-hidden="true"
        >
          <!-- Soft Sun / Summit Glow -->
          <div class="peak-glow absolute -z-10 top-[13.5%] left-[60%] -translate-x-1/2 w-45 h-45 rounded-full bg-[radial-gradient(circle,rgba(255,255,255,0.32)_0%,rgba(190,219,255,0.16)_24%,rgba(70,132,242,0.07)_48%,transparent_70%)] blur-[18px]" />

          <!-- SVG Layer 1: Left Background Mountain Range -->
          <img
            src="/mountain/mountain-range-left.svg"
            alt=""
            draggable="false"
            class="absolute -z-10 -bottom-0.5 left-[-30%] w-[84%] h-[42%] max-w-none opacity-34 blur-[1.5px] pointer-events-none select-none [-webkit-user-drag:none] [mask-image:linear-gradient(to_bottom,#000_0%,#000_74%,rgba(0,0,0,0.78)_84%,transparent_100%)]"
          >

          <!-- SVG Layer 2: Right Background Mountain Range -->
          <img
            src="/mountain/mountain-range-right.svg"
            alt=""
            draggable="false"
            class="absolute -z-10 -bottom-0.5 right-[-58%] w-[120%] h-[48%] max-w-none opacity-36 blur-[1.5px] pointer-events-none select-none [-webkit-user-drag:none] [mask-image:linear-gradient(to_bottom,#000_0%,#000_74%,rgba(0,0,0,0.78)_84%,transparent_100%)]"
          >

          <!-- SVG Layer 3: Main Mountain Silhouette & Back -->
          <img
            src="/mountain/mountain-back.svg"
            alt=""
            draggable="false"
            class="absolute inset-x-0 bottom-0 w-full h-[84%] max-w-none pointer-events-none select-none [-webkit-user-drag:none] [mask-image:linear-gradient(to_bottom,#000_0%,#000_74%,rgba(0,0,0,0.78)_84%,transparent_100%)]"
          >

          <!-- SVG Layer 4: Main Mountain Left Facet (Illuminated) -->
          <img
            src="/mountain/mountain-left.svg"
            alt=""
            draggable="false"
            class="absolute inset-x-0 bottom-0 w-full h-[84%] max-w-none pointer-events-none select-none [-webkit-user-drag:none] [mask-image:linear-gradient(to_bottom,#000_0%,#000_74%,rgba(0,0,0,0.78)_84%,transparent_100%)]"
          >

          <!-- SVG Layer 5: Main Mountain Right Facet (Shaded) -->
          <img
            src="/mountain/mountain-right.svg"
            alt=""
            draggable="false"
            class="absolute inset-x-0 bottom-0 w-full h-[84%] max-w-none pointer-events-none select-none [-webkit-user-drag:none] [mask-image:linear-gradient(to_bottom,#000_0%,#000_74%,rgba(0,0,0,0.78)_84%,transparent_100%)]"
          >

          <!-- SVG Layer 6: Foreground Mountain Ridge -->
          <img
            src="/mountain/mountain-front.svg"
            alt=""
            draggable="false"
            class="absolute z-10 inset-x-0 bottom-0 left-[-2%] w-[104%] h-[39%] max-w-none pointer-events-none select-none [-webkit-user-drag:none] [mask-image:linear-gradient(to_bottom,#000_0%,#000_74%,rgba(0,0,0,0.78)_84%,transparent_100%)]"
          >

          <!-- Animated Pipeline Flow Line & Moving Glowing Arrows -->
          <svg
            class="peak-pipeline absolute z-20 inset-0 w-full h-full overflow-visible pointer-events-none select-none"
            viewBox="0 0 1040 720"
            preserveAspectRatio="none"
          >
            <defs>
              <filter id="arrow-glow" x="-50%" y="-50%" width="200%" height="200%">
                <feGaussianBlur stdDeviation="2.5" result="blur" />
                <feMerge>
                  <feMergeNode in="blur" />
                  <feMergeNode in="SourceGraphic" />
                </feMerge>
              </filter>
            </defs>

            <!-- Base Dashed Path -->
            <path
              d="M166 630 C220 585, 270 550, 312 520 C360 485, 410 445, 458 405 C520 345, 570 260, 624 188"
              class="fill-none stroke-[rgba(194,218,255,0.78)] stroke-[1.8] stroke-round stroke-dasharray-[7_7] drop-shadow-[0_0_7px_rgba(137,183,255,0.74)]"
            />

            <!-- Waypoint Nodes -->
            <circle cx="166" cy="630" r="5" class="fill-[#9fc3ff] stroke-white stroke-[1.4] drop-shadow-[0_0_7px_rgba(159,195,255,0.95)]" />
            <circle cx="312" cy="520" r="5" class="fill-[#9fc3ff] stroke-white stroke-[1.4] drop-shadow-[0_0_7px_rgba(159,195,255,0.95)]" />
            <circle cx="458" cy="405" r="5" class="fill-[#9fc3ff] stroke-white stroke-[1.4] drop-shadow-[0_0_7px_rgba(159,195,255,0.95)]" />

            <!-- Stream of Glowing Arrows Moving Up the Slope -->
            <g filter="url(#arrow-glow)">
              <polygon points="-4,-5 6,0 -4,5 -1,0" class="fill-white">
                <animateMotion
                  path="M166 630 C220 585, 270 550, 312 520 C360 485, 410 445, 458 405 C520 345, 570 260, 624 188"
                  dur="9s"
                  begin="0s"
                  repeatCount="indefinite"
                  rotate="auto"
                />
              </polygon>
            </g>

            <g filter="url(#arrow-glow)">
              <polygon points="-4,-5 6,0 -4,5 -1,0" class="fill-[#b8d1ff]">
                <animateMotion
                  path="M166 630 C220 585, 270 550, 312 520 C360 485, 410 445, 458 405 C520 345, 570 260, 624 188"
                  dur="9s"
                  begin="3s"
                  repeatCount="indefinite"
                  rotate="auto"
                />
              </polygon>
            </g>

            <g filter="url(#arrow-glow)">
              <polygon points="-4,-5 6,0 -4,5 -1,0" class="fill-[#7daeff]">
                <animateMotion
                  path="M166 630 C220 585, 270 550, 312 520 C360 485, 410 445, 458 405 C520 345, 570 260, 624 188"
                  dur="9s"
                  begin="6s"
                  repeatCount="indefinite"
                  rotate="auto"
                />
              </polygon>
            </g>
          </svg>

        
          <UBadge
            variant="subtle"
            class="pipeline-step step-analysis absolute! z-25! gap-1.75! px-2.25! py-1.5! rounded-none! bg-[#041945]/72! backdrop-blur-md! text-[9px]! text-white! font-akrobat tracking-wider whitespace-nowrap left-[calc(16%-92px)] top-[calc(85%-14px)] max-md:left-[calc(16%-70px)] max-md:top-[calc(85%-10px)] max-md:px-1.75! max-md:py-1! max-md:text-[8px]!"
          >
            <b class="text-[8px] font-medium opacity-50">01</b>
            <span class="font-semibold">Анализ</span>
          </UBadge>

          <UBadge
            variant="subtle"
            class="pipeline-step step-design absolute! z-25! gap-1.75! px-2.25! py-1.5! rounded-none! bg-[#041945]/72! backdrop-blur-md! text-[9px]! text-white! font-akrobat tracking-wider whitespace-nowrap left-[calc(30%-105px)] top-[calc(67%-14px)] max-md:left-[calc(30%-85px)] max-md:top-[calc(67%-10px)] max-md:px-1.75! max-md:py-1! max-md:text-[8px]!"
          >
            <b class="text-[8px] font-medium opacity-50">02</b>
            <span class="font-semibold">Проектирование</span>
          </UBadge>

          <UBadge
            variant="subtle"
            class="pipeline-step step-development absolute! z-25! gap-1.75! px-2.25! py-1.5! rounded-none! border-white/20! bg-[#041945]/72! backdrop-blur-md! text-[9px]! text-white! font-akrobat tracking-wider whitespace-nowrap left-[calc(44%-106px)] top-[calc(48%-14px)] max-md:left-[calc(44%-85px)] max-md:top-[calc(48%-10px)] max-md:px-1.75! max-md:py-1! max-md:text-[8px]!"
          >
            <b class="text-[8px] font-medium opacity-50">03</b>
            <span class="font-semibold">Разработка</span>
          </UBadge>

          <UBadge
            variant="solid"
            class="pipeline-step step-launch absolute! z-25! gap-1.75! px-2.25! py-1.5! rounded-none! bg-[#eff6ff]/92! text-[#061a42]! font-akrobat tracking-wider whitespace-nowrap shadow-[0_8px_28px_rgba(112,165,255,0.24)] left-[calc(60%+18px)] top-[calc(26.1%-13px)] max-md:left-[calc(60%+10px)] max-md:top-[calc(26.1%-10px)] max-md:px-1.5! max-md:py-1! max-md:text-[7px]!"
          >
            <b class="text-[8px] font-medium opacity-50">04</b>
            <span class="font-semibold">Реализация</span>
          </UBadge>

          <!-- Summit Diamond Point -->
          <div class="peak-summit absolute z-30 top-[26.1%] left-[60%] w-2.25 h-2.25 -translate-x-1/2 -translate-y-1/2 rotate-45 bg-white shadow-[0_0_13px_4px_rgba(174,210,255,0.82),0_0_64px_16px_rgba(113,168,255,0.5)] select-none pointer-events-none" />
        </div>
      </div>
    </div>

    <!-- Horizon Landscape (Bottom Layered SVGs - Selection Disabled) -->
    <div
      class="hero-landscape absolute z-0 -left-[20vw] -right-[20vw] bottom-3.5 h-[310px] pointer-events-none select-none overflow-hidden opacity-85 contrast-[1.16] saturate-[1.12] [mask-image:linear-gradient(to_bottom,#000_0%,rgba(0,0,0,0.8)_64%,transparent_100%)] max-md:h-[210px] max-md:opacity-60"
      aria-hidden="true"
    >
      <img
        src="/mountain/landscape-far.svg"
        alt=""
        draggable="false"
        class="absolute inset-x-0 bottom-0 w-full h-[82%] max-w-none pointer-events-none select-none [-webkit-user-drag:none]"
      >
      <img
        src="/mountain/landscape-mid.svg"
        alt=""
        draggable="false"
        class="absolute inset-x-0 bottom-0 w-full h-[63%] max-w-none pointer-events-none select-none [-webkit-user-drag:none]"
      >
      <img
        src="/mountain/landscape-near.svg"
        alt=""
        draggable="false"
        class="absolute inset-x-0 bottom-0 w-full h-[39%] max-w-none pointer-events-none select-none [-webkit-user-drag:none]"
      >
    </div>

    <!-- Hero Bottom Bar -->
    <div class="hero-bottom reveal relative z-20 grid grid-cols-1 md:grid-cols-[1.5fr_repeat(3,1fr)] items-end pt-5 border-t border-white/18 text-white/55 max-md:grid-cols-3 max-md:gap-3">
      <span class="font-akrobat text-[10px] uppercase tracking-[0.12em] opacity-55 max-md:hidden">Листайте ниже</span>
      <div class="hero-stat flex flex-col gap-1 pl-6 border-l border-white/18 max-md:pl-2.5">
        <b class="text-sm md:text-base font-bold text-white">ПРОДУКТ</b>
        <small class="text-[10px] opacity-55 max-md:hidden">сайты и веб-сервисы</small>
      </div>
      <div class="hero-stat flex flex-col gap-1 pl-6 border-l border-white/18 max-md:pl-2.5">
        <b class="text-sm md:text-base font-bold text-white">СИСТЕМЫ</b>
        <small class="text-[10px] opacity-55 max-md:hidden">внутренние платформы</small>
      </div>
      <div class="hero-stat flex flex-col gap-1 pl-6 border-l border-white/18 max-md:pl-2.5">
        <b class="text-sm md:text-base font-bold text-white">ИНТЕГРАЦИИ</b>
        <small class="text-[10px] opacity-55 max-md:hidden">данные и автоматизация</small>
      </div>
    </div>

    <!-- Bottom Blur Gradient Overlay -->
    <div
      class="hero-bottom-blur absolute z-15 -left-[8%] -right-[8%] -bottom-[88px] h-[310px] pointer-events-none select-none bg-[linear-gradient(to_bottom,transparent_4%,rgba(6,35,84,0.28)_30%,rgba(4,24,62,0.82)_58%,#07111f_84%)] blur-[27px] max-md:-bottom-[86px] max-md:h-[245px] max-md:blur-[24px]"
      aria-hidden="true"
    ></div>
  </section>
</template>

<style scoped>
.hero-content {
  position: relative;
}
</style>





