<script setup lang="ts">
const partners = [
  {
    id: 'boriev',
    name: 'КФХ «Бориев»',
    logo: '/partners/boriev_color_logo_bx.png',
    url: 'https://kfhboriev.ru/'
  },
  {
    id: 'euronect',
    name: 'Euronect',
    logo: '/partners/euronect.png',
    url: 'https://euronect.ru'
  },
  {
    id: 'mediok',
    name: 'Центр «MediOk»',
    logo: '/partners/mediOk-Logo-white.webp',
    url: 'https://mediok.ru'
  },
  {
    id: 'zarkoff',
    name: 'ЖАРКОFF',
    logo: '/partners/zarkoff-muka.png',
    url: 'https://zharkoff-oil.ru/'
  },
  {
    id: 'astramedpharm',
    name: 'АстраМедФарм',
    logo: '/partners/astramedpharm.webp',
    url: 'https://astramedpharm.ru/'
  },
  {
    id: 'gdemesto',
    name: 'GdeMesto.ru',
    logo: '/partners/gdemesto.svg',
    url: 'https://gdemesto.ru/'
  },
  {
    id: 'cgie_kbr',
    name: 'ФБУЗ «Центр гигиены и эпидемиологии в КБР»',
    logo: '/partners/cgie_kbr.png',
    url: 'https://cgiekbr.ru/'
  }
]
</script>

<template>
  <section
    id="partners"
    class="partners section-light relative bg-linear-to-b from-[#f8fafc] via-[#f1f5f9] to-[#e2e8f0] text-slate-900 py-22.5 md:py-30 overflow-hidden"
  >
    <!-- Soft Ambient Light Halo -->
    <div
      class="absolute top-0 left-1/2 -translate-x-1/2 w-250 h-125 bg-[radial-gradient(circle_at_50%_20%,rgba(59,130,246,0.12),transparent_70%)] pointer-events-none select-none"
      aria-hidden="true"
    />

    <!-- Header Container -->
    <div class="px-[4.5vw] max-md:px-5 relative z-10">
      <!-- Section 04 Label -->
      <div class="section-label reveal mb-7 font-akrobat text-[11px] uppercase tracking-[0.14em] flex gap-4 pb-4 border-b border-slate-200/80 text-slate-500 max-md:mb-0 opacity-0 translate-y-6 transition-all duration-750 ease-out [&.is-visible]:opacity-100 [&.is-visible]:translate-y-0">
        <span class="font-bold text-blue-600">05</span> С нами работают
      </div>

      <!-- Section Heading & Subtitle -->
      <div class="partners-head reveal py-8 md:py-12 flex flex-col lg:flex-row lg:items-end justify-between gap-6 opacity-0 translate-y-6 transition-all duration-750 ease-out [&.is-visible]:opacity-100 [&.is-visible]:translate-y-0">
        <div>
          <h2 class="text-5xl md:text-6xl lg:text-[clamp(56px,6vw,96px)] font-bold tracking-tight leading-[0.94] m-0 text-slate-900">
            Нам доверяют.
          </h2>
        </div>
        <p class="text-base md:text-lg text-slate-600 max-w-md m-0 leading-relaxed font-['Onest',sans-serif]">
          Партнёры и ведущие бренды, которые выбирают наши технологии для автоматизации и развития своего бизнеса.
        </p>
      </div>
    </div>

    <!-- Minimalist Floating Glassmorphism Logo Tiles (Spacious Vertical Padding So Glow Never Clips) -->
    <div class="marquee-wrapper relative w-full overflow-hidden reveal py-16 md:py-24 mask-[linear-gradient(to_right,transparent_0%,#000_6%,#000_94%,transparent_100%)] z-10">
      <div class="marquee-track flex gap-8 w-max animate-marquee-left hover:[animation-play-state:paused] px-6 py-6 my-2">
        <!-- Render 3 sets of partners for 100% seamless endless loop -->
        <a
          v-for="(partner, index) in [...partners, ...partners, ...partners]"
          :key="`${partner.id}-${index}`"
          :href="partner.url"
          target="_blank"
          rel="noopener noreferrer"
          class="partner-glass-card shrink-0 w-72 h-48 md:w-96 md:h-60 lg:w-105 lg:h-65 border-0 bg-white/85 backdrop-blur-xl shadow-[0_16px_40px_-15px_rgba(15,23,42,0.06)] hover:shadow-[0_35px_80px_-15px_rgba(37,99,235,0.25)] hover:-translate-y-3 hover:bg-white transition-all duration-500 ease-out group flex items-center justify-center cursor-pointer rounded-2xl p-8 relative text-slate-900 no-underline"
          :title="`Перейти на сайт ${partner.name}`"
        >
          <div
            v-if="partner.id === 'mediok'"
            class="w-full h-full max-w-[80%] max-h-[70%] bg-[#0b49ba] group-hover:bg-[#082d78] transition-all duration-500 ease-out group-hover:scale-108 mask-[url(/partners/mediOk-Logo-white.webp)] mask-contain mask-no-repeat mask-center pointer-events-none"
            :aria-label="partner.name"
          />
          <img
            v-else
            :src="partner.logo"
            :alt="partner.name"
            draggable="false"
            class="w-full h-full max-w-[80%] max-h-[70%] object-contain transition-transform duration-500 ease-out group-hover:scale-108 select-none pointer-events-none filter drop-shadow-[0_2px_8px_rgba(0,0,0,0.04)]"
          >
        </a>
      </div>
    </div>
  </section>
</template>
