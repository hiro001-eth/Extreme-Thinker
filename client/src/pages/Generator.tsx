import React, { useState, useEffect } from "react";
import { generateTransactions } from "@/lib/generator";
import { Receipt } from "@/components/Receipt";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Save, Play, RefreshCw, Terminal, CheckCircle2 } from "lucide-react";
import html2canvas from "html2canvas";
import { saveAs } from "file-saver";
import { ScrollArea } from "@/components/ui/scroll-area";
import { useMutation, useQuery } from "@tanstack/react-query";
import { apiRequest, queryClient } from "@/lib/queryClient";
import { Transaction } from "@shared/schema";

export default function Generator() {
  const [isGenerating, setIsGenerating] = useState(false);
  const [progress, setProgress] = useState(0);
  const [currentProcessingIndex, setCurrentProcessingIndex] = useState(-1);
  const [currentBatch, setCurrentBatch] = useState<any[]>([]);
  const [generatedImages, setGeneratedImages] = useState<{url: string, id: string}[]>([]);

  const { data: history = [] } = useQuery<Transaction[]>({
    queryKey: ["/api/transactions"],
  });

  const mutation = useMutation({
    mutationFn: async (newTx: any) => {
      const res = await apiRequest("POST", "/api/transactions", newTx);
      return res.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/transactions"] });
    },
  });

  const handleStart = async () => {
    console.log("Starting generation...");
    setIsGenerating(true);
    setProgress(0);
    setGeneratedImages([]);
    
    // Create 10 images for testing
    const fullData = generateTransactions();
    const data = fullData.slice(0, 10); 
    setCurrentBatch(data);
    setCurrentProcessingIndex(0);
  };

  const processNext = async () => {
    if (currentProcessingIndex === -1) return;
    
    if (currentProcessingIndex >= currentBatch.length) {
      console.log("Generation complete.");
      setIsGenerating(false);
      setCurrentProcessingIndex(-1);
      return;
    }

    // Wait for the DOM to settle
    await new Promise(resolve => setTimeout(resolve, 800));
    
    const element = document.getElementById("receipt-capture-target");
    if (element) {
      try {
        const canvas = await html2canvas(element, {
          scale: 3, 
          logging: false,
          useCORS: true,
          backgroundColor: "#ffffff",
          windowWidth: 360,
          windowHeight: 740,
        });
        
        const dataUrl = canvas.toDataURL("image/jpeg", 1.0); // 100% quality
        const txData = currentBatch[currentProcessingIndex];
        
        // Immediate browser download
        const timestamp = new Date().toISOString().replace(/[:.]/g, "-");
        saveAs(dataUrl, `receipt_${timestamp}.jpg`);

        // Save to backend
        const savedTx = await mutation.mutateAsync({
          amount: txData.amount,
          date: txData.date,
          remarks: txData.remarks,
          time: txData.time || "12:00 PM",
          imageUrl: dataUrl
        });

        setGeneratedImages(prev => [...prev, { url: dataUrl, id: savedTx.id }]);
        
        const newProgress = ((currentProcessingIndex + 1) / currentBatch.length) * 100;
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

  const handleSaveNow = async () => {
    if (generatedImages.length === 0) return;
    
    console.log(`Downloading ${generatedImages.length} images...`);
    
    // Direct sequential download with small delays to ensure browser stability
    for (let i = 0; i < generatedImages.length; i++) {
      const item = generatedImages[i];
      saveAs(item.url, `screenshot_${item.id}.jpg`);
      await new Promise(resolve => setTimeout(resolve, 300));
    }
    
    console.log("All downloads initiated.");
  };

  return (
    <div className="min-h-screen bg-neutral-950 text-neutral-100 p-8 font-mono">
      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div className="space-y-6">
          <div className="border border-neutral-800 bg-neutral-900/50 p-6 rounded-xl backdrop-blur-sm shadow-2xl">
            <h1 className="text-3xl font-bold text-white mb-2 flex items-center gap-3">
              <Terminal className="w-8 h-8 text-emerald-500" />
              SAMSUNG_S21_SIMULATOR
            </h1>
            <p className="text-neutral-500 mb-8 text-xs tracking-[0.2em] font-black uppercase">
              Root Level Patch: V7.0
            </p>

            <div className="space-y-4">
              <div className="flex gap-4">
                <Button 
                  onClick={handleStart} 
                  disabled={isGenerating}
                  className="w-full text-lg h-20 bg-emerald-600 hover:bg-emerald-500 text-white font-black rounded-xl shadow-[0_0_20px_rgba(16,185,129,0.2)] border-b-4 border-emerald-800 active:border-b-0 active:translate-y-1 transition-all"
                >
                  {isGenerating ? <RefreshCw className="animate-spin mr-2" /> : <Play className="mr-2 fill-current" />}
                  GENERATE BATCH
                </Button>
                
                <Button 
                  onClick={handleSaveNow} 
                  disabled={generatedImages.length === 0 || isGenerating}
                  variant="outline"
                  className="w-full text-lg h-20 border-emerald-500/30 text-emerald-400 hover:bg-emerald-500/10 font-black rounded-xl border-b-4 border-emerald-900 active:border-b-0 active:translate-y-1 transition-all"
                >
                  <Save className="mr-2" /> SAVE NOW
                </Button>
              </div>

              {isGenerating && (
                <div className="space-y-2 py-4">
                  <div className="flex justify-between text-[10px] text-emerald-500 font-bold uppercase tracking-widest">
                    <span>Processing Assets...</span>
                    <span>{Math.round(progress)}%</span>
                  </div>
                  <Progress value={progress} className="h-2 bg-neutral-800" />
                </div>
              )}
            </div>
          </div>

          <div className="border border-neutral-800 bg-black p-5 rounded-xl h-[400px] overflow-hidden flex flex-col font-mono text-sm shadow-inner">
            <ScrollArea className="flex-1">
              <div className="space-y-1 text-emerald-500/80">
                <p className="text-white font-black mb-2 tracking-widest">[ SYSTEM LOG ]</p>
                <p>{">"} BOOTING KERNEL...</p>
                <p>{">"} LOADING ASSET: DOLLAR_LOGO_PNG</p>
                {generatedImages.map((img, i) => (
                  <p key={i} className="text-emerald-400">
                    {">"} FRAME_{i + 1}: CAPTURED ({img.id}.jpg)
                  </p>
                ))}
                {generatedImages.length > 0 && !isGenerating && (
                  <div className="mt-6 p-3 bg-emerald-500 text-black font-black uppercase text-center animate-pulse rounded">
                    Batch Ready! Click "SAVE NOW" to Download
                  </div>
                )}
              </div>
            </ScrollArea>
          </div>
        </div>

        <div className="border border-neutral-800 bg-neutral-900/20 rounded-xl p-8 flex flex-col items-center justify-center min-h-[800px] relative overflow-hidden">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(16,185,129,0.05),transparent)] pointer-events-none" />
          
          {currentProcessingIndex >= 0 && currentBatch[currentProcessingIndex] && (
             <div className="shadow-[0_40px_100px_rgba(0,0,0,0.8)] scale-90 origin-center">
               <Receipt 
                 id="receipt-capture-target"
                 amount={currentBatch[currentProcessingIndex].amount}
                 date={currentBatch[currentProcessingIndex].date}
                 remarks={currentBatch[currentProcessingIndex].remarks}
               />
             </div>
          )}

          {!isGenerating && generatedImages.length > 0 && (
            <div className="flex flex-col items-center w-full max-w-md">
              <div className="flex items-center gap-3 text-emerald-400 font-black text-2xl mb-10 tracking-tight uppercase italic">
                <CheckCircle2 size={32} className="text-emerald-500" />
                Capture Queue Ready
              </div>
              <div className="grid grid-cols-4 gap-4 w-full">
                {generatedImages.map((img, i) => (
                  <div key={i} className="group relative aspect-[9/16] rounded overflow-hidden border border-neutral-800 shadow-xl transition-all hover:scale-105 hover:z-10">
                    <img src={img.url} className="w-full h-full object-cover" />
                    <div className="absolute inset-0 bg-emerald-500/20 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                      <Save className="text-white w-6 h-6" />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
          
          {!isGenerating && generatedImages.length === 0 && (
            <div className="flex flex-col items-center text-neutral-800 grayscale">
              <Terminal size={120} className="mb-6 opacity-20" />
              <p className="font-black tracking-[0.5em] text-2xl">AWAITING_INPUT</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
