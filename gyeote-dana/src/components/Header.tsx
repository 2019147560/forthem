'use client';

import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import Icon from '@/components/ui/Icon';

const TABS = [
  { id: 'home', label: '지원사업 검색', href: '/' },
  { id: 'support', label: '제도 안내', href: '/support' },
  { id: 'my', label: '내 신청 현황', href: '/my' },
  { id: 'community', label: '참여 후기', href: '#', dim: true },
  { id: 'notice', label: '공지·알림', href: '#', dim: true },
];

export default function Header() {
  const pathname = usePathname();
  const router = useRouter();

  const activeTab =
    pathname === '/' ? 'home' :
    pathname.startsWith('/support') ? 'support' :
    pathname.startsWith('/my') ? 'my' : 'home';

  return (
    <>
      <div className="utility">
        <div className="shell utility-row">
          <div className="utility-left">
            <span>은둔·고립청년 통합 정보 플랫폼</span>
            <span className="sep" />
            <span>운영시간 평일 10:00–18:00</span>
          </div>
          <div className="utility-right">
            <a href="#">도움말</a>
            <span className="sep" />
            <a href="#">1:1 문의</a>
            <span className="sep" />
            <a href="#">로그인</a>
            <span className="sep" />
            <a href="#">회원가입</a>
          </div>
        </div>
      </div>
      <header className="hdr">
        <div className="shell hdr-row">
          <div className="brand">
            <Link href="/" className="brand-logo">
              곁에<span className="accent">·</span>다나
            </Link>
            <div className="brand-sub">은둔·고립청년<br />지원사업 모음</div>
          </div>
          <nav className="tabs">
            {TABS.map((t) => (
              <Link
                key={t.id}
                href={t.dim ? '#' : t.href}
                className={`tab${activeTab === t.id ? ' active' : ''}`}
                style={t.dim ? { opacity: 0.55, cursor: 'default', pointerEvents: 'none' } : undefined}
              >
                {t.label}
              </Link>
            ))}
          </nav>
          <div className="hdr-actions">
            <button className="icon-btn" aria-label="검색"><Icon name="search" size={18} /></button>
            <button className="icon-btn" aria-label="알림"><Icon name="bell" size={18} /></button>
            <button className="avatar" onClick={() => router.push('/my')}>지</button>
          </div>
        </div>
      </header>
    </>
  );
}
