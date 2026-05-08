import { revalidateTag } from 'next/cache';
import { NextResponse } from 'next/server';

export async function POST(request) {
  const secret = request.nextUrl.searchParams.get('secret');

  if (secret !== process.env.REVALIDATE_SECRET) {
    return NextResponse.json({ error: 'Invalid secret' }, { status: 401 });
  }

  revalidateTag('strapi', 'max');
  return NextResponse.json({ revalidated: true });
}
