import Image from 'next/image'

export function FoundersSection() {
  return (
    <section className="bg-white dark:bg-gray-900">
      <div className="max-w-screen-xl px-4 py-8 mx-auto lg:py-16 lg:px-6">
        <div className="max-w-screen-sm mx-auto text-center mb-10">
          <h2 className="mb-4 text-3xl font-extrabold leading-tight tracking-tight text-gray-900 dark:text-white">
            Meet the <span className="text-purple-600">Founders</span>
          </h2>
          <p className="mb-6 font-light text-gray-500 dark:text-gray-400 md:text-lg">
            The team behind Flyte AI&apos;s innovative flight booking platform
          </p>
        </div>
        <div className="mb-10">
          <Image 
            src="/founders.jpeg"
            alt="Flyte AI Founders"
            width={768}
            height={432}
            className="w-full max-w-3xl mx-auto rounded-lg shadow-md"
          />
        </div>
        <div className="grid md:grid-cols-2 gap-12 lg:gap-16 max-w-3xl mx-auto">
          <div className="text-center">
            <h3 className="text-2xl font-bold text-gray-900 dark:text-white">Umar Siddiqui</h3>
            <p className="text-lg font-medium text-purple-600 dark:text-purple-500 mb-4">CTO</p>
            <a href="https://x.com/UmarSid60844409" target="_blank" rel="noopener noreferrer" className="inline-block text-gray-500 hover:text-gray-900 dark:hover:text-white dark:text-gray-400">
              <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path d="M18.901 1.153h3.68l-8.04 9.19L24 22.846h-7.406l-5.8-7.584-6.638 7.584H.474l8.6-9.83L0 1.154h7.594l5.243 6.932ZM17.61 20.644h2.039L6.486 3.24H4.298Z" />
              </svg>
            </a>
          </div>
          <div className="text-center">
            <h3 className="text-2xl font-bold text-gray-900 dark:text-white">Ebrahim Zulqarni</h3>
            <p className="text-lg font-medium text-purple-600 dark:text-purple-500 mb-4">CEO</p>
            <a href="https://x.com/IliyaVidic" target="_blank" rel="noopener noreferrer" className="inline-block text-gray-500 hover:text-gray-900 dark:hover:text-white dark:text-gray-400">
              <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path d="M18.901 1.153h3.68l-8.04 9.19L24 22.846h-7.406l-5.8-7.584-6.638 7.584H.474l8.6-9.83L0 1.154h7.594l5.243 6.932ZM17.61 20.644h2.039L6.486 3.24H4.298Z" />
              </svg>
            </a>
          </div>
        </div>
        <div className="mt-8 text-center max-w-3xl mx-auto">
          <p className="text-gray-500 dark:text-gray-400 italic text-lg">
            &quot;We don&apos;t look at the world the way it is. We look at the world the way we want it to be.&quot;
          </p>
          <p className="text-gray-500 dark:text-gray-400 mt-2">- Thomas Shelby OBE</p>
        </div>
      </div>
    </section>
  )
} 