import React from 'react';
import { Link } from 'react-router-dom';
import { useContext } from 'react';
import AuthContext from '../context/AuthContext';
import logo from '../assets/logo.jpg';

export default function LandingPage() {
  const { isAuthenticated } = useContext(AuthContext) || { isAuthenticated: false };

  return (
    <div className="min-h-screen bg-[#0a0a0a] text-[#f5f3ef] selection:bg-[#e8c170]/30 selection:text-white antialiased relative overflow-hidden">
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Fraunces:opsz,ital,wght@9..144,0..1,100;9..144,0..1,300;9..144,0..1,400;9..144,0..1,500;9..144,1,100;9..144,1,300;9..144,1,400&family=Instrument+Serif:ital@0;1&family=JetBrains+Mono:wght@400;500&family=Newsreader:ital,opsz,wght@0,6..72,300;0,6..72,400;1,6..72,300&display=swap');
       .font-serif-display { font-family: "Instrument Serif", "Fraunces", serif; }
       .font-serif-body { font-family: "Newsreader", serif; }
       .font-mono-stats { font-family: "JetBrains Mono", monospace; }
       .text-balance { text-wrap: balance; }
      `}</style>

      {/* Ambient gold glow */}
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute -top-[30%] -left-[20%] w-[90%] h-[90%] rounded-full opacity-[0.18] blur-"
          style={{ background: 'radial-gradient(ellipse at center, #e8c170 0%, #d4a84b 20%, #a67c2e 45%, transparent 70%)' }}
        />
        <div className="absolute top-[-10%] left-[5%] w-[50%] h-[50%] rounded-full opacity-[0.08] blur-"
          style={{ background: 'radial-gradient(ellipse at center, #fff3d0 0%, transparent 60%)' }}
        />
      </div>

      {/* NAVBAR */}
      <nav className="relative z-20 flex items-center justify-between px-6 md:px-10 lg:px-14 py-6 md:py-7 max-w- mx-auto">
          <div className="flex items-center gap-2">
          <img src={logo} alt="BlogVault" className="w-10 h-10" />
          <span className="font-bold text-xl">BlogVault</span>
        </div>
        <div className="flex items-center gap-10">
          <Link to="/" className="flex items-center gap-2.5">
            {/* <div className="w-7 h-7 rounded- bg-[#f5f3ef] flex items-center justify-center">
              <span className="font-serif-display text- leading-none text-black font-medium">B</span>
            </div>
            <span className="font-serif-display text- tracking-[-0.02em]">BlogVault</span> */}
          </Link>
          <div className="hidden md:flex items-center gap-8 text-[13.5px] text-zinc-400">
            <Link to="/" className="hover:text-[#f5f3ef]">Home</Link>
            <Link to="/vault" className="hover:text-[#f5f3ef]">The Vault</Link>
          </div>
        </div>
        <div className="flex items-center gap-6">
          {!isAuthenticated? (
            <>
              <Link to="/login" className="hidden md:block text-[13.5px] text-zinc-400 hover:text-[#f5f3ef]">Sign In</Link>
              <Link to="/register" className="inline-flex items-center justify-center rounded-full bg-[#e8c170] hover:bg-[#f0d090] text-black text-[13.5px] font-medium px-5 py-2.5">Start Writing</Link>
            </>
          ) : (
            <Link to="/dashboard" className="inline-flex items-center justify-center rounded-full bg-[#e8c170] text-black text-[13.5px] font-medium px-5 py-2.5">Go to Vault →</Link>
          )}
        </div>
      </nav>

      {/* HERO */}
      <header className="relative z-10 max-w- mx-auto px-6 md:px-10 lg:px-14 pt-16 md:pt-28 pb-20 md:pb-28">
        <div className="max-w- mx-auto text-center">
          <div className="inline-flex items-center gap-2 rounded-full border border-zinc-800 bg-zinc-900/60 backdrop-blur px-3.5 py-1.5 mb-8">
            <span className="w-1.5 h-1.5 rounded-full bg-[#e8c170] animate-pulse" />
            <span className="font-mono-stats text- tracking-[0.12em] uppercase text-zinc-400">Permanent • Private by default • Export anytime</span>
          </div>
          <h1 className="font-serif-display text- md:text- lg:text- leading-[0.95] tracking-[-0.03em]">
            <span className="block">A quiet, permanent</span>
            <span className="block italic font-[300] text-[#f5f3ef]/90">home for everything</span>
            <span className="block">you write.</span>
          </h1>
          <p className="font-serif-body text- md:text- leading-[1.6] text-zinc-400 font-light mt-8 max-w- mx-auto text-balance">
            BlogVault is a calm, permanent home for your essays, notes, and half-finished thoughts — designed to outlast the feed and stay truly yours.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-3 mt-10">
            <Link to={isAuthenticated? "/dashboard" : "/register"} className="w-full sm:w-auto inline-flex items-center justify-center rounded-full bg-[#e8c170] hover:bg-[#f0d090] text-black text- font-medium px-7 h- shadow-[0_0_20px_rgba(232,193,112,0.15)]">
              Start your vault <span className="ml-2 text-">→</span>
            </Link>
            {/* <Link to={isAuthenticated? "/vault" : "/login"} className="w-full sm:w-auto inline-flex items-center justify-center rounded-full border border-zinc-800 bg-zinc-900/40 hover:bg-zinc-900 text-[#f5f3ef] text- font-medium px-7 h-">
              {!isAuthenticated && " "}See a sample vault
            </Link> */}
          </div>
        </div>
      </header>

      {/* STATS BAR */}
      <div className="relative z-10 border-y border-zinc-800/80 bg-[#0e0e0e]/80 backdrop-blur max-w- mx-auto">
        <div className="grid grid-cols-2 md:grid-cols-4 divide-x divide-zinc-800/80 divide-y md:divide-y-0">
          {[
            { value: '148', label: 'Writers in residence' },
            { value: '32k', label: 'Words preserved' },
            { value: '9', label: 'Collections' },
            { value: '65 days', label: 'Longest streak' },
          ].map((s) => (
            <div key={s.label} className="px-6 md:px-10 py-7 md:py-8 hover:bg-zinc-900/40 transition-colors">
              <div className="font-serif-display text- md:text- leading-none tracking-[-0.02em]">{s.value}</div>
              <div className="font-mono-stats text- tracking-[0.1em] uppercase text-zinc-500 mt-2.5">{s.label}</div>
            </div>
          ))}
        </div>
      </div>

      {/* BUILT FOR WRITING */}
      <section className="relative z-10 max-w- mx-auto px-6 md:px-10 lg:px-14 py-16 md:py-24">
        <h2 className="font-serif-display text- md:text- tracking-[-0.02em] mb-10">Built for writing that outlives the feed.</h2>
        <div className="grid md:grid-cols-2 gap-px bg-zinc-800 border border-zinc-800 rounded- overflow-hidden">
          {[
            { title: 'Write without an audience', desc: 'No likes, no comments, no algorithmic feeding. Just you and the blank page, preserved forever.' },
            { title: 'Collections, not folders', desc: 'Group essays by theme or time, not files. Your vault evolves as your thinking does.' },
            { title: 'Find any sentence', desc: 'Full-text search across everything you have ever written, including drafts you forgot you had.' },
            { title: 'Sealed for legacy', desc: 'Export as clean Markdown or PDF — a vault that outlasts any platform, for yourself or future readers.' },
          ].map((f, i) => (
            <div key={f.title} className="bg-[#121212] p-8 md:p-9 hover:bg-[#161616] transition-colors">
              <div className="font-mono-stats text- tracking-[0.12em] uppercase text-zinc-500 mb-3">— 0{i+1}</div>
              <h3 className="font-serif-display text- tracking-[-0.01em] mb-2">{f.title}</h3>
              <p className="font-serif-body text- leading-[1.6] text-zinc-400">{f.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* RECENTLY UNSEALED */}
      <section className="relative z-10 max-w- mx-auto px-6 md:px-10 lg:px-14 pb-16 md:pb-20">
        <div className="flex items-center justify-between mb-6">
          <h3 className="font-serif-display text-">Recently unsealed</h3>
          <Link to={isAuthenticated? "/vault" : "/login"} className="font-mono-stats text- tracking-[0.08em] uppercase text-zinc-500 hover:text-white">Browse the vault →</Link>
        </div>
        <div className="border-y border-zinc-800 divide-y divide-zinc-800/60">
          {[
            { date: 'Oct 12', title: 'On keeping a second brain', excerpt: 'We overcomplicate note-taking. What if memory was about returning, not about storing...', tag: 'Essay' },
            { date: 'Oct 08', title: 'The quiet book', excerpt: 'Waking up at 5am is not productivity, it is permission. When the world is still...', tag: 'Notes' },
            { date: 'Oct 04', title: 'Letter to a younger writer', excerpt: 'You will write 100 bad essays. That is the work. The 101st will make it all make sense...', tag: 'Letter' },
            { date: 'Sep 28', title: 'An inventory of small things', excerpt: 'A list of objects that mattered in September. Not for the gram, just for the vault...', tag: 'Collection' },
          ].map((entry) => (
            <Link to={isAuthenticated? "/vault" : "/login"} key={entry.title} className="group flex flex-col md:flex-row md:items-center gap-3 md:gap-6 py-5 hover:bg-zinc-900/40 px-2 -mx-2 transition-colors">
              <span className="font-mono-stats text- text-zinc-600 w- shrink-0">{entry.date}</span>
              <div className="flex-1 min-w-0">
                <div className="font-serif-display text- group-hover:text-[#e8c170] transition-colors truncate flex items-center gap-2">
                  {!isAuthenticated && <span className="text-"></span>} {entry.title}
                </div>
                <div className="font-serif-body text- text-zinc-500 truncate mt-0.5">{entry.excerpt}</div>
              </div>
              <span className="font-mono-stats text- uppercase border border-zinc-800 rounded-full px-2.5 py-1 text-zinc-400 self-start md:self-auto">{entry.tag}</span>
            </Link>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="relative z-10 max-w- mx-auto px-6 md:px-10 lg:px-14 pb-10">
        <div className="relative rounded- border border-zinc-800 bg-gradient-to-b from-[#161616] to-[#0f0f0f] px-6 md:px-10 py-16 md:py-20 text-center overflow-hidden">
          <div className="absolute top-[-20%] left-1/2 -translate-x-1/2 w-[70%] h-[70%] rounded-full opacity-[0.12] blur-" style={{ background: 'radial-gradient(ellipse at center, #e8c170 0%, transparent 70%)' }} />
          <div className="relative">
            <h2 className="font-serif-display text- md:text- leading-[0.95]">Start filling the<br/><span className="italic font-light text-zinc-300">vault tonight.</span></h2>
            <p className="font-serif-body text- text-zinc-400 mt-5 max-w- mx-auto">Free forever for personal use. Export anytime. No lock-in.</p>
            <Link to={isAuthenticated? "/dashboard" : "/register"} className="mt-8 inline-flex items-center justify-center rounded-full bg-[#e8c170] hover:bg-[#f0d090] text-black text- font-medium px-7 h-">
              Create your vault — it's free <span className="ml-2">→</span>
            </Link>
          </div>
        </div>
      </section>

      <footer className="relative z-10 max-w- mx-auto px-6 md:px-10 lg:px-14 py-10 border-t border-zinc-800/80 mt-6">
        <div className="flex justify-between text- font-mono-stats text-zinc-600">
          <span>© {new Date().getFullYear()} BlogVault </span>
          {/* <span className="flex items-center gap-2"><span className="w-1.5 h-1.5 rounded-full bg-emerald-400 inline-block" /> Encrypted at rest</span> */}
        </div>
      </footer>
    </div>
  );
}