import { useContext } from 'react';
import { Navigate } from 'react-router-dom';
import AuthContext from '../context/AuthContext';

export default function PrivateRoute({ children }) {
  const { isAuthenticated } = useContext(AuthContext);

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-[#0a0a0a] text-white flex items-center justify-center p-6">
        <div className="text-center max-w-md border border-zinc-800 rounded- p-10 bg-[#121212]">
          <div className="text- mb-4"></div>
          <h2 className="font-serif text-">Vault is locked</h2>
          <p className="font-mono text- text-zinc-500 mt-2">Please sign in to open your sealed writings.</p>
          <a href="/login" className="mt-6 inline-block bg-[#e8c170] text-black px-6 py-2 rounded-full text-">Sign In to Unlock →</a>
        </div>
      </div>
    );
  }
  return children;
}