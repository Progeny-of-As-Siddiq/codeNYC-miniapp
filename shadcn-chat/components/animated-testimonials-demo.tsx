import { AnimatedTestimonials } from "@/components/ui/animated-testimonials";

export default function AnimatedTestimonialsDemo() {
  const processSteps = [
    {
      quote:
        "Tell Flyte AI your travel plans in natural language. Currently, we specialize in singular non-stop round-trip flights - just provide your origin city, destination city, departure date, and return date. For example: 'Book me a flight from New York to London, departing December 15th, returning December 22nd.' Our AI instantly understands your request without any complex forms or dropdown menus.",
      name: "Step 1",
      designation: "Tell Us Your Trip",
      src: "/step1-card.png",
    },
    {
      quote:
        "Our backend APIs immediately search across all our partnered airlines to find available non-stop round-trip flights for your specific dates and cities. We analyze real-time pricing, availability, and schedules from multiple airline partners simultaneously. Our AI then singles out the absolute best deal - the cheapest flight option that matches your exact travel requirements.",
      name: "Step 2", 
      designation: "We Find Your Flight",
      src: "/step2-card.png",
    },
    {
      quote:
        "We present you with the singular cheapest flight option for your specific dates - complete with departure times, airline details, and total cost. Review the flight details and simply say 'yes' to confirm your selection. No comparing dozens of options or endless scrolling - just one perfect match tailored to your needs.",
      name: "Step 3",
      designation: "Confirm Your Selection",
      src: "/step3-card.png",
    },
    {
      quote:
        "Once you confirm, you'll receive a secure Coinbase Commerce payment link. Pay with Bitcoin, Ethereum, or other supported cryptocurrencies. After payment, we verify the transaction and execute your booking with the airline. You'll receive an email confirmation with your complete order details, booking reference, and e-tickets. It's that simple!",
      name: "Step 4",
      designation: "Pay & Receive Confirmation",
      src: "/step4-card.png",
    },
  ];
  return <AnimatedTestimonials testimonials={processSteps} autoplay={true} />;
} 