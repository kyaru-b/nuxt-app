import { z } from 'zod'

const leadSchema = z.object({
  name: z.string().trim().min(1, 'Укажите ваше имя').max(200, 'Имя слишком длинное'),
  email: z.string().trim().min(1, 'Укажите ваш E-mail').email('Укажите корректный E-mail').max(200, 'E-mail слишком длинный'),
  phone: z.string().trim().min(1, 'Укажите ваш телефон').refine((val) => {
    const digits = val.replace(/\D/g, '')
    return (digits.length === 11 && (digits.startsWith('7') || digits.startsWith('8'))) ||
           (digits.length === 10 && digits.startsWith('9'))
  }, { message: 'Укажите корректный номер телефона (начиная с +7 или 8, например +7 999 123-45-67)' }),
  message: z.string().max(3000, 'Сообщение не должно превышать 3000 символов').optional().default(''),
  agree: z.literal(true, { message: 'Необходимо подтвердить согласие на обработку персональных данных' })
})

export default defineEventHandler(async (event) => {
  const config = useRuntimeConfig()
  const webhookUrl = (config.bitrixWebhookUrl as string) || 'https://b24-dev7.bitrix24.ru/rest/1/k3wu1bp00k34rst1/'
  const formattedWebhookUrl = webhookUrl.endsWith('/') ? webhookUrl : `${webhookUrl}/`

  const body = await readBody(event)

  const parseResult = leadSchema.safeParse(body)
  if (!parseResult.success) {
    const firstError = parseResult.error.issues[0]?.message || 'Ошибка валидации данных'
    throw createError({
      statusCode: 400,
      statusMessage: firstError
    })
  }

  const { name, email, phone, message } = parseResult.data

  const rawDigits = phone.replace(/\D/g, '')
  const formattedPhone = rawDigits.length === 11
    ? `+7 (${rawDigits.slice(1, 4)}) ${rawDigits.slice(4, 7)}-${rawDigits.slice(7, 9)}-${rawDigits.slice(9, 11)}`
    : rawDigits.length === 10
      ? `+7 (${rawDigits.slice(0, 3)}) ${rawDigits.slice(3, 6)}-${rawDigits.slice(6, 8)}-${rawDigits.slice(8, 10)}`
      : phone

  const leadFields = {
    TITLE: `Заявка с сайта (Вершина) — ${name}`,
    NAME: name,
    PHONE: [{ VALUE: formattedPhone, VALUE_TYPE: 'WORK' }],
    EMAIL: [{ VALUE: email, VALUE_TYPE: 'WORK' }],
    COMMENTS: `Email: ${email}\nТелефон: ${formattedPhone}\nСообщение:\n${message || '—'}`,
    SOURCE_ID: 'WEB'
  }

  try {
    const response = await $fetch<{ result?: number; error?: string; error_description?: string }>(
      `${formattedWebhookUrl}crm.lead.add.json`,
      {
        method: 'POST',
        body: { fields: leadFields }
      }
    )

    if (response.error) {
      throw new Error(response.error_description || response.error)
    }

    return {
      success: true,
      leadId: response.result
    }
  } catch (err: any) {
    console.error('Bitrix24 Lead Creation Error:', err)
    throw createError({
      statusCode: 500,
      statusMessage: 'Произошла ошибка при сохранении заявки. Попробуйте позже.'
    })
  }
})
