// google-maps.ts - Fully client-side for static export

export interface AddressSuggestion {
  description: string;
  placeId: string;
  zipCode?: string;
  city?: string;
  state?: string;
}

// Legacy static mock data kept for offline fallback
const fallbackAddresses: AddressSuggestion[] = [
  {
    description: "123 Main Street, Charlotte, NC 28202",
    placeId: "mock1",
    zipCode: "28202",
    city: "Charlotte",
    state: "NC",
  },
  {
    description: "456 Oak Avenue, Raleigh, NC 27601",
    placeId: "mock2",
    zipCode: "27601",
    city: "Raleigh",
    state: "NC",
  },
  {
    description: "789 Pine Road, Columbia, SC 29201",
    placeId: "mock3",
    zipCode: "29201",
    city: "Columbia",
    state: "SC",
  },
  {
    description: "321 Elm Street, Atlanta, GA 30309",
    placeId: "mock4",
    zipCode: "30309",
    city: "Atlanta",
    state: "GA",
  },
  {
    description: "654 Maple Drive, Miami, FL 33101",
    placeId: "mock5",
    zipCode: "33101",
    city: "Miami",
    state: "FL",
  },
  {
    description: "987 Cedar Lane, Birmingham, AL 35201",
    placeId: "mock6",
    zipCode: "35201",
    city: "Birmingham",
    state: "AL",
  },
  {
    description: "147 Birch Court, Nashville, TN 37201",
    placeId: "mock7",
    zipCode: "37201",
    city: "Nashville",
    state: "TN",
  },
];

/**
 * Fetch address suggestions directly from Google Places API
 */
export async function getAddressSuggestions(
  input: string
): Promise<AddressSuggestion[]> {
  try {
    if (!input) return [];

    const res = await fetch(
      `/api/maps/autocomplete?input=${encodeURIComponent(input)}`
    );
    if (!res.ok) throw new Error(`Bad response: ${res.status}`);

    const data = await res.json();
    return (data.suggestions || []).slice(0, 5);
  } catch (err) {
    console.warn("Falling back to static address suggestions:", err);
    return fallbackAddresses
      .filter(
        (addr) =>
          addr.description.toLowerCase().includes(input.toLowerCase()) ||
          (addr.zipCode || "").includes(input)
      )
      .slice(0, 5);
  }
}

/**
 * Fetch place details via our internal proxy route. Falls back to static data
 * (for offline development) if the request fails.
 */
export async function getPlaceDetails(placeId: string): Promise<{
  zipCode?: string;
  city?: string;
  state?: string;
  formattedAddress?: string;
}> {
  try {
    const res = await fetch(
      `/api/maps/details?placeId=${encodeURIComponent(placeId)}`
    );
    if (!res.ok) throw new Error(`Bad response: ${res.status}`);
    return await res.json();
  } catch (err) {
    console.warn("Falling back to static place details:", err);
    const match = fallbackAddresses.find((a) => a.placeId === placeId);
    return match
      ? {
          zipCode: match.zipCode,
          city: match.city,
          state: match.state,
          formattedAddress: match.description,
        }
      : {};
  }
}
