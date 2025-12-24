import { Navigate, useLocation } from "react-router-dom";
import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";

type RequireAdminProps = {
  children: JSX.Element;
};

export default function RequireAdmin({ children }: RequireAdminProps) {
  const location = useLocation();
  const [loading, setLoading] = useState(true);
  const [isAdmin, setIsAdmin] = useState<boolean | null>(null);

  useEffect(() => {
    let isMounted = true;

    const checkAdmin = async () => {
      const {
        data: { user },
      } = await supabase.auth.getUser();

      if (!user) {
        if (isMounted) {
          setIsAdmin(false);
          setLoading(false);
        }
        return;
      }

      const { data, error } = await supabase
        .from("profiles")
        .select("role")
        .eq("id", user.id)
        .single();

      if (isMounted) {
        setIsAdmin(!error && data?.role === "admin");
        setLoading(false);
      }
    };

    checkAdmin();

    return () => {
      isMounted = false;
    };
  }, []);

  if (loading) {
    return null; // later we can replace
