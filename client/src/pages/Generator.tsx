import React, { useState, useRef, useEffect } from "react";
import { generateTransactions, Transaction } from "@/lib/generator";
import { Receipt } from "@/components/Receipt";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Card, CardContent } from "@/components/ui/card";
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
  
  // We use a hidden container to render the receipt for capture
  const captureRef = useRef<HTMLDivElement>(null);

  const handleStart = async () => {
    setIsGenerating(true);
    setProgress(0);
    setGeneratedImages([]);
    
    // 1. Generate Data
    const data = generateTransactions();
    setTransactions(data);
    
    // 2. Process Images
    // We need to render each one, wait for it to be visible, capture it, then move to next
    // This is tricky in React. We'll use a sequential effect.
    setCurrentProcessingIndex(0);
  };

  const processNext = async () => {
    if (currentProcessingIndex === -1) return;
    
    if (currentProcessingIndex >= transactions.length) {
      // Done
      setIsGenerating(false);
      setCurrentProcessingIndex(-1);
      return;
    }

    const transaction = transactions[currentProcessingIndex];
    
    // Wait for render
    await new Promise(resolve => setTimeout(resolve, 50)); // Small delay for DOM update
    
    const element = document.getElementById("receipt-capture-target");
    if (element) {
      try {
        const canvas = await html2canvas(element, {
          scale: 2, // Retina quality
          logging: false,
          useCORS: true,
          backgroundColor: "#ffffff"
        });
        
        const dataUrl = canvas.toDataURL("image/jpeg", 0.9);
        setGeneratedImages(prev => [...prev, dataUrl]);
        
        const newProgress = ((currentProcessingIndex + 1) / transactions.length) * 100;
        setProgress(newProgress);
        
        // Schedule next
        setCurrentProcessingIndex(prev => prev + 1);
      } catch (err) {
        console.error("Capture error", err);
        setIsGenerating(false);
      }
    }
  };

  // Effect to trigger processing when index changes
  useEffect(() => {
    if (isGenerating && currentProcessingIndex >= 0) {
      processNext();
    }
  }, [currentProcessingIndex, isGenerating]);

  const handleDownload = async () => {
    const zip = new JSZip();
    
    generatedImages.forEach((dataUrl, i) => {
      // Remove header
      const base64Data = dataUrl.replace(/^data:image\/jpeg;base64,/, "");
      const fileName = `transaction_${transactions[i].date.getTime()}_${i}.jpg`;
      zip.file(fileName, base64Data, { base64: true });
    });
    
    const content = await zip.generateAsync({ type: "blob" });
    saveAs(content, "synthetic_transactions.zip");
  };

  return (
    <div className="min-h-screen bg-background text-foreground p-8 font-mono">
      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-8">
        
        {/* Left Panel: Controls & Log */}
        <div className="space-y-6">
          <div className="border border-primary/20 bg-card/50 p-6 rounded-lg backdrop-blur-sm">
            <h1 className="text-3xl font-bold text-primary mb-2 flex items-center gap-2">
              <Terminal className="w-8 h-8" />
              SYNTH_GEN_V1
            </h1>
            <p className="text-muted-foreground mb-8">
              Financial Transaction Synthetic Data Generator
            </p>

            <div className="space-y-4">
              <div className="flex gap-4">
                <Button 
                  onClick={handleStart} 
                  disabled={isGenerating}
                  className="w-full text-lg h-12 bg-primary text-primary-foreground hover:bg-primary/90"
                >
                  {isGenerating ? (
                    <span className="flex items-center gap-2">
                      <RefreshCw className="animate-spin" /> PROCESSING...
                    </span>
                  ) : (
                    <span className="flex items-center gap-2">
                      <Play /> START GENERATION
                    </span>
                  )}
                </Button>
                
                <Button 
                  onClick={handleDownload} 
                  disabled={generatedImages.length === 0 || isGenerating}
                  variant="outline"
                  className="w-full text-lg h-12 border-primary/50 text-primary hover:bg-primary/10"
                >
                  <Download className="mr-2" /> DOWNLOAD ZIP
                </Button>
              </div>

              {isGenerating && (
                <div className="space-y-2">
                  <div className="flex justify-between text-xs text-primary">
                    <span>PROGRESS</span>
                    <span>{Math.round(progress)}%</span>
                  </div>
                  <Progress value={progress} className="h-2 bg-secondary" />
                </div>
              )}
            </div>
          </div>

          {/* Console Log */}
          <div className="border border-border bg-black/80 p-4 rounded-lg h-[400px] overflow-hidden flex flex-col font-mono text-sm">
            <div className="flex items-center gap-2 text-muted-foreground border-b border-white/10 pb-2 mb-2">
              <div className="w-3 h-3 rounded-full bg-red-500/50" />
              <div className="w-3 h-3 rounded-full bg-yellow-500/50" />
              <div className="w-3 h-3 rounded-full bg-green-500/50" />
              <span className="ml-2 text-xs">SYSTEM_LOG</span>
            </div>
            <ScrollArea className="flex-1">
              <div className="space-y-1 text-green-400/80">
                <p>{">"} System initialized...</p>
                <p>{">"} Waiting for input...</p>
                {transactions.length > 0 && (
                  <p>{">"} Generated {transactions.length} transaction records.</p>
                )}
                {generatedImages.map((_, i) => (
                  <p key={i}>{">"} Captured frame {i + 1}/{transactions.length} [OK]</p>
                ))}
                {generatedImages.length > 0 && !isGenerating && (
                  <p className="text-white">{">"} PROCESS COMPLETE. READY FOR DOWNLOAD.</p>
                )}
              </div>
            </ScrollArea>
          </div>
        </div>

        {/* Right Panel: Preview */}
        <div className="border border-border bg-secondary/30 rounded-lg p-8 flex flex-col items-center justify-center relative min-h-[800px]">
          <div className="absolute top-4 left-4 text-xs text-muted-foreground uppercase tracking-widest">
            Live Preview Output
          </div>
          
          {/* We render the ACTIVE receipt here for capture */}
          {currentProcessingIndex >= 0 && transactions[currentProcessingIndex] && (
             <div className="scale-[0.8] origin-center shadow-2xl ring-1 ring-black/10">
               <Receipt 
                 id="receipt-capture-target"
                 amount={transactions[currentProcessingIndex].amount}
                 date={transactions[currentProcessingIndex].date}
                 remarks={transactions[currentProcessingIndex].remarks}
               />
             </div>
          )}

          {/* If finished, show the last one or a success state */}
          {!isGenerating && generatedImages.length > 0 && (
            <div className="flex flex-col items-center">
              <div className="text-primary mb-4 flex items-center gap-2">
                <CheckCircle2 size={32} />
                <span className="text-xl font-bold">GENERATION COMPLETE</span>
              </div>
              <div className="scale-[0.6] origin-top shadow-2xl opacity-80 hover:opacity-100 transition-opacity">
                 {/* Just show a static image of the last one */}
                 <img src={generatedImages[generatedImages.length - 1]} alt="Preview" />
              </div>
            </div>
          )}
          
          {!isGenerating && generatedImages.length === 0 && (
            <div className="text-muted-foreground text-center">
              <div className="w-24 h-24 border-2 border-dashed border-muted-foreground/30 rounded-lg flex items-center justify-center mx-auto mb-4">
                <span className="text-4xl opacity-20">?</span>
              </div>
              <p>NO DATA GENERATED</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
