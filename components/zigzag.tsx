import Image from 'next/image'

import FeatImage01 from '@/public/images/features-03-image-01.png'
import FeatImage02 from '@/public/images/features-03-image-02.png'
import FeatImage03 from '@/public/images/features-03-image-03.png'

export default function Zigzag() {
  return (
    <section>
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <div className="py-6 md:py-10 border-t border-gray-800">
          {/* Section header */}
          <div className="max-w-3xl mx-auto text-center pb-12 md:pb-16">
            <div className="inline-flex text-sm font-semibold py-1 px-3 m-2 text-green-600 bg-green-200 rounded-full mb-4">Read things that matter</div>
            <h1 className="h2 mb-4">One app, unlimited possibilities</h1>
            <p className="text-xl text-gray-400">Using the latest and greatest open source models machine learning models, I aim to deliver the best TTS experience possible.</p>
          </div>
        </div>
      </div>
    </section>
  )
}
