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
  const [isCapturing, setIsCapturing] = useState(false);

  const handleStart = async () => {
    console.log("Starting generation...");
    setIsGenerating(true);
    setProgress(0);
    setGeneratedImages([]);
    
    const data = generateTransactions();
    setTransactions(data);
    
    setCurrentProcessingIndex(0);
  };

  const processNext = async () => {
    if (currentProcessingIndex === -1) return;
    
    if (currentProcessingIndex >= transactions.length) {
      console.log("Generation complete. Images captured: " + generatedImages.length);
      setIsGenerating(false);
      setCurrentProcessingIndex(-1);
      return;
    }

    setIsCapturing(true);
    // Longer delay to ensure render is complete
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
        
        const dataUrl = canvas.toDataURL("image/jpeg", 1.0);
        setGeneratedImages(prev => [...prev, dataUrl]);
        
        const newProgress = ((currentProcessingIndex + 1) / transactions.length) * 100;
        setProgress(newProgress);
        
        setIsCapturing(false);
        setCurrentProcessingIndex(prev => prev + 1);
      } catch (err) {
        console.error("Capture error", err);
        setIsGenerating(false);
        setIsCapturing(false);
      }
    } else {
      console.error("Capture target not found");
      setIsGenerating(false);
      setIsCapturing(false);
    }
  };

  useEffect(() => {
    if (isGenerating && currentProcessingIndex >= 0 && !isCapturing) {
      processNext();
    }
  }, [currentProcessingIndex, isGenerating, isCapturing]);

  const handleDownloadZip = async () => {
    if (generatedImages.length === 0) {
      console.error("No images to download. State length: " + generatedImages.length);
      alert("No images available to download. Please generate them first.");
      return;
    }
    
    console.log("Initializing ZIP creation for " + generatedImages.length + " images...");
    const zip = new JSZip();
    
    try {
      for (let i = 0; i < generatedImages.length; i++) {
        const dataUrl = generatedImages[i];
        const base64Data = dataUrl.split(',')[1];
        zip.file(`receipt_${i + 1}.jpg`, base64Data, { base64: true });
        console.log(`Added image ${i + 1}/${generatedImages.length} to ZIP`);
      }
      
      console.log("Generating ZIP blob...");
      const content = await zip.generateAsync({ 
        type: "blob",
        compression: "STORE" 
      });
      
      console.log("Triggering download via saveAs...");
      saveAs(content, `receipts_dataset_${Date.now()}.zip`);
      console.log("Download command issued.");
    } catch (error) {
      console.error("CRITICAL: ZIP creation failed:", error);
      alert("ZIP creation failed. Check console for details.");
    }
  };

  return (
    <div className="min-h-screen bg-background text-foreground p-8 font-mono">
      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div className="space-y-6">
          <div className="border border-primary/20 bg-card/50 p-6 rounded-lg backdrop-blur-sm">
            <h1 className="text-3xl font-bold text-primary mb-2 flex items-center gap-2">
              <Terminal className="w-8 h-8" />
              SYNTH_GEN_V6
            </h1>
            <p className="text-muted-foreground mb-8 text-xs tracking-widest">
              ULTRA_STABLE_EXPORT // REPLICA_FONTS
            </p>

            <div className="space-y-4">
              <div className="flex gap-4">
                <Button 
                  onClick={handleStart} 
                  disabled={isGenerating}
                  className="w-full text-lg h-16 bg-primary text-primary-foreground font-black"
                >
                  {isGenerating ? <RefreshCw className="animate-spin mr-2" /> : <Play className="mr-2" />}
                  GENERATE ALL
                </Button>
                
                <Button 
                  onClick={handleDownloadZip} 
                  disabled={generatedImages.length === 0 || isGenerating}
                  variant="outline"
                  className="w-full text-lg h-16 border-primary/50 text-primary hover:bg-primary/10 font-black"
                >
                  <Download className="mr-2" /> DOWNLOAD ZIP ({generatedImages.length})
                </Button>
              </div>

              {isGenerating && (
                <div className="space-y-2">
                  <Progress value={progress} className="h-1.5 bg-secondary" />
                  <p className="text-[10px] text-center text-primary animate-pulse">CAPTURING FRAME {generatedImages.length + 1}...</p>
                </div>
              )}
            </div>
          </div>

          <div className="border border-border bg-black p-4 rounded-lg h-[400px] overflow-hidden flex flex-col font-mono text-sm shadow-2xl">
            <ScrollArea className="flex-1">
              <div className="space-y-1 text-green-500 font-bold">
                <p>{">"} ENGINE_V6: READY</p>
                {generatedImages.map((_, i) => (
                  <p key={i}>{">"} DATA_LOCK: receipt_{i + 1}.jpg [SUCCESS]</p>
                ))}
                {generatedImages.length > 0 && !isGenerating && (
                  <p className="text-white bg-primary px-2 mt-2 inline-block">SUCCESS: {generatedImages.length} ASSETS READY FOR EXPORT</p>
                )}
              </div>
            </ScrollArea>
          </div>
        </div>

        <div className="border border-border bg-secondary/5 rounded-lg p-8 flex flex-col items-center justify-center min-h-[800px]">
          <div className="absolute top-4 left-4 text-[10px] text-muted-foreground uppercase font-black">Live Production Engine</div>
          
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
              <CheckCircle2 size={48} className="text-green-500 mb-6 shadow-green-500/20 shadow-lg" />
              <p className="text-2xl font-black text-primary mb-6 tracking-tighter uppercase italic">Batch Process Complete</p>
              <div className="grid grid-cols-5 gap-3 scale-[0.55]">
                {generatedImages.slice(-15).map((img, i) => (
                  <img key={i} src={img} className="w-24 border-2 border-primary/20 shadow-lg" />
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
