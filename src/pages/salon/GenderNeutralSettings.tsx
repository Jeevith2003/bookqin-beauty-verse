import React, { useState } from 'react';
import SalonLayout from '@/components/layout/SalonLayout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Heart, Users, Shield, Star, CheckCircle, Settings } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

interface ServiceSettings {
  id: string;
  name: string;
  isGenderNeutral: boolean;
  genderPreference: 'any' | 'female-only' | 'male-only';
  inclusiveDescription: string;
}

const GenderNeutralSettings: React.FC = () => {
  const { toast } = useToast();
  
  const [services, setServices] = useState<ServiceSettings[]>([
    {
      id: '1',
      name: 'Hair Cut & Styling',
      isGenderNeutral: true,
      genderPreference: 'any',
      inclusiveDescription: 'Professional hair cutting and styling for all genders'
    },
    {
      id: '2',
      name: 'Facial Treatment',
      isGenderNeutral: true,
      genderPreference: 'any',
      inclusiveDescription: 'Relaxing facial care suitable for everyone'
    },
    {
      id: '3',
      name: 'Bridal Makeup',
      isGenderNeutral: false,
      genderPreference: 'female-only',
      inclusiveDescription: ''
    }
  ]);

  const [salonSettings, setSalonSettings] = useState({
    genderNeutralPolicy: true,
    inclusiveLanguage: true,
    diverseStaff: true,
    safeSpacePolicy: true,
    pronoundRespect: true
  });

  const [policyText, setPolicyText] = useState(
    "We welcome clients of all genders and are committed to providing a safe, respectful, and inclusive environment for everyone. Our staff is trained to respect individual preferences and identities."
  );

  const updateServiceSetting = (serviceId: string, field: keyof ServiceSettings, value: any) => {
    setServices(prev => prev.map(service => 
      service.id === serviceId 
        ? { ...service, [field]: value }
        : service
    ));
  };

  const handleSaveSettings = () => {
    toast({
      title: "Settings saved successfully",
      description: "Your gender-neutral service settings have been updated"
    });
  };

  const getGenderPreferenceLabel = (preference: string) => {
    switch (preference) {
      case 'any': return 'All Genders Welcome';
      case 'female-only': return 'Female Clients Only';
      case 'male-only': return 'Male Clients Only';
      default: return 'Not Specified';
    }
  };

  const getGenderPreferenceColor = (preference: string) => {
    switch (preference) {
      case 'any': return 'bg-green-100 text-green-800';
      case 'female-only': return 'bg-pink-100 text-pink-800';
      case 'male-only': return 'bg-blue-100 text-blue-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <SalonLayout>
      <div className="space-y-6">
        {/* Header */}
        <div className="bg-gradient-to-r from-bookqin-primary to-bookqin-dark rounded-2xl p-6 text-white">
          <h1 className="text-2xl font-bold mb-2">Gender-Neutral Service Settings</h1>
          <p className="text-white/80">Create an inclusive environment for all your clients</p>
        </div>

        {/* Inclusivity Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <Card className="border-0 shadow-lg bg-gradient-to-br from-green-50 to-white">
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-bookqin-muted">Inclusive Services</p>
                  <p className="text-2xl font-bold text-bookqin-primary">
                    {services.filter(s => s.isGenderNeutral).length}
                  </p>
                </div>
                <Heart className="w-8 h-8 text-green-500" />
              </div>
            </CardContent>
          </Card>
          
          <Card className="border-0 shadow-lg bg-gradient-to-br from-purple-50 to-white">
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-bookqin-muted">All Gender Services</p>
                  <p className="text-2xl font-bold text-bookqin-primary">
                    {services.filter(s => s.genderPreference === 'any').length}
                  </p>
                </div>
                <Users className="w-8 h-8 text-purple-500" />
              </div>
            </CardContent>
          </Card>
          
          <Card className="border-0 shadow-lg bg-gradient-to-br from-blue-50 to-white">
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-bookqin-muted">Safety Rating</p>
                  <p className="text-2xl font-bold text-bookqin-primary">4.9</p>
                </div>
                <Shield className="w-8 h-8 text-blue-500" />
              </div>
            </CardContent>
          </Card>
          
          <Card className="border-0 shadow-lg bg-gradient-to-br from-yellow-50 to-white">
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-bookqin-muted">Inclusivity Score</p>
                  <p className="text-2xl font-bold text-bookqin-primary">95%</p>
                </div>
                <Star className="w-8 h-8 text-yellow-500" />
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Salon Policies */}
        <Card className="border-0 shadow-lg">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-bookqin-primary">
              <Shield className="w-5 h-5 text-bookqin-secondary" />
              Salon Inclusivity Policies
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <Label htmlFor="genderNeutral" className="text-bookqin-primary">
                    Gender-Neutral Services
                  </Label>
                  <Switch
                    id="genderNeutral"
                    checked={salonSettings.genderNeutralPolicy}
                    onCheckedChange={(checked) => 
                      setSalonSettings({...salonSettings, genderNeutralPolicy: checked})
                    }
                  />
                </div>
                
                <div className="flex items-center justify-between">
                  <Label htmlFor="inclusiveLanguage" className="text-bookqin-primary">
                    Inclusive Language
                  </Label>
                  <Switch
                    id="inclusiveLanguage"
                    checked={salonSettings.inclusiveLanguage}
                    onCheckedChange={(checked) => 
                      setSalonSettings({...salonSettings, inclusiveLanguage: checked})
                    }
                  />
                </div>
                
                <div className="flex items-center justify-between">
                  <Label htmlFor="diverseStaff" className="text-bookqin-primary">
                    Diverse Staff Training
                  </Label>
                  <Switch
                    id="diverseStaff"
                    checked={salonSettings.diverseStaff}
                    onCheckedChange={(checked) => 
                      setSalonSettings({...salonSettings, diverseStaff: checked})
                    }
                  />
                </div>
              </div>
              
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <Label htmlFor="safeSpace" className="text-bookqin-primary">
                    Safe Space Policy
                  </Label>
                  <Switch
                    id="safeSpace"
                    checked={salonSettings.safeSpacePolicy}
                    onCheckedChange={(checked) => 
                      setSalonSettings({...salonSettings, safeSpacePolicy: checked})
                    }
                  />
                </div>
                
                <div className="flex items-center justify-between">
                  <Label htmlFor="pronouns" className="text-bookqin-primary">
                    Pronoun Respect
                  </Label>
                  <Switch
                    id="pronouns"
                    checked={salonSettings.pronoundRespect}
                    onCheckedChange={(checked) => 
                      setSalonSettings({...salonSettings, pronoundRespect: checked})
                    }
                  />
                </div>
              </div>
            </div>
            
            <div className="mt-6">
              <Label htmlFor="policy" className="text-bookqin-primary mb-2 block">
                Inclusivity Policy Statement
              </Label>
              <Textarea
                id="policy"
                value={policyText}
                onChange={(e) => setPolicyText(e.target.value)}
                placeholder="Write your salon's inclusivity policy..."
                className="min-h-[100px]"
              />
            </div>
          </CardContent>
        </Card>

        {/* Service Settings */}
        <Card className="border-0 shadow-lg">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-bookqin-primary">
              <Settings className="w-5 h-5 text-bookqin-secondary" />
              Individual Service Settings
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-6">
              {services.map((service) => (
                <div key={service.id} className="p-4 bg-bookqin-light rounded-xl">
                  <div className="flex items-center justify-between mb-4">
                    <h4 className="font-medium text-bookqin-primary">{service.name}</h4>
                    <Badge className={getGenderPreferenceColor(service.genderPreference)}>
                      {getGenderPreferenceLabel(service.genderPreference)}
                    </Badge>
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <Label className="text-bookqin-primary mb-2 block">Gender Preference</Label>
                      <Select 
                        value={service.genderPreference}
                        onValueChange={(value) => 
                          updateServiceSetting(service.id, 'genderPreference', value)
                        }
                      >
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="any">All Genders Welcome</SelectItem>
                          <SelectItem value="female-only">Female Clients Only</SelectItem>
                          <SelectItem value="male-only">Male Clients Only</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    
                    <div className="flex items-center space-x-2">
                      <Switch
                        id={`neutral-${service.id}`}
                        checked={service.isGenderNeutral}
                        onCheckedChange={(checked) => 
                          updateServiceSetting(service.id, 'isGenderNeutral', checked)
                        }
                      />
                      <Label htmlFor={`neutral-${service.id}`} className="text-bookqin-primary">
                        Mark as Gender-Neutral
                      </Label>
                    </div>
                  </div>
                  
                  <div className="mt-4">
                    <Label className="text-bookqin-primary mb-2 block">Inclusive Description</Label>
                    <Textarea
                      value={service.inclusiveDescription}
                      onChange={(e) => 
                        updateServiceSetting(service.id, 'inclusiveDescription', e.target.value)
                      }
                      placeholder="Add an inclusive description for this service..."
                      className="min-h-[80px]"
                    />
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Benefits */}
        <Card className="border-0 shadow-lg bg-gradient-to-r from-bookqin-light to-white">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-bookqin-primary">
              <Star className="w-5 h-5 text-bookqin-secondary" />
              Benefits of Inclusive Services
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="flex items-start gap-3">
                <CheckCircle className="w-5 h-5 text-green-500 mt-1" />
                <div>
                  <h4 className="font-medium text-bookqin-primary">Wider Customer Base</h4>
                  <p className="text-sm text-bookqin-muted">Attract clients from all backgrounds and identities</p>
                </div>
              </div>
              
              <div className="flex items-start gap-3">
                <CheckCircle className="w-5 h-5 text-green-500 mt-1" />
                <div>
                  <h4 className="font-medium text-bookqin-primary">Positive Reviews</h4>
                  <p className="text-sm text-bookqin-muted">Build reputation as an inclusive and safe space</p>
                </div>
              </div>
              
              <div className="flex items-start gap-3">
                <CheckCircle className="w-5 h-5 text-green-500 mt-1" />
                <div>
                  <h4 className="font-medium text-bookqin-primary">Higher Revenue</h4>
                  <p className="text-sm text-bookqin-muted">Increased bookings from diverse clientele</p>
                </div>
              </div>
              
              <div className="flex items-start gap-3">
                <CheckCircle className="w-5 h-5 text-green-500 mt-1" />
                <div>
                  <h4 className="font-medium text-bookqin-primary">Social Impact</h4>
                  <p className="text-sm text-bookqin-muted">Contribute to a more inclusive society</p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Save Button */}
        <Button 
          onClick={handleSaveSettings}
          className="w-full py-3 bg-bookqin-secondary hover:bg-bookqin-secondary/90 text-lg font-semibold"
        >
          Save Inclusivity Settings
        </Button>
      </div>
    </SalonLayout>
  );
};

export default GenderNeutralSettings;