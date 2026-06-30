// components/Reviews.jsx
'use client';

import React from 'react';
import Image from 'next/image';

const Reviews = () => {
    const cardsData = [
        {
            image: '/images/men.webp',
            name: 'Briar Martin',
            handle: '@neilstellar',
            date: 'April 20, 2025',
            review: 'Radiant made undercutting all of our competitors an absolute breeze. The experience was seamless and the results exceeded our expectations.'
        },
        {
            image: '/images/men.webp',
            name: 'Avery Johnson',
            handle: '@averywrites',
            date: 'May 10, 2025',
            review: 'Absolutely incredible service! The team went above and beyond to ensure everything was perfect. Highly recommended!'
        },
        {
            image: '/images/men.webp',
            name: 'Jordan Lee',
            handle: '@jordantalks',
            date: 'June 5, 2025',
            review: 'Best decision we ever made. The attention to detail and customer service is unmatched. Will definitely use again.'
        },
        {
            image: '/images/men.webp',
            name: 'Sophia Chen',
            handle: '@sophiatalks',
            date: 'March 15, 2025',
            review: 'What an amazing journey! Every moment was carefully planned and executed flawlessly. A truly memorable experience.'
        },
        {
            image: '/images/men.webp',
            name: 'Michael Torres',
            handle: '@mikeexplores',
            date: 'February 28, 2025',
            review: 'Five stars all the way! From start to finish, everything was handled professionally. Can\'t wait for our next adventure.'
        },
        {
            image: '/images/men.webp',
            name: 'Emma Wilson',
            handle: '@emmaadventures',
            date: 'January 10, 2025',
            review: 'This was the trip of a lifetime! The personalized service made all the difference. Thank you for the wonderful memories.'
        },
    ];

    const StarRating = () => (
        <div className="flex gap-0.5 mt-2">
            {[...Array(5)].map((_, i) => (
                <svg key={i} className="w-3.5 h-3.5 fill-orange-500" viewBox="0 0 20 20">
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                </svg>
            ))}
        </div>
    );

    const CreateCard = ({ card }) => (
        <div className="bg-white rounded-2xl mx-2 sm:mx-4 shadow-lg hover:shadow-2xl hover:shadow-orange-500/20 transition-all duration-300 w-[280px] sm:w-72 shrink-0 border border-orange-100 hover:border-orange-300 hover:-translate-y-1 p-4 sm:p-5 group relative">
            {/* Orange Accent Line on Hover */}
            <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-orange-400 to-orange-500 rounded-t-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>

            {/* Header - Avatar & Name */}
            <div className="flex items-center gap-3">
                <div className="relative size-10 sm:size-11 rounded-full overflow-hidden border-2 border-orange-400 shadow-md shadow-orange-500/20 flex-shrink-0 group-hover:scale-110 transition-transform duration-300">
                    <Image 
                        src={card.image} 
                        alt={card.name}
                        fill
                        className="object-cover"
                    />
                </div>
                <div className="flex flex-col flex-1 min-w-0">
                    <div className="flex items-center gap-1.5">
                        <p className="text-black font-semibold text-xs sm:text-sm truncate">{card.name}</p>
                        <svg className="mt-0.5 fill-orange-500 flex-shrink-0" width="14" height="14" viewBox="0 0 12 12" xmlns="http://www.w3.org/2000/svg">
                            <path fillRule="evenodd" clipRule="evenodd" d="M4.555.72a4 4 0 0 1-.297.24c-.179.12-.38.202-.59.244a4 4 0 0 1-.38.041c-.48.039-.721.058-.922.129a1.63 1.63 0 0 0-.992.992c-.071.2-.09.441-.129.922a4 4 0 0 1-.041.38 1.6 1.6 0 0 1-.245.59 3 3 0 0 1-.239.297c-.313.368-.47.551-.56.743-.213.444-.213.96 0 1.404.09.192.247.375.56.743.125.146.187.219.24.297.12.179.202.38.244.59.018.093.026.189.041.38.039.48.058.721.129.922.163.464.528.829.992.992.2.071.441.09.922.129.191.015.287.023.38.041.21.042.411.125.59.245.078.052.151.114.297.239.368.313.551.47.743.56.444.213.96.213 1.404 0 .192-.09.375-.247.743-.56.146-.125.219-.187.297-.24.179-.12.38-.202.59-.244a4 4 0 0 1 .38-.041c.48-.039.721-.058.922-.129.464-.163.829-.528.992-.992.071-.2.09-.441.129-.922a4 4 0 0 1 .041-.38c.042-.21.125-.411.245-.59.052-.078.114-.151.239-.297.313-.368.47-.551.56-.743.213-.444.213-.96 0-1.404-.09-.192-.247-.375-.56-.743a4 4 0 0 1-.24-.297 1.6 1.6 0 0 1-.244-.59 3 3 0 0 1-.041-.38c-.039-.48-.058-.721-.129-.922a1.63 1.63 0 0 0-.992-.992c-.2-.071-.441-.09-.922-.129a4 4 0 0 1-.38-.041 1.6 1.6 0 0 1-.59-.245A3 3 0 0 1 7.445.72C7.077.407 6.894.25 6.702.16a1.63 1.63 0 0 0-1.404 0c-.192.09-.375.247-.743.56m4.07 3.998a.488.488 0 0 0-.691-.69l-2.91 2.91-.958-.957a.488.488 0 0 0-.69.69l1.302 1.302c.19.191.5.191.69 0z" />
                        </svg>
                    </div>
                    <span className="text-xs text-gray-400">{card.handle}</span>
                </div>
            </div>

            {/* Star Rating */}
            <StarRating />

            {/* Review Text */}
            <p className="text-xs sm:text-sm py-3 text-gray-700 leading-relaxed line-clamp-3">
                {card.review}
            </p>
        </div>
    );

    return (
        <div className="min-h-screen bg-[#FFFBEC] py-12 sm:py-16 px-2 sm:px-4 pop">
            {/* Title Section */}
            <div className="text-center mb-8 sm:mb-12">
                <div className="inline-block mb-3">
                    <span className="text-[10px] sm:text-xs font-bold uppercase tracking-[0.2em] text-orange-500 bg-orange-50 px-4 sm:px-5 py-1.5 sm:py-2 rounded-full border border-orange-200">
                        ★ Testimonials
                    </span>
                </div>
                <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-black px-2">
                    What Our <span className="text-orange-500">Travelers</span> Say
                </h2>
                <p className="text-gray-500 mt-2 max-w-md mx-auto text-sm sm:text-base px-4">
                    Real stories from real adventurers
                </p>
            </div>

            <style jsx>{`
                @keyframes marqueeScroll {
                    0% { transform: translateX(0%); }
                    100% { transform: translateX(-50%); }
                }

                .marquee-inner {
                    animation: marqueeScroll 35s linear infinite;
                }

                .marquee-reverse {
                    animation-direction: reverse;
                }

                @keyframes fadeInUp {
                    from {
                        opacity: 0;
                        transform: translateY(30px);
                    }
                    to {
                        opacity: 1;
                        transform: translateY(0);
                    }
                }

                .marquee-row {
                    animation: fadeInUp 0.8s ease-out forwards;
                }

                .marquee-row:nth-child(2) {
                    animation-delay: 0.3s;
                    opacity: 0;
                }

                .marquee-inner:hover {
                    animation-play-state: paused;
                }

                /* Mobile optimizations */
                @media (max-width: 640px) {
                    .marquee-inner {
                        animation-duration: 25s;
                    }
                    
                    .marquee-row {
                        padding-top: 0.5rem;
                        padding-bottom: 0.5rem;
                    }
                }
            `}</style>

            {/* First Marquee Row */}
            <div className="marquee-row w-full max-w-7xl mx-auto overflow-hidden relative py-2 sm:py-4">
                <div className="absolute left-0 top-0 h-full w-12 sm:w-24 z-10 pointer-events-none bg-gradient-to-r from-[#FFFBEC] via-[#FFFBEC]/80 to-transparent"></div>
                <div className="marquee-inner flex transform-gpu min-w-[200%] gap-1 sm:gap-2">
                    {[...cardsData, ...cardsData].map((card, index) => (
                        <CreateCard key={index} card={card} />
                    ))}
                </div>
                <div className="absolute right-0 top-0 h-full w-12 sm:w-24 z-10 pointer-events-none bg-gradient-to-l from-[#FFFBEC] via-[#FFFBEC]/80 to-transparent"></div>
            </div>

            {/* Second Marquee Row (Reverse) */}
            <div className="marquee-row w-full max-w-7xl mx-auto overflow-hidden relative py-2 sm:py-4">
                <div className="absolute left-0 top-0 h-full w-12 sm:w-24 z-10 pointer-events-none bg-gradient-to-r from-[#FFFBEC] via-[#FFFBEC]/80 to-transparent"></div>
                <div className="marquee-inner marquee-reverse flex transform-gpu min-w-[200%] gap-1 sm:gap-2">
                    {[...cardsData, ...cardsData].map((card, index) => (
                        <CreateCard key={index} card={card} />
                    ))}
                </div>
                <div className="absolute right-0 top-0 h-full w-12 sm:w-24 z-10 pointer-events-none bg-gradient-to-l from-[#FFFBEC] via-[#FFFBEC]/80 to-transparent"></div>
            </div>
        </div>
    );
};

export default Reviews;