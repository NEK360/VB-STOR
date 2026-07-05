import { NextRequest, NextResponse } from 'next/server';
import { sendOrderEmail } from '@/services/email';
import type { OrderFormData } from '@/types';

// Rate limiting простой (в production использовать Redis)
const rateLimitMap = new Map<string, { count: number; timestamp: number }>();

function checkRateLimit(ip: string): boolean {
  const now = Date.now();
  const window = 60 * 1000; // 1 минута
  const maxRequests = 5;

  const record = rateLimitMap.get(ip);
  if (!record || now - record.timestamp > window) {
    rateLimitMap.set(ip, { count: 1, timestamp: now });
    return true;
  }
  if (record.count >= maxRequests) return false;
  record.count++;
  return true;
}

function sanitize(str: string): string {
  return str
    .replace(/<[^>]*>/g, '')
    .replace(/[<>"']/g, '')
    .trim()
    .slice(0, 500);
}

export async function POST(req: NextRequest) {
  try {
    const ip = req.headers.get('x-forwarded-for') ?? 'unknown';

    if (!checkRateLimit(ip)) {
      return NextResponse.json(
        { success: false, message: 'Слишком много запросов. Попробуйте позже.' },
        { status: 429 }
      );
    }

    const body = await req.json();

    // Валидация
    if (!body.name || !body.phone) {
      return NextResponse.json(
        { success: false, message: 'Имя и телефон обязательны' },
        { status: 400 }
      );
    }

    if (!/^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/.test(body.phone.replace(/\s/g, ''))) {
      return NextResponse.json(
        { success: false, message: 'Некорректный номер телефона' },
        { status: 400 }
      );
    }

    const data: OrderFormData = {
      name: sanitize(body.name),
      phone: sanitize(body.phone),
      email: body.email ? sanitize(body.email) : undefined,
      comment: body.comment ? sanitize(body.comment) : undefined,
      productName: body.productName ? sanitize(body.productName) : undefined,
      productId: body.productId ? sanitize(body.productId) : undefined,
      size: body.size ? sanitize(body.size) : undefined,
    };

    const result = await sendOrderEmail(data);

    return NextResponse.json(result, { status: result.success ? 200 : 500 });
  } catch (error) {
    console.error('Contact API error:', error);
    return NextResponse.json(
      { success: false, message: 'Внутренняя ошибка сервера' },
      { status: 500 }
    );
  }
}
