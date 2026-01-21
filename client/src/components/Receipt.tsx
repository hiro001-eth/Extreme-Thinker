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

  return (
    <div 
      id={id}
      className="receipt-container relative bg-white text-[#1a1a1a] flex flex-col items-center"
      style={{
        width: "360px",
        height: "740px",
        fontFamily: "'Inter', sans-serif",
      }}
    >
      {/* Top Navigation */}
      <div className="w-full flex justify-between items-center px-6 pt-10 pb-4">
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-gray-600">
          <path d="M19 12H5M12 19l-7-7 7-7"/>
        </svg>
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-gray-600">
          <circle cx="12" cy="12" r="1"/><circle cx="19" cy="12" r="1"/><circle cx="5" cy="12" r="1"/>
        </svg>
      </div>

      {/* Profile Section */}
      <div className="mt-4 flex flex-col items-center">
        <div className="w-16 h-16 rounded-full bg-[#f3f5f7] flex items-center justify-center text-xl font-medium text-gray-700 mb-4">
          A
        </div>
        <h2 className="text-xl font-bold text-gray-900">Anna Boyer</h2>
        <p className="text-gray-500 text-sm mt-1">Payment to $Anna-Boyer-2</p>
        <p className="text-gray-500 text-sm">from Checking Account</p>
      </div>

      {/* Main Transaction Info */}
      <div className="mt-24 flex flex-col items-center">
        <div className="flex items-baseline text-gray-900">
          <span className="text-6xl font-bold">-${amountInt}</span>
          {/* Decimals are usually slightly smaller or same in CashApp style, let's keep it bold and clean */}
        </div>
        
        <div className="mt-4 text-gray-800 text-lg">
          For <span className="text-[#00d64f] font-medium">{remarks}</span>
        </div>
        
        <div className="mt-2 text-gray-500 text-base">
          {dateStr} at {timeStr}
        </div>
      </div>

      {/* Status Footer */}
      <div className="absolute bottom-16 flex flex-col items-center">
        <div className="flex items-center gap-2 text-[#00d64f] font-medium text-lg">
          <div className="w-6 h-6 rounded-full border-2 border-[#00d64f] flex items-center justify-center">
            <Check size={14} strokeWidth={3} />
          </div>
          Complete
        </div>
      </div>

      {/* Bottom Navigation Bar */}
      <div className="absolute bottom-4 w-full px-12 flex justify-between items-center opacity-30">
        <div className="w-1 h-4 border-x border-gray-400"></div>
        <div className="w-4 h-4 rounded-md border-2 border-gray-400"></div>
        <div className="w-4 h-4 flex items-center justify-center">
          <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
            <path d="m15 18-6-6 6-6"/>
          </svg>
        </div>
      </div>
    </div>
  );
};
