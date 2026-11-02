"use client";
import { usePathname } from "next/navigation";
import { ReferenceDialog } from "./reference/ReferenceDialog";
import { ReferenceContactForm } from "./reference/ReferenceContactForm";
export function ContactDialog() {
  const pathname = usePathname();
  return <ReferenceDialog>{pathname !== "/" && <ReferenceContactForm />}</ReferenceDialog>;
}
