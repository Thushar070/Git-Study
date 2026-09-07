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

  // Determine if prompt ($ ) should be shown
  const isShell = language === 'bash' || language === 'sh' || language === 'zsh' || language === 'terminal';
  const shouldShowPrompt = showPrompt !== undefined ? showPrompt : isShell;

  // Split lines and normalize: strip existing leading '$ ' or '$' from raw input
  const rawCode = code || '';
  const lines = rawCode
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

  return (
    <div className={`code-box ${compact ? 'code-box-compact' : ''} ${className}`}>
      {/* Optional Title Bar */}
      {title && (
        <div className="code-box-header">
          <div className="code-box-title">
            <Terminal size={12} aria-hidden="true" />
            <span>{title}</span>
          </div>
        </div>
      )}

      {/* Main Code Row (Flex Container) */}
      <div className="code-box-row">
        <div className="code-box-code">
          <pre className="code-box-pre">
            <code>
              {lines.map((line, idx) => (
                <span key={idx} className="code-box-line">
                  {shouldShowPrompt && (
                    <span className="code-prompt" aria-hidden="true">
                      $&nbsp;
                    </span>
                  )}
                  <span className="code-text">{line}</span>
                  {idx < lines.length - 1 ? '\n' : ''}
                </span>
              ))}
            </code>
          </pre>
        </div>

        {showCopy && (
          <button
            type="button"
            onClick={handleCopy}
            className={`code-box-copy-btn ${copied ? 'copied' : ''}`}
            title={copied ? 'Copied to clipboard' : 'Copy code'}
            aria-label={copied ? 'Copied code to clipboard' : 'Copy code to clipboard'}
          >
            {copied ? (
              <>
                <Check size={12} aria-hidden="true" />
                <span>Copied</span>
              </>
            ) : (
              <>
                <Copy size={12} aria-hidden="true" />
                <span>Copy</span>
              </>
            )}
          </button>
        )}
      </div>
    </div>
  );
};
