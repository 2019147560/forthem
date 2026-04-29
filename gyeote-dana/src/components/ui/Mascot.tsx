interface MascotProps {
  kind?: 'eggplant' | 'apple' | 'watermelon';
  size?: number;
}

export default function Mascot({ kind = 'eggplant', size = 92 }: MascotProps) {
  const w = size, h = size * 1.2;
  if (kind === 'eggplant') {
    return (
      <svg width={w} height={h} viewBox="0 0 80 100">
        <ellipse cx="40" cy="60" rx="28" ry="34" fill="#8b5cf6" />
        <path d="M30 26 Q34 18 40 22 Q46 18 50 26 Q44 24 40 28 Q36 24 30 26 Z" fill="#15803d" />
        <circle cx="32" cy="56" r="3" fill="#1a1a1a" />
        <circle cx="48" cy="56" r="3" fill="#1a1a1a" />
        <circle cx="33" cy="55" r="1" fill="#fff" />
        <circle cx="49" cy="55" r="1" fill="#fff" />
        <ellipse cx="26" cy="64" rx="3" ry="2" fill="#ffb3c1" opacity="0.7" />
        <ellipse cx="54" cy="64" rx="3" ry="2" fill="#ffb3c1" opacity="0.7" />
        <path d="M35 68 Q40 72 45 68" stroke="#1a1a1a" strokeWidth="1.5" fill="none" strokeLinecap="round" />
      </svg>
    );
  }
  if (kind === 'apple') {
    return (
      <svg width={w} height={h} viewBox="0 0 80 100">
        <ellipse cx="40" cy="62" rx="30" ry="30" fill="#ef4444" />
        <path d="M40 32 Q42 24 38 22" stroke="#7c2d12" strokeWidth="2.5" fill="none" strokeLinecap="round" />
        <ellipse cx="46" cy="28" rx="6" ry="3" fill="#15803d" transform="rotate(20 46 28)" />
        <circle cx="32" cy="58" r="3" fill="#1a1a1a" />
        <circle cx="48" cy="58" r="3" fill="#1a1a1a" />
        <circle cx="33" cy="57" r="1" fill="#fff" />
        <circle cx="49" cy="57" r="1" fill="#fff" />
        <ellipse cx="26" cy="66" rx="3" ry="2" fill="#fbbf24" opacity="0.5" />
        <ellipse cx="54" cy="66" rx="3" ry="2" fill="#fbbf24" opacity="0.5" />
        <path d="M34 70 Q40 76 46 70" stroke="#1a1a1a" strokeWidth="1.5" fill="none" strokeLinecap="round" />
      </svg>
    );
  }
  if (kind === 'watermelon') {
    return (
      <svg width={w} height={h} viewBox="0 0 80 100">
        <path d="M14 60 A28 28 0 0 1 66 60 Z" fill="#ec4899" />
        <path d="M14 60 A28 28 0 0 1 66 60" fill="none" stroke="#fff" strokeWidth="3" />
        <path d="M14 60 A28 28 0 0 1 66 60" fill="none" stroke="#15803d" strokeWidth="5" transform="translate(0 5)" />
        <circle cx="28" cy="56" r="1.5" fill="#1a1a1a" />
        <circle cx="40" cy="52" r="1.5" fill="#1a1a1a" />
        <circle cx="52" cy="56" r="1.5" fill="#1a1a1a" />
        <circle cx="32" cy="48" r="2.5" fill="#1a1a1a" />
        <circle cx="48" cy="48" r="2.5" fill="#1a1a1a" />
        <path d="M36 56 Q40 60 44 56" stroke="#1a1a1a" strokeWidth="1.5" fill="none" strokeLinecap="round" />
      </svg>
    );
  }
  return null;
}
