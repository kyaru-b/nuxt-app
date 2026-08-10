<script setup lang="ts">
import { computed, ref } from 'vue'

const serviceData = {
  web: {
    code: 'ВЕБ.01',
    label: 'ВЕБ / Продукт',
    title: 'Цифровой продукт под задачу бизнеса',
    text: 'Проектируем интерфейсы, продуктовую логику, архитектуру и интеграции — от первого прототипа до запуска и развития.'
  },
  custom: {
    code: 'РАЗР.02',
    label: 'РАЗРАБОТКА / Бизнес-системы',
    title: 'Система точно под процессы компании',
    text: 'Разрабатываем внутренние платформы, кабинеты, приложения и модули, когда коробочного решения недостаточно.'
  },
  process: {
    code: 'ИНТ.03',
    label: 'ИНТЕГРАЦИИ / Автоматизация',
    title: 'Сервисы и данные работают вместе',
    text: 'Соединяем программные интерфейсы, корпоративные платформы и внутренние процессы, чтобы убрать ручные операции и разрывы данных.'
  },
  bots: {
    code: 'ИИ.04',
    label: 'ИИ / Боты',
    title: 'Автоматические коммуникации 24/7',
    text: 'Боты отвечают на типовые вопросы, собирают данные, создают обращения и передают сложные случаи сотрудникам.'
  },
  crm: {
    code: 'КЛ.05',
    label: 'КЛИЕНТЫ / Платформы',
    title: 'Корпоративная система как часть продукта',
    text: 'Внедряем и дорабатываем системы управления клиентами и другие платформы тогда, когда они усиливают общую архитектуру решения.'
  },
  support: {
    code: 'ПОД.06',
    label: 'ПОДДЕРЖКА / Развитие',
    title: 'Продукт продолжает развиваться',
    text: 'Поддерживаем пользователей, устраняем сбои, контролируем интеграции и выпускаем новые функции.'
  }
} as const

type ServiceKey = keyof typeof serviceData

const servicesList: Array<{ key: ServiceKey, num: string, title: string, desc: string }> = [
  {
    key: 'web',
    num: '01',
    title: 'Сайты и веб-продукты',
    desc: 'Корпоративные сайты, каталоги, личные кабинеты, порталы и облачные сервисы.'
  },
  {
    key: 'custom',
    num: '02',
    title: 'Разработка бизнес-систем',
    desc: 'Внутренние платформы, кабинеты, приложения и модули под процессы компании.'
  },
  {
    key: 'process',
    num: '03',
    title: 'Интеграции и автоматизация',
    desc: 'Соединяем сервисы, данные и операции в единый управляемый цифровой контур.'
  },
  {
    key: 'bots',
    num: '04',
    title: 'ИИ и боты',
    desc: 'Ассистенты, обработка документов, обращений и другие прикладные сценарии ИИ.'
  },
  {
    key: 'crm',
    num: '05',
    title: 'Системы управления клиентами и корпоративные платформы',
    desc: 'Внедряем и дорабатываем системы, когда они нужны как часть общей архитектуры.'
  },
  {
    key: 'support',
    num: '06',
    title: 'Поддержка и развитие',
    desc: 'Сопровождаем продукт, улучшаем функции и адаптируем его к новым задачам бизнеса.'
  }
]

const activeService = ref<ServiceKey>('web')
const activeServiceData = computed(() => serviceData[activeService.value])
</script>

<template>
  <section
    id="services"
    class="services section-blue relative grid grid-cols-1 min-[1100px]:grid-cols-[minmax(0,1.25fr)_minmax(340px,0.75fr)] gap-x-[6vw] px-[4.5vw] py-[112px] max-md:px-5 max-md:py-[76px] bg-[var(--blue)] text-white"
  >
    <!-- Section 02 Label -->
    <div class="section-label section-label-inverse reveal col-span-full mb-7 font-akrobat text-[11px] uppercase tracking-[0.12em] flex gap-4 pb-4.25 border-b border-[var(--line-light)] max-md:mb-0 opacity-0 translate-y-6 transition-all duration-750 ease-out [&.is-visible]:opacity-100 [&.is-visible]:translate-y-0">
      <span class="opacity-50">02</span> Что мы делаем
    </div>

    <!-- Section Heading -->
    <div class="services-heading reveal col-span-full grid grid-cols-1 md:grid-cols-[1.2fr_0.8fr] items-end gap-[38px] md:gap-[8vw] py-[50px] md:py-[68px] md:pb-[84px] max-md:py-[50px] max-md:pb-[55px] opacity-0 translate-y-6 transition-all duration-750 ease-out [&.is-visible]:opacity-100 [&.is-visible]:translate-y-0">
      <h2 class="text-[49px] md:text-[clamp(50px,5.8vw,90px)] lg:text-[clamp(56px,6.1vw,104px)] font-[650] tracking-tight leading-[0.92] max-md:leading-[0.94] m-0 [&_em]:text-[#b8d1ff] [&_em]:not-italic">
        От идеи до<br><em>работающего продукта.</em>
      </h2>
      <p class="max-w-[450px] m-0 text-white/66 text-sm md:text-base leading-[1.65]">
        Разработка — в центре. Интеграции, автоматизация и корпоративные платформы усиливают продукт
        вокруг неё.
      </p>
    </div>

    <!-- Interactive Services List -->
    <div class="service-list reveal border-t border-[var(--line-light)] opacity-0 translate-y-6 transition-all duration-750 ease-out [&.is-visible]:opacity-100 [&.is-visible]:translate-y-0">
      <article
        v-for="item in servicesList"
        :key="item.key"
        class="service-item grid grid-cols-[38px_1fr_26px] md:grid-cols-[62px_minmax(210px,0.72fr)_1fr_34px] gap-[18px] items-center min-h-[105px] md:min-h-[118px] py-[18px] border-b border-[var(--line-light)] cursor-pointer transition-all duration-300 hover:bg-white/7 hover:px-[18px] [&.is-active]:bg-white/7 [&.is-active]:px-[18px] group"
        :class="{ 'is-active': activeService === item.key }"
        :data-service="item.key"
        @mouseenter="activeService = item.key"
        @click="activeService = item.key"
      >
        <span class="service-number font-akrobat text-[10px] opacity-53">{{ item.num }}</span>
        <h3 class="text-[19px] md:text-[22px] font-semibold tracking-tight m-0 text-white">
          {{ item.title }}
        </h3>
        <p class="hidden md:block m-0 text-[13px] leading-[1.55] text-white/58">
          {{ item.desc }}
        </p>
        <span class="service-arrow justify-self-end text-xl opacity-80 group-hover:opacity-100 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform">↗</span>
      </article>
    </div>

    <!-- Live Preview Sticky Card -->
    <aside
      class="service-preview reveal min-[1100px]:sticky min-[1100px]:top-6 self-start min-h-auto md:min-h-[540px] p-4 text-[var(--ink)] bg-white rounded-[var(--radius)] max-[1100px]:relative max-[1100px]:top-0 max-[1100px]:mt-[46px] opacity-0 translate-y-6 transition-all duration-750 ease-out [&.is-visible]:opacity-100 [&.is-visible]:translate-y-0"
      aria-live="polite"
    >
      <div class="preview-topline flex justify-between p-2 pb-[18px] font-akrobat text-[9px] tracking-[0.1em] text-slate-500 font-medium">
        <span>АКТИВНОЕ НАПРАВЛЕНИЕ</span>
        <span id="preview-code">{{ activeServiceData.code }}</span>
      </div>

      <div
        id="preview-visual"
        class="preview-visual relative h-[225px] md:h-[285px] overflow-hidden bg-gradient-to-br from-[#e8eef7] to-[#d4e1fb] rounded-xl before:content-[''] before:absolute before:inset-0 before:bg-[linear-gradient(rgba(8,45,120,0.11)_1px,transparent_1px),linear-gradient(90deg,rgba(8,45,120,0.11)_1px,transparent_1px)] before:bg-[size:32px_32px]"
      >
        <div class="data-column data-column-a absolute bottom-9 w-[54px] border border-[rgba(8,45,120,0.4)] bg-white/60 shadow-[0_18px_25px_rgba(8,45,120,0.1)] left-[22%] h-[94px]" />
        <div class="data-column data-column-b absolute bottom-9 w-[54px] border border-[rgba(8,45,120,0.4)] bg-white/60 shadow-[0_18px_25px_rgba(8,45,120,0.1)] left-[43%] h-[154px]" />
        <div class="data-column data-column-c absolute bottom-9 w-[54px] border border-[rgba(8,45,120,0.4)] bg-white/60 shadow-[0_18px_25px_rgba(8,45,120,0.1)] left-[64%] h-[212px]" />
        <div class="preview-pulse absolute w-[220px] h-[220px] border border-[rgba(8,45,120,0.28)] rounded-full top-[30px] left-[calc(50%-110px)] animate-[pulse_3s_ease-in-out_infinite]" />
      </div>

      <div
        :key="activeService"
        class="preview-content animate-[preview-content-in_320ms_ease-out] p-[26px_8px_14px]"
      >
        <span id="preview-label" class="font-akrobat text-[10px] text-[var(--blue-2)] uppercase font-semibold tracking-wider">
          {{ activeServiceData.label }}
        </span>
        <h3 id="preview-title" class="my-3.5 text-[25px] md:text-[30px] font-bold leading-[1.08] tracking-tight text-[var(--ink)]">
          {{ activeServiceData.title }}
        </h3>
        <p id="preview-text" class="m-0 text-[var(--muted)] text-[13px] leading-[1.55]">
          {{ activeServiceData.text }}
        </p>
      </div>
    </aside>
  </section>
</template>
