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

  // Normalize code: strip accidental leading '>' or extra whitespace
  const rawCode = (code || '').trim().replace(/^>\s*/, '');

  // Strip leading '$ ' for clipboard copy if present
  const copyText = rawCode.replace(/^\$\s+/, '');

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(copyText);
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
              className={`copy-button ${copied ? 'copied' : ''}`}
              title="Copy code"
              aria-label="Copy code to clipboard"
            >
              {copied ? (
                <>
                  <Check size={13} className="text-emerald" />
                  <span className="copied-text">Copied!</span>
                </>
              ) : (
                <>
                  <Copy size={13} />
                  <span>Copy</span>
                </>
              )}
            </button>
          )}
        </div>
      )}
      <pre className="code-block-pre">
        <code className={`language-${language}`}>
          {language === 'bash' && !rawCode.startsWith('$ ') && (
            <span className="code-prompt">$ </span>
          )}
          {rawCode}
        </code>
      </pre>
    </div>
  );
};
