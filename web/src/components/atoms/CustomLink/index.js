import React, { useEffect, useRef } from 'react';

function CustomLink({
  onClick, tabIndex, children, href, className,
}) {
  const link = useRef();

  useEffect(() => {
    link.current.onkeypress = (e) => {
      e.preventDefault();
      e.stopPropagation();
      if (e.which === 13) {
        onClick();
      }
    };
  }, [link, onClick]);

  return (
    <a ref={link} className={className} tabIndex={tabIndex} href={href} onClick={onClick}>
      {children}
    </a>
  );
}

export default CustomLink;
