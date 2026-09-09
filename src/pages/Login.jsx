import { useState, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import AuthContext from "../context/AuthContext";
import logo from "../assets/logo.jpg";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const { login } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    try {
      setLoading(true);
      await login(email, password);
      navigate("/dashboard");
    } catch (err) {
      setError(err.response?.data?.message || "Unable to open vault. Check your credentials.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen w-full bg-[#0a0a0a] text-zinc-100 flex flex-col md:flex-row">
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Instrument+Serif:ital@0;1&family=Newsreader:opsz,wght@6..72,300;6..72,400&family=JetBrains+Mono:wght@400&display=swap');
       .font-instrument { font-family: 'Instrument Serif', serif; }
       .font-newsreader { font-family: 'Newsreader', serif; }
       .font-mono { font-family: 'JetBrains Mono', monospace; }
      `}</style>

      {/* LEFT - Quote */}
      <div className="relative flex md:w-[50%] w-full flex-col justify-between bg-black px-8 py-8 md:px-14 md:py-11 min-h- md:min-h-screen overflow-hidden">
        <div className="pointer-events-none absolute inset-0" style={{ background: `radial-gradient(85% 70% at 20% 0%, rgba(232,193,112,0.32) 0%, transparent 72%)` }} />
       <div className="relative z-10 flex items-center gap-2.5">
          <img src={logo} alt="BlogVault" className="h-8 w-8 rounded-full object-cover border border-zinc-800" />
          <span className="font-mono text-xs tracking-[0.18em] text-zinc-300">BLOGVAULT</span>
        </div>
        <div className="relative z-10 flex flex-1 items-center">
          <blockquote className="font-instrument text- md:text- leading-[0.98] text-[#f5f1e8] max-w-">
            <span className="italic">Let the sentences sit</span><br/>
            <span className="italic">in the dark for a season</span><br/>
            <span>and see what survives.</span>
          </blockquote>
        </div>
        <div className="relative z-10">
          <p className="font-mono text-[9.5px] tracking-[0.2em] text-zinc-600 uppercase">Private by default • Sealed forever</p>
        </div>
      </div>

      {/* RIGHT - Form */}
      <div className="flex md:w-[50%] w-full bg-[#101010] items-center justify-center px-6 py-10 md:px-12">
        <div className="w-full max-w-">
          <h1 className="font-instrument text-">Welcome back</h1>
          <p className="font-newsreader text- text-zinc-500 mt-1">Your drafts are exactly where you left them.</p>

          <div className="mt-6 flex gap-2 p-1 bg-[#1a1a1a] rounded-full border border-zinc-800">
            <Link to="/login" className="flex-1 h-8 rounded-full bg-[#262626] text-white text- flex items-center justify-center">Sign In</Link>
            <Link to="/register" className="flex-1 h-8 rounded-full text-zinc-500 text- flex items-center justify-center">Create account</Link>
          </div>

          <form onSubmit={handleSubmit} className="mt-8 space-y-5">
            <div>
              <label className="font-mono text- uppercase tracking-[0.12em] text-zinc-400">Email</label>
              <input value={email} onChange={e=>setEmail(e.target.value)} type="email" placeholder="you@example.com" className="mt-2 h- w-full rounded- border border-zinc-800 bg-[#18181b] px-4 text- outline-none focus:border-[#e8c170]/60" required />
            </div>
            <div>
              <div className="flex justify-between">
                <label className="font-mono text- uppercase tracking-[0.12em] text-zinc-400">Password</label>
                <button type="button" className="font-mono text- text-zinc-600">Forgot?</button>
              </div>
              <div className="relative mt-2">
                <input value={password} onChange={e=>setPassword(e.target.value)} type={showPassword? "text":"password"} placeholder="••••••••" className="h- w-full rounded- border border-zinc-800 bg-[#18181b] px-4 pr-10 text- outline-none focus:border-[#e8c170]/60" required />
                <button type="button" onClick={()=>setShowPassword(!showPassword)} className="absolute right-3 top-1/2 -translate-y-1/2 text-zinc-500 text-">{showPassword? "Hide" : "Show"}</button>
              </div>
            </div>

            {error && <div className="rounded- border border-red-900/40 bg-red-950/30 px-3.5 py-2.5 text- text-red-300">{error}</div>}

            <button type="submit" disabled={loading} className="h- w-full rounded- bg-[#e8c170] text- font-medium text-zinc-900 hover:bg-[#efcf8a] disabled:opacity-60">
              {loading? "Opening vault..." : "Sign In"}
            </button>

            <div className="flex items-center gap-4">
              <div className="h-px flex-1 bg-zinc-800" />
              <span className="font-mono text- tracking-[0.2em] text-zinc-600">OR</span>
              <div className="h-px flex-1 bg-zinc-800" />
            </div>

            <button type="button" className="h- w-full rounded- border border-zinc-800 bg-[#18181b] text- text-zinc-300">Continue with Google</button>

            <p className="text-center font-newsreader text-[13.5px] text-zinc-500">New here? <Link to="/register" className="text-[#e8c170]">Open a vault</Link></p>
          </form>
        </div>
      </div>
    </div>
  );
}