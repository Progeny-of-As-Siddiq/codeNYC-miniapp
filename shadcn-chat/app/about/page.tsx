export default function About() {
  return (
    <div className="container mx-auto pt-24 pb-12 px-4">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl font-bold tracking-tight sm:text-5xl md:text-6xl mb-8">
          About <span className="text-[#9089fc]">Flyte AI</span>
        </h1>
        
        <div className="prose prose-lg max-w-none dark:prose-invert">
          <p className="text-xl text-muted-foreground mb-8">
            Flyte AI is revolutionizing the way people book flights by combining artificial intelligence with cryptocurrency payments.
          </p>
          
          <h2 className="text-3xl font-bold mb-4">Our Mission</h2>
          <p className="mb-6">
            We believe travel should be instant, secure, and accessible to everyone. By leveraging AI and blockchain technology, 
            we&apos;re making flight booking as simple as having a conversation.
          </p>
          
          <h2 className="text-3xl font-bold mb-4">How It Works</h2>
          <div className="grid md:grid-cols-2 gap-6 mb-8">
            <div className="p-6 border rounded-lg">
              <h3 className="text-xl font-semibold mb-3">1. Chat with AI</h3>
              <p>Simply tell our AI assistant where and when you want to travel. Use natural language like &ldquo;I want to fly to Paris next week&rdquo;.</p>
            </div>
            <div className="p-6 border rounded-lg">
              <h3 className="text-xl font-semibold mb-3">2. Get Instant Results</h3>
              <p>Our AI searches thousands of flights in real-time and presents you with the best options tailored to your preferences.</p>
            </div>
            <div className="p-6 border rounded-lg">
              <h3 className="text-xl font-semibold mb-3">3. Pay with Crypto</h3>
              <p>Complete your booking using USDC, ETH, or traditional payment methods. Fast, secure, and transparent.</p>
            </div>
            <div className="p-6 border rounded-lg">
              <h3 className="text-xl font-semibold mb-3">4. Travel Instantly</h3>
              <p>Receive your tickets immediately and enjoy your journey. No waiting, no hassle.</p>
            </div>
          </div>
          
          <h2 className="text-3xl font-bold mb-4">Why Choose Flyte AI?</h2>
          <ul className="list-disc pl-6 mb-6">
            <li>Lightning-fast booking process</li>
            <li>Cryptocurrency payment support</li>
            <li>AI-powered personalized recommendations</li>
            <li>24/7 availability</li>
            <li>Transparent pricing with no hidden fees</li>
            <li>Secure and private transactions</li>
          </ul>
          
          <h2 className="text-3xl font-bold mb-4">The Future of Travel</h2>
          <p>
            We&apos;re just getting started. Our vision extends beyond flight booking to create a comprehensive travel ecosystem 
            powered by AI and blockchain technology. Join us as we reshape the future of travel.
          </p>
        </div>
      </div>
    </div>
  )
} 