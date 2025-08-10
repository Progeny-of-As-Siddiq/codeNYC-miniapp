"use client";

import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Plane, Clock, MapPin, User, Calendar, CreditCard, Luggage, Timer } from "lucide-react";
import { useState, useEffect } from "react";

interface FlightTicketProps {
  booking: {
    bookingReference: string;
    passenger: {
      firstName: string;
      lastName: string;
      title: string;
      email: string;
      phone: string;
    };
    departure: {
      airline: string;
      flightNumber: string;
      from: {
        city: string;
        airport: string;
        code: string;
      };
      to: {
        city: string;
        airport: string;
        code: string;
      };
      date: string;
      time: string;
      duration: string;
      cabin: string;
      baggage: string;
    };
    return?: {
      airline: string;
      flightNumber: string;
      from: {
        city: string;
        airport: string;
        code: string;
      };
      to: {
        city: string;
        airport: string;
        code: string;
      };
      date: string;
      time: string;
      duration: string;
      cabin: string;
      baggage: string;
    };
    totalPaid: string;
    currency: string;
    status: "confirmed" | "pending" | "cancelled" | "completed";
    bookedDate: string;
    isMock?: boolean;
  };
}

interface CountdownData {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
  isPast: boolean;
}

export function FlightTicket({ booking }: FlightTicketProps) {
  const [departureCountdown, setDepartureCountdown] = useState<CountdownData>({ days: 0, hours: 0, minutes: 0, seconds: 0, isPast: false });
  const [returnCountdown, setReturnCountdown] = useState<CountdownData>({ days: 0, hours: 0, minutes: 0, seconds: 0, isPast: false });

  const calculateCountdown = (dateString: string): CountdownData => {
    const now = new Date().getTime();
    const flightTime = new Date(dateString).getTime();
    const difference = flightTime - now;

    if (difference <= 0) {
      return { days: 0, hours: 0, minutes: 0, seconds: 0, isPast: true };
    }

    const days = Math.floor(difference / (1000 * 60 * 60 * 24));
    const hours = Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((difference % (1000 * 60)) / 1000);

    return { days, hours, minutes, seconds, isPast: false };
  };

  const getFlightStatus = (departureDate: string, returnDate?: string) => {
    const now = new Date();
    const depDate = new Date(departureDate);
    const retDate = returnDate ? new Date(returnDate) : null;

    if (booking.status === "cancelled") return { label: "CANCELLED", variant: "destructive" as const };
    if (booking.status === "pending") return { label: "PENDING", variant: "secondary" as const };

    if (retDate && now > retDate) {
      return { label: "COMPLETED", variant: "default" as const };
    } else if (now > depDate && retDate && now < retDate) {
      return { label: "IN PROGRESS", variant: "secondary" as const };
    } else if (now > depDate && !retDate) {
      return { label: "COMPLETED", variant: "default" as const };
    } else {
      return { label: "UPCOMING", variant: "default" as const };
    }
  };

  useEffect(() => {
    const interval = setInterval(() => {
      setDepartureCountdown(calculateCountdown(booking.departure.date));
      if (booking.return) {
        setReturnCountdown(calculateCountdown(booking.return.date));
      }
    }, 1000);

    return () => clearInterval(interval);
  }, [booking.departure.date, booking.return?.date, calculateCountdown]);

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      weekday: 'short',
      month: 'short',
      day: 'numeric',
      year: 'numeric'
    });
  };

  const formatTime = (timeString: string) => {
    return new Date(timeString).toLocaleTimeString('en-US', {
      hour: '2-digit',
      minute: '2-digit',
      hour12: true
    });
  };

  const CountdownDisplay = ({ countdown, label }: { countdown: CountdownData; label: string }) => {
    if (countdown.isPast) {
      return (
        <div className="text-center p-3 bg-gray-100 dark:bg-gray-800 rounded-lg">
          <div className="text-xs text-gray-500 mb-1">{label}</div>
          <div className="text-sm font-semibold text-gray-600 dark:text-gray-400">Flight Departed</div>
        </div>
      );
    }

    return (
      <div className="text-center p-3 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
        <div className="text-xs text-blue-600 dark:text-blue-400 mb-1 flex items-center justify-center gap-1">
          <Timer className="h-3 w-3" />
          {label}
        </div>
        <div className="grid grid-cols-4 gap-1 text-xs">
          <div>
            <div className="font-bold text-lg text-blue-600 dark:text-blue-400">{countdown.days}</div>
            <div className="text-gray-500">days</div>
          </div>
          <div>
            <div className="font-bold text-lg text-blue-600 dark:text-blue-400">{countdown.hours}</div>
            <div className="text-gray-500">hrs</div>
          </div>
          <div>
            <div className="font-bold text-lg text-blue-600 dark:text-blue-400">{countdown.minutes}</div>
            <div className="text-gray-500">min</div>
          </div>
          <div>
            <div className="font-bold text-lg text-blue-600 dark:text-blue-400">{countdown.seconds}</div>
            <div className="text-gray-500">sec</div>
          </div>
        </div>
      </div>
    );
  };

  const flightStatus = getFlightStatus(booking.departure.date, booking.return?.date);

  return (
    <Card className="w-full max-w-4xl mx-auto overflow-hidden bg-gradient-to-r from-white to-gray-50 dark:from-gray-900 dark:to-gray-800 border-2 border-dashed border-gray-300 dark:border-gray-600 relative">
      {/* Ticket Header */}
      <div className="bg-gradient-to-r from-blue-600 to-purple-600 text-white p-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="bg-white/20 rounded-full p-2">
              <Plane className="h-6 w-6" />
            </div>
            <div>
              <h2 className="text-lg font-bold">FLYTE AI</h2>
              <p className="text-blue-100 text-sm">Electronic Ticket</p>
            </div>
          </div>
          <div className="text-right">
            <div className="text-xs text-blue-100">Booking Reference</div>
            <div className="text-xl font-bold tracking-wider">{booking.bookingReference}</div>
            <Badge variant={flightStatus.variant} className="mt-1">
              {flightStatus.label}
            </Badge>
          </div>
        </div>
      </div>

      {/* Passenger Information */}
      <div className="p-4 border-b border-dashed border-gray-300 dark:border-gray-600">
        <div className="flex items-center gap-2 mb-2">
          <User className="h-4 w-4 text-gray-500" />
          <span className="text-sm font-semibold text-gray-700 dark:text-gray-300">PASSENGER</span>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
          <div>
            <div className="text-gray-500 text-xs">NAME</div>
            <div className="font-semibold">{booking.passenger.title.toUpperCase()} {booking.passenger.lastName.toUpperCase()}, {booking.passenger.firstName.toUpperCase()}</div>
          </div>
          <div>
            <div className="text-gray-500 text-xs">EMAIL</div>
            <div className="font-mono text-xs">{booking.passenger.email}</div>
          </div>
          <div>
            <div className="text-gray-500 text-xs">PHONE</div>
            <div className="font-mono text-xs">{booking.passenger.phone}</div>
          </div>
        </div>
      </div>

      {/* Departure Flight */}
      <div className="p-4 border-b border-dashed border-gray-300 dark:border-gray-600">
        <div className="flex items-center gap-2 mb-3">
          <Plane className="h-4 w-4 text-gray-500" />
          <span className="text-sm font-semibold text-gray-700 dark:text-gray-300">DEPARTURE FLIGHT</span>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-4">
          {/* Flight Info */}
          <div className="lg:col-span-2">
            <div className="flex items-center justify-between mb-2">
              <div>
                <div className="text-xs text-gray-500">AIRLINE</div>
                <div className="font-semibold">{booking.departure.airline}</div>
              </div>
              <div>
                <div className="text-xs text-gray-500">FLIGHT</div>
                <div className="font-semibold font-mono">{booking.departure.flightNumber}</div>
              </div>
            </div>
            
            {/* Route */}
            <div className="flex items-center gap-4 my-4">
              <div className="text-center">
                <div className="text-2xl font-bold">{booking.departure.from.code}</div>
                <div className="text-xs text-gray-500">{booking.departure.from.city}</div>
                <div className="text-xs text-gray-400">{booking.departure.from.airport}</div>
              </div>
              <div className="flex-1 relative">
                <div className="h-0.5 bg-gradient-to-r from-blue-500 to-purple-500"></div>
                <Plane className="h-4 w-4 absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-blue-500" />
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold">{booking.departure.to.code}</div>
                <div className="text-xs text-gray-500">{booking.departure.to.city}</div>
                <div className="text-xs text-gray-400">{booking.departure.to.airport}</div>
              </div>
            </div>
          </div>

          {/* Time & Details */}
          <div className="lg:col-span-2 grid grid-cols-2 gap-4">
            <div>
              <div className="text-xs text-gray-500">DEPARTURE</div>
              <div className="font-semibold">{formatDate(booking.departure.date)}</div>
              <div className="text-sm">{formatTime(booking.departure.time)}</div>
            </div>
            <div>
              <div className="text-xs text-gray-500">DURATION</div>
              <div className="font-semibold flex items-center gap-1">
                <Clock className="h-3 w-3" />
                {booking.departure.duration}
              </div>
            </div>
            <div>
              <div className="text-xs text-gray-500">CABIN</div>
              <div className="font-semibold">{booking.departure.cabin}</div>
            </div>
            <div>
              <div className="text-xs text-gray-500">BAGGAGE</div>
              <div className="font-semibold flex items-center gap-1">
                <Luggage className="h-3 w-3" />
                {booking.departure.baggage}
              </div>
            </div>
          </div>

          {/* Countdown */}
          <div className="lg:col-span-1">
            <CountdownDisplay countdown={departureCountdown} label="DEPARTURE IN" />
          </div>
        </div>
      </div>

      {/* Return Flight (if exists) */}
      {booking.return && (
        <div className="p-4 border-b border-dashed border-gray-300 dark:border-gray-600">
          <div className="flex items-center gap-2 mb-3">
            <Plane className="h-4 w-4 text-gray-500 rotate-180" />
            <span className="text-sm font-semibold text-gray-700 dark:text-gray-300">RETURN FLIGHT</span>
          </div>
          
          <div className="grid grid-cols-1 lg:grid-cols-5 gap-4">
            {/* Flight Info */}
            <div className="lg:col-span-2">
              <div className="flex items-center justify-between mb-2">
                <div>
                  <div className="text-xs text-gray-500">AIRLINE</div>
                  <div className="font-semibold">{booking.return.airline}</div>
                </div>
                <div>
                  <div className="text-xs text-gray-500">FLIGHT</div>
                  <div className="font-semibold font-mono">{booking.return.flightNumber}</div>
                </div>
              </div>
              
              {/* Route */}
              <div className="flex items-center gap-4 my-4">
                <div className="text-center">
                  <div className="text-2xl font-bold">{booking.return.from.code}</div>
                  <div className="text-xs text-gray-500">{booking.return.from.city}</div>
                  <div className="text-xs text-gray-400">{booking.return.from.airport}</div>
                </div>
                <div className="flex-1 relative">
                  <div className="h-0.5 bg-gradient-to-r from-purple-500 to-blue-500"></div>
                  <Plane className="h-4 w-4 absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 rotate-180 text-purple-500" />
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold">{booking.return.to.code}</div>
                  <div className="text-xs text-gray-500">{booking.return.to.city}</div>
                  <div className="text-xs text-gray-400">{booking.return.to.airport}</div>
                </div>
              </div>
            </div>

            {/* Time & Details */}
            <div className="lg:col-span-2 grid grid-cols-2 gap-4">
              <div>
                <div className="text-xs text-gray-500">DEPARTURE</div>
                <div className="font-semibold">{formatDate(booking.return.date)}</div>
                <div className="text-sm">{formatTime(booking.return.time)}</div>
              </div>
              <div>
                <div className="text-xs text-gray-500">DURATION</div>
                <div className="font-semibold flex items-center gap-1">
                  <Clock className="h-3 w-3" />
                  {booking.return.duration}
                </div>
              </div>
              <div>
                <div className="text-xs text-gray-500">CABIN</div>
                <div className="font-semibold">{booking.return.cabin}</div>
              </div>
              <div>
                <div className="text-xs text-gray-500">BAGGAGE</div>
                <div className="font-semibold flex items-center gap-1">
                  <Luggage className="h-3 w-3" />
                  {booking.return.baggage}
                </div>
              </div>
            </div>

            {/* Countdown */}
            <div className="lg:col-span-1">
              <CountdownDisplay countdown={returnCountdown} label="RETURN IN" />
            </div>
          </div>
        </div>
      )}

      {/* Payment & Booking Info */}
      <div className="p-4 bg-gray-50 dark:bg-gray-800/50">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
          <div className="flex items-center gap-2">
            <CreditCard className="h-4 w-4 text-gray-500" />
            <div>
              <div className="text-xs text-gray-500">TOTAL PAID</div>
              <div className="font-bold text-lg">{booking.currency} {booking.totalPaid}</div>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <Calendar className="h-4 w-4 text-gray-500" />
            <div>
              <div className="text-xs text-gray-500">BOOKED ON</div>
              <div className="font-semibold">{formatDate(booking.bookedDate)}</div>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <MapPin className="h-4 w-4 text-gray-500" />
            <div>
              <div className="text-xs text-gray-500">POWERED BY</div>
              <div className="font-semibold text-blue-600">FLYTE AI</div>
            </div>
          </div>
        </div>
      </div>

      {/* Perforated edge effect */}
      <div className="absolute left-0 top-1/2 transform -translate-y-1/2 w-4 h-4 bg-gray-100 dark:bg-gray-900 rounded-full border-2 border-gray-300 dark:border-gray-600 -ml-2"></div>
      <div className="absolute right-0 top-1/2 transform -translate-y-1/2 w-4 h-4 bg-gray-100 dark:bg-gray-900 rounded-full border-2 border-gray-300 dark:border-gray-600 -mr-2"></div>
    </Card>
  );
} 