'use client'

import { useState } from 'react'

export function ProblemSolutionSlider() {
  const [showSolution, setShowSolution] = useState(false)

  return (
    <section className="bg-gray-50 dark:bg-gray-800">
      <div className="max-w-screen-xl px-4 py-8 mx-auto lg:py-16 lg:px-6">
        <div className="relative overflow-hidden">
          <div 
            className="flex transition-transform duration-500 ease-in-out"
            style={{ transform: showSolution ? 'translateX(-100%)' : 'translateX(0)' }}
          >
            {/* Problem Section */}
            <div className="w-full flex-shrink-0 relative">
              <div className="text-center mb-10">
                <h2 className="mb-4 text-3xl font-extrabold tracking-tight text-gray-900 dark:text-white">
                  The <span className="text-purple-600">Problem</span>
                </h2>
                <p className="mb-5 font-light lg:text-xl text-gray-500 sm:text-lg dark:text-gray-400">
                  Flight booking today faces several challenges that make the experience frustrating for users, especially those in the crypto space.
                </p>
              </div>
              <button 
                onClick={() => setShowSolution(true)}
                className="absolute right-4 top-0 z-10 w-12 h-12 bg-purple-600 rounded-full flex items-center justify-center shadow-md hover:bg-purple-700 transition-all duration-300 focus:outline-none focus:ring-4 focus:ring-purple-300"
              >
                <svg className="w-6 h-6 text-white transition-transform duration-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" />
                </svg>
              </button>
              <div className="grid md:grid-cols-2 gap-8 lg:gap-12 max-w-screen-xl mx-auto px-4">
                <div className="bg-white rounded-lg p-6 shadow-sm dark:bg-gray-700">
                  <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-3">Flight Hassle</h3>
                  <p className="text-gray-500 dark:text-gray-400">Booking flights is a hassle—finding the best rate takes time and effort.</p>
                </div>
                <div className="bg-white rounded-lg p-6 shadow-sm dark:bg-gray-700">
                  <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-3">Spend Crypto</h3>
                  <p className="text-gray-500 dark:text-gray-400">Crypto users struggle to spend their digital currency on regular purchases like flights.</p>
                </div>
                <div className="bg-white rounded-lg p-6 shadow-sm dark:bg-gray-700">
                  <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-3">Lack of Agentic Checkout</h3>
                  <p className="text-gray-500 dark:text-gray-400">Most platforms lack a seamless AI agent for a smoother payment experience.</p>
                </div>
                <div className="bg-white rounded-lg p-6 shadow-sm dark:bg-gray-700">
                  <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-3">Ease of Use</h3>
                  <p className="text-gray-500 dark:text-gray-400">Lack of natural interaction—most booking systems rely on rigid, outdated menus instead of conversation.</p>
                </div>
              </div>
            </div>

            {/* Solution Section */}
            <div className="w-full flex-shrink-0 relative">
              <div className="text-center mb-10">
                <h2 className="mb-4 text-3xl font-extrabold tracking-tight text-gray-900 dark:text-white">
                  The <span className="text-purple-600">Solution</span>
                </h2>
                <p className="mb-5 font-light lg:text-xl text-gray-500 sm:text-lg dark:text-gray-400">
                  Flyte AI addresses these challenges with innovative solutions that transform the flight booking experience.
                </p>
              </div>
              <button 
                onClick={() => setShowSolution(false)}
                className="absolute left-4 top-0 z-10 w-12 h-12 bg-purple-600 rounded-full flex items-center justify-center shadow-md hover:bg-purple-700 transition-all duration-300 focus:outline-none focus:ring-4 focus:ring-purple-300"
              >
                <svg className="w-6 h-6 text-white transform rotate-180" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" />
                </svg>
              </button>
              <div className="grid md:grid-cols-2 gap-8 lg:gap-12 max-w-screen-xl mx-auto px-4">
                <div className="bg-white rounded-lg p-6 shadow-sm border border-gray-100 dark:border-gray-700 dark:bg-gray-800">
                  <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-3">Seamless Flight Booking</h3>
                  <p className="text-gray-500 dark:text-gray-400">AI-driven flight search and booking tailored to user preferences, streamlining the process from start to finish.</p>
                </div>
                <div className="bg-white rounded-lg p-6 shadow-sm border border-gray-100 dark:border-gray-700 dark:bg-gray-800">
                  <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-3">Crypto Payments Made Simple</h3>
                  <p className="text-gray-500 dark:text-gray-400">Integration with the Coinbase Developer Platform to allow users to pay for flights with cryptocurrency, unlocking new ways to spend.</p>
                </div>
                <div className="bg-white rounded-lg p-6 shadow-sm border border-gray-100 dark:border-gray-700 dark:bg-gray-800">
                  <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-3">AI-Powered Checkouts</h3>
                  <p className="text-gray-500 dark:text-gray-400">AI agents facilitate booking and payment, offering a personalized, conversational experience for a smoother journey.</p>
                </div>
                <div className="bg-white rounded-lg p-6 shadow-sm border border-gray-100 dark:border-gray-700 dark:bg-gray-800">
                  <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-3">Next-Gen User Experience</h3>
                  <p className="text-gray-500 dark:text-gray-400">A conversational interface that makes flight booking feel like a natural, engaging conversation—beyond just clicking options.</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
} 