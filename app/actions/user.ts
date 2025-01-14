import { prisma } from "@/lib/db";
import { currentUser } from "@clerk/nextjs/server";

export async function getOrCreateUser(userId: string) {
  const clerkUser = await currentUser();
  if (!clerkUser) {
    throw new Error("User not found");
  }

  return prisma.user.upsert({
    where: { id: userId },
    update: {},
    create: {
      id: userId,
      number: clerkUser.phoneNumbers?.[0]?.phoneNumber,
    },
  });
} 