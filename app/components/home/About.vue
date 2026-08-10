<template>
  <section
    id="about"
    class="about section-light [background:var(--paper)] [&_h2]:[margin:0] [&_h2]:[font-size:clamp(56px,_6.1vw,_104px)] [&_h2]:[line-height:.92] [&_h2]:[letter-spacing:-.064em] [&_h2]:[font-weight:650] [padding:112px_4.5vw] [&_h2]:[font-size:clamp(50px,_5.6vw,_86px)] [&_h2_em]:[color:var(--blue-2)] max-[760px]:[&_h2]:[font-size:49px] max-[760px]:[&_h2]:[line-height:.94] max-[760px]:[padding:76px_20px]"
  >
    <div class="section-label reveal [margin:0_0_28px] font-akrobat [font-size:11px] [letter-spacing:.12em] [text-transform:uppercase] [display:flex] [gap:16px] [padding-bottom:17px] [border-bottom:1px_solid_var(--line)] [&_span]:[opacity:.5] max-[760px]:[margin-bottom:0] [opacity:0] [transform:translateY(24px)] [transition:opacity_.75s_ease,_transform_.75s_cubic-bezier(.22,_1,_.36,_1)] [&.is-visible]:[opacity:1] [&.is-visible]:[transform:none]">
      <span>01</span> Кто мы
    </div>
    <div class="about-layout [display:grid] [grid-template-columns:1.25fr_.75fr] [gap:9vw] [align-items:end] [padding:70px_0_90px] max-[760px]:[grid-template-columns:1fr] max-[760px]:[gap:38px] max-[760px]:[padding:50px_0_55px]">
      <h2 class="reveal [opacity:0] [transform:translateY(24px)] [transition:opacity_.75s_ease,_transform_.75s_cubic-bezier(.22,_1,_.36,_1)] [&.is-visible]:[opacity:1] [&.is-visible]:[transform:none]">
        Команда, которая соединяет<br><em>бизнес и технологии.</em>
      </h2>
      <div class="about-copy reveal [&_p]:[margin:0_0_34px] [&_p]:[font-size:17px] [&_p]:[line-height:1.7] [&_p]:[color:var(--muted)] [opacity:0] [transform:translateY(24px)] [transition:opacity_.75s_ease,_transform_.75s_cubic-bezier(.22,_1,_.36,_1)] [&.is-visible]:[opacity:1] [&.is-visible]:[transform:none]">
        <p>
          «Вершина — Бизнес Технологии» — команда разработчиков,
          аналитиков, дизайнеров, тестировщиков и системных инженеров. Мы изучаем бизнес,
          проектируем цифровой продукт и отвечаем за его развитие после запуска.
        </p>
        <ULink
          class="text-link text-link-dark [display:inline-flex] [align-items:center] [gap:16px] [font-size:12px] [border-bottom:1px_solid_rgba(255,_255,_255,_.35)] [padding-bottom:7px] [border-color:rgba(7,_17,_31,_.3)]"
          to="#services"
        >Наши компетенции <span>↘</span></ULink>
      </div>
    </div>
    <div class="about-facts reveal [display:grid] [grid-template-columns:repeat(4,_1fr)] [border-top:1px_solid_var(--line)] [border-bottom:1px_solid_var(--line)] [&>div]:[min-height:210px] [&>div]:[display:flex] [&>div]:[flex-direction:column] [&>div]:[padding:24px_24px_30px_0] [&>div]:[border-right:1px_solid_var(--line)] [&>div:not(:first-child)]:[padding-left:24px] [&>div:last-child]:[border-right:0] [&_span]:font-akrobat [&_span]:[font-size:10px] [&_span]:[opacity:.46] [&_strong]:[margin:auto_0_14px] [&_strong]:[font-size:20px] [&_small]:[max-width:210px] [&_small]:[color:var(--muted)] [&_small]:[line-height:1.5] max-[760px]:[grid-template-columns:1fr_1fr] max-[760px]:[&>div]:[min-height:175px] max-[760px]:[&>div]:![padding:18px] max-[760px]:[&>div]:[border-bottom:1px_solid_var(--line)] max-[760px]:[&>div:nth-child(2)]:[border-right:0] [opacity:0] [transform:translateY(24px)] [transition:opacity_.75s_ease,_transform_.75s_cubic-bezier(.22,_1,_.36,_1)] [&.is-visible]:[opacity:1] [&.is-visible]:[transform:none]">
      <div><span>01 /</span><strong>Анализ</strong><small>разбираем задачу и текущие процессы</small></div>
      <div><span>02 /</span><strong>Проектирование</strong><small>формируем архитектуру и сценарии</small></div>
      <div><span>03 /</span><strong>Разработка</strong><small>создаём, интегрируем и тестируем</small></div>
      <div><span>04 /</span><strong>Поддержка</strong><small>развиваем систему после запуска</small></div>
    </div>
  </section>
</template>
