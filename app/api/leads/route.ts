import { NextResponse } from 'next/server';
import { addLead } from '@/lib/db';

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { name, email, phone, company, service, message } = body;

    if (!name || !phone || !message) {
      return NextResponse.json(
        { error: 'Vui lòng điền đầy đủ họ tên, số điện thoại và nội dung yêu cầu.' },
        { status: 400 }
      );
    }

    const lead = await addLead({
      name: name.trim(),
      email: (email || '').trim(),
      phone: phone.trim(),
      company: (company || '').trim(),
      service: service || '',
      message: message.trim()
    });

    return NextResponse.json({ success: true, lead }, { status: 201 });
  } catch (error) {
    console.error('Lead submission error:', error);
    return NextResponse.json({ error: 'Đã xảy ra lỗi máy chủ.' }, { status: 500 });
  }
}
