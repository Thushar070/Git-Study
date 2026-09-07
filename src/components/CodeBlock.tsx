import React, { useState } from 'react';
import { Check, Copy, Terminal } from 'lucide-react';

interface CodeBlockProps {
  code: string;
  language?: string;
  title?: string;
  showCopy?: boolean;
  showPrompt?: boolean;
  compact?: boolean;
  className?: string;
}

export const CodeBlock: React.FC<CodeBlockProps> = ({
  code,
  language = 'bash',
  title,
  showCopy = true,
  showPrompt,
  compact = false,
  className = ''
}) => {
  const [copied, setCopied] = useState(false);

  // Determine if shell prompt ($ ) should be rendered
  const isShell = language === 'bash' || language === 'sh' || language === 'zsh' || language === 'terminal';
  const shouldShowPrompt = showPrompt !== undefined ? showPrompt : isShell;

  // Split lines and normalize: strip existing leading '$ ' or '$' from raw input
  const lines = (code || '')
    .trim()
    .split('\n')
    .map((line) => line.replace(/^\$\s*/, ''));

  const cleanTextToCopy = lines.join('\n');

  const handleCopy = async (e: React.MouseEvent) => {
    e.stopPropagation();
    try {
      await navigator.clipboard.writeText(cleanTextToCopy);
      setCopied(true);
      setTimeout(() => setCopied(false), 1800);
    } catch (err) {
      console.error('Failed to copy code to clipboard:', err);
    }
  };

  const containerClasses = [
    'code-block-container',
    compact ? 'code-block-compact' : '',
    title ? 'has-header' : 'no-header',
    className
  ].filter(Boolean).join(' ');

  return (
    <div className={containerClasses}>
      {/* Header bar (only rendered if title is explicitly provided) */}
      {title && (
        <div className="code-block-header">
          <div className="code-block-title">
            <Terminal size={13} className="code-block-icon" aria-hidden="true" />
            <span>{title}</span>
          </div>
          {showCopy && (
            <button
              type="button"
              onClick={handleCopy}
              className={`copy-button ${copied ? 'copied' : ''}`}
              title={copied ? 'Copied to clipboard' : 'Copy code'}
              aria-label={copied ? 'Copied code to clipboard' : 'Copy code to clipboard'}
            >
              {copied ? (
                <>
                  <Check size={13} aria-hidden="true" />
                  <span>Copied!</span>
                </>
              ) : (
                <>
                  <Copy size={13} aria-hidden="true" />
                  <span>Copy</span>
                </>
              )}
            </button>
          )}
        </div>
      )}

      {/* Code Body Area */}
      <div className="code-block-body">
        {!title && showCopy && (
          <button
            type="button"
            onClick={handleCopy}
            className={`copy-button floating-copy ${copied ? 'copied' : ''}`}
            title={copied ? 'Copied to clipboard' : 'Copy code'}
            aria-label={copied ? 'Copied code to clipboard' : 'Copy code to clipboard'}
          >
            {copied ? (
              <>
                <Check size={13} aria-hidden="true" />
                <span>Copied!</span>
              </>
            ) : (
              <>
                <Copy size={13} aria-hidden="true" />
                <span>Copy</span>
              </>
            )}
          </button>
        )}
        <pre className="code-block-pre">
          <code>
            {lines.map((line, idx) => (
              <span key={idx} className="code-line">
                {shouldShowPrompt && (
                  <span className="code-prompt-symbol" aria-hidden="true">
                    $&nbsp;
                  </span>
                )}
                <span className="code-line-text">{line}</span>
                {idx < lines.length - 1 ? '\n' : ''}
              </span>
            ))}
          </code>
        </pre>
      </div>
    </div>
  );
};
