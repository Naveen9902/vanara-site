import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import nodemailer from 'nodemailer';
import fs from 'fs';
import path from 'path';

export async function POST(request: Request) {
  try {
    const { email } = await request.json();

    if (!email || !email.includes('@')) {
      return NextResponse.json({ error: 'Invalid email address' }, { status: 400 });
    }
    
    const normalizedEmail = email.toLowerCase();

    // Clean up old tokens for this email
    await prisma.verificationToken.deleteMany({
      where: { identifier: normalizedEmail }
    });

    // Generate 6-digit OTP
    const otp = Math.floor(100000 + Math.random() * 900000).toString();
    const expires = new Date(Date.now() + 10 * 60 * 1000); // 10 minutes

    await prisma.verificationToken.create({
      data: {
        identifier: normalizedEmail,
        token: otp,
        expires
      }
    });

    // Set up nodemailer
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
      to: normalizedEmail,
      subject: 'Your Vanara Login Code',
      text: `Your login code is: ${otp}\n\nThis code will expire in 10 minutes.`,
      html: `
        <div style="font-family: monospace; max-width: 400px; margin: 0 auto; padding: 20px; border: 1px solid #EAE4D6; background: #0A1417; color: #EAE4D6; text-align: center;">
          <h2 style="color: #7FA3AC; letter-spacing: 2px;">VANARA</h2>
          <p>Your authentication code is:</p>
          <h1 style="font-size: 32px; letter-spacing: 5px; margin: 20px 0;">${otp}</h1>
          <p style="font-size: 12px; color: #A9A398;">This code expires in 10 minutes.</p>
        </div>
      `,
    };

    if (process.env.EMAIL_SERVER_PASSWORD) {
      await transporter.sendMail(mailOptions);
    } else {
      // Dev mode fallback if they haven't set up the password yet
      console.log('---------------------------------------------------------');
      console.log(`✉️ OTP INTERCEPTED (DEV MODE - NO SMTP PASSWORD SET)`);
      console.log(`To: ${normalizedEmail}`);
      console.log(`Code: ${otp}`);
      console.log('---------------------------------------------------------');
      
      // Write to a file so the user can easily see it locally!
      if (process.env.NODE_ENV !== 'production') {
        fs.writeFileSync(path.join(process.cwd(), "otp.txt"), `Your OTP Code for ${normalizedEmail}:\n\n${otp}\n\n(Note: To actually send this via email, you must add your Gmail App Password to the .env file!)`);
      }
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('OTP Send Error:', error);
    return NextResponse.json({ error: 'Failed to send OTP' }, { status: 500 });
  }
}
