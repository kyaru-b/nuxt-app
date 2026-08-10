<script setup lang="ts">
import { onBeforeUnmount, ref } from 'vue'

const isMenuOpen = ref(false)
const navigationItems = [
  { label: 'О нас', to: '#about' },
  { label: 'Услуги', to: '#services' },
  { label: 'Партнёры', to: '#partners' },
  { label: 'Контакты', to: '#contacts' }
]

function toggleMenu() {
  isMenuOpen.value = !isMenuOpen.value
  document.body.classList.toggle('menu-open', isMenuOpen.value)
}
function closeMenu() {
  isMenuOpen.value = false
  document.body.classList.remove('menu-open')
}
onBeforeUnmount(() => document.body.classList.remove('menu-open'))
</script>

<template>
  <UHeader
    id="top"
    :toggle="false"
    class="absolute! top-0! left-0! right-0! z-30! h-auto! bg-transparent! backdrop-blur-none! text-white! border-b! border-(--line-light)! px-[4.5vw]! max-[760px]:px-5!"
    :ui="{
      container: 'grid! grid-cols-[1fr_auto_1fr]! items-center! min-h-[92px]! max-[1100px]:grid-cols-[1fr_auto]! max-[760px]:min-h-[72px]! max-w-none! mx-0! px-0!',
      left: 'block!',
      center: 'block! max-[1100px]:hidden!',
      right: 'flex! items-center! justify-end! gap-3!'
    }"
  >
    <template #left>
      <ULink
        class="inline-flex items-center gap-3 w-max text-2xl font-extrabold tracking-[0.08em] max-[760px]:text-xl"
        to="#top"
        aria-label="Вершина — на главную"
      >
        <img
          class="block w-25 h-20 shrink-0 object-contain"
          src="/vers_logo_white.svg"
          alt="Вершина"
        >
      </ULink>
    </template>

    <UNavigationMenu
      :items="navigationItems"
      color="neutral"
      variant="link"
      class="flex gap-8.5 text-[13px] [&_a]:opacity-[0.74] [&_a]:transition-opacity [&_a]:duration-250 hover:[&_a]:opacity-100 max-[1100px]:hidden"
      aria-label="Основная навигация"
      :ui="{
        root: 'gap-0!',
        list: 'gap-8.5!',
        item: 'py-0!',
        link: 'p-0! gap-0! text-[13px]! font-normal! text-inherit! before:hidden!',
        linkLabel: 'overflow-visible! whitespace-nowrap!'
      }"
    />

    <template #right>
      <div class="flex items-center gap-2 max-[760px]:gap-1.5">
        <!-- Telegram Button -->
        <UButton
          to="https://t.me/vbtec_bot"
          target="_blank"
          rel="noopener noreferrer"
          color="neutral"
          variant="ghost"
          aria-label="Telegram"
          title="Telegram"
          :ui="{
            base: 'inline-flex! items-center! justify-center! p-0!'
          }"
          class="h-9! w-9! rounded-full! bg-white/10! hover:bg-white/20! border! border-white/20! hover:border-white/40! text-white! backdrop-blur-md transition-all duration-300 hover:-translate-y-0.5 hover:shadow-[0_0_12px_rgba(184,209,255,0.35)] max-[480px]:h-8! max-[480px]:w-8!"
        >
          <img src="/telegram-app.png" alt="Telegram" class="w-5 h-5 object-contain brightness-0 invert" />
        </UButton>

        <!-- MAX Button -->
        <UButton
          to="https://max.ru/id0725016632_bot"
          target="_blank"
          rel="noopener noreferrer"
          color="neutral"
          variant="ghost"
          aria-label="MAX"
          title="MAX"
          :ui="{
            base: 'inline-flex! items-center! justify-center! p-0!'
          }"
          class="h-9! w-9! rounded-full! bg-white/10! hover:bg-white/20! border! border-white/20! hover:border-white/40! text-white! backdrop-blur-md transition-all duration-300 hover:-translate-y-0.5 hover:shadow-[0_0_12px_rgba(184,209,255,0.35)] max-[480px]:h-8! max-[480px]:w-8!"
        >
          <img src="/Max_logo.svg" alt="MAX" class="w-5 h-5 object-contain" />
        </UButton>

        <!-- Phone Button -->
        <UButton
          to="tel:88005500207"
          icon="i-lucide-phone"
          label="8 800 550 02 07"
          color="neutral"
          variant="ghost"
          aria-label="Позвонить: 8 800 550 02 07"
          title="8 800 550 02 07"
          :ui="{
            base: 'inline-flex! items-center! justify-center! gap-1.5!',
            leadingIcon: 'w-3.5! h-3.5! shrink-0! text-[#b8d1ff]!',
            label: 'text-[12px]! font-semibold! tracking-wide! max-[640px]:hidden!'
          }"
          class="h-9! px-3.5! rounded-full! bg-white/10! hover:bg-white/20! border! border-white/20! hover:border-white/40! text-white! backdrop-blur-md transition-all duration-300 hover:-translate-y-0.5 hover:shadow-[0_0_12px_rgba(184,209,255,0.35)] max-[640px]:px-2.5!"
        />

        <!-- Email Button -->
        <UButton
          to="mailto:box@vbtec.ru"
          icon="i-lucide-mail"
          label="box@vbtec.ru"
          color="neutral"
          variant="ghost"
          aria-label="Написать: box@vbtec.ru"
          title="box@vbtec.ru"
          :ui="{
            base: 'inline-flex! items-center! justify-center! gap-1.5!',
            leadingIcon: 'w-3.5! h-3.5! shrink-0! text-[#b8d1ff]!',
            label: 'text-[12px]! font-semibold! tracking-wide!'
          }"
          class="h-9! px-3.5! rounded-full! bg-white/10! hover:bg-white/20! border! border-white/20! hover:border-white/40! text-white! backdrop-blur-md transition-all duration-300 hover:-translate-y-0.5 hover:shadow-[0_0_12px_rgba(184,209,255,0.35)] max-[1350px]:hidden!"
        />
      </div>

      <UButton
        color="neutral"
        variant="ghost"
        class="hidden! p-0! rounded-none! bg-transparent! hover:bg-transparent! w-11! h-11! [&_span]:block [&_span]:w-6 [&_span]:h-px [&_span]:bg-white [&_span]:my-1.5 [&_span]:mx-auto [&_span]:transition-all [&_span]:duration-250 max-[1100px]:block!"
        type="button"
        aria-label="Открыть меню"
        :aria-expanded="isMenuOpen"
        @click="toggleMenu"
      >
        <span /><span />
      </UButton>
    </template>
  </UHeader>

  <aside
    class="fixed inset-0 z-25 hidden pt-30 px-6 pb-7.5 bg-(--blue) text-white transition-transform duration-450 ease-[cubic-bezier(0.77,0,0.18,1)] max-[1100px]:block"
    :class="isMenuOpen ? 'translate-y-0' : '-translate-y-full'"
    :aria-hidden="!isMenuOpen"
    @click="closeMenu"
  >
    <UNavigationMenu
      :items="navigationItems"
      orientation="vertical"
      color="neutral"
      variant="link"
      :ui="{
        root: 'block! gap-0!',
        list: 'block! border-t! border-(--line-light)! mb-6!',
        item: 'p-0!',
        link: 'py-[18px]! px-0! gap-0! text-[32px]! font-normal! text-inherit! border-b! border-(--line-light)! before:hidden!',
        linkLabel: 'overflow-visible! whitespace-nowrap!'
      }"
    />
    <div class="mb-6 flex flex-col gap-3.5">
      <div class="flex items-center gap-2.5">
        <UButton
          to="https://t.me/vbtec_bot"
          target="_blank"
          rel="noopener noreferrer"
          color="neutral"
          variant="ghost"
          aria-label="Telegram"
          class="h-11! w-11! p-0! rounded-full! bg-white/15! hover:bg-white/25! border-0! text-white!"
        >
          <img src="/telegram-app.png" alt="Telegram" class="w-6 h-6 object-contain brightness-0 invert" />
        </UButton>

        <UButton
          to="https://max.ru/id0725016632_bot"
          target="_blank"
          rel="noopener noreferrer"
          color="neutral"
          variant="ghost"
          aria-label="MAX"
          class="h-11! w-11! p-0! rounded-full! bg-white/15! hover:bg-white/25! border! border-white/30! text-white!"
        >
          <img src="/Max_logo.svg" alt="MAX" class="w-6 h-6 object-contain" />
        </UButton>
      </div>

      <div class="flex flex-col gap-2 text-[15px] font-medium text-white/90">
        <ULink to="tel:88005500207" class="hover:underline flex items-center gap-2">
          <UIcon name="i-lucide-phone" class="w-4 h-4 text-[#b8d1ff]" />
          <span>8 800 550 02 07</span>
        </ULink>
        <ULink to="mailto:box@vbtec.ru" class="hover:underline flex items-center gap-2">
          <UIcon name="i-lucide-mail" class="w-4 h-4 text-[#b8d1ff]" />
          <span>box@vbtec.ru</span>
        </ULink>
      </div>
    </div>
    <UButton
      color="neutral"
      variant="link"
      class="inline-flex! justify-center! items-center! gap-7! min-h-13! px-5.5! py-0! rounded-full! text-[13px]! font-[650]! text-(--blue)! bg-white! hover:bg-white! transition-all duration-250 hover:-translate-y-0.5"
      to="#contacts"
    >
      Обсудить задачу <span>↗</span>
    </UButton>
  </aside>
</template>
