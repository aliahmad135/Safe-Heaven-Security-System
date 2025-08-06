import { NextRequest, NextResponse } from "next/server";

export const dynamic = "force-dynamic"; // Always run on server

export async function GET(req: NextRequest) {
  const input = req.nextUrl.searchParams.get("input");

  if (!input) {
    return NextResponse.json(
      { error: "Missing input parameter" },
      { status: 400 }
    );
  }

  const apiKey = process.env.GOOGLE_PLACES_API_KEY;
  if (!apiKey) {
    return NextResponse.json(
      { error: "Google Places API key not configured" },
      { status: 500 }
    );
  }

  const externalUrl =
    `https://maps.googleapis.com/maps/api/place/autocomplete/json?` +
    `input=${encodeURIComponent(
      input
    )}&types=address&components=country:us&key=${apiKey}`;

  try {
    const res = await fetch(externalUrl, {
      headers: { Accept: "application/json" },
      cache: "no-store", // Avoid caching to prevent blank responses
    });

    if (!res.ok) {
      console.error("Google API error:", res.status, await res.text());
      return NextResponse.json(
        { error: "Google API request failed" },
        { status: res.status }
      );
    }

    const data = await res.json();
    console.log("Google API Response:", data); // ✅ Debug

    const suggestions = (data.predictions || []).map((p: any) => ({
      description: p.description,
      placeId: p.place_id,
    }));

    return NextResponse.json({ suggestions });
  } catch (error) {
    console.error("Autocomplete proxy error:", error);
    return NextResponse.json(
      { error: "Failed to fetch suggestions" },
      { status: 500 }
    );
  }
}
