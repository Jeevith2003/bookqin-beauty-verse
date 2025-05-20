
export type UserType = 'customer' | 'salon';

export interface User {
  id: string;
  name: string;
  email: string;
  phone?: string;
  type: UserType;
  profileImage?: string;
  createdAt?: string;
  walletBalance?: number;
  notifications?: boolean;
  preferredGender?: 'male' | 'female' | 'all';
  allowInHomeService?: boolean;
  otp?: {
    code: string;
    expiresAt: string;
    attempts: number;
  };
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
  workingHours?: {
    [key: string]: { open: string; close: string; closed: boolean };
  };
  verificationStatus?: 'pending' | 'verified' | 'rejected';
  walletBalance?: number;
  platformFeePercentage?: number;
  bankDetails?: {
    accountNumber: string;
    ifsc: string;
    accountHolderName: string;
  };
  notificationPreferences?: {
    email: boolean;
    sms: boolean;
    push: boolean;
  };
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
  genderSpecific?: 'male' | 'female' | 'all';
  inHomeAvailable?: boolean;
  inHomePriceExtra?: number;
  popularityScore?: number;
  discountPercentage?: number;
}

export interface AddOn {
  id: string;
  name: string;
  price: number;
  duration: number;
  description?: string;
  required?: boolean;
}

export interface Stylist {
  id: string;
  name: string;
  profileImage?: string;
  specialties: string[];
  rating: number;
  reviewCount: number;
  bio?: string;
  experience?: number; // in years
  availability?: {
    [date: string]: string[]; // array of time slots like ["10:00", "11:00"]
  };
  gender?: 'male' | 'female' | 'other';
  inHomeServiceAvailable?: boolean;
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
  status: 'pending' | 'confirmed' | 'completed' | 'cancelled' | 'rescheduled' | 'no-show';
  inHome: boolean;
  totalAmount: number;
  paymentMethod?: 'upi' | 'card' | 'cash' | 'wallet';
  paymentStatus: 'pending' | 'completed' | 'refunded' | 'failed';
  addOns?: AddOn[];
  notes?: string;
  rating?: number;
  review?: string;
  refundAmount?: number;
  bookingReference?: string;
  rescheduleCount?: number;
  createdAt: string;
  updatedAt: string;
}

export interface WalletTransaction {
  id: string;
  userId: string;
  userType: UserType;
  amount: number;
  type: 'credit' | 'debit';
  status: 'pending' | 'completed' | 'failed';
  description: string;
  reference?: string;
  appointmentId?: string;
  createdAt: string;
}

export interface Notification {
  id: string;
  userId: string;
  userType: UserType;
  title: string;
  body: string;
  type: 'booking' | 'payment' | 'system' | 'promotion';
  read: boolean;
  actionLink?: string;
  appointmentId?: string;
  createdAt: string;
}

export interface TimeSlot {
  time: string;
  available: boolean;
  bookedCount?: number;
  stylistIds?: string[];
}

export interface DayAvailability {
  date: string;
  timeSlots: TimeSlot[];
  isFullyBooked: boolean;
}

export interface AvailabilityResponse {
  salon: {
    id: string;
    name: string;
  };
  service: {
    id: string;
    name: string;
    duration: number;
  };
  stylist?: {
    id: string;
    name: string;
  };
  availability: DayAvailability[];
}

export interface ReviewSubmission {
  appointmentId: string;
  rating: number;
  review: string;
  anonymous?: boolean;
  images?: string[];
}

export interface PaymentIntent {
  id: string;
  amount: number;
  currency: string;
  status: 'pending' | 'completed' | 'failed' | 'cancelled';
  paymentMethod?: string;
  appointmentId?: string;
  customerId: string;
  createdAt: string;
  updatedAt: string;
  paymentUrl?: string;
  metadata?: Record<string, any>;
}

export interface OtpVerificationRequest {
  phone: string;
  userType: UserType;
  action: 'login' | 'register' | 'reset';
}

export interface OtpVerificationResponse {
  success: boolean;
  message: string;
  expiresIn?: number;
}

export interface ApiResponse<T> {
  success: boolean;
  data?: T;
  error?: string;
  message?: string;
}
