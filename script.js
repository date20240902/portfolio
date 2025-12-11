const navToggle = document.querySelector(".nav-toggle");
const navList = document.querySelector(".nav-list");
navToggle?.addEventListener("click", () => {
  navList?.classList.toggle("open");
});

window.addEventListener("click", (event) => {
  if (
    navList?.classList.contains("open") &&
    !event.composedPath().some((el) => el === navToggle || el === navList)
  ) {
    navList.classList.remove("open");
  }
});

// 크리스마스 눈송이 효과
document.addEventListener("DOMContentLoaded", () => {
  const heroNameContainer = document.querySelector(".hero-name-container");
  const snowflakesContainer = document.querySelector(".snowflakes");

  if (heroNameContainer && snowflakesContainer) {
    let snowflakeInterval = null;
    const snowflakeSymbols = ["❄", "❅", "❆", "✻", "✼", "✽"];

    function createSnowflake() {
      const snowflake = document.createElement("div");
      snowflake.className = "snowflake";
      snowflake.textContent = snowflakeSymbols[Math.floor(Math.random() * snowflakeSymbols.length)];
      
      // 텍스트 영역 내 랜덤 위치에서 시작
      const containerRect = heroNameContainer.getBoundingClientRect();
      const startX = Math.random() * containerRect.width;
      const startY = -20; // 텍스트 위쪽에서 시작
      
      snowflake.style.position = "absolute";
      snowflake.style.left = `${startX}px`;
      snowflake.style.top = `${startY}px`;
      snowflake.style.pointerEvents = "none";
      snowflake.style.userSelect = "none";
      
      // 랜덤 애니메이션 지속 시간 (0.8s ~ 1.2s)
      const duration = 0.8 + Math.random() * 0.4;
      snowflake.style.animationDuration = `${duration}s`;
      snowflake.style.animationName = "snowfall";
      snowflake.style.animationTimingFunction = "linear";
      snowflake.style.animationFillMode = "forwards";
      
      // 랜덤 좌우 이동 (각 눈송이마다 다른 값)
      const randomX = (Math.random() - 0.5) * 60;
      const randomRotate = Math.random() * 360;
      
      // CSS 변수로 랜덤 값 전달
      snowflake.style.setProperty("--random-x", `${randomX}px`);
      snowflake.style.setProperty("--random-rotate", `${randomRotate}deg`);
      
      snowflakesContainer.appendChild(snowflake);
      
      // 애니메이션 종료 후 제거
      setTimeout(() => {
        if (snowflake.parentNode) {
          snowflake.remove();
        }
      }, duration * 1000 + 100);
    }

    heroNameContainer.addEventListener("mouseenter", () => {
      // 마우스 진입 시 눈송이 생성 시작 (0.2초마다)
      if (snowflakeInterval) {
        clearInterval(snowflakeInterval);
      }
      createSnowflake(); // 즉시 하나 생성
      snowflakeInterval = setInterval(() => {
        createSnowflake();
      }, 200);
    });

    heroNameContainer.addEventListener("mouseleave", () => {
      // 마우스 떠날 때 눈송이 생성 중지
      if (snowflakeInterval) {
        clearInterval(snowflakeInterval);
        snowflakeInterval = null;
      }
    });
  }
});

// Hero Terminal-style Typewriter Effect (With Delete & Loop)
document.addEventListener("DOMContentLoaded", () => {
  const messages = [
    "난해한 기술을 쉬운 언어로 번역합니다",
    "흩어진 정보를 단단한 이야기로 구조화합니다",
    "더 넓은 세상으로 기술의 가치를 확산합니다"
  ];

  // 각 줄마다 다른 타이핑 속도와 시작 시간
  const configs = [
    { typeSpeed: 80, deleteSpeed: 50, initialDelay: 200 },   // 느리게, 빠르게 시작
    { typeSpeed: 60, deleteSpeed: 40, initialDelay: 600 },    // 중간 속도, 중간에 시작
    { typeSpeed: 100, deleteSpeed: 60, initialDelay: 1000 }  // 빠르게, 늦게 시작
  ];

  const DISPLAY_DURATION = 6000; // 6초 유지

  function createTypewriter(lineId, message, config) {
    const lineElement = document.getElementById(lineId);
    if (!lineElement) return;

    const textElement = lineElement.querySelector(".message-text");
    if (!textElement) return;

    let currentText = "";
    let timeoutId = null;
    let isTyping = true; // 타이핑 중인지 삭제 중인지 구분

    function type() {
      if (currentText.length < message.length) {
        // 타이핑 진행
        currentText = message.slice(0, currentText.length + 1);
        textElement.textContent = currentText;
        timeoutId = setTimeout(type, config.typeSpeed);
      } else {
        // 타이핑 완료 - 6초 대기 후 삭제 시작
        isTyping = false;
        timeoutId = setTimeout(() => {
          deleteText();
        }, DISPLAY_DURATION);
      }
    }

    function deleteText() {
      if (currentText.length > 0) {
        // 삭제 진행
        currentText = currentText.slice(0, -1);
        textElement.textContent = currentText;
        timeoutId = setTimeout(deleteText, config.deleteSpeed);
      } else {
        // 삭제 완료 - 다시 타이핑 시작 (무한 반복)
        isTyping = true;
        timeoutId = setTimeout(() => {
          type();
        }, 500); // 삭제 완료 후 잠시 대기 후 다시 시작
      }
    }

    // 각 줄마다 다른 초기 딜레이로 시작
    setTimeout(() => {
      type();
    }, config.initialDelay);

    // cleanup 함수 반환 (필요시 사용)
    return () => {
      if (timeoutId) clearTimeout(timeoutId);
    };
  }

  // 3개 줄 모두 독립적으로 시작 (다른 속도와 타이밍)
  createTypewriter("message-line-1", messages[0], configs[0]);
  createTypewriter("message-line-2", messages[1], configs[1]);
  createTypewriter("message-line-3", messages[2], configs[2]);
});

// (이전에 추가했던 히어로 타이포그래피 애니메이션은 모두 제거하여 기본 상태로 되돌렸습니다.)

// 기고 브랜드 데이터
const articlesByBrand = {
  kb: {
    name: "KB",
    logo: "assets/logo-kb.png.png",
    mission: "**KB** | '기술을 아는 금융' 브랜딩",
    articles: [
      { title: "하이브의 엔터테인먼트 혁신, 위버스로 만들어가는 글로벌 팬 커뮤니티", url: "https://kbthink.com/life/daily/hybe.html" },
      { title: "스포티파이 플레이리스트 추천 기술, AI DJ와 함께하는 음악 경험", url: "https://kbthink.com/life/daily/spotify.html" },
      { title: "AI 에이전트란? 활용 사례와 발전 방향 알아보기", url: "https://kbthink.com/life/daily/ai-agent.html" },
      { title: "전체보기", url: "https://kbthink.com/search/result.html?sk=%EC%9D%B4%EC%9E%AC%ED%9B%88" },
    ],
  },
  skt: {
    name: "SKT",
    logo: "assets/logo-skt.png.png",
    mission: "**SKT** | AI 기술 리더십 전파",
    articles: [
      { title: "SK AI SUMMIT 2025, SK가 그린 AI 인프라의 미래", url: "https://www.sktelecom.com/webzine/lib/tstory_detail.do?index=52&currentPage=1&keyword=" },
      { title: "GPU, 대체 뭐길래 다들 난리일까?", url: "https://www.sktelecom.com/webzine/lib/insight_detail.do?index=40&currentPage=1&keyword=" },
    ],
  },
  hyundaicard: {
    name: "현대카드",
    logo: "assets/logo-hyundaicard.png.png",
    mission: "**현대카드** | 테크와 라이프스타일의 연결",
    articles: [
      {
        title: "AI 시대, 기업도 뭉쳐야 산다",
        url: "https://newsroom.hyundaicard.com/front/board/TECHITSSUE-AI-%EC%8B%9C%EB%8C%80-%EA%B8%B0%EC%97%85%EB%8F%84-%EB%AD%89%EC%B3%90%EC%95%BC-%EC%82%B0%EB%8B%A4?bbsSeq=2204&menuCategory=MNC002&contentCategory=&topMenuCd=FMC002&sort=1&noImageContent=Y",
      },
      {
        title: "우리 삶과 가까워지는 안전하고 빠른 결제 'EMV 컨택리스'",
        url: "https://newsroom.hyundaicard.com/front/board/TECHITSSUE-%EC%9A%B0%EB%A6%AC-%EC%82%B6%EA%B3%BC-%EA%B0%80%EA%B9%8C%EC%9B%8C%EC%A7%80%EB%8A%94-%EC%95%88%EC%A0%84%ED%95%98%EA%B3%A0-%EB%B9%A0%EB%A5%B8-%EA%B2%B0%EC%A0%9C-EMV-%EC%BB%A8%ED%83%9D%EB%A6%AC%EC%8A%A4?bbsSeq=2099&menuCategory=MNC002&contentCategory=&topMenuCd=FMC002&sort=1&noImageContent=Y",
      },
      {
        title: "나보다 나를 더 잘 아는 추천 알고리즘",
        url: "https://newsroom.hyundaicard.com/front/board/TECHITSSUE-%EB%82%98%EB%B3%B4%EB%8B%A4-%EB%82%98%EB%A5%BC-%EB%8D%94-%EC%9E%98-%EC%95%84%EB%8A%94-%EC%B6%94%EC%B2%9C-%EC%95%8C%EA%B3%A0%EB%A6%AC%EC%A6%98?bbsSeq=2049&menuCategory=MNC002&contentCategory=&topMenuCd=FMC002&sort=1&noImageContent=Y",
      },
    ],
  },
  outstanding: {
    name: "아웃스탠딩",
    logo: "assets/logo-outstanding.png.png",
    mission: "**아웃스탠딩** | 글로벌 빅테크 전략 딥다이브",
    articles: [
      { title: "아마존에서 현대차를 구입할 수 있는 시대가 열립니다", url: "https://outstanding.kr/amazonhyundai20231205" },
      { title: "오픈AI와 어깨를 나란히 하고 엔비디아가 투자한 한국 AI 스타트업 '트웰브랩스'", url: "https://outstanding.kr/twelvelabs20231026" },
      { title: "AI, X, TESLA.. 일론 머스크는 왜 프리미엄 도메인을 사랑하나", url: "https://outstanding.kr/premiundomain20230911" },
      { title: "전체보기", url: "https://outstanding.kr/search_detail/%EC%9D%B4%EC%9E%AC%ED%9B%88" },
    ],
  },
  yozmit: {
    name: "요즘IT",
    logo: "assets/logo-yozmit.png.png",
    mission: "**요즘IT** | 실무 중심 IT 트렌드",
    articles: [
      { title: "챗GPT 보고 사표 쓴 비전공자, IT 커뮤니케이터가 되다", url: "https://yozm.wishket.com/magazine/detail/3471/" },
      { title: "2024년 가트너 10대 전략 기술 트렌드 톺아보기", url: "https://yozm.wishket.com/magazine/detail/2298/" },
      { title: "더 이상 외면할 수 없는 양자컴퓨터", url: "https://yozm.wishket.com/magazine/detail/2888/" },
      { title: "전체보기", url: "https://yozm.wishket.com/magazine/@jhjh126/" },
    ],
  },
  yozmit2: {
    name: "제일기획",
    logo: "assets/logo-cheil.png.png",
    mission: "**제일기획** | 테크가 바꾸는 엔터테인먼트와 마케팅",
    articles: [
      {
        title: "[Cheil Magazine] 엔터테인먼트 허브로 진화하는 거실",
        url: "https://magazine.cheil.com/57425",
      },
    ],
  },
  channelExpansion: {
    name: "Channel Expansion",
    layout: "grid", // 그리드 레이아웃 사용
    title: "Channel Expansion",
    description: "다양한 플랫폼의 성격에 맞춘 콘텐츠 확산 (OSMU)",
    items: [
      { name: "브런치스토리", role: "IT 분야 크리에이터", url: "https://brunch.co.kr/@dldyfm", logo: "assets/logo-brunchstory.png.png" },
      { name: "오픈애즈", role: "인사이터", url: "https://www.openads.co.kr/insighter/insighterDetail?authorId=541", logo: "assets/logo-openads.png.png" },
      { name: "뉴닉", role: "공식 크리에이터", url: "https://newneek.co/@techissue", logo: "assets/logo-newneek.png.png" },
      { name: "이오플래닛", role: "주목받는 멤버", url: "https://eopla.net/users?user=%EC%9D%B4%EC%9E%AC%ED%9B%88%24824840", logo: "assets/logo-eoplanet.png.png" },
    ],
  },
};

// 강연 데이터
const lectures = [
  {
    badge: "Future Gen",
    client: "동탄국제고",
    topic: "AI로 그리는 미래 시대 준비",
    description: "청소년을 위한 AI 리터러시 특강",
    image: "assets/lecture-1.jpg.jpg",
  },
  {
    badge: "Startup",
    client: "대전 스타트업스쿨",
    topic: "스타트업 성장을 위한 전략적 뉴스레터 구축",
    description: "",
    image: "assets/lecture-5.jpg.jpg.jpg",
  },
  {
    badge: "Corporate",
    client: "아이에이클라우드",
    topic: "사내 임직원 대상 생성형 AI 워크샵",
    description: "",
    image: "assets/lecture-2.jpg.jpg",
  },
  {
    badge: "Book Talk",
    client: "샘 올트먼, 더 비전 2030",
    topic: "저자 북토크 & AI 인사이트 강연",
    description: "",
    image: "assets/lecture-4.jpg.jpg.jpg",
  },
  {
    badge: "Workshop",
    client: "플렉스웍",
    topic: "4주만에 만드는 나만의 뉴스레터 (총 3기 진행)",
    description: "",
    image: "assets/lecture-6.jpg,jpg.jpg",
  },
];

// 캐러셀 클래스 (강연용)
class Carousel {
  constructor(containerId, items, renderSlide, isArticle = false) {
    this.track = document.getElementById(containerId);
    this.items = items;
    this.currentIndex = 0;
    this.renderSlide = renderSlide;
    this.isArticle = isArticle;
    this.isTransitioning = false;
    this.touchStartX = 0;
    this.touchEndX = 0;

    if (!this.track) return;

    this.init();
  }

  init() {
    this.render();
    this.attachEvents();
  }

  render() {
    const slides = [];
    const totalItems = this.items.length;

    // 앞뒤에 복제 슬라이드 추가해서 부드러운 무한 루프 구현
    for (let i = 0; i < totalItems + 2; i++) {
      let index;
      if (i === 0) {
        index = totalItems - 1; // 첫 번째: 마지막 아이템 (앞쪽 복제)
      } else if (i === totalItems + 1) {
        index = 0; // 마지막: 첫 번째 아이템 (뒤쪽 복제)
      } else {
        index = i - 1; // 중간: 실제 아이템들
      }
      const item = this.items[index];
      const position = i === 0 ? -1 : i === totalItems + 1 ? 1 : 0;
      const slide = this.renderSlide(item, index, position);
      slides.push(slide);
    }

    this.track.innerHTML = slides.join("");
    this.updatePosition();
  }

  updatePosition() {
    if (!this.track) return;
    // 첫 번째 복제 슬라이드를 제외하고 현재 인덱스만큼 이동
    const baseIndex = this.currentIndex + 1;
    const offset = -baseIndex * 100;
    this.track.style.transform = `translateX(${offset}%)`;
  }

  goToNext() {
    if (this.isTransitioning) return;
    this.isTransitioning = true;
    this.currentIndex++;
    this.updatePosition();

    setTimeout(() => {
      if (this.currentIndex >= this.items.length) {
        // 마지막에 도달하면 첫 번째로 점프 (애니메이션 없이)
        this.track.style.transition = "none";
        this.currentIndex = 0;
        this.updatePosition();
        setTimeout(() => {
          this.track.style.transition = "transform 0.5s cubic-bezier(0.4, 0, 0.2, 1)";
          this.isTransitioning = false;
        }, 50);
      } else {
        this.isTransitioning = false;
      }
    }, 500);
  }

  goToPrev() {
    if (this.isTransitioning) return;
    this.isTransitioning = true;
    this.currentIndex--;

    // 우선 현재 인덱스 기준으로 한 칸 왼쪽으로 애니메이션
    this.updatePosition();

    setTimeout(() => {
      if (this.currentIndex < 0) {
        // 첫 화면에서 왼쪽 화살표를 눌렀을 때:
        // 1) 클론 슬라이드까지 자연스럽게 이동한 뒤
        // 2) 애니메이션 없이 진짜 마지막 슬라이드 위치로 점프
        this.track.style.transition = "none";
        this.currentIndex = this.items.length - 1;
        this.updatePosition();
        setTimeout(() => {
          this.track.style.transition = "transform 0.5s cubic-bezier(0.4, 0, 0.2, 1)";
          this.isTransitioning = false;
        }, 50);
      } else {
        this.isTransitioning = false;
      }
    }, 500);
  }

  attachEvents() {
    const wrapper = this.track.closest(".carousel-wrapper");
    if (!wrapper) return;

    const prevBtn = wrapper.querySelector(".carousel-btn-prev");
    const nextBtn = wrapper.querySelector(".carousel-btn-next");

    if (prevBtn) prevBtn.addEventListener("click", () => this.goToPrev());
    if (nextBtn) nextBtn.addEventListener("click", () => this.goToNext());

    // 터치 이벤트
    let touchStartX = 0;
    let touchEndX = 0;

    this.track.addEventListener("touchstart", (e) => {
      touchStartX = e.changedTouches[0].screenX;
    });

    this.track.addEventListener("touchend", (e) => {
      touchEndX = e.changedTouches[0].screenX;
      const swipeThreshold = 50;
      const diff = touchStartX - touchEndX;

      if (Math.abs(diff) > swipeThreshold) {
        if (diff > 0) {
          this.goToNext();
        } else {
          this.goToPrev();
        }
      }
    });
  }
}

// 기고 company-carousel 초기화
function initCompanyCarousel() {
  const carousel = document.querySelector(".company-carousel");
  if (!carousel) return;

  const track = carousel.querySelector(".company-carousel__track");
  const prevBtn = carousel.querySelector(".company-carousel__nav--prev");
  const nextBtn = carousel.querySelector(".company-carousel__nav--next");

  const originalSlides = Array.from(track.children);
  const slideCount = originalSlides.length;
  if (!slideCount) return;

  // 앞뒤에 클론 슬라이드를 추가해 자연스러운 루프 구현
  const firstClone = originalSlides[0].cloneNode(true);
  const lastClone = originalSlides[slideCount - 1].cloneNode(true);
  track.insertBefore(lastClone, originalSlides[0]);
  track.appendChild(firstClone);

  let index = 0; // 실제 슬라이드 인덱스 (0 ~ slideCount-1)
  let isTransitioning = false;
  let animationTimeout = null; // 애니메이션 타이머 추적

  const setTransition = (enabled) => {
    track.style.transition = enabled ? "transform 0.35s ease" : "none";
  };

  const update = (withAnimation = true) => {
    setTransition(withAnimation);
    const offset = -(index + 1) * 100; // 앞쪽 클론 한 개(1슬라이드) 보정
    track.style.transform = `translateX(${offset}%)`;
    
    // 슬라이드 변경 시 로고와 mission 텍스트 fade-in 애니메이션
    if (withAnimation) {
      // 이전 애니메이션 타이머가 있으면 취소
      if (animationTimeout) {
        clearTimeout(animationTimeout);
        animationTimeout = null;
      }
      
      // 모든 슬라이드의 identity 요소를 초기 상태로 리셋
      const allSlides = track.children;
      for (let i = 0; i < allSlides.length; i++) {
        const slide = allSlides[i];
        const identityElement = slide.querySelector(".carousel-brand-identity");
        if (identityElement) {
          identityElement.style.transition = "none";
          identityElement.style.opacity = "0";
          identityElement.style.transform = "translateY(10px)";
        }
      }
      
      animationTimeout = setTimeout(() => {
        const currentSlide = track.children[index + 1]; // 앞쪽 클론 보정
        if (currentSlide) {
          const identityElement = currentSlide.querySelector(".carousel-brand-identity");
          
          if (identityElement) {
            // 리플로우 강제
            void identityElement.offsetHeight;
            
            // 현재 슬라이드만 애니메이션 시작
            identityElement.style.transition = "opacity 0.6s ease-out, transform 0.6s ease-out";
            identityElement.style.opacity = "1";
            identityElement.style.transform = "translateY(0)";
          }
        }
        animationTimeout = null;
      }, 200); // 슬라이드 전환 후 약간의 딜레이
    } else {
      // 애니메이션 없이 위치만 조정할 때는 현재 슬라이드의 identity 요소를 표시 상태로 유지
      const currentSlide = track.children[index + 1]; // 앞쪽 클론 보정
      if (currentSlide) {
        const identityElement = currentSlide.querySelector(".carousel-brand-identity");
        if (identityElement) {
          // 다른 슬라이드들은 숨기기
          const allSlides = track.children;
          for (let i = 0; i < allSlides.length; i++) {
            if (i !== index + 1) {
              const slide = allSlides[i];
              const otherIdentityElement = slide.querySelector(".carousel-brand-identity");
              if (otherIdentityElement) {
                otherIdentityElement.style.transition = "none";
                otherIdentityElement.style.opacity = "0";
                otherIdentityElement.style.transform = "translateY(10px)";
              }
            }
          }
          // 현재 슬라이드는 표시 상태 유지
          identityElement.style.transition = "none";
          identityElement.style.opacity = "1";
          identityElement.style.transform = "translateY(0)";
        }
      }
    }
  };

  const goPrev = () => {
    if (isTransitioning) return;
    isTransitioning = true;
    index -= 1;
    update(true);
  };

  const goNext = () => {
    if (isTransitioning) return;
    isTransitioning = true;
    index += 1;
    update(true);
  };

  if (prevBtn) prevBtn.addEventListener("click", goPrev);
  if (nextBtn) nextBtn.addEventListener("click", goNext);

  // 전환이 끝난 뒤 경계에서 위치 보정 (점프는 애니메이션 없이)
  track.addEventListener("transitionend", () => {
    if (index < 0) {
      index = slideCount - 1;
      update(false);
    } else if (index >= slideCount) {
      index = 0;
      update(false);
    }
    isTransitioning = false;
  });

  // 간단한 스와이프 (모바일)
  let startX = 0;
  let isDragging = false;

  carousel.addEventListener("touchstart", (e) => {
    startX = e.touches[0].clientX;
    isDragging = true;
    isPaused = true; // 터치 시작 시 자동 넘김 일시정지
  });

  carousel.addEventListener("touchmove", (e) => {
    if (!isDragging) return;
    const dx = e.touches[0].clientX - startX;
    if (Math.abs(dx) > 40) {
      isDragging = false;
      if (dx > 0) {
        goPrev();
      } else {
        goNext();
      }
    }
  });

  carousel.addEventListener("touchend", () => {
    isDragging = false;
    // 터치 종료 후 약간의 딜레이를 두고 재개
    setTimeout(() => {
      isPaused = false;
    }, 500);
  });

  // 데스크톱용 마우스 드래그 제스처
  let mouseStartX = 0;
  let isMouseDown = false;

  const handleMouseDown = (e) => {
    mouseStartX = e.clientX;
    isMouseDown = true;
  };

  const handleMouseMove = (e) => {
    if (!isMouseDown) return;
    const dx = e.clientX - mouseStartX;
    if (Math.abs(dx) > 40) {
      isMouseDown = false;
      if (dx > 0) {
        goPrev();
      } else {
        goNext();
      }
    }
  };

  const handleMouseUpOrLeave = () => {
    isMouseDown = false;
  };

  carousel.addEventListener("mousedown", handleMouseDown);
  carousel.addEventListener("mousemove", handleMouseMove);
  carousel.addEventListener("mouseup", handleMouseUpOrLeave);
  carousel.addEventListener("mouseleave", handleMouseUpOrLeave);

  // 초기 위치: 첫 번째 실제 슬라이드
  update(false);

  // 자동 넘김 기능
  let autoPlayInterval = null;
  let isPaused = false;

  const startAutoPlay = () => {
    if (autoPlayInterval) clearInterval(autoPlayInterval);
    autoPlayInterval = setInterval(() => {
      if (!isPaused && !isTransitioning) {
        goNext();
      }
    }, 6000);
  };

  const stopAutoPlay = () => {
    if (autoPlayInterval) {
      clearInterval(autoPlayInterval);
      autoPlayInterval = null;
    }
  };

  // 호버 시 일시정지
  carousel.addEventListener("mouseenter", () => {
    isPaused = true;
  });

  carousel.addEventListener("mouseleave", () => {
    isPaused = false;
  });

  // 모바일 터치 중 일시정지
  carousel.addEventListener("touchstart", () => {
    isPaused = true;
  });

  carousel.addEventListener("touchend", () => {
    // 터치 종료 후 약간의 딜레이를 두고 재개
    setTimeout(() => {
      isPaused = false;
    }, 500);
  });

  // 자동 넘김 시작
  startAutoPlay();

  // 페이지 언마운트 시 타이머 정리
  const cleanup = () => {
    stopAutoPlay();
  };

  // 페이지 언로드 시 정리
  window.addEventListener("beforeunload", cleanup);
}

// 강연 캐러셀 초기화 (한 번에 1개 슬라이드)
function initLectureCarousel() {
  const wrapper = document.querySelector(".collab-card-lecture .carousel-wrapper");
  if (!wrapper) return;

  const track = wrapper.querySelector(".carousel-track");
  const prevBtn = wrapper.querySelector(".carousel-btn-prev");
  const nextBtn = wrapper.querySelector(".carousel-btn-next");

  if (!track) return;

  // 슬라이드 마크업 생성: 강연 1개당 슬라이드 1개
  track.innerHTML = lectures
    .map(
      (lecture) => `
    <div class="carousel-slide">
      <div class="lecture-card">
        <div class="lecture-card-image-wrapper">
          <img src="${lecture.image}" alt="${lecture.topic}" class="lecture-card-image" onerror="this.style.display='none'">
          <span class="lecture-badge">${lecture.badge}</span>
        </div>
        <div class="lecture-card-content">
          <div class="lecture-client">${lecture.client}</div>
          <h4 class="lecture-topic">${lecture.topic}</h4>
          ${lecture.description ? `<p class="lecture-description">${lecture.description}</p>` : ''}
        </div>
      </div>
    </div>`
    )
    .join("");

  const originalSlides = Array.from(track.children);
  const slideCount = originalSlides.length;
  if (!slideCount) return;

  // 앞뒤에 클론 슬라이드를 추가해 자연스러운 루프 구현
  const firstClone = originalSlides[0].cloneNode(true);
  const lastClone = originalSlides[slideCount - 1].cloneNode(true);
  track.insertBefore(lastClone, originalSlides[0]);
  track.appendChild(firstClone);

  let index = 0; // 실제 슬라이드 인덱스 (0 ~ slideCount-1)
  let isTransitioning = false;

  const setTransition = (enabled) => {
    track.style.transition = enabled ? "transform 0.35s ease" : "none";
  };

  const update = (withAnimation = true) => {
    setTransition(withAnimation);
    const offset = -(index + 1) * 100; // 앞쪽 클론 한 개(1슬라이드) 보정
    track.style.transform = `translateX(${offset}%)`;
  };

  const goPrev = () => {
    if (isTransitioning) return;
    isTransitioning = true;
    index -= 1;
    update(true);
  };

  const goNext = () => {
    if (isTransitioning) return;
    isTransitioning = true;
    index += 1;
    update(true);
  };

  if (prevBtn) prevBtn.addEventListener("click", goPrev);
  if (nextBtn) nextBtn.addEventListener("click", goNext);

  // 전환이 끝난 뒤 경계에서 위치 보정 (점프는 애니메이션 없이)
  track.addEventListener("transitionend", () => {
    if (index < 0) {
      index = slideCount - 1;
      update(false);
    } else if (index >= slideCount) {
      index = 0;
      update(false);
    }
    isTransitioning = false;
  });

  // 모바일 스와이프
  let startX = 0;
  let isDragging = false;

  wrapper.addEventListener("touchstart", (e) => {
    startX = e.touches[0].clientX;
    isDragging = true;
    isPaused = true; // 터치 시작 시 자동 넘김 일시정지
  });

  wrapper.addEventListener("touchmove", (e) => {
    if (!isDragging) return;
    const dx = e.touches[0].clientX - startX;
    if (Math.abs(dx) > 40) {
      isDragging = false;
      if (dx > 0) {
        goPrev();
      } else {
        goNext();
      }
    }
  });

  wrapper.addEventListener("touchend", () => {
    isDragging = false;
    // 터치 종료 후 약간의 딜레이를 두고 재개
    setTimeout(() => {
      isPaused = false;
    }, 500);
  });

  // 초기 위치: 첫 번째 실제 슬라이드
  update(false);

  // 데스크톱용 마우스 드래그 제스처
  let mouseStartX = 0;
  let isMouseDown = false;

  const handleMouseDown = (e) => {
    mouseStartX = e.clientX;
    isMouseDown = true;
  };

  const handleMouseMove = (e) => {
    if (!isMouseDown) return;
    const dx = e.clientX - mouseStartX;
    if (Math.abs(dx) > 40) {
      isMouseDown = false;
      if (dx > 0) {
        goPrev();
      } else {
        goNext();
      }
    }
  };

  const handleMouseUpOrLeave = () => {
    isMouseDown = false;
  };

  wrapper.addEventListener("mousedown", handleMouseDown);
  wrapper.addEventListener("mousemove", handleMouseMove);
  wrapper.addEventListener("mouseup", handleMouseUpOrLeave);
  wrapper.addEventListener("mouseleave", handleMouseUpOrLeave);

  // 자동 넘김 기능
  let autoPlayInterval = null;
  let isPaused = false;

  const startAutoPlay = () => {
    if (autoPlayInterval) clearInterval(autoPlayInterval);
    autoPlayInterval = setInterval(() => {
      if (!isPaused && !isTransitioning) {
        goNext();
      }
    }, 6000);
  };

  const stopAutoPlay = () => {
    if (autoPlayInterval) {
      clearInterval(autoPlayInterval);
      autoPlayInterval = null;
    }
  };

  // 호버 시 일시정지
  wrapper.addEventListener("mouseenter", () => {
    isPaused = true;
  });

  wrapper.addEventListener("mouseleave", () => {
    isPaused = false;
  });


  // 자동 넘김 시작
  startAutoPlay();

  // 페이지 언마운트 시 타이머 정리
  const cleanup = () => {
    stopAutoPlay();
  };

  // 페이지 언로드 시 정리
  window.addEventListener("beforeunload", cleanup);
}

// Collaboration 타임라인 초기화
document.addEventListener("DOMContentLoaded", () => {
  const timelineItemsContainer = document.getElementById("collaboration-timeline-items");
  if (!timelineItemsContainer) return;

  // Mission 텍스트의 **키워드** 형식을 <strong> 태그로 변환하는 함수
  const formatMission = (text) => {
    if (!text) return "";
    return text.replace(/\*\*(.*?)\*\*/g, "<strong>$1</strong>");
  };

  // 제목 텍스트의 **강조** 형식을 <strong> 태그로 변환하는 함수
  const formatTitle = (text) => {
    if (!text) return "";
    return text.replace(/\*\*(.*?)\*\*/g, "<strong>$1</strong>");
  };

  // 기고 데이터를 배열로 변환 (그리드 레이아웃 제외)
  const brandKeys = Object.keys(articlesByBrand).filter(
    (key) => articlesByBrand[key].layout !== "grid"
  );

  const timelineHTML = brandKeys
    .map((key, index) => {
      const brand = articlesByBrand[key];
      const hasLogo = brand.logo && brand.logo.trim() !== "";
      const isOdd = index % 2 === 0; // 0-based index이므로 홀수 번째 = 짝수 인덱스

      return `
    <div class="collaboration-timeline-item" data-index="${index}">
      <!-- 중앙 로고 배지 -->
      <div class="collaboration-timeline-badge">
        ${hasLogo ? `
        <img
          src="${brand.logo}"
          alt="${brand.name}"
          onerror="this.style.display='none'; this.parentElement.innerHTML='<div style=\\'color: #275EFE; font-weight: 700; font-size: 1.2rem;\\'>${brand.name}</div>'"
        >` : `
        <div style="color: #275EFE; font-weight: 700; font-size: 1.2rem; text-align: center;">
          ${brand.name}
        </div>
        `}
      </div>
      
      <!-- 연결선 -->
      <div class="collaboration-timeline-connector"></div>
      
      <!-- 글래스모피즘 카드 -->
      <div class="collaboration-timeline-card">
        <div class="collaboration-timeline-mission">
          ${formatMission(brand.mission || "")}
        </div>
        <p class="collaboration-timeline-content-label">주요 콘텐츠</p>
        <ul class="collaboration-timeline-articles">
          ${brand.articles
            .map(
              (article) => `
            <li class="collaboration-timeline-article-item">
              <a href="${article.url}" target="_blank" rel="noreferrer" class="collaboration-timeline-article-link">
                ${formatTitle(article.title)}
                <span class="external-icon">↗</span>
              </a>
            </li>
          `
            )
            .join("")}
        </ul>
      </div>
    </div>`;
    })
    .join("");

  timelineItemsContainer.innerHTML = timelineHTML;

  // 스크롤 애니메이션 및 자동 카드 열기 초기화
  initCollaborationTimelineAnimation();
});


// Collaboration 타임라인 스크롤 애니메이션 및 자동 카드 열기
function initCollaborationTimelineAnimation() {
  const timelineItems = document.querySelectorAll(".collaboration-timeline-item");
  if (timelineItems.length === 0) return;

  let activeItem = null;

  const observerOptions = {
    root: null,
    rootMargin: "-20% 0px -20% 0px", // 뷰포트 중앙 근처에 도착했을 때
    threshold: [0, 0.3, 0.5, 0.7, 1],
  };

  const itemObserver = new IntersectionObserver((entries) => {
    // 가장 뷰포트 중앙에 가까운 아이템 찾기
    let closestItem = null;
    let closestDistance = Infinity;

    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        const rect = entry.boundingClientRect;
        const viewportCenter = window.innerHeight / 2;
        const itemCenter = rect.top + rect.height / 2;
        const distance = Math.abs(itemCenter - viewportCenter);

        if (distance < closestDistance) {
          closestDistance = distance;
          closestItem = entry.target;
        }

        // 로고 애니메이션 클래스 추가
        if (!entry.target.classList.contains("animate")) {
          setTimeout(() => {
            entry.target.classList.add("animate");
          }, 200);
        }
      }
    });

    // 가장 가까운 아이템의 카드 열기 (한 번 열린 카드는 유지)
    if (closestItem) {
      const card = closestItem.querySelector(".collaboration-timeline-card");
      const badge = closestItem.querySelector(".collaboration-timeline-badge");

      if (card && badge && !card.classList.contains("is-visible")) {
        // 새로운 카드 표시 (기존 카드는 닫지 않음)
        card.classList.add("is-visible", "was-visible");
        badge.classList.add("is-active");
      }
    }
  }, observerOptions);

  // 각 타임라인 항목을 개별적으로 관찰
  timelineItems.forEach((item) => {
    itemObserver.observe(item);
  });

  // 스크롤 이벤트로도 업데이트 (더 부드러운 반응)
  let scrollTimeout;
  window.addEventListener("scroll", () => {
    clearTimeout(scrollTimeout);
    scrollTimeout = setTimeout(() => {
      // 스크롤이 멈추면 가장 가까운 아이템 찾기
      let closestItem = null;
      let closestDistance = Infinity;

      timelineItems.forEach((item) => {
        const rect = item.getBoundingClientRect();
        if (rect.top < window.innerHeight && rect.bottom > 0) {
          const viewportCenter = window.innerHeight / 2;
          const itemCenter = rect.top + rect.height / 2;
          const distance = Math.abs(itemCenter - viewportCenter);

          if (distance < closestDistance) {
            closestDistance = distance;
            closestItem = item;
          }
        }
      });

      // 가장 가까운 아이템의 카드 열기 (한 번 열린 카드는 유지)
      if (closestItem) {
        const card = closestItem.querySelector(".collaboration-timeline-card");
        const badge = closestItem.querySelector(".collaboration-timeline-badge");

        if (card && badge && !card.classList.contains("is-visible")) {
          // 새로운 카드 표시 (기존 카드는 닫지 않음)
          card.classList.add("is-visible", "was-visible");
          badge.classList.add("is-active");
        }
      }
    }, 100);
  });
}

// Newsletter 브랜드 뱃지 및 패널 인터랙션
const brandedContentByBrand = {
  skt: [
    { title: "에이닷, 이렇게 좋은데 외않써?", url: "https://stibee.com/api/v1.0/emails/share/LPctRbs-Mm2mf3V-VqvMpcugcyuAt6s" },
  ],
  aws: [
    { title: "기업에서는 AI를 어떻게 활용할까?", url: "https://stibee.com/api/v1.0/emails/share/usVDUAqmRAAiLRi92GVSoN8hqj14-xs" },
  ],
  musinsa: [
    { title: "약은 약사에게, 글로벌 진출은 무신사에게?", url: "https://stibee.com/api/v1.0/emails/share/N7xFjdPHrYNUnO1qJyxeeVpF-2pLyTA" },
  ],
  crowdworks: [
    { title: "AI 에이전트의 문턱, AIpy가 낮추다", url: "https://stibee.com/api/v1.0/emails/share/siOQdTN3R6EL4nVCPA_ioJbLnbJFWj8" },
  ],
  eastsoft: [
    { title: "한국의 퍼플렉시티, 제가 먼저 알아보았습니다", url: "https://stibee.com/api/v1.0/emails/share/VxLN_fOl6OdGjs6K_0MoK29jmavRhps" },
  ],
  nhncommerce: [
    { title: "세상에 나쁜 쇼핑몰은 없다", url: "https://stibee.com/api/v1.0/emails/share/QW_muqoIJqBIy28calJxToB0bwpXfbY" },
  ],
  willbook: [
    { title: "거장 '헨리 키신저', AI 시대에 남긴 마지막 조언", url: "https://stibee.com/api/v1.0/emails/share/AumFfmeFKJeSCIyYPzC-BPAwdymyzF4" },
  ],
};

const brandNames = {
  skt: "SKT",
  aws: "AWS",
  musinsa: "무신사",
  crowdworks: "크라우드웍스",
  eastsoft: "이스트소프트",
  nhncommerce: "NHN커머스",
  willbook: "윌북",
};

document.addEventListener("DOMContentLoaded", () => {
  const brandBadges = document.querySelectorAll(".brand-badge");
  const brandedContentBtn = document.querySelector(".branded-content-btn");
  const brandedPanelOverlay = document.querySelector(".branded-panel-overlay");
  const brandedPanel = document.querySelector(".branded-panel");
  const panelClose = document.querySelector(".panel-close");
  const panelBrandName = document.querySelector(".panel-brand-name");
  const panelBrandDesc = document.querySelector(".panel-brand-desc");
  const panelContentList = document.querySelector(".panel-content-list");

  if (!brandedPanelOverlay || !brandedPanel || !panelClose || !panelBrandName || !panelBrandDesc || !panelContentList) return;

  const openPanel = (brandKey) => {
    const brandName = brandNames[brandKey] || brandKey;
    const contents = brandedContentByBrand[brandKey] || [];

    // 브랜드명 설정
    panelBrandName.textContent = brandName;
    // 설명 숨기기 (개별 브랜드 선택 시)
    panelBrandDesc.textContent = "";
    panelBrandDesc.style.display = "none";

    // 콘텐츠 리스트 렌더링
    panelContentList.innerHTML = "";
    if (contents.length === 0) {
      const emptyItem = document.createElement("li");
      emptyItem.textContent = "콘텐츠를 준비 중입니다.";
      panelContentList.appendChild(emptyItem);
    } else {
      contents.forEach((content) => {
        const listItem = document.createElement("li");
        const link = document.createElement("a");
        link.href = content.url;
        link.target = "_blank";
        link.rel = "noreferrer";
        link.textContent = content.title;
        listItem.appendChild(link);
        panelContentList.appendChild(listItem);
      });
    }

    // 뱃지 활성화 상태 업데이트
    brandBadges.forEach((badge) => {
      badge.classList.remove("is-active");
      if (badge.dataset.brand === brandKey) {
        badge.classList.add("is-active");
      }
    });

    // 브랜디드 콘텐츠 버튼 활성화 상태 제거
    if (brandedContentBtn) {
      brandedContentBtn.classList.remove("is-active");
    }

    // 패널 열기
    brandedPanelOverlay.classList.add("is-open");
    document.body.style.overflow = "hidden"; // 스크롤 방지
  };

  const openAllBrandsPanel = () => {
    // 모든 브랜드 콘텐츠를 합쳐서 표시
    panelBrandName.textContent = "브랜디드 콘텐츠";
    // 설명 표시
    panelBrandDesc.textContent = "TECHITSSUE를 통해 발행된 브랜디드 콘텐츠를 모았습니다.";
    panelBrandDesc.style.display = "block";

    panelContentList.innerHTML = "";

    // 모든 브랜드의 콘텐츠를 "기업명 | 제목" 형식으로 표시
    Object.keys(brandedContentByBrand).forEach((brandKey) => {
      const brandName = brandNames[brandKey] || brandKey;
      const contents = brandedContentByBrand[brandKey] || [];

      // 해당 브랜드의 콘텐츠들
      contents.forEach((content) => {
        const listItem = document.createElement("li");
        const link = document.createElement("a");
        link.href = content.url;
        link.target = "_blank";
        link.rel = "noreferrer";
        link.textContent = `${brandName} | ${content.title}`;
        listItem.appendChild(link);
        panelContentList.appendChild(listItem);
      });
    });

    // 뱃지 활성화 상태 제거
    brandBadges.forEach((badge) => {
      badge.classList.remove("is-active");
    });

    // 브랜디드 콘텐츠 버튼 활성화
    if (brandedContentBtn) {
      brandedContentBtn.classList.add("is-active");
    }

    // 패널 열기
    brandedPanelOverlay.classList.add("is-open");
    document.body.style.overflow = "hidden"; // 스크롤 방지
  };

  const closePanel = () => {
    brandedPanelOverlay.classList.remove("is-open");
    document.body.style.overflow = ""; // 스크롤 복원
    // 뱃지 활성화 상태 제거
    brandBadges.forEach((badge) => {
      badge.classList.remove("is-active");
    });
    // 브랜디드 콘텐츠 버튼 활성화 상태 제거
    if (brandedContentBtn) {
      brandedContentBtn.classList.remove("is-active");
    }
  };

  // 브랜디드 콘텐츠 버튼 클릭 이벤트
  if (brandedContentBtn) {
    brandedContentBtn.addEventListener("click", () => {
      if (brandedPanelOverlay.classList.contains("is-open")) {
        // 이미 열려있고 브랜디드 콘텐츠 버튼이 활성화되어 있으면 닫기
        if (brandedContentBtn.classList.contains("is-active")) {
          closePanel();
        } else {
          // 다른 브랜드가 열려있으면 모든 브랜드 콘텐츠로 변경
          openAllBrandsPanel();
        }
      } else {
        // 닫혀있으면 모든 브랜드 콘텐츠 열기
        openAllBrandsPanel();
      }
    });
  }

  // 뱃지 클릭 이벤트
  brandBadges.forEach((badge) => {
    badge.addEventListener("click", () => {
      const brandKey = badge.dataset.brand;
      if (brandedPanelOverlay.classList.contains("is-open")) {
        // 이미 열려있고 같은 브랜드면 닫기
        if (badge.classList.contains("is-active")) {
          closePanel();
        } else {
          // 다른 브랜드면 내용만 변경
          openPanel(brandKey);
        }
      } else {
        // 닫혀있으면 열기
        openPanel(brandKey);
      }
    });
  });

  // 닫기 버튼 클릭 이벤트
  panelClose.addEventListener("click", closePanel);

  // 오버레이 배경 클릭 시 닫기
  brandedPanelOverlay.addEventListener("click", (e) => {
    if (e.target === brandedPanelOverlay) {
      closePanel();
    }
  });
});

// 버튼 텍스트 스크롤 효과 - 텍스트를 각 글자로 분리
document.addEventListener("DOMContentLoaded", () => {
  const buttons = document.querySelectorAll(".newsletter-btn, .book-purchase-btn, .contact-btn");
  
  buttons.forEach(button => {
    const text = button.textContent.trim();
    if (text && !button.querySelector("div")) {
      // 텍스트를 각 글자로 분리하고, 각 span에 data-char 속성 추가
      const letters = text.split("");
      const html = '<div>' + letters.map(letter => `<span data-char="${letter}">${letter}</span>`).join("") + '</div>';
      button.innerHTML = html;
    }
  });
});

// Newsletter Metrics Count Up Animation
document.addEventListener("DOMContentLoaded", () => {
  const metricsContainer = document.getElementById("newsletter-metrics");
  if (!metricsContainer) return;

  const metricNumbers = metricsContainer.querySelectorAll(".metric-number");
  let hasAnimated = false;

  // 카운트업 함수
  function animateValue(element, target, format = "number") {
    const duration = 1800; // 1.8초
    const start = 0;
    const increment = target / (duration / 16); // 60fps 기준
    let current = start;
    const startTime = Date.now();

    const timer = setInterval(() => {
      const elapsed = Date.now() - startTime;
      if (elapsed >= duration) {
        current = target;
        clearInterval(timer);
      } else {
        // ease-out 효과를 위한 easing 함수
        const progress = elapsed / duration;
        const eased = 1 - Math.pow(1 - progress, 3); // cubic ease-out
        current = target * eased;
      }

      // 숫자 포맷팅
      let displayValue = Math.floor(current);
      if (format === "percentage") {
        element.textContent = `${displayValue}%+`;
      } else if (format === "number") {
        element.textContent = `${displayValue.toLocaleString()}+`;
      } else {
        element.textContent = displayValue.toLocaleString();
      }
    }, 16); // 약 60fps
  }

  // Intersection Observer 설정
  const observerOptions = {
    root: null,
    rootMargin: "0px",
    threshold: 0.3, // 30% 보일 때 시작
  };

  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting && !hasAnimated) {
        hasAnimated = true;
        
        // 각 메트릭 숫자에 대해 카운트업 애니메이션 시작
        metricNumbers.forEach((element, index) => {
          const target = parseInt(element.getAttribute("data-target"));
          if (!isNaN(target)) {
            // 각 메트릭의 포맷 타입 결정
            let format = "number";
            if (index === 1) {
              // 두 번째 메트릭 (오픈율)은 퍼센트
              format = "percentage";
            }
            
            // 약간의 딜레이를 주어 순차적으로 시작하는 효과
            setTimeout(() => {
              animateValue(element, target, format);
            }, index * 50); // 각 메트릭마다 50ms씩 딜레이
          }
        });
      }
    });
  }, observerOptions);

  observer.observe(metricsContainer);
});

// Newsletter Stamp Animation on Scroll
const newsletterCard = document.querySelector(".newsletter-section-card");
if (newsletterCard) {
  const stampObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          newsletterCard.classList.add("in-view");
        }
      });
    },
    {
      threshold: 0.3,
      rootMargin: "0px",
    }
  );
  stampObserver.observe(newsletterCard);
}

// Timeline Scroll Animation
document.addEventListener("DOMContentLoaded", () => {
  const timelineLine = document.querySelector(".timeline-line");
  const timelineItems = document.querySelectorAll(".timeline-item");
  const timelineContainer = document.querySelector(".timeline-container");

  if (!timelineLine || timelineItems.length === 0) return;

  const observerOptions = {
    root: null,
    rootMargin: "0px",
    threshold: 0.2, // 20% 보일 때 시작
  };

  // 타임라인 선은 첫 번째 항목(확장)이 보일 때 애니메이션
  let timelineLineAnimated = false;

  // 각 타임라인 항목을 개별적으로 관찰
  const itemObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        // 첫 번째 항목이 보이면 타임라인 선 애니메이션 시작
        if (!timelineLineAnimated && entry.target === timelineItems[0]) {
          setTimeout(() => {
            timelineLine.classList.add("animate");
          }, 200);
          timelineLineAnimated = true;
        }

        // 해당 항목에 약간의 딜레이 후 애니메이션 클래스 추가
        setTimeout(() => {
          entry.target.classList.add("animate");
        }, 300);

        // 한 번만 실행되도록 observer 해제
        itemObserver.unobserve(entry.target);
      }
    });
  }, observerOptions);

  // 각 타임라인 항목을 개별적으로 관찰
  timelineItems.forEach((item) => {
    itemObserver.observe(item);
  });
});

