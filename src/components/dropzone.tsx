// src/components/ui/dropzone-simple.tsx
import { cn } from "@/lib/utils";
import { Upload } from "lucide-react";
import React, { useCallback, useState } from "react";

interface DropzoneSimpleProps {
  className?: string;
  onFilesSelected?: (files: File[]) => void;
}

export const DropzoneSimple: React.FC<DropzoneSimpleProps> = ({
  className,
  onFilesSelected,
}) => {
  const [isActive, setIsActive] = useState(false);

  const handleDragOver = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsActive(true);
  }, []);

  const handleDragLeave = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsActive(false);
  }, []);

  const handleDrop = useCallback(
    (e: React.DragEvent) => {
      e.preventDefault();
      setIsActive(false);
      if (onFilesSelected) {
        const files = Array.from(e.dataTransfer.files);
        onFilesSelected(files);
      }
    },
    [onFilesSelected]
  );

  const handleFileInput = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      if (onFilesSelected && e.target.files) {
        const files = Array.from(e.target.files);
        onFilesSelected(files);
      }
    },
    [onFilesSelected]
  );

  return (
    <div
      onDragOver={handleDragOver}
      onDragLeave={handleDragLeave}
      onDrop={handleDrop}
      className={cn(
        "border-2 border-dashed border-gray-300 rounded-lg p-6 text-center bg-card transition-colors duration-300 cursor-pointer",
        isActive && "border-primary bg-primary/10",
        className
      )}
      onClick={() => document.getElementById("dropzoneInput")?.click()}
    >
      <input
        id="dropzoneInput"
        type="file"
        className="hidden"
        multiple
        onChange={handleFileInput}
      />
      <Upload size={24} className="mx-auto mb-2 text-muted-foreground" />
      <p className="text-sm text-muted-foreground">
        Arrastra y suelta archivos aquí o haz clic para seleccionar
      </p>
    </div>
  );
};
