'use client'

import { useCallback} from 'react'
import { useDropzone } from 'react-dropzone'
import { Upload } from 'lucide-react'
import { Button } from '@/components/ui/button'

interface ImageUploaderProps {
  onUploadComplete: (url: string, file: File) => void;
}

export function ImageUploader({ onUploadComplete }: ImageUploaderProps) {

  const onDrop = useCallback((acceptedFiles: File[]) => {
    const file = acceptedFiles[0]
    if (file) {
      // Create a temporary URL for preview
      const previewUrl = URL.createObjectURL(file)
      onUploadComplete(previewUrl, file)
    }
  }, [onUploadComplete])

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      'image/*': ['.png', '.jpg', '.jpeg', '.gif']
    },
    multiple: false
  })

  return (
    <div
      {...getRootProps()}
      className={`
        relative rounded-lg border-2 border-dashed p-6 transition-colors
        ${isDragActive ? 'border-primary bg-primary/5' : 'border-muted-foreground/25'}
      `}
    >
      <input {...getInputProps()} />
      <div className="flex flex-col items-center justify-center gap-2 text-center">
        <Upload className="h-8 w-8 text-muted-foreground" />
        <div className="text-sm">
          <span className="font-semibold">Click to upload</span> or drag and drop
        </div>
        <div className="text-xs text-muted-foreground">
          PNG, JPG, GIF (max. 10MB)
        </div>
        <Button variant="secondary" className="mt-2">
          Select Image
        </Button>
      </div>
    </div>
  )
}
