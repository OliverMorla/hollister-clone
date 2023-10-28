import { NextRequest, NextResponse } from "next/server";
import { getToken } from "next-auth/jwt";

export async function GET(req: NextRequest) {
  const token = await getToken({ req, secret: process.env.OAUTH_SECRET! });

  return NextResponse.json(
    {
      ok: true,
      message: "API Successfully running!",
      user: token,
    },
    { status: 200 }
  );
}
