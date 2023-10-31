import React from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

const TermsAndConditions = () => {
  return (
    <>
      <Navbar />
      <div className="container mx-auto p-4 md:p-8 text-zinc-300">
        <h1 className="text-2xl font-bold mb-4">Terms & Conditions</h1>

        <div className="mb-4">
          <h2 className="text-xl font-semibold mb-2">1. Booking and Payment</h2>
          <ul className="list-disc list-inside text-zinc-400">
            <li>
              A non-refundable deposit is required to secure your booking date
              and time.
            </li>
            <li>
              The remaining balance is due on the day of the shoot, payable by
              cash or credit card.
            </li>
            <li>
              Additional charges may apply for extended shooting time, travel,
              and special requests.
            </li>
          </ul>
        </div>

        <div className="mb-4">
          <h2 className="text-xl font-semibold mb-2">
            2. Cancellations and Rescheduling
          </h2>
          <ul className="list-disc list-inside text-zinc-400">
            <li>
              Cancellations made less than 48 hours before the shoot will
              forfeit the deposit.
            </li>
            <li>
              Rescheduling is allowed up to 24 hours before the shoot, subject
              to photographer availability.
            </li>
          </ul>
        </div>

        <div className="mb-4">
          <h2 className="text-xl font-semibold mb-2">
            3. Image Delivery and Usage
          </h2>
          <ul className="list-disc list-inside text-zinc-400">
            <li>
              Images will be delivered digitally within a specified timeframe
              agreed upon at booking.
            </li>
            <li>
              The photographer retains the copyright to all images, and a
              separate license agreement is required for commercial use.
            </li>
          </ul>
        </div>

        <div className="mb-4">
          <h2 className="text-xl font-semibold mb-2">4. Liability</h2>
          <ul className="list-disc list-inside text-zinc-400">
            <li>
              The photographer is not liable for any injuries or damages that
              occur during the shoot.
            </li>
            <li>
              Clients are responsible for their own safety and the safety of
              their property during the shoot.
            </li>
          </ul>
        </div>

        <div className="mb-4">
          <h2 className="text-xl font-semibold mb-2">5. Privacy</h2>
          <ul className="list-disc list-inside text-zinc-400">
            <li>
              Personal information collected during the booking process will be
              kept confidential and not shared with third parties.
            </li>
          </ul>
        </div>

        <div className="mb-4">
          <h2 className="text-xl font-semibold mb-2">6. Miscellaneous</h2>
          <ul className="list-disc list-inside text-zinc-400">
            <li>
              The photographer may use the images for promotional and portfolio
              purposes unless otherwise agreed upon in writing.
            </li>
          </ul>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default TermsAndConditions;
