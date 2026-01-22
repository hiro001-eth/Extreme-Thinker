import { Battery, BatteryLow, BatteryMedium, BatteryFull, BatteryWarning, SignalHigh, SignalMedium, SignalLow, VolumeX, BellOff, Wifi } from "lucide-react";

interface StatusIconsProps {
  className?: string;
}

export function StatusIcons({ className = "" }: StatusIconsProps) {
  // We'll mock some "real" feeling values
  const batteryLevel = 85;
  const batteryHealth = 98;
  const signalStrength = 4; // 1-4
  const isMuted = false;
  const isSilent = true;

  return (
    <div className={`flex items-center gap-3 text-[11px] font-semibold tracking-tight ${className}`} style={{ fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif' }}>
      <div className="flex items-center gap-1.5" data-testid="status-connectivity">
        <div className="flex items-center gap-0.5" title={`Signal: ${signalStrength}/4`}>
          {[...Array(4)].map((_, i) => (
            <div
              key={i}
              className={`w-[3px] rounded-full ${i < signalStrength ? 'bg-foreground' : 'bg-muted-foreground/30'}`}
              style={{ height: `${(i + 1) * 3}px` }}
            />
          ))}
        </div>
        <Wifi className="h-3 w-3" />
        <span className="ml-1 uppercase tracking-widest text-[9px]">5G</span>
      </div>

      <div className="flex items-center gap-2" data-testid="status-system">
        {isSilent && <BellOff className="h-3 w-3 text-muted-foreground" />}
        {isMuted && <VolumeX className="h-3 w-3 text-muted-foreground" />}
      </div>

      <div className="flex items-center gap-1.5" data-testid="status-battery" title={`Health: ${batteryHealth}%`}>
        <span className="tabular-nums">{batteryLevel}%</span>
        <div className="relative flex items-center">
          <BatteryFull className="h-4 w-4" />
          <div className="absolute left-[2px] right-[4px] top-[5px] bottom-[5px] bg-foreground rounded-[1px]" style={{ width: `${(batteryLevel / 100) * 8}px` }} />
        </div>
      </div>
    </div>
  );
}
