import { NextResponse } from 'next/server';
import { getPosts, addPost, deletePost } from '@/lib/db';

export async function GET() {
  try {
    const posts = await getPosts();
    return NextResponse.json({ posts });
  } catch (error) {
    return NextResponse.json({ error: 'Lấy dữ liệu thất bại' }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const post = await addPost(body);
    return NextResponse.json({ success: true, post }, { status: 201 });
  } catch (error) {
    return NextResponse.json({ error: 'Thêm bài viết thất bại' }, { status: 500 });
  }
}

export async function DELETE(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const id = searchParams.get('id');
    if (!id) return NextResponse.json({ error: 'Thiếu ID' }, { status: 400 });
    const success = await deletePost(id);
    return NextResponse.json({ success });
  } catch (error) {
    return NextResponse.json({ error: 'Xóa bài viết thất bại' }, { status: 500 });
  }
}
