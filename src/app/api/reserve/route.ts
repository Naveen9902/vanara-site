import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { auth } from '@/auth';

export async function POST(request: Request) {
  try {
    const session = await auth();
    if (!session || !session.user || !session.user.email) {
      return NextResponse.json({ error: 'You must be logged in to reserve.' }, { status: 401 });
    }

    const { cartItems, paymentMethod, transactionId } = await request.json();

    if (!cartItems || cartItems.length === 0) {
      return NextResponse.json({ error: 'Cart is empty' }, { status: 400 });
    }

    // Check 1-order limit
    const existingOrder = await prisma.reservation.findFirst({
      where: { userId: (session.user as any).id }
    });

    if (existingOrder) {
      return NextResponse.json({ error: 'Limit exceeded: You have already reserved a piece.' }, { status: 403 });
    }

    const total = cartItems.reduce((sum: number, item: any) => sum + item.price, 0);

    const reservation = await prisma.reservation.create({
      data: {
        name: session.user.name || "Customer",
        email: session.user.email,
        total,
        userId: (session.user as any).id,
        paymentMethod: paymentMethod || null,
        transactionId: transactionId || null,
        items: {
          create: cartItems.map((item: any) => ({
            size: item.size,
            editionNumber: String(item.num),
            price: item.price,
          })),
        },
      },
    });

    return NextResponse.json({ success: true, reservation });
  } catch (error) {
    console.error('Reserve API Error:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}
