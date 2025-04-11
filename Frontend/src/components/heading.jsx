import React from 'react';
import logo from '../assets/images/starry-night.png'
function Heading() {
  return (<>
   <div className='flex '>
    <img className='h-[80px] w-[80px] m-12' src={logo} alt="" />
   <div className="flex items-center w-full gap-4 p-10">
      <hr className="flex-grow border-t-2 mt-4  border-[#21618c]" />
      
      <p className="text-5xl mt-4  md:text-7xl text-[#21618c] text-center font-monoton">
        Soul&nbsp;&nbsp;&nbsp;&nbsp;Studio
      </p>
      
      <hr className="flex-grow border-t-2 mt-4  border-[#21618c]" />
    </div>
   </div>
    <div className='items-center w-full'><p className='text-center text-2xl text-[#5dade2] tracking-wide  font-caveat'>"We do not just create art here; we create moments, emotions, and echoes of the unseen."

    </p></div>
    </>
  );
}

export default Heading;
