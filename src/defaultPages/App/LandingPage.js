import React from 'react'
import Hero from './Hero'
import NavBar from './NavBar'
import Features from './Features'
import Trusted from './Trusted'
import Pricing from './Pricing'
import Team from './Team'
import FAQ from './FAQ'
import Footer from './Footer'

const LandingPage = () => {
    return (
        <div className='mx-auto max-w-6xl bg-gradient-to-r from-green-400 via-green-200 to-green-200 shadow-2xl'>
            <NavBar />
            <Hero />
            <Features />
            <Trusted />
            <Pricing />
            <Team/>
            <FAQ />
            <Footer />
        </div>
    )
}

export default LandingPage
