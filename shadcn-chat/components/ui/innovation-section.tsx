import Image from 'next/image'

export function InnovationSection() {
  return (
    <section className="bg-gradient-to-r from-purple-100 to-white dark:bg-gray-800">
      <div className="max-w-screen-xl px-4 py-8 mx-auto lg:py-16 lg:px-6">
        <div className="max-w-screen-sm mx-auto text-center mb-8">
          <h2 className="mb-4 text-3xl font-extrabold leading-tight tracking-tight text-gray-900 dark:text-white">
            Powered by <span className="text-purple-600">Innovation</span>
          </h2>
          <p className="mb-6 font-light text-gray-500 dark:text-gray-400 md:text-lg">
            Cutting-edge technologies working together to transform flight booking
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-10">
          <div className="bg-white rounded-lg p-6 shadow-md border-t-4 border-purple-500 dark:bg-gray-800 dark:border-purple-400 transform transition duration-300 hover:-translate-y-1">
            <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-3">AI-Driven Flight Search</h3>
            <p className="text-gray-500 dark:text-gray-400">Using AI to find the best flight options between cities, optimizing for price and preferences.</p>
          </div>
          <div className="bg-white rounded-lg p-6 shadow-md border-t-4 border-purple-500 dark:bg-gray-800 dark:border-purple-400 transform transition duration-300 hover:-translate-y-1">
            <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-3">Agentkit Powered Payment</h3>
            <p className="text-gray-500 dark:text-gray-400">Powered by AgentKit, facilitating smooth and secure crypto payments.</p>
          </div>
          <div className="bg-white rounded-lg p-6 shadow-md border-t-4 border-purple-500 dark:bg-gray-800 dark:border-purple-400 transform transition duration-300 hover:-translate-y-1">
            <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-3">Embedded Crypto Wallets</h3>
            <p className="text-gray-500 dark:text-gray-400">Secure, user-controlled wallets to keep funds safe while enabling seamless transactions.</p>
          </div>
          <div className="bg-white rounded-lg p-6 shadow-md border-t-4 border-purple-500 dark:bg-gray-800 dark:border-purple-400 transform transition duration-300 hover:-translate-y-1">
            <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-3">Conversational AI</h3>
            <p className="text-gray-500 dark:text-gray-400">Voice and text chat interfaces to guide users through booking and confirmation in real-time.</p>
          </div>
        </div>
        <div className="grid grid-cols-2 gap-8 text-gray-500 sm:gap-12 sm:grid-cols-3 lg:grid-cols-5 dark:text-gray-400">
          <a href="#" className="flex items-center lg:justify-center">
            <Image src="/Coinbase_Wordmark.svg" alt="Coinbase Logo" width={120} height={36} className="h-9 hover:text-gray-900 dark:hover:text-white" />
          </a>
          <a href="#" className="flex items-center lg:justify-center">
            <Image src="/elevenlabs-logo-black.svg" alt="Elevenlabs Logo" width={120} height={36} className="h-9 hover:text-gray-900 dark:hover:text-white" />
          </a>
          <a href="#" className="flex items-center lg:justify-center">
            <Image src="/google.png" alt="Google Logo" width={48} height={48} className="h-12 w-auto hover:text-gray-900 dark:hover:text-white" />
          </a>
          <a href="#" className="flex items-center lg:justify-center">
            <Image src="/duffel_logo.svg" alt="Duffel Logo" width={120} height={36} className="h-9 hover:text-gray-900 dark:hover:text-white" />
          </a>
          <a href="#" className="flex items-center lg:justify-center">
            <Image src="/SMALLEROPENAIWBG-removebg-preview.png" alt="OpenAI Logo" width={120} height={36} className="h-9 w-auto object-contain hover:text-gray-900 dark:hover:text-white" />
          </a>
        </div>
      </div>
    </section>
  )
} 