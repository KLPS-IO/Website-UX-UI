import { Activity, Heart, Footprints, Ruler, AlertCircle, Apple, Dumbbell, Eye, Zap, MessageSquare, ChevronRight } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Progress } from './ui/progress';

export function DashboardPage() {
  const stats = [
    { icon: Footprints, label: 'Steps', value: '8,432', goal: '10,000', progress: 84, color: 'purple' },
    { icon: Heart, label: 'Heart Rate', value: '72', unit: 'bpm', color: 'pink' },
    { icon: Ruler, label: 'Waist', value: '32.7', unit: 'in', color: 'green' },
    { icon: Activity, label: 'Active Minutes', value: '45', goal: '60', progress: 75, color: 'purple' },
  ];

  const cycleData = {
    currentDay: 19,
    totalDays: 28,
    phase: 'Fertile Window',
    daysLeft: 1,
  };

  const alerts = [
    { 
      type: 'food' as const, 
      icon: Apple, 
      message: 'Increase protein intake - aim for 120g daily',
      color: 'green'
    },
    { 
      type: 'activity' as const, 
      icon: Dumbbell, 
      message: 'Add 15 min strength training to your routine',
      color: 'purple'
    },
    { 
      type: 'observation' as const, 
      icon: Eye, 
      message: 'Heart rate elevated during rest - consider stress management',
      color: 'pink'
    },
    { 
      type: 'action' as const, 
      icon: Zap, 
      message: 'Book a health check-up - it\'s been 6 months',
      color: 'green'
    },
    { 
      type: 'lema' as const, 
      icon: MessageSquare, 
      message: 'Ask Lema about optimizing your sleep schedule',
      color: 'purple'
    },
  ];

  const phaseColors = {
    menstrual: { bg: 'from-red-400 to-pink-400', text: 'text-red-600' },
    follicular: { bg: 'from-pink-400 to-pink-300', text: 'text-pink-600' },
    fertile: { bg: 'from-green-400 to-teal-400', text: 'text-green-600' },
    luteal: { bg: 'from-purple-400 to-indigo-400', text: 'text-purple-600' },
  };

  const currentPhaseColor = phaseColors.fertile;

  return (
    <div className="space-y-6 pb-20">
      <div className="space-y-2">
        <h1 className="text-3xl text-purple-900">Dashboard</h1>
        <p className="text-gray-600">Your daily health overview</p>
      </div>

      <div className="grid grid-cols-2 gap-4">
        {stats.map((stat, index) => {
          const Icon = stat.icon;
          const colorClasses = {
            purple: 'bg-purple-100 text-purple-600',
            pink: 'bg-pink-100 text-pink-600',
            green: 'bg-green-100 text-green-600',
          };
          const progressClasses = {
            purple: '[&>div]:bg-purple-500',
            pink: '[&>div]:bg-pink-500',
            green: '[&>div]:bg-green-500',
          };

          return (
            <Card key={index} className="border-purple-100 shadow-sm">
              <CardHeader className="pb-3">
                <div className={`w-10 h-10 rounded-xl ${colorClasses[stat.color as keyof typeof colorClasses]} flex items-center justify-center mb-2`}>
                  <Icon className="w-5 h-5" />
                </div>
                <CardTitle className="text-sm text-gray-600">{stat.label}</CardTitle>
              </CardHeader>
              <CardContent className="space-y-2">
                <div className="flex items-baseline gap-1">
                  <span className="text-2xl text-purple-900">{stat.value}</span>
                  {stat.unit && <span className="text-sm text-gray-500">{stat.unit}</span>}
                </div>
                {stat.goal && (
                  <>
                    <Progress 
                      value={stat.progress} 
                      className={`h-1.5 ${progressClasses[stat.color as keyof typeof progressClasses]}`}
                    />
                    <p className="text-xs text-gray-500">Goal: {stat.goal}</p>
                  </>
                )}
              </CardContent>
            </Card>
          );
        })}
      </div>

      {/* Cycle Tracker */}
      <Card className="border-purple-100 shadow-sm">
        <CardHeader>
          <CardTitle className="text-purple-900">Cycle Tracker</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex items-center justify-center py-4">
            <div className="relative w-48 h-48">
              {/* Background circle */}
              <svg className="w-full h-full -rotate-90" viewBox="0 0 200 200">
                <circle
                  cx="100"
                  cy="100"
                  r="80"
                  fill="none"
                  stroke="#e9e7f4"
                  strokeWidth="20"
                />
                {/* Menstrual phase (red/pink) - Days 1-5 */}
                <circle
                  cx="100"
                  cy="100"
                  r="80"
                  fill="none"
                  stroke="url(#gradientMenstrual)"
                  strokeWidth="20"
                  strokeDasharray={`${(5 / 28) * 502.4} 502.4`}
                  strokeDashoffset="0"
                  strokeLinecap="round"
                />
                {/* Follicular phase (light pink) - Days 6-13 */}
                <circle
                  cx="100"
                  cy="100"
                  r="80"
                  fill="none"
                  stroke="url(#gradientFollicular)"
                  strokeWidth="20"
                  strokeDasharray={`${(8 / 28) * 502.4} 502.4`}
                  strokeDashoffset={`${-(5 / 28) * 502.4}`}
                  strokeLinecap="round"
                />
                {/* Fertile window (green/teal) - Days 14-20 */}
                <circle
                  cx="100"
                  cy="100"
                  r="80"
                  fill="none"
                  stroke="url(#gradientFertile)"
                  strokeWidth="20"
                  strokeDasharray={`${(7 / 28) * 502.4} 502.4`}
                  strokeDashoffset={`${-(13 / 28) * 502.4}`}
                  strokeLinecap="round"
                />
                {/* Luteal phase (purple) - Days 21-28 */}
                <circle
                  cx="100"
                  cy="100"
                  r="80"
                  fill="none"
                  stroke="url(#gradientLuteal)"
                  strokeWidth="20"
                  strokeDasharray={`${(8 / 28) * 502.4} 502.4`}
                  strokeDashoffset={`${-(20 / 28) * 502.4}`}
                  strokeLinecap="round"
                />
                
                {/* Gradient definitions */}
                <defs>
                  <linearGradient id="gradientMenstrual" x1="0%" y1="0%" x2="100%" y2="0%">
                    <stop offset="0%" stopColor="#f87171" />
                    <stop offset="100%" stopColor="#f9a8d4" />
                  </linearGradient>
                  <linearGradient id="gradientFollicular" x1="0%" y1="0%" x2="100%" y2="0%">
                    <stop offset="0%" stopColor="#f9a8d4" />
                    <stop offset="100%" stopColor="#fbcfe8" />
                  </linearGradient>
                  <linearGradient id="gradientFertile" x1="0%" y1="0%" x2="100%" y2="0%">
                    <stop offset="0%" stopColor="#10b981" />
                    <stop offset="100%" stopColor="#14b8a6" />
                  </linearGradient>
                  <linearGradient id="gradientLuteal" x1="0%" y1="0%" x2="100%" y2="0%">
                    <stop offset="0%" stopColor="#8b5cf6" />
                    <stop offset="100%" stopColor="#6366f1" />
                  </linearGradient>
                </defs>
              </svg>
              
              {/* Center content */}
              <div className="absolute inset-0 flex flex-col items-center justify-center">
                <p className="text-xs text-gray-500">Day {cycleData.currentDay}</p>
                <p className={`text-sm ${currentPhaseColor.text} mt-1`}>{cycleData.phase}</p>
                <p className="text-3xl text-purple-900 mt-2">{cycleData.daysLeft}</p>
                <p className="text-xs text-gray-500">day left</p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Alerts Section */}
      <Card className="border-purple-100 shadow-sm">
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle className="text-purple-900 flex items-center gap-2">
              <AlertCircle className="w-5 h-5 text-pink-500" />
              Recommendations
            </CardTitle>
          </div>
        </CardHeader>
        <CardContent className="space-y-3">
          {alerts.map((alert, index) => {
            const Icon = alert.icon;
            const colorClasses = {
              purple: 'bg-purple-100 text-purple-600',
              pink: 'bg-pink-100 text-pink-600',
              green: 'bg-green-100 text-green-600',
            };

            return (
              <button 
                key={index} 
                className="w-full flex items-center gap-3 p-3 bg-gradient-to-r from-purple-50/50 to-pink-50/50 rounded-xl hover:shadow-md transition-shadow text-left"
              >
                <div className={`w-10 h-10 rounded-xl ${colorClasses[alert.color as keyof typeof colorClasses]} flex items-center justify-center flex-shrink-0`}>
                  <Icon className="w-5 h-5" />
                </div>
                <p className="flex-1 text-sm text-gray-700">{alert.message}</p>
                <ChevronRight className="w-4 h-4 text-gray-400 flex-shrink-0" />
              </button>
            );
          })}
        </CardContent>
      </Card>
    </div>
  );
}
