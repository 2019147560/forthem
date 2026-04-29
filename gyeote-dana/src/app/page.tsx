'use client';

import { useState } from 'react';
import Link from 'next/link';
import { PROGRAMS, FILTER_DEFS, posterColor } from '@/lib/data';
import { FilterState, ViewMode } from '@/types';
import Crumb from '@/components/Crumb';
import Mascot from '@/components/ui/Mascot';
import ReviewStrip from '@/components/ReviewStrip';
import Poster from '@/components/Poster';
import Icon from '@/components/ui/Icon';

export default function HomePage() {
  const [q, setQ] = useState('');
  const [filters, setFilters] = useState<FilterState>({
    region: '전체', motive: '전체', mode: '전체',
    period: '전체', support: '전체', status: '전체',
  });
  const [viewMode, setViewMode] = useState<ViewMode>('grid');

  const setFilter = (key: keyof FilterState, val: string) =>
    setFilters((f) => ({ ...f, [key]: val }));
  const reset = () => setFilters({
    region: '전체', motive: '전체', mode: '전체',
    period: '전체', support: '전체', status: '전체',
  });

  const filtered = PROGRAMS.filter((p) => {
    if (q && !(p.title.includes(q) || p.org.includes(q) || p.summary.includes(q))) return false;
    if (filters.region !== '전체' && p.region !== filters.region) return false;
    if (filters.motive !== '전체' && !p.motive.includes(filters.motive)) return false;
    if (filters.mode !== '전체' && p.mode !== filters.mode) return false;
    if (filters.period !== '전체' && p.period !== filters.period) return false;
    if (filters.support !== '전체' && !p.support.includes(filters.support)) return false;
    if (filters.status !== '전체' && p.status !== filters.status) return false;
    return true;
  });

  const activeChips = Object.entries(filters).filter(([, v]) => v !== '전체') as [keyof FilterState, string][];

  return (
    <main className="shell">
      <Crumb trail={['고립 은둔 예방', '지원사업 검색']} />
      <div className="page-head">
        <div>
          <div className="page-eyebrow">고립 은둔 예방</div>
          <h1 className="page-title">지원사업 검색</h1>
        </div>
        <div className="page-mascot">
          <Mascot kind="eggplant" size={86} />
          <Mascot kind="apple" size={86} />
          <Mascot kind="watermelon" size={86} />
        </div>
      </div>

      <div className="filter-table">
        {FILTER_DEFS.map((f) => (
          <div key={f.key} className="frow">
            <div className="frow-label">{f.label}</div>
            <div className="frow-body">
              {f.options.map((opt) => (
                <button
                  key={opt}
                  className={`chip${filters[f.key as keyof FilterState] === opt ? (opt === '전체' ? ' active' : ' brand-active') : ''}`}
                  onClick={() => setFilter(f.key as keyof FilterState, opt)}
                >
                  {opt}
                </button>
              ))}
            </div>
          </div>
        ))}
        <div className="search-row">
          <div className="frow-label">검색어</div>
          <div className="search-wrap">
            <input
              value={q}
              onChange={(e) => setQ(e.target.value)}
              placeholder="사업명을 입력하세요"
            />
            <button className="search-btn"><Icon name="search" size={14} /> 검색</button>
          </div>
        </div>
      </div>

      <ReviewStrip />

      <div className="result-row">
        <div className="active-chips">
          <span className="active-chips-label">검색 결과</span>
          <span>전체 <strong>{filtered.length}</strong>건</span>
          {activeChips.length > 0 && (
            <>
              <span style={{ color: 'var(--line-2)', margin: '0 4px' }}>|</span>
              {activeChips.map(([k, v]) => (
                <span key={k} className="active-chip">
                  {v}
                  <button onClick={() => setFilter(k, '전체')}><Icon name="x" size={10} /></button>
                </span>
              ))}
              <button className="reset-btn" onClick={reset}><Icon name="reset" size={11} /> 초기화</button>
            </>
          )}
        </div>
        <div style={{ display: 'flex', gap: 8, alignItems: 'center' }}>
          <select className="sort-select" defaultValue="deadline">
            <option value="deadline">마감 임박순</option>
            <option value="latest">최신 등록순</option>
            <option value="popular">신청 많은 순</option>
          </select>
          <div className="toggle-group">
            <button className={viewMode === 'grid' ? 'active' : ''} onClick={() => setViewMode('grid')}>
              <Icon name="grid" size={12} /> 카드
            </button>
            <button className={viewMode === 'list' ? 'active' : ''} onClick={() => setViewMode('list')}>
              <Icon name="list" size={12} /> 리스트
            </button>
          </div>
        </div>
      </div>

      {filtered.length === 0 ? (
        <div className="empty">
          <div className="empty-title">조건에 맞는 사업이 없어요</div>
          <div>필터를 줄이거나, 검색어를 다시 확인해 주세요.</div>
        </div>
      ) : viewMode === 'grid' ? (
        <div className="cards">
          {filtered.map((p) => (
            <Link key={p.id} href={`/programs/${p.id}`} className="pcard">
              <Poster p={p} color={posterColor(p.id)} />
              <div className="pcard-body">
                <div className="pcard-tags">
                  <span className={`tag ${p.status === '현재 신청 가능' ? 'live' : p.status === '모집 예정' ? 'soon' : 'closed'}`}>
                    {p.status}
                  </span>
                  <span className="tag">{p.region}</span>
                  <span className="tag">{p.mode}</span>
                </div>
                <div className="pcard-title">{p.title}</div>
                <div className="pcard-org">{p.org}</div>
                <div className="pcard-foot">
                  <span><strong>{p.duration}</strong></span>
                  <span>마감 <strong>{p.deadline}</strong></span>
                </div>
              </div>
            </Link>
          ))}
        </div>
      ) : (
        <div className="list">
          <div className="list-row head">
            <span></span>
            <span>사업명 / 기관</span>
            <span>참여 동기</span>
            <span>지역 · 형태</span>
            <span>모집 상태</span>
            <span>마감일</span>
          </div>
          {filtered.map((p) => (
            <Link key={p.id} href={`/programs/${p.id}`} className="list-row">
              <div className={`list-thumb ${posterColor(p.id)}`}>{p.title.slice(0, 1)}</div>
              <div>
                <div className="list-title">{p.title}</div>
                <div className="list-org">{p.org}</div>
              </div>
              <div className="list-cell">{p.motive.join(', ')}</div>
              <div className="list-cell">{p.region} · {p.mode}</div>
              <div>
                <span className={`tag ${p.status === '현재 신청 가능' ? 'live' : p.status === '모집 예정' ? 'soon' : 'closed'}`}>
                  {p.status}
                </span>
              </div>
              <div className="list-cell" style={{ fontWeight: 700 }}>{p.deadline}</div>
            </Link>
          ))}
        </div>
      )}

      {filtered.length > 0 && (
        <div className="pagination">
          <button className="page-btn icon"><Icon name="chev-left" size={14} /></button>
          <button className="page-btn active">1</button>
          <button className="page-btn">2</button>
          <button className="page-btn">3</button>
          <button className="page-btn icon"><Icon name="chev-right" size={14} /></button>
        </div>
      )}
    </main>
  );
}
