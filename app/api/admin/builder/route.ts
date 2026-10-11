import { NextResponse } from 'next/server';
import { getPageConfig, updatePageConfig } from '@/lib/db';

export async function GET() {
  try {
    const config = await getPageConfig();
    return NextResponse.json({ config });
  } catch (error) {
    return NextResponse.json({ error: 'Lấy cấu hình thất bại' }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const config = await updatePageConfig(body);
    return NextResponse.json({ success: true, config });
  } catch (error) {
    return NextResponse.json({ error: 'Cập nhật cấu hình thất bại' }, { status: 500 });
  }
}
