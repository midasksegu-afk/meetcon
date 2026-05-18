// sections.jsx — content sections for the MIDAS K blog post
const { useState, useEffect, useRef, useMemo } = React;

/* ============ small utilities ============ */
function useReveal() {
  const ref = useRef(null);
  useEffect(() => {
    const el = ref.current;if (!el) return;
    const io = new IntersectionObserver((es) => {
      es.forEach((e) => {if (e.isIntersecting) {e.target.classList.add('in');io.unobserve(e.target);}});
    }, { threshold: .12, rootMargin: '0px 0px -40px 0px' });
    io.observe(el);
    return () => io.disconnect();
  }, []);
  return ref;
}

function CountUp({ to, suffix = '', duration = 1400, decimals = 0 }) {
  const [v, setV] = useState(0);
  const ref = useRef(null);
  const started = useRef(false);
  useEffect(() => {
    const el = ref.current;if (!el) return;
    const io = new IntersectionObserver((es) => {
      es.forEach((e) => {
        if (e.isIntersecting && !started.current) {
          started.current = true;
          const t0 = performance.now();
          const tick = (t) => {
            const p = Math.min(1, (t - t0) / duration);
            const eased = 1 - Math.pow(1 - p, 3);
            setV(to * eased);
            if (p < 1) requestAnimationFrame(tick);
          };
          requestAnimationFrame(tick);
        }
      });
    }, { threshold: .4 });
    io.observe(el);
    return () => io.disconnect();
  }, [to, duration]);
  const display = decimals ? v.toFixed(decimals) : Math.round(v).toLocaleString();
  return <span ref={ref}>{display}<span className="u">{suffix}</span></span>;
}

/* ============ Reveal wrapper ============ */
function Reveal({ children, as: Comp = 'div', ...rest }) {
  const ref = useReveal();
  return <Comp ref={ref} className={`reveal ${rest.className || ''}`} {...rest}>{children}</Comp>;
}

/* ============ Hero ============ */
function Hero() {
  return (
    <section className="hero" aria-label="header">
      <div className="aurora" aria-hidden="true">
        <div className="b b1"></div><div className="b b2"></div><div className="b b3"></div>
      </div>
      <div className="hero-inner">
        <span className="kicker"><span className="dot"></span>MIDAS K · 2027학년도 수시</span>
        <h1><em>티처스 컨설턴트</em>와 함께하는<br />2027 대입 수시 면접컨설팅</h1>
        <p className="lede">
          학생부 <b>서류 기반 심층 면접</b> 대비 컨설팅. 학생 탐구 활동의 진위 여부,
          활동의 수준과 깊이, 인성 및 리더십 평가를 핵심으로 마이더스K만의 노하우로 준비합니다.
        </p>
        <div className="hero-grid">
          <div>
            <ul className="hero-creds">
              <li>성적을 부탁해 <b>'티처스'</b> 출연</li>
              <li>교육진흥부문 <b>교육감상 표창</b></li>
              <li>네이버 프리미엄 콘텐츠 <b>교육 분야 우수 콘텐츠</b> 선정</li>
            </ul>
            <div className="hero-call" aria-label="면접 상담 전화">
              <span className="hc-lab">면접 상담</span>
              <span className="hc-num">053<span className="hc-d">‐</span>782<span className="hc-d">‐</span>0331</span>
            </div>
          </div>
          <div className="hero-photo">
            <img src="speaker.png" alt="마이더스K 대표 강연 모습" />
            <div className="caption">티처스 출연 · MIDAS K</div>
          </div>
        </div>
        <div className="stats">
          <div className="stat"><div className="n"><CountUp to={1} suffix=":2" /></div><div className="l">학생 : 컨설턴트</div></div>
          <div className="stat"><div className="n"><CountUp to={27} suffix="개교" /></div><div className="l">인서울 주요대 대비</div></div>
          <div className="stat"><div className="n"><CountUp to={17} suffix="개교" /></div><div className="l">의치한약 서류면접</div></div>
          <div className="stat"><div className="n"><CountUp to={35} suffix="만원~" /></div><div className="l">1회 컨설팅 시작가</div></div>
        </div>
      </div>
    </section>);

}

/* ============ Differentiators ============ */
const DIFFS = [
{ t: "학생 1명당 컨설턴트 2명, '최상의 면접 전략' 빌드업", d: '1:2 컨설팅 방식으로 진행됩니다.', tag: '1:2 컨설팅' },
{ t: "높은 적중률을 자랑하는 '예상 질문 추출' + 학생이 작성한 '답변 보강' 솔루션 진행", d: '학생부 활동에 기반한 예상 질문을 추출하고, 학생이 작성한 답변을 보강합니다.', tag: '적중률' },
{ t: "지원 대학 및 학과 '면접 분석 리포트' 제공", d: '회당 1개 학과 기준으로 면접 분석 리포트를 제공합니다.', tag: '학과별' },
{ t: "면접시 발생되는 '위기 대응' 솔루션 진행", d: '학생이 걱정되는 질문 보강을 포함한 위기 대응 솔루션을 함께 진행합니다.', tag: '시뮬레이션' },
{ t: "면접 '태도' 및 '자세' 그리고 '발성' 코칭", d: '면접 태도, 자세, 발성을 종합적으로 코칭합니다.', tag: '코칭' }];


function Differentiators() {
  return (
    <section>
      <Reveal>
        <span className="eyebrow"><span className="ln"></span>WHY MIDAS K</span>
        <h2>마이더스K의 면접 컨설팅은 <em>다릅니다</em> !</h2>
        <p className="sub">학생부 '서류 기반' 심층 면접 대비 컨설팅을 진행합니다. 예상 질문 추출과 실전과 같은 위기 대응 '시뮬레이션'을 통해 합격률을 극대화시킵니다.</p>
      </Reveal>
      <div className="diff">
        {DIFFS.map((d, i) =>
        <Reveal key={i} className="card" style={{ transitionDelay: `${i * 60}ms` }}>
            <h3>{d.t}</h3>
            <p>{d.d}</p>
          </Reveal>
        )}
      </div>
      <Reveal className="mediabar">
        <h4>대입 면접컨설팅도 역시 마이더스K교육컨설팅입니다 !</h4>
        <ul>
          <li>성적을 부탁해 <b>'티처스'</b> 출연</li>
          <li>교육진흥부문 <b>교육감상 표창</b></li>
          <li>네이버 프리미엄 콘텐츠 <b>교육 분야 우수 콘텐츠</b> 선정</li>
        </ul>
      </Reveal>
    </section>);

}

/* ============ Program / pricing ============ */
const UNIVS = {
  general: {
    label: '일반대학 (서류기반 면접)',
    badge: 'GENERAL',
    price: '1회 35만원',
    sub: '2회차부터 1회당 30만원 · 모범답변 제작 시 10만원 추가',
    note: '2회 이상 신청 시 복수대학 대비 가능 · 동영상 녹화 가능 (희망자에 한해 학생폰으로 촬영)',
    groups: [
    { h: '서울·수도권', list: ['성균관대(탐구형)', '한양대(면접형)', '중앙대', '경희대', '한국외대', '서울시립대', '이화여대', '건국대', '동국대', '숙명여대', '국민대', '숭실대', '세종대', '단국대', '인하대', '아주대', '항공대', '명지대', '서울과기대', '광운대', '가천대', '성신여대', '동덕여대', '서울여대'] },
    { h: '지역 거점 국립대', list: ['경북대', '부산대', '충북대'] }],

    items: [
    '학생부기반 서류심층면접',
    '면접 예상 질문지 제공 (학생부 사전 등록 시)',
    '취약점 분석 및 위기 관리법 컨설팅',
    '면접 자세 및 태도 교정',
    '비대면 면접 업로드용 영상 촬영 지원 (학생폰으로 촬영)',
    '모범답변 제작 옵션 (10만원 추가)']

  },
  med: {
    label: '의치약한수 + 서울대 지역균형',
    badge: 'MED · SNU',
    price: '회당 40만원',
    sub: '회차 무관 · MMI 실시 전형 중 서류기반 면접만 대비합니다',
    note: '약학과는 서울대 일반(수학 구술), 연세대(제시문), 인제대, 대구가톨릭대, 차의과대(일반인적성) 외 모두 학생부 기반 면접',
    groups: [
    { h: '의·치·한·약', list: ['경희대(의치한)', '중앙대(의)', '가천대(의)', '인하대(의)', '강원대 미래인재(의)', '경북대(의치)', '경상대(의)', '계명대 학종(의)', '단국대(의치)', '대구가톨릭대 지역학종(의)', '동국대 WISE(의한)', '원광대(의치한)', '전남대(의)', '전북대(의치)', '조선대(의치)', '충남대(의)', '동아대(의)'] },
    { h: '서울대', list: ['서울대 지역균형'] }],

    items: [
    '학생부기반 서류심층면접',
    '면접 예상 질문지 제공 (학생부 사전 등록 시)',
    '취약점 분석 및 위기 관리법 컨설팅',
    '면접 자세 및 태도 교정',
    '비대면 면접 업로드용 영상 촬영 지원 (학생폰으로 촬영)',
    'MMI 실시 전형 중 서류기반 면접만 대비']

  }
};

function Program() {
  const [tab, setTab] = useState('general');
  const u = UNIVS[tab];
  return (
    <section>
      <Reveal>
        <span className="eyebrow"><span className="ln"></span>PROGRAM</span>
        <h2>2027학년도 마이더스K <em>'면접 대비 프로그램'</em> 안내</h2>
        <p className="sub">출제문항·집단면접·문제풀이형은 대비하지 않으며, 서류기반 심층 대비만 진행합니다. (제시문 면접 X)</p>
      </Reveal>
      <Reveal className="price-tabs" role="tablist">
        {Object.entries(UNIVS).map(([k, v]) =>
        <button key={k} className={tab === k ? 'on' : ''} onClick={() => setTab(k)} role="tab" aria-selected={tab === k}>
            {v.label}
          </button>
        )}
      </Reveal>
      <Reveal className="price-card" key={tab}>
        <div className="price-head">
          <div>
            <div className="name">{u.badge}</div>
            <div className="title">{u.label}</div>
            <div className="desc">{u.sub}</div>
          </div>
          <div className="num">
            <div className="big">{u.price.split(/(만원~?)/)[0]}<span className="u">{u.price.split(/(만원~?)/).slice(1).join('')}</span></div>
            <div className="small">VAT 별도 · 카드·현금 결제</div>
          </div>
        </div>
        <div className="price-body">
          <ol>
            {u.items.map((it, i) => <li key={i}>{it}</li>)}
          </ol>
        </div>
        <div className="price-foot">
          <span className="pill">참고</span>
          <span>{u.note}</span>
        </div>
      </Reveal>


    </section>);

}

/* ============ Process ============ */
const STEPS = [
{ lab: 'STEP 01', t: '접수 및 비용 입금', d: '결제 및 서류 접수가 모두 완료되어야 예약이 확정됩니다.' },
{ lab: 'STEP 02', t: '학생부(최종본) 접수', d: 'FAX 053-782-0290 또는 e-mail ubestudy@naver.com 으로 전송. 지원 대학 및 학과 정보를 함께 보내주세요.' },
{ lab: 'STEP 03', t: '예상 질문 추출', d: '학생부와 지원 학과 정보를 바탕으로 마이더스K가 예상 질문지를 작성합니다.' },
{ lab: 'STEP 04', t: '면접 컨설팅 진행', d: '1:2 컨설팅으로 답변 보강 · 위기 대응 시뮬레이션 · 태도·자세·발성 코칭을 진행합니다.' }];


function Process() {
  return (
    <section>
      <Reveal>
        <span className="eyebrow"><span className="ln"></span>PROCESS</span>
        <h2>신청 및 <em>진행 절차</em> 안내</h2>
        <p className="sub">접수 및 비용 입금 + 학생부(최종본) 접수 → 예상 질문 추출 → 면접 컨설팅 진행</p>
      </Reveal>
      <div className="timeline">
        {STEPS.map((s, i) =>
        <Reveal key={i} className="step" style={{ transitionDelay: `${i * 80}ms` }}>
            <div className="lab">{s.lab}</div>
            <div className="ttl">{s.t}</div>
            <div className="desc">{s.d}</div>
          </Reveal>
        )}
      </div>
    </section>);

}

/* ============ Contact ============ */
const CONTACTS = [
{ lab: '대표 번호', v: '053-782-0331', d: '면접컨설팅 관련 직접 전화해주시면 담당 직원이 안내해 드립니다.' },
{ lab: '문자 문의', v: '010-6280-4410', d: '"면접컨설팅 신청합니다"로 문자 보내주시면 담당 선생님이 연락드립니다.' },
{ lab: '메일 문의', v: 'ubestudy@naver.com', d: '궁금한 점을 메일로 보내주시면 담당 직원이 연락드립니다.' },
{ lab: '온라인 신청', v: '통합 신청폼 열기', d: '통합 신청폼에서 06번 수시 면접컨설팅으로 신청해주세요.', href: 'https://forms.gle/zv59Mo6eEDi4LdmY8'}];


function Contact() {
  return (
    <section>
      <Reveal>
        <span className="eyebrow"><span className="ln"></span>CONTACT</span>
        <h2>마이더스K <em>수시 면접 컨설팅</em> 상담 문의</h2>
        <p className="sub">마이더스K의 관리 정책에 따라 학년별 정원제로 운영하고 있어 즉시 가입이 되지 않을 수 있습니다.</p>
      </Reveal>
      <div className="contact">
        {CONTACTS.map((c, i) => {
          const inner =
          <>
              <div className="lab">{c.lab}</div>
              <div className="v">{c.v}</div>
              <div className="d">{c.d}</div>
              {c.cta && <div className="cta">{c.cta}</div>}
            </>;

          return c.href ?
          <a key={i} className="c c-link" href={c.href} target="_blank" rel="noopener" style={{ transitionDelay: `${i * 60}ms` }}>
              <Reveal>{inner}</Reveal>
            </a> :

          <Reveal key={i} className="c" style={{ transitionDelay: `${i * 60}ms` }}>
              {inner}
            </Reveal>;

        })}
      </div>
    </section>);

}

/* ============ Notice ============ */
function Notice() {
  return (
    <Reveal as="section">
      <span className="eyebrow"><span className="ln"></span>NOTICE</span>
      <h2><em>구비서류 안내</em> & 결제관련 유의사항</h2>
      <p className="sub">컨설팅 전 꼭 확인해주세요.</p>
      <div className="notice" style={{ background: '#f4f7ff', borderColor: '#d8e1f6' }}>
        <h4 style={{ color: '#1F45A8' }}>구비서류</h4>
        <ol style={{ color: '#243a72' }}>
          <li>학교생활기록부 (최종본)</li>
          <li>지원 대학 및 학과 정보</li>
          <li>FAX 전송 <b>053-782-0290</b> 또는 e-mail <b>ubestudy@naver.com</b></li>
        </ol>
      </div>
      <div className="notice">
        <h4>결제 관련 유의사항</h4>
        <ol>
          <li>현금 및 카드 결제 가능 — <b>결제 + 서류 접수 모두 완료 시 예약 확정</b></li>
          <li>학생부 접수 시점부터 실적 분석이 진행되므로 <b>취소 시 10만원 차감</b></li>
          <li>면접컨설팅 자료 발송 후 취소 시 <b>20만원</b> (면접분석 10만원 + 맞춤질문지 10만원) 차감 후 환불</li>
          <li>상담 당일 취소 시 <b>전액 환불 불가</b></li>
        </ol>
      </div>
    </Reveal>);

}

/* ============ Floating CTA ============ */
function FloatCTA() {
  return (
    <div className="float-cta" aria-label="quick contact">
      <a href="https://forms.gle/zv59Mo6eEDi4LdmY8" target="_blank" rel="noopener">
        <span className="ic">→</span><span>온라인 신청</span>
      </a>
    </div>);

}

/* ============ Footer ============ */
function Footer() {
  return (
    <footer className="footer">
      <div className="logo"><img src="logo.png" alt="" />MIDAS K · Education Consulting</div>
      <div>2027학년도 수시 면접컨설팅 · 053-782-0331</div>
      <div style={{ marginTop: 4, opacity: .7 }}> </div>
    </footer>);

}

Object.assign(window, {
  Hero, Differentiators, Program, Process, Contact, Notice, FloatCTA, Footer, Reveal, CountUp
});
