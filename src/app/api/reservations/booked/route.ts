import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function GET() {
  try {
    const items = await prisma.reservationItem.findMany({
      select: { editionNumber: true }
    });
    const booked = items.map(item => item.editionNumber);
    return NextResponse.json({ booked });
  } catch (error) {
    return NextResponse.json({ booked: [] }, { status: 500 });
  }
}
