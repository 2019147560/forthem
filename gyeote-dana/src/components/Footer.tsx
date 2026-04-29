export default function Footer() {
  return (
    <footer className="foot">
      <div className="shell foot-row">
        <div>
          <div className="foot-brand">곁에·다나</div>
          <div className="foot-info">
            은둔·고립청년 통합 정보 플랫폼<br />
            <strong>대표 전화</strong> 02-000-0000 · <strong>운영시간</strong> 평일 10:00–18:00<br />
            본 화면은 디자인 목업으로 실제 사업과 무관합니다
          </div>
        </div>
        <div className="foot-links">
          <a href="#">이용약관</a>
          <a href="#">개인정보처리방침</a>
          <a href="#">오시는 길</a>
          <a href="#">문의하기</a>
        </div>
      </div>
    </footer>
  );
}
