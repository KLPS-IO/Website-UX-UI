import { useEffect, useState } from "react";
import { TrendingDown, TrendingUp, Ruler } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';
import { Progress } from './ui/progress';
import { API_BASE } from '@/config/api';

export function BodyScanPage() {

  const [waistValue, setWaistValue] = useState<number | null>(null);

useEffect(() => {

  async function fetchWaist() {

    try {

      const response = await fetch(
        `${API_BASE}/api/waist`
      );

      const data = await response.json();

      if (data.length > 0) {

        const latest =
          data[data.length - 1];

        setWaistValue(
          Number(latest.waist_value)
        );

      }

    } catch (error) {

      console.error(
        "Fetch waist failed:",
        error
      );

    }

  }

  fetchWaist();

  const interval =
    setInterval(fetchWaist, 5000);

  return () =>
    clearInterval(interval);

}, []);

const measurements = [

  {
    label: "Waist",
    current:
      waistValue !== null
        ? waistValue
        : "--",
    previous: 34.15,
    unit: "in",
    change: -4.1
  },

  // {
  //   label: "Chest",
  //   current: 38.5,
  //   previous: 38.2,
  //   unit: "in",
  //   change: 0.8
  // },

  // {
  //   label: "Arms",
  //   current: 13.2,
  //   previous: 12.8,
  //   unit: "in",
  //   change: 3.1
  // },

  // {
  //   label: "Thighs",
  //   current: 22.1,
  //   previous: 22.8,
  //   unit: "in",
  //   change: -3.1
  // },

  {
    label: "Hips",
    current: 36.8,
    previous: 37.5,
    unit: "in",
    change: -1.9
  }

];

  const bodyComposition = [
    { label: 'Body Fat', value: 18.5, target: 15, unit: '%', color: 'pink' },
    { label: 'Muscle Mass', value: 68.2, target: 70, unit: '%', color: 'green' },
    { label: 'Water', value: 62.5, target: 65, unit: '%', color: 'purple' },
  ];

  

  return (
    <div className="space-y-6 pb-20">
      <div className="space-y-2">
        <h1 className="text-3xl text-purple-900">Body Scan</h1>
        <p className="text-gray-600">Track your body measurements</p>
      </div>

      <Tabs defaultValue="measurements" className="w-full">
        <TabsList className="grid w-full grid-cols-2 bg-purple-100">
          <TabsTrigger value="measurements">Measurements</TabsTrigger>
          <TabsTrigger value="composition">Composition</TabsTrigger>
        </TabsList>

        <TabsContent value="measurements" className="space-y-4 mt-4">
          <Card className="border-purple-100 shadow-sm">
            <CardHeader>
              <CardTitle className="text-purple-900">Latest Scan</CardTitle>
              <p className="text-sm text-gray-600">October 3, 2025</p>
            </CardHeader>
            <CardContent className="space-y-4">
              {measurements.map((item, index) => (
                <div key={index} className="space-y-2">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-xl bg-purple-100 text-purple-600 flex items-center justify-center">
                        <Ruler className="w-5 h-5" />
                      </div>
                      <div>
                        <p className="text-gray-900">{item.label}</p>
                        <p className="text-xs text-gray-500">Previous: {item.previous} {item.unit}</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="text-xl text-purple-900">{item.current} {item.unit}</p>
                      <div className={`flex items-center gap-1 text-xs ${item.change < 0 ? 'text-green-600' : 'text-pink-600'}`}>
                        {item.change < 0 ? <TrendingDown className="w-3 h-3" /> : <TrendingUp className="w-3 h-3" />}
                        {Math.abs(item.change)}%
                      </div>
                    </div>
                  </div>
                  {index < measurements.length - 1 && <div className="border-b border-purple-100"></div>}
                </div>
              ))}
            </CardContent>
          </Card>

          <Card className="border-purple-100 shadow-sm">
            <CardContent className="pt-6">
              <div className="aspect-square bg-gradient-to-br from-purple-50 to-pink-50 rounded-2xl flex items-center justify-center">
                <div className="text-center space-y-2">
                  <div className="w-32 h-48 mx-auto bg-gradient-to-b from-purple-200 to-purple-300 rounded-full opacity-50"></div>
                  <p className="text-sm text-gray-600">3D Body Scan Visualization</p>
                  <p className="text-xs text-gray-500">Connect wearable to scan</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="composition" className="space-y-4 mt-4">
          <Card className="border-purple-100 shadow-sm">
            <CardHeader>
              <CardTitle className="text-purple-900">Body Composition</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              {bodyComposition.map((item, index) => {
                const progressClasses = {
                  purple: '[&>div]:bg-purple-500',
                  pink: '[&>div]:bg-pink-500',
                  green: '[&>div]:bg-green-500',
                };
                const bgClasses = {
                  purple: 'bg-purple-100 text-purple-600',
                  pink: 'bg-pink-100 text-pink-600',
                  green: 'bg-green-100 text-green-600',
                };
                
                return (
                  <div key={index} className="space-y-3">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <div className={`w-10 h-10 rounded-xl ${bgClasses[item.color as keyof typeof bgClasses]} flex items-center justify-center`}>
                          <span className="text-xs">{item.value}{item.unit}</span>
                        </div>
                        <div>
                          <p className="text-gray-900">{item.label}</p>
                          <p className="text-xs text-gray-500">Target: {item.target}{item.unit}</p>
                        </div>
                      </div>
                      <div className="text-right">
                        <p className="text-sm text-gray-600">
                          {item.value < item.target ? item.target - item.value : item.value - item.target}
                          {item.unit} {item.value < item.target ? 'to go' : 'over'}
                        </p>
                      </div>
                    </div>
                    <Progress 
                      value={(item.value / item.target) * 100} 
                      className={`h-2 ${progressClasses[item.color as keyof typeof progressClasses]}`}
                    />
                  </div>
                );
              })}
            </CardContent>
          </Card>

          <div className="grid grid-cols-2 gap-4">
            <Card className="border-purple-100 shadow-sm">
              <CardContent className="pt-6">
                <div className="space-y-2">
                  <p className="text-sm text-gray-600">BMI</p>
                  <p className="text-2xl text-purple-900">23.5</p>
                  <p className="text-xs text-green-600">Normal Range</p>
                </div>
              </CardContent>
            </Card>
            <Card className="border-purple-100 shadow-sm">
              <CardContent className="pt-6">
                <div className="space-y-2">
                  <p className="text-sm text-gray-600">Metabolic Age</p>
                  <p className="text-2xl text-purple-900">25</p>
                  <p className="text-xs text-green-600">3 years younger</p>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}
