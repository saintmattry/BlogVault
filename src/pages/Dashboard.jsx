import { useState, useEffect, useContext } from "react";
import API from "../api/api.js";
import AuthContext from "../context/AuthContext";
import logo from "../assets/logo.jpg";
import { RiMenuLine } from "react-icons/ri";

export default function Dashboard() {
  const { user, logout } = useContext(AuthContext);
  const [blogs, setBlogs] = useState([]);
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        const res = await API.get("/api/blogs");
        setBlogs(res.data);
      } catch (err) {
        console.log("API offline, using demo");
      } finally {
        setLoading(false);
      }
    };
    fetchBlogs();
  }, []);

  const handleCreate = async (e) => {
    e.preventDefault();
    try {
      const res = await API.post("/api/blogs", { title, content });
      setBlogs([res.data,...blogs]);
      setTitle(""); setContent("");
    } catch (err) {
      alert(err.response?.data?.message || "Create failed - check if logged in");
    }
  };

  const handleDelete = async (id) => {
    try {
      await API.delete(`/api/blogs/${id}`);
      setBlogs(blogs.filter(b => b._id!== id));
    } catch (err) {
      alert(err.response?.data?.message || "Delete failed");
    }
  };

  const filtered = blogs.filter(b =>
    b.title?.toLowerCase().includes(search.toLowerCase()) ||
    b.content?.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-[#0a0a0a] text-[#f5f3ef] relative">
      <style>{`@import url('https://fonts.googleapis.com/css2?family=Instrument+Serif:ital@0;1&family=Newsreader:wght@300;400&family=JetBrains+Mono:wght@400&display=swap');
    .font-serif { font-family: 'Instrument Serif', serif; }.font-body { font-family: 'Newsreader', serif; }.font-mono { font-family: 'JetBrains Mono', monospace; }`}</style>

      <div className="absolute top-0 left-0 w-[60%] h-[40%] rounded-full opacity-[0.12] blur- pointer-events-none" style={{ background: 'radial-gradient(ellipse, #e8c170, transparent 70%)' }} />

      {/* NAV */}
      <nav className="relative z-20 flex items-center justify-between px-6 md:px-14 py-6 border-b border-zinc-800/80 max-w- mx-auto">
       <div className="flex items-center gap-6">
        <div className="flex items-center gap-3">
            <img src={logo} alt="BlogVault" className="w-8 h-8 rounded-full object-cover border border-zinc-800" />
            <span className="font-serif text-xl">BlogVault</span>
        </div>
          <span className="font-mono text-xs tracking-[0.2em] text-zinc-600 uppercase hidden md:block">• Sealed Forever</span>
        </div>
        <div className="flex items-center gap-3">
          {/* Desktop search */}
          <div className="hidden md:flex items-center gap-2 rounded-full border border-zinc-800 bg-[#121212] px-4 h-9">
            <span className="text-zinc-500 text-sm">⌕</span>
            <input value={search} onChange={e=>setSearch(e.target.value)} placeholder="Find any sentence..." className="bg-transparent outline-none text-sm w-40 placeholder:text-zinc-600" />
          </div>

          {/* User + Hamburger */}
            <div className="relative flex items-center gap-2">
              <span className="font-mono text-xs md:text-sm text-zinc-100 truncate max-w- md:max-w-none">
                {user?.name || user?.email}
              </span>

              {/* Desktop Logout */}
              <button onClick={logout} className="hidden md:block text-xs font-mono border border-zinc-800 rounded-full px-3 py-1.5 hover:bg-zinc-900">
                Logout
              </button>

              {/* Mobile Hamburger with RiMenuLine */}
              <button
                onClick={()=>setMenuOpen(!menuOpen)}
                className="md:hidden w-9 h-9 flex items-center justify-center border border-zinc-800 rounded-full bg-[#121212] text-zinc-300"
              >
                <RiMenuLine size={18} />
              </button>

              {menuOpen && (
                <div className="absolute top-10 right-0 w-40 bg-[#121212] border border-zinc-800 rounded-xl p-2 md:hidden shadow-xl z-30">
                  <button onClick={logout} className="w-full text-left px-3 py-2 text-sm font-mono text-zinc-300 hover:bg-zinc-900 rounded-lg">Logout</button>
                </div>
              )}
            </div>
        </div>
      </nav>

      <div className="relative z-10 max-w- mx-auto px-6 md:px-14 py-8 md:py-12 grid md:grid-cols-[280px_1fr] gap-8">
        {/* SIDEBAR */}
        <aside className="space-y-8">
          {/* Mobile Search on top of Collections */}
          <div className="md:hidden">
            <div className="flex items-center gap-2 rounded-full border border-zinc-800 bg-[#121212] px-4 h-10">
              <span className="text-zinc-500 text-sm">⌕</span>
              <input value={search} onChange={e=>setSearch(e.target.value)} placeholder="Find any sentence..." className="bg-transparent outline-none text-sm w-full placeholder:text-zinc-600" />
            </div>
          </div>

          <div>
            <div className="font-mono text-xs uppercase tracking-[0.15em] text-zinc-500 mb-3">Collections</div>
            <div className="space-y-1">
              {[
                { name: 'All entries', count: blogs.length },
                { name: 'Essays', count: 0 },
                { name: 'Notes', count: 0 },
              ].map(c => (
                <div key={c.name} className="flex justify-between items-center px-3 py-2 rounded-lg bg-[#121212] border border-zinc-800 text-sm">
                  <span>{c.name}</span><span className="font-mono text-xs text-zinc-600">{c.count}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="rounded-xl border border-zinc-800 bg-[#121212] p-4">
            <div className="font-mono text-xs uppercase text-zinc-500 mb-2">Create New Entry</div>
            <form onSubmit={handleCreate} className="space-y-3">
              <input value={title} onChange={e=>setTitle(e.target.value)} placeholder="Title - what is this about?" className="w-full rounded-lg bg-black border border-zinc-800 px-3 py-2 text-sm outline-none focus:border-[#e8c170]/40" required />
              <textarea value={content} onChange={e=>setContent(e.target.value)} placeholder="Begin. The vault is listening..." rows={5} className="w-full rounded-lg bg-black border border-zinc-800 px-3 py-2 text-sm outline-none focus:border-[#e8c170]/40 resize-none" required />
              <button type="submit" className="w-full h-9 rounded-full bg-[#e8c170] text-black text-sm font-medium">Seal Entry </button>
            </form>
          </div>

          <div className="rounded-xl border border-zinc-800 bg-[#121212] p-4">
            <div className="font-mono text-xs uppercase text-zinc-500">Streak</div>
            <div className="font-serif text-lg mt-1">65 days</div>
            <div className="font-mono text-xs text-zinc-600 mt-1">Longest writing streak</div>
          </div>
        </aside>

        {/* MAIN */}
        <main>
          <div className="flex items-center justify-between mb-6">
            <h1 className="font-serif text-xl">Your vault • {filtered.length} writings</h1>
            <span className="font-mono text-xs text-zinc-600">{loading? "Syncing..." : "Encrypted at rest"}</span>
          </div>

          {filtered.length === 0? (
            <div className="border border-dashed border-zinc-800 rounded-xl p-12 text-center">
              <div className="font-serif text-lg">Vault is empty</div>
              <p className="font-mono text-xs text-zinc-500 mt-2">Create your first sealed entry on the left.</p>
            </div>
          ) : (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-px bg-zinc-800 border border-zinc-800 rounded-xl overflow-hidden">
              {filtered.map(blog => (
                <div key={blog._id} className="bg-[#121212] p-6 hover:bg-[#161616] transition-colors group relative">
                  <div className="flex justify-between items-start">
                    <span className="font-mono text- uppercase border border-zinc-800 rounded-full px-2 py-0.5 text-zinc-500">{new Date(blog.createdAt || Date.now()).toLocaleDateString()}</span>
                    <button onClick={()=>handleDelete(blog._id)} className="opacity-0 group-hover:opacity-100 text-zinc-600 hover:text-red-400 text-xs">✕</button>
                  </div>
                  <h3 className="font-serif text-lg mt-4 leading-[1.2] group-hover:text-[#e8c170] transition-colors">{blog.title}</h3>
                  <p className="font-body text-sm text-zinc-500 mt-2 line-clamp-3 leading-[1.5]">{blog.content}</p>
                  <div className="flex items-center gap-2 mt-4">
                    <span className="font-mono text-xs text-zinc-600">{blog.content?.split(' ').length || 0} words • Private</span>
                  </div>
                </div>
              ))}
            </div>
          )}
        </main>
      </div>
    </div>
  );
}