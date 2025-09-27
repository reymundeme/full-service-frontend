import { draftMode } from "next/headers";
import { NextResponse } from "next/server";

export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url);

    const secret = searchParams.get("secret");
    const slug = searchParams.get("slug") || "/";

    if (secret !== process.env.NEXT_PREVIEW_SECRET) {
      return new NextResponse("Invalid token", { status: 401 });
    }

    // Enable draft mode (async in Next 15)
    const dm = await draftMode();
    dm.enable();

    // Redirect to the actual page on your site
    const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "http://104.248.127.3";
    const url = new URL(slug, siteUrl);

    return NextResponse.redirect(url);
  } catch (err) {
    console.error("Preview error:", err);
    return new NextResponse("Internal Server Error", { status: 500 });
  }
}
