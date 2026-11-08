import React, { useState, useRef, useEffect } from "react";
import { cn } from "@/lib/utils";
import { useStudioStore } from "./store";

interface EditableTextProps {
  value: string;
  onSave: (val: string) => void;
  className?: string;
  as?: "span" | "p" | "h1" | "h2" | "h3" | "div";
  multiline?: boolean;
  placeholder?: string;
}

export function EditableText({
  value,
  onSave,
  className,
  as: Component = "span",
  multiline = false,
  placeholder = "Edit...",
}: EditableTextProps) {
  const { editMode } = useStudioStore();
  const [isEditing, setIsEditing] = useState(false);
  const [currentVal, setCurrentVal] = useState(value);
  const inputRef = useRef<HTMLInputElement | HTMLTextAreaElement>(null);

  useEffect(() => {
    setCurrentVal(value);
  }, [value]);

  useEffect(() => {
    if (isEditing) {
      inputRef.current?.focus();
      inputRef.current?.select();
    }
  }, [isEditing]);

  const handleCommit = () => {
    setIsEditing(false);
    if (currentVal !== value) {
      onSave(currentVal);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !multiline) {
      e.preventDefault();
      handleCommit();
    } else if (e.key === "Escape") {
      setCurrentVal(value);
      setIsEditing(false);
    }
  };

  if (!editMode) {
    return <Component className={className}>{value}</Component>;
  }

  if (isEditing) {
    if (multiline) {
      return (
        <textarea
          ref={inputRef as React.RefObject<HTMLTextAreaElement>}
          value={currentVal}
          onChange={(e) => setCurrentVal(e.target.value)}
          onBlur={handleCommit}
          onKeyDown={handleKeyDown}
          rows={2}
          className={cn(
            "w-full rounded border-2 border-blue-500 bg-background/95 px-1.5 py-0.5 text-inherit font-inherit outline-none shadow-md ring-2 ring-blue-500/20",
            className
          )}
        />
      );
    }

    return (
      <input
        ref={inputRef as React.RefObject<HTMLInputElement>}
        type="text"
        value={currentVal}
        onChange={(e) => setCurrentVal(e.target.value)}
        onBlur={handleCommit}
        onKeyDown={handleKeyDown}
        className={cn(
          "min-w-[40px] max-w-full rounded border-2 border-blue-500 bg-background/95 px-1 py-0 text-inherit font-inherit outline-none shadow-md ring-2 ring-blue-500/20",
          className
        )}
      />
    );
  }

  return (
    <Component
      onClick={(e) => {
        e.stopPropagation();
        setIsEditing(true);
      }}
      className={cn(
        className,
        "cursor-pointer hover:outline hover:outline-1 hover:outline-blue-500/60 hover:bg-blue-500/10 rounded px-0.5 transition-all"
      )}
      title="Click to edit"
    >
      {value || <span className="opacity-40 italic">{placeholder}</span>}
    </Component>
  );
}

interface EditableImageProps {
  src: string;
  alt?: string;
  className?: string;
  onImageChange: (dataUrl: string) => void;
}

export function EditableImage({
  src,
  alt = "",
  className,
  onImageChange,
}: EditableImageProps) {
  const { editMode } = useStudioStore();
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleClick = (e: React.MouseEvent) => {
    if (!editMode) return;
    e.stopPropagation();
    fileInputRef.current?.click();
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        if (typeof reader.result === "string") {
          onImageChange(reader.result);
        }
      };
      reader.readAsDataURL(file);
    }
  };

  if (!editMode) {
    return <img src={src} alt={alt} className={className} />;
  }

  return (
    <div
      onClick={handleClick}
      className={cn(
        "relative shrink-0 cursor-pointer group rounded-lg overflow-hidden transition-all hover:ring-2 hover:ring-blue-500"
      )}
      title="Click to change image"
    >
      <img src={src} alt={alt} className={className} />
      <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 flex items-center justify-center transition-opacity text-white text-[10px] font-medium backdrop-blur-[1px]">
        Change
      </div>
      <input
        ref={fileInputRef}
        type="file"
        accept="image/*"
        className="hidden"
        onChange={handleFileChange}
      />
    </div>
  );
}
