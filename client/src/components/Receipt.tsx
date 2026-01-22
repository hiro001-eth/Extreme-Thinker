import React from "react";
import { format } from "date-fns";
import dollarLogo from "@assets/WhatsApp_Image_2026-01-21_at_11.35.44_PM_1769017900602.jpeg";

import WhatsApp_Image_2026_01_22_at_2_13_29_PM from "@assets/WhatsApp Image 2026-01-22 at 2.13.29 PM.png";

import WhatsApp_Image_2026_01_22_at_2_13_29_PM_removebg_preview from "@assets/WhatsApp_Image_2026-01-22_at_2.13.29_PM-removebg-preview.png";

interface ReceiptProps {
  amount: number;
  date: Date;
  remarks: string;
  userName: string;
  userHandle: string;
  navStyle: 'buttons' | 'swipe' | 'none';
  id?: string;
  batteryLevel?: number;
  useCents?: boolean;
}

export const Receipt = ({ amount, date, remarks, userName, userHandle, navStyle, id, batteryLevel = 95, useCents = false }: ReceiptProps) => {
  const amountInt = Math.floor(amount);
  const amountDec = useCents ? (amount % 1).toFixed(2).split(".")[1] : null;
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
      {/* Real-world Android Notification Bar Emulation */}
      <div className="w-full h-8 px-4 flex justify-between items-center text-[12px] font-medium text-black/70">
        <div className="flex items-center gap-2">
          <span>{format(date, "h:mm")}</span>
          <div className="flex gap-1">
             {/* Random notification icons */}
             {Math.random() > 0.3 && (
               <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor" className="opacity-60">
                 <path d="M20 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z"/>
               </svg>
             )}
             {Math.random() > 0.5 && (
               <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor" className="opacity-60">
                 <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 15h-2v-6h2v6zm0-8h-2V7h2v2z"/>
               </svg>
             )}
             {Math.random() > 0.7 && (
               <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor" className="opacity-60">
                 <path d="M12 22c1.1 0 2-.9 2-2h-4c0 1.1.89 2 2 2zm6-6v-5c0-3.07-1.64-5.64-4.5-6.32V4c0-.83-.67-1.5-1.5-1.5s-1.5.67-1.5 1.5v.68C7.63 5.36 6 7.92 6 11v5l-2 2v1h16v-1l-2-2z"/>
               </svg>
             )}
          </div>
        </div>
        <div className="flex items-center gap-1.5">
          {/* Silent/Mute Icons */}
          {Math.random() > 0.5 && (
            <svg width="12" height="12" viewBox="0 0 24 24" fill="currentColor" className="opacity-70">
              <path d="M16.5 12c0-1.77-1.02-3.29-2.5-4.03v8.05c1.48-.73 2.5-2.25 2.5-4.02zM14 3.23v2.06c2.89.86 5 3.54 5 6.71s-2.11 5.85-5 6.71v2.06c4.01-.91 7-4.49 7-8.77s-2.99-7.86-7-8.77zM3 9v6h4l5 5V4L7 9H3z"/>
            </svg>
          )}
          {Math.random() > 0.7 && (
            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="opacity-70">
              <line x1="1" y1="1" x2="23" y2="23" />
              <path d="M9 9v3a3 3 0 0 0 5.12 2.12M15 9.34V4a3 3 0 0 0-5.94-.6" />
              <path d="M17 16.95A7 7 0 0 1 5 12v-2" />
              <line x1="12" y1="19" x2="12" y2="23" />
              <line x1="8" y1="23" x2="16" y2="23" />
            </svg>
          )}
          {/* Signal Towers */}
          <div className="flex items-end gap-[1.5px] h-[10px] mb-[0.5px]">
            <div className="w-[2.5px] h-[3px] bg-black/30 rounded-[0.5px]"></div>
            <div className="w-[2.5px] h-[5px] bg-black/30 rounded-[0.5px]"></div>
            <div className="w-[2.5px] h-[7px] bg-black/70 rounded-[0.5px]"></div>
            <div className="w-[2.5px] h-[10px] bg-black/70 rounded-[0.5px]"></div>
          </div>
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="opacity-60">
            <path d="M5 12.55a11 11 0 0 1 14.08 0" />
            <path d="M1.42 9a16 16 0 0 1 21.16 0" />
            <path d="M8.53 16.11a6 6 0 0 1 6.95 0" />
          </svg>
          <div className="flex items-center gap-[2px]">
             <span className="text-[11px] font-bold text-black/85 mr-0.5">{batteryLevel}%</span>
             <div className="w-[18px] h-[10px] rounded-[1px] border border-black/30 relative flex items-center px-[1px]">
                <div className="h-[6px] bg-black/70 rounded-[0.5px]" style={{ width: `${(batteryLevel / 100) * 14}px` }}></div>
             </div>
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
        <p className="text-gray-500 text-[13px] mt-1 font-medium tracking-tight">Payment to ${userHandle}</p>
        <p className="text-gray-500 text-[13px] font-medium tracking-tight">from Checking Account</p>
      </div>
      {/* Main Transaction Info - EXACT CENTER */}
      <div className="flex-1 flex flex-col items-center justify-center -mt-20">
        <div className="flex items-center -ml-4 gap-0 h-[80px]">
          <span className="text-[54px] font-bold tracking-tighter text-[#0d3a2b] flex items-center h-full mr-[-10px]">-</span>
          <img 
            src={WhatsApp_Image_2026_01_22_at_2_13_29_PM_removebg_preview} 
            alt="currency" 
            className="w-[48px] h-[48px] object-contain flex items-center mix-blend-multiply mt-[0px] mb-[0px] mr-[-8px]"
          />
          <span className="font-bold tracking-tighter text-[#0d3a2b] flex items-center h-full ml-[0px] mr-[0px] mt-[0px] mb-[0px] pl-[0px] pr-[0px] pt-[0px] pb-[0px] text-[55px] text-justify">{amountInt}</span>
          {amountDec && amountDec !== "00" && (
            <span className="text-3xl font-bold mt-[14px] tracking-tighter self-start text-[#0d3a2b]">{amountDec}</span>
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
