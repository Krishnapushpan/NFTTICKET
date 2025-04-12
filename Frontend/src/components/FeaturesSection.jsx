import { Globe, Smile, UserRound } from 'lucide-react';

const FeaturesSection = () => {
  return (<>
        <hr className="flex-grow border-t-2 m-20  border-[#21618c]" />
      
    <div className="bg-neutral-600 text-white py-14 m-12 px-4">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-10 text-center">
        {/* Feature 1 */}
        <div className="flex flex-col items-center space-y-4">
          <Globe className="w-10 h-10" />
          <h3 className="text-xl font-semibold">Global Selection</h3>
          <p className="text-sm text-gray-300">
            Explore an unparalleled selection of paintings, photography, sculpture, and more by thousands of artists from around the world.
          </p>
        </div>

        {/* Feature 2 */}
        <div className="flex flex-col items-center space-y-4">
          <Smile className="w-10 h-10" />
          <h3 className="text-xl font-semibold">Satisfaction Guaranteed</h3>
          <p className="text-sm text-gray-300">
            Our 14-day satisfaction guarantee allows you to buy with confidence. If you’re not satisfied with your purchase, return it and we’ll help you find a work you love.
          </p>
        </div>

        {/* Feature 3 */}
        <div className="flex flex-col items-center space-y-4">
          <UserRound className="w-10 h-10" />
          <h3 className="text-xl font-semibold">Complimentary Art Advisory Services</h3>
          <p className="text-sm text-gray-300">
            Our personalized art advisory service gives you access to your own expert curator, free of charge.
          </p>
        </div>
      </div>
    </div>
    </>
  );
};

export default FeaturesSection;
