import React, { useMemo } from "react";
import { format } from "date-fns";
import dollarLogo from "@assets/WhatsApp_Image_2026-01-21_at_11.35.44_PM_1769017900602.jpeg";
import { Battery, Wifi, BellOff, VolumeX, MapPin, MessageCircle, Instagram, Mail, Bell, ShieldCheck, Facebook, Phone, MessageSquare, X } from "lucide-react";

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

export const Receipt = ({ amount, date, remarks, userName, userHandle, navStyle, deviceBrand, id, batteryLevel: batteryLevelProp, useCents = false }: ReceiptProps) => {
  const amountInt = Math.floor(amount);
  const amountDec = useCents ? (amount % 1).toFixed(2).split(".")[1] : null;
  const dateStr = format(date, "MMM d");
  const timeStr = format(date, "h:mm a");

  const isAngela = userName.toLowerCase().includes("angela");
  const primaryColor = isAngela ? "#ffffff" : "#0d3a2b";
  const secondaryColor = isAngela ? "rgba(255,255,255,0.7)" : "#6a6a6a";
  const backgroundColor = isAngela ? "#071d15" : "#ffffff";

  // Deep Randomization (Figma UI/UX Standard)
  const stats = useMemo(() => {
    const batteryLevel = batteryLevelProp ?? Math.floor(Math.random() * 100) + 1;
    const signalBars = Math.floor(Math.random() * 4) + 1;
    const networkType = ["5G", "4G+", "LTE", "4G", "LTE+"][Math.floor(Math.random() * 5)];
    const showLocation = Math.random() > 0.4;
    const batteryHealth = Math.floor(Math.random() * 21) + 80; // 80-100%
    
    // Advanced notification logic
    const allIcons = [
      <MessageCircle className="h-3 w-3 fill-current" />,
      <Instagram className="h-3 w-3" />,
      <Mail className="h-3 w-3" />,
      <Facebook className="h-3 w-3 fill-current" />,
      <X className="h-2.5 w-2.5 stroke-[3]" />,
      <Phone className="h-3 w-3 fill-current" />,
      <MessageSquare className="h-3 w-3" />,
      <Bell className="h-3 w-3" />
    ];
    
    const notificationCount = Math.random() > 0.2 ? Math.floor(Math.random() * 4) : 0;
    const selectedIcons = allIcons.sort(() => 0.5 - Math.random()).slice(0, notificationCount);
    
    return {
      batteryLevel,
      signalBars,
      networkType,
      showLocation,
      batteryHealth,
      selectedIcons,
      layoutGap: Math.floor(Math.random() * 3) + 2,
    };
  }, [batteryLevelProp]);

  const renderNav = () => {
    const time = format(date, "h:mm");
    const textColor = isAngela ? "text-white/90" : "text-black/90";

    return (
      <div className={`w-full h-7 px-4 pt-1.5 flex justify-between items-center text-[11px] font-bold tracking-tight ${textColor}`} style={{ 
        fontFamily: '-apple-system, BlinkMacSystemFont, "SF Pro Text", "Roboto", sans-serif'
      }}>
        {/* Left Section: Time + Notifications */}
        <div className="flex items-center" style={{ gap: `${stats.layoutGap + 2}px` }}>
          <span className="tabular-nums">{time}</span>
          <div className="flex items-center opacity-80" style={{ gap: `${stats.layoutGap}px` }}>
            {stats.selectedIcons.map((icon, i) => (
              <React.Fragment key={i}>{icon}</React.Fragment>
            ))}
          </div>
        </div>

        {/* Right Section: Location + Network + Signal + Battery */}
          <div className="flex items-center" style={{ gap: `${stats.layoutGap + 3}px` }}>
            <div className="flex items-center" style={{ gap: `${stats.layoutGap}px` }}>
              {stats.showLocation && <MapPin className="h-2.5 w-2.5 opacity-80" />}
              <span className="text-[9px] font-black opacity-90">{stats.networkType}</span>
              <Wifi className="h-3 w-3 opacity-90" />
              <div className="flex items-end gap-[1px] h-[9px]">
                {[1, 2, 3, 4].map((i) => (
                  <div key={i} className={`w-[2.5px] rounded-[0.5px] bg-current ${i > stats.signalBars ? 'opacity-30' : 'opacity-90'}`} style={{ height: `${i * 2 + 1}px` }} />
                ))}
              </div>
            </div>
            
            <div className="flex items-center" style={{ gap: `${stats.layoutGap}px` }}>
               <div className="flex items-center gap-1">
                 <span className="tabular-nums text-[10px]">{stats.batteryLevel}%</span>
                 <div className="relative w-[19px] h-[9.5px] border border-current/30 rounded-[1.5px] flex items-center px-[0.5px]">
                   <div className="h-[6.5px] bg-current/90 rounded-[0.5px]" style={{ width: `${(stats.batteryLevel / 100) * 16}px` }} />
                   <div className="absolute -right-[2.5px] w-[1px] h-1 bg-current/40 rounded-r-full" />
                 </div>
               </div>
            </div>
          </div>
      </div>
    );
  };

  return (
    <div 
      id={id}
      className="receipt-container relative flex flex-col items-center select-none overflow-hidden"
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
      <div className="w-full flex justify-between items-center px-4 pt-2 pb-4">
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M19 12H5M12 19l-7-7 7-7"/>
        </svg>
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
          <circle cx="12" cy="12" r="1.2"/><circle cx="19" cy="12" r="1.2"/><circle cx="5" cy="12" r="1.2"/>
        </svg>
      </div>
      {/* Profile Section */}
      <div className="mt-2 flex flex-col items-center">
        <div className={`w-[70px] h-[70px] rounded-full flex items-center justify-center text-xl font-medium mb-4 ${
          isAngela 
            ? 'bg-[#0f2d22] text-white' 
            : 'bg-[#f3f5f7] text-gray-700'
        }`}>
          {userName.charAt(0)}
        </div>
        <h2 className="text-[21px] font-bold tracking-tight">{userName}</h2>
        <div className="flex items-center mt-1">
          <p style={{ color: secondaryColor }} className="text-[13px] font-medium tracking-tight whitespace-nowrap">Payment to</p>
          <img 
            src={WhatsApp_Image_2026_01_22_at_2_13_29_PM_removebg_preview} 
            alt="dollar" 
            className="w-[12px] h-[12px] object-contain ml-[2px] mr-[1px]"
            style={{ 
              filter: isAngela 
                ? 'brightness(0) invert(1)' 
                : 'brightness(0) invert(0.4) sepia(1) saturate(0) hue-rotate(0deg)'
            }}
          />
          <p style={{ color: secondaryColor }} className="text-[13px] font-medium tracking-tight whitespace-nowrap">{userHandle}</p>
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
            className={`w-[48px] h-[48px] object-contain flex items-center mt-[0px] mb-[0px] mr-[-10px] drop-shadow-[0.5px_0_0_currentcolor] ${isAngela ? 'brightness-0 invert contrast-[2]' : 'brightness-90 mix-blend-multiply'}`}
          />
          <span className="font-bold tracking-tighter flex items-center h-full ml-[0px] mr-[0px] mt-[0px] mb-[0px] pl-[0px] pr-[0px] pt-[0px] pb-[0px] text-justify text-[57px]">{amountInt}</span>
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
      {/* Status Footer - RESTORED & POSITIONED ABOVE NAV */}
      <div className="w-full flex flex-col items-center pb-2">
        <div className="flex items-center gap-2.5 mb-6">
          <div className={`w-[26px] h-[26px] rounded-full border-[1.8px] ${isAngela ? 'border-emerald-400' : 'border-[#0d3a2b]'} flex items-center justify-center ${isAngela ? 'bg-emerald-400/10' : 'bg-transparent'}`}>
               <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke={isAngela ? '#34d399' : '#0d3a2b'} strokeWidth="3.2" strokeLinecap="round" strokeLinejoin="round">
                  <polyline points="20 6 9 17 4 12"></polyline>
               </svg>
          </div>
          <span className="text-[17px] font-medium tracking-tight">Complete</span>
        </div>

        {/* Bottom Navigation Bar */}
        {navStyle !== 'none' && (
          <div className="w-full flex justify-center items-center pb-2 px-10">
            {navStyle === 'buttons' ? (
              <div className={`w-full max-w-[320px] h-[44px] flex justify-between items-center px-12 ${isAngela ? 'invert' : ''}`}>
                <div className="flex gap-[3.5px] items-center">
                  <div className="w-[1.5px] h-3.5 bg-[#666] rounded-full"></div>
                  <div className="w-[1.5px] h-3.5 bg-[#666] rounded-full"></div>
                  <div className="w-[1.5px] h-3.5 bg-[#666] rounded-full"></div>
                </div>
                <div className="w-[18px] h-[18px] rounded-[5px] border-[2px] border-[#666]"></div>
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#666" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M15 18l-6-6 6-6"/>
                </svg>
              </div>
            ) : navStyle === 'swipe' ? (
              <div className={`w-28 h-[4px] ${isAngela ? 'bg-white/15' : 'bg-black/15'} rounded-full`}></div>
            ) : (
              <div className={`w-full max-w-[320px] h-[44px] flex justify-between items-center px-12 ${isAngela ? 'invert' : ''}`}>
                <div className="w-4 h-4 rounded-full border-[2px] border-[#666]"></div>
                <div className="w-4 h-4 rounded-[4px] border-[2px] border-[#666]"></div>
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#666" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M15 18l-6-6 6-6"/>
                </svg>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};
