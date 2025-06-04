import React from 'react';
import { Link } from 'react-router-dom';
import CustomerLayout from '@/components/layout/CustomerLayout';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Star, MapPin, Clock, Sparkles } from 'lucide-react';

const ServiceCategories: React.FC = () => {
  const categories = [
    {
      name: 'Hair Care',
      image: 'https://images.unsplash.com/photo-1560066984-138dadb4c035?w=300&h=200&fit=crop',
      services: ['Hair Cut', 'Hair Color', 'Hair Styling', 'Hair Treatment'],
      popular: true,
      gradient: 'from-purple-500 to-pink-500'
    },
    {
      name: 'Skincare',
      image: 'https://images.unsplash.com/photo-1596462502278-27bfdc403348?w=300&h=200&fit=crop',
      services: ['Facial', 'Cleanup', 'Anti-aging', 'Acne Treatment'],
      popular: true,
      gradient: 'from-green-500 to-emerald-500'
    },
    {
      name: 'Nail Art',
      image: 'https://images.unsplash.com/photo-1604654894610-df63bc536371?w=300&h=200&fit=crop',
      services: ['Manicure', 'Pedicure', 'Nail Extensions', 'Nail Art'],
      popular: false,
      gradient: 'from-pink-500 to-rose-500'
    },
    {
      name: 'Spa & Massage',
      image: 'https://images.unsplash.com/photo-1544161515-4ab6ce6db874?w=300&h=200&fit=crop',
      services: ['Body Massage', 'Head Massage', 'Aromatherapy', 'Hot Stone'],
      popular: true,
      gradient: 'from-blue-500 to-cyan-500'
    },
    {
      name: 'Makeup',
      image: 'https://images.unsplash.com/photo-1487412947147-5cebf100ffc2?w=300&h=200&fit=crop',
      services: ['Party Makeup', 'Bridal Makeup', 'Everyday Look', 'Photoshoot'],
      popular: false,
      gradient: 'from-orange-500 to-red-500'
    },
    {
      name: 'Eyebrow & Lashes',
      image: 'https://images.unsplash.com/photo-1583001931096-959e03cbc04e?w=300&h=200&fit=crop',
      services: ['Eyebrow Threading', 'Lash Extensions', 'Brow Tinting', 'Lash Lift'],
      popular: false,
      gradient: 'from-indigo-500 to-purple-500'
    }
  ];

  const trendingServices = [
    { name: 'Keratin Hair Treatment', salon: 'Glow Studio', price: '₹2,500', rating: 4.8 },
    { name: 'Russian Manicure', salon: 'Nail Paradise', price: '₹1,200', rating: 4.9 },
    { name: 'Korean Glass Facial', salon: 'Beauty Haven', price: '₹3,000', rating: 4.7 },
    { name: 'Lash Extensions', salon: 'Eye Candy', price: '₹1,800', rating: 4.6 }
  ];

  return (
    <CustomerLayout>
      <div className="space-y-6">
        {/* Header */}
        <div className="bg-gradient-to-r from-bookqin-primary to-bookqin-dark rounded-2xl p-6 text-white relative overflow-hidden">
          <div className="absolute top-0 right-0 w-32 h-32 bg-bookqin-gold/20 rounded-full blur-xl"></div>
          <div className="relative z-10">
            <h1 className="text-2xl font-bold mb-2">Explore Services</h1>
            <p className="text-bookqin-accent">Discover the perfect beauty treatment for you</p>
          </div>
        </div>

        {/* Service Categories Grid */}
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-bold text-bookqin-primary">Categories</h2>
            <Badge variant="outline" className="border-bookqin-gold text-bookqin-gold">
              <Sparkles className="w-3 h-3 mr-1" />
              AI Powered
            </Badge>
          </div>
          
          <div className="grid grid-cols-2 gap-4">
            {categories.map((category, index) => (
              <Link key={index} to={`/customer/search?category=${category.name.toLowerCase().replace(' ', '-')}`}>
                <Card className="h-full hover:shadow-lg transition-all duration-300 hover:scale-105 overflow-hidden group">
                  <div className="relative h-24 overflow-hidden">
                    <img 
                      src={category.image} 
                      alt={category.name}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                    />
                    <div className={`absolute inset-0 bg-gradient-to-t ${category.gradient} opacity-70`}></div>
                    {category.popular && (
                      <Badge className="absolute top-2 right-2 bg-bookqin-gold text-white text-xs">
                        Popular
                      </Badge>
                    )}
                  </div>
                  <CardContent className="p-3">
                    <h3 className="font-semibold text-bookqin-primary text-sm mb-1">{category.name}</h3>
                    <p className="text-xs text-bookqin-muted">{category.services.length} services available</p>
                  </CardContent>
                </Card>
              </Link>
            ))}
          </div>
        </div>

        {/* Trending Services */}
        <div className="space-y-4">
          <h2 className="text-xl font-bold text-bookqin-primary">Trending This Week</h2>
          <div className="space-y-3">
            {trendingServices.map((service, index) => (
              <Card key={index} className="hover:shadow-md transition-shadow">
                <CardContent className="p-4">
                  <div className="flex items-center justify-between">
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-1">
                        <h3 className="font-semibold text-bookqin-primary text-sm">{service.name}</h3>
                        <Badge variant="outline" className="text-xs">Trending</Badge>
                      </div>
                      <div className="flex items-center gap-3 text-xs text-bookqin-muted">
                        <span>{service.salon}</span>
                        <div className="flex items-center gap-1">
                          <Star className="w-3 h-3 fill-yellow-400 text-yellow-400" />
                          <span>{service.rating}</span>
                        </div>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="font-bold text-bookqin-secondary">{service.price}</p>
                      <p className="text-xs text-bookqin-muted">onwards</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Quick Actions */}
        <div className="grid grid-cols-2 gap-4">
          <Link to="/customer/ai-style">
            <Card className="bg-gradient-to-r from-purple-50 to-pink-50 border-purple-200 hover:shadow-lg transition-all">
              <CardContent className="p-4 text-center">
                <div className="w-12 h-12 bg-gradient-to-r from-purple-500 to-pink-500 rounded-xl flex items-center justify-center mx-auto mb-3">
                  <Sparkles className="w-6 h-6 text-white" />
                </div>
                <h3 className="font-semibold text-bookqin-primary text-sm mb-1">AI Style Match</h3>
                <p className="text-xs text-bookqin-muted">Find your perfect look</p>
              </CardContent>
            </Card>
          </Link>

          <Link to="/customer/search?location=near-me">
            <Card className="bg-gradient-to-r from-blue-50 to-cyan-50 border-blue-200 hover:shadow-lg transition-all">
              <CardContent className="p-4 text-center">
                <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-xl flex items-center justify-center mx-auto mb-3">
                  <MapPin className="w-6 h-6 text-white" />
                </div>
                <h3 className="font-semibold text-bookqin-primary text-sm mb-1">Near Me</h3>
                <p className="text-xs text-bookqin-muted">Closest salons</p>
              </CardContent>
            </Card>
          </Link>
        </div>
      </div>
    </CustomerLayout>
  );
};

export default ServiceCategories;