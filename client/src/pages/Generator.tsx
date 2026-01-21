import React, { useState, useRef, useEffect } from "react";
import { generateTransactions, Transaction } from "@/lib/generator";
import { Receipt } from "@/components/Receipt";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Download, Play, RefreshCw, Terminal, CheckCircle2 } from "lucide-react";
import html2canvas from "html2canvas";
import JSZip from "jszip";
import { saveAs } from "file-saver";
import { ScrollArea } from "@/components/ui/scroll-area";

export default function Generator() {
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [isGenerating, setIsGenerating] = useState(false);
  const [progress, setProgress] = useState(0);
  const [currentProcessingIndex, setCurrentProcessingIndex] = useState(-1);
  const [generatedImages, setGeneratedImages] = useState<string[]>([]);

  const handleStart = async () => {
    setIsGenerating(true);
    setProgress(0);
    setGeneratedImages([]);
    
    // Generate only 10 transactions as requested
    const fullData = generateTransactions();
    const data = fullData.slice(0, 10); 
    setTransactions(data);
    
    setCurrentProcessingIndex(0);
  };

  const processNext = async () => {
    if (currentProcessingIndex === -1) return;
    
    if (currentProcessingIndex >= transactions.length) {
      setIsGenerating(false);
      setCurrentProcessingIndex(-1);
      return;
    }

    // Wait for render
    await new Promise(resolve => setTimeout(resolve, 300));
    
    const element = document.getElementById("receipt-capture-target");
    if (element) {
      try {
        const canvas = await html2canvas(element, {
          scale: 3, 
          logging: false,
          useCORS: true,
          backgroundColor: "#ffffff",
          windowWidth: 360,
          windowHeight: 740
        });
        
        const dataUrl = canvas.toDataURL("image/jpeg", 1.0);
        setGeneratedImages(prev => [...prev, dataUrl]);
        
        const newProgress = ((currentProcessingIndex + 1) / transactions.length) * 100;
        setProgress(newProgress);
        
        setCurrentProcessingIndex(prev => prev + 1);
      } catch (err) {
        console.error("Capture error", err);
        setIsGenerating(false);
      }
    }
  };

  useEffect(() => {
    if (isGenerating && currentProcessingIndex >= 0) {
      processNext();
    }
  }, [currentProcessingIndex, isGenerating]);

  const handleDownloadZip = async () => {
    if (generatedImages.length === 0) {
        alert("Please generate images first!");
        return;
    }
    
    try {
      const zip = new JSZip();
      
      // Use a more robust approach for base64 conversion
      for (let i = 0; i < generatedImages.length; i++) {
        const dataUrl = generatedImages[i];
        const base64Data = dataUrl.substring(dataUrl.indexOf(',') + 1);
        const fileName = `transaction_receipt_${i + 1}.jpg`;
        zip.file(fileName, base64Data, { base64: true });
      }
      
      const blob = await zip.generateAsync({ 
        type: "blob",
        compression: "STORE" // Faster generation, reliable for images
      });
      
      // Use direct saveAs from file-saver
      saveAs(blob, "receipts_dataset.zip");
      
    } catch (error) {
      console.error("CRITICAL: Zip generation failed", error);
      alert("Failed to generate zip. Check console for details.");
    }
  };

  return (
    <div className="min-h-screen bg-background text-foreground p-8 font-mono">
      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div className="space-y-6">
          <div className="border border-primary/20 bg-card/50 p-6 rounded-lg backdrop-blur-sm">
            <h1 className="text-3xl font-bold text-primary mb-2 flex items-center gap-2">
              <Terminal className="w-8 h-8" />
              CORE_SYNTH_V3
            </h1>
            <p className="text-muted-foreground mb-8">
              High-Fidelity Transaction Synthesizer
            </p>

            <div className="space-y-4">
              <div className="flex gap-4">
                <Button 
                  onClick={handleStart} 
                  disabled={isGenerating}
                  className="w-full text-lg h-14 bg-primary text-primary-foreground hover:opacity-90 transition-all active:scale-[0.98]"
                >
                  {isGenerating ? <RefreshCw className="animate-spin mr-2" /> : <Play className="mr-2" />}
                  INITIALIZE 10 UNIT BATCH
                </Button>
                
                <Button 
                  onClick={handleDownloadZip} 
                  disabled={generatedImages.length === 0 || isGenerating}
                  variant="outline"
                  className="w-full text-lg h-14 border-primary/50 text-primary hover:bg-primary/10 transition-all active:scale-[0.98]"
                >
                  <Download className="mr-2" /> EXPORT ZIP
                </Button>
              </div>

              {isGenerating && (
                <div className="space-y-2">
                  <div className="flex justify-between text-[10px] text-primary font-bold">
                    <span>PROCESSING DATA_STREAM</span>
                    <span>{Math.round(progress)}%</span>
                  </div>
                  <Progress value={progress} className="h-1 bg-secondary" />
                </div>
              )}
            </div>
          </div>

          <div className="border border-border bg-black p-4 rounded-lg h-[400px] overflow-hidden flex flex-col font-mono text-sm shadow-inner">
            <ScrollArea className="flex-1">
              <div className="space-y-1 text-green-500">
                <p>{">"} BOOT_SEQUENCE: OK</p>
                <p>{">"} REPLICA_SYSTEM: ONLINE</p>
                {generatedImages.map((_, i) => (
                  <p key={i} className="animate-in fade-in slide-in-from-left-2">{">"} ASSET_LOCKED: receipt_{i + 1}.jpg [300DPI_EQUIV]</p>
                ))}
                {generatedImages.length === 10 && !isGenerating && (
                  <p className="text-white font-bold bg-primary/20 px-2 py-1 mt-2 inline-block rounded">{">"} BATCH_VERIFIED: CLICK EXPORT ZIP NOW</p>
                )}
              </div>
            </ScrollArea>
          </div>
        </div>

        <div className="border border-border bg-secondary/10 rounded-lg p-8 flex flex-col items-center justify-center min-h-[800px] relative">
          <div className="absolute top-4 left-4 text-[10px] text-muted-foreground uppercase font-bold tracking-[0.2em]">Live Render Engine</div>
          
          {currentProcessingIndex >= 0 && transactions[currentProcessingIndex] && (
             <div className="scale-[0.8] origin-center shadow-[0_0_50px_rgba(0,0,0,0.3)] bg-white">
               <Receipt 
                 id="receipt-capture-target"
                 amount={transactions[currentProcessingIndex].amount}
                 date={transactions[currentProcessingIndex].date}
                 remarks={transactions[currentProcessingIndex].remarks}
               />
             </div>
          )}

          {!isGenerating && generatedImages.length > 0 && (
            <div className="flex flex-col items-center animate-in zoom-in-95 duration-300">
              <CheckCircle2 size={56} className="text-green-500 mb-6 drop-shadow-lg" />
              <p className="text-2xl font-black text-primary mb-6 tracking-tighter italic uppercase">Batch Ready for Export</p>
              <div className="grid grid-cols-5 gap-3 scale-[0.6]">
                {generatedImages.slice(0, 10).map((img, i) => (
                  <div key={i} className="relative group">
                    <img src={img} className="w-24 border-2 border-primary/20 rounded shadow-md transition-transform group-hover:scale-105" />
                    <div className="absolute -top-2 -right-2 bg-primary text-black text-[10px] font-bold px-1 rounded">#{i+1}</div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {!isGenerating && generatedImages.length === 0 && (
            <div className="flex flex-col items-center opacity-20">
              <Terminal size={64} className="mb-4" />
              <p className="font-bold tracking-widest">IDLE_SYSTEM</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
