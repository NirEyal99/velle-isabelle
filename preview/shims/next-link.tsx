"use client";

import { forwardRef } from "react";
import { parseHref, pathToToken, useRouterState } from "../router";

type Props = React.AnchorHTMLAttributes<HTMLAnchorElement> & { href: string; prefetch?: boolean; scroll?: boolean };

/** Stand-in for next/link in the preview: in-site links switch pages without leaving the preview. */
const Link = forwardRef<HTMLAnchorElement, Props>(function Link({ href, onClick, prefetch: _p, scroll: _s, ...rest }, ref) {
  const { location, navigate } = useRouterState();
  const internal = href.startsWith("/");
  return (
    <a
      ref={ref}
      href={internal ? `#${pathToToken(parseHref(href, location).path)}` : href}
      onClick={(e) => {
        onClick?.(e);
        if (!internal || e.defaultPrevented || e.metaKey || e.ctrlKey || e.shiftKey) return;
        e.preventDefault();
        navigate(href);
      }}
      {...rest}
    />
  );
});

export default Link;
