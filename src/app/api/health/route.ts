import { NextResponse } from 'next/server';

export async function GET() {
  return NextResponse.json(
    { status: 'OK' },
    { headers: { 'Cache-Control': 'no-store' } }
  );
}
