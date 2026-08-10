<script setup lang="ts">
import { onBeforeUnmount, onMounted, ref } from 'vue'
import PortalBackdrop from '~/components/PortalBackdrop.vue'

const router = useRouter()
const isNavigating = ref(true)
let finishTimer: ReturnType<typeof setTimeout> | undefined

function showPreloader() {
  if (finishTimer) clearTimeout(finishTimer)
  isNavigating.value = true
}

function hidePreloader(delay = 420) {
  if (finishTimer) clearTimeout(finishTimer)
  finishTimer = setTimeout(() => {
    isNavigating.value = false
  }, delay)
}

const removeBeforeHook = router.beforeEach(() => {
  showPreloader()
  return true
})
const removeAfterHook = router.afterEach(() => hidePreloader())

onMounted(() => hidePreloader(560))
onBeforeUnmount(() => {
  removeBeforeHook()
  removeAfterHook()
  if (finishTimer) clearTimeout(finishTimer)
})

useHead({
  title: 'Вершина — бизнес технологии',
  meta: [
    { name: 'viewport', content: 'width=device-width, initial-scale=1' },
    { name: 'theme-color', content: '#041a42' }
  ],
  link: [
    { rel: 'icon', href: '/logo_only_color.svg', type: 'image/svg+xml' },
    { rel: 'preconnect', href: 'https://fonts.googleapis.com' },
    { rel: 'preconnect', href: 'https://fonts.gstatic.com', crossorigin: '' },
    {
      rel: 'stylesheet',
      href: 'https://fonts.googleapis.com/css2?family=Onest:wght@400;500;600;700;800;900&display=swap'
    }
  ],
  htmlAttrs: {
    lang: 'ru'
  },
  bodyAttrs: {
    class: 'vershina-body'
  }
})

useSeoMeta({
  description: 'Цифровые продукты, веб-разработка и технологическое развитие бизнеса.',
  ogTitle: 'Вершина — бизнес технологии',
  ogDescription: 'Цифровые продукты, веб-разработка и технологическое развитие бизнеса.',
  twitterCard: 'summary'
})
</script>

<template>
  <NuxtPage />
  <CookieBanner />

  <Transition
    enter-active-class="transition-[opacity,visibility] duration-300"
    leave-active-class="transition-[opacity,visibility] duration-300"
    enter-from-class="invisible opacity-0"
    leave-to-class="invisible opacity-0"
  >
    <div
      v-if="isNavigating"
      class="fixed inset-0 z-9999 grid place-items-center overflow-hidden bg-[radial-gradient(circle_at_76%_24%,rgba(111,169,255,.2),transparent_22%),linear-gradient(135deg,#04132f_0%,#082d78_58%,#061a3f_100%)] text-white"
      role="status"
      aria-live="polite"
      aria-label="Загрузка страницы"
    >
      <PortalBackdrop />
      <div class="relative z-10 grid w-[min(280px,calc(100vw-48px))] justify-items-center">
        <div class="flex items-center justify-center">
          <img
            class="h-12 w-auto object-contain filter-[drop-shadow(0_0_16px_rgba(169,207,255,.42))]"
            src="/vers_logo_white.svg"
            alt="Вершина"
          >
        </div>
        <div
          class="relative mt-7 h-px w-full overflow-hidden bg-white/20"
          aria-hidden="true"
        >
          <span class="absolute inset-y-0 left-0 w-[46%] animate-preloader bg-linear-to-r from-transparent via-[#dceaff] to-transparent motion-reduce:animate-none" />
        </div>
        <p class="mt-3 text-[9px] uppercase tracking-[.16em] text-white/50">
          Поднимаемся выше
        </p>
      </div>
    </div>
  </Transition>
</template>
