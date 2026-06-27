"use client";

import Link from "next/link";
import React from "react";
import { useRouter } from "next/navigation";

interface SmoothScrollLinkProps extends React.ComponentProps<typeof Link> {
  targetId: string;
}

export default function SmoothScrollLink({
  targetId,
  children,
  ...props
}: SmoothScrollLinkProps) {
  const router = useRouter();

  const handleClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    // We only intercept if it's an anchor link starting with #
    const el = document.getElementById(targetId);
    if (el) {
      e.preventDefault();
      el.scrollIntoView({ behavior: "smooth" });
      // Update URL without causing a full page refresh and bypassing Next.js router jump
      router.push(`#${targetId}`, { scroll: false });
    }
  };

  return (
    <Link {...props} onClick={handleClick}>
      {children}
    </Link>
  );
}
