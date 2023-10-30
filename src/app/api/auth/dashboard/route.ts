import { NextRequest, NextResponse, userAgent } from "next/server";
import { getToken } from "next-auth/jwt";
import prisma from "@/lib/prisma";

export async function GET(req: NextRequest) {
  const isAuthenticated = await getToken({
    req,
    secret: process.env.OAUTH_SECRET,
  });

  if (isAuthenticated) {
    try {
      const user = await prisma.users.findUnique({
        where: {
          email: isAuthenticated.email!,
        },
      });

      if (user)
        return NextResponse.json(
          {
            ok: true,
            user: user,
            message: "Successfully fetched user",
          },
          {
            status: 200,
          }
        );
    } catch (err) {
      return NextResponse.json(
        {
          ok: false,
          message: "Failed to fetch user",
          error: err instanceof Error ? err.message : "Internal Server Error",
        },
        {
          status: 500,
        }
      );
    }
  }
}
