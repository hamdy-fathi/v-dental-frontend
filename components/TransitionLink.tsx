"use client";

import type { MouseEvent, ReactNode } from "react";
import { useViewTransition } from "@/components/hooks/useViewTransition";

type TransitionLinkProps = {
  href: string;
  className?: string;
  children: ReactNode;
  target?: string;
  rel?: string;
  onClick?: (event: MouseEvent<HTMLAnchorElement>) => void;
  ariaLabel?: string;
};

export default function TransitionLink({
  href,
  className,
  children,
  target,
  rel,
  onClick,
  ariaLabel,
}: TransitionLinkProps) {
  const { navigateWithTransition } = useViewTransition();

  const handleClick = (event: MouseEvent<HTMLAnchorElement>) => {
    onClick?.(event);
    if (
      event.defaultPrevented ||
      event.button !== 0 ||
      event.metaKey ||
      event.altKey ||
      event.ctrlKey ||
      event.shiftKey ||
      (target && target !== "_self")
    ) {
      return;
    }

    event.preventDefault();
    navigateWithTransition(href);
  };

  return (
    <a href={href} className={className} onClick={handleClick} target={target} rel={rel} aria-label={ariaLabel}>
      {children}
    </a>
  );
}

