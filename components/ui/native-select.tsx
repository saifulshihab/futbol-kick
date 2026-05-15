"use client";

import { ChevronDown } from "lucide-react";
import { useEffect, useRef, useState } from "react";

export default function CustomSelect({
  value,
  onChange,
  options,
  placeholder
}: {
  value: string;
  onChange: (v: string) => void;
  options: { value: string; label: string }[];
  placeholder: string;
}) {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handler(e: MouseEvent) {
      if (ref.current && !ref.current.contains(e.target as Node))
        setOpen(false);
    }
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  const selected = options.find((o) => o.value === value);

  return (
    <div ref={ref} className="relative">
      <button
        type="button"
        onClick={() => setOpen((o) => !o)}
        className={`bg-brand-navy border-brand-accent text-brand-white flex w-full items-center justify-between rounded-lg border px-3 py-2 text-sm transition-colors ${open ? "border-brand-lime" : "hover:border-brand-lime"}`}
      >
        <span>{selected?.label ?? placeholder}</span>
        <ChevronDown
          size={14}
          className={`text-brand-muted transition-transform ${open ? "rotate-180" : ""}`}
        />
      </button>
      {open && (
        <div
          className="border-brand-accent bg-brand-navy absolute top-full left-0 z-50 mt-1 w-full overflow-auto rounded-lg border"
          style={{ maxHeight: 500 }}
        >
          <button
            type="button"
            onClick={() => {
              onChange("");
              setOpen(false);
            }}
            className={`text-brand-muted hover:bg-brand-accent hover:text-brand-white w-full px-3 py-2 text-left text-sm transition-colors ${value === "" ? "text-brand-lime" : ""}`}
          >
            {placeholder}
          </button>
          {options.map((o) => (
            <button
              key={o.value}
              type="button"
              onClick={() => {
                onChange(o.value);
                setOpen(false);
              }}
              className={`hover:bg-brand-accent w-full px-3 py-2 text-left text-sm transition-colors ${value === o.value ? "text-brand-lime bg-brand-accent" : "text-brand-white hover:text-brand-lime"}`}
            >
              {o.label}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
