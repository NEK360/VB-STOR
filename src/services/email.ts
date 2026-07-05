// ============================================================
// VB STORE — EMAIL SERVICE
// Архитектура для подключения SMTP / Resend / EmailJS / Nodemailer
// ============================================================

import type { OrderFormData } from '@/types';

export interface EmailResult {
  success: boolean;
  message: string;
}

// Шаблон письма для заявки
export function buildOrderEmailTemplate(data: OrderFormData): string {
  return `
    <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
      <h2 style="color: #000; border-bottom: 2px solid #000; padding-bottom: 10px;">
        Новая заявка — VB STORE
      </h2>
      
      <table style="width: 100%; border-collapse: collapse;">
        ${data.productName ? `
        <tr>
          <td style="padding: 8px; font-weight: bold; color: #666;">Товар:</td>
          <td style="padding: 8px;">${data.productName}</td>
        </tr>` : ''}
        ${data.size ? `
        <tr>
          <td style="padding: 8px; font-weight: bold; color: #666;">Размер:</td>
          <td style="padding: 8px;">${data.size}</td>
        </tr>` : ''}
        <tr>
          <td style="padding: 8px; font-weight: bold; color: #666;">Имя:</td>
          <td style="padding: 8px;">${data.name}</td>
        </tr>
        <tr>
          <td style="padding: 8px; font-weight: bold; color: #666;">Телефон:</td>
          <td style="padding: 8px;"><a href="tel:${data.phone}">${data.phone}</a></td>
        </tr>
        ${data.email ? `
        <tr>
          <td style="padding: 8px; font-weight: bold; color: #666;">Email:</td>
          <td style="padding: 8px;"><a href="mailto:${data.email}">${data.email}</a></td>
        </tr>` : ''}
        ${data.comment ? `
        <tr>
          <td style="padding: 8px; font-weight: bold; color: #666;">Комментарий:</td>
          <td style="padding: 8px;">${data.comment}</td>
        </tr>` : ''}
        <tr>
          <td style="padding: 8px; font-weight: bold; color: #666;">Дата:</td>
          <td style="padding: 8px;">${new Date().toLocaleString('ru-RU')}</td>
        </tr>
        <tr>
          <td style="padding: 8px; font-weight: bold; color: #666;">Источник:</td>
          <td style="padding: 8px;">VB STORE — сайт</td>
        </tr>
      </table>
    </div>
  `;
}

// Заглушка для отправки — подключить SMTP/Resend/EmailJS по необходимости
export async function sendOrderEmail(data: OrderFormData): Promise<EmailResult> {
  try {
    // TODO: Подключить реальный email-сервис
    // Пример для Nodemailer:
    // const transporter = nodemailer.createTransport({ ... })
    // await transporter.sendMail({ ... })
    
    // Пример для Resend:
    // const resend = new Resend(process.env.RESEND_API_KEY)
    // await resend.emails.send({ ... })

    console.log('Order email would be sent to vbshop456@gmail.com:', data);
    
    return {
      success: true,
      message: 'Заявка успешно отправлена',
    };
  } catch (error) {
    console.error('Email sending error:', error);
    return {
      success: false,
      message: 'Ошибка отправки заявки',
    };
  }
}
