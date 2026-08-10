<script setup lang="ts">
import { onBeforeUnmount, onMounted } from 'vue'

let revealObserver: IntersectionObserver | undefined

onMounted(() => {
  revealObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible')
          revealObserver?.unobserve(entry.target)
        }
      })
    },
    { threshold: 0.12, rootMargin: '0px 0px -40px' }
  )

  document.querySelectorAll<HTMLElement>('.reveal').forEach((element) => {
    revealObserver?.observe(element)
  })
})

onBeforeUnmount(() => {
  revealObserver?.disconnect()
  document.body.classList.remove('menu-open')
})
</script>

<template>
  <div class="home-page [--blue:#082d78] [--blue-2:#0b49ba] [--blue-3:#6ea0ff] [--ink:#07111f] [--paper:#f3f5f7] [--white:#ffffff] [--line:rgba(7,_17,_31,_0.15)] [--line-light:rgba(255,_255,_255,_0.18)] [--muted:#596474] [--radius:18px] [&_*]:[box-sizing:border-box] [scroll-behavior:smooth] [margin:0] [color:var(--ink)] [background:var(--paper)] [font-family:'Onest',_Arial,_Helvetica,_sans-serif] [-webkit-font-smoothing:antialiased] [&_a]:[color:inherit] [&_a]:[text-decoration:none] [&_button]:[font:inherit] [&_input]:[font:inherit] [&_textarea]:[font:inherit] [&_button]:[color:inherit] [&_h1_em]:[font-family:'Onest',_Arial,_sans-serif] [&_h1_em]:[font-weight:700] [&_h1_em]:[letter-spacing:-.055em] [&_h1_em]:[font-style:normal] [&_h2_em]:[font-family:'Onest',_Arial,_sans-serif] [&_h2_em]:[font-weight:700] [&_h2_em]:[letter-spacing:-.055em] [&_h2_em]:[font-style:normal]">
    <div
      class="noise [position:fixed] [inset:0] [z-index:100] [pointer-events:none] [opacity:.022]"
      aria-hidden="true"
    />
    <HomeHeader />
    <UMain :ui="{ base: '!min-h-0' }">
      <HomeHero />
      <HomeMarquee />
      <HomeAbout />
      <HomeServices />
      <HomeProduct />
      <HomeSupport />
      <HomePartners />
    </UMain>
    <HomeFooter />
  </div>
</template>
