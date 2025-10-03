"use client";

import React, { useCallback, useEffect, useState } from "react";
import styled from "styled-components";

const BackToTop: React.FC = () => {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    let ticking = false;

    const onScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          const doc = document.documentElement;
          const viewportBottom = (typeof window !== "undefined" ? window.scrollY + window.innerHeight : 0);
          const threshold = 80; // show when within 80px of the bottom
          const shouldShow = viewportBottom >= (doc.scrollHeight - threshold);
          setVisible(shouldShow);
          ticking = false;
        });
        ticking = true;
      }
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll, { passive: true });
    onScroll();

    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, []);

  const scrollToTop = useCallback(() => {
    try {
      window.scrollTo({ top: 0, behavior: "smooth" });
    } catch (_) {
      window.scrollTo(0, 0);
    }
  }, []);

  return (
    <StyledWrapper $visible={visible}>
      <button className="button" onClick={scrollToTop} aria-label="Back to top" title="Back to Top">
        <svg viewBox="0 0 384 512" className="svgIcon" aria-hidden="true" focusable="false">
          <path d="M214.6 41.4c-12.5-12.5-32.8-12.5-45.3 0l-160 160c-12.5 12.5-12.5 32.8 0 45.3s32.8 12.5 45.3 0L160 141.2V448c0 17.7 14.3 32 32 32s32-14.3 32-32V141.2L329.4 246.6c12.5 12.5 32.8 12.5 45.3 0s12.5-32.8 0-45.3l-160-160z" />
        </svg>
      </button>
    </StyledWrapper>
  );
};

const StyledWrapper = styled.div<{ $visible: boolean }>`
  position: fixed;
  left: 50%; /* center horizontally */
  right: auto;
  bottom: 3rem; /* 48px */
  z-index: 50;
  opacity: ${(p) => (p.$visible ? 1 : 0)};
  transform: translate(-50%, ${(p) => (p.$visible ? "0" : "10px")});
  pointer-events: ${(p) => (p.$visible ? "auto" : "none")};
  transition: opacity 0.3s ease, transform 0.3s ease;

  .button {
    width: 50px;
    height: 50px;
    border-radius: 50%;
    background-color: rgb(20, 20, 20);
    border: none;
    font-weight: 600;
    display: flex;
    align-items: center;
    justify-content: center;
    box-shadow: 0px 0px 0px 4px rgba(180, 160, 255, 0.253);
    cursor: pointer;
    transition-duration: 0.3s;
    overflow: hidden;
    position: relative;
  }

  .svgIcon {
    width: 12px;
    transition-duration: 0.3s;
  }

  .svgIcon path {
    fill: white;
  }

  .button:hover {
    width: 140px;
    border-radius: 50px;
    transition-duration: 0.3s;
    background-color: rgb(181, 160, 255);
    align-items: center;
  }

  .button:hover .svgIcon {
    transition-duration: 0.3s;
    transform: translateY(-200%);
  }

  .button::before {
    position: absolute;
    bottom: -20px;
    content: "Back to Top";
    color: white;
    font-size: 0px;
  }

  .button:hover::before {
    font-size: 13px;
    opacity: 1;
    bottom: unset;
    transition-duration: 0.3s;
  }
`;

export default BackToTop;
