import React from 'react';
import { Info, AlertTriangle, Lightbulb, Flame, CheckCircle2 } from 'lucide-react';

/* ── ProseBlock ─────────────────────────────────────────────
   Renders text with automatic inline code detection.
   Text wrapped in backticks (`like this`) becomes <code>.
   ────────────────────────────────────────────────────────── */
interface ProseBlockProps {
  text: string;
  className?: string;
}

export const ProseBlock: React.FC<ProseBlockProps> = ({ text, className = '' }) => {
  // Split on backtick pairs and render alternating text/code
  const parts = text.split(/`([^`]+)`/);
  return (
    <p className={`prose-text ${className}`}>
      {parts.map((part, i) =>
        i % 2 === 1 ? (
          <code key={i} className="inline-code">{part}</code>
        ) : (
          <span key={i}>{part}</span>
        )
      )}
    </p>
  );
};

/* ── Callout Components ─────────────────────────────────── */
interface CalloutProps {
  children: React.ReactNode;
  title?: string;
  className?: string;
}

export const InfoCallout: React.FC<CalloutProps> = ({ children, title, className = '' }) => (
  <div className={`callout callout-info ${className}`}>
    <div className="callout-icon-wrapper">
      <Info size={18} />
    </div>
    <div className="callout-content">
      {title && <div className="callout-title">{title}</div>}
      <div className="callout-body">{children}</div>
    </div>
  </div>
);

export const WarningCallout: React.FC<CalloutProps> = ({ children, title, className = '' }) => (
  <div className={`callout callout-warning ${className}`}>
    <div className="callout-icon-wrapper">
      <AlertTriangle size={18} />
    </div>
    <div className="callout-content">
      {title && <div className="callout-title">{title}</div>}
      <div className="callout-body">{children}</div>
    </div>
  </div>
);

export const DangerCallout: React.FC<CalloutProps> = ({ children, title, className = '' }) => (
  <div className={`callout callout-danger ${className}`}>
    <div className="callout-icon-wrapper">
      <Flame size={18} />
    </div>
    <div className="callout-content">
      {title && <div className="callout-title">{title}</div>}
      <div className="callout-body">{children}</div>
    </div>
  </div>
);

export const TipCallout: React.FC<CalloutProps> = ({ children, title, className = '' }) => (
  <div className={`callout callout-tip ${className}`}>
    <div className="callout-icon-wrapper">
      <Lightbulb size={18} />
    </div>
    <div className="callout-content">
      {title && <div className="callout-title">{title}</div>}
      <div className="callout-body">{children}</div>
    </div>
  </div>
);

export const SuccessCallout: React.FC<CalloutProps> = ({ children, title, className = '' }) => (
  <div className={`callout callout-success ${className}`}>
    <div className="callout-icon-wrapper">
      <CheckCircle2 size={18} />
    </div>
    <div className="callout-content">
      {title && <div className="callout-title">{title}</div>}
      <div className="callout-body">{children}</div>
    </div>
  </div>
);

/* ── InlineCode ─────────────────────────────────────────── */
interface InlineCodeProps {
  children: React.ReactNode;
}

export const InlineCode: React.FC<InlineCodeProps> = ({ children }) => (
  <code className="inline-code">{children}</code>
);
