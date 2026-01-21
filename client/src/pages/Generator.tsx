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
      console.log("Generation complete. 10 images captured.");
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

  const handleDownloadZip = async () => {
    if (generatedImages.length === 0) {
      console.error("No images to download");
      return;
    }
    
    console.log("Initializing ZIP creation...");
    const zip = new JSZip();
    
    try {
      for (let i = 0; i < generatedImages.length; i++) {
        const dataUrl = generatedImages[i];
        const base64Data = dataUrl.split(',')[1];
        zip.file(`receipt_${i + 1}.jpg`, base64Data, { base64: true });
        console.log(`Added image ${i + 1} to ZIP`);
      }
      
      console.log("Generating ZIP blob...");
      const content = await zip.generateAsync({ type: "blob" });
      
      console.log("Triggering download...");
      saveAs(content, `receipts_batch_${Date.now()}.zip`);
      console.log("Download triggered successfully.");
    } catch (error) {
      console.error("ZIP creation failed:", error);
    }
  };

  return (
    <div className="min-h-screen bg-background text-foreground p-8 font-mono">
      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div className="space-y-6">
          <div className="border border-primary/20 bg-card/50 p-6 rounded-lg backdrop-blur-sm">
            <h1 className="text-3xl font-bold text-primary mb-2 flex items-center gap-2">
              <Terminal className="w-8 h-8" />
              SYNTH_GEN_V5
            </h1>
            <p className="text-muted-foreground mb-8 text-xs tracking-widest">
              ROOT_LEVEL_DOWNLOAD_FIX // STABLE_EXPORT
            </p>

            <div className="space-y-4">
              <div className="flex gap-4">
                <Button 
                  onClick={handleStart} 
                  disabled={isGenerating}
                  className="w-full text-lg h-16 bg-primary text-primary-foreground font-black"
                >
                  {isGenerating ? <RefreshCw className="animate-spin mr-2" /> : <Play className="mr-2" />}
                  GENERATE 10
                </Button>
                
                <Button 
                  onClick={handleDownloadZip} 
                  disabled={generatedImages.length === 0 || isGenerating}
                  variant="outline"
                  className="w-full text-lg h-16 border-primary/50 text-primary hover:bg-primary/10 font-black"
                >
                  <Download className="mr-2" /> DOWNLOAD ZIP
                </Button>
              </div>

              {isGenerating && (
                <div className="space-y-2">
                  <Progress value={progress} className="h-1.5 bg-secondary" />
                </div>
              )}
            </div>
          </div>

          <div className="border border-border bg-black p-4 rounded-lg h-[400px] overflow-hidden flex flex-col font-mono text-sm shadow-2xl">
            <ScrollArea className="flex-1">
              <div className="space-y-1 text-green-500 font-bold">
                <p>{">"} SYSTEM_V5: ACTIVE</p>
                {generatedImages.map((_, i) => (
                  <p key={i}>{">"} IMAGE_{i + 1}: CAPTURED</p>
                ))}
                {generatedImages.length === 10 && !isGenerating && (
                  <p className="text-white bg-primary px-2 mt-2 inline-block">DOWNLOAD READY</p>
                )}
              </div>
            </ScrollArea>
          </div>
        </div>

        <div className="border border-border bg-secondary/5 rounded-lg p-8 flex flex-col items-center justify-center min-h-[800px]">
          {currentProcessingIndex >= 0 && transactions[currentProcessingIndex] && (
             <div className="shadow-[0_0_100px_rgba(0,0,0,0.5)] bg-white">
               <Receipt 
                 id="receipt-capture-target"
                 amount={transactions[currentProcessingIndex].amount}
                 date={transactions[currentProcessingIndex].date}
                 remarks={transactions[currentProcessingIndex].remarks}
               />
             </div>
          )}

          {!isGenerating && generatedImages.length > 0 && (
            <div className="flex flex-col items-center">
              <div className="flex items-center gap-4 text-primary font-black text-3xl mb-8 italic uppercase tracking-tighter">
                <CheckCircle2 size={40} className="text-green-500" />
                Batch Ready
              </div>
              <div className="grid grid-cols-5 gap-4 scale-[0.6]">
                {generatedImages.map((img, i) => (
                  <img key={i} src={img} className="w-24 border-4 border-white shadow-xl" />
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
