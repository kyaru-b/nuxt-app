<template>
  <section class="web-focus section-light bg-(--paper) text-(--ink) px-[4.5vw] py-28 max-md:px-5 max-md:py-19">
    <!-- Section Label -->
    <div class="section-label reveal mb-7 font-akrobat text-[11px] tracking-[.12em] uppercase flex gap-4 pb-4.25 border-b border-(--line) [&_span]:opacity-50 max-md:mb-0 opacity-0 translate-y-6 transition-all duration-750 ease-out [&.is-visible]:opacity-100 [&.is-visible]:translate-y-0">
      <span>03</span> Веб-разработка
    </div>

    <!-- Web Focus Grid -->
    <div class="web-focus-grid grid grid-cols-1 min-[1100px]:grid-cols-[0.8fr_1.2fr] gap-[7vw] items-center pt-17.5 max-md:pt-12.5">
      <!-- Left Copy -->
      <div class="web-focus-copy">
        <h2 class="reveal m-0 text-[clamp(50px,5.4vw,82px)] leading-[0.92] tracking-[-0.064em] font-[650] [&_em]:text-(--blue-2) [&_em]:not-italic max-md:text-[49px] max-md:leading-[0.94] opacity-0 translate-y-6 transition-all duration-750 ease-out [&.is-visible]:opacity-100 [&.is-visible]:translate-y-0">
          Не просто код.<br><em>Рабочий продукт для бизнеса.</em>
        </h2>
        <p class="reveal max-w-142.5 my-8 text-(--muted) text-base leading-relaxed opacity-0 translate-y-6 transition-all duration-750 ease-out [&.is-visible]:opacity-100 [&.is-visible]:translate-y-0">
          Создаём продуктовую логику, интерфейс и техническую архитектуру.
          Разрабатываем публичную часть, кабинеты, панели управления и интеграции с корпоративными системами.
        </p>
        <UButton
          color="neutral"
          variant="link"
          class="button button-primary reveal inline-flex! justify-center! items-center! gap-7! min-h-13! px-5.5! py-0! rounded-full! text-[13px]! font-[650]! text-white! bg-(--blue-2)! hover:bg-(--blue)! transition-all duration-250 hover:-translate-y-0.5 opacity-0 translate-y-6 [&.is-visible]:opacity-100 [&.is-visible]:translate-y-0"
          to="#partners"
        >
          Запустить продукт <span class="inline-block">↗</span>
        </UButton>
      </div>

      <!-- Right Product Cards Stack -->
      <div class="product-stack reveal relative min-h-162.5 max-[1100px]:mt-5 max-md:min-h-130 opacity-0 translate-y-6 transition-all duration-750 ease-out [&.is-visible]:opacity-100 [&.is-visible]:translate-y-0">
        <div class="product-card-group absolute right-0 top-12.5 w-[78%] max-md:w-[92%] max-md:top-12.5">
          
          <!-- Main Product UCard -->
          <UCard
            :ui="{
              root: 'relative z-1 w-full rounded-2xl overflow-hidden border border-(--line) bg-(--white) shadow-[0_30px_65px_rgba(7,17,31,0.10)] rotate-2 transition-transform duration-300 ring-0!',
              body: 'p-0!'
            }"
          >
            <!-- Browser Top Bar -->
            <div class="browser-bar flex items-center gap-1.75 h-12 px-3.5 bg-[#edf1f7] border-b border-(--line)">
              <i class="w-1.75 h-1.75 rounded-full bg-[#9aa6b7] not-italic inline-block" />
              <i class="w-1.75 h-1.75 rounded-full bg-[#9aa6b7] not-italic inline-block" />
              <i class="w-1.75 h-1.75 rounded-full bg-[#9aa6b7] not-italic inline-block" />
              <span class="mx-auto text-[#7d8999] font-akrobat text-[9px]">продукт.вбтех.рф</span>
            </div>

            <!-- Product Screen -->
            <div class="product-screen min-h-107.5 p-9.5 text-white bg-[linear-gradient(135deg,#051638,#0d4fbf)] max-md:min-h-82.5 max-md:p-6.5">
              <span class="screen-label font-akrobat text-[9px] tracking-[.12em] opacity-70 block uppercase mb-14 max-md:mb-10">ЦИФРОВОЙ ПРОДУКТ / 01</span>
              <h3 class="my-14 text-[42px] leading-[1.02] tracking-tighter font-semibold max-md:my-10 max-md:text-[31px]">
                Веб-сервис<br>для ежедневной работы
              </h3>
              <div class="screen-grid grid grid-cols-3 gap-2.5">
                <span class="h-14 border border-white/22 bg-white/6 rounded-md" />
                <span class="h-14 border border-white/22 bg-white/6 rounded-md" />
                <span class="h-14 border border-white/22 bg-white/6 rounded-md" />
                <span class="h-14 border border-white/22 bg-white/6 rounded-md" />
                <span class="h-14 border border-white/22 bg-white/6 rounded-md" />
                <span class="h-14 border border-white/22 bg-white/6 rounded-md" />
              </div>
            </div>
          </UCard>

          <!-- Floating Small UCard 01 -->
          <UCard
            :ui="{
              root: 'absolute z-2 -left-[105px] -top-[55px] -rotate-4 w-[200px] h-[170px] rounded-xl border border-(--line) bg-(--white) shadow-[0_30px_65px_rgba(7,17,31,0.10)] max-md:w-[145px] max-md:h-[125px] max-md:-left-[15px] max-md:-top-[45px] transition-transform duration-300 hover:scale-105 ring-0!',
              body: 'p-5! h-full flex flex-col justify-between max-md:p-3.75!'
            }"
          >
            <span class="text-base leading-tight font-medium text-(--ink) max-md:text-[13px]">Корпоративные сайты</span>
            <b class="self-end font-akrobat text-[11px] text-(--blue-2) max-md:text-[10px]">01</b>
          </UCard>

          <!-- Floating Small UCard 02 -->
          <UCard
            :ui="{
              root: 'absolute z-2 -left-[90px] -bottom-[15px] rotate-3 w-[200px] h-[170px] rounded-xl border border-(--line) bg-(--white) shadow-[0_30px_65px_rgba(7,17,31,0.10)] max-md:w-[145px] max-md:h-[125px] max-md:-left-[15px] max-md:-bottom-[10px] transition-transform duration-300 hover:scale-105 ring-0!',
              body: 'p-5! h-full flex flex-col justify-between max-md:p-3.75!'
            }"
          >
            <span class="text-base leading-tight font-medium text-(--ink) max-md:text-[13px]">Личные кабинеты</span>
            <b class="self-end font-akrobat text-[11px] text-(--blue-2) max-md:text-[10px]">02</b>
          </UCard>

          <!-- Floating Small UCard 03 -->
          <UCard
            :ui="{
              root: 'absolute z-2 -right-[25px] -bottom-[45px] -rotate-3 w-[200px] h-[170px] rounded-xl border border-(--line) bg-(--white) shadow-[0_30px_65px_rgba(7,17,31,0.10)] max-md:w-[145px] max-md:h-[125px] max-md:-right-[10px] max-md:-bottom-[30px] transition-transform duration-300 hover:scale-105 ring-0!',
              body: 'p-5! h-full flex flex-col justify-between max-md:p-3.75!'
            }"
          >
            <span class="text-base leading-tight font-medium text-(--ink) max-md:text-[13px]">Каталоги и порталы</span>
            <b class="self-end font-akrobat text-[11px] text-(--blue-2) max-md:text-[10px]">03</b>
          </UCard>

        </div>
      </div>
    </div>
  </section>
</template>
