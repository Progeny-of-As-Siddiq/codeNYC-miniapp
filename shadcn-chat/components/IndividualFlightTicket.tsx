"use client";

import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Plane, Clock, MapPin, User, Calendar, CreditCard, Luggage, Timer } from "lucide-react";
import { useState, useEffect } from "react";

interface IndividualFlightTicketProps {
  flight: {
    ticketNumber: string;
    type: "departure" | "return";
    bookingReference: string;
    passenger: {
      firstName: string;
      lastName: string;
      title: string;
      email: string;
      phone: string;
    };
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
    totalPaid?: string;
    currency?: string;
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

export function IndividualFlightTicket({ flight }: IndividualFlightTicketProps) {
  const [countdown, setCountdown] = useState<CountdownData>({ days: 0, hours: 0, minutes: 0, seconds: 0, isPast: false });

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

  const getFlightStatus = (flightDate: string) => {
    const now = new Date();
    const fDate = new Date(flightDate);

    if (flight.status === "cancelled") return { label: "CANCELLED", variant: "destructive" as const };
    if (flight.status === "pending") return { label: "PENDING", variant: "secondary" as const };

    if (now > fDate) {
      return { label: "COMPLETED", variant: "default" as const };
    } else {
      return { label: "UPCOMING", variant: "default" as const };
    }
  };

  useEffect(() => {
    const interval = setInterval(() => {
      setCountdown(calculateCountdown(flight.date));
    }, 1000);

    return () => clearInterval(interval);
  }, [flight.date]);

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

  const flightStatus = getFlightStatus(flight.date);
  const isReturn = flight.type === "return";

  return (
    <Card className="w-full max-w-2xl mx-auto overflow-hidden bg-gradient-to-r from-white to-gray-50 dark:from-gray-900 dark:to-gray-800 border-2 border-dashed border-gray-300 dark:border-gray-600 relative">
      {/* Perforated edge effect */}
      <div className="absolute left-0 top-4 bottom-4 w-6 flex flex-col justify-between">
        {Array.from({ length: 12 }, (_, i) => (
          <div key={i} className="w-3 h-3 bg-background rounded-full -ml-1.5 border border-gray-300 dark:border-gray-600"></div>
        ))}
      </div>
      <div className="absolute right-0 top-4 bottom-4 w-6 flex flex-col justify-between">
        {Array.from({ length: 12 }, (_, i) => (
          <div key={i} className="w-3 h-3 bg-background rounded-full -mr-1.5 border border-gray-300 dark:border-gray-600"></div>
        ))}
      </div>

      {/* Ticket Header */}
      <div className={`bg-gradient-to-r ${isReturn ? 'from-purple-600 to-blue-600' : 'from-blue-600 to-purple-600'} text-white p-4`}>
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="bg-white/20 rounded-full p-2">
              <Plane className={`h-6 w-6 ${isReturn ? 'rotate-180' : ''}`} />
            </div>
            <div>
              <h2 className="text-lg font-bold">FLYTE AI</h2>
              <p className="text-blue-100 text-sm">{flight.type.charAt(0).toUpperCase() + flight.type.slice(1)} Ticket</p>
            </div>
          </div>
          <div className="text-right">
            <div className="text-xs text-blue-100">Booking Reference</div>
            <div className="text-lg font-bold tracking-wider">{flight.bookingReference}</div>
            <div className="text-xs text-blue-100 mt-1">Ticket #{flight.ticketNumber}</div>
            <Badge variant={flightStatus.variant} className="mt-1">
              {flightStatus.label}
            </Badge>
          </div>
        </div>
        
        {/* Mock/Live indicator */}
        {flight.isMock && (
          <div className="mt-2 text-center">
            <Badge variant="secondary" className="bg-yellow-500/20 text-yellow-100 border-yellow-400/30">
              🧪 DEMO TICKET
            </Badge>
          </div>
        )}
      </div>

      {/* Passenger Information */}
      <div className="p-4 border-b border-dashed border-gray-300 dark:border-gray-600 ml-6 mr-6">
        <div className="flex items-center gap-2 mb-2">
          <User className="h-4 w-4 text-gray-500" />
          <span className="text-sm font-semibold text-gray-700 dark:text-gray-300">PASSENGER</span>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
          <div>
            <div className="text-gray-500 text-xs">NAME</div>
            <div className="font-semibold">{flight.passenger.title.toUpperCase()} {flight.passenger.lastName.toUpperCase()}, {flight.passenger.firstName.toUpperCase()}</div>
          </div>
          <div>
            <div className="text-gray-500 text-xs">EMAIL</div>
            <div className="font-mono text-xs">{flight.passenger.email}</div>
          </div>
          <div>
            <div className="text-gray-500 text-xs">PHONE</div>
            <div className="font-mono text-xs">{flight.passenger.phone}</div>
          </div>
        </div>
      </div>

      {/* Flight Details */}
      <div className="p-4 border-b border-dashed border-gray-300 dark:border-gray-600 ml-6 mr-6">
        <div className="flex items-center gap-2 mb-3">
          <Plane className={`h-4 w-4 text-gray-500 ${isReturn ? 'rotate-180' : ''}`} />
          <span className="text-sm font-semibold text-gray-700 dark:text-gray-300">
            {flight.type.toUpperCase()} FLIGHT
          </span>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-4">
          {/* Flight Info & Route */}
          <div className="lg:col-span-2">
            <div className="flex items-center justify-between mb-4">
              <div>
                <div className="text-xs text-gray-500">AIRLINE</div>
                <div className="font-semibold">{flight.airline}</div>
              </div>
              <div>
                <div className="text-xs text-gray-500">FLIGHT</div>
                <div className="font-semibold font-mono">{flight.flightNumber}</div>
              </div>
            </div>
            
            {/* Route */}
            <div className="flex items-center gap-4">
              <div className="text-center">
                <div className="text-2xl font-bold">{flight.from.code}</div>
                <div className="text-xs text-gray-500">{flight.from.city}</div>
                <div className="text-xs text-gray-400 line-clamp-2">{flight.from.airport}</div>
              </div>
              <div className="flex-1 relative">
                <div className={`h-0.5 bg-gradient-to-r ${isReturn ? 'from-purple-500 to-blue-500' : 'from-blue-500 to-purple-500'}`}></div>
                <Plane className={`h-4 w-4 absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 ${isReturn ? 'rotate-180 text-purple-500' : 'text-blue-500'}`} />
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold">{flight.to.code}</div>
                <div className="text-xs text-gray-500">{flight.to.city}</div>
                <div className="text-xs text-gray-400 line-clamp-2">{flight.to.airport}</div>
              </div>
            </div>
          </div>

          {/* Flight Details */}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <div className="text-xs text-gray-500">DEPARTURE</div>
              <div className="font-semibold">{formatDate(flight.date)}</div>
              <div className="text-sm">{formatTime(flight.time)}</div>
            </div>
            <div>
              <div className="text-xs text-gray-500">DURATION</div>
              <div className="font-semibold flex items-center gap-1">
                <Clock className="h-3 w-3" />
                {flight.duration}
              </div>
            </div>
            <div>
              <div className="text-xs text-gray-500">CABIN</div>
              <div className="font-semibold">{flight.cabin}</div>
            </div>
            <div>
              <div className="text-xs text-gray-500">BAGGAGE</div>
              <div className="font-semibold flex items-center gap-1">
                <Luggage className="h-3 w-3" />
                {flight.baggage}
              </div>
            </div>
          </div>

          {/* Countdown */}
          <div>
            <CountdownDisplay 
              countdown={countdown} 
              label={`${flight.type.toUpperCase()} IN`} 
            />
          </div>
        </div>
      </div>

      {/* Footer */}
      <div className="p-4 bg-gray-50 dark:bg-gray-800/50 ml-6 mr-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
          {flight.totalPaid && (
            <div className="flex items-center gap-2">
              <CreditCard className="h-4 w-4 text-gray-500" />
              <div>
                <div className="text-xs text-gray-500">TOTAL PAID</div>
                <div className="font-bold text-lg">{flight.currency} {flight.totalPaid}</div>
              </div>
            </div>
          )}
          <div className="flex items-center gap-2">
            <Calendar className="h-4 w-4 text-gray-500" />
            <div>
              <div className="text-xs text-gray-500">BOOKED ON</div>
              <div className="font-semibold">{formatDate(flight.bookedDate)}</div>
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
    </Card>
  );
} 