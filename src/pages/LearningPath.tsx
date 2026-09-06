import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { BookOpen, CheckCircle2, Circle, Terminal, Trophy } from 'lucide-react';
import { learningPathData } from '../data/learning-path';

export const LearningPath: React.FC = () => {
  const [completedStages, setCompletedStages] = useState<number[]>(() => {
    try {
      const raw = localStorage.getItem('gitatlas-learning-completed');
      return raw ? JSON.parse(raw) : [];
    } catch {
      return [];
    }
  });

  const toggleStage = (stageId: number) => {
    const updated = completedStages.includes(stageId)
      ? completedStages.filter((id) => id !== stageId)
      : [...completedStages, stageId];
    setCompletedStages(updated);
    localStorage.setItem('gitatlas-learning-completed', JSON.stringify(updated));
  };

  const progressPercentage = Math.round((completedStages.length / learningPathData.length) * 100);

  return (
    <div className="page-container learning-path-page">
      <div className="page-header">
        <div className="page-title-group">
          <div className="page-icon-wrapper text-primary">
            <BookOpen size={28} />
          </div>
          <div>
            <h1 className="page-title">Structured Git Learning Path</h1>
            <p className="page-description">
              A step-by-step curriculum taking you from zero to Git expert. Track your progress across 13 learning stages.
            </p>
          </div>
        </div>
      </div>

      {/* Progress Bar Header */}
      <div className="learning-progress-card">
        <div className="progress-top">
          <div className="progress-info">
            <Trophy size={20} className="text-amber" />
            <span><strong>Your Progress:</strong> {completedStages.length} of {learningPathData.length} stages completed ({progressPercentage}%)</span>
          </div>
        </div>
        <div className="progress-bar-bg">
          <div className="progress-bar-fill" style={{ width: `${progressPercentage}%` }} />
        </div>
      </div>

      {/* Timeline Stages */}
      <div className="learning-timeline mt-6">
        {learningPathData.map((stage, idx) => {
          const isDone = completedStages.includes(stage.id);
          return (
            <div key={stage.id} className={`timeline-stage-card ${isDone ? 'completed' : ''}`}>
              <div className="stage-left">
                <button
                  className={`stage-check-btn ${isDone ? 'checked' : ''}`}
                  onClick={() => toggleStage(stage.id)}
                  title={isDone ? 'Mark as incomplete' : 'Mark as completed'}
                >
                  {isDone ? <CheckCircle2 size={24} className="text-emerald" /> : <Circle size={24} className="text-muted" />}
                </button>
                <span className="stage-number">Step {idx + 1}</span>
              </div>

              <div className="stage-content">
                <div className="stage-header-row mb-2">
                  <h3 className="stage-title">{stage.title}</h3>
                </div>

                <p className="stage-desc text-muted mb-3">{stage.description}</p>

                <div className="stage-topics-list mb-3">
                  <ul>
                    {stage.topics.map((tp, i) => (
                      <li key={i}>{tp}</li>
                    ))}
                  </ul>
                </div>

                <div className="stage-commands-chips">
                  <span className="chips-label">Key Commands:</span>
                  {stage.commandIds.map((cmdId) => (
                    <Link key={cmdId} to={`/git/commands/${cmdId}`} className="cmd-chip">
                      <Terminal size={12} />
                      <span>{cmdId}</span>
                    </Link>
                  ))}
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
