import { notFound } from 'next/navigation';
import Link from 'next/link';
import { PROGRAMS } from '@/lib/data';
import Crumb from '@/components/Crumb';
import Icon from '@/components/ui/Icon';

interface Props {
  params: { id: string };
}

export function generateStaticParams() {
  return PROGRAMS.map((p) => ({ id: p.id }));
}

export default function ProgramDetailPage({ params }: any) {
  const p = PROGRAMS.find((x) => x.id === params.id);
  if (!p) notFound();

  const status = p.status === '현재 신청 가능' ? 'live' : p.status === '모집 예정' ? 'soon' : 'closed';
  const fillPct = ((p.spots - p.spotsLeft) / p.spots) * 100;
  const full = p.spotsLeft === 0;

  return (
    <main className="shell">
      <Crumb trail={['고립 은둔 예방', '지원사업 검색', p.title]} />
      <Link href="/" className="back">
        <Icon name="chev-left" size={14} /> 사업 목록으로
      </Link>

      <section className="detail-head">
        <div className="detail-tags">
          <span className={`tag ${status}`}>{p.status}</span>
          <span className="tag">{p.region}</span>
          <span className="tag">{p.mode}</span>
          <span className="tag">{p.tag}</span>
        </div>
        <h1 className="detail-title">{p.title}</h1>
        <p className="detail-sub">{p.summary}</p>
      </section>

      <div className="detail-grid">
        <div>
          <div className="info-table">
            <div className="info-row">
              <div className="info-k">주관 기관</div><div className="info-v">{p.org}</div>
              <div className="info-k">진행 지역</div><div className="info-v">{p.region}</div>
            </div>
            <div className="info-row">
              <div className="info-k">진행 형태</div><div className="info-v">{p.mode}</div>
              <div className="info-k">참여 기간</div><div className="info-v">{p.duration}</div>
            </div>
            <div className="info-row">
              <div className="info-k">신청 마감</div><div className="info-v" style={{ fontWeight: 700 }}>{p.deadline}</div>
              <div className="info-k">모집 인원</div><div className="info-v">{p.spots}명 (잔여 {p.spotsLeft}명)</div>
            </div>
            <div className="info-row">
              <div className="info-k">참여 동기</div><div className="info-v">{p.motive.join(', ')}</div>
              <div className="info-k">제공 지원</div><div className="info-v">{p.support.join(', ')}</div>
            </div>
          </div>

          <h2 className="detail-h">프로그램 소개</h2>
          <p className="detail-body">{p.detail}</p>

          <h2 className="detail-h">이런 점이 다릅니다</h2>
          <ul className="bullets">
            {p.bullets.map((b, i) => <li key={i}>{b}</li>)}
          </ul>

          <h2 className="detail-h">유의 사항</h2>
          <p className="detail-body" style={{ fontSize: 13, color: 'var(--ink-2)' }}>
            · 신청서에 작성하신 내용은 담당 매니저 외에는 공개되지 않으며, 사업 종료 6개월 후 자동 파기됩니다.<br />
            · 어떤 단계에서든 참여 중단·정보 삭제를 요청하실 수 있습니다.<br />
            · 결석에 대한 페널티는 없으며, 본인의 속도에 맞춰 참여하실 수 있습니다.
          </p>
        </div>

        <aside>
          <div className="apply-card">
            <div className="head">
              <div className="label">모집 현황</div>
              <div style={{ fontSize: 22, fontWeight: 800 }}>
                {full ? '마감되었어요' : (
                  <>잔여 <span style={{ color: 'var(--brand)' }}>{p.spotsLeft}</span>
                  <span style={{ color: 'var(--ink-4)', fontSize: 15 }}> / {p.spots}명</span></>
                )}
              </div>
              <div className="spots-bar"><div className="spots-bar-fill" style={{ width: `${fillPct}%` }} /></div>
              <div style={{ fontSize: 12, color: 'var(--ink-3)' }}>
                {full ? '다음 회차 모집 예정' : `${p.spots - p.spotsLeft}명이 함께하고 있어요`}
              </div>
            </div>

            <div className="apply-row"><span className="apply-row-k">기간</span><span className="apply-row-v">{p.duration}</span></div>
            <div className="apply-row"><span className="apply-row-k">진행 형태</span><span className="apply-row-v">{p.mode}</span></div>
            <div className="apply-row"><span className="apply-row-k">지역</span><span className="apply-row-v">{p.region}</span></div>
            <div className="apply-row"><span className="apply-row-k">신청 마감</span><span className="apply-row-v">{p.deadline}</span></div>

            <div style={{ marginTop: 16 }}>
              {full || status === 'closed' ? (
                <button className="btn btn-primary" disabled>마감되었습니다</button>
              ) : status === 'soon' ? (
                <button className="btn btn-primary">오픈 알림 받기 <Icon name="chev-right" size={14} /></button>
              ) : (
                <Link href={`/programs/${p.id}/apply`} className="btn btn-primary">
                  신청하기 <Icon name="chev-right" size={14} />
                </Link>
              )}
              <div className="btn-row">
                <button className="btn btn-ghost"><Icon name="bookmark" size={14} /> 저장</button>
                <button className="btn btn-ghost"><Icon name="user" size={14} /> 1:1 문의</button>
              </div>
            </div>

            <div style={{ marginTop: 14, padding: 12, background: 'var(--brand-soft)', border: '1px solid var(--brand-line)', borderRadius: 4, fontSize: 12, color: 'var(--brand-deep)', lineHeight: 1.55 }}>
              <Icon name="lock" size={12} /> 신청 정보는 본인과 담당 매니저 외에는 공개되지 않습니다.
            </div>
          </div>
        </aside>
      </div>
    </main>
  );
}
