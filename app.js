/* ===== 데이터셋(초보자가 편집하기 쉬움) ===== */
const users = [
  "리플왕", "익명A", "눈송이", "달빛유랑", "코딩고양이",
  "불꽃소년", "밤하늘", "비둘기계정", "분노의참치", "소심러",
  "찐덕후", "비트박스", "행복회로", "푸른별", "밈장인",
  "트윗장수", "낙엽계정", "몽환토끼", "너굴맨", "마지막불꽃"
];

const mild = [
  "그건 좀... 이해가 잘 안 되네.",
  "헉... 왜 그래?",
  "음... 다시 말해줄래?",
  "흠… 굳이 이런 걸 올려야 하나?", 
  "별건 아닌데 좀 애매하네.", 
  "그냥 넘어가도 될 텐데 왜 굳이…", 
  "이 말이 뭐가 재밌는 거지?", 
  "조금 성의 없어 보인다.", 
  "다른 말 없었어?", 
  "너무 평범해서 할 말이 없다.", 
  "이거 트윗할 정도인가?", 
  "좀 뜬금없네.", 
  "아무 의미 없는 트윗 같아.", 
  "지금 상황에 맞는 말은 아닌 듯.", 
  "흐음… 나만 이상하다고 느끼는 건가?", 
  "그냥저냥 그렇네.", 
  "웃자고 쓴 거라면 좀 약하다.", 
  "조금 심심한데?", 
  "오히려 어색하다.", 
  "트위터 감성은 아닌데?", 
  "공감은 안 되네.", 
  "이상한 건 아니지만 별로야.", 
  "살짝 묘하다."
];
const medium = [
  "진짜로? 그걸 올리네 ㅋㅋ",
  "이 말은 좀 아니지 않나",
  "차단각이다",
  "이런 건 좀 아닌 듯", 
  "다시 생각해보는 게 좋지 않을까", 
  "이거 보고 불편해진 사람 많을 듯", 
  "왜 굳이 이렇게 말했어?", 
  "너무 무신경하다", 
  "그냥 넘어갈 수 없는 말이다", 
  "어쩐지 불쾌하네", 
  "센스가 부족한 거 아냐?", 
  "조금 더 조심했어야지", 
  "이건 트윗으로 올리면 욕먹기 딱 좋아", 
  "민감한 표현 아닌가", 
  "좋게 보긴 힘들다", 
  "사람 생각 안 하고 쓴 듯", 
  "이 말이 무슨 의미로 들릴지 생각 안 해봤어?", 
  "불쾌할 수밖에 없는 트윗", 
  "아무리 봐도 이상하다", 
  "웃자고 쓴 거라면 실패", 
  "타이밍이 안 좋아", 
  "굳이 이렇게까지?", 
  "이건 좀 선 넘었다"
];
const strong = [
  "와... 이건 너무 심한데",
  "이런 건 안 올리는 게 상식 아님?",
  "정말 민폐야",
  "진짜 최악이다", 
  "보고 기가 막힌다", 
  "욕 안 하고는 못 넘어가겠다", 
  "완전 비호감", 
  "이걸 올린 건 제정신인가", 
  "읽고 분노가 치밀었다", 
  "절대 용납 못 해", 
  "SNS에서 이런 말이라니 충격적이다", 
  "이건 망언 수준", 
  "차라리 계정 닫는 게 낫겠다", 
  "누가 봐도 기분 나쁠 말", 
  "여기까지 선 넘은 건 처음 본다", 
  "더 심하게 말하고 싶지만 참는다", 
  "분노 유발 트윗", 
  "정말 어처구니없다", 
  "이 트윗은 역사에 남을 듯", 
  "망언계의 교과서", 
  "화가 치밀어 오른다", 
  "정신 차려라", 
  "끝까지 실망스럽다"
];

/* ===== 유틸 함수 ===== */
function rand(arr){ return arr[Math.floor(Math.random()*arr.length)] }
function randInt(min,max){ return Math.floor(Math.random()*(max-min+1))+min }

/* ===== DOM ===== */
const tweetInput = document.getElementById('tweetInput');
const postBtn = document.getElementById('postBtn');
const timeline = document.getElementById('timeline');
const intensityEl = document.getElementById('intensity');
const simToggle = document.getElementById('simToggle');
const notifBadge = document.getElementById('notifBadge');
const clearBtn = document.getElementById('clearBtn');
const trendsList = document.getElementById('trendsList');

let notifCount = 0;
let trends = [];

/* ===== 시뮬레이션 함수 ===== */
function generateReactions(originalText, intensity){
  const reactions = [];
  // intensity 1..10 -> 반응갯수, 강도 선택
  const baseCount = Math.max(1, Math.floor(intensity * 1.5));
  for(let i=0;i<baseCount;i++){
    let toneRoll = Math.random() * 10;
    let text;
    if(toneRoll < intensity/3){
      text = rand(strong);
    } else if(toneRoll < intensity){
      text = rand(medium);
    } else {
      text = rand(mild);
    }
    // 템플릿으로 원문 일부 포함
    const excerpt = originalText.length > 20 ? originalText.slice(0,20) + "…" : originalText;
    // 유저, 좋아요, 리트윗 수 생성
    reactions.push({
      user: rand(users),
      text: `${text} — "${excerpt}"`,
      likes: randInt(0, 500*intensity/10),
      retweets: randInt(0, 300*intensity/10),
      timeOffset: randInt(300, 3000) // ms
    });
  }
  return reactions;
}

function addOriginalPost(text){
  const card = document.createElement('div');
  card.className = 'card';
  card.innerHTML = `
    <div class="tweet-header">
      <div class="avatar">나</div>
      <div>
        <div style="font-weight:700">나 (You) <span class="meta">· 지금</span></div>
        <div class="tweet-content">${escapeHtml(text)}</div>
        <div class="meta">좋아요 <span id="likeCount">0</span> · 리트윗 <span id="rtCount">0</span></div>
      </div>
    </div>
    <div id="replies"></div>
  `;
  timeline.prepend(card);
  return card;
}

function createReplyElement(r){
  const el = document.createElement('div');
  el.className = 'card';
  el.style.marginTop = '8px';
  el.innerHTML = `
    <div class="tweet-header">
      <div class="avatar">${r.user.slice(0,2)}</div>
      <div>
        <div style="font-weight:700">${r.user} <span class="meta">· 지금</span></div>
        <div class="tweet-content">${escapeHtml(r.text)}</div>
        <div class="meta">좋아요 ${Math.round(r.likes)} · 리트윗 ${Math.round(r.retweets)}</div>
      </div>
    </div>
  `;
  return el;
}

/* 안전한 텍스트 출력 */
function escapeHtml(s){
  return s.replace(/[&<>"']/g, (m)=>({ '&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":"&#39;"}[m]));
}

/* 포스트 시뮬레이션 실행 */
async function runSimulation(text){
  const intensity = Number(intensityEl.value);
  const originalCard = addOriginalPost(text);
  const repliesContainer = originalCard.querySelector('#replies');

  if(!simToggle.checked) return;

  const reactions = generateReactions(text, intensity);
  // 트렌드를 반영
  updateTrends(text, reactions);

  // 시차를 두고 반응 추가 (폭주처럼 보이게)
  reactions.forEach((r, idx) => {
    setTimeout(()=>{
      const replyEl = createReplyElement(r);
      repliesContainer.appendChild(replyEl);

      // 원글 좋아요/리트 증가 시뮬(임의)
      const likeSpan = originalCard.querySelector('#likeCount');
      const rtSpan = originalCard.querySelector('#rtCount');
      if(likeSpan) likeSpan.textContent = String(Number(likeSpan.textContent) + Math.floor(r.likes/10));
      if(rtSpan) rtSpan.textContent = String(Number(rtSpan.textContent) + Math.floor(r.retweets/30));

      // 알림 배지 업데이트
      notifCount += 1;
      notifBadge.textContent = notifCount;

    }, r.timeOffset + idx*200);
  });
}

/* 트렌드 업데이트 (간단히 원문+반응 키워드에서 뽑음) */
function updateTrends(originalText, reactions){
  // 후보단어 뽑기: 원문에서 명사 비슷한 단어(스페이스 구분) + 반응 일부
  const seeds = [];
  originalText.split(/\s+/).slice(0,4).forEach(w=>{ if(w.length>1) seeds.push(w) });
  reactions.slice(0,3).forEach(r=>{
    r.text.split(/\s+/).slice(0,2).forEach(w=>{ if(w.length>1) seeds.push(w.replace(/[^\wㄱ-ㅎㅏ-ㅣ가-힣]+/g,''))});
  });

  // 랜덤 트렌드 몇 개 추가
  seeds.forEach(s=>{
    if(s && !trends.includes(s)) trends.unshift(s);
  });
  // 길이 조정
  trends = trends.slice(0,6);

  // 랜덤성 추가
  if(Math.random() > 0.6){
    trends.unshift(rand(['오늘의점심','화제','논란','이해불가','이슈발생']));
    trends = Array.from(new Set(trends)).slice(0,6);
  }

  renderTrends();
}

function renderTrends(){
  trendsList.innerHTML = '';
  trends.forEach(t=>{
    const li = document.createElement('li');
    li.textContent = `#${t}`;
    trendsList.appendChild(li);
  });
}

/* 초기화 */
function clearAll(){
  timeline.innerHTML = '';
  trends = [];
  renderTrends();
  notifCount = 0;
  notifBadge.textContent = 0;
}

/* 버튼 연결 */
postBtn.addEventListener('click', ()=>{
  const text = tweetInput.value.trim();
  if(!text) return alert('내용을 입력하세요.');
  runSimulation(text);
  tweetInput.value = '';
});

clearBtn.addEventListener('click', clearAll);

/* 초깃값 */
renderTrends();
