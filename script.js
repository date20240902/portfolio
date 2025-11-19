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

