import { useState } from "react";
import { supabase } from "@/lib/supabase";
import { useNavigate } from "react-router-dom";

export default function Login() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isSignup, setIsSignup] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError(null);

    const result = isSignup
      ? await supabase.auth.signUp({ email, password })
      : await supabase.auth.signInWithPassword({ email, password });

    if (result.error) {
      setError(result.error.message);
    } else {
      navigate("/");
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-950">
      <form
        onSubmit={handleSubmit}
        className="w-full max-w-sm rounded-lg border border-slate-700 bg-slate-900 p-6"
      >
        <h1 className="text-2xl font-bold text-slate-100 mb-4">
          {isSignup ? "Create Account" : "Sign In"}
        </h1>

        {error && (
          <p className="mb-3 text-sm text-red-400">{error}</p>
        )}

        <input
          type="email"
          placeholder="Email"
          required
          className="mb-3 w-full rounded bg-slate-800 border border-slate-600 p-2 text-slate-100"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <input
          type="password"
          placeholder="Password"
          required
          className="mb-4 w-full rounded bg-slate-800 border border-slate-600 p-2 text-slate-100"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        <button
          type="submit"
          className="w-full rounded bg-gradient-to-r from-purple-600 to-pink-600 py-2 text-white font-semibold"
        >
          {isSignup ? "Sign Up" : "Sign In"}
        </button>

        <p className="mt-4 text-sm text-slate-400">
          {isSignup ? "Already have an account?" : "No account yet?"}{" "}
          <button
            type="button"
            onClick={() => setIsSignup(!isSignup)}
            className="text-purple-400 hover:underline"
          >
            {isSignup ? "Sign in" : "Create one"}
          </button>
        </p>
      </form>
    </div>
  );
}
