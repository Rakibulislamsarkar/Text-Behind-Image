"use client";

import { useState, useRef, useEffect } from "react";
import { ImageUploader } from "@/components/global/image-uploader";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Slider } from "@/components/ui/slider";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { Download, ImageIcon, Type, Wand2 } from "lucide-react";
import { ModeToggle } from "@/components/global/mode-toggle";

interface UploadedImage {
  url: string;
  file: File;
}

export default function Page() {
  const [uploadedImage, setUploadedImage] = useState<UploadedImage | null>(
    null
  );
  const [overlayText, setOverlayText] = useState("Your text here");
  const [fontSize, setFontSize] = useState(32);
  const [textColor, setTextColor] = useState("#ffffff");
  const [textPosition, setTextPosition] = useState("center");
  const previewCanvasRef = useRef<HTMLCanvasElement>(null);

  const handleImageUpload = (url: string, file: File) => {
    setUploadedImage({ url, file });
  };

  // Function to update the preview canvas
  useEffect(() => {
    if (!uploadedImage || !previewCanvasRef.current) return;

    const canvas = previewCanvasRef.current;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const img = new Image();
    img.crossOrigin = "anonymous";
    img.src = uploadedImage.url;

    img.onload = () => {
      // Set canvas size to match image aspect ratio
      const aspectRatio = img.width / img.height;
      canvas.width = 800;
      canvas.height = 800 / aspectRatio;

      // Draw image
      ctx.drawImage(img, 0, 0, canvas.width, canvas.height);

      // Add text
      ctx.font = `${fontSize}px Arial`;
      ctx.fillStyle = textColor;
      ctx.textAlign = "center";

      // Calculate text position
      const x = canvas.width / 2;
      let y;
      switch (textPosition) {
        case "top":
          y = fontSize + 20;
          break;
        case "bottom":
          y = canvas.height - 20;
          break;
        default: // center
          y = canvas.height / 2;
      }

      ctx.fillText(overlayText, x, y);
    };
  }, [uploadedImage, overlayText, fontSize, textColor, textPosition]);

  return (
    <div className="min-h-screen p-6">
      <div className="mx-auto max-w-7xl space-y-6">
        {/* Header */}
        <div className="flex justify-between items-center">
          <div className="flex flex-col space-y-2">
            <h1
              className="text-2xl sm:text-3xl font-bold tracking-tight bg-gradient-to-b from-white to-zinc-500 inline-block text-transparent bg-clip-text">
              Opal
            </h1>
          </div>
          <ModeToggle />
        </div>

        {!uploadedImage ? (
          // Show only upload card initially
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
          // Show full layout after upload
          <div className="grid gap-6 lg:grid-cols-2">
            {/* Left Column - Controls */}
            <div className="space-y-6">
              {/* Image Upload Card */}
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

              {/* Text Customization Card */}
              <Card>
                <CardHeader>
                  <CardTitle>Text Customization</CardTitle>
                  <CardDescription>
                    Customize how your text appears on the image
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="space-y-2">
                    <Label htmlFor="overlay-text">Overlay Text</Label>
                    <Input
                      id="overlay-text"
                      value={overlayText}
                      onChange={(e) => setOverlayText(e.target.value)}
                      placeholder="Enter your text"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="font-size">Font Size: {fontSize}px</Label>
                    <Slider
                      id="font-size"
                      min={12}
                      max={72}
                      step={1}
                      value={[fontSize]}
                      onValueChange={(value) => setFontSize(value[0])}
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="text-color">Text Color</Label>
                    <div className="flex gap-2">
                      <Input
                        id="text-color"
                        type="color"
                        value={textColor}
                        onChange={(e) => setTextColor(e.target.value)}
                        className="w-24"
                      />
                      <Input
                        value={textColor}
                        onChange={(e) => setTextColor(e.target.value)}
                        placeholder="#000000"
                        className="flex-1"
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="text-position">Text Position</Label>
                    <Select
                      value={textPosition}
                      onValueChange={setTextPosition}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Select position" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="top">Top</SelectItem>
                        <SelectItem value="center">Center</SelectItem>
                        <SelectItem value="bottom">Bottom</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Right Column - Preview */}
            <div className="space-y-6">
              <Card className="flex-1">
                <CardHeader>
                  <CardTitle>Preview</CardTitle>
                  <CardDescription>
                    See how your image will look with the text overlay
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <Tabs defaultValue="preview" className="w-full">
                    <TabsList className="grid w-full grid-cols-2">
                      <TabsTrigger value="preview">Preview</TabsTrigger>
                      <TabsTrigger value="code">Export</TabsTrigger>
                    </TabsList>
                    <TabsContent value="preview" className="mt-4">
                      <div className="aspect-video relative rounded-lg border-2 border-dashed border-muted-foreground/25 bg-muted overflow-hidden">
                        <canvas
                          ref={previewCanvasRef}
                          className="w-full h-full object-contain"
                        />
                      </div>
                    </TabsContent>
                    <TabsContent value="code" className="mt-4">
                      <div className="space-y-4">
                        <p className="text-sm text-muted-foreground">
                          Your image is ready to be exported. Choose your
                          preferred format below.
                        </p>
                        <div className="flex gap-2">
                          <TooltipProvider>
                            <Tooltip>
                              <TooltipTrigger asChild>
                                <Button
                                  variant="outline"
                                  className="flex-1"
                                  onClick={() => {
                                    if (previewCanvasRef.current) {
                                      const link = document.createElement("a");
                                      link.download = "image-with-text.png";
                                      link.href =
                                        previewCanvasRef.current.toDataURL(
                                          "image/png"
                                        );
                                      link.click();
                                    }
                                  }}
                                >
                                  <ImageIcon className="mr-2 h-4 w-4" />
                                  Export as PNG
                                </Button>
                              </TooltipTrigger>
                              <TooltipContent>
                                <p>Download as PNG image</p>
                              </TooltipContent>
                            </Tooltip>
                          </TooltipProvider>

                          <TooltipProvider>
                            <Tooltip>
                              <TooltipTrigger asChild>
                                <Button
                                  variant="outline"
                                  className="flex-1"
                                  onClick={() => {
                                    if (previewCanvasRef.current) {
                                      const link = document.createElement("a");
                                      link.download = "image-with-text.jpg";
                                      link.href =
                                        previewCanvasRef.current.toDataURL(
                                          "image/jpeg"
                                        );
                                      link.click();
                                    }
                                  }}
                                >
                                  <Download className="mr-2 h-4 w-4" />
                                  Export as JPEG
                                </Button>
                              </TooltipTrigger>
                              <TooltipContent>
                                <p>Download as JPEG image</p>
                              </TooltipContent>
                            </Tooltip>
                          </TooltipProvider>
                        </div>
                      </div>
                    </TabsContent>
                  </Tabs>
                </CardContent>
              </Card>

              {/* Quick Actions */}
              <div className="grid grid-cols-2 gap-4">
                <Card>
                  <CardContent className="pt-6">
                    <div className="flex items-center space-x-4">
                      <div className="rounded-lg border bg-card p-2">
                        <Wand2 className="h-6 w-6" />
                      </div>
                      <div className="space-y-1">
                        <p className="text-sm font-medium">Auto Enhance</p>
                        <p className="text-xs text-muted-foreground">
                          Automatically adjust text position
                        </p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
                <Card>
                  <CardContent className="pt-6">
                    <div className="flex items-center space-x-4">
                      <div className="rounded-lg border bg-card p-2">
                        <Type className="h-6 w-6" />
                      </div>
                      <div className="space-y-1">
                        <p className="text-sm font-medium">Font Styles</p>
                        <p className="text-xs text-muted-foreground">
                          Choose from premium fonts
                        </p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
