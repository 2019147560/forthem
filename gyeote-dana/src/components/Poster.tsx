import { Program } from '@/types';

interface PosterProps {
  p: Program;
  color: string;
}

export default function Poster({ p, color }: PosterProps) {
  const daysLeft = Math.max(1, Math.round(
    (new Date(p.deadline.replace(/\./g, '-')).getTime() - Date.now()) / 86400000
  ));

  return (
    <div className={`poster ${color}`}>
      <svg className="poster-deco" viewBox="0 0 280 220" preserveAspectRatio="none">
        <circle cx="240" cy="180" r="60" fill="rgba(0,0,0,0.06)" />
        <circle cx="40" cy="40" r="22" fill="rgba(255,255,255,0.45)" />
        <path d="M 0 200 Q 70 170 140 200 T 280 200 L 280 220 L 0 220 Z" fill="rgba(255,255,255,0.35)" />
        <text x="246" y="60" fontSize="22" fontWeight="900" fill="rgba(0,0,0,0.08)" transform="rotate(-12 246 60)">★</text>
      </svg>
      <div>
        <div className="poster-eyebrow">{p.tag}</div>
        <div className="poster-headline" style={{ marginTop: 6 }}>{p.title}</div>
      </div>
      <div className="poster-foot">
        <span>{p.org}</span>
        <span className="badge-recruit">참여자 모집</span>
      </div>
      {p.status === '현재 신청 가능' && <span className="poster-stamp brand">D-{daysLeft}</span>}
      {p.status === '모집 예정' && <span className="poster-stamp">곧 오픈</span>}
      {p.status === '마감' && <span className="poster-stamp" style={{ background: '#1a1a1a', color: '#fff' }}>마감</span>}
    </div>
  );
}
