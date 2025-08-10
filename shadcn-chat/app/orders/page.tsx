"use client";

import { useAuth } from "@/contexts/auth-context";
import { useRouter } from "next/navigation";
import { useEffect, useState, useCallback } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { Package, Loader2 } from "lucide-react";
import { IndividualFlightTicket } from "@/components/IndividualFlightTicket";

interface BookingRecord {
  id: string;
  booking_reference: string;
  created_at: string;
  is_mock: boolean;
  status: string;
  raw_booking_data: {
    data?: {
      slices?: Array<{
        segments?: Array<{
          marketing_carrier?: { name?: string };
          marketing_carrier_flight_number?: string;
          origin?: { city_name?: string; name?: string; iata_code?: string };
          destination?: { city_name?: string; name?: string; iata_code?: string };
          departing_at?: string;
          arriving_at?: string;
        }>;
        fare_brand_name?: string;
        duration?: string;
      }>;
      passengers?: Array<{
        given_name?: string;
        family_name?: string;
        title?: string;
        email?: string;
        phone_number?: string;
      }>;
      total_amount?: string;
      total_currency?: string;
    };
  };
}

export default function OrdersPage() {
  const { user } = useAuth();
  const router = useRouter();
  const [bookings, setBookings] = useState<BookingRecord[]>([]);
  const [loading, setLoading] = useState(true);
  const [isLiveMode, setIsLiveMode] = useState(false);

  const fetchUserBookings = useCallback(async () => {
    if (!user?.username) return;
    
    try {
      const backendUrl = process.env.NEXT_PUBLIC_BACKEND_URL || 'http://localhost:8000';
      const response = await fetch(`${backendUrl}/api/user-bookings?username=${user.username}`);
      if (response.ok) {
        const data = await response.json();
        setBookings(data.bookings);
      } else {
        console.error("Failed to fetch bookings");
        setBookings([]);
      }
    } catch (error) {
      console.error("Error fetching bookings:", error);
      setBookings([]);
    } finally {
      setLoading(false);
    }
  }, [user?.username]);

  useEffect(() => {
    if (!user) {
      router.push("/");
      return;
    }
    fetchUserBookings();
  }, [user, router, fetchUserBookings]);

  const convertBookingToIndividualTickets = (bookingRecord: BookingRecord) => {
    const bookingData = bookingRecord.raw_booking_data?.data;
    if (!bookingData) return [];

    const slices = bookingData.slices || [];
    const passenger = bookingData.passengers?.[0] || {};
    const tickets = [];
    
    // Common passenger info
    const passengerInfo = {
      firstName: passenger.given_name || user?.firstName || "Unknown",
      lastName: passenger.family_name || user?.lastName || "User",
      title: passenger.title || user?.title || "Mr",
      email: passenger.email || user?.email || "unknown@email.com", 
      phone: passenger.phone_number || user?.phone || "N/A"
    };

    // Create departure ticket (first slice)
    const departureSlice = slices[0];
    const departureSegment = departureSlice?.segments?.[0];
    
    if (departureSegment) {
      tickets.push({
        ticketNumber: `${bookingRecord.booking_reference}-DEP`,
        type: "departure" as const,
        bookingReference: bookingRecord.booking_reference,
        passenger: passengerInfo,
        airline: departureSegment.marketing_carrier?.name || "Unknown Airline",
        flightNumber: departureSegment.marketing_carrier_flight_number || "N/A",
        from: {
          city: departureSegment.origin?.city_name || "Unknown",
          airport: departureSegment.origin?.name || "Unknown Airport",
          code: departureSegment.origin?.iata_code || "N/A"
        },
        to: {
          city: departureSegment.destination?.city_name || "Unknown", 
          airport: departureSegment.destination?.name || "Unknown Airport",
          code: departureSegment.destination?.iata_code || "N/A"
        },
        date: departureSegment.departing_at || "Unknown",
        time: departureSegment.departing_at || "Unknown",
        duration: formatDuration(departureSlice.duration || ""),
        cabin: departureSlice.fare_brand_name || "Economy",
        baggage: "No bags allowed",
        totalPaid: bookingData.total_amount || "0",
        currency: bookingData.total_currency || "USD",
        status: bookingRecord.status as "confirmed" | "pending" | "cancelled" | "completed",
        bookedDate: bookingRecord.created_at,
        isMock: bookingRecord.is_mock
      });
    }

    // Create return ticket (second slice if exists)
    const returnSlice = slices[1];
    const returnSegment = returnSlice?.segments?.[0];
    
    if (returnSegment) {
      tickets.push({
        ticketNumber: `${bookingRecord.booking_reference}-RET`,
        type: "return" as const,
        bookingReference: bookingRecord.booking_reference,
        passenger: passengerInfo,
        airline: returnSegment.marketing_carrier?.name || "Unknown Airline",
        flightNumber: returnSegment.marketing_carrier_flight_number || "N/A",
        from: {
          city: returnSegment.origin?.city_name || "Unknown",
          airport: returnSegment.origin?.name || "Unknown Airport", 
          code: returnSegment.origin?.iata_code || "N/A"
        },
        to: {
          city: returnSegment.destination?.city_name || "Unknown",
          airport: returnSegment.destination?.name || "Unknown Airport",
          code: returnSegment.destination?.iata_code || "N/A"
        },
        date: returnSegment.departing_at || "Unknown",
        time: returnSegment.departing_at || "Unknown", 
        duration: formatDuration(returnSlice.duration || ""),
        cabin: returnSlice?.fare_brand_name || "Economy",
        baggage: "No bags allowed",
        status: bookingRecord.status as "confirmed" | "pending" | "cancelled" | "completed",
        bookedDate: bookingRecord.created_at,
        isMock: bookingRecord.is_mock
      });
    }

    return tickets;
  };

  const formatDuration = (durationStr: string) => {
    if (!durationStr) return "Unknown";
    try {
      // Parse ISO 8601 duration format (e.g., "PT5H56M")
      const match = durationStr.match(/PT(?:(\d+)H)?(?:(\d+)M)?/);
      if (!match) return durationStr;
      
      const hours = parseInt(match[1] || "0");
      const minutes = parseInt(match[2] || "0");
      
      const parts = [];
      if (hours > 0) {
        parts.push(`${hours}h`);
      }
      if (minutes > 0) {
        parts.push(`${minutes}m`);
      }
      
      return parts.join(" ") || "0m";
    } catch {
      return "Unknown";
    }
  };

  // Filter bookings based on the toggle mode and sort by newest first
  const filteredBookings = bookings
    .filter((booking) => {
      return isLiveMode ? !booking.is_mock : booking.is_mock;
    })
    .sort((a, b) => {
      // Sort by created_at date in descending order (newest first)
      return new Date(b.created_at).getTime() - new Date(a.created_at).getTime();
    });

  // Count bookings by type
  const demoBookingsCount = bookings.filter(b => b.is_mock).length;
  const liveBookingsCount = bookings.filter(b => !b.is_mock).length;

  if (!user) {
    return null;
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-background pt-24 pb-12 px-4">
        <div className="container mx-auto max-w-6xl">
          <div className="flex flex-col items-center justify-center py-12">
            <Loader2 className="h-8 w-8 animate-spin mb-4" />
            <p className="text-muted-foreground">Loading your bookings...</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background pt-24 pb-12 px-4">
      <div className="container mx-auto max-w-6xl">
        <div className="flex flex-col">
          {/* Header */}
          <div className="mb-8">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
              <div>
                <h1 className="text-3xl font-bold tracking-tight">Your Orders</h1>
                <p className="text-muted-foreground mt-2">
                  Track and manage your flight bookings with Flyte AI
                </p>
              </div>
              
              {/* Mode Toggle */}
              <div className="flex items-center gap-2">
                <Switch
                  id="orders-mode-switch"
                  checked={isLiveMode}
                  onCheckedChange={setIsLiveMode}
                />
                <Label htmlFor="orders-mode-switch" className="text-sm font-medium">
                  {isLiveMode ? `Live Mode (${liveBookingsCount})` : `Demo Mode (${demoBookingsCount})`}
                </Label>
              </div>
            </div>
          </div>

          {/* Orders List */}
          <div className="space-y-8">
            {/* Real Bookings from Database */}
            {filteredBookings.map((bookingRecord) => {
              const tickets = convertBookingToIndividualTickets(bookingRecord);
              return tickets.map((ticket) => (
                <IndividualFlightTicket 
                  key={`${bookingRecord.id}-${ticket.type}`} 
                  flight={ticket} 
                />
              ));
            })}

            {/* Empty State - No Fake Demo Tickets */}
            {filteredBookings.length === 0 && (
              <Card className="w-full">
                <CardContent className="flex flex-col items-center justify-center py-12">
                  <Package className="h-12 w-12 text-muted-foreground mb-4" />
                  <h3 className="text-lg font-semibold mb-2">
                    No {isLiveMode ? 'live' : 'demo'} bookings found
                  </h3>
                  <p className="text-muted-foreground text-center mb-4">
                    Your {isLiveMode ? 'live' : 'demo'} flight bookings will appear here when you make a booking through Flyte AI chat.
                    {isLiveMode ? ' Live bookings use real payment and actual flights.' : ' Demo bookings are mock flights for testing purposes.'}
                  </p>
                  <Button onClick={() => router.push("/chat")}>
                    Book Your First Flight
                  </Button>
                </CardContent>
              </Card>
            )}

            {/* Show additional card only when there are real bookings */}
            {filteredBookings.length > 0 && (
              <Card className="w-full">
                <CardContent className="flex flex-col items-center justify-center py-12">
                  <Package className="h-12 w-12 text-muted-foreground mb-4" />
                  <h3 className="text-lg font-semibold mb-2">
                    No more orders
                  </h3>
                  <p className="text-muted-foreground text-center mb-4">
                                         When you book more flights with Flyte AI, they&apos;ll appear here.
                  </p>
                  <Button onClick={() => router.push("/chat")}>
                    Book Another Flight
                  </Button>
                </CardContent>
              </Card>
            )}
          </div>
        </div>
      </div>
    </div>
  );
} 