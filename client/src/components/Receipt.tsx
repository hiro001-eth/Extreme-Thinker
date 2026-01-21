import React from "react";
import { format } from "date-fns";
import { Check } from "lucide-react";

interface ReceiptProps {
  amount: number;
  date: Date;
  remarks: string;
  id?: string;
}

export const Receipt = ({ amount, date, remarks, id }: ReceiptProps) => {
  const amountInt = Math.floor(amount);
  const amountDec = (amount % 1).toFixed(2).split(".")[1];
  const dateStr = format(date, "MMM d");
  const timeStr = format(date, "h:mm a");

  // Exact mobile-matching colors
  const primaryColor = "#012a1c"; 

  return (
    <div 
      id={id}
      className="receipt-container relative bg-white flex flex-col items-center"
      style={{
        width: "360px",
        height: "740px",
        fontFamily: "'Inter', sans-serif",
        color: primaryColor
      }}
    >
      {/* Real Mobile Status Bar */}
      <div className="w-full flex justify-between items-center px-5 pt-3 opacity-90">
        <span className="text-[13px] font-semibold">{format(date, "h:mm")}</span>
        <div className="flex gap-1.5 items-center">
             <svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2c-4.97 0-9 4.03-9 9 0 4.17 2.84 7.67 6.69 8.69L12 22l2.31-2.31C18.16 18.67 21 15.17 21 11c0-4.97-4.03-9-9-9z"/></svg>
             <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1 15h-2v-6h2v6zm0-8h-2V7h2v2z"/></svg>
             <div className="flex items-center gap-0.5 border border-current rounded-[2px] px-0.5 h-3">
               <div className="bg-current h-2 w-3"></div>
               <span className="text-[9px] font-bold leading-none">95</span>
             </div>
        </div>
      </div>

      {/* Top Navigation */}
      <div className="w-full flex justify-between items-center px-6 pt-3 pb-4">
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
          <path d="M19 12H5M12 19l-7-7 7-7"/>
        </svg>
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
          <circle cx="12" cy="12" r="1.5"/><circle cx="19" cy="12" r="1.5"/><circle cx="5" cy="12" r="1.5"/>
        </svg>
      </div>

      {/* Profile Section */}
      <div className="mt-4 flex flex-col items-center">
        <div className="w-20 h-20 rounded-full bg-[#f3f5f7] flex items-center justify-center text-2xl font-medium text-gray-700 mb-4">
          A
        </div>
        <h2 className="text-xl font-bold">Anna Boyer</h2>
        <p className="text-gray-500 text-[13px] mt-1 font-medium">Payment to $Anna-Boyer-2</p>
        <p className="text-gray-500 text-[13px] font-medium">from Checking Account</p>
      </div>

      {/* Main Transaction Info */}
      <div className="mt-32 flex flex-col items-center">
        <div className="flex items-start">
          <span className="text-6xl font-bold mt-1">-$</span>
          <span className="text-[84px] font-bold leading-none tracking-tighter">{amountInt}</span>
          <span className="text-3xl font-bold mt-2">{amountDec !== "00" ? amountDec : ""}</span>
        </div>
        
        <div className="mt-4 text-[17px] font-medium text-gray-700">
          For Food
        </div>
        
        <div className="mt-1 text-gray-500 text-[17px] font-medium">
          {dateStr} at {timeStr}
        </div>
      </div>

      {/* Status Footer */}
      <div className="absolute bottom-20 flex items-center gap-2">
        <div className="w-7 h-7 rounded-full border-[2.5px] border-[#012a1c] flex items-center justify-center">
          <Check size={16} strokeWidth={4} className="text-[#012a1c]" />
        </div>
        <span className="text-lg font-bold">Complete</span>
      </div>

      {/* Real Samsung Navigation Bar */}
      <div className="absolute bottom-0 w-full h-12 bg-white flex justify-around items-center px-10">
        <div className="flex flex-col gap-1 items-center opacity-40">
           <div className="w-[1.5px] h-3.5 bg-black rotate-[-5deg]"></div>
           <div className="w-[1.5px] h-3.5 bg-black rotate-[5deg] absolute"></div>
           <div className="w-[1.5px] h-3.5 bg-black ml-3"></div>
           <div className="w-[1.5px] h-3.5 bg-black mr-3 absolute"></div>
        </div>
        <div className="w-[18px] h-[18px] rounded-[4px] border-[1.5px] border-black opacity-40"></div>
        <div className="opacity-40">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            <path d="m15 18-6-6 6-6"/>
          </svg>
        </div>
      </div>
    </div>
  );
};
