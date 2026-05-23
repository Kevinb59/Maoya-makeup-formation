import { Sparkles } from "lucide-react";

/**
 * Étiquette de section avec icône décorative.
 */
export default function SectionLabel({ children }) {
  return (
    <p className="section-label">
      <Sparkles size={15} /> {children}
    </p>
  );
}
