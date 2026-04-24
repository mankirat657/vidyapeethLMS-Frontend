import React, { useState } from 'react';
import { X, Sparkles, Zap, Send, Loader2, Cpu, Lightbulb, Bot, Brain, Coffee } from 'lucide-react';
import './AiModal.css';
import { toast } from 'react-toastify';
import { aiQuestionAnswerCreation, createQuestionAnswers, getQuestionAnswerss } from '../../../store/actions/QuestionAnswerAction';
import { useDispatch } from 'react-redux';

const AiModal = ({ subjectId, subjectWeightage, isOpen, onClose, onSubmit, id }) => {
  const [prompt, setPrompt] = useState('');
  const [isGenerating, setIsGenerating] = useState(false);

  if (!isOpen) return null;
  const dispatch = useDispatch();

  const handleSubmit = async () => {
    if (!prompt.trim()) {
      toast.warn('Please enter a prompt');
      return;
    }
    
    setIsGenerating(true);
    const res = await dispatch(aiQuestionAnswerCreation(subjectId, prompt, subjectWeightage));
    
    if (res?.error) {
      toast.error(res?.error);
      setIsGenerating(false);
      return;
    }
    
    toast.success(res?.message || "Content generated successfully");
    await dispatch(getQuestionAnswerss(subjectId));
    setPrompt('');
    setIsGenerating(false);
    onClose();
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSubmit();
    }
  };

  return (
    <div className="ai-modal-overlay" onClick={onClose}>
      <div className="ai-modal-container" onClick={(e) => e.stopPropagation()}>
        
        {/* Header */}
        <div className="ai-modal-header">
          <div className="ai-header-left">
            <div className="ai-header-icon">
              <Lightbulb size={24} />
            </div>
            <div>
              <h2 className="ai-modal-title">AI Question Generator</h2>
              <p className="ai-modal-subtitle">Generate questions instantly with AI</p>
            </div>
          </div>
          <button className="ai-close-btn" onClick={onClose}>
            <X size={20} />
          </button>
        </div>

        {/* Body */}
        <div className="ai-modal-body">
          {isGenerating ? (
            /* Robot Animation during generation */
            <div className="ai-generating-container">
              <div className="ai-robot-animation">
                <div className="ai-robot-head">
                  <div className="ai-robot-eyes">
                    <div className="ai-robot-eye left"></div>
                    <div className="ai-robot-eye right"></div>
                  </div>
                  <div className="ai-robot-mouth">
                    <div className="ai-robot-teeth"></div>
                  </div>
                  <div className="ai-robot-antenna">
                    <div className="ai-antenna-signal"></div>
                  </div>
                </div>
                <div className="ai-robot-body">
                  <div className="ai-robot-heart">
                    <Brain size={20} />
                  </div>
                </div>
                <div className="ai-robot-arms">
                  <div className="ai-arm left-arm"></div>
                  <div className="ai-arm right-arm"></div>
                </div>
              </div>
              
              <div className="ai-generating-text">
                <h3>AI is thinking...</h3>
                <p>Generating intelligent questions based on your prompt</p>
                <div className="ai-dots">
                  <span></span>
                  <span></span>
                  <span></span>
                </div>
              </div>

              <div className="ai-facts">
                <Coffee size={14} />
                <span>AI is analyzing the best questions for you</span>
              </div>
            </div>
          ) : (
            <>
              <div className="ai-prompt-container">
                <div className="ai-prompt-label">
                  <Sparkles size={16} />
                  <span>What would you like to generate?</span>
                </div>
                
                <textarea
                  className="ai-prompt-input"
                  placeholder="Example: Generate 5 questions about React Hooks, their benefits, and common use cases..."
                  value={prompt}
                  onChange={(e) => setPrompt(e.target.value)}
                  onKeyPress={handleKeyPress}
                  rows="4"
                  autoFocus
                />
                
                <div className="ai-prompt-hint">
                  <Zap size={12} />
                  <span>Press <kbd>Enter</kbd> to submit, <kbd>Shift + Enter</kbd> for new line</span>
                </div>
              </div>

              {/* Example Prompts */}
              <div className="ai-examples">
                <p className="ai-examples-title">Try these examples:</p>
                <div className="ai-examples-list">
                  <button 
                    className="ai-example-btn"
                    onClick={() => setPrompt("Generate 5 questions about JavaScript promises and async/await")}
                  >
                    JavaScript Promises
                  </button>
                  <button 
                    className="ai-example-btn"
                    onClick={() => setPrompt("Create 3 questions about CSS Grid layout with practical examples")}
                  >
                    CSS Grid Layout
                  </button>
                  <button 
                    className="ai-example-btn"
                    onClick={() => setPrompt("Generate 4 questions about React state management")}
                  >
                    React State Management
                  </button>
                </div>
              </div>
            </>
          )}
        </div>

            <div className="ai-modal-footer">
          <button className="ai-cancel-btn" onClick={onClose} disabled={isGenerating}>
            Cancel
          </button>
          {!isGenerating && (
            <button 
              className="ai-submit-btn" 
              onClick={handleSubmit}
              disabled={!prompt.trim()}
            >
              <Send size={18} />
              Generate Questions
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default AiModal;