import { NextResponse } from 'next/server';
import { getLeads, updateLeadStatus, deleteLead } from '@/lib/db';

export async function GET() {
  try {
    const leads = await getLeads();
    return NextResponse.json({ leads });
  } catch (error) {
    return NextResponse.json({ error: 'Lấy dữ liệu thất bại' }, { status: 500 });
  }
}

export async function PATCH(request: Request) {
  try {
    const { id, status } = await request.json();
    if (!id || !status) {
      return NextResponse.json({ error: 'Thiếu thông tin id hoặc status' }, { status: 400 });
    }
    const success = await updateLeadStatus(id, status);
    return NextResponse.json({ success });
  } catch (error) {
    return NextResponse.json({ error: 'Cập nhật thất bại' }, { status: 500 });
  }
}

export async function DELETE(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const id = searchParams.get('id');
    if (!id) {
      return NextResponse.json({ error: 'Thiếu ID' }, { status: 400 });
    }
    const success = await deleteLead(id);
    return NextResponse.json({ success });
  } catch (error) {
    return NextResponse.json({ error: 'Xóa thất bại' }, { status: 500 });
  }
}
