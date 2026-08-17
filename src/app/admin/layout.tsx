"use client";

import { useEffect, useState } from "react";
import { useRouter, usePathname } from "next/navigation";
import { AdminAuthProvider, useAdminAuth } from "@/components/admin/admin-auth-provider";
import { AdminSidebar } from "@/components/admin/admin-sidebar";
import { Loader2 } from "lucide-react";

function AdminLayoutInner({ children }: { children: React.ReactNode }) {
  const { user, loading } = useAdminAuth();
  const router = useRouter();
  const pathname = usePathname();
  const [counts, setCounts] = useState<Record<string, number> | undefined>();

  const isLoginRoute = pathname === "/admin/login";

  useEffect(() => {
    if (!loading && !user && !isLoginRoute) {
      router.push("/admin/login");
    }
  }, [user, loading, router, isLoginRoute]);

  useEffect(() => {
    if (!user) return;
    const load = () => {
      fetch("/api/dashboard/stats")
        .then((r) => r.ok ? r.json() : null)
        .then((data) => data && setCounts(data))
        .catch(() => {});
    };
    load();
    // Refresh counts when the window regains focus (e.g. after returning from
    // the public site) so the sidebar badges stay accurate.
    const onFocus = () => load();
    document.addEventListener("visibilitychange", onFocus);
    window.addEventListener("focus", onFocus);
    return () => {
      document.removeEventListener("visibilitychange", onFocus);
      window.removeEventListener("focus", onFocus);
    };
  }, [user]);

  // Login route: no sidebar, no auth required
  if (isLoginRoute) {
    return <>{children}</>;
  }

  if (loading || !user) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-obsidian">
        <Loader2 className="h-8 w-8 animate-spin text-gold" />
      </div>
    );
  }

  return (
     <div className="min-h-screen bg-obsidian">
      <AdminSidebar counts={counts} />
      <main className="min-h-screen p-4 pt-20 lg:ml-64 lg:p-8 lg:pt-8">
        {children}
      </main>
    </div>
  );
}

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return (
    <AdminAuthProvider>
      <AdminLayoutInner>{children}</AdminLayoutInner>
    </AdminAuthProvider>
  );
}
