import { NextResponse } from 'next/server';
import { getServices, addService, updateService, deleteService } from '@/lib/db';

export async function GET() {
  try {
    const services = await getServices();
    return NextResponse.json({ services });
  } catch (error) {
    return NextResponse.json({ error: 'Lấy dữ liệu thất bại' }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const service = await addService(body);
    return NextResponse.json({ success: true, service }, { status: 201 });
  } catch (error) {
    return NextResponse.json({ error: 'Thêm dịch vụ thất bại' }, { status: 500 });
  }
}

export async function PUT(request: Request) {
  try {
    const body = await request.json();
    const { id, ...data } = body;
    const updated = await updateService(id, data);
    return NextResponse.json({ success: true, service: updated });
  } catch (error) {
    return NextResponse.json({ error: 'Cập nhật dịch vụ thất bại' }, { status: 500 });
  }
}

export async function DELETE(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const id = searchParams.get('id');
    if (!id) return NextResponse.json({ error: 'Thiếu ID' }, { status: 400 });
    const success = await deleteService(id);
    return NextResponse.json({ success });
  } catch (error) {
    return NextResponse.json({ error: 'Xóa thất bại' }, { status: 500 });
  }
}
