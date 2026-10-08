import { NextResponse } from "next/server";

export async function GET() {
  try {
    const response = await fetch(
      `${process.env.STRAPI_URL}/api/products?populate=*`,
      {
        next: {
          revalidate: 300,
        },
      },
    );

    if (!response.ok) {
      return NextResponse.json(
        {
          message: "Failed to fetch products.",
        },
        {
          status: response.status,
        },
      );
    }

    const data = await response.json();

    return NextResponse.json(data);
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