import { NextResponse } from "next/server";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { username, email, password } = body;

    if (
      typeof username !== "string" ||
      typeof email !== "string" ||
      typeof password !== "string"
    ) {
      return NextResponse.json(
        {
          message: "The provided information is invalid.",
        },
        {
          status: 400,
        },
      );
    }

    const response = await fetch(
      `${process.env.STRAPI_URL}/api/auth/local/register`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          username,
          email,
          password,
        }),
      },
    );

    const data = await response.json();

    if (!response.ok) {
      return NextResponse.json(
        {
          message: data?.error?.message || "Registration failed.",
        },
        {
          status: response.status,
        },
      );
    }

    return NextResponse.json({
      message: "Registration successful.",
      user: data.user,
    });
  } catch {
    return NextResponse.json(
      {
        message: "Unable to connect to the server.",
      },
      {
        status: 500,
      },
    );
  }
}