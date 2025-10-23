import { User, Mail, Phone, Calendar, Ruler, Weight, Bell, Shield, LogOut } from 'lucide-react';
import { Card, CardContent } from './ui/card';
import { Avatar, AvatarFallback } from './ui/avatar';
import { Button } from './ui/button';
import { Switch } from './ui/switch';

export function ProfilePage() {
  const userInfo = [
    { icon: Mail, label: 'Email', value: 'john.doe@email.com' },
    { icon: Phone, label: 'Phone', value: '+1 (555) 123-4567' },
    { icon: Calendar, label: 'Age', value: '28 years' },
    { icon: Ruler, label: 'Height', value: '175 cm' },
    { icon: Weight, label: 'Weight', value: '72 kg' },
  ];

  const settings = [
    { icon: Bell, label: 'Push Notifications', enabled: true },
    { icon: Shield, label: 'Privacy Mode', enabled: false },
  ];

  return (
    <div className="space-y-6 pb-20 px-4 md:px-8 lg:px-16">
      <div className="space-y-2">
        <h1 className="text-3xl text-purple-900">Profile</h1>
        <p className="text-gray-600">Manage your account</p>
      </div>

      <Card className="border-purple-100 shadow-sm">
        <CardContent className="pt-6">
          <div className="flex items-center gap-4">
            <Avatar className="w-20 h-20">
              <AvatarFallback className="bg-gradient-to-br from-purple-500 to-pink-500 text-white text-2xl">
                JD
              </AvatarFallback>
            </Avatar>
            <div className="flex-1">
              <h3 className="text-xl text-purple-900">John Doe</h3>
              <p className="text-sm text-gray-600">Premium Member</p>
            </div>
            <Button variant="outline" className="border-purple-200 text-purple-600 hover:bg-purple-50 rounded-xl">
              Edit
            </Button>
          </div>
        </CardContent>
      </Card>

      <div className="space-y-3">
        <h3 className="text-lg text-purple-900">Personal Information</h3>
        <Card className="border-purple-100 shadow-sm">
          <CardContent className="pt-6 space-y-4">
            {userInfo.map((item, index) => {
              const Icon = item.icon;
              return (
                <div key={index} className="flex items-center gap-4">
                  <div className="w-10 h-10 rounded-xl bg-purple-100 text-purple-600 flex items-center justify-center flex-shrink-0">
                    <Icon className="w-5 h-5" />
                  </div>
                  <div className="flex-1">
                    <p className="text-sm text-gray-600">{item.label}</p>
                    <p className="text-gray-900">{item.value}</p>
                  </div>
                </div>
              );
            })}
          </CardContent>
        </Card>
      </div>

      <div className="space-y-3">
        <h3 className="text-lg text-purple-900">Settings</h3>
        <Card className="border-purple-100 shadow-sm">
          <CardContent className="pt-6 space-y-4">
            {settings.map((item, index) => {
              const Icon = item.icon;
              return (
                <div key={index} className="flex items-center gap-4">
                  <div className="w-10 h-10 rounded-xl bg-green-100 text-green-600 flex items-center justify-center flex-shrink-0">
                    <Icon className="w-5 h-5" />
                  </div>
                  <div className="flex-1">
                    <p className="text-gray-900">{item.label}</p>
                  </div>
                  <Switch defaultChecked={item.enabled} />
                </div>
              );
            })}
          </CardContent>
        </Card>
      </div>

      <Card className="border-purple-100 shadow-sm">
        <CardContent className="pt-6">
          <div className="space-y-3">
            <Button 
              variant="outline" 
              className="w-full h-12 border-purple-200 text-purple-600 hover:bg-purple-50 rounded-xl flex items-center justify-center gap-2"
            >
              <User className="w-5 h-5" />
              Device Settings
            </Button>
            <Button 
              variant="outline" 
              className="w-full h-12 border-red-200 text-red-600 hover:bg-red-50 rounded-xl flex items-center justify-center gap-2"
            >
              <LogOut className="w-5 h-5" />
              Sign Out
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
