import React from "react";
import { format } from "date-fns";
import dollarLogo from "@assets/WhatsApp_Image_2026-01-21_at_11.35.44_PM_1769017900602.jpeg";

import WhatsApp_Image_2026_01_22_at_2_13_29_PM from "@assets/WhatsApp Image 2026-01-22 at 2.13.29 PM.png";

import WhatsApp_Image_2026_01_22_at_2_13_29_PM_removebg_preview from "@assets/WhatsApp_Image_2026-01-22_at_2.13.29_PM-removebg-preview.png";
import WhatsApp_Image_2026_01_22_at_2_13_29_PM_dollar_sign from "@assets/WhatsApp_Image_2026-01-22_at_2.13.29_PM_1769075997170.jpg";

interface ReceiptProps {
  amount: number;
  date: Date;
  remarks: string;
  userName: string;
  userHandle: string;
  navStyle: 'buttons' | 'swipe' | 'none';
  deviceBrand: 'apple' | 'samsung' | 'oppo' | 'xiaomi' | 'vivo';
  id?: string;
  batteryLevel?: number;
  useCents?: boolean;
}

export const Receipt = ({ amount, date, remarks, userName, userHandle, navStyle, deviceBrand, id, batteryLevel = 95, useCents = false }: ReceiptProps) => {
  const amountInt = Math.floor(amount);
  const amountDec = useCents ? (amount % 1).toFixed(2).split(".")[1] : null;
  const dateStr = format(date, "MMM d");
  const timeStr = format(date, "h:mm a");

  const isAngela = userName.toLowerCase().includes("angela");
  const primaryColor = isAngela ? "#ffffff" : "#0d3a2b";
  const secondaryColor = isAngela ? "rgba(255,255,255,0.7)" : "#6a6a6a";
  const backgroundColor = isAngela ? "#0d1a14" : "#ffffff";

  const renderNav = () => {
    const time = format(date, "h:mm");
    const textColor = isAngela ? "text-white/90" : "text-black/70";

    switch (deviceBrand) {
      case 'apple':
        return (
          <div className={`w-full h-8 px-6 flex justify-between items-center text-[13px] font-bold ${textColor}`}>
            <span>{time}</span>
            <div className="flex items-center gap-1.5">
              <div className="flex gap-[1px] items-end h-2.5">
                {[1, 2, 3, 4].map(i => (
                  <div key={i} className={`w-[2.5px] h-[${3 + i * 1.5}px] rounded-full bg-current ${i > 3 ? 'opacity-30' : ''}`} />
                ))}
              </div>
              <span className="text-[10px] font-black">5G</span>
              <div className="w-[20px] h-[10px] rounded-[2px] border border-current/30 relative flex items-center px-[1px]">
                <div className="h-[6px] bg-current rounded-[0.5px]" style={{ width: `${(batteryLevel / 100) * 16}px` }} />
              </div>
            </div>
          </div>
        );
      case 'oppo':
      case 'vivo':
        return (
          <div className={`w-full h-8 px-4 flex justify-between items-center text-[11px] font-medium ${textColor}`}>
            <span>{time}</span>
            <div className="flex items-center gap-1">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8z"/></svg>
              <div className="flex items-end gap-[1px] h-[8px]">
                {[2, 4, 6, 8].map((h, i) => <div key={i} className={`w-[2px] h-[${h}px] bg-current`} />)}
              </div>
              <span>{batteryLevel}%</span>
            </div>
          </div>
        );
      case 'xiaomi':
        return (
          <div className={`w-full h-8 px-4 flex justify-between items-center text-[11px] ${textColor}`}>
            <div className="flex items-center gap-1">
              <span>{time}</span>
            </div>
            <div className="flex items-center gap-1">
              <span className="text-[9px]">LTE</span>
              <div className="border border-current/40 rounded-[1px] px-0.5 py-0">
                <div className="bg-current h-2 w-4" style={{ width: `${(batteryLevel / 100) * 16}px` }} />
              </div>
            </div>
          </div>
        );
      case 'samsung':
      default:
        return (
          <div className={`w-full h-8 px-4 flex justify-between items-center text-[12px] font-medium ${textColor}`}>
            <div className="flex items-center gap-2">
              <span>{time}</span>
            </div>
            <div className="flex items-center gap-1.5">
              <div className="flex items-end gap-[1.5px] h-[10px]">
                {[3, 5, 7, 10].map((h, i) => (
                  <div key={i} className={`w-[2.5px] h-[${h}px] bg-current/${i > 2 ? '70' : '30'} rounded-[0.5px]`} />
                ))}
              </div>
              <div className="flex items-center gap-[2px]">
                <span className="text-[11px] font-bold mr-0.5">{batteryLevel}%</span>
                <div className="w-[18px] h-[10px] rounded-[1px] border border-current/30 relative flex items-center px-[1px]">
                  <div className="h-[6px] bg-current/70 rounded-[0.5px]" style={{ width: `${(batteryLevel / 100) * 14}px` }} />
                </div>
              </div>
            </div>
          </div>
        );
    }
  };

  return (
    <div 
      id={id}
      className="receipt-container relative flex flex-col items-center select-none"
      style={{
        aspectRatio: "9/20",
        width: "360px",
        height: "800px",
        fontFamily: "'Inter', sans-serif",
        color: primaryColor,
        backgroundColor: backgroundColor
      }}
    >
      {renderNav()}
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
        <div className={`w-20 h-20 rounded-full ${isAngela ? 'bg-white/10' : 'bg-[#f3f5f7]'} flex items-center justify-center text-2xl font-medium ${isAngela ? 'text-white' : 'text-gray-700'} mb-4`}>
          {userName.charAt(0)}
        </div>
        <h2 className="text-[21px] font-bold tracking-tight">{userName}</h2>
        <div className="flex items-center mt-1">
          <p style={{ color: secondaryColor }} className="text-[13px] font-medium tracking-tight">Payment to</p>
          <img 
            src={WhatsApp_Image_2026_01_22_at_2_13_29_PM_dollar_sign} 
            alt="dollar" 
            className={`w-[10px] h-[10px] object-contain ${isAngela ? 'brightness-0 invert' : 'mix-blend-multiply'}`}
          />
          <p style={{ color: secondaryColor }} className="text-[13px] font-medium tracking-tight">{userHandle}</p>
        </div>
        <p style={{ color: secondaryColor }} className="text-[13px] font-medium tracking-tight">from Checking Account</p>
      </div>
      {/* Main Transaction Info - EXACT CENTER */}
      <div className="flex-1 flex flex-col items-center justify-center -mt-20">
        <div className="flex items-center -ml-4 gap-0 h-[80px]">
          <span className="text-[54px] font-bold tracking-tighter flex items-center h-full mr-[-10px]">-</span>
          <img 
            src={WhatsApp_Image_2026_01_22_at_2_13_29_PM_removebg_preview} 
            alt="currency" 
            className={`w-[48px] h-[48px] object-contain flex items-center mt-[0px] mb-[0px] mr-[-10px] drop-shadow-[0.5px_0_0_currentcolor] brightness-90 ${isAngela ? 'brightness-0 invert' : 'mix-blend-multiply'}`}
          />
          <span className="font-bold tracking-tighter flex items-center h-full ml-[0px] mr-[0px] mt-[0px] mb-[0px] pl-[0px] pr-[0px] pt-[0px] pb-[0px] text-justify text-[67px]">{amountInt}</span>
          {amountDec && amountDec !== "00" && (
            <span className="text-3xl font-bold mt-[14px] tracking-tighter self-start">{amountDec}</span>
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
        <div className={`w-[30px] h-[30px] rounded-full border-[1.8px] ${isAngela ? 'border-emerald-400' : 'border-[#10b981]'} flex items-center justify-center ${isAngela ? 'bg-emerald-400/10' : 'bg-[#10b981]/5'}`}>
             <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke={isAngela ? '#34d399' : '#10b981'} strokeWidth="3.2" strokeLinecap="round" strokeLinejoin="round">
                <polyline points="20 6 9 17 4 12"></polyline>
             </svg>
        </div>
        <span className="text-[19px] font-medium tracking-tight">Complete</span>
      </div>
      {/* Navigation Bar */}
      {navStyle !== 'none' && (
        <div className={`absolute bottom-0 w-full h-12 ${isAngela ? 'bg-transparent' : 'bg-white'} flex justify-around items-center px-10`}>
          {navStyle === 'buttons' ? (
            <>
              <div className={`flex items-center gap-2 opacity-30 ${isAngela ? 'invert' : ''}`}>
                 <div className="w-[1.5px] h-3.5 bg-black"></div>
                 <div className="w-[1.5px] h-3.5 bg-black"></div>
                 <div className="w-[1.5px] h-3.5 bg-black"></div>
              </div>
              <div className={`w-[19px] h-[19px] rounded-[4px] border-[1.8px] border-black opacity-30 ${isAngela ? 'invert' : ''}`}></div>
              <div className={`opacity-30 ${isAngela ? 'invert' : ''}`}>
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.8" strokeLinecap="round" strokeLinejoin="round">
                  <path d="m15 18-6-6 6-6"/>
                </svg>
              </div>
            </>
          ) : (
            <div className={`w-32 h-[4px] ${isAngela ? 'bg-white/20' : 'bg-black/20'} rounded-full mb-1`}></div>
          )}
        </div>
      )}
    </div>
  );
};
