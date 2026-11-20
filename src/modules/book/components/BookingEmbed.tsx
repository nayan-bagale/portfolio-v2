"use client";

import "@calcom/atoms/globals.min.css";
import { BookerEmbed } from "@calcom/atoms";
import { booking } from "@/content/site";

/** Cal.com booker for the /book page. Its stylesheet is imported here so only this page loads it. */
export function BookingEmbed() {
  return (
    <div className="booking-embed">
    <BookerEmbed
      apiUrl={booking.apiUrl}
      eventSlug={booking.eventSlug}
      view="MONTH_VIEW"
      username={booking.username}
      customClassNames={{
        bookerContainer: "border-subtle border",
      }}
      onCreateBookingSuccess={() => {
        console.log("booking created successfully");
      }}
    />
    </div>
  );
}
