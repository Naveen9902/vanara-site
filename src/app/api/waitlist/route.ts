import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import nodemailer from 'nodemailer';

export async function POST(request: Request) {
  try {
    const { email } = await request.json();

    if (!email) {
      return NextResponse.json({ error: 'Email is required' }, { status: 400 });
    }

    const entry = await prisma.waitlist.upsert({
      where: { email },
      update: {},
      create: { email },
    });

    // Send a welcome email using Nodemailer
    const transporter = nodemailer.createTransport({
      host: process.env.EMAIL_SERVER_HOST || 'smtp.gmail.com',
      port: Number(process.env.EMAIL_SERVER_PORT) || 465,
      secure: true, 
      auth: {
        user: process.env.EMAIL_SERVER_USER,
        pass: process.env.EMAIL_SERVER_PASSWORD,
      },
    });

    const mailOptions = {
      from: process.env.EMAIL_FROM || '"Vanara Records" <noreply@vanara.example.com>',
      to: email,
      subject: 'Welcome to the Record',
      html: `
        <div style="font-family: monospace; max-width: 400px; margin: 0 auto; padding: 20px; border: 1px solid #EAE4D6; background: #0A1417; color: #EAE4D6; text-align: center;">
          <h2 style="color: #7FA3AC; letter-spacing: 2px;">VANARA</h2>
          <p>You have been added to the record.</p>
          <p style="margin: 20px 0; color: #A9A398; font-size: 14px;">We will notify you immediately when new editions are released. Thank you for helping us honor what has been lost.</p>
          <p style="font-size: 12px; color: #7FA3AC; letter-spacing: 1px;">WEAR MEMORIES. PROTECT TOMORROW.</p>
        </div>
      `,
    };

    if (process.env.EMAIL_SERVER_PASSWORD) {
      await transporter.sendMail(mailOptions);
    }

    return NextResponse.json({ success: true, entry });
  } catch (error) {
    console.error('Waitlist API Error:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}
