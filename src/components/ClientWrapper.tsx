"use client";

import { useEffect, useState, ReactNode } from "react";
import PageLoader from "./PageLoader";
import { usePathname } from "next/navigation";

export default function ClientWrapper({ children }: { children: ReactNode }) {
  const pathname = usePathname();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    const timer = setTimeout(() => setLoading(false), 3000);
    return () => clearTimeout(timer);
  }, [pathname]);

  return (
    <>
      {loading && <PageLoader />}
      {children}
    </>
  );
}
