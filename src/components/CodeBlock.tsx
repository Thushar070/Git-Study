import React, { useState } from 'react';
import { Check, Copy, Terminal } from 'lucide-react';

interface CodeBlockProps {
  code: string;
  language?: string;
  title?: string;
  showCopy?: boolean;
  compact?: boolean;
  className?: string;
}

export const CodeBlock: React.FC<CodeBlockProps> = ({
  code,
  language = 'bash',
  title,
  showCopy = true,
  compact = false,
  className = ''
}) => {
  const [copied, setCopied] = useState(false);

  // Normalize: trim whitespace
  const rawCode = (code || '').trim();

  // For clipboard: strip leading '$ ' from each line if present
  const copyText = rawCode
    .split('\n')
    .map((line) => line.replace(/^\$\s+/, ''))
    .join('\n');

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(copyText);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error('Failed to copy: ', err);
    }
  };

  const containerClasses = [
    'code-block-container',
    compact ? 'code-block-compact' : '',
    className
  ].filter(Boolean).join(' ');

  return (
    <div className={containerClasses}>
      <div className="code-block-header">
        <div className="code-block-title">
          <Terminal size={compact ? 12 : 14} className="code-block-icon" />
          <span>{title || language}</span>
        </div>
        {showCopy && (
          <button
            onClick={handleCopy}
            className={`copy-button ${copied ? 'copied' : ''}`}
            title={copied ? 'Copied to clipboard' : 'Copy code'}
            aria-label={copied ? 'Copied to clipboard' : 'Copy code to clipboard'}
            tabIndex={0}
          >
            {copied ? (
              <>
                <Check size={13} className="copy-icon-check" />
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
      <pre className="code-block-pre">
        <code className={`language-${language}`}>{rawCode}</code>
      </pre>
    </div>
  );
};
