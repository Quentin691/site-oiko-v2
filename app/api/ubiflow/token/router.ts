import { NextResponse } from "next/server";

export async function POST() {
  try {
    const response = await fetch("https://auth.ubiflow.net/api/login_check", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        username: process.env.UBIFLOW_USERNAME,
        password: process.env.UBIFLOW_PASSWORD,
      }),
    });

    const data = await response.json();
    return NextResponse.json({ token: data.token });
  } catch (error) {
    return NextResponse.json({ error: "Auth failed" }, { status: 500 });
  }
}