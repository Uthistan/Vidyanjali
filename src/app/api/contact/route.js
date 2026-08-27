import { NextResponse } from "next/server";

export async function POST(request) {
  try {
    const data = await request.json();

    // basic validation
    if (!data?.parentName || !data?.email) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
    }

    // TODO: wire to email service, CRM, or other backend
    // For now just log and return success so the frontend can show confirmation.
    console.log("Contact submission:", data);

    return NextResponse.json({ ok: true });
  } catch (err) {
    console.error(err);
    return NextResponse.json({ error: "Invalid request" }, { status: 400 });
  }
}
