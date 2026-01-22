import React from "react";
import { format } from "date-fns";
import dollarLogo from "@assets/WhatsApp_Image_2026-01-21_at_11.35.44_PM_1769017900602.jpeg";

interface ReceiptProps {
  amount: number;
  date: Date;
  remarks: string;
  userName: string;
  navStyle: 'buttons' | 'swipe' | 'none';
  id?: string;
  batteryLevel?: number;
}

export const Receipt = ({ amount, date, remarks, userName, navStyle, id, batteryLevel = 95 }: ReceiptProps) => {
  const amountInt = Math.floor(amount);
  const amountDec = (amount % 1).toFixed(2).split(".")[1];
  const dateStr = format(date, "MMM d");
  const timeStr = format(date, "h:mm a");

  const primaryColor = "#0d3a2b"; 
  const secondaryColor = "#6a6a6a"; // Matched color for remarks/date from screenshots

  // Calculate battery width based on level (max 14px)
  const batteryWidth = Math.max(2, (batteryLevel / 100) * 14);

  return (
    <div 
      id={id}
      className="receipt-container relative bg-white flex flex-col items-center select-none"
      style={{
        aspectRatio: "9/20",
        width: "360px",
        height: "800px",
        fontFamily: "'Inter', sans-serif",
        color: primaryColor
      }}
    >
      {/* Status Bar */}
      <div className="w-full h-[34px] px-[18px] flex justify-between items-end pb-1.5 select-none opacity-90">
        <div className="text-[14px] font-bold tracking-tight text-black/85">
          {format(date, "h:mm")}
        </div>
        <div className="flex items-center gap-1.5">
          {/* Signal */}
          <div className="flex items-end gap-[1.5px] h-[11px] mb-[1px]">
            <div className="w-[3px] h-[3px] bg-black/40 rounded-[0.5px]"></div>
            <div className="w-[3px] h-[5px] bg-black/40 rounded-[0.5px]"></div>
            <div className="w-[3px] h-[7px] bg-black/85 rounded-[0.5px]"></div>
            <div className="w-[3px] h-[10px] bg-black/85 rounded-[0.5px]"></div>
          </div>
          {/* WiFi */}
          <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="mb-[1px]">
            <path d="M5 12.55a11 11 0 0 1 14.08 0" />
            <path d="M1.42 9a16 16 0 0 1 21.16 0" />
            <path d="M8.53 16.11a6 6 0 0 1 6.95 0" />
            <line x1="12" y1="20" x2="12.01" y2="20" />
          </svg>
          {/* Battery */}
          <div className="flex items-center gap-[2px]">
             <div className="w-[22px] h-[11px] rounded-[2.5px] border-[1.2px] border-black/30 relative flex items-center px-[1.5px]">
                <div 
                  className="h-[6px] bg-black/85 rounded-[1px]" 
                  style={{ width: `${batteryWidth}px` }}
                ></div>
                <div className="absolute -right-[3.5px] w-[2px] h-[4px] bg-black/30 rounded-r-[1px]"></div>
             </div>
             <span className="text-[11px] font-bold text-black/85 ml-0.5">{batteryLevel}</span>
          </div>
        </div>
      </div>

      {/* Top Navigation Bar */}
      <div className="w-full flex justify-between items-center px-6 pt-4 pb-4">
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M19 12H5M12 19l-7-7 7-7"/>
        </svg>
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
          <circle cx="12" cy="12" r="1.2"/><circle cx="19" cy="12" r="1.2"/><circle cx="5" cy="12" r="1.2"/>
        </svg>
      </div>

      {/* Profile Section */}
      <div className="mt-2 flex flex-col items-center">
        <div className="w-20 h-20 rounded-full bg-[#f3f5f7] flex items-center justify-center text-2xl font-medium text-gray-700 mb-4">
          {userName.charAt(0)}
        </div>
        <h2 className="text-[21px] font-bold tracking-tight text-[#0d3a2b]">{userName}</h2>
        <p className="text-gray-500 text-[13px] mt-1 font-medium tracking-tight">Payment to ${userName.replace(' ', '-')}-2</p>
        <p className="text-gray-500 text-[13px] font-medium tracking-tight">from Checking Account</p>
      </div>

      {/* Main Transaction Info - EXACT CENTER */}
      <div className="flex-1 flex flex-col items-center justify-center -mt-20">
        <div className="flex items-center -ml-4">
          <span className="text-[64px] font-bold tracking-tighter text-[#0d3a2b] mr-[-12px]">-</span>
          <img 
            src={dollarLogo} 
            alt="currency" 
            className="w-[62px] h-[82px] object-contain mt-3 mix-blend-multiply mr-[-12px]"
            style={{ filter: "contrast(1.2) brightness(1.1) sepia(0.3) hue-rotate(100deg)" }}
          />
          <span className="text-[78px] font-bold leading-none tracking-tight text-[#0d3a2b]">{amountInt}</span>
          {amountDec !== "00" && (
            <span className="text-3xl font-bold mt-2 tracking-tighter align-top self-start text-[#0d3a2b]">{amountDec}</span>
          )}
        </div>
        
        <div className="mt-[-6px] text-[17px] font-medium tracking-tight" style={{ color: secondaryColor }}>
          For {remarks}
        </div>
        
        <div className="mt-[-6px] text-[17px] font-medium tracking-tight" style={{ color: secondaryColor }}>
          {dateStr} at {timeStr}
        </div>
      </div>

      {/* Status Footer */}
      <div className="w-full flex items-center justify-center gap-2.5 pb-[64px]">
        <div className="w-[30px] h-[30px] rounded-full border-[1.8px] border-[#10b981] flex items-center justify-center bg-[#10b981]/5">
             <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#10b981" strokeWidth="3.2" strokeLinecap="round" strokeLinejoin="round">
                <polyline points="20 6 9 17 4 12"></polyline>
             </svg>
        </div>
        <span className="text-[19px] font-medium tracking-tight text-[#0d3a2b]">Complete</span>
      </div>

      {/* Real Samsung Navigation Bar - VARIES BY STYLE */}
      {navStyle !== 'none' && (
        <div className="absolute bottom-0 w-full h-12 bg-white flex justify-around items-center px-10">
          {navStyle === 'buttons' ? (
            <>
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
            </>
          ) : (
            <div className="w-32 h-[4px] bg-black/20 rounded-full mb-1"></div>
          )}
        </div>
      )}
    </div>
  );
};
