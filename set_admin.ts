import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcryptjs';

const prisma = new PrismaClient();

async function main() {
  const email = 'pagadekallnaveen@gmail.com'; // I'll assume this is the email they want
  const plainPassword = 'Naveen9902';
  const hashedPassword = await bcrypt.hash(plainPassword, 10);

  const user = await prisma.user.upsert({
    where: { email },
    update: { password: hashedPassword },
    create: { email, password: hashedPassword, name: 'Admin' }
  });

  console.log('Admin user ensured:', user.email);
}

main().catch(console.error).finally(() => prisma.$disconnect());
