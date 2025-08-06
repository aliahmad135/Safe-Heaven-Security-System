import { NextRequest, NextResponse } from 'next/server';
import { getWeatherData } from '@/lib/weather-api';

export async function GET(request: NextRequest) {
  try {
    const url = new URL(request.url);
    const zipCode = url.searchParams.get('zip') || '27601';

    const weatherData = await getWeatherData(zipCode);
    
    if (!weatherData) {
      return NextResponse.json(
        { error: 'Weather data not available' },
        { status: 404 }
      );
    }

    return NextResponse.json({
      temperature: weatherData.temperature,
      condition: weatherData.condition,
      description: weatherData.description,
      humidity: weatherData.humidity,
      windSpeed: weatherData.windSpeed,
      location: weatherData.location,
      icon: weatherData.icon,
      timestamp: new Date().toISOString(),
    });

  } catch (error) {
    console.error('Weather API error:', error);
    return NextResponse.json(
      { error: 'Failed to fetch weather data' },
      { status: 500 }
    );
  }
}