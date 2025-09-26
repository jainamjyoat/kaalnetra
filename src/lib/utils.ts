import { twMerge } from "tailwind-merge";

// Minimal clsx-compatible types and implementation to avoid external dependency
export type ClassValue =
  | string
  | number
  | null
  | boolean
  | undefined
  | ClassDictionary
  | ClassArray;

interface ClassDictionary {
  [id: string]: any;
}

interface ClassArray extends Array<ClassValue> {}

function cx(...inputs: ClassValue[]): string {
  const classes: string[] = [];

  const push = (val: any) => {
    if (!val) return;
    if (typeof val === "string" || typeof val === "number") {
      classes.push(String(val));
    } else if (Array.isArray(val)) {
      if (val.length) classes.push(cx(...val));
    } else if (typeof val === "object") {
      for (const key in val as ClassDictionary) {
        if ((val as ClassDictionary)[key]) classes.push(key);
      }
    }
  };

  for (const input of inputs) push(input);
  return classes.join(" ");
}

export function cn(...inputs: ClassValue[]) {
  return twMerge(cx(...inputs));
}
