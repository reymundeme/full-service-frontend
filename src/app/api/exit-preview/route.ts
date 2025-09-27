import { draftMode } from "next/headers";
import { NextResponse } from "next/server";

export async function GET(req: Request) {
  // In Next 15, draftMode() is async
  const dm = await draftMode();
  dm.disable();

  // Redirect back to home (or your configured site URL)
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "http://104.248.127.3";
  const url = new URL("/", siteUrl);

  return NextResponse.redirect(url);
}
