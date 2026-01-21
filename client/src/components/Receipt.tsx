import React from "react";
import { format } from "date-fns";
import dollarLogo from "@assets/WhatsApp_Image_2026-01-21_at_11.35.44_PM_1769017900602.jpeg";

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

  const primaryColor = "#012a1c"; 

  return (
    <div 
      id={id}
      className="receipt-container relative bg-white flex flex-col items-center select-none"
      style={{
        width: "360px",
        height: "740px",
        fontFamily: "'Inter', sans-serif",
        color: primaryColor
      }}
    >
      {/* Top Navigation Bar */}
      <div className="w-full flex justify-between items-center px-6 pt-10 pb-4">
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M19 12H5M12 19l-7-7 7-7"/>
        </svg>
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
          <circle cx="12" cy="12" r="1.2"/><circle cx="19" cy="12" r="1.2"/><circle cx="5" cy="12" r="1.2"/>
        </svg>
      </div>

      {/* Profile Section */}
      <div className="mt-4 flex flex-col items-center">
        <div className="w-20 h-20 rounded-full bg-[#f3f5f7] flex items-center justify-center text-2xl font-medium text-gray-700 mb-4">
          A
        </div>
        <h2 className="text-[21px] font-bold tracking-tight">Anna Boyer</h2>
        <p className="text-gray-500 text-[13px] mt-1 font-medium tracking-tight">Payment to $Anna-Boyer-2</p>
        <p className="text-gray-500 text-[13px] font-medium tracking-tight">from Checking Account</p>
      </div>

      {/* Main Transaction Info */}
      <div className="mt-32 flex flex-col items-center">
        <div className="flex items-center -ml-4">
          <span className="text-[64px] font-bold tracking-tighter text-[#012a1c] mr-0.5">-</span>
          <img 
            src={dollarLogo} 
            alt="currency" 
            className="w-[54px] h-[72px] object-contain mt-3.5 mix-blend-multiply"
            style={{ filter: "contrast(1.2) brightness(1.1)" }}
          />
          <span className="text-[78px] font-bold leading-none tracking-tight text-[#012a1c] ml-0.5">{amountInt}</span>
          {amountDec !== "00" && (
            <span className="text-3xl font-bold mt-2 tracking-tighter align-top self-start text-[#012a1c]">{amountDec}</span>
          )}
        </div>
        
        <div className="mt-4 text-[17px] font-medium text-gray-700 tracking-tight">
          For {remarks}
        </div>
        
        <div className="mt-1 text-gray-500 text-[17px] font-medium tracking-tight">
          {dateStr} at {timeStr}
        </div>
      </div>

      {/* Status Footer */}
      <div className="absolute bottom-[84px] flex items-center justify-center gap-2.5">
        <div className="w-[30px] h-[30px] rounded-full border-[1.8px] border-[#012a1c] flex items-center justify-center">
             <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#012a1c" strokeWidth="3.2" strokeLinecap="round" strokeLinejoin="round">
                <polyline points="20 6 9 17 4 12"></polyline>
             </svg>
        </div>
        <span className="text-[19px] font-medium tracking-tight text-[#012a1c]">Complete</span>
      </div>

      {/* Real Samsung Navigation Bar */}
      <div className="absolute bottom-0 w-full h-12 bg-white flex justify-around items-center px-10">
        <div className="flex items-center gap-2 opacity-30">
           <div className="w-[1.5px] h-3.5 bg-black"></div>
           <div className="w-[1.5px] h-3.5 bg-black"></div>
           <div className="w-[1.5px] h-3.5 bg-black"></div>
        </div>
        <div className="w-[19px] h-[19px] rounded-[4px] border-[1.8px] border-black opacity-30"></div>
        <div className="opacity-30">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.8" strokeLinecap="round" strokeLinejoin="round">
            <path d="m15 18-6-6 6-6"/>
          </svg>
        </div>
      </div>
    </div>
  );
};
