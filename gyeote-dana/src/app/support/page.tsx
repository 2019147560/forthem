'use client';

import { useState } from 'react';
import { SUPPORTS } from '@/lib/data';
import Crumb from '@/components/Crumb';
import Icon from '@/components/ui/Icon';

const CATS = ['전체', '경제', '심리', '주거', '의료', '교육'];

export default function SupportPage() {
  const [cat, setCat] = useState('전체');
  const filtered = cat === '전체' ? SUPPORTS : SUPPORTS.filter((s) => s.cat === cat);

  return (
    <main className="shell">
      <Crumb trail={['제도 안내']} />
      <div className="page-head">
        <div>
          <div className="page-eyebrow">정부·지자체 공식 지원</div>
          <h1 className="page-title">제도 안내</h1>
        </div>
      </div>

      <div className="filter-table">
        <div className="frow">
          <div className="frow-label">분야</div>
          <div className="frow-body">
            {CATS.map((c) => (
              <button
                key={c}
                className={`chip${cat === c ? (c === '전체' ? ' active' : ' brand-active') : ''}`}
                onClick={() => setCat(c)}
              >
                {c}
              </button>
            ))}
          </div>
        </div>
      </div>

      <div className="result-row">
        <span>총 <strong>{filtered.length}</strong>건의 지원 제도</span>
      </div>

      <div className="support-grid">
        {filtered.map((s) => (
          <div key={s.id} className="support-card">
            <span className="support-cat">{s.cat}</span>
            <div>
              <div className="support-title">{s.title}</div>
              <div className="support-org" style={{ marginTop: 4 }}>주관 · {s.org}</div>
            </div>
            <span className="support-amount">{s.amount}</span>
            <p className="support-body">{s.body}</p>
            <div className="support-foot">
              <span>자격 자동 매칭 가능</span>
              <span style={{ display: 'inline-flex', alignItems: 'center', gap: 4, color: 'var(--brand)', fontWeight: 700 }}>
                자세히 보기 <Icon name="arrow-up-right" size={12} />
              </span>
            </div>
          </div>
        ))}
      </div>
    </main>
  );
}
