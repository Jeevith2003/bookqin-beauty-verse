
import React from 'react';
import { Service } from '@/lib/types';
import CustomButton from '../ui/CustomButton';
import { Clock } from 'lucide-react';

interface ServiceCardProps {
  service: Service;
  onBook?: (service: Service) => void;
}

const ServiceCard: React.FC<ServiceCardProps> = ({ service, onBook }) => {
  return (
    <div className="bg-white rounded-xl p-4 shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
      <div className="flex justify-between">
        <div>
          <h3 className="font-semibold text-base">{service.name}</h3>
          <div className="flex items-center mt-1 text-sm text-gray-500">
            <Clock className="h-3.5 w-3.5 mr-1" />
            <span>{service.duration} min</span>
          </div>
          <p className="text-sm text-gray-600 mt-2 line-clamp-2">{service.description}</p>
        </div>
        {service.image && (
          <div className="ml-4 w-16 h-16 shrink-0">
            <img 
              src={service.image} 
              alt={service.name} 
              className="w-full h-full object-cover rounded-lg"
            />
          </div>
        )}
      </div>
      
      {service.addOns && service.addOns.length > 0 && (
        <div className="mt-3">
          <span className="text-xs font-medium text-gray-500">Add-ons available</span>
          <div className="flex flex-wrap gap-1 mt-1">
            {service.addOns.map(addon => (
              <span 
                key={addon.id}
                className="text-xs bg-bookqin-light/50 px-2 py-0.5 rounded-full"
              >
                {addon.name} (+₹{addon.price})
              </span>
            ))}
          </div>
        </div>
      )}
      
      <div className="flex justify-between items-center mt-4">
        <div className="font-semibold">₹{service.price}</div>
        <CustomButton 
          size="sm" 
          onClick={() => onBook && onBook(service)}
        >
          Book Now
        </CustomButton>
      </div>
    </div>
  );
};

export default ServiceCard;
