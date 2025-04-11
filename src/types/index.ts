
export interface Car {
  id: string;
  brand: string;
  model: string;
  stock: number;
}

export interface BookingDetails {
  startDate: Date;
  endDate: Date;
  car?: Car;
  totalPrice?: number;
  drivingLicenseExpiry?: Date;
}

export interface AvailableCar extends Car {
  totalPrice: number;
  averageDailyPrice: number;
}

// Interfaces for responses and request payloads
export interface UserData {
  id: string;
  email: string;
  name: string;
}

export interface LoginResponse {
  token: string;
  user: UserData;
}



export interface BookingInput {
  carId: string;
  startDate: string;
  endDate: string;
  licenseNumber: string;
  licenseExpiry: Date;
  totalPrice: number;
  averageDailyPrice: number;
  customerName: string;
  customerEmail: string;
  customerPhone: string;
  customerAddress: string;
}

export interface BookingData extends BookingInput {
  id: string;
  car: Car;
}
