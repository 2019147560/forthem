'use client';

import { useState, useEffect } from 'react';
import { REVIEWS } from '@/lib/data';
import Icon from '@/components/ui/Icon';

export default function ReviewStrip() {
  const [i, setI] = useState(0);
  const [show, setShow] = useState(true);

  useEffect(() => {
    const id = setInterval(() => {
      setShow(false);
      setTimeout(() => { setI((x) => (x + 1) % REVIEWS.length); setShow(true); }, 350);
    }, 4500);
    return () => clearInterval(id);
  }, []);

  const r = REVIEWS[i];

  const prev = () => {
    setShow(false);
    setTimeout(() => { setI((x) => (x - 1 + REVIEWS.length) % REVIEWS.length); setShow(true); }, 200);
  };
  const next = () => {
    setShow(false);
    setTimeout(() => { setI((x) => (x + 1) % REVIEWS.length); setShow(true); }, 200);
  };

  return (
    <div className="review-strip">
      <span className="review-strip-label">참여 후기</span>
      <div className="review-strip-text" style={{ opacity: show ? 1 : 0 }}>
        &ldquo;{r.body}&rdquo; — <strong>{r.program}</strong> · {r.handle} · {r.weeks}
      </div>
      <div className="review-strip-nav">
        <button onClick={prev} aria-label="이전"><Icon name="chev-left" size={14} /></button>
        <button onClick={next} aria-label="다음"><Icon name="chev-right" size={14} /></button>
      </div>
    </div>
  );
}
