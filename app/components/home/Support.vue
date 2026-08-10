<script setup lang="ts">
import { reactive, ref, computed, onMounted, onUnmounted } from 'vue'
import { vMaska } from 'maska/vue'

const countries = [
  { code: 'RU', dial: '+7', mask: '+7 (###) ###-##-##', placeholder: '+7 (___) ___-__-__' },
  { code: 'KZ', dial: '+7', mask: '+7 (###) ###-##-##', placeholder: '+7 (___) ___-__-__' },
  { code: 'BY', dial: '+375', mask: '+375 (##) ###-##-##', placeholder: '+375 (__) ___-__-__' },
  { code: 'AM', dial: '+374', mask: '+374 (##) ##-##-##', placeholder: '+374 (__) __-__-__' },
  { code: 'AZ', dial: '+994', mask: '+994 (##) ###-##-##', placeholder: '+994 (__) ___-__-__' },
  { code: 'UZ', dial: '+998', mask: '+998 (##) ###-##-##', placeholder: '+998 (__) ___-__-__' },

]

const flagSvgs: Record<string, string> = {
  RU: `<svg viewBox="0 0 640 480" class="w-5 h-3.5 rounded-xs shrink-0 object-cover shadow-xs border border-white/20"><rect width="640" height="160" fill="#ffffff"/><rect y="160" width="640" height="160" fill="#0039a6"/><rect y="320" width="640" height="160" fill="#d52b1e"/></svg>`,
  KZ: `<svg viewBox="0 0 640 480" class="w-5 h-3.5 rounded-xs shrink-0 object-cover shadow-xs border border-white/20"><rect width="640" height="480" fill="#00afca"/><circle cx="320" cy="240" r="75" fill="#fec50c"/><path d="M 220 340 Q 320 280 420 340 Q 320 310 220 340 Z" fill="#fec50c"/></svg>`,
  BY: `<svg viewBox="0 0 640 480" class="w-5 h-3.5 rounded-xs shrink-0 object-cover shadow-xs border border-white/20"><rect width="640" height="320" fill="#d22630"/><rect y="320" width="640" height="160" fill="#00964b"/><rect width="80" height="480" fill="#ffffff"/><path d="M40 0 L80 40 L40 80 L0 40 Z M40 80 L80 120 L40 160 L0 120 Z M40 160 L80 200 L40 240 L0 200 Z M40 240 L80 280 L40 320 L0 280 Z M40 320 L80 360 L40 400 L0 360 Z" fill="#d22630"/></svg>`,
  AM: `<svg viewBox="0 0 640 480" class="w-5 h-3.5 rounded-xs shrink-0 object-cover shadow-xs border border-white/20"><rect width="640" height="160" fill="#d90012"/><rect y="160" width="640" height="160" fill="#0033a0"/><rect y="320" width="640" height="160" fill="#f2a800"/></svg>`,
  AZ: `<svg viewBox="0 0 640 480" class="w-5 h-3.5 rounded-xs shrink-0 object-cover shadow-xs border border-white/20"><rect width="640" height="160" fill="#00b5e2"/><rect y="160" width="640" height="160" fill="#ef3340"/><rect y="320" width="640" height="160" fill="#509e2f"/><circle cx="305" cy="240" r="42" fill="#ffffff"/><circle cx="317" cy="240" r="34" fill="#ef3340"/><polygon points="338,240 343,244 341,238 346,235 340,235 338,229 336,235 330,235 335,238 333,244" fill="#ffffff"/></svg>`,
  UZ: `<svg viewBox="0 0 640 480" class="w-5 h-3.5 rounded-xs shrink-0 object-cover shadow-xs border border-white/20"><rect width="640" height="150" fill="#0099b5"/><rect y="150" width="640" height="10" fill="#ce1126"/><rect y="160" width="640" height="160" fill="#ffffff"/><rect y="320" width="640" height="10" fill="#ce1126"/><rect y="330" width="640" height="150" fill="#1eb53a"/><circle cx="80" cy="75" r="28" fill="#ffffff"/><circle cx="92" cy="75" r="23" fill="#0099b5"/></svg>`,
}

const selectedCountry = ref(countries[0]!)
const showDropdown = ref(false)
const phoneMask = computed(() => selectedCountry.value.mask)
const phoneInputRef = ref<HTMLInputElement | null>(null)

function selectCountry(c: typeof countries[number]) {
  selectedCountry.value = c
  state.phone = ''
  showDropdown.value = false
  if (phoneInputRef.value) {
    phoneInputRef.value.setCustomValidity('')
  }
}

function closeDropdown(e: MouseEvent) {
  const target = e.target as HTMLElement
  if (!target.closest('.phone-country-select')) showDropdown.value = false
}

onMounted(() => document.addEventListener('click', closeDropdown))
onUnmounted(() => document.removeEventListener('click', closeDropdown))

const state = reactive({
  name: '',
  email: '',
  phone: '',
  message: '',
  agree: false
})

const statusMessage = ref('')
const isSuccess = ref(false)
const isSubmitting = ref(false)

const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

function validateEmail(email: string): boolean {
  return emailRegex.test(email.trim())
}

function validatePhone(phone: string): boolean {
  const digits = phone.replace(/\D/g, '')
  return digits.length >= 10 && digits.length <= 15
}

function onPhoneInput(e: Event) {
  const target = e.target as HTMLInputElement
  target.setCustomValidity('')
}

function onPhoneInvalid(e: Event) {
  const target = e.target as HTMLInputElement
  if (!state.phone.trim()) {
    target.setCustomValidity('Укажите ваш номер телефона.')
  } else if (!validatePhone(state.phone)) {
    target.setCustomValidity('Укажите корректный номер телефона.')
  }
}

async function handleSubmit() {
  statusMessage.value = ''
  isSuccess.value = false
  if (phoneInputRef.value) {
    phoneInputRef.value.setCustomValidity('')
  }

  if (!state.name.trim()) {
    statusMessage.value = 'Укажите ваше имя.'
    return
  }

  if (!state.email.trim()) {
    statusMessage.value = 'Укажите ваш E-mail.'
    return
  }

  if (!validateEmail(state.email)) {
    statusMessage.value = 'Укажите корректный E-mail (например, name@domain.com).'
    return
  }

  if (!state.phone.trim()) {
    statusMessage.value = 'Укажите ваш телефон.'
    if (phoneInputRef.value) {
      phoneInputRef.value.setCustomValidity('Укажите ваш номер телефона.')
      phoneInputRef.value.reportValidity()
    }
    return
  }

  if (!validatePhone(state.phone)) {
    statusMessage.value = 'Укажите корректный номер телефона (начиная с +7 или 8, например +7 999 123-45-67).'
    if (phoneInputRef.value) {
      phoneInputRef.value.setCustomValidity('Укажите корректный номер телефона.')
      phoneInputRef.value.reportValidity()
    }
    return
  }

  if (!state.agree) {
    statusMessage.value = 'Необходимо подтвердить согласие на обработку персональных данных.'
    return
  }

  isSubmitting.value = true

  try {
    const res = await $fetch<{ success: boolean; leadId?: number }>('/api/save-request', {
      method: 'POST',
      body: {
        name: state.name,
        email: state.email,
        phone: state.phone,
        message: state.message,
        agree: state.agree
      }
    })

    if (res.success) {
      isSuccess.value = true
      statusMessage.value = 'Спасибо! Ваша заявка успешно отправлена. Мы свяжемся с вами в ближайшее время.'
      state.name = ''
      state.email = ''
      state.phone = ''
      state.message = ''
      state.agree = false
    }
  } catch (err: any) {
    // Безопасная локализованная обработка ошибок — технические детали (404, 500, stack trace) не попадают на фронтенд
    const statusCode = err.statusCode || err.response?.status || err.data?.statusCode
    const statusMsg = err.data?.statusMessage || err.statusMessage

    if (statusCode === 400 && statusMsg) {
      statusMessage.value = statusMsg
    } else {
      statusMessage.value = 'Не удалось отправить заявку. Пожалуйста, попробуйте позже или свяжитесь с нами по телефону 8 800 550 02 07.'
    }
  } finally {
    isSubmitting.value = false
  }
}
</script>

<template>
  <section
    id="contacts"
    class="request section-dark text-white relative overflow-hidden px-[4.5vw] py-28 max-md:px-5 max-md:py-19 bg-[radial-gradient(circle_at_82%_36%,rgba(146,188,255,0.12),transparent_25%),linear-gradient(135deg,#04132f_0%,#082d78_55%,#071a3f_100%)]!"
  >
    <!-- Background Glow Effect -->
    <div
      class="request-glow absolute w-175 h-175 -right-62.5 -bottom-75 rounded-full bg-[radial-gradient(circle,rgba(56,122,255,0.15),transparent_68%)] pointer-events-none"
      aria-hidden="true"
    />

    <!-- Section Label -->
    <div
      class="section-label section-label-inverse reveal mb-7 font-akrobat text-[11px] tracking-[.12em] uppercase flex gap-4 pb-4.25 border-b border-white/18 [&_span]:opacity-50 max-md:mb-0 opacity-0 translate-y-6 transition-all duration-750 ease-out [&.is-visible]:opacity-100 [&.is-visible]:translate-y-0"
    >
      <span>04</span> Новый проект
    </div>

    <!-- Request Layout -->
    <div class="request-layout relative grid grid-cols-1 min-[1100px]:grid-cols-[0.85fr_1.15fr] gap-[9vw] pt-17.5 max-md:gap-9.5 max-md:py-12.5">
      <!-- Left Copy -->
      <div class="request-copy">
        <h2 class="reveal m-0 text-[clamp(54px,5.8vw,88px)] leading-[0.92] tracking-[-0.06em] font-[650] [&_em]:text-[#b8d1ff] [&_em]:not-italic max-md:text-[49px] max-md:leading-[0.94] opacity-0 translate-y-6 transition-all duration-750 ease-out [&.is-visible]:opacity-100 [&.is-visible]:translate-y-0">
          Расскажите,<br><em>что нужно создать.</em>
        </h2>
        <p class="reveal max-w-135 mt-7 text-white/72 text-lg leading-relaxed max-sm:mt-5 max-sm:text-base opacity-0 translate-y-6 transition-all duration-750 ease-out [&.is-visible]:opacity-100 [&.is-visible]:translate-y-0">
          Разберём вашу задачу, подберём оптимальный стек и архитектуру, подготовим предварительную оценку и предложим понятный следующий шаг.
        </p>
      </div>

      <!-- Right Form -->
      <UForm
        :state="state"
        class="request-form reveal p-9! border! border-white/18! bg-[#031333]/70! backdrop-blur-xl! shadow-[0_24px_50px_rgba(3,15,41,0.5)]! rounded-[20px]! max-md:p-6! opacity-0 translate-y-6 transition-all duration-750 ease-out [&.is-visible]:opacity-100 [&.is-visible]:translate-y-0"
        @submit.prevent="handleSubmit"
      >
        <UFormField
          label="КАК ВАС ЗОВУТ"
          name="name"
          class="block! mb-7! [&_label]:block! [&_label]:mb-2.5! [&_label]:font-akrobat [&_label]:text-[11px]! [&_label]:uppercase! [&_label]:tracking-[.12em]! [&_label]:text-[#b8d1ff]! [&_label]:font-bold!"
        >
          <UInput
            v-model="state.name"
            autocomplete="name"
            placeholder="Имя"
            required
            variant="none"
            class="w-full! px-0! py-2.5! text-white! [&_input]:text-white! bg-transparent! border-0! border-b! border-white/25! focus:border-[#6ea0ff]! rounded-none! shadow-none! placeholder:text-white/60! focus:ring-0! transition-colors"
            :ui="{ input: 'text-white! placeholder:text-white/60!' }"
          />
        </UFormField>

        <UFormField
          label="E-MAIL"
          name="email"
          class="block! mb-7! [&_label]:block! [&_label]:mb-2.5! [&_label]:font-akrobat [&_label]:text-[11px]! [&_label]:uppercase! [&_label]:tracking-[.12em]! [&_label]:text-[#b8d1ff]! [&_label]:font-bold!"
        >
          <UInput
            v-model="state.email"
            type="email"
            autocomplete="email"
            placeholder="name@domain.com"
            required
            variant="none"
            class="w-full! px-0! py-2.5! text-white! [&_input]:text-white! bg-transparent! border-0! border-b! border-white/25! focus:border-[#6ea0ff]! rounded-none! shadow-none! placeholder:text-white/60! focus:ring-0! transition-colors"
            :ui="{ input: 'text-white! placeholder:text-white/60!' }"
          />
        </UFormField>

        <UFormField
          label="ТЕЛЕФОН"
          name="phone"
          class="block! mb-7! [&_label]:block! [&_label]:mb-2.5! [&_label]:font-akrobat [&_label]:text-[11px]! [&_label]:uppercase! [&_label]:tracking-[.12em]! [&_label]:text-[#b8d1ff]! [&_label]:font-bold!"
        >
          <div class="phone-country-select relative flex items-center border-b border-white/25 focus-within:border-[#6ea0ff] transition-colors">
            <button
              type="button"
              class="flex items-center gap-2 pr-2.5 py-2.5 text-sm cursor-pointer bg-transparent border-none text-white/80 hover:text-white transition-colors shrink-0"
              @click="showDropdown = !showDropdown"
            >
              <span class="inline-flex items-center shrink-0" v-html="flagSvgs[selectedCountry.code]" />
              <svg class="w-3 h-3 opacity-60 transition-transform" :class="{ 'rotate-180': showDropdown }" viewBox="0 0 12 12" fill="none"><path d="M3 4.5L6 7.5L9 4.5" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/></svg>
            </button>
            <div
              v-if="showDropdown"
              class="absolute left-0 top-full mt-1 z-50 min-w-48 rounded-xl border border-white/15 bg-[rgba(8,45,120,0.95)] backdrop-blur-2xl shadow-[0_16px_40px_rgba(0,0,0,0.5)] py-1.5 overflow-hidden"
            >
              <button
                v-for="c in countries"
                :key="c.code"
                type="button"
                class="flex items-center gap-2.5 w-full px-3 py-2 text-sm text-white/90 hover:bg-white/10 cursor-pointer bg-transparent border-none transition-colors"
                :class="{ 'bg-white/8 text-white': c.code === selectedCountry.code }"
                @click="selectCountry(c)"
              >
                <span class="inline-flex items-center shrink-0" v-html="flagSvgs[c.code]" />
                <span class="opacity-70">{{ c.code }}</span>
                <span class="ml-auto opacity-50 text-xs">{{ c.dial }}</span>
              </button>
            </div>
            <input
              ref="phoneInputRef"
              v-model="state.phone"
              v-maska="phoneMask"
              type="tel"
              autocomplete="tel"
              :placeholder="selectedCountry.placeholder"
              required
              class="flex-1 bg-transparent border-none outline-none text-white py-2.5 text-[0.95rem] placeholder:text-white/40 focus:ring-0"
              @input="onPhoneInput"
              @invalid="onPhoneInvalid"
            >
          </div>
        </UFormField>

        <UFormField
          label="ЧТО НУЖНО СДЕЛАТЬ"
          name="message"
          class="block! mb-7! [&_label]:block! [&_label]:mb-2.5! [&_label]:font-akrobat [&_label]:text-[11px]! [&_label]:uppercase! [&_label]:tracking-[.12em]! [&_label]:text-[#b8d1ff]! [&_label]:font-bold!"
        >
          <UTextarea
            v-model="state.message"
            autoresize
            :rows="2"
            :maxrows="5"
            maxlength="3000"
            placeholder="Коротко опишите задачу"
            variant="none"
            class="w-full! px-0! py-2.5! text-white! [&_textarea]:text-white! bg-transparent! border-0! border-b! border-white/25! focus:border-[#6ea0ff]! rounded-none! shadow-none! placeholder:text-white/60! focus:ring-0! transition-colors"
            :ui="{ textarea: 'text-white! placeholder:text-white/60!' }"
          />
        </UFormField>

        <div class="mb-7">
          <UCheckbox
            v-model="state.agree"
            name="agree"
            required
            color="neutral"
            :ui="{
              base: 'rounded border-white/40 bg-white/10 text-[#6ea0ff] data-[state=checked]:bg-[#6ea0ff] data-[state=checked]:border-[#6ea0ff] data-[state=checked]:text-[#04132f] focus-visible:ring-[#6ea0ff]',
              control: 'border-white/40 bg-white/10 rounded data-[state=checked]:bg-[#6ea0ff] data-[state=checked]:border-[#6ea0ff]',
              icon: 'text-[#04132f] font-bold w-4 h-4',
              indicator: 'bg-[#6ea0ff] text-[#04132f]',
              label: 'text-xs text-white/80 font-normal leading-relaxed cursor-pointer select-none'
            }"
          >
            <template #label>
              <span>
                Я даю согласие на обработку персональных данных в соответствии с
                <ULink to="/privacy" target="_blank" class="text-[#b8d1ff] underline hover:text-white transition-colors">
                  Политикой конфиденциальности
                </ULink>
              </span>
            </template>
          </UCheckbox>
        </div>

        <div class="form-footer flex justify-between gap-7.5 items-center max-md:flex-col max-md:items-start">
          <p class="max-w-82.5 m-0 text-[11px] leading-[1.45] text-white/70">
            Заявка будет обработана в соответствии с ФЗ-152 «О персональных данных».
          </p>

          <UButton
            type="submit"
            color="neutral"
            variant="link"
            class="button button-light inline-flex! items-center! gap-2! px-6! py-3.5! rounded-full! bg-white! hover:bg-white! text-[#0c3a8e]! font-bold! text-[13px]! transition-all duration-250 hover:-translate-y-0.5"
            :loading="isSubmitting"
          >
            <span>Отправить</span>
            <span class="inline-block transition-transform duration-200">↗</span>
          </UButton>
        </div>

        <div
          v-if="statusMessage"
          class="form-status min-h-4.5 mt-4.5 text-xs font-medium"
          :class="isSuccess ? 'text-emerald-400' : 'text-red-400'"
          role="status"
        >
          {{ statusMessage }}
        </div>
      </UForm>
    </div>
  </section>
</template>

