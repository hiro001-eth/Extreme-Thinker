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
    
    // Generate only 10 transactions as requested for faster check
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

    await new Promise(resolve => setTimeout(resolve, 100));
    
    const element = document.getElementById("receipt-capture-target");
    if (element) {
      try {
        const canvas = await html2canvas(element, {
          scale: 3, 
          logging: false,
          useCORS: true,
          backgroundColor: "#ffffff"
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

  const handleDownload = async () => {
    const zip = new JSZip();
    generatedImages.forEach((dataUrl, i) => {
      const base64Data = dataUrl.replace(/^data:image\/jpeg;base64,/, "");
      const fileName = `receipt_${i + 1}.jpg`;
      zip.file(fileName, base64Data, { base64: true });
    });
    const content = await zip.generateAsync({ type: "blob" });
    saveAs(content, "transactions_batch.zip");
  };

  return (
    <div className="min-h-screen bg-background text-foreground p-8 font-mono">
      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div className="space-y-6">
          <div className="border border-primary/20 bg-card/50 p-6 rounded-lg backdrop-blur-sm">
            <h1 className="text-3xl font-bold text-primary mb-2 flex items-center gap-2">
              <Terminal className="w-8 h-8" />
              SYNTH_GEN_V2
            </h1>
            <p className="text-muted-foreground mb-8">
              Exact Replica Financial Generator
            </p>

            <div className="space-y-4">
              <div className="flex gap-4">
                <Button 
                  onClick={handleStart} 
                  disabled={isGenerating}
                  className="w-full text-lg h-12 bg-primary text-primary-foreground"
                >
                  {isGenerating ? <RefreshCw className="animate-spin mr-2" /> : <Play className="mr-2" />}
                  GENERATE 10 IMAGES
                </Button>
                
                <Button 
                  onClick={handleDownload} 
                  disabled={generatedImages.length === 0 || isGenerating}
                  variant="outline"
                  className="w-full text-lg h-12"
                >
                  <Download className="mr-2" /> DOWNLOAD ZIP
                </Button>
              </div>

              {isGenerating && (
                <Progress value={progress} className="h-2 bg-secondary" />
              )}
            </div>
          </div>

          <div className="border border-border bg-black p-4 rounded-lg h-[400px] overflow-hidden flex flex-col font-mono text-sm">
            <ScrollArea className="flex-1">
              <div className="space-y-1 text-green-500">
                <p>{">"} System V2 Online...</p>
                {generatedImages.map((_, i) => (
                  <p key={i}>{">"} Processing Receipt {i + 1}/10... [SUCCESS]</p>
                ))}
                {generatedImages.length === 10 && !isGenerating && (
                  <p className="text-white font-bold">{">"} BATCH COMPLETE. ZIP READY.</p>
                )}
              </div>
            </ScrollArea>
          </div>
        </div>

        <div className="border border-border bg-secondary/10 rounded-lg p-8 flex flex-col items-center justify-center min-h-[800px]">
          {currentProcessingIndex >= 0 && transactions[currentProcessingIndex] && (
             <div className="scale-[0.8] origin-center shadow-2xl">
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
              <CheckCircle2 size={48} className="text-green-500 mb-4" />
              <p className="text-xl font-bold text-primary mb-4">10 IMAGES CAPTURED</p>
              <div className="grid grid-cols-5 gap-2 scale-50">
                {generatedImages.map((img, i) => (
                  <img key={i} src={img} className="w-20 border border-white/20" />
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
