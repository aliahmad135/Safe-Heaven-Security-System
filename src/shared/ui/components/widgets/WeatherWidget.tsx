'use client';

import { useState, useEffect } from 'react';
import { Cloud, Sun, CloudRain, CloudSnow, Wind } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { getWeatherData, getWeatherMessage, WeatherData } from '@/lib/weather-api';

interface WeatherWidgetProps {
  zipCode?: string;
  className?: string;
}

export function WeatherWidget({ zipCode = '27601', className = '' }: WeatherWidgetProps) {
  const [weather, setWeather] = useState<WeatherData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchWeather = async () => {
      try {
        setLoading(true);
        setError(null);


        const weatherData = await getWeatherData(zipCode);
        setWeather(weatherData);
      } catch (err) {
        setError('Unable to fetch weather data');
        console.error('Weather fetch error:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchWeather();
  }, [zipCode]);

  const getWeatherIcon = (condition: string) => {
    switch (condition) {
      case 'clear':
        return <Sun className="w-8 h-8 text-yellow-500" />;
      case 'clouds':
        return <Cloud className="w-8 h-8 text-gray-500" />;
      case 'rain':
        return <CloudRain className="w-8 h-8 text-blue-500" />;
      case 'snow':
        return <CloudSnow className="w-8 h-8 text-blue-200" />;
      default:
        return <Sun className="w-8 h-8 text-yellow-500" />;
    }
  };

  if (loading) {
    return (
      <Card className={`animate-pulse ${className}`}>
        <CardContent className="p-4">
          <div className="flex items-center space-x-4">
            <div className="w-8 h-8 bg-gray-200 rounded-full"></div>
            <div className="flex-1 space-y-2">
              <div className="h-4 bg-gray-200 rounded w-3/4"></div>
              <div className="h-3 bg-gray-200 rounded w-1/2"></div>
            </div>
          </div>
        </CardContent>
      </Card>
    );
  }

  if (error || !weather) {
    return null; // Hide widget if weather data unavailable
  }

  return (
    <Card className={`bg-gradient-to-br from-blue-50 to-blue-100 border-blue-200 ${className}`}>
      <CardContent className="p-4">
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center space-x-3">
            {getWeatherIcon(weather.condition)}
            <div>
              <div className="text-2xl font-bold text-gray-900">
                {weather.temperature}°F
              </div>
              <div className="text-sm text-gray-600 capitalize">
                {weather.description}
              </div>
            </div>
          </div>
          <div className="text-right">
            <div className="text-sm font-medium text-gray-900">
              {weather.location}
            </div>
            <div className="text-xs text-gray-600">
              {new Date().toLocaleDateString()}
            </div>
          </div>
        </div>

        <div className="flex items-center justify-between text-xs text-gray-600 mb-3">
          <div className="flex items-center space-x-1">
            <Wind className="w-3 h-3" />
            <span>{weather.windSpeed} mph</span>
          </div>
          <div>Humidity: {weather.humidity}%</div>
        </div>

        <div className="text-sm text-blue-800 font-medium">
          {getWeatherMessage(weather.condition, weather.temperature)}
        </div>
      </CardContent>
    </Card>
  );
}