// next.js app/api/preview/route.ts
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

    // Await the draftMode() function to get the object
    const dm = await draftMode();
    dm.enable();

    // The key change is here: construct the redirect URL with a full path
    const url = new URL(slug, req.url);
    
    return NextResponse.redirect(url);
  } catch (err) {
    console.error("Preview error:", err);
    return new NextResponse("Internal Server Error", { status: 500 });
  }
}