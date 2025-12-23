import { supabase } from "@/lib/supabase";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Account() {
  const [user, setUser] = useState<any>(null);
  const navigate = useNavigate();

  useEffect(() => {
    supabase.auth.getUser().then(({ data }) => {
      if (!data.user) {
        navigate("/login");
      } else {
        setUser(data.user);
      }
    });
  }, []);

  async function logout() {
    await supabase.auth.signOut();
    navigate("/");
  }

  if (!user) return null;

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 p-8">
      <h1 className="text-2xl font-bold mb-4">My Account</h1>
      <p className="mb-4">Email: {user.email}</p>

      <button
        onClick={logout}
        className="rounded bg-red-600 px-4 py-2 text-white"
      >
        Log out
      </button>
    </div>
  );
}
