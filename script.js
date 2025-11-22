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

// Hero Section 패럴랙스 효과
const heroSection = document.querySelector(".hero");
const heroPhotoImage = document.querySelector(".hero-photo-image");

if (heroSection && heroPhotoImage) {
  let mouseX = 0;
  let mouseY = 0;
  let currentX = 0;
  let currentY = 0;
  const parallaxStrength = 0.02; // 패럴랙스 강도 (낮을수록 약함)

  heroSection.addEventListener("mousemove", (e) => {
    const rect = heroSection.getBoundingClientRect();
    // 마우스 위치를 섹션 중심 기준으로 -1 ~ 1 범위로 정규화
    mouseX = (e.clientX - rect.left - rect.width / 2) / (rect.width / 2);
    mouseY = (e.clientY - rect.top - rect.height / 2) / (rect.height / 2);
  });

  // 부드러운 애니메이션을 위한 requestAnimationFrame
  function animateParallax() {
    // 부드러운 보간 (easing)
    currentX += (mouseX - currentX) * 0.1;
    currentY += (mouseY - currentY) * 0.1;

    // 이미지에 약한 변환 적용 (vh 단위 사용)
    const translateX = currentX * parallaxStrength * 2; // vw 단위로 변환
    const translateY = currentY * parallaxStrength * 2; // vh 단위로 변환
    
    heroPhotoImage.style.transform = `translate(${translateX}vw, ${translateY}vh)`;
    
    requestAnimationFrame(animateParallax);
  }

  // 마우스가 섹션을 벗어나면 원래 위치로 복귀
  heroSection.addEventListener("mouseleave", () => {
    mouseX = 0;
    mouseY = 0;
  });

  // 애니메이션 시작
  animateParallax();
}

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

// 강연 카드 hover 이미지 효과
document.addEventListener("DOMContentLoaded", function () {
  const lectureItems = document.querySelectorAll(".lecture-item");
  const lectureImage = document.querySelector(".lecture-image");
  if (lectureItems.length > 0 && lectureImage) {
    lectureItems.forEach((item, index) => {
      const showLectureImage = (targetItem) => {
        const src = targetItem.dataset.image;

        if (src) {
          lectureImage.src = src;
          lectureImage.alt = targetItem.textContent.trim();

          const showImage = () => {
            lectureImage.classList.add("is-visible");
          };

          if (lectureImage.complete && lectureImage.naturalHeight !== 0) {
            showImage();
          } else {
            const onImageLoad = () => {
              showImage();
              lectureImage.removeEventListener("load", onImageLoad);
              lectureImage.removeEventListener("error", onImageError);
            };
            
            const onImageError = () => {
              lectureImage.removeEventListener("load", onImageLoad);
              lectureImage.removeEventListener("error", onImageError);
            };
            
            lectureImage.addEventListener("load", onImageLoad);
            lectureImage.addEventListener("error", onImageError);
            
            // 이미지가 이미 로드 중이거나 완료된 경우를 대비
            if (lectureImage.complete) {
              if (lectureImage.naturalHeight !== 0) {
                onImageLoad();
              } else {
                onImageError();
              }
            }
          }
        }
      };

      // 데스크톱: 마우스 이벤트
      item.addEventListener("mouseenter", () => {
        showLectureImage(item);
      });

      item.addEventListener("mouseleave", () => {
        lectureImage.classList.remove("is-visible");
      });

      // 모바일: 터치 이벤트
      item.addEventListener("touchstart", (e) => {
        e.preventDefault();
        showLectureImage(item);
      });
    });

    // 카드 전체에서 마우스가 벗어날 때도 처리
    const lectureCard = document.querySelector(".collab-card-lecture");
    if (lectureCard) {
      lectureCard.addEventListener("mouseleave", () => {
        lectureImage.classList.remove("is-visible");
      });
    }
  } else {
    console.error("필수 요소를 찾을 수 없습니다:", {
      lectureItems: lectureItems.length,
      lectureImage: !!lectureImage
    });
  }
});

// 기고 브랜드 탭 인터랙션
const articlesByBrand = {
  kb: [
    { title: "하이브의 엔터테인먼트 혁신, 위버스로 만들어가는 글로벌 팬 커뮤니티", url: "https://kbthink.com/life/daily/hybe.html" },
    { title: "스포티파이 플레이리스트 추천 기술, AI DJ와 함께하는 음악 경험", url: "https://kbthink.com/life/daily/spotify.html" },
    { title: "AI 에이전트란? 활용 사례와 발전 방향 알아보기", url: "https://kbthink.com/life/daily/ai-agent.html" },
    { title: "데이터 센터란? 냉각 기술의 중요성과 건설이 어려운 이유", url: "https://kbthink.com/life/daily/data-center.html" },
    { title: "전체보기", url: "https://kbthink.com/search/result.html?sk=%EC%9D%B4%EC%9E%AC%ED%9B%88" },
  ],
  hyundaicard: [
    {
      title: "우리 삶과 가까워지는 안전하고 빠른 결제 'EMV 컨택리스'",
      url: "https://newsroom.hyundaicard.com/front/board/TECHITSSUE-%EC%9A%B0%EB%A6%AC-%EC%82%B6%EA%B3%BC-%EA%B0%80%EA%B9%8C%EC%9B%8C%EC%A7%80%EB%8A%94-%EC%95%88%EC%A0%84%ED%95%98%EA%B3%A0-%EB%B9%A0%EB%A5%B8-%EA%B2%B0%EC%A0%9C-EMV-%EC%BB%A8%ED%83%9D%EB%A6%AC%EC%8A%A4?bbsSeq=2099&menuCategory=MNC002&contentCategory=&topMenuCd=FMC002&sort=1&noImageContent=Y",
    },
    {
      title: "나보다 나를 더 잘 아는 추천 알고리즘",
      url: "https://newsroom.hyundaicard.com/front/board/TECHITSSUE-%EB%82%98%EB%B3%B4%EB%8B%A4-%EB%82%98%EB%A5%BC-%EB%8D%94-%EC%9E%98-%EC%95%84%EB%8A%94-%EC%B6%94%EC%B2%9C-%EC%95%8C%EA%B3%A0%EB%A6%AC%EC%A6%98?bbsSeq=2049&menuCategory=MNC002&contentCategory=&topMenuCd=FMC002&sort=1&noImageContent=Y",
    },
  ],
  outstanding: [
    { title: "아마존에서 현대차를 구입할 수 있는 시대가 열립니다", url: "https://outstanding.kr/amazonhyundai20231205" },
    { title: "오픈AI와 어깨를 나란히 하고 엔비디아가 투자한 한국 AI 스타트업 '트웰브랩스'", url: "https://outstanding.kr/twelvelabs20231026" },
    { title: "AI, X, TESLA.. 일론 머스크는 왜 프리미엄 도메인을 사랑하나", url: "https://outstanding.kr/premiundomain20230911" },
    { title: "넥스트 위챗, X가 아닌 그랩일 가능성이 높습니다", url: "https://outstanding.kr/superappgrab20231004" },
    { title: "전체보기", url: "https://outstanding.kr/search_detail/%EC%9D%B4%EC%9E%AC%ED%9B%88" },
  ],
  yozmit: [
    { title: "2024년 가트너 10대 전략 기술 트렌트 톺아보기", url: "https://yozm.wishket.com/magazine/detail/2298/" },
    { title: "더 이상 외면할 수 없는 양자컴퓨터", url: "https://yozm.wishket.com/magazine/detail/2888/" },
    { title: "생성형 AI 시대를 이해하기 위한 필수 용어 사전", url: "https://yozm.wishket.com/magazine/detail/2360/" },
    { title: "ChatGPT vs Claude, 수능 보고 서울대 갈 수 있을까?", url: "https://yozm.wishket.com/magazine/detail/2851/" },
    { title: "전체보기", url: "https://yozm.wishket.com/magazine/@jhjh126/" },
  ],
  skt: [
    { title: "SK AI SUMMIT 2025, SK가 그린 AI 인프라의 미래", url: "https://www.sktelecom.com/webzine/lib/tstory_detail.do?index=52&currentPage=1&keyword=" },
    { title: "GPU, 대체 뭐길래 다들 난리일까?", url: "https://www.sktelecom.com/webzine/lib/insight_detail.do?index=40&currentPage=1&keyword=" },
  ],
  cheil: [
    { title: "엔터테인먼트 허브로 진화하는 거실", url: "https://magazine.cheil.com/57425" },
  ],
};

document.addEventListener("DOMContentLoaded", () => {
  const brandTabs = document.querySelectorAll(".brand-tab");
  const articleList = document.querySelector(".collab-card-article .article-list");

  if (!brandTabs.length || !articleList) return;

  const renderArticles = (brandKey) => {
    const articles = articlesByBrand[brandKey] || [];
    articleList.innerHTML = "";

    if (!articles.length) {
      const emptyItem = document.createElement("li");
      emptyItem.className = "article-item";
      emptyItem.textContent = "콘텐츠를 준비 중입니다.";
      articleList.appendChild(emptyItem);
      return;
    }

    articles.forEach((article) => {
      const listItem = document.createElement("li");
      listItem.className = "article-item";

      const link = document.createElement("a");
      link.className = "article-title";
      link.href = article.url;
      link.target = "_blank";
      link.rel = "noreferrer";
      link.textContent = article.title;

      listItem.appendChild(link);
      articleList.appendChild(listItem);
    });
  };

  const activateTab = (tab) => {
    brandTabs.forEach((btn) => {
      btn.classList.remove("is-active");
      btn.setAttribute("aria-selected", "false");
    });
    tab.classList.add("is-active");
    tab.setAttribute("aria-selected", "true");
  };

  brandTabs.forEach((tab) => {
    tab.addEventListener("click", () => {
      activateTab(tab);
      renderArticles(tab.dataset.brand);
    });
  });

  const firstTab = brandTabs[0];
  if (firstTab) {
    activateTab(firstTab);
    renderArticles(firstTab.dataset.brand);
  }
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

