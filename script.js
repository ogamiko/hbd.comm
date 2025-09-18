/* ========== Section switching (only one visible) ========== */
document.addEventListener("DOMContentLoaded", () => {
    const links = document.querySelectorAll(".nav-link");
    const sections = document.querySelectorAll(".section");
    const btns = document.querySelectorAll("[data-target]");
    const mainCTA = document.getElementById("main-cta");
  
    function showSection(id) {
      sections.forEach(s => {
        if (s.id === id) {
          s.classList.add("active");
          s.style.display = "block";
          s.scrollIntoView({behavior: "smooth", block: "start"});
        } else {
          s.classList.remove("active");
          s.style.display = "none";
        }
      });
      // update hash without scrolling again
      history.replaceState(null, "", "#" + id);
    }
  
    // nav link clicks
    links.forEach(link => {
      link.addEventListener("click", (e) => {
        e.preventDefault();
        const id = link.dataset.target || link.getAttribute("href").substring(1);
        showSection(id);
      });
    });
  
    // any element with data-target
    btns.forEach(el => {
      el.addEventListener("click", (e) => {
        // only act if data-target exists
        const target = el.dataset.target;
        if (target) {
          e.preventDefault();
          showSection(target);
        }
      });
    });
  
    // default view: choose hash or home
    const start = location.hash ? location.hash.substring(1) : "home";
    // if invalid hash, fallback to home
    const valid = [...sections].map(s => s.id).includes(start) ? start : "home";
    showSection(valid);
  
    /* ========== IMAGE MODAL (simple) ========== */
    const imgModal = document.getElementById("imgModal");
    const modalImg = document.getElementById("modalImg");
    const modalClose = document.querySelector(".modal-close");
  
    document.querySelectorAll(".photo-btn img").forEach(img => {
      img.addEventListener("click", (e) => {
        modalImg.src = img.src;
        imgModal.classList.add("show");
        imgModal.setAttribute("aria-hidden", "false");
      });
    });
    // close
    modalClose.addEventListener("click", () => {
      imgModal.classList.remove("show");
      imgModal.setAttribute("aria-hidden", "true");
      modalImg.src = "";
    });
    imgModal.addEventListener("click", (e) => {
      if (e.target === imgModal) {
        modalClose.click();
      }
    });
  
    /* ========== CONFETTI burst on Celebrate button ========== */
    function confettiBurst(x = window.innerWidth/2, y = window.innerHeight/3) {
      const colors = ["#ff6aa0","#ffd6e8","#ffb3c6","#d63384","#ff80ab"];
      for (let i=0;i<30;i++){
        const el = document.createElement("div");
        el.className = "confetti";
        document.body.appendChild(el);
        el.style.background = colors[Math.floor(Math.random()*colors.length)];
        el.style.left = (x + (Math.random()-0.5)*200) + "px";
        el.style.top = (y + (Math.random()-0.5)*80) + "px";
        el.style.width = (6 + Math.random()*10) + "px";
        el.style.height = el.style.width;
        el.style.opacity = 0.95;
        const angle = -120 + Math.random()*240;
        el.style.transform = `translateY(0) rotate(${Math.random()*360}deg)`;
        el.animate([
          { transform: `translateY(0) rotate(${Math.random()*360}deg)`, opacity: 1 },
          { transform: `translateY(${300 + Math.random()*200}px) rotate(${angle}deg)`, opacity: 0 }
        ], {
          duration: 1100 + Math.random()*1000,
          easing: 'cubic-bezier(.2,.6,.2,1)',
          iterations: 1,
          fill: 'forwards'
        });
        setTimeout(()=> el.remove(), 2200);
      }
    }
  
    const celebrateBtn = document.getElementById("celebrate-btn");
    if (celebrateBtn) {
      celebrateBtn.addEventListener("click", (e)=>{
        // center-ish confetti near button
        const rect = celebrateBtn.getBoundingClientRect();
        confettiBurst(rect.left + rect.width/2, rect.top + rect.height/2);
      });
    }
    if (mainCTA) {
      mainCTA.addEventListener("click", (e) => {
        // also a quick confetti pop when clicking main CTA
        const rect = mainCTA.getBoundingClientRect();
        confettiBurst(rect.left + rect.width/2, rect.top + rect.height/2 - 40);
      });
    }
  
    /* ========== FLOATING HEARTS (gentle) ========== */
    function createHeart() {
      const heart = document.createElement("div");
      heart.className = "heart";
      heart.textContent = "💖";
      const size = 14 + Math.random()*28;
      heart.style.fontSize = size + "px";
      heart.style.left = (Math.random() * (window.innerWidth - 80) + 20) + "px";
      heart.style.animationDuration = (5 + Math.random()*5) + "s";
      document.body.appendChild(heart);
      setTimeout(()=> heart.remove(), 11000);
    }
    // gentle interval but not overwhelming
    setInterval(createHeart, 1500);
  
    /* ========== CUSTOM CURSOR (stylish) ========== */
    const cursor = document.querySelector(".cursor");
    const hoverables = document.querySelectorAll(".hoverable, a, button, .photo-btn, .modal-close");
  
    // disable custom cursor on touch devices
    if(('ontouchstart' in window) || navigator.maxTouchPoints > 0){
      cursor.style.display = "none";
    } else {
      document.addEventListener("mousemove", (e) => {
        cursor.style.left = e.clientX + "px";
        cursor.style.top = e.clientY + "px";
      });
  
      hoverables.forEach(el => {
        el.addEventListener("mouseenter", () => cursor.classList.add("big"));
        el.addEventListener("mouseleave", () => cursor.classList.remove("big"));
      });
    }
  
  });
  
  