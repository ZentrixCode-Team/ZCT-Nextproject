import { NextResponse } from 'next/server';

export async function POST(request) {
  try {
    const body = await request.json();
    const strapiUrl = process.env.NEXT_PUBLIC_STRAPI_URL;

    if (!strapiUrl) {
      return NextResponse.json(
        { message: "آدرس Strapi در متغیرهای محیطی تعریف نشده است." },
        { status: 500 }
      );
    }


    const response = await fetch(`${strapiUrl}/api/auth/local/register`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        username: body.username,
        email: body.email,
        password: body.password,
      }),
    });

    const data = await response.json();


    if (!response.ok) {
      return NextResponse.json(
        { message: data.error?.message || "خطا در ثبت‌نام" },
        { status: response.status }
      );
    }

    
    return NextResponse.json(data, { status: 200 });

  } catch (error) {
    console.error("خطای سرور در ثبت‌نام:", error);
    return NextResponse.json(
      { message: "خطای داخلی سرور" },
      { status: 500 }
    );
  }
}