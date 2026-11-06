import React, { useState } from 'react';
import {
  X,
  Save,
  RotateCcw,
  Copy,
  Check,
  FileText,
  HelpCircle,
  Heart,
  Sliders,
  Code,
} from 'lucide-react';
import {
  SiteContentConfig,
  saveContentToStorage,
  resetContentToDefault,
} from '../data/romanticContent';
import { romanticAudio } from '../utils/soundEffects';

interface Props {
  isOpen: boolean;
  onClose: () => void;
  currentContent: SiteContentConfig;
  onSave: (newContent: SiteContentConfig) => void;
}

export const ContentEditorModal: React.FC<Props> = ({
  isOpen,
  onClose,
  currentContent,
  onSave,
}) => {
  const [activeTab, setActiveTab] = useState<'quiz' | 'letter' | 'rawJson'>('quiz');
  const [formData, setFormData] = useState<SiteContentConfig>(currentContent);
  const [jsonText, setJsonText] = useState<string>(JSON.stringify(currentContent, null, 2));
  const [copied, setCopied] = useState<boolean>(false);
  const [statusMsg, setStatusMsg] = useState<string | null>(null);

  if (!isOpen) return null;

  const handleSaveAll = () => {
    let toSave = formData;
    if (activeTab === 'rawJson') {
      try {
        toSave = JSON.parse(jsonText);
      } catch {
        setStatusMsg('Invalid JSON format! Please check syntax.');
        return;
      }
    }
    saveContentToStorage(toSave);
    onSave(toSave);
    setStatusMsg('Saved successfully to browser storage! ❤️');
    romanticAudio.playSuccess();
    setTimeout(() => setStatusMsg(null), 3000);
  };

  const handleReset = () => {
    if (window.confirm('Reset all content back to original defaults?')) {
      const def = resetContentToDefault();
      setFormData(def);
      setJsonText(JSON.stringify(def, null, 2));
      onSave(def);
      setStatusMsg('Reset to defaults successfully.');
      romanticAudio.playSparkle();
    }
  };

  const handleCopyJson = () => {
    navigator.clipboard.writeText(JSON.stringify(formData, null, 2));
    setCopied(true);
    romanticAudio.playSparkle();
    setTimeout(() => setCopied(false), 2000);
  };

  const handleQuizChange = (
    index: number,
    field: 'question' | 'feedback' | 'wrongHint',
    val: string
  ) => {
    const updated = [...formData.loveQuiz.questions];
    updated[index] = { ...updated[index], [field]: val };
    const newForm = {
      ...formData,
      loveQuiz: { ...formData.loveQuiz, questions: updated },
    };
    setFormData(newForm);
    setJsonText(JSON.stringify(newForm, null, 2));
  };

  const handleQuizOptionChange = (
    qIndex: number,
    optIndex: number,
    val: string
  ) => {
    const updated = [...formData.loveQuiz.questions];
    const newOpts = [...updated[qIndex].options];
    newOpts[optIndex] = val;
    updated[qIndex] = { ...updated[qIndex], options: newOpts };
    const newForm = {
      ...formData,
      loveQuiz: { ...formData.loveQuiz, questions: updated },
    };
    setFormData(newForm);
    setJsonText(JSON.stringify(newForm, null, 2));
  };

  const handleCorrectAnswerChange = (qIndex: number, correctIdx: number) => {
    const updated = [...formData.loveQuiz.questions];
    updated[qIndex] = { ...updated[qIndex], correctAnswerIndex: correctIdx };
    const newForm = {
      ...formData,
      loveQuiz: { ...formData.loveQuiz, questions: updated },
    };
    setFormData(newForm);
    setJsonText(JSON.stringify(newForm, null, 2));
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/90 backdrop-blur-md flex items-center justify-center p-3 sm:p-6 overflow-hidden">
      <div className="bg-[#14060d] border border-rose-500/30 rounded-3xl w-full max-w-4xl max-h-[90vh] flex flex-col shadow-2xl overflow-hidden">
        {/* Top Header */}
        <div className="p-4 sm:p-6 border-b border-rose-500/20 flex items-center justify-between bg-black/40">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-rose-600/30 border border-rose-500/40 flex items-center justify-center text-rose-300">
              <Sliders className="w-5 h-5" />
            </div>
            <div className="text-left">
              <h3 className="text-lg font-serif-luxury font-bold text-white">
                Customize SowRam Content & Specification
              </h3>
              <p className="text-xs text-rose-200/70">
                Easily modify quiz questions, Truth/Dare prompts, and the love letter anytime!
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-2 rounded-full text-rose-200/70 hover:text-white hover:bg-white/10 transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Tab Navigation */}
        <div className="flex items-center gap-1 p-2 bg-black/60 border-b border-rose-500/10 overflow-x-auto">
          {[
            { id: 'quiz', label: '15 Quiz Questions', icon: HelpCircle },
            { id: 'letter', label: 'Love Letter', icon: FileText },
            { id: 'rawJson', label: 'Paste / Export JSON', icon: Code },
          ].map((tab) => {
            const Icon = tab.icon;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as typeof activeTab)}
                className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold whitespace-nowrap transition-all cursor-pointer ${
                  activeTab === tab.id
                    ? 'bg-rose-600 text-white shadow-md'
                    : 'text-rose-200/70 hover:text-white hover:bg-white/5'
                }`}
              >
                <Icon className="w-4 h-4" />
                <span>{tab.label}</span>
              </button>
            );
          })}
        </div>

        {/* Content Area */}
        <div className="flex-1 overflow-y-auto p-4 sm:p-6 space-y-6 text-left">
          {/* TAB 1: QUIZ QUESTIONS */}
          {activeTab === 'quiz' && (
            <div className="space-y-6">
              <p className="text-xs sm:text-sm text-rose-200/80 bg-rose-950/40 p-3 rounded-xl border border-rose-500/20">
                💡 Sowmiyaa, you can customize all 15 questions, answer options, and select the correct answer below. Changes take effect as soon as you hit Save!
              </p>

              {formData.loveQuiz.questions.map((q, idx) => (
                <div
                  key={q.id}
                  className="p-4 sm:p-5 rounded-2xl bg-black/40 border border-white/10 space-y-3"
                >
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-mono font-bold text-emerald-400">
                      Question #{idx + 1}
                    </span>
                    <span className="text-[11px] text-amber-300">
                      Select radio to pick correct answer
                    </span>
                  </div>

                  <div>
                    <label className="text-xs text-rose-200/80 block mb-1">
                      Question Text:
                    </label>
                    <input
                      type="text"
                      value={q.question}
                      onChange={(e) => handleQuizChange(idx, 'question', e.target.value)}
                      className="w-full px-3 py-2 rounded-xl bg-white/5 border border-white/15 text-white text-sm focus:border-rose-400 focus:outline-hidden"
                    />
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 pt-2">
                    {q.options.map((opt, oIdx) => (
                      <div
                        key={oIdx}
                        className={`flex items-center gap-2 p-2 rounded-xl border transition-all ${
                          q.correctAnswerIndex === oIdx
                            ? 'bg-emerald-950/50 border-emerald-500'
                            : 'bg-white/5 border-white/10'
                        }`}
                      >
                        <input
                          type="radio"
                          name={`correct_q_${q.id}`}
                          checked={q.correctAnswerIndex === oIdx}
                          onChange={() => handleCorrectAnswerChange(idx, oIdx)}
                          className="accent-emerald-500 cursor-pointer"
                        />
                        <input
                          type="text"
                          value={opt}
                          onChange={(e) =>
                            handleQuizOptionChange(idx, oIdx, e.target.value)
                          }
                          className="flex-1 bg-transparent text-xs text-white focus:outline-hidden"
                        />
                      </div>
                    ))}
                  </div>

                  <div>
                    <label className="text-xs text-rose-200/80 block mb-1">
                      Personalized Feedback Note:
                    </label>
                    <input
                      type="text"
                      value={q.feedback}
                      onChange={(e) => handleQuizChange(idx, 'feedback', e.target.value)}
                      className="w-full px-3 py-2 rounded-xl bg-white/5 border border-white/10 text-rose-200 text-xs focus:border-rose-400 focus:outline-hidden"
                    />
                  </div>

                  <div>
                    <label className="text-xs text-rose-200/80 block mb-1">
                      Funny Hint on Wrong Guess:
                    </label>
                    <input
                      type="text"
                      value={q.wrongHint}
                      onChange={(e) => handleQuizChange(idx, 'wrongHint', e.target.value)}
                      className="w-full px-3 py-2 rounded-xl bg-white/5 border border-white/10 text-amber-200 text-xs focus:border-rose-400 focus:outline-hidden"
                    />
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* TAB 2: LOVE LETTER */}
          {activeTab === 'letter' && (
            <div className="space-y-4">
              <div>
                <label className="text-xs text-rose-200 block mb-1">Letter Salutation:</label>
                <input
                  type="text"
                  value={formData.loveLetter.salutation}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      loveLetter: { ...formData.loveLetter, salutation: e.target.value },
                    })
                  }
                  className="w-full px-3 py-2 rounded-xl bg-white/5 border border-white/15 text-white text-sm focus:outline-hidden"
                />
              </div>

              <div>
                <label className="text-xs text-rose-200 block mb-1">Letter Paragraphs:</label>
                {formData.loveLetter.paragraphs.map((p, pIdx) => (
                  <textarea
                    key={pIdx}
                    rows={3}
                    value={p}
                    onChange={(e) => {
                      const newParas = [...formData.loveLetter.paragraphs];
                      newParas[pIdx] = e.target.value;
                      setFormData({
                        ...formData,
                        loveLetter: { ...formData.loveLetter, paragraphs: newParas },
                      });
                    }}
                    className="w-full px-3 py-2 rounded-xl bg-white/5 border border-white/15 text-rose-100 text-sm mb-2 focus:outline-hidden"
                  />
                ))}
              </div>

              <div>
                <label className="text-xs text-rose-200 block mb-1">Letter Sign-off:</label>
                <input
                  type="text"
                  value={formData.loveLetter.signOff}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      loveLetter: { ...formData.loveLetter, signOff: e.target.value },
                    })
                  }
                  className="w-full px-3 py-2 rounded-xl bg-white/5 border border-white/15 text-white text-sm focus:outline-hidden"
                />
              </div>
            </div>
          )}

          {/* TAB 4: RAW JSON / EXPORT / IMPORT */}
          {activeTab === 'rawJson' && (
            <div className="space-y-3">
              <p className="text-xs text-rose-200/80">
                You can copy this JSON to backup your configuration, or paste your exact full specification JSON here and click Save!
              </p>
              <textarea
                rows={14}
                value={jsonText}
                onChange={(e) => setJsonText(e.target.value)}
                className="w-full font-mono text-xs p-3 rounded-xl bg-black/80 border border-white/20 text-emerald-300 focus:outline-hidden"
              />
            </div>
          )}
        </div>

        {/* Bottom Actions Bar */}
        <div className="p-4 sm:p-6 border-t border-rose-500/20 flex flex-wrap items-center justify-between gap-3 bg-black/40">
          <div className="flex items-center gap-2">
            <button
              onClick={handleReset}
              className="flex items-center gap-1.5 px-4 py-2 rounded-full text-xs text-rose-300 hover:text-white bg-white/5 hover:bg-white/10 transition-colors cursor-pointer"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span>Reset Defaults</span>
            </button>

            <button
              onClick={handleCopyJson}
              className="flex items-center gap-1.5 px-4 py-2 rounded-full text-xs text-amber-300 hover:text-white bg-amber-950/40 border border-amber-400/20 hover:bg-amber-900/40 transition-colors cursor-pointer"
            >
              {copied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
              <span>{copied ? 'Copied JSON!' : 'Copy Config'}</span>
            </button>
          </div>

          <div className="flex items-center gap-3">
            {statusMsg && (
              <span className="text-xs text-emerald-400 font-medium animate-pulse">
                {statusMsg}
              </span>
            )}

            <button
              onClick={handleSaveAll}
              className="flex items-center gap-2 px-6 py-2.5 rounded-full bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 text-white text-xs sm:text-sm font-bold shadow-lg shadow-emerald-950 transition-all cursor-pointer border border-emerald-400/30"
            >
              <Save className="w-4 h-4" />
              <span>Save Changes</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
