<template>
  <div
    class="marquee [overflow:hidden] [color:var(--white)] [background:var(--ink)] [border-top:1px_solid_rgba(255,_255,_255,_.12)] [border-bottom:1px_solid_rgba(255,_255,_255,_.12)]"
    aria-hidden="true"
  >
    <div class="marquee-track [display:flex] [width:max-content] font-akrobat [font-size:11px] [letter-spacing:.1em] [animation:marquee_110s_linear_infinite] [will-change:transform]">
      <div
        v-for="set in 2"
        :key="set"
        class="marquee-set [display:flex] [flex:0_0_auto]"
      >
        <span
          v-for="copy in 5"
          :key="copy"
          class="marquee-item [flex:0_0_auto] [padding:13px_0] [white-space:nowrap]"
        >ПОРТАЛЫ × ЛИЧНЫЕ КАБИНЕТЫ × ВНУТРЕННИЕ СИСТЕМЫ × ИНТЕГРАЦИИ × ИИ × ВЕБ-ПРОДУКТЫ × САЙТЫ ×&nbsp;</span>
      </div>
    </div>
  </div>
</template>
