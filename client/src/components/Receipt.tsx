import React from "react";
import { format } from "date-fns";
import { Wifi, Signal, Battery, ArrowLeft, MoreHorizontal, Check } from "lucide-react";

interface ReceiptProps {
  amount: number;
  date: Date;
  remarks: string;
  id?: string; // DOM ID for capture
}

export const Receipt = ({ amount, date, remarks, id }: ReceiptProps) => {
  // Mobile status bar time (usually same as transaction time or slightly later, but let's stick to transaction time for consistency)
  const timeStr = format(date, "h:mm a"); // 2:30 PM
  
  // Format amount like "-$5.00"
  const formattedAmount = `-$${amount.toFixed(2)}`;
  
  // Date format: "Jan 12, 2026 at 2:30 PM"
  // User prompt: "date and after it there is 'at' ... time am/pm"
  const dateStr = format(date, "MMM d, yyyy");
  const timeFullStr = format(date, "h:mm a");

  return (
    <div 
      id={id}
      className="receipt-container relative bg-white text-black overflow-hidden"
      style={{
        width: "360px",
        height: "800px",
        fontFamily: "'Roboto', sans-serif",
      }}
    >
      {/* Status Bar */}
      <div className="h-8 flex justify-between items-center px-4 pt-2 text-xs font-medium text-gray-600">
        <span>{format(date, "HH:mm")}</span>
        <div className="flex items-center gap-1.5">
          <Signal size={14} className="fill-current" />
          <Wifi size={14} />
          <Battery size={14} className="fill-current" />
        </div>
      </div>

      {/* App Header (User requested: ... left, <- right) */}
      <div className="h-14 flex justify-between items-center px-4 mt-1">
        <button className="p-2">
          <MoreHorizontal size={24} className="text-gray-800" />
        </button>
        <button className="p-2">
          <ArrowLeft size={24} className="text-gray-800" />
        </button>
      </div>

      {/* Main Content */}
      <div className="flex flex-col items-center mt-8 px-6">
        {/* Success Icon */}
        <div className="w-16 h-16 rounded-full bg-green-100 flex items-center justify-center mb-4">
          <div className="w-10 h-10 rounded-full bg-green-500 flex items-center justify-center">
            <Check size={24} className="text-white stroke-[3]" />
          </div>
        </div>

        <h1 className="text-2xl font-bold text-gray-900 mb-8">Complete</h1>

        {/* Amount */}
        <div className="mb-2">
          <span className="text-4xl font-bold tracking-tight text-gray-900">
            {formattedAmount}
          </span>
        </div>

        {/* Divider/Details */}
        <div className="w-full mt-12 space-y-6">
          {/* Remarks */}
          <div className="flex flex-col border-b border-gray-100 pb-4">
            <span className="text-sm text-gray-500 mb-1">Remarks</span>
            <span className="text-lg font-medium text-gray-900 capitalize">{remarks}</span>
          </div>

          {/* Date & Time */}
          <div className="flex flex-col border-b border-gray-100 pb-4">
            <span className="text-sm text-gray-500 mb-1">Date & Time</span>
            <div className="flex flex-col">
              <span className="text-lg font-medium text-gray-900">{dateStr}</span>
              <span className="text-sm text-gray-500 mt-0.5">at {timeFullStr}</span>
            </div>
          </div>
          
           {/* Transaction ID (Fake extra detail for realism) */}
           <div className="flex flex-col pb-4">
            <span className="text-sm text-gray-500 mb-1">Transaction ID</span>
            <span className="text-base text-gray-800 font-mono tracking-wider">
              {Math.random().toString(36).substr(2, 12).toUpperCase()}
            </span>
          </div>
        </div>
      </div>

      {/* Bottom Actions (Fake) */}
      <div className="absolute bottom-8 w-full px-6">
        <button className="w-full py-3 bg-blue-600 text-white font-medium rounded-lg shadow-sm">
          Done
        </button>
      </div>
    </div>
  );
};
