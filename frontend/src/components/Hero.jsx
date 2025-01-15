import React from 'react'

const Hero = () => {
    return (
        <div>
            <section className="bg-slate-800 py-20 mb-4">
                <div
                    className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col items-center"
                >
                    <div className="text-center">
                        <h1
                            className="text-4xl font-extrabold text-white sm:text-5xl md:text-6xl"
                        >
                            Simplify Contact Management
                        </h1>
                        <p className="my-4 text-xl text-white">
                            Find the right solution to organize and manage your contacts efficiently.
                        </p>
                    </div>
                </div>
            </section>
        </div>
    )
}

export default Hero