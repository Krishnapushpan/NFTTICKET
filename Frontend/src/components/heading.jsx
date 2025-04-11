import React from 'react';
import logo from '../assets/images/starry-night.png'
function Heading() {
  return (<>
   <div className='flex '>
    <img className='h-[60px] w-[60px] m-12' src={logo} alt="" />
   <div className="flex items-center w-full gap-2 p-8">
      <hr className="flex-grow border-t-2 mt-4  border-[#21618c]" />
      
      <p className="text-5xl mt-4  md:text-7xl text-[#21618c] text-center font-monoton">
        Soul&nbsp;&nbsp;&nbsp;&nbsp;Studio
      </p>
      
      <hr className="flex-grow border-t-2 mt-4  border-[#21618c]" />
    </div>
   </div>
    <div className='items-center w-full'><p className='text-center text-2xl text-[#094d7b] tracking-wide  font-caveat'>"We do not just create art here; we create moments, emotions, and echoes of the unseen."

    </p></div>
    </>
  );
}

export default Heading;
