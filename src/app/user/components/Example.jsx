import Image from 'next/image';

export default function Example() {
    return (
        <>
           <div className="bg-[#FFFAEC] min-h-screen py-12 px-4 pop hidden lg:block">
           <div className="text-center mb-8 sm:mb-12">
                <div className="inline-block mb-3">
                    <span className="text-[10px] sm:text-xs font-bold uppercase tracking-[0.2em] text-orange-500 bg-orange-50 px-4 sm:px-5 py-1.5 sm:py-2 rounded-full border border-orange-200">
                        ★ Destinations
                    </span>
                </div>
                <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-black px-2">
                   Our Latest <span className="text-orange-500">Creations</span>
                </h2>
                <p className="text-gray-500 mt-2 max-w-md mx-auto text-sm sm:text-base px-4">
                     A visual collection of our most recent works.
                </p>
            </div>

            
            <div className="flex items-center gap-2 h-[400px] w-full max-w-5xl mt-10 mx-auto">
                {[
                    '/images/lap1.jpg',
                    '/images/Itimad.jpg',
                    '/images/amber.jpg',
                    '/images/amber.jpg',
                    '/images/amber.jpg',
                    '/images/amber.jpg',
                    '/images/amber.jpg',
                  
                ].map((src, index) => (
                    <div 
                        key={index}
                        className="relative group flex-grow transition-all w-16 rounded-lg overflow-hidden h-[400px] duration-500 hover:w-full border-2 border-white/10"
                    >
                        <Image
                            src={src}
                            alt={`image ${index + 1}`}
                            fill
                            className="object-cover object-center group-hover:scale-105 transition-transform duration-700"
                            sizes="(max-width: 768px) 100vw, 33vw"
                            priority={index < 3}
                        />
                        {/* Overlay on hover */}
                     
                    </div>
                ))}
            </div>
            </div>
        </>
    );
}