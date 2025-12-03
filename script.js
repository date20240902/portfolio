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

  console.log("크리스마스 효과 초기화:", { heroNameContainer, snowflakesContainer });

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
      const startY = -20; // 텍스트 위쪽에서 시작 (음수로 위에서 시작)
      
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

    heroNameContainer.addEventListener("mouseenter", (e) => {
      console.log("마우스 진입 감지!");
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
      console.log("마우스 떠남 감지!");
      // 마우스 떠날 때 눈송이 생성 중지
      if (snowflakeInterval) {
        clearInterval(snowflakeInterval);
        snowflakeInterval = null;
      }
    });
  }
});

// (이전에 추가했던 히어로 타이포그래피 애니메이션은 모두 제거하여 기본 상태로 되돌렸습니다.)

// 기고 브랜드 데이터
const articlesByBrand = {
  kb: {
    name: "KB",
    logo: "assets/logo-kb.png.png",
    articles: [
      { title: "하이브의 엔터테인먼트 혁신, 위버스로 만들어가는 글로벌 팬 커뮤니티", url: "https://kbthink.com/life/daily/hybe.html" },
      { title: "스포티파이 플레이리스트 추천 기술, AI DJ와 함께하는 음악 경험", url: "https://kbthink.com/life/daily/spotify.html" },
      { title: "AI 에이전트란? 활용 사례와 발전 방향 알아보기", url: "https://kbthink.com/life/daily/ai-agent.html" },
      { title: "데이터 센터란? 냉각 기술의 중요성과 건설이 어려운 이유", url: "https://kbthink.com/life/daily/data-center.html" },
      { title: "전체보기", url: "https://kbthink.com/search/result.html?sk=%EC%9D%B4%EC%9E%AC%ED%9B%88" },
    ],
  },
  skt: {
    name: "SKT",
    logo: "assets/logo-skt.png.png",
    articles: [
      { title: "SK AI SUMMIT 2025, SK가 그린 AI 인프라의 미래", url: "https://www.sktelecom.com/webzine/lib/tstory_detail.do?index=52&currentPage=1&keyword=" },
      { title: "GPU, 대체 뭐길래 다들 난리일까?", url: "https://www.sktelecom.com/webzine/lib/insight_detail.do?index=40&currentPage=1&keyword=" },
    ],
  },
  hyundaicard: {
    name: "현대카드",
    logo: "assets/logo-hyundaicard.png.png",
    articles: [
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
    articles: [
      { title: "아마존에서 현대차를 구입할 수 있는 시대가 열립니다", url: "https://outstanding.kr/amazonhyundai20231205" },
      { title: "오픈AI와 어깨를 나란히 하고 엔비디아가 투자한 한국 AI 스타트업 '트웰브랩스'", url: "https://outstanding.kr/twelvelabs20231026" },
      { title: "AI, X, TESLA.. 일론 머스크는 왜 프리미엄 도메인을 사랑하나", url: "https://outstanding.kr/premiundomain20230911" },
      { title: "넥스트 위챗, X가 아닌 그랩일 가능성이 높습니다", url: "https://outstanding.kr/superappgrab20231004" },
      { title: "전체보기", url: "https://outstanding.kr/search_detail/%EC%9D%B4%EC%9E%AC%ED%9B%88" },
    ],
  },
  yozmit: {
    name: "요즘IT",
    logo: "assets/logo-yozmit.png.png",
    articles: [
      { title: "2024년 가트너 10대 전략 기술 트렌드 톺아보기", url: "https://yozm.wishket.com/magazine/detail/2298/" },
      { title: "더 이상 외면할 수 없는 양자컴퓨터", url: "https://yozm.wishket.com/magazine/detail/2888/" },
      { title: "생성형 AI 시대를 이해하기 위한 필수 용어 사전", url: "https://yozm.wishket.com/magazine/detail/2360/" },
      { title: "ChatGPT vs Claude, 수능 보고 서울대 갈 수 있을까?", url: "https://yozm.wishket.com/magazine/detail/2851/" },
      { title: "전체보기", url: "https://yozm.wishket.com/magazine/@jhjh126/" },
    ],
  },
  yozmit2: {
    name: "요즘IT",
    logo: "assets/logo-cheil.png.png",
    articles: [
      {
        title: "[Cheil Magazine] 엔터테인먼트 허브로 진화하는 거실",
        url: "https://magazine.cheil.com/57425",
      },
    ],
  },
};

// 강연 데이터
const lectures = [
  {
    title: "동탄국제고 | AI로 그리는 미래 시대 준비",
    image: "assets/lecture-1.jpg.jpg",
  },
  {
    title: "아이에이클라우드 | 사내 워크샵 특강",
    image: "assets/lecture-2.jpg.jpg",
  },
  {
    title: "마이온컴퍼니 | 갓생러 미니 토크 콘서트",
    image: "assets/lecture-3.jpg.jpg.jpg",
  },
  {
    title: "샘 올트먼, 더 비전 2030 | 북토크 & AI 강연",
    image: "assets/lecture-4.jpg.jpg.jpg",
  },
  {
    title: "대전 스타트업스쿨 | 스타트업 성장을 위한 전략적 뉴스레터 구축",
    image: "assets/lecture-5.jpg.jpg.jpg",
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

  // 간단한 스와이프 (모바일)
  let startX = 0;
  let isDragging = false;

  carousel.addEventListener("touchstart", (e) => {
    startX = e.touches[0].clientX;
    isDragging = true;
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
      <div class="carousel-slide-center">
        <img src="${lecture.image}" alt="${lecture.title}" class="carousel-lecture-image" onerror="this.style.display='none'">
        <h4 class="carousel-lecture-title">${lecture.title}</h4>
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
}

// 초기화
document.addEventListener("DOMContentLoaded", () => {
  // 기고 슬라이드 생성
  const track = document.querySelector(".company-carousel__track");
  if (track) {
    const brandKeys = Object.keys(articlesByBrand);

    const slidesHTML = brandKeys
      .map((key) => {
        const brand = articlesByBrand[key];
        return `
      <div class="company-carousel__slide">
        <div class="company-card">
          <div class="article-carousel-layout">
            <div class="article-carousel-center">
              <div class="article-carousel-center-inner">
                <div class="carousel-brand-logo-frame">
                  <span class="carousel-brand-logo-placeholder">기업 로고</span>
                  <img
                    src="${brand.logo}"
                    alt="${brand.name}"
                    class="carousel-brand-logo"
                    onload="this.previousElementSibling.style.display='none'"
                    onerror="this.style.display='none'"
                  >
                </div>
                <div class="article-carousel-text">
                  <ul class="carousel-article-list">
                    ${brand.articles
                      .map(
                        (article) => `
                      <li class="carousel-article-item">
                        <a href="${article.url}" target="_blank" rel="noreferrer" class="carousel-article-title">${article.title}</a>
                      </li>
                    `
                      )
                      .join("")}
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>`;
      })
      .join("");

    track.innerHTML = slidesHTML;
    initCompanyCarousel();
  }

  // 강연 캐러셀 (한 번에 한 슬라이드)
  initLectureCarousel();
});

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


