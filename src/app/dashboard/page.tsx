"use client";

import { useState, useRef, useEffect } from "react";
import { ImageUploader } from "@/components/global/image-uploader";
import { Button } from "@/components/ui/button";
import TextCustomizer from "@/components/editor/text-customizer";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import { Download, ImageIcon, PlusIcon, Type, Wand2 } from "lucide-react";
import { ModeToggle } from "@/components/global/mode-toggle";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";
import { Accordion } from "@/components/ui/accordion";
import "@/app/fonts.css";

interface UploadedImage {
  url: string;
  file: File;
}

interface TextSet {
  id: number;
  text: string;
  fontFamily: string;
  fontSize: number;
  color: string;
  top: number;
  left: number;
  opacity: number;
  rotation: number;
  fontWeight: number;
  shadowColor: string;
  shadowSize: number;
}

export default function Page() {
  const [uploadedImage, setUploadedImage] = useState<UploadedImage | null>(
    null
  );
  const [textSets, setTextSets] = useState<TextSet[]>([]);
  const previewCanvasRef = useRef<HTMLCanvasElement>(null);

  const addNewTextSet = () => {
    const newId = Math.max(...textSets.map((set) => set.id), 0) + 1;
    setTextSets((prev) => [
      ...prev,
      {
        id: newId,
        text: "edit",
        fontFamily: "Inter",
        top: 0,
        left: 0,
        color: "white",
        fontSize: 200,
        fontWeight: 800,
        opacity: 1,
        shadowColor: "rgba(0, 0, 0, 0.8)",
        shadowSize: 4,
        rotation: 0,
      },
    ]);
  };

  const removeTextSet = (id: number) => {
    setTextSets((prev) => prev.filter((set) => set.id !== id));
  };

  const duplicateTextSet = (textSet: TextSet) => {
    const newId = Math.max(...textSets.map((set) => set.id), 0) + 1;
    setTextSets((prev) => [...prev, { ...textSet, id: newId }]);
  };

  const handleImageUpload = (url: string, file: File) => {
    setUploadedImage({ url, file });
  };

  const handleAttributeChange = (id: number, attribute: string, value: any) => {
    setTextSets((prev) =>
      prev.map((set) => (set.id === id ? { ...set, [attribute]: value } : set))
    );
  };

  const renderCanvas = () => {
    if (!uploadedImage || !previewCanvasRef.current) return;

    const canvas = previewCanvasRef.current;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const img = new Image();
    img.crossOrigin = "anonymous";

    img.onload = () => {
      // Set canvas size to match image aspect ratio while fitting in container
      const containerWidth = canvas.parentElement?.clientWidth || 800;
      const scale = containerWidth / img.width;
      canvas.width = containerWidth;
      canvas.height = img.height * scale;

      // Clear canvas and draw image
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      ctx.drawImage(img, 0, 0, canvas.width, canvas.height);

      // Draw each text set
      textSets.forEach((textSet) => {
        ctx.save();

        // Set text properties
        try {
          ctx.font = `${textSet.fontWeight} ${textSet.fontSize}px "${textSet.fontFamily}"`;
        } catch (e) {
          console.error("Font error:", e);
          ctx.font = `${textSet.fontWeight} ${textSet.fontSize}px Arial`;
        }

        ctx.fillStyle = textSet.color;
        ctx.globalAlpha = textSet.opacity;
        ctx.textAlign = "center";
        ctx.textBaseline = "middle";

        // Calculate position
        const x = (canvas.width * (textSet.left + 50)) / 100;
        const y = (canvas.height * (50 - textSet.top)) / 100;

        // Apply transformations
        ctx.translate(x, y);
        ctx.rotate((textSet.rotation * Math.PI) / 180);

        // Add shadow if specified
        if (textSet.shadowColor && textSet.shadowSize) {
          ctx.shadowColor = textSet.shadowColor;
          ctx.shadowBlur = textSet.shadowSize;
        }

        // Draw text
        ctx.fillText(textSet.text, 0, 0);
        ctx.restore();
      });
    };

    img.src = uploadedImage.url;
  };

  // Update canvas when image or text sets change
  useEffect(() => {
    renderCanvas();

    // Add resize observer to handle container size changes
    const observer = new ResizeObserver(() => renderCanvas());
    if (previewCanvasRef.current?.parentElement) {
      observer.observe(previewCanvasRef.current.parentElement);
    }

    return () => {
      observer.disconnect();
    };
  }, [uploadedImage, textSets]);

  const handleExport = (format: "png" | "jpeg") => {
    if (!previewCanvasRef.current) return;

    const link = document.createElement("a");
    link.download = `image-with-text.${format}`;
    link.href = previewCanvasRef.current.toDataURL(`image/${format}`);
    link.click();
  };

  return (
    <div className="min-h-screen p-6">
      <div className="mx-auto max-w-7xl space-y-4">
        {/* Header - unchanged */}
        <div className="flex justify-between items-center">
          <div className="flex flex-col space-y-2">
            <h1 className="text-2xl sm:text-3xl font-bold tracking-tight bg-gradient-to-b from-white to-zinc-500 inline-block text-transparent bg-clip-text">
              Opal
            </h1>
          </div>
          <div className="flex items-center gap-2">
            {uploadedImage && (
              <>
                <Button
                  variant="outline"
                  onClick={() =>
                    document.getElementById("file-upload")?.click()
                  }
                >
                  <input
                    type="file"
                    id="file-upload"
                    className="hidden"
                    accept="image/*"
                    onChange={(e) => {
                      const file = e.target.files?.[0];
                      if (file) {
                        const url = URL.createObjectURL(file);
                        handleImageUpload(url, file);
                      }
                    }}
                  />
                  Upload Image
                </Button>
                <Button
                  variant="outline"
                  size="icon"
                  onClick={() => handleExport("png")}
                >
                  <Download className="h-4 w-4" />
                </Button>
              </>
            )}
            <ModeToggle />
          </div>
        </div>

        {!uploadedImage ? (
          <Card>
            <CardHeader>
              <CardTitle>Upload Image</CardTitle>
              <CardDescription>
                Choose an image to add text overlay
              </CardDescription>
            </CardHeader>
            <CardContent>
              <ImageUploader onUploadComplete={handleImageUpload} />
            </CardContent>
          </Card>
        ) : (
          <div className="grid gap-4 lg:grid-cols-2">
            {/* Preview Section - Now comes first on mobile */}
               <Card className="relative flex items-center justify-center rounded-lg border border-dashed border-muted-foreground/25 bg-muted overflow-hidden w-full">
      <div className="w-full pb-[177.78%] md:pb-[56.25%]">
        <canvas
          ref={previewCanvasRef}
          className="absolute top-0 left-0 w-full h-full"
          style={{
            objectFit: "contain",
            objectPosition: "center",
          }}
        />
      </div>
    </Card>

            {/* Editor Section */}
            <div className="flex flex-col w-full">
              <Button variant="secondary" onClick={addNewTextSet}>
                <PlusIcon className="mr-2" /> Add New Text Set
              </Button>
              <ScrollArea className="h-[calc(100vh-10rem)] p-2">
                <div className="pr-4">
                  <Accordion type="single" collapsible className="w-full mt-2">
                    {textSets.map((textSet) => (
                      <TextCustomizer
                        key={textSet.id}
                        textSet={textSet}
                        handleAttributeChange={handleAttributeChange}
                        removeTextSet={removeTextSet}
                        duplicateTextSet={duplicateTextSet}
                        userId="1"
                      />
                    ))}
                  </Accordion>
                </div>
                <ScrollBar orientation="vertical" />
              </ScrollArea>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
