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

    const dm = await draftMode();
    dm.enable();

    // ✅ Allow redirect to any page (home, page, childpage, etc.)
    const path = slug === "/home" ? "/" : slug;

    return NextResponse.redirect(
      new URL(path, process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000")
    );
  } catch (err) {
    console.error("Preview error:", err);
    return new NextResponse("Internal Server Error", { status: 500 });
  }
}
