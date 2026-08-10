<script setup lang="ts">
import { onMounted, ref } from 'vue'

const isAccepted = ref(true)

onMounted(() => {
  const consent = localStorage.getItem('cookie_consent_accepted')
  if (!consent) {
    isAccepted.value = false
  }
})

function acceptCookie() {
  localStorage.setItem('cookie_consent_accepted', 'true')
  isAccepted.value = true
}
</script>

<template>
  <Transition
    enter-active-class="transition duration-300 ease-out"
    enter-from-class="transform translate-y-8 opacity-0"
    enter-to-class="transform translate-y-0 opacity-100"
    leave-active-class="transition duration-200 ease-in"
    leave-from-class="transform translate-y-0 opacity-100"
    leave-to-class="transform translate-y-8 opacity-0"
  >
    <div
      v-if="!isAccepted"
      class="fixed bottom-5 right-5 left-5 md:left-auto md:max-w-md z-50 p-5 rounded-2xl bg-[#031333]/70 backdrop-blur-xs border border-white/20 text-white shadow-2xl flex flex-col gap-4 font-['Onest',sans-serif]"
      role="region"
      aria-label="Уведомление об использовании куки"
    >
      <div class="flex items-start gap-3">
        <UIcon name="i-lucide-cookie" class="w-6 h-6 text-[#b8d1ff] shrink-0 mt-0.5" />
        <div class="text-xs md:text-sm leading-relaxed text-white/80">
          Мы используем файлы cookie и аналитику для улучшения работы сайта. Продолжая использование сайта, вы соглашаетесь с нашей
          <ULink to="/privacy" class="text-[#b8d1ff] underline hover:text-white transition-colors">Политикой конфиденциальности</ULink>.
        </div>
      </div>
      <div class="flex justify-end gap-3 items-center">
        <UButton
          size="sm"
          color="neutral"
          variant="solid"
          class="rounded-full px-5 py-2 bg-white text-[#04132f] font-semibold hover:bg-white/90 transition-colors"
          @click="acceptCookie"
        >
          Принять
        </UButton>
      </div>
    </div>
  </Transition>
</template>
