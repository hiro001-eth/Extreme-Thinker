import React, { useState, useRef, useEffect } from "react";
import { generateTransactions, Transaction } from "@/lib/generator";
import { Receipt } from "@/components/Receipt";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Save, Play, RefreshCw, Terminal, CheckCircle2 } from "lucide-react";
import html2canvas from "html2canvas";
import { saveAs } from "file-saver";
import { ScrollArea } from "@/components/ui/scroll-area";

export default function Generator() {
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [isGenerating, setIsGenerating] = useState(false);
  const [progress, setProgress] = useState(0);
  const [currentProcessingIndex, setCurrentProcessingIndex] = useState(-1);
  const [generatedImages, setGeneratedImages] = useState<string[]>([]);

  const handleStart = async () => {
    console.log("Starting generation...");
    setIsGenerating(true);
    setProgress(0);
    setGeneratedImages([]);
    
    const fullData = generateTransactions();
    const data = fullData.slice(0, 10); 
    setTransactions(data);
    
    setCurrentProcessingIndex(0);
  };

  const processNext = async () => {
    if (currentProcessingIndex === -1) return;
    
    if (currentProcessingIndex >= transactions.length) {
      console.log("Generation complete.");
      setIsGenerating(false);
      setCurrentProcessingIndex(-1);
      return;
    }

    await new Promise(resolve => setTimeout(resolve, 500));
    
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

  const handleSaveAll = async () => {
    if (generatedImages.length === 0) return;
    
    console.log("Saving images...");
    generatedImages.forEach((dataUrl, i) => {
      saveAs(dataUrl, `receipt_${i + 1}.jpg`);
    });
    console.log("All images saved.");
  };

  return (
    <div className="min-h-screen bg-background text-foreground p-8 font-mono">
      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div className="space-y-6">
          <div className="border border-primary/20 bg-card/50 p-6 rounded-lg backdrop-blur-sm shadow-2xl">
            <h1 className="text-3xl font-bold text-primary mb-2 flex items-center gap-2">
              <Terminal className="w-8 h-8" />
              SYNTH_GEN_V6
            </h1>
            <p className="text-muted-foreground mb-8 text-xs tracking-widest">
              IMAGE_STREAMS // DATA_GENERATION
            </p>

            <div className="space-y-4">
              <div className="flex gap-4">
                <Button 
                  onClick={handleStart} 
                  disabled={isGenerating}
                  className="w-full text-lg h-16 bg-primary text-primary-foreground font-black hover:opacity-90 transition-all active:scale-95 shadow-lg"
                >
                  {isGenerating ? <RefreshCw className="animate-spin mr-2" /> : <Play className="mr-2" />}
                  GENERATE BATCH
                </Button>
                
                <Button 
                  onClick={handleSaveAll} 
                  disabled={generatedImages.length === 0 || isGenerating}
                  variant="outline"
                  className="w-full text-lg h-16 border-primary/50 text-primary hover:bg-primary/10 font-black hover:opacity-90 transition-all active:scale-95 shadow-lg"
                >
                  <Save className="mr-2" /> SAVE NOW
                </Button>
              </div>

              {isGenerating && (
                <div className="space-y-2">
                  <Progress value={progress} className="h-2 bg-secondary" />
                </div>
              )}
            </div>
          </div>

          <div className="border border-border bg-black/90 p-4 rounded-lg h-[400px] overflow-hidden flex flex-col font-mono text-sm shadow-inner">
            <ScrollArea className="flex-1">
              <div className="space-y-1 text-green-400 font-bold">
                <p className="text-primary/60">{">"} SYSTEM_BOOT: OK</p>
                <p className="text-primary/60">{">"} MODE: DATASET_COLLECTION</p>
                {generatedImages.map((_, i) => (
                  <p key={i} className="animate-in slide-in-from-left-2">{">"} ASSET_{i + 1}: SAVED_TO_BUFFER</p>
                ))}
                {generatedImages.length === 10 && !isGenerating && (
                  <p className="text-white bg-primary px-2 mt-4 inline-block rounded animate-pulse">BATCH_READY: CLICK SAVE NOW TO DOWNLOAD JPEGS</p>
                )}
              </div>
            </ScrollArea>
          </div>
        </div>

        <div className="border border-border bg-secondary/5 rounded-lg p-8 flex flex-col items-center justify-center min-h-[800px] relative overflow-hidden group">
          <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-transparent pointer-events-none" />
          
          {currentProcessingIndex >= 0 && transactions[currentProcessingIndex] && (
             <div className="shadow-[0_0_100px_rgba(0,0,0,0.6)] bg-white animate-in zoom-in-95 duration-300">
               <Receipt 
                 id="receipt-capture-target"
                 amount={transactions[currentProcessingIndex].amount}
                 date={transactions[currentProcessingIndex].date}
                 remarks={transactions[currentProcessingIndex].remarks}
               />
             </div>
          )}

          {!isGenerating && generatedImages.length > 0 && (
            <div className="flex flex-col items-center animate-in zoom-in-95 duration-500">
              <CheckCircle2 size={64} className="text-green-500 mb-6 drop-shadow-[0_0_15px_rgba(34,197,94,0.4)]" />
              <p className="text-2xl font-black text-primary mb-8 tracking-tighter uppercase italic">Batch Generation Complete</p>
              <div className="grid grid-cols-5 gap-4 scale-[0.65]">
                {generatedImages.map((img, i) => (
                  <div key={i} className="relative ring-2 ring-white/10 rounded overflow-hidden shadow-2xl transition-transform hover:scale-110">
                    <img src={img} className="w-24" />
                    <div className="absolute top-0 right-0 bg-primary text-black text-[10px] px-1.5 font-bold">#{i+1}</div>
                  </div>
                ))}
              </div>
            </div>
          )}
          
          {!isGenerating && generatedImages.length === 0 && (
            <div className="flex flex-col items-center opacity-10 grayscale">
              <Terminal size={80} className="mb-4" />
              <p className="font-bold tracking-widest text-xl">IDLE_RENDER_ENGINE</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
