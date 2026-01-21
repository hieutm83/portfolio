'use strict';

document.addEventListener("DOMContentLoaded", function() {
  console.log("Website Loaded - Script Active");

  const toggleActive = (elem) => elem.classList.toggle("active");

  // =========================================================================
  // 1. CÁC CHỨC NĂNG CŨ (ĐÃ THÊM KIỂM TRA ĐỂ TRÁNH LỖI)
  // =========================================================================
  
  // Sidebar
  const sidebar = document.querySelector("[data-sidebar]");
  const sidebarBtn = document.querySelector("[data-sidebar-btn]");
  if (sidebarBtn) sidebarBtn.addEventListener("click", () => toggleActive(sidebar));

  // Testimonials Modal
  const testimonials = document.querySelectorAll("[data-testimonials-item]");
  const modalContainer = document.querySelector("[data-modal-container]");
  const modalCloseBtn = document.querySelector("[data-modal-close-btn]");
  const overlay = document.querySelector("[data-overlay]");
  const modalImg = document.querySelector("[data-modal-img]");
  const modalTitle = document.querySelector("[data-modal-title]");
  const modalText = document.querySelector("[data-modal-text]");

  const toggleModal = () => {
    if(modalContainer) modalContainer.classList.toggle("active");
    if(overlay) overlay.classList.toggle("active");
  };

  if(testimonials.length > 0) {
    testimonials.forEach(item => {
      item.addEventListener("click", function () {
        if(modalImg) {
          modalImg.src = this.querySelector("[data-testimonials-avatar]").src;
          modalImg.alt = this.querySelector("[data-testimonials-avatar]").alt;
          modalTitle.innerHTML = this.querySelector("[data-testimonials-title]").innerHTML;
          modalText.innerHTML = this.querySelector("[data-testimonials-text]").innerHTML;
          toggleModal();
        }
      });
    });
  }

  if (modalCloseBtn) modalCloseBtn.addEventListener("click", toggleModal);
  if (overlay) overlay.addEventListener("click", toggleModal);

  // --- PHẦN FILTER CŨ (ĐÃ FIX LỖI CRASH KHI KHÔNG TÌM THẤY ELEMENT) ---
  const select = document.querySelector("[data-select]");
  const selectItems = document.querySelectorAll("[data-select-item]");
  const selectValue = document.querySelector("[data-selecct-value]");
  const filterBtns = document.querySelectorAll("[data-filter-btn]");
  const filterItems = document.querySelectorAll("[data-filter-item]");

  if (select) {
    select.addEventListener("click", () => toggleActive(select));
  }

  // Chỉ chạy Filter nếu có Filter (để không lỗi JS)
  if (filterBtns.length > 0) {
    const filterFunc = (category) => {
      filterItems.forEach(item => {
        if (category === "all" || item.dataset.category === category) {
          item.classList.add("active");
        } else {
          item.classList.remove("active");
        }
      });
    };

    selectItems.forEach(item => {
      item.addEventListener("click", function () {
        const selectedValue = this.innerText.toLowerCase();
        selectValue.innerText = this.innerText;
        elementToggleFunc(select);
        filterFunc(selectedValue);
      });
    });

    let lastClickedBtn = filterBtns[0];
    filterBtns.forEach(btn => {
      btn.addEventListener("click", function () {
        const selectedValue = this.innerText.toLowerCase();
        selectValue.innerText = this.innerText;
        filterFunc(selectedValue);
        lastClickedBtn.classList.remove("active");
        this.classList.add("active");
        lastClickedBtn = this;
      });
    });
  }

  // Form Contact
  const form = document.querySelector("[data-form]");
  const inputs = document.querySelectorAll("[data-form-input]");
  const formBtn = document.querySelector("[data-form-btn]");
  if (inputs.length > 0 && form) {
    inputs.forEach(input => {
      input.addEventListener("input", () => {
        if (form.checkValidity()) formBtn.removeAttribute("disabled");
        else formBtn.setAttribute("disabled", "");
      });
    });
  }

  // Navigation (Chuyển Tab)
  const navLinks = document.querySelectorAll("[data-nav-link]");
  const pages = document.querySelectorAll("[data-page]");

  for (let i = 0; i < navLinks.length; i++) {
    navLinks[i].addEventListener("click", function () {
      const targetPage = this.innerHTML.toLowerCase().trim(); // Sửa thành trim để chính xác hơn
      for (let j = 0; j < pages.length; j++) {
        if (targetPage === pages[j].dataset.page) {
          pages[j].classList.add("active");
          navLinks[i].classList.add("active");
          window.scrollTo(0, 0);
        } else {
          pages[j].classList.remove("active");
          for (let k = 0; k < navLinks.length; k++) {
             if (k !== i) navLinks[k].classList.remove("active");
          }
        }
      }
    });
  }

  // =========================================================================
  // 2. TÍNH NĂNG MỚI: ZOOM ẢNH + NÚT CHUYỂN
  // =========================================================================
  
  // Menu Logo
  const logoTriggers = document.querySelectorAll('.logo-trigger');
  const closeMinis = document.querySelectorAll('.close-mini');
  logoTriggers.forEach(trigger => {
    trigger.addEventListener('click', function(e) {
      e.stopPropagation(); 
      const menu = this.nextElementSibling;
      document.querySelectorAll('.shop-menu-options').forEach(m => {
        if (m !== menu) m.classList.remove('show-menu');
      });
      if (menu) menu.classList.toggle('show-menu');
    });
  });
  closeMinis.forEach(btn => {
    btn.addEventListener('click', function(e) {
      e.stopPropagation();
      this.parentElement.classList.remove('show-menu');
    });
  });
  document.addEventListener('click', function(e) {
    if (!e.target.closest('.relative-box')) {
      document.querySelectorAll('.shop-menu-options').forEach(m => m.classList.remove('show-menu'));
    }
  });

  // Nút chuyển ảnh
  const projectBtns = document.querySelectorAll('.project-btn');
  projectBtns.forEach(btn => {
    btn.addEventListener('click', function() {
      const container = this.closest('.timeline-item');
      const mainImg = container.querySelector('.main-img'); 
      const allBtns = container.querySelectorAll('.project-btn');
      const newImgSrc = this.getAttribute('data-img');

      mainImg.style.opacity = '0.6';
      setTimeout(() => {
        mainImg.src = newImgSrc;
        mainImg.style.opacity = '1';
      }, 150);

      allBtns.forEach(b => b.classList.remove('active'));
      this.classList.add('active');
    });
  });

  // Zoom Modal
  const imageModal = document.getElementById('image-modal');
  if (imageModal) {
    const viewers = document.querySelectorAll('.project-media-viewer');
    const modalImg = document.getElementById('modal-img');
    const modalClose = imageModal.querySelector('.modal-close');
    const modalContent = imageModal.querySelector('.modal-content');

    viewers.forEach(viewer => {
      viewer.addEventListener('click', function() {
        const img = this.querySelector('img');
        if (img) {
          modalImg.src = img.src;
          imageModal.classList.add('open');
          if(modalContent) modalContent.classList.remove('zoomed');
        }
      });
    });

    const closeModal = () => imageModal.classList.remove('open');
    if (modalClose) modalClose.addEventListener('click', closeModal);
    imageModal.addEventListener('click', (e) => {
      if (e.target === imageModal) closeModal();
    });

    if (modalContent) {
      // Zoom Click
      modalContent.addEventListener('click', (e) => {
        if (!isDragging) modalContent.classList.toggle('zoomed');
        isDragging = false;
      });

      // Drag to Scroll
      let isDown = false;
      let startX, startY, scrollLeft, scrollTop, isDragging = false;

      modalContent.addEventListener('mousedown', (e) => {
        if (!modalContent.classList.contains('zoomed')) return;
        isDown = true;
        isDragging = false;
        startX = e.pageX - modalContent.offsetLeft;
        startY = e.pageY - modalContent.offsetTop;
        scrollLeft = modalContent.scrollLeft;
        scrollTop = modalContent.scrollTop;
      });
      modalContent.addEventListener('mouseup', () => isDown = false);
      modalContent.addEventListener('mouseleave', () => isDown = false);
      modalContent.addEventListener('mousemove', (e) => {
        if (!isDown) return;
        e.preventDefault();
        const x = e.pageX - modalContent.offsetLeft;
        const y = e.pageY - modalContent.offsetTop;
        const walkX = (x - startX) * 2;
        const walkY = (y - startY) * 2;
        if(Math.abs(walkX) > 5 || Math.abs(walkY) > 5) isDragging = true;
        modalContent.scrollLeft = scrollLeft - walkX;
        modalContent.scrollTop = scrollTop - walkY;
      });
    }
  }
});