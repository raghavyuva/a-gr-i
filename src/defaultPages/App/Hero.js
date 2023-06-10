import React from 'react'

const Hero = () => {
  return (
    <div>
                  <div class=" px-6 py-12 text-center md:px-12 lg:py-24 lg:text-left">
                <div class="w-100 mx-auto text-neutral-800 sm:max-w-2xl md:max-w-3xl lg:max-w-5xl xl:max-w-7xl">
                    <div class="grid items-center gap-12 lg:grid-cols-2">
                        <div class="mt-12 lg:mt-0">
                            <h1
                                class="mt-0 mb-12 text-5xl font-bold tracking-tight md:text-6xl xl:text-7xl text-black">
                                The best product <br /><span class="text-black">for a farmer</span>
                            </h1>
                            <p class="opacity-70 text-black">
                                Lorem ipsum dolor, sit amet consectetur adipisicing elit.
                                Temporibus, expedita iusto veniam atque, magni tempora
                                mollitia dolorum consequatur nulla, neque debitis eos
                                reprehenderit quasi ab ipsum nisi dolorem modi. Quos?
                            </p>
                        </div>
                    <img src="https://th-i.thgim.com/public/sci-tech/agriculture/87sx5z/article30131510.ece/alternates/LANDSCAPE_1200/NEWS2FARMER" className='w-full' alt='image' />
                </div>
                </div>
            </div>
    </div>
  )
}

export default Hero
