// Define the base URL for your backend API.

import { BookingData, BookingInput, AvailableCar, LoginResponse } from "@/types";

// Ensure that NEXT_PUBLIC_API_URL is defined in your .env.local file (e.g., http://localhost:8000)
const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000";

// Usually, we can divide the API service into multiple files based on the functionality.

// A central API service class with static methods.
export class ApiService {
  /**
   * Login: Send a POST request with email and password. Returns a token and user data.
   */
  static async login(email: string, password: string): Promise<LoginResponse> {
    const response = await fetch(`${API_URL}/api/auth/login`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password }),
    });
    if (!response.ok) {
      const data = await response.json();
      throw new Error(data.error || "Login failed");
    }
    return response.json();
  }

  /**
   * Register: Sends a POST request with email, name, and password. Returns the created user data.
   */
  static async register(email: string, name: string, password: string): Promise<LoginResponse> {
    const response = await fetch(`${API_URL}/api/auth/register`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, name, password }),
    });
    if (!response.ok) {
      const data = await response.json();
      throw new Error(data.error || "Registration failed");
    }
    // Assuming registration returns the user data (without password)
    return response.json();
  }

  /**
   * GetCarById: Retrieve a single car by its id.
   */
  static async getCarById(carId: string, startDate: string, endDate: string): Promise<AvailableCar> {
    const response = await fetch(`${API_URL}/api/cars/${carId}?startDate=${encodeURIComponent(startDate)}&endDate=${encodeURIComponent(endDate)}`);
    if (!response.ok) {
      const data = await response.json();
      throw new Error(data.error || "Failed to retrieve car");
    }
    return response.json();
  }

  /**
   * MyBookings: Retrieve bookings for the authenticated user.
   * Requires a valid JWT token.
   */
  static async myBookings(token: string): Promise<BookingData[]> {
    const response = await fetch(`${API_URL}/api/bookings`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    if (!response.ok) {
      const data = await response.json();
      throw new Error(data.error || "Failed to fetch bookings");
    }
    return response.json();
  }

  /**
   * BookCar: Create a new booking for the authenticated user.
   * Requires a valid JWT token.
   */
  static async bookCar(token: string, booking: BookingInput): Promise<BookingData> {
    const response = await fetch(`${API_URL}/api/bookings`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(booking),
    });
    if (!response.ok) {
      const data = await response.json();
      throw new Error(data.error || "Failed to book car");
    }
    return response.json();
  }

  /**
   * AvailableCars: Retrieve a list of available cars for a given date range.
   */
  static async availableCars(startDate: string, endDate: string): Promise<AvailableCar[]> {
    const response = await fetch(
      `${API_URL}/api/cars?startDate=${encodeURIComponent(startDate)}&endDate=${encodeURIComponent(endDate)}`
    );
    if (!response.ok) {
      const data = await response.json();
      throw new Error(data.error || "Failed to fetch available cars");
    }
    return response.json();
  }
}
