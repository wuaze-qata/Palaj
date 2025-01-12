"use client";
import Image from 'next/image'
import { useRouter } from "next/navigation";

export default function Err() {
  
  const router = useRouter();
  
  const handleSubmit = () => {
    
          router.push('/card');
  }
  
  return (
    <div className="flex items-center justify-center pt-24 bg-gray-100">
      <div className="bg-white shadow-lg rounded-lg p-6 w-full max-w-sm flex flex-col items-center justify-center text-center">
        <div className="mb-8 flex flex-col items-center justify-center">
        <div className="relative w-[30%] h-[60px] mb-4">      
          <Image 
           src={"/retirer.png"}
           fill>
          </Image>
        </div>          
          <p className="text-md text-gray-700">
          حدث خطأ في تنفيذ العملية أعد المحاولة
          </p>
        </div>
                  <button
            type="submit"
            onClick={handleSubmit}
            className="w-full bg-[#c81048] text-white font-medium py-2 px-4 rounded-lg hover:bg-red-700 focus:ring-4 focus:ring-[#d81b60]"
          >
      العودة إلى صفحة الدفع
          </button>
     </div>
    </div>
  );
}
