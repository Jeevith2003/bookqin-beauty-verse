
import React from 'react';
import { Star } from 'lucide-react';
import { Salon } from '@/lib/types';
import { Link } from 'react-router-dom';

interface SalonCardProps {
  salon: Salon;
}

const SalonCard: React.FC<SalonCardProps> = ({ salon }) => {
  return (
    <Link 
      to={`/salon/${salon.id}`} 
      className="block w-full rounded-2xl overflow-hidden bg-white card-shadow animate-fade-in hover:shadow-lg transition-shadow"
    >
      <div className="aspect-[3/2] overflow-hidden relative">
        <img 
          src={salon.images[0]} 
          alt={salon.name} 
          className="w-full h-full object-cover transition-transform hover:scale-105 duration-500"
        />
        {salon.verified && (
          <div className="absolute top-2 right-2 bg-bookqin-primary text-white text-xs font-medium rounded-full px-2 py-1 flex items-center">
            <Star className="h-3 w-3 mr-1" fill="white" strokeWidth={0} /> Verified
          </div>
        )}
        {salon.inHomeService && (
          <div className="absolute bottom-2 left-2 bg-white/90 text-bookqin-dark text-xs font-medium rounded-full px-2 py-1">
            In-Home Available
          </div>
        )}
      </div>
      <div className="p-4">
        <div className="flex justify-between items-start">
          <h3 className="text-lg font-semibold line-clamp-1">{salon.name}</h3>
          <div className="flex items-center bg-bookqin-softGray px-2 py-1 rounded-md">
            <Star className="h-3.5 w-3.5 mr-1 text-yellow-400" fill="currentColor" />
            <span className="text-sm font-medium">{salon.rating.toFixed(1)}</span>
            <span className="text-xs text-gray-500 ml-1">({salon.reviewCount})</span>
          </div>
        </div>
        <p className="text-gray-500 text-sm mt-1 line-clamp-1">{salon.address}, {salon.city}</p>
        <div className="mt-3 flex flex-wrap gap-1">
          {salon.services.slice(0, 3).map(service => (
            <span 
              key={service.id} 
              className="text-xs bg-bookqin-light text-bookqin-secondary px-2 py-1 rounded-full"
            >
              {service.name}
            </span>
          ))}
          {salon.services.length > 3 && (
            <span className="text-xs bg-gray-100 text-gray-500 px-2 py-1 rounded-full">
              +{salon.services.length - 3} more
            </span>
          )}
        </div>
      </div>
    </Link>
  );
};

export default SalonCard;
