import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { Search, X, Terminal, HelpCircle, AlertCircle, ArrowRight } from 'lucide-react';
import { allCommands as commandRegistry } from '../data/registry';
import { situationsData } from '../data/situations';
import { troubleshootingData } from '../data/troubleshooting';
import { searchAll, type SearchResult } from '../lib/search';

interface SearchModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const SearchModal: React.FC<SearchModalProps> = ({ isOpen, onClose }) => {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState<SearchResult[]>([]);
  const [selectedIndex, setSelectedIndex] = useState(0);
  const inputRef = useRef<HTMLInputElement>(null);
  const navigate = useNavigate();

  useEffect(() => {
    if (isOpen) {
      setTimeout(() => inputRef.current?.focus(), 50);
      setQuery('');
      setResults([]);
      setSelectedIndex(0);
    }
  }, [isOpen]);

  useEffect(() => {
    if (!query.trim()) {
      setResults([]);
      return;
    }
    const res = searchAll(commandRegistry, situationsData, troubleshootingData, query);
    setResults(res);
    setSelectedIndex(0);
  }, [query]);

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Escape') {
      onClose();
    } else if (e.key === 'ArrowDown') {
      e.preventDefault();
      setSelectedIndex((prev) => (results.length > 0 ? (prev + 1) % results.length : 0));
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      setSelectedIndex((prev) => (results.length > 0 ? (prev - 1 + results.length) % results.length : 0));
    } else if (e.key === 'Enter' && results.length > 0) {
      e.preventDefault();
      handleSelect(results[selectedIndex]);
    }
  };

  const handleSelect = (result: SearchResult) => {
    navigate(result.path);
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="search-modal-backdrop" onClick={onClose}>
      <div
        className="search-modal"
        onClick={(e) => e.stopPropagation()}
        onKeyDown={handleKeyDown}
      >
        <div className="search-modal-header">
          <Search size={20} className="search-modal-icon" />
          <input
            ref={inputRef}
            type="text"
            className="search-modal-input"
            placeholder="Search 60+ Git commands, flags, errors, situations... (Press Esc to close)"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
          />
          {query && (
            <button className="search-modal-clear" onClick={() => setQuery('')}>
              <X size={16} />
            </button>
          )}
          <button className="search-modal-close" onClick={onClose}>
            Esc
          </button>
        </div>

        <div className="search-modal-body">
          {query.trim() === '' ? (
            <div className="search-modal-empty">
              <div className="search-shortcuts-guide">
                <h4>Quick Search Tips:</h4>
                <div className="search-tips-grid">
                  <div className="search-tip">
                    <code>git rebase</code>
                    <span>Search any command name</span>
                  </div>
                  <div className="search-tip">
                    <code>--hard</code>
                    <span>Search flags & options</span>
                  </div>
                  <div className="search-tip">
                    <code>undo commit</code>
                    <span>Search scenarios & situations</span>
                  </div>
                  <div className="search-tip">
                    <code>detached HEAD</code>
                    <span>Search error messages</span>
                  </div>
                </div>
              </div>
            </div>
          ) : results.length === 0 ? (
            <div className="search-modal-no-results">
              <AlertCircle size={32} />
              <p>No results found for "{query}"</p>
              <span>Try searching for command names like `reset`, `rebase`, or tasks like `undo`</span>
            </div>
          ) : (
            <div className="search-modal-results">
              {results.map((item, index) => {
                const isSelected = index === selectedIndex;
                return (
                  <div
                    key={`${item.type}-${item.id}-${index}`}
                    className={`search-result-item ${isSelected ? 'selected' : ''}`}
                    onClick={() => handleSelect(item)}
                    onMouseEnter={() => setSelectedIndex(index)}
                  >
                    <div className="search-result-icon">
                      {item.type === 'command' && <Terminal size={16} />}
                      {item.type === 'situation' && <HelpCircle size={16} />}
                      {item.type === 'troubleshooting' && <AlertCircle size={16} />}
                    </div>
                    <div className="search-result-content">
                      <div className="search-result-title">
                        <span>{item.title}</span>
                        {item.category && <span className="search-result-cat">{item.category}</span>}
                      </div>
                      <p className="search-result-desc">{item.description}</p>
                    </div>
                    <div className="search-result-action">
                      <ArrowRight size={14} />
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>

        <div className="search-modal-footer">
          <div className="search-modal-footer-item">
            <kbd>↑</kbd> <kbd>↓</kbd> Navigate
          </div>
          <div className="search-modal-footer-item">
            <kbd>↵</kbd> Select
          </div>
          <div className="search-modal-footer-item">
            <kbd>Esc</kbd> Close
          </div>
        </div>
      </div>
    </div>
  );
};
