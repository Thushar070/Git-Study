import React, { useState } from 'react';
import { Check, Copy, Terminal } from 'lucide-react';

interface CodeBlockProps {
  code: string;
  language?: string;
  title?: string;
  showCopy?: boolean;
  className?: string;
}

export const CodeBlock: React.FC<CodeBlockProps> = ({
  code,
  language = 'bash',
  title,
  showCopy = true,
  className = ''
}) => {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(code);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error('Failed to copy: ', err);
    }
  };

  return (
    <div className={`code-block-container ${className}`}>
      {(title || showCopy) && (
        <div className="code-block-header">
          <div className="code-block-title">
            <Terminal size={14} className="code-block-icon" />
            <span>{title || language}</span>
          </div>
          {showCopy && (
            <button
              onClick={handleCopy}
              className="copy-button"
              title="Copy code"
              aria-label="Copy code to clipboard"
            >
              {copied ? (
                <>
                  <Check size={14} className="text-emerald" />
                  <span className="copied-text">Copied!</span>
                </>
              ) : (
                <>
                  <Copy size={14} />
                  <span>Copy</span>
                </>
              )}
            </button>
          )}
        </div>
      )}
      <pre className="code-block-pre">
        <code className={`language-${language}`}>{code}</code>
      </pre>
    </div>
  );
};
