import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
  const placeId = request.nextUrl.searchParams.get("placeId");

  if (!placeId) {
    return NextResponse.json(
      { error: "Missing placeId parameter" },
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
    `https://maps.googleapis.com/maps/api/place/details/json?` +
    `place_id=${encodeURIComponent(
      placeId
    )}&fields=address_component,formatted_address&key=${apiKey}`;

  try {
    const response = await fetch(externalUrl);
    const data = await response.json();

    let zipCode: string | undefined;
    let city: string | undefined;
    let state: string | undefined;

    if (data.result && Array.isArray(data.result.address_components)) {
      for (const comp of data.result.address_components) {
        if (comp.types.includes("postal_code")) zipCode = comp.long_name;
        if (comp.types.includes("locality")) city = comp.long_name;
        if (comp.types.includes("administrative_area_level_1"))
          state = comp.short_name;
      }
    }

    return NextResponse.json({
      zipCode,
      city,
      state,
      formattedAddress: data.result?.formatted_address,
    });
  } catch (error) {
    console.error("Place details proxy error:", error);
    return NextResponse.json(
      { error: "Failed to fetch place details" },
      { status: 500 }
    );
  }
}
