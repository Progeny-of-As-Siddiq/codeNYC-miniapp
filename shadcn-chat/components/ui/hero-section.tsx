import Image from 'next/image'
import Link from 'next/link'

export function HeroSection() {
  return (
    <section className="bg-gradient-to-r from-purple-200 to-white text-black">
      <div className="pt-4 pb-2 flex justify-center">
        <Image 
          src="/FlyteAIvec2.svg"
          alt="Flyte AI Logo"
          width={56}
          height={56}
          className="h-12 sm:h-14 w-auto"
        />
      </div>
      <div className="grid max-w-screen-xl px-4 pt-4 pb-8 mx-auto lg:gap-8 xl:gap-0 lg:py-16 lg:grid-cols-12">
        <div className="mr-auto place-self-center lg:col-span-7">
          <h1 className="max-w-2xl mb-4 text-4xl font-extrabold leading-none tracking-tight md:text-5xl xl:text-6xl text-gray-900">
            Flyte AI: The Future of AI-Powered Flight Booking
          </h1>
          <p className="max-w-2xl mb-6 font-light text-gray-700 lg:mb-8 md:text-lg lg:text-xl">
            Flyte AI is an innovative flight booking platform that leverages AI, embedded wallets, AgentKit, and the Coinbase Developer Platform to provide a seamless travel experience, particularly for crypto-savvy users.
          </p>
          <div className="flex justify-center max-w-2xl">
            <Link href="/chat" className="group relative inline-flex w-auto">
              <div className="absolute -inset-px rounded-xl bg-gradient-to-r from-blue-400 via-indigo-500 to-purple-500 opacity-70 blur transition duration-1000 group-hover:opacity-100 group-hover:duration-200 animate-gradient"></div>
              <button className="relative flex items-center justify-center rounded-xl bg-white px-8 py-4 text-lg font-semibold transition-all duration-200 hover:scale-105">
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-indigo-500 to-purple-500">
                  Try the chat!
                </span>
              </button>
            </Link>
          </div>
        </div>
        <div className="flex mt-8 lg:mt-0 lg:col-span-5">
          <video className="w-full rounded-lg" controls>
            <source src="/flyteai_demo.mp4" type="video/mp4" />
            Your browser does not support the video tag.
          </video>
        </div>
      </div>
    </section>
  )
} 