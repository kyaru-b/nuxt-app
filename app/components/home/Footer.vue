<template>
  <UFooter
    id="contacts"
    class="site-footer relative overflow-hidden px-[4.5vw] py-5 text-white border-t border-blue-400/34 bg-[radial-gradient(circle_at_82%_36%,rgba(146,188,255,0.14),transparent_12%),linear-gradient(135deg,#04132f_0%,#082d78_55%,#071a3f_100%)] [&::before]:hidden [&>*]:relative [&>*]:z-10"
    :ui="{
      container: '!block !max-w-none !mx-0 !p-0',
      left: '!hidden',
      center: '!block !m-0',
      right: '!hidden'
    }"
  >
    <div class="footer-grid grid grid-cols-1 md:grid-cols-[1.5fr_repeat(3,1fr)] py-8.5 gap-7 md:gap-0">
      <!-- Address Column -->
      <div class="flex flex-col min-h-0 md:min-h-[108px] pb-5 md:pb-0 md:pr-7 border-b md:border-b-0 md:border-r border-white/16">
        <span class="font-akrobat text-[9px] uppercase tracking-wider text-white/50">Адрес и реквизиты</span>
        <p class="mt-4.5 text-xs md:text-sm leading-relaxed text-white/90">
          360030, г. Нальчик,<br>ул. Вовчок, д. 10, 4 этаж<br>
          <span class="text-[11px] text-white/60">ИНН: 0725016632 / ОГРН: 1150725000570</span>
        </p>
      </div>

      <!-- Contacts Column -->
      <div class="flex flex-col min-h-0 md:min-h-[108px] pb-5 md:pb-0 md:px-7 border-b md:border-b-0 md:border-r border-white/16">
        <span class="font-akrobat text-[9px] uppercase tracking-wider text-white/50">Контакты</span>
        <p class="mt-4.5 text-xs md:text-sm leading-relaxed text-white/90">
          <ULink to="tel:88005500207" class="hover:text-[#b8d1ff] transition-colors">8 800 550 02 07</ULink><br>
          <ULink to="mailto:box@vbtec.ru" class="hover:text-[#b8d1ff] transition-colors">box@vbtec.ru</ULink>
        </p>
      </div>

      <!-- Navigation Column -->
      <div class="flex flex-col min-h-0 md:min-h-[108px] pb-5 md:pb-0 md:px-7 border-b md:border-b-0 md:border-r border-white/16">
        <span class="font-akrobat text-[9px] uppercase tracking-wider text-white/50">Навигация</span>
        <p class="mt-4.5 text-xs md:text-sm leading-relaxed text-white/90">
          <ULink to="#about" class="hover:text-[#b8d1ff] transition-colors">О нас</ULink><br>
          <ULink to="#services" class="hover:text-[#b8d1ff] transition-colors">Услуги</ULink><br>
          <ULink to="#partners" class="hover:text-[#b8d1ff] transition-colors">Партнёры</ULink>
        </p>
      </div>

      <!-- Socials Column -->
      <div class="flex flex-col min-h-0 md:min-h-[108px] md:pl-7">
        <span class="font-akrobat text-[9px] uppercase tracking-wider text-white/50">Соцсети</span>
        <p class="mt-4.5 text-xs md:text-sm leading-relaxed text-white/90">
          <ULink
            to="https://t.me/vbtec_bot"
            target="_blank"
            rel="noreferrer"
            class="hover:text-[#b8d1ff] transition-colors"
          >Телеграм ↗</ULink><br>
          <ULink
            to="https://max.ru/id0725016632_bot"
            target="_blank"
            rel="noreferrer"
            class="hover:text-[#b8d1ff] transition-colors"
          >MAX ↗</ULink>
        </p>
      </div>
    </div>

    <!-- Bottom Bar -->
    <div class="footer-bottom flex flex-wrap justify-between items-center gap-3 pt-5 border-t border-white/16 font-akrobat text-[10px] text-white/50">
      <div class="flex items-center gap-4">
        <span>© ООО СТК «ВЕРШИНА»</span>
        <ULink to="/privacy" class="hover:text-white transition-colors underline">
          Политика конфиденциальности
        </ULink>
      </div>
      <div>
        <span>ВЕРШИНА / 2026</span>
      </div>
    </div>
  </UFooter>
</template>
