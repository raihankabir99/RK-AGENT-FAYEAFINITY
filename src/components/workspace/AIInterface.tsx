import { useState } from 'react';
import { Send, Sparkles, Terminal, CheckCircle2, ArrowRight, Bot, Cpu, Copy, Check, ChevronDown, Zap } from 'lucide-react';

export const AIInterface = () => {
  const [input, setInput] = useState('');
  const [selectedModel, setSelectedModel] = useState('Claude 3.5 Sonnet');
  const [copiedIdx, setCopiedIdx] = useState<number | null>(null);
  const [messages, setMessages] = useState<Array<{ sender: 'user' | 'agent'; text: string; code?: string; model?: string }>>([
    {
      sender: 'agent',
      text: 'Hello! I am your AI project assistant powered by Claude 3.5 Sonnet & GPT-4o. How can I assist with your code or cloud deployment today?',
      code: 'Status: System connected & architecture verified (0 errors)',
      model: 'Claude 3.5 Sonnet'
    }
  ]);
  const [isTyping, setIsTyping] = useState(false);

  const quickPrompts = [
    'Run Security Scan',
    'Check Database Rules',
    'Publish Preview Site',
    'Optimize Bundle Size'
  ];

  const handleSend = (textToSend?: string) => {
    const text = textToSend || input;
    if (!text.trim()) return;

    const newMsgs = [...messages, { sender: 'user' as const, text }];
    setMessages(newMsgs);
    if (!textToSend) setInput('');
    setIsTyping(true);

    setTimeout(() => {
      let replyText = 'Analyzing project request...';
      let codeSnippet = undefined;

      if (text.toLowerCase().includes('security') || text.toLowerCase().includes('audit')) {
        replyText = 'Security scan complete! No issues found. All 14 security rules passed.';
        codeSnippet = '✓ 14 Security Scans Passed (0.42s)\n✓ Zero P0/P1 vulnerabilities detected';
      } else if (text.toLowerCase().includes('db') || text.toLowerCase().includes('database') || text.toLowerCase().includes('supabase')) {
        replyText = 'Database security policies are active. All tables are protected with RLS.';
        codeSnippet = 'ALTER TABLE users ENABLE ROW LEVEL SECURITY;\nCREATE POLICY "Public read" ON products FOR SELECT USING (true);';
      } else if (text.toLowerCase().includes('publish') || text.toLowerCase().includes('deploy') || text.toLowerCase().includes('vercel')) {
        replyText = 'Publishing your latest updates live to Vercel edge network... Done!';
        codeSnippet = '✓ Production Ready: https://faye-affinity.vercel.app\nLatency: 12ms (Edge Node: LHR1)';
      } else {
        replyText = `Got it! Running "${text}". All project metrics and links have been updated.`;
        codeSnippet = `npm run task -- --cmd="${text}"`;
      }

      setMessages((prev) => [
        ...prev,
        { sender: 'agent' as const, text: replyText, code: codeSnippet, model: selectedModel }
      ]);
      setIsTyping(false);
    }, 850);
  };

  const handleCopy = (code: string, idx: number) => {
    navigator.clipboard.writeText(code);
    setCopiedIdx(idx);
    setTimeout(() => setCopiedIdx(null), 1500);
  };

  return (
    <div className="bg-[#0B0B0E] border border-white/10 hover:border-[#D4AF37]/30 rounded-2xl p-5 flex flex-col h-full shadow-2xl relative overflow-hidden transition-all group">
      {/* Background Accent Gradient */}
      <div className="absolute top-0 right-0 w-44 h-44 bg-gradient-to-br from-[#D4AF37]/10 via-amber-500/5 to-transparent rounded-full blur-3xl pointer-events-none group-hover:scale-110 transition-transform"></div>
      <div className="absolute top-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-[#D4AF37]/40 to-transparent"></div>

      {/* Header */}
      <div className="flex items-center justify-between mb-4 pb-3 border-b border-white/5 relative z-10">
        <div className="flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-xl bg-[#D4AF37]/10 border border-[#D4AF37]/30 flex items-center justify-center text-[#D4AF37] shadow-[0_0_15px_rgba(212,175,55,0.2)]">
            <Bot className="w-4 h-4" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h2 className="text-xs font-mono font-bold tracking-widest text-white uppercase">
                AI ASSISTANT
              </h2>
              <span className="text-[9px] font-mono text-emerald-400 bg-emerald-500/10 border border-emerald-500/20 px-2 py-0.5 rounded-full font-bold flex items-center gap-1">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse"></span>
                ONLINE
              </span>
            </div>
            <div className="flex items-center gap-1.5 mt-0.5">
              <select
                value={selectedModel}
                onChange={(e) => setSelectedModel(e.target.value)}
                className="bg-white/5 text-[9px] font-mono text-[#D4AF37] hover:bg-white/10 border border-white/10 rounded px-1.5 py-0.5 focus:outline-none cursor-pointer"
              >
                <option value="Claude 3.5 Sonnet" className="bg-[#121215] text-white">Claude 3.5 Sonnet</option>
                <option value="GPT-4o" className="bg-[#121215] text-white">GPT-4o</option>
                <option value="Gemini 1.5 Pro" className="bg-[#121215] text-white">Gemini 1.5 Pro</option>
              </select>
            </div>
          </div>
        </div>
      </div>

      {/* Messages Feed */}
      <div className="flex-1 overflow-y-auto custom-scrollbar space-y-3 mb-4 pr-1 min-h-[160px] max-h-[220px]">
        {messages.map((msg, idx) => (
          <div
            key={idx}
            className={`p-3 rounded-xl text-xs font-sans transition-all relative ${
              msg.sender === 'user'
                ? 'bg-[#D4AF37]/10 border border-[#D4AF37]/20 text-white ml-6 shadow-md'
                : 'bg-[#121216] border border-white/5 text-neutral-200 mr-2 shadow-lg'
            }`}
          >
            <div className="flex items-center justify-between mb-1 text-[9px] font-mono text-neutral-500">
              <span className="uppercase flex items-center gap-1 font-bold">
                {msg.sender === 'user' ? (
                  <span className="text-[#D4AF37]">YOU</span>
                ) : (
                  <>
                    <Sparkles className="w-2.5 h-2.5 text-[#D4AF37]" />
                    <span>AI ASSISTANT</span>
                  </>
                )}
              </span>
              {msg.model && (
                <span className="text-neutral-500 bg-white/5 px-1.5 py-0.5 rounded text-[8px]">
                  {msg.model}
                </span>
              )}
            </div>
            <p className="leading-relaxed text-[11px] text-neutral-200">{msg.text}</p>
            {msg.code && (
              <div className="mt-2.5 p-2.5 bg-[#060608] border border-white/10 rounded-lg font-mono text-[10px] text-[#D4AF37] relative group/code">
                <div className="flex items-center justify-between mb-1 pb-1 border-b border-white/5 text-[8px] text-neutral-500 uppercase">
                  <span>TERMINAL OUTPUT</span>
                  <button
                    onClick={() => handleCopy(msg.code!, idx)}
                    className="text-neutral-400 hover:text-[#D4AF37] transition-colors flex items-center gap-1 cursor-pointer"
                  >
                    {copiedIdx === idx ? <Check className="w-3 h-3 text-emerald-400" /> : <Copy className="w-3 h-3" />}
                    <span>{copiedIdx === idx ? 'COPIED' : 'COPY'}</span>
                  </button>
                </div>
                <pre className="whitespace-pre-wrap leading-tight">{msg.code}</pre>
              </div>
            )}
          </div>
        ))}

        {isTyping && (
          <div className="p-3 bg-[#121216] border border-white/5 rounded-xl text-xs text-neutral-400 font-mono animate-pulse flex items-center gap-2">
            <Cpu className="w-3.5 h-3.5 text-[#D4AF37] animate-spin" />
            <span>AI assistant is thinking with {selectedModel}...</span>
          </div>
        )}
      </div>

      {/* Quick Suggestion Tags */}
      <div className="flex items-center gap-1.5 mb-3 overflow-x-auto custom-scrollbar pb-1">
        {quickPrompts.map((prompt, i) => (
          <button
            key={i}
            onClick={() => handleSend(prompt)}
            className="text-[9px] font-mono text-neutral-400 hover:text-[#D4AF37] bg-white/[0.03] hover:bg-[#D4AF37]/10 border border-white/5 hover:border-[#D4AF37]/30 px-2.5 py-1 rounded-lg transition-all whitespace-nowrap cursor-pointer flex items-center gap-1 group/btn"
          >
            <span>{prompt}</span>
            <ArrowRight className="w-2.5 h-2.5 opacity-60 group-hover/btn:translate-x-0.5 transition-transform" />
          </button>
        ))}
      </div>

      {/* Input Field */}
      <form
        onSubmit={(e) => {
          e.preventDefault();
          handleSend();
        }}
        className="relative"
      >
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Ask AI assistant (e.g. 'check security', 'publish site')..."
          className="w-full bg-[#070709] border border-white/10 hover:border-white/20 focus:border-[#D4AF37] rounded-xl pl-3.5 pr-10 py-2.5 text-xs text-white placeholder-neutral-500 focus:outline-none transition-all font-mono shadow-inner"
        />
        <button
          type="submit"
          className="absolute right-1.5 top-1/2 -translate-y-1/2 bg-[#D4AF37] hover:bg-amber-400 p-1.5 rounded-lg text-black transition-all active:scale-95 cursor-pointer shadow-[0_0_10px_rgba(212,175,55,0.3)]"
        >
          <Send className="w-3 h-3" />
        </button>
      </form>
    </div>
  );
};


