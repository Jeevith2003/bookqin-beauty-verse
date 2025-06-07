import React, { useState } from 'react';
import SalonLayout from '@/components/layout/SalonLayout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Switch } from '@/components/ui/switch';
import { Badge } from '@/components/ui/badge';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Plus, Edit2, Trash2, Star, Clock, DollarSign, Package } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

interface AddOn {
  id: string;
  name: string;
  description: string;
  price: number;
  duration: number;
  category: string;
  isActive: boolean;
  isPopular: boolean;
}

const AddOnCustomization: React.FC = () => {
  const { toast } = useToast();
  const [addOns, setAddOns] = useState<AddOn[]>([
    {
      id: '1',
      name: 'Hair Wash',
      description: 'Professional hair wash with premium shampoo',
      price: 200,
      duration: 15,
      category: 'hair',
      isActive: true,
      isPopular: true
    },
    {
      id: '2',
      name: 'Face Steam',
      description: 'Relaxing face steam treatment',
      price: 150,
      duration: 10,
      category: 'facial',
      isActive: true,
      isPopular: false
    },
    {
      id: '3',
      name: 'Scalp Massage',
      description: 'Therapeutic scalp massage with essential oils',
      price: 300,
      duration: 20,
      category: 'hair',
      isActive: false,
      isPopular: false
    }
  ]);

  const [isAddingNew, setIsAddingNew] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    price: '',
    duration: '',
    category: '',
    isActive: true,
    isPopular: false
  });

  const categories = [
    { value: 'hair', label: 'Hair Care' },
    { value: 'facial', label: 'Facial' },
    { value: 'body', label: 'Body Care' },
    { value: 'nail', label: 'Nail Care' },
    { value: 'spa', label: 'Spa Treatments' }
  ];

  const handleSave = () => {
    if (!formData.name || !formData.price || !formData.duration || !formData.category) {
      toast({
        title: "Please fill all required fields",
        variant: "destructive"
      });
      return;
    }

    const addOnData: AddOn = {
      id: editingId || Date.now().toString(),
      name: formData.name,
      description: formData.description,
      price: parseFloat(formData.price),
      duration: parseInt(formData.duration),
      category: formData.category,
      isActive: formData.isActive,
      isPopular: formData.isPopular
    };

    if (editingId) {
      setAddOns(prev => prev.map(addon => 
        addon.id === editingId ? addOnData : addon
      ));
      toast({
        title: "Add-on updated successfully"
      });
    } else {
      setAddOns(prev => [...prev, addOnData]);
      toast({
        title: "Add-on created successfully"
      });
    }

    resetForm();
  };

  const resetForm = () => {
    setFormData({
      name: '',
      description: '',
      price: '',
      duration: '',
      category: '',
      isActive: true,
      isPopular: false
    });
    setIsAddingNew(false);
    setEditingId(null);
  };

  const handleEdit = (addOn: AddOn) => {
    setFormData({
      name: addOn.name,
      description: addOn.description,
      price: addOn.price.toString(),
      duration: addOn.duration.toString(),
      category: addOn.category,
      isActive: addOn.isActive,
      isPopular: addOn.isPopular
    });
    setEditingId(addOn.id);
    setIsAddingNew(true);
  };

  const handleDelete = (id: string) => {
    setAddOns(prev => prev.filter(addon => addon.id !== id));
    toast({
      title: "Add-on deleted successfully"
    });
  };

  const toggleStatus = (id: string) => {
    setAddOns(prev => prev.map(addon => 
      addon.id === id ? { ...addon, isActive: !addon.isActive } : addon
    ));
  };

  const getCategoryColor = (category: string) => {
    const colors: Record<string, string> = {
      hair: 'bg-blue-100 text-blue-800',
      facial: 'bg-green-100 text-green-800',
      body: 'bg-purple-100 text-purple-800',
      nail: 'bg-pink-100 text-pink-800',
      spa: 'bg-orange-100 text-orange-800'
    };
    return colors[category] || 'bg-gray-100 text-gray-800';
  };

  return (
    <SalonLayout>
      <div className="space-y-6">
        {/* Header */}
        <div className="bg-gradient-to-r from-bookqin-primary to-bookqin-dark rounded-2xl p-6 text-white">
          <h1 className="text-2xl font-bold mb-2">Add-On Customization</h1>
          <p className="text-white/80">Manage optional services to boost your revenue</p>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <Card className="border-0 shadow-lg">
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-bookqin-muted">Total Add-ons</p>
                  <p className="text-2xl font-bold text-bookqin-primary">{addOns.length}</p>
                </div>
                <Package className="w-8 h-8 text-bookqin-secondary" />
              </div>
            </CardContent>
          </Card>
          <Card className="border-0 shadow-lg">
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-bookqin-muted">Active Add-ons</p>
                  <p className="text-2xl font-bold text-bookqin-primary">{addOns.filter(a => a.isActive).length}</p>
                </div>
                <Star className="w-8 h-8 text-green-500" />
              </div>
            </CardContent>
          </Card>
          <Card className="border-0 shadow-lg">
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-bookqin-muted">Avg. Price</p>
                  <p className="text-2xl font-bold text-bookqin-primary">
                    ₹{Math.round(addOns.reduce((sum, a) => sum + a.price, 0) / addOns.length)}
                  </p>
                </div>
                <DollarSign className="w-8 h-8 text-bookqin-secondary" />
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Add New Button */}
        {!isAddingNew && (
          <Button 
            onClick={() => setIsAddingNew(true)}
            className="bg-bookqin-secondary hover:bg-bookqin-secondary/90"
          >
            <Plus className="w-4 h-4 mr-2" />
            Add New Add-on
          </Button>
        )}

        {/* Add/Edit Form */}
        {isAddingNew && (
          <Card className="border-0 shadow-lg">
            <CardHeader>
              <CardTitle className="text-bookqin-primary">
                {editingId ? 'Edit Add-on' : 'Create New Add-on'}
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="name" className="text-bookqin-primary">Add-on Name *</Label>
                  <Input
                    id="name"
                    placeholder="e.g., Hair Wash"
                    value={formData.name}
                    onChange={(e) => setFormData({...formData, name: e.target.value})}
                  />
                </div>
                <div>
                  <Label htmlFor="category" className="text-bookqin-primary">Category *</Label>
                  <Select value={formData.category} onValueChange={(value) => setFormData({...formData, category: value})}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select category" />
                    </SelectTrigger>
                    <SelectContent>
                      {categories.map((cat) => (
                        <SelectItem key={cat.value} value={cat.value}>{cat.label}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div>
                <Label htmlFor="description" className="text-bookqin-primary">Description</Label>
                <Textarea
                  id="description"
                  placeholder="Describe the add-on service..."
                  value={formData.description}
                  onChange={(e) => setFormData({...formData, description: e.target.value})}
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="price" className="text-bookqin-primary">Price (₹) *</Label>
                  <Input
                    id="price"
                    type="number"
                    placeholder="0"
                    value={formData.price}
                    onChange={(e) => setFormData({...formData, price: e.target.value})}
                  />
                </div>
                <div>
                  <Label htmlFor="duration" className="text-bookqin-primary">Duration (minutes) *</Label>
                  <Input
                    id="duration"
                    type="number"
                    placeholder="0"
                    value={formData.duration}
                    onChange={(e) => setFormData({...formData, duration: e.target.value})}
                  />
                </div>
              </div>

              <div className="flex gap-6">
                <div className="flex items-center space-x-2">
                  <Switch
                    id="isActive"
                    checked={formData.isActive}
                    onCheckedChange={(checked) => setFormData({...formData, isActive: checked})}
                  />
                  <Label htmlFor="isActive" className="text-bookqin-primary">Active</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <Switch
                    id="isPopular"
                    checked={formData.isPopular}
                    onCheckedChange={(checked) => setFormData({...formData, isPopular: checked})}
                  />
                  <Label htmlFor="isPopular" className="text-bookqin-primary">Mark as Popular</Label>
                </div>
              </div>

              <div className="flex gap-3">
                <Button onClick={handleSave} className="bg-bookqin-secondary hover:bg-bookqin-secondary/90">
                  {editingId ? 'Update Add-on' : 'Create Add-on'}
                </Button>
                <Button variant="outline" onClick={resetForm}>
                  Cancel
                </Button>
              </div>
            </CardContent>
          </Card>
        )}

        {/* Add-ons List */}
        <div className="space-y-4">
          {addOns.map((addOn) => (
            <Card key={addOn.id} className="border-0 shadow-lg">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2">
                      <h3 className="font-bold text-bookqin-primary">{addOn.name}</h3>
                      <Badge className={getCategoryColor(addOn.category)}>
                        {categories.find(c => c.value === addOn.category)?.label}
                      </Badge>
                      {addOn.isPopular && (
                        <Badge className="bg-yellow-100 text-yellow-800">
                          <Star className="w-3 h-3 mr-1" />
                          Popular
                        </Badge>
                      )}
                      <Badge className={addOn.isActive ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}>
                        {addOn.isActive ? 'Active' : 'Inactive'}
                      </Badge>
                    </div>
                    <p className="text-bookqin-muted mb-3">{addOn.description}</p>
                    <div className="flex items-center gap-4 text-sm">
                      <span className="flex items-center gap-1">
                        <DollarSign className="w-4 h-4 text-bookqin-secondary" />
                        <span className="font-medium text-bookqin-primary">₹{addOn.price}</span>
                      </span>
                      <span className="flex items-center gap-1">
                        <Clock className="w-4 h-4 text-bookqin-secondary" />
                        <span className="text-bookqin-muted">{addOn.duration} mins</span>
                      </span>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <Switch
                      checked={addOn.isActive}
                      onCheckedChange={() => toggleStatus(addOn.id)}
                    />
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => handleEdit(addOn)}
                    >
                      <Edit2 className="w-4 h-4" />
                    </Button>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => handleDelete(addOn.id)}
                      className="text-red-500 hover:text-red-700"
                    >
                      <Trash2 className="w-4 h-4" />
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {addOns.length === 0 && (
          <Card className="border-0 shadow-lg">
            <CardContent className="p-12 text-center">
              <Package className="w-16 h-16 text-bookqin-muted mx-auto mb-4" />
              <h3 className="text-lg font-medium text-bookqin-primary mb-2">No Add-ons Yet</h3>
              <p className="text-bookqin-muted mb-4">Create your first add-on service to start earning extra revenue</p>
              <Button 
                onClick={() => setIsAddingNew(true)}
                className="bg-bookqin-secondary hover:bg-bookqin-secondary/90"
              >
                <Plus className="w-4 h-4 mr-2" />
                Create Add-on
              </Button>
            </CardContent>
          </Card>
        )}
      </div>
    </SalonLayout>
  );
};

export default AddOnCustomization;