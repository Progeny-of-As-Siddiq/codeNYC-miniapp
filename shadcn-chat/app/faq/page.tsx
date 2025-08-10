import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"

export default function FAQPage() {
  return (
    <main className="flex min-h-screen flex-col">
      <div className="container mx-auto px-4 pt-24 pb-12 max-w-4xl">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold tracking-tight sm:text-5xl md:text-6xl mb-4">
            Frequently Asked Questions
          </h1>
          <p className="text-xl text-muted-foreground">
            Everything you need to know about Flyte AI
          </p>
        </div>

        <Accordion type="single" collapsible className="w-full space-y-4">
          <AccordionItem value="item-1" className="border rounded-lg px-6">
            <AccordionTrigger className="text-left">
              What is Flyte AI and how does it work?
            </AccordionTrigger>
            <AccordionContent>
              Flyte AI is an AI-powered flight booking platform that allows you to search, compare, and book flights using natural language. Simply tell our AI assistant where you want to go, and it will help you find the best flights and handle the booking process. You can pay with cryptocurrency or traditional payment methods.
            </AccordionContent>
          </AccordionItem>

          <AccordionItem value="item-2" className="border rounded-lg px-6">
            <AccordionTrigger className="text-left">
              How do I modify or cancel my flight?
            </AccordionTrigger>
            <AccordionContent>
              We&apos;re currently building flight modification and cancellation features directly into Flyte AI, which will be available soon. For now, please send all modification and cancellation requests to <a href="mailto:agent@flyteai.io" className="text-primary hover:underline">agent@flyteai.io</a> within 24 hours of booking and include your booking confirmation. Our team will process your request and get back to you as quickly as possible.
            </AccordionContent>
          </AccordionItem>

          <AccordionItem value="item-3" className="border rounded-lg px-6">
            <AccordionTrigger className="text-left">
              What cryptocurrencies do you accept?
            </AccordionTrigger>
            <AccordionContent>
              Flyte AI accepts cryptocurrencies across a variety of networks through our integration with Coinbase Commerce. Coinbase Commerce supports payments across multiple blockchain networks, including Ethereum Mainnet, Base, and Polygon. This allows you to pay with a wide range of cryptocurrencies and tokens available on these networks, giving you flexibility in how you complete your booking.
            </AccordionContent>
          </AccordionItem>

          <AccordionItem value="item-4" className="border rounded-lg px-6">
            <AccordionTrigger className="text-left">
              Is my personal and payment information secure?
            </AccordionTrigger>
            <AccordionContent>
              Yes, security is our top priority. We use industry-standard encryption to protect your personal information. For cryptocurrency payments, we partner with Coinbase Commerce, a trusted and secure payment processor. We never store your payment information on our servers, and all transactions are processed through secure, encrypted channels.
            </AccordionContent>
          </AccordionItem>

          <AccordionItem value="item-5" className="border rounded-lg px-6">
            <AccordionTrigger className="text-left">
              Can I use Flyte AI without creating an account?
            </AccordionTrigger>
            <AccordionContent>
              Yes! You can try Flyte AI in demo mode without creating an account. This allows you to explore our AI assistant and see how it works. However, to make actual flight bookings, you&apos;ll need to create an account and switch to live mode. Creating an account also allows you to save your preferences and view your booking history.
            </AccordionContent>
          </AccordionItem>

          <AccordionItem value="item-6" className="border rounded-lg px-6">
            <AccordionTrigger className="text-left">
              What&apos;s the difference between demo mode and live mode?
            </AccordionTrigger>
            <AccordionContent>
              Demo mode allows you to interact with our AI assistant and see sample flight results. To test the complete booking experience, demo mode includes a 1 cent payment to demonstrate our payment flow without the cost of a real flight. It&apos;s perfect for exploring Flyte AI&apos;s capabilities. Live mode connects to real flight data and allows you to make actual bookings with real payments. You&apos;ll need to be logged in to access live mode.
            </AccordionContent>
          </AccordionItem>

          <AccordionItem value="item-7" className="border rounded-lg px-6">
            <AccordionTrigger className="text-left">
              How accurate are the flight prices and availability?
            </AccordionTrigger>
            <AccordionContent>
              In live mode, Flyte AI connects directly to airline systems, providing real-time flight prices and availability. Prices are accurate at the time of search, but can change quickly due to airline pricing algorithms. We recommend booking promptly once you find a flight you like to secure the displayed price.
            </AccordionContent>
          </AccordionItem>

          <AccordionItem value="item-8" className="border rounded-lg px-6">
            <AccordionTrigger className="text-left">
              What if I need help with my booking?
            </AccordionTrigger>
            <AccordionContent>
              Our support team is here to help! You can reach us at <a href="/contact" className="text-primary hover:underline">our contact page</a> for any questions about your booking, technical issues, or general inquiries. We aim to respond to all emails within 24 hours. You can also use our AI assistant for immediate help with common questions.
            </AccordionContent>
          </AccordionItem>

          <AccordionItem value="item-9" className="border rounded-lg px-6">
            <AccordionTrigger className="text-left">
              Are there any fees for using Flyte AI?
            </AccordionTrigger>
            <AccordionContent>
              Flyte AI charges a small 2% service fee on bookings, which helps us maintain our AI technology and provide 24/7 support. This is significantly lower than many traditional travel booking sites that often charge 5-10% or more in hidden fees. When you pay with cryptocurrency, standard network transaction fees may also apply depending on the cryptocurrency you choose - these fees go to the blockchain network, not to Flyte AI.
            </AccordionContent>
          </AccordionItem>

          <AccordionItem value="item-10" className="border rounded-lg px-6">
            <AccordionTrigger className="text-left">
              What airlines and routes do you support?
            </AccordionTrigger>
            <AccordionContent>
              Flyte AI provides access to hundreds of airlines worldwide, including major carriers and low-cost airlines. We support both domestic and international routes. Our coverage includes most popular destinations globally, and we&apos;re constantly expanding our network to include more airlines and routes.
            </AccordionContent>
          </AccordionItem>
        </Accordion>

        <div className="mt-12 text-center">
          <p className="text-muted-foreground mb-4">
            Still have questions?
          </p>
          <a 
            href="/contact" 
            className="inline-flex items-center justify-center rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 bg-primary text-primary-foreground hover:bg-primary/90 h-10 px-4 py-2"
          >
            Contact Support
          </a>
        </div>
      </div>
    </main>
  );
} 