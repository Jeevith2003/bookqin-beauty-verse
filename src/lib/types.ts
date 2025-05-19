
export type UserType = 'customer' | 'salon';

export interface User {
  id: string;
  name: string;
  email: string;
  phone?: string;
  type: UserType;
  profileImage?: string;
}

export interface Salon {
  id: string;
  name: string;
  ownerId: string;
  address: string;
  city: string;
  rating: number;
  reviewCount: number;
  images: string[];
  description: string;
  services: Service[];
  stylists: Stylist[];
  verified: boolean;
  genderInclusive: boolean;
  inHomeService: boolean;
}

export interface Service {
  id: string;
  name: string;
  description: string;
  price: number;
  duration: number; // in minutes
  category: string;
  image?: string;
  addOns?: AddOn[];
}

export interface AddOn {
  id: string;
  name: string;
  price: number;
  duration: number;
}

export interface Stylist {
  id: string;
  name: string;
  profileImage?: string;
  specialties: string[];
  rating: number;
  reviewCount: number;
}

export interface Appointment {
  id: string;
  customerId: string;
  salonId: string;
  serviceId: string;
  stylistId: string;
  date: string;
  startTime: string;
  endTime: string;
  status: 'pending' | 'confirmed' | 'completed' | 'cancelled';
  inHome: boolean;
  totalAmount: number;
  paymentMethod?: 'upi' | 'card' | 'cash' | 'wallet';
  paymentStatus: 'pending' | 'completed';
  addOns?: AddOn[];
}
