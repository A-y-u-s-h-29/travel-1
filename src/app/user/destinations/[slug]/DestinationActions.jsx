'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Send, Search, ArrowRight } from 'lucide-react';
import PopupForm from '../../components/PopupForm';

export default function DestinationActions({ destinationName }) {
  const router = useRouter();
  const [isPopupOpen, setIsPopupOpen] = useState(false);

  return (
    <>
      <div className="flex flex-col gap-3">
        <button
          onClick={() => setIsPopupOpen(true)}
          className="w-full py-3.5 px-6 bg-gradient-to-r from-orange-500 to-amber-500 hover:from-orange-600 hover:to-amber-600 text-white font-semibold rounded-2xl shadow-lg shadow-orange-500/30 hover:shadow-orange-500/50 transition-all duration-300 hover:scale-[1.02] active:scale-[0.98] flex items-center justify-center gap-2 group"
        >
          <Send className="w-4 h-4 group-hover:rotate-[-20deg] transition-transform duration-300" />
          Enquire Now
        </button>
        
        <button
          onClick={() => router.push('/user/destinations')}
          className="w-full py-3.5 px-6 bg-white hover:bg-orange-50 text-orange-600 font-medium rounded-2xl border-2 border-orange-200 hover:border-orange-400 transition-all duration-300 hover:shadow-md flex items-center justify-center gap-2 group"
        >
          <Search className="w-4 h-4 group-hover:rotate-12 transition-transform duration-300" />
          Browse More Trips
          <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-300" />
        </button>
      </div>

      <PopupForm
        isOpen={isPopupOpen}
        onClose={() => setIsPopupOpen(false)}
        destinationName={destinationName}
      />
    </>
  );
}