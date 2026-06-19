"use client";

import { forwardRef, type ComponentPropsWithoutRef, type MouseEvent } from "react";
import { reportWhatsappConversion } from "@/lib/gtag";

type TrackedWhatsAppLinkProps = ComponentPropsWithoutRef<"a"> & {
  href: string;
};

const TrackedWhatsAppLink = forwardRef<HTMLAnchorElement, TrackedWhatsAppLinkProps>(function TrackedWhatsAppLink(
  { href, onClick, target = "_blank", rel = "noopener noreferrer", ...props },
  ref,
) {
  const handleClick = (event: MouseEvent<HTMLAnchorElement>) => {
    reportWhatsappConversion(href);
    event.preventDefault();
    onClick?.(event);
  };

  return <a ref={ref} href={href} target={target} rel={rel} onClick={handleClick} {...props} />;
});

export default TrackedWhatsAppLink;
