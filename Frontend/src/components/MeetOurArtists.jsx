import React from 'react';
import Artist1 from '../assets/images/artist1.jpg'
import Artist2 from '../assets/images/artist2.jpg'
import Artist3 from '../assets/images/artist3.jpg'

export default function MeetOurArtists() {
  return (
<section className="max-w-full mx-auto px-2 md:px-6 py-12 mr-[100px] ml-[100px]">
<div className="flex items-center justify-between mb-8">
        <h2 className="text-2xl font-semibold text-gray-800">Meet Our Artists</h2>
        <button className="text-sm font-medium text-blue-700 hover:underline">View All</button>
      </div>
      <div className=" wifull grid md:grid-cols-3 gap-14">
        
        {/* Artist 1 */}
        <div className="group">
          <img
            src={Artist2}
            alt="Amara Patel"
            className="rounded-md w-full h-[500px] object-cover shadow-md group-hover:scale-105 transition-transform duration-300"
          />
          <h3 className="mt-4 text-lg font-bold text-gray-900">Amara Patel</h3>
          <p className="text-sm text-gray-600">Abstract & Minimalism</p>
          <button className="mt-2 text-sm text-blue-600 hover:underline">View Profile</button>
        </div>

        {/* Artist 2 */}
        <div className="group">
          <img
            src={Artist1}
            alt="Jamal Rivera"
            className="rounded-md w-full h-[500px] object-cover shadow-md group-hover:scale-105 transition-transform duration-300"
          />
          <h3 className="mt-4 text-lg font-bold text-gray-900">Jamal Rivera</h3>
          <p className="text-sm text-gray-600">Modern Portraits</p>
          <button className="mt-2 text-sm text-blue-600 hover:underline">View Profile</button>
        </div>

        {/* Artist 3 */}
        <div className="group">
          <img
            src={Artist3}
            alt="Sophie Chen"
            className="rounded-md w-full h-[500px] object-cover shadow-md group-hover:scale-105 transition-transform duration-300"
          />
          <h3 className="mt-4 text-lg font-bold text-gray-900">Sophie Chen</h3>
          <p className="text-sm text-gray-600">Contemporary Landscapes</p>
          <button className="mt-2 text-sm text-blue-600 hover:underline">View Profile</button>
        </div>

      </div>
    </section>
  );
}
