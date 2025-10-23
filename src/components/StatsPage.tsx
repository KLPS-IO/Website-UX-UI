import { LineChart, Line, AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';

export function StatsPage() {
  const weeklySteps = [
    { day: 'Mon', steps: 8234 },
    { day: 'Tue', steps: 9876 },
    { day: 'Wed', steps: 7654 },
    { day: 'Thu', steps: 10234 },
    { day: 'Fri', steps: 8432 },
    { day: 'Sat', steps: 11234 },
    { day: 'Sun', steps: 9876 },
  ];

  const waistData = [
    { day: 'Mon', inches: 33.2 },
    { day: 'Tue', inches: 33.1 },
    { day: 'Wed', inches: 33.0 },
    { day: 'Thu', inches: 32.9 },
    { day: 'Fri', inches: 32.8 },
    { day: 'Sat', inches: 32.7 },
    { day: 'Sun', inches: 32.7 },
  ];

  const weightData = [
    { day: 'Mon', lbs: 152.3 },
    { day: 'Tue', lbs: 152.1 },
    { day: 'Wed', lbs: 151.8 },
    { day: 'Thu', lbs: 151.5 },
    { day: 'Fri', lbs: 151.4 },
    { day: 'Sat', lbs: 151.2 },
    { day: 'Sun', lbs: 151.0 },
  ];

  return (
    <div className="space-y-6 pb-20 px-4 md:px-8 lg:px-16">
      <div className="space-y-2">
        <h1 className="text-3xl text-purple-900">Statistics</h1>
        <p className="text-gray-600">Track your progress over time</p>
      </div>

      <Tabs defaultValue="steps" className="w-full">
        <TabsList className="grid w-full grid-cols-3 bg-purple-100">
          <TabsTrigger value="steps">Steps</TabsTrigger>
          <TabsTrigger value="waist">Waist</TabsTrigger>
          <TabsTrigger value="weight">Weight</TabsTrigger>
        </TabsList>

        <TabsContent value="steps" className="space-y-4 mt-4">
          <Card className="border-purple-100 shadow-sm">
            <CardHeader>
              <CardTitle className="text-purple-900">Weekly Steps</CardTitle>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={250}>
                <AreaChart data={weeklySteps}>
                  <defs>
                    <linearGradient id="colorSteps" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#8b5cf6" stopOpacity={0.3}/>
                      <stop offset="95%" stopColor="#8b5cf6" stopOpacity={0}/>
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" stroke="#e9e7f4" />
                  <XAxis dataKey="day" stroke="#6b7280" />
                  <YAxis stroke="#6b7280" />
                  <Tooltip 
                    contentStyle={{ 
                      backgroundColor: '#ffffff', 
                      border: '1px solid #8b5cf6',
                      borderRadius: '8px' 
                    }}
                  />
                  <Area 
                    type="monotone" 
                    dataKey="steps" 
                    stroke="#8b5cf6" 
                    strokeWidth={2}
                    fillOpacity={1} 
                    fill="url(#colorSteps)" 
                  />
                </AreaChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>

          <div className="grid grid-cols-2 gap-4">
            <Card className="border-purple-100 shadow-sm">
              <CardContent className="pt-6">
                <div className="space-y-2">
                  <p className="text-sm text-gray-600">Daily Average</p>
                  <p className="text-2xl text-purple-900">9,220</p>
                  <p className="text-xs text-green-600">↑ 12% from last week</p>
                </div>
              </CardContent>
            </Card>
            <Card className="border-purple-100 shadow-sm">
              <CardContent className="pt-6">
                <div className="space-y-2">
                  <p className="text-sm text-gray-600">Best Day</p>
                  <p className="text-2xl text-purple-900">11,234</p>
                  <p className="text-xs text-gray-500">Saturday</p>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="waist" className="space-y-4 mt-4">
          <Card className="border-purple-100 shadow-sm">
            <CardHeader>
              <CardTitle className="text-purple-900">Waist Measurements</CardTitle>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={250}>
                <LineChart data={waistData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#e9e7f4" />
                  <XAxis dataKey="day" stroke="#6b7280" />
                  <YAxis stroke="#6b7280" domain={[32, 34]} />
                  <Tooltip 
                    contentStyle={{ 
                      backgroundColor: '#ffffff', 
                      border: '1px solid #ec4899',
                      borderRadius: '8px' 
                    }}
                  />
                  <Line 
                    type="monotone" 
                    dataKey="inches" 
                    stroke="#ec4899" 
                    strokeWidth={3}
                    dot={{ fill: '#ec4899', r: 4 }}
                  />
                </LineChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>

          <div className="grid grid-cols-3 gap-3">
            <Card className="border-pink-100 shadow-sm">
              <CardContent className="pt-6">
                <div className="space-y-1">
                  <p className="text-xs text-gray-600">Current</p>
                  <p className="text-xl text-pink-600">32.7</p>
                  <p className="text-xs text-gray-500">inches</p>
                </div>
              </CardContent>
            </Card>
            <Card className="border-pink-100 shadow-sm">
              <CardContent className="pt-6">
                <div className="space-y-1">
                  <p className="text-xs text-gray-600">Average</p>
                  <p className="text-xl text-pink-600">32.9</p>
                  <p className="text-xs text-gray-500">inches</p>
                </div>
              </CardContent>
            </Card>
            <Card className="border-pink-100 shadow-sm">
              <CardContent className="pt-6">
                <div className="space-y-1">
                  <p className="text-xs text-gray-600">Change</p>
                  <p className="text-xl text-green-600">-0.5</p>
                  <p className="text-xs text-gray-500">this week</p>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="weight" className="space-y-4 mt-4">
          <Card className="border-purple-100 shadow-sm">
            <CardHeader>
              <CardTitle className="text-purple-900">Weight Progress</CardTitle>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={250}>
                <AreaChart data={weightData}>
                  <defs>
                    <linearGradient id="colorWeight" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#10b981" stopOpacity={0.3}/>
                      <stop offset="95%" stopColor="#10b981" stopOpacity={0}/>
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" stroke="#e9e7f4" />
                  <XAxis dataKey="day" stroke="#6b7280" />
                  <YAxis stroke="#6b7280" domain={[150, 153]} />
                  <Tooltip 
                    contentStyle={{ 
                      backgroundColor: '#ffffff', 
                      border: '1px solid #10b981',
                      borderRadius: '8px' 
                    }}
                  />
                  <Area 
                    type="monotone" 
                    dataKey="lbs" 
                    stroke="#10b981" 
                    strokeWidth={2}
                    fillOpacity={1} 
                    fill="url(#colorWeight)" 
                  />
                </AreaChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>

          <Card className="border-green-100 shadow-sm">
            <CardContent className="pt-6">
              <div className="flex justify-between items-center">
                <div>
                  <p className="text-sm text-gray-600">Current Weight</p>
                  <p className="text-2xl text-green-600">151.0 lbs</p>
                </div>
                <div className="text-right">
                  <p className="text-sm text-gray-600">Goal Weight</p>
                  <p className="text-2xl text-purple-900">148.0 lbs</p>
                </div>
              </div>
              <div className="mt-4 pt-4 border-t border-gray-200">
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">Weekly Change</span>
                  <span className="text-green-600">-1.3 lbs ↓</span>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
