"use client";

import React, { useState, useRef } from "react";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Accordion } from "@/components/ui/accordion";
import { ModeToggle } from "@/components/global/mode-toggle";
import TextCustomizer from "@/components/editor/text-customizer";
import { PlusIcon, ReloadIcon } from "@radix-ui/react-icons";
import { removeBackground } from "@imgly/background-removal";
import {ImageUploader} from '@/components/global/image-uploader'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import "@/app/fonts.css";

const Page = () => {
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [isImageSetupDone, setIsImageSetupDone] = useState<boolean>(false);
  const [removedBgImageUrl, setRemovedBgImageUrl] = useState<string | null>(
    null
  );
  const [textSets, setTextSets] = useState<Array<any>>([]);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  const handleUploadImage = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  const handleFileChange = async (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const file = event.target.files?.[0];
    if (file) {
      const imageUrl = URL.createObjectURL(file);
      setSelectedImage(imageUrl);
      await setupImage(imageUrl);
    }
  };

  const setupImage = async (imageUrl: string) => {
    try {
      const imageBlob = await removeBackground(imageUrl);
      const url = URL.createObjectURL(imageBlob);
      setRemovedBgImageUrl(url);
      setIsImageSetupDone(true);
    } catch (error) {
      console.error(error);
    }
  };

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

  const handleAttributeChange = (id: number, attribute: string, value: any) => {
    setTextSets((prev) =>
      prev.map((set) => (set.id === id ? { ...set, [attribute]: value } : set))
    );
  };

  const duplicateTextSet = (textSet: any) => {
    const newId = Math.max(...textSets.map((set) => set.id), 0) + 1;
    setTextSets((prev) => [...prev, { ...textSet, id: newId }]);
  };

  const removeTextSet = (id: number) => {
    setTextSets((prev) => prev.filter((set) => set.id !== id));
  };

  const saveCompositeImage = () => {
    if (!canvasRef.current || !isImageSetupDone) return;

    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const bgImg = new (window as any).Image();
    bgImg.crossOrigin = "anonymous";
    bgImg.onload = () => {
      canvas.width = bgImg.width;
      canvas.height = bgImg.height;

      ctx.drawImage(bgImg, 0, 0, canvas.width, canvas.height);

      textSets.forEach((textSet) => {
        ctx.save();
        ctx.font = `${textSet.fontWeight} ${textSet.fontSize * 3}px ${
          textSet.fontFamily
        }`;
        ctx.fillStyle = textSet.color;
        ctx.globalAlpha = textSet.opacity;
        ctx.textAlign = "center";
        ctx.textBaseline = "middle";

        const x = (canvas.width * (textSet.left + 50)) / 100;
        const y = (canvas.height * (50 - textSet.top)) / 100;

        ctx.translate(x, y);
        ctx.rotate((textSet.rotation * Math.PI) / 180);
        ctx.fillText(textSet.text, 0, 0);
        ctx.restore();
      });

      if (removedBgImageUrl) {
        const removedBgImg = new (window as any).Image();
        removedBgImg.crossOrigin = "anonymous";
        removedBgImg.onload = () => {
          ctx.drawImage(removedBgImg, 0, 0, canvas.width, canvas.height);
          triggerDownload();
        };
        removedBgImg.src = removedBgImageUrl;
      } else {
        triggerDownload();
      }
    };
    bgImg.src = selectedImage || "";

    function triggerDownload() {
      const dataUrl = canvas.toDataURL("image/png");
      const link = document.createElement("a");
      link.download = "text-behind-image.png";
      link.href = dataUrl;
      link.click();
    }
  };

  return (
    <div className="flex flex-col h-screen">
      <header className="flex flex-row items-center justify-between p-5 px-10">
        <div className="flex items-center gap-2">
          <Image src="/opal-logo.svg" width={30} height={30} alt="Opal Logo" />
          <span className="text-2xl sm:text-3xl font-bold tracking-tight bg-gradient-to-b from-white to-zinc-500 inline-block text-transparent bg-clip-text">
            Opal
          </span>
        </div>
        <div className="flex gap-4 items-center">
          <input
            type="file"
            ref={fileInputRef}
            style={{ display: "none" }}
            onChange={handleFileChange}
            accept=".jpg, .jpeg, .png"
          />
          <div className="flex items-center gap-5">
            <div className="flex gap-2">
              <Button onClick={handleUploadImage}>Upload image</Button>
              {selectedImage && (
                <Button onClick={saveCompositeImage} className="hidden md:flex">
                  Save image
                </Button>
              )}
            </div>
          </div>
          <ModeToggle />
        </div>
      </header>
      <Separator />
      {selectedImage ? (
        <div className="flex flex-col md:flex-row items-start justify-start gap-10 w-full h-screen px-10 mt-2">
          <div className="flex flex-col items-start justify-start w-full md:w-1/2 gap-4">
            <canvas ref={canvasRef} style={{ display: "none" }} />
            <div className="flex items-center gap-2">
              <Button onClick={saveCompositeImage} className="md:hidden">
                Save image
              </Button>
            </div>
            <div className="min-h-[400px] w-[80%] p-4 border border-border rounded-lg relative overflow-hidden">
              {isImageSetupDone ? (
                <Image
                  src={selectedImage}
                  alt="Uploaded"
                  layout="fill"
                  objectFit="contain"
                  objectPosition="center"
                />
              ) : (
                <span className="flex items-center justify-center w-full gap-2">
                  <ReloadIcon className="animate-spin" /> Loading, please wait
                </span>
              )}
              {isImageSetupDone &&
                textSets.map((textSet) => (
                  <div
                    key={textSet.id}
                    style={{
                      position: "absolute",
                      top: `${50 - textSet.top}%`,
                      left: `${textSet.left + 50}%`,
                      transform: `translate(-50%, -50%) rotate(${textSet.rotation}deg)`,
                      color: textSet.color,
                      textAlign: "center",
                      fontSize: `${textSet.fontSize}px`,
                      fontWeight: textSet.fontWeight,
                      fontFamily: textSet.fontFamily,
                      opacity: textSet.opacity,
                    }}
                  >
                    {textSet.text}
                  </div>
                ))}
              {removedBgImageUrl && (
                <Image
                  src={removedBgImageUrl}
                  alt="Removed bg"
                  layout="fill"
                  objectFit="contain"
                  objectPosition="center"
                  className="absolute top-0 left-0 w-full h-full"
                />
              )}
            </div>
          </div>
          <div className="flex flex-col w-full md:w-1/2">
            <Button variant={"secondary"} onClick={addNewTextSet}>
              <PlusIcon className="mr-2" /> Add New Text Set
            </Button>
            <ScrollArea className="h-[calc(100vh-10rem)] p-2">
              <Accordion type="single" collapsible className="w-full mt-2">
                {textSets.map((textSet) => (
                  <TextCustomizer
                    key={textSet.id}
                    textSet={textSet}
                    handleAttributeChange={handleAttributeChange}
                    removeTextSet={removeTextSet}
                    duplicateTextSet={duplicateTextSet}
                  />
                ))}
              </Accordion>
            </ScrollArea>
          </div>
        </div>
      ) : (
        <div className="flex items-center justify-center flex-grow p-8">
        <Card className="w-full max-w-md">
          <CardHeader>
            <CardTitle className="text-2xl font-bold text-center">Welcome to Opal</CardTitle>
            <CardDescription className="text-center">
              Get started by uploading an image to begin editing
            </CardDescription>
          </CardHeader>
          <CardContent className="flex flex-col items-center space-y-4">
            <Image
              src="/bear.png"
              width={200}
              height={200}
              alt="Upload Illustration"
            />
            <ImageUploader
              onUploadComplete={(url, file) => {
                setSelectedImage(url);
                setupImage(url);
              }}
            />
          </CardContent>
        </Card>
      </div>
      )}
    </div>
  );
};

export default Page;
