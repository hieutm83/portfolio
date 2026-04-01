'use strict';

document.addEventListener("DOMContentLoaded", function() {
  console.log("Website Loaded - Script Active");

  const toggleActive = (elem) => elem.classList.toggle("active");

  // =========================================================================
  // 1. CÁC CHỨC NĂNG GIAO DIỆN
  // =========================================================================
  
  // Sidebar
  const sidebar = document.querySelector("[data-sidebar]");
  const sidebarBtn = document.querySelector("[data-sidebar-btn]");
  if (sidebarBtn) sidebarBtn.addEventListener("click", () => toggleActive(sidebar));

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
      const targetPage = this.getAttribute("data-nav-link"); 
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

  // Menu Logo Popup
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

  // Nút chuyển ảnh Project
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
  let isDragging = false;
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
      modalContent.addEventListener('click', (e) => {
        if (!isDragging) modalContent.classList.toggle('zoomed');
        isDragging = false;
      });
      let isDown = false;
      let startX, startY, scrollLeft, scrollTop;

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


  // =========================================================================
  // 2. TỪ ĐIỂN ĐA NGÔN NGỮ & LOGIC I18N
  // =========================================================================
  
  const translations = {
    "vi": {
      // Sidebar & Nav
      "sidebar_job": "E-commerce Manager",
      "sidebar_show_contacts": "Hiện thông tin",
      "sidebar_email": "Email",
      "sidebar_phone": "Điện thoại",
      "sidebar_birthday": "Ngày sinh",
      "sidebar_location": "Vị trí",
      "sidebar_address": "Đống Đa, Hà Nội, Vietnam",
      "nav_about": "Giới thiệu",
      "nav_resume": "Hồ sơ",
      "nav_project": "Dự án",
      "nav_blog": "Bài viết",
      "nav_contact": "Liên hệ",
      
      // About
      "about_title": "Giới thiệu bản thân",
      "about_p1": "Tôi là E-commerce Operations Manager với tư duy Data-driven (định hướng dữ liệu) và hơn 4 năm thực chiến.",
      "about_p2": "Sở trường của tôi là xây dựng Brand từ con số 0 (Zero-to-Hero) và quản lý hệ thống đa sàn với doanh thu lên tới 20 tỷ VNĐ/năm. Khác biệt lớn nhất của tôi là khả năng ứng dụng AI & Automation để tối ưu vận hành và đột phá hiệu suất kinh doanh.",
      "service_title": "Lĩnh vực chuyên môn",
      "srv_1_desc": "Sản xuất hình ảnh/video marketing tốc độ cao bằng cách sử dụng AI. Tối ưu tỷ lệ Click (CTR) và giữ chân người xem.",
      "srv_2_desc": "Vận hành đồng bộ hệ thống TikTok Shop, Shopee (SYT+, Mall), Lazada. Scale-up doanh thu từ 0 lên 10 tỷ/năm.",
      "srv_3_desc": "Phân tích dữ liệu kinh doanh (Excel), dự báo xu hướng và lên chiến lược giá/khuyến mãi.",
      "srv_4_desc": "Triển khai quảng cáo (Ads), Booking KOC/KOL và tối ưu chỉ số ROAS/GMV Max để tối đa hóa lợi nhuận.",
      "srv_5_desc": "Đào tạo nhân sự. Triển khai team vận hành, CSKH và Content để tối ưu hóa hiệu suất làm việc.",
      "srv_6_desc": "Tư vấn chiến lược sàn, setup gian hàng. Giải quyết các vấn đề kỹ thuật và xử lý vấn đề vận hành.",
      "brand_title": "Thương hiệu",
      
      // Resume
      "resume_title": "Hồ sơ",
      "resume_exp_title": "Kinh nghiệm làm việc",
      "resume_dl_cv": "Tải xuống CV",
      
      "exp_1_company": "Công Ty Cổ Phần Thương Mại Và Dịch Vụ AC",
      "exp_1_role": "<strong>Vị trí: </strong> Ecommerce Manager & R&D Lead",
      "exp_1_brand1": "<ion-icon name=\"leaf-outline\"></ion-icon> <em>F&B: Anlanh Farm (Trà Thảo Mộc)</em>",
      "exp_1_brand2": "<ion-icon name=\"footsteps-outline\"></ion-icon> <em>Fashion: KumaKids (Thời trang trẻ em)</em>",
      "exp_1_p1": "- <strong>Business Pivot (Chuyển đổi mô hình):</strong> Trực tiếp nghiên cứu thị trường (R&D) và chuyển hướng kinh doanh công ty từ Thời trang sang F&B. Xây dựng brand Anlanh Farm đạt doanh thu 330 triệu chỉ sau 4 tháng.",
      "exp_1_p2": "- <strong>Chiến lược Exit & Dòng tiền:</strong> Thực hiện chiến lược \"xả kho thu hồi vốn\" cho KumaKids, thu về 1.75 Tỷ VNĐ dòng tiền mặt để tái đầu tư cho dự án mới.",
      "exp_1_p3": "- <strong>Vận hành Hybrid:</strong> Kết hợp Traffic nội sàn (Shopee CR 4.78%) và Traffic ngoại sàn (TikTok/Reels) để tối ưu chi phí quảng cáo.",
      
      "exp_2_company": "Công Ty TNHH Lắp Đặt Camera Hà Nội",
      "exp_2_role": "<strong>Vị trí: </strong> Ecommerce Manager",
      "exp_2_brand1": "<ion-icon name=\"videocam-outline\"></ion-icon> <em>Camera Gia Đình (Top 3 Ezviz)</em>",
      "exp_2_brand2": "<ion-icon name=\"construct-outline\"></ion-icon> <em>Lắp Đặt Camera Hà Nội</em>",
      "exp_2_brand3": "<ion-icon name=\"hardware-chip-outline\"></ion-icon> <em>Kho Công Nghệ</em>",
      "exp_2_p1": "- <strong>Scale-up Doanh thu:</strong> Xây dựng hệ thống gian hàng Camera đạt tổng doanh thu ~25 Tỷ VNĐ/năm (Trong đó Camera Gia Đình đạt 12.5 Tỷ).",
      "exp_2_p2": "- <strong>In-house Production:</strong> Xây dựng đội ngũ Media nội bộ, tự sản xuất nội dung Livestream & Video ngắn mang về 9.57 Tỷ doanh thu trên TikTok Shop.",
      "exp_2_p3": "- <strong>Mở rộng hệ sinh thái (Ecosystem):</strong> Phát triển dự án vệ tinh \"Kho Công Nghệ 86\" để thâu tóm thị trường ngách phụ kiện, tối đa hóa vòng đời khách hàng.",
      
      "exp_3_company": "Honda Việt Nam",
      "exp_3_role": "<strong>Vị trí: </strong> Data Analyst",
      "exp_3_p1": "- <strong>Phân tích dữ liệu lớn:</strong> Thu thập và xử lý Big Data kinh doanh để hỗ trợ Ban lãnh đạo ra quyết định chiến lược.",
      "exp_3_p2": "- <strong>Báo cáo quản trị:</strong> Xây dựng hệ thống Dashboard trực quan bằng Power BI và Excel để theo dõi hiệu suất sản xuất realtime.",
      
      "exp_4_company": "SV Mobile",
      "exp_4_role": "<strong>Vị trí: </strong> Store Manager",
      "exp_4_p1": "- <strong>Tiên phong E-commerce:</strong> Trực tiếp xây dựng và vận hành gian hàng trên Lazada/Shopee từ giai đoạn đầu thị trường.",
      "exp_4_p2": "- <strong>Quản lý toàn diện:</strong> Phụ trách kho vận, kỹ thuật sửa chữa và chăm sóc khách hàng đa kênh.",
      
      "resume_edu_title": "Học vấn",
      "edu_1_school": "Trường Đại học Mỏ - Địa chất Hà Nội",
      "edu_1_major": "<strong>Chuyên ngành: </strong> Hệ thống thông tin - Công nghệ thông tin",
      "edu_1_desc": "- Tư duy phân tích hệ thống dữ liệu, quản trị dữ liệu, lên kế hoạch dự án.",
      "edu_2_school": "Trường THPT Chuyên Tuyên Quang",
      "edu_2_major": "<strong>Chuyên ngành: </strong> Chuyên Tin học",
      "edu_2_desc": "- Nền tảng tư duy logic, thuật toán và giải quyết vấn đề tối ưu.",
      
      "resume_skill_title": "Kỹ năng chuyên môn",
      "skill_1": "Ecommerce Operation (Shopee/TikTok/Lazada)",
      "skill_2": "Data Analysis & Financial Planning",
      "skill_3": "AI Application & Content Strategy",
      "skill_4": "Team Leadership & Training",
      
      // Projects
      "project_title": "Dự án thực chiến",
      "project_subtitle": "Case Studies",
      
      "pj_ac_title": "0109572654 - CÔNG TY CỔ PHẦN THƯƠNG MẠI VÀ DỊCH VỤ AC",
      "pj_ac_date": "<ion-icon name=\"calendar-outline\" style=\"vertical-align: text-bottom;\"></ion-icon> Giai đoạn: 2025 — Nay",
      
      "pj_1_header": "Anlanh Farm (Trà Thảo Mộc) <span style=\"background-color: #dcfce7; color: #15803d; padding: 2px 8px; border-radius: 4px; font-size: 0.75em; border: 1px solid #86efac;\">🌱 Business Pivot & R&D</span>",
      "pj_1_time": "<span>08/2025 — Present</span> <span style=\"color: #16a34a; font-weight: 600; margin-left: 5px;\">| 🔄 Nghiên cứu thị trường & Launching</span>",
      "pj_1_p1": "<strong>Quy trình:</strong> Full-stack từ Research (Khách hàng/Sản phẩm) đến mở bán. Chuyển hướng kinh doanh công ty sang ngành F&B.",
      "pj_1_p2": "<strong>🚀 Chiến lược Traffic đa tầng (Hybrid):</strong>",
      "pj_1_b1": "<strong>TikTok Launching:</strong> Đạt doanh thu <span style=\"background-color: #dcfce7; color: #15803d; padding: 0 4px; font-weight: bold;\">330 Triệu VNĐ</span> (Chỉ sau 4 tháng) nhờ kết hợp KOC & 500+ Video In-house.",
      "pj_1_b2": "<strong>Hiệu suất Shopee:</strong> Tối ưu quảng cáo đạt CR <span style=\"background-color: #ffedd5; color: #c2410c; padding: 0 4px; font-weight: bold;\">4.78%</span> (Tỷ lệ chuyển đổi cao cho ngành hàng mới).",
      "pj_1_b3": "<strong>Traffic Ngoại sàn:</strong> Xây dựng hệ thống <span style=\"background-color: #dbeafe; color: #1d4ed8; padding: 0 4px; font-weight: bold;\">Fanpage & Reels vệ tinh</span> để điều hướng traffic giá rẻ về sàn.",
      "pj_1_btn1": "TikTok (330 Tr)",
      "pj_1_btn2": "Shopee (CR 4.78%)",
      
      "pj_2_header": "KumaKids (Thời trang trẻ em) <span style=\"background-color: #ffe4e6; color: #be123c; padding: 2px 8px; border-radius: 4px; font-size: 0.75em; border: 1px solid #fda4af;\">🔄 Strategic Pivot & Exit</span>",
      "pj_2_time": "<span>01/2025 — 12/2025</span> <span style=\"color: #e11d48; font-weight: 600; margin-left: 5px;\">| 📉 Xả kho & Thu hồi vốn</span>",
      "pj_2_p1": "<strong>Bối cảnh:</strong> Vận hành tăng trưởng giai đoạn đầu (Q1-Q2), sau đó chuyển sang chiến lược thanh lý toàn bộ tồn kho (Q3-Q4) để tập trung vốn cho Anlanh Farm.",
      "pj_2_p2": "<strong>💼 Kết quả quản trị dòng tiền (Cash Flow):</strong>",
      "pj_2_b1": "<strong>Giai đoạn Tăng trưởng:</strong> Shop Official đạt doanh thu <span style=\"background-color: #dbeafe; color: #1e40af; padding: 0 4px; font-weight: bold;\">1.05 Tỷ VNĐ</span> với mức tăng trưởng <span style=\"background-color: #dbeafe; color: #2563eb; font-weight: bold;\">▲ 71.76%</span>",
      "pj_2_b2": "<strong>Tổng thu hồi vốn:</strong> Mang về dòng tiền <span style=\"background-color: #fce7f3; color: #9d174d; padding: 0 4px; font-weight: bold;\">~1.75 Tỷ VNĐ</span> từ việc xả hàng 2 gian hàng Fashion & Shoes.",
      "pj_2_b3": "<strong>Chiến lược Exit:</strong> Đẩy sạch <span style=\"background-color: #fee2e2; color: #991b1b; padding: 0 4px; font-weight: bold;\">90% tồn kho</span> và cắt giảm chi phí vận hành về 0 để chuyển dịch nguồn lực.",
      "pj_2_btn1": "Shopee Mall (+71%)",
      "pj_2_btn2": "Shopee SYT+ (Clearance)",
      
      "pj_cm_title": "0106850906 - CÔNG TY TNHH LẮP ĐẶT CAMERA HÀ NỘI",
      "pj_cm_date": "<ion-icon name=\"calendar-outline\" style=\"vertical-align: text-bottom;\"></ion-icon> Giai đoạn: 2024 — 2025",
      
      "pj_3_header": "Camera Gia Đình <span style=\"background-color: #ffe5e5; color: #d63031; padding: 2px 8px; border-radius: 4px; font-size: 0.75em; border: 1px solid #fab1a0;\">🏆 Top 3 Best Seller EZVIZ</span>",
      "pj_3_time": "<span>01/2024 — 12/2024</span> <span style=\"color: #0984e3; font-weight: 600; margin-left: 5px;\">| 🚀 Tăng trưởng thần tốc (Năm đầu tiên)</span>",
      "pj_3_p1": "<strong>Chiến lược:</strong> Xây dựng shop mới (Build shop mới) dựa trên năng lực vận hành & sản xuất nội dung nội bộ.",
      "pj_3_p2": "<strong>📈 Key Metrics (2024):</strong>",
      "pj_3_b1": "<strong>Doanh thu:</strong> Scale từ 0 lên <span style=\"background-color: #fff3cd; color: #856404; padding: 0 4px; font-weight: bold;\">12.5 Tỷ VNĐ</span> trong 12 tháng.",
      "pj_3_b2": "<strong>Hiệu suất Shopee:</strong> Tối ưu SEO & Campaign sàn, đạt CR <span style=\"background-color: #d4edda; color: #155724; padding: 0 4px; font-weight: bold;\">5.13%</span> (Gấp 2 lần TB ngành).",
      "pj_3_b3": "<strong>Hiệu suất TikTok:</strong> Doanh thu <span style=\"background-color: #cce5ff; color: #004085; padding: 0 4px; font-weight: bold;\">9.57 Tỷ</span> đến từ Livestream & Video ngắn tự sản xuất (In-house).",
      "pj_3_btn1": "TikTok (9.5 Tỷ)",
      "pj_3_btn2": "Shopee (CR 5.13%)",
      
      "pj_4_header": "Lắp Đặt Camera Hà Nội <span style=\"background-color: #e6fffa; color: #2c7a7b; padding: 2px 8px; border-radius: 4px; font-size: 0.75em; border: 1px solid #81e6d9;\">📈 +25% Growth YoY</span>",
      "pj_4_time": "<span>01/2024 — 01/2025</span> <span style=\"color: #d63031; font-weight: 600; margin-left: 5px;\">| 🛠️ Tái cấu trúc & Tối ưu vận hành</span>",
      "pj_4_p1": "<strong>Chiến lược:</strong> Tập trung tối ưu nguồn lực nội bộ (In-house), đẩy mạnh Livestream & Campaign sàn.",
      "pj_4_p2": "<strong>📊 Kết quả Tự vận hành (2024):</strong>",
      "pj_4_b1": "<strong>Tổng doanh thu:</strong> Đạt <span style=\"background-color: #e6fffa; color: #004d40; padding: 0 4px; font-weight: bold;\">12.7 Tỷ VNĐ</span> hoàn toàn từ traffic tự nhiên & quảng cáo tối ưu.",
      "pj_4_b2": "<strong>Tăng trưởng Shopee:</strong> <span style=\"background-color: #d4edda; color: #155724; padding: 0 4px; font-weight: bold;\">▲ 25.19%</span> nhờ tối ưu SEO sản phẩm & tham gia Campaign lớn.",
      "pj_4_b3": "<strong>Bứt phá TikTok:</strong> Đạt doanh thu <span style=\"background-color: #fff3cd; color: #856404; padding: 0 4px; font-weight: bold;\">9.58 Tỷ</span> thông qua Video ngắn & Livestream bán hàng đều đặn.",
      "pj_4_btn1": "TikTok (9.58 Tỷ)",
      "pj_4_btn2": "Shopee (+25% Growth)",
      
      "pj_5_header": "Kho Công Nghệ 86 <span style=\"background-color: #f3e8ff; color: #7e22ce; padding: 2px 8px; border-radius: 4px; font-size: 0.75em; border: 1px solid #d8b4fe;\">🛡️ Market Coverage Strategy</span>",
      "pj_5_time": "<span>08/2024 — 01/2025</span> <span style=\"color: #9333ea; font-weight: 600; margin-left: 5px;\">| ⚡ Mở rộng hệ sinh thái & Sản phẩm phụ</span>",
      "pj_5_p1": "<strong>Mục tiêu:</strong> Thâu tóm thị trường ngách (Niche), tối đa hóa vòng đời khách hàng bằng các sản phẩm phụ trợ ngoài Camera.",
      "pj_5_p2": "<strong>🚀 Kết quả bước đầu (5 tháng hoạt động):</strong>",
      "pj_5_b1": "<strong>Tổng doanh thu:</strong> Đạt <span style=\"background-color: #f3e8ff; color: #6b21a8; padding: 0 4px; font-weight: bold;\">~670 Triệu VNĐ</span> trong giai đoạn Start-up (T8/2024 - T1/2025).",
      "pj_5_b2": "<strong>Hiệu suất Shopee:</strong> Shop mới đạt CR <span style=\"background-color: #e0e7ff; color: #3730a3; padding: 0 4px; font-weight: bold;\">4.62%</span> với 100% vận hành tự nhiên (Organic).",
      "pj_5_b3": "<strong>Chiến lược đa dạng hóa:</strong> Phủ sóng <span style=\"background-color: #fce7f3; color: #9d174d; padding: 0 4px; font-weight: bold;\">50+ mã sản phẩm</span> phụ kiện, mở rộng tệp khách hàng ngoài ngành Camera.",
      "pj_5_btn1": "TikTok (333 Tr)",
      "pj_5_btn2": "Shopee (CR 4.62%)",
      
      // Blog
      "blog_title": "Case & Certifications",
      "bl_1_cat": "Hands-on marketing",
      "bl_1_date": "01 Tháng 08, 2025",
      "bl_1_title": "F&B Ecommerce",
      "bl_1_desc": "Thực chiến Nghiên cứu Ngành hàng & Định giá → Chiến dịch ra mắt Thương mại điện tử → Thúc đẩy mức độ trung thành, Tỷ lệ chuyển đổi & Giá trị đơn hàng.",
      "bl_2_cat": "Certification",
      "bl_2_date": "08 Tháng 12, 2025",
      "bl_2_title": "Gemini Certified Educator",
      "bl_2_desc": "Chứng nhận kiến thức, kỹ năng và năng lực cơ bản cần thiết để sử dụng Google AI trong giáo dục.",
      "bl_3_cat": "Support",
      "bl_3_date": "23 Tháng 02, 2022",
      "bl_3_title": "Dịch vụ Hỗ trợ & Chăm sóc Sau bán",
      "bl_3_desc": "Chúng tôi cam kết cung cấp dịch vụ hậu mãi tốt nhất, đảm bảo trải nghiệm mượt mà và không rắc rối cho khách hàng.",
      "bl_4_cat": "My Blog",
      "bl_4_date": "23 Tháng 02, 2022",
      "bl_4_title": "Life, Tech & More",
      "bl_4_desc": "Những sự thật và thiết kế về một cuộc sống trọn vẹn, được giải thích chi tiết.",
      
      // Contact
      "contact_title": "Liên hệ",
      "contact_form_title": "Biểu mẫu liên hệ",
      "contact_ph_name": "Họ và tên",
      "contact_ph_email": "Địa chỉ Email",
      "contact_ph_message": "Lời nhắn của bạn",
      "contact_btn_send": "Gửi tin nhắn"
    },
    
    // ===============================================
    // ENGLISH
    // ===============================================
    "en": {
      "sidebar_job": "E-commerce Manager",
      "sidebar_show_contacts": "Show Contacts",
      "sidebar_email": "Email",
      "sidebar_phone": "Phone",
      "sidebar_birthday": "Birthday",
      "sidebar_location": "Location",
      "sidebar_address": "Dong Da, Hanoi, Vietnam",
      "nav_about": "About",
      "nav_resume": "Resume",
      "nav_project": "Projects",
      "nav_blog": "Blog",
      "nav_contact": "Contact",
      
      "about_title": "About Me",
      "about_p1": "I am a Data-driven E-commerce Operations Manager with over 4 years of hands-on experience.",
      "about_p2": "My expertise is building Brands from zero-to-hero and managing multi-channel systems with revenues up to 20 billion VND/year. My biggest strength is the ability to leverage AI & Automation to optimize operations and breakthrough business performance.",
      "service_title": "What I'm doing",
      "srv_1_desc": "Produce high-speed marketing images/videos using AI. Optimize Click-Through Rate (CTR) and audience retention.",
      "srv_2_desc": "Synchronous operation of TikTok Shop, Shopee (SYT+, Mall), Lazada. Scale-up revenue from 0 to 10 billion/year.",
      "srv_3_desc": "Business data analysis (Excel), trend forecasting, and pricing/promotion strategy development.",
      "srv_4_desc": "Deploy Ads, book KOC/KOLs, and optimize ROAS/GMV Max metrics to maximize profits.",
      "srv_5_desc": "Personnel training. Deploy operations, Customer Service, and Content teams to optimize workflow efficiency.",
      "srv_6_desc": "Marketplace strategy consulting, store setup. Resolve technical and operational issues.",
      "brand_title": "Brands",
      
      "resume_title": "Resume",
      "resume_exp_title": "Work Experience",
      "resume_dl_cv": "Download CV",
      
      "exp_1_company": "AC Trading and Service Joint Stock Company",
      "exp_1_role": "<strong>Role: </strong> Ecommerce Manager & R&D Lead",
      "exp_1_brand1": "<ion-icon name=\"leaf-outline\"></ion-icon> <em>F&B: Anlanh Farm (Herbal Tea)</em>",
      "exp_1_brand2": "<ion-icon name=\"footsteps-outline\"></ion-icon> <em>Fashion: KumaKids (Kids Fashion)</em>",
      "exp_1_p1": "- <strong>Business Pivot:</strong> Directly conducted market research (R&D) and pivoted the company's business from Fashion to F&B. Built the Anlanh Farm brand, achieving 330 million VND in revenue after just 4 months.",
      "exp_1_p2": "- <strong>Exit Strategy & Cash Flow:</strong> Executed a clearance strategy to recover capital for KumaKids, bringing in 1.75 Billion VND in cash flow to reinvest in new projects.",
      "exp_1_p3": "- <strong>Hybrid Operation:</strong> Combined internal traffic (Shopee CR 4.78%) and external traffic (TikTok/Reels) to optimize advertising costs.",
      
      "exp_2_company": "Hanoi Camera Installation LLC",
      "exp_2_role": "<strong>Role: </strong> Ecommerce Manager",
      "exp_2_brand1": "<ion-icon name=\"videocam-outline\"></ion-icon> <em>Camera Gia Dinh (Top 3 Ezviz)</em>",
      "exp_2_brand2": "<ion-icon name=\"construct-outline\"></ion-icon> <em>Hanoi Camera Installation</em>",
      "exp_2_brand3": "<ion-icon name=\"hardware-chip-outline\"></ion-icon> <em>Kho Cong Nghe (Tech Warehouse)</em>",
      "exp_2_p1": "- <strong>Revenue Scale-up:</strong> Built a camera store system reaching total revenue of ~25 Billion VND/year (Camera Gia Dinh accounted for 12.5 Billion).",
      "exp_2_p2": "- <strong>In-house Production:</strong> Built an internal Media team, self-produced Livestream & Short Video content, bringing in 9.57 Billion in revenue on TikTok Shop.",
      "exp_2_p3": "- <strong>Ecosystem Expansion:</strong> Developed the satellite project \"Kho Cong Nghe 86\" to capture the accessories niche market, maximizing customer lifetime value.",
      
      "exp_3_company": "Honda Vietnam",
      "exp_3_role": "<strong>Role: </strong> Data Analyst",
      "exp_3_p1": "- <strong>Big Data Analysis:</strong> Collected and processed business Big Data to support the Board of Directors in strategic decision-making.",
      "exp_3_p2": "- <strong>Management Reporting:</strong> Built intuitive Dashboard systems using Power BI and Excel to monitor real-time production performance.",
      
      "exp_4_company": "SV Mobile",
      "exp_4_role": "<strong>Role: </strong> Store Manager",
      "exp_4_p1": "- <strong>E-commerce Pioneer:</strong> Directly built and operated stores on Lazada/Shopee from the early market stage.",
      "exp_4_p2": "- <strong>Comprehensive Management:</strong> In charge of logistics, technical repairs, and multi-channel customer service.",
      
      "resume_edu_title": "Education",
      "edu_1_school": "Hanoi University of Mining and Geology",
      "edu_1_major": "<strong>Major: </strong> Information Systems - IT",
      "edu_1_desc": "- Data system analysis thinking, data administration, and project planning.",
      "edu_2_school": "Tuyen Quang High School for Gifted Students",
      "edu_2_major": "<strong>Major: </strong> Computer Science",
      "edu_2_desc": "- Foundation in logical thinking, algorithms, and optimal problem solving.",
      
      "resume_skill_title": "Professional Skills",
      "skill_1": "Ecommerce Operation (Shopee/TikTok/Lazada)",
      "skill_2": "Data Analysis & Financial Planning",
      "skill_3": "AI Application & Content Strategy",
      "skill_4": "Team Leadership & Training",
      
      "project_title": "Practical Projects",
      "project_subtitle": "Case Studies",
      
      "pj_ac_title": "0109572654 - AC TRADING AND SERVICE JSC",
      "pj_ac_date": "<ion-icon name=\"calendar-outline\" style=\"vertical-align: text-bottom;\"></ion-icon> Period: 2025 — Present",
      
      "pj_1_header": "Anlanh Farm (Herbal Tea) <span style=\"background-color: #dcfce7; color: #15803d; padding: 2px 8px; border-radius: 4px; font-size: 0.75em; border: 1px solid #86efac;\">🌱 Business Pivot & R&D</span>",
      "pj_1_time": "<span>08/2025 — Present</span> <span style=\"color: #16a34a; font-weight: 600; margin-left: 5px;\">| 🔄 Market Research & Launching</span>",
      "pj_1_p1": "<strong>Process:</strong> Full-stack from Research (Customer/Product) to launching. Pivoted company business to F&B industry.",
      "pj_1_p2": "<strong>🚀 Multi-tier Traffic Strategy (Hybrid):</strong>",
      "pj_1_b1": "<strong>TikTok Launching:</strong> Achieved revenue of <span style=\"background-color: #dcfce7; color: #15803d; padding: 0 4px; font-weight: bold;\">330 Million VND</span> (After just 4 months) leveraging KOCs & 500+ In-house Videos.",
      "pj_1_b2": "<strong>Shopee Performance:</strong> Optimized ads achieved a CR of <span style=\"background-color: #ffedd5; color: #c2410c; padding: 0 4px; font-weight: bold;\">4.78%</span> (High conversion rate for a new category).",
      "pj_1_b3": "<strong>External Traffic:</strong> Built a system of <span style=\"background-color: #dbeafe; color: #1d4ed8; padding: 0 4px; font-weight: bold;\">Satellite Fanpages & Reels</span> to direct cheap traffic to the store.",
      "pj_1_btn1": "TikTok (330M)",
      "pj_1_btn2": "Shopee (CR 4.78%)",
      
      "pj_2_header": "KumaKids (Kids Fashion) <span style=\"background-color: #ffe4e6; color: #be123c; padding: 2px 8px; border-radius: 4px; font-size: 0.75em; border: 1px solid #fda4af;\">🔄 Strategic Pivot & Exit</span>",
      "pj_2_time": "<span>01/2025 — 12/2025</span> <span style=\"color: #e11d48; font-weight: 600; margin-left: 5px;\">| 📉 Liquidation & Capital Recovery</span>",
      "pj_2_p1": "<strong>Context:</strong> Operated for growth in the early stage (Q1-Q2), then shifted to a full inventory liquidation strategy (Q3-Q4) to focus capital on Anlanh Farm.",
      "pj_2_p2": "<strong>💼 Cash Flow Management Results:</strong>",
      "pj_2_b1": "<strong>Growth Phase:</strong> Official Shop reached <span style=\"background-color: #dbeafe; color: #1e40af; padding: 0 4px; font-weight: bold;\">1.05 Billion VND</span> revenue with a growth of <span style=\"background-color: #dbeafe; color: #2563eb; font-weight: bold;\">▲ 71.76%</span>.",
      "pj_2_b2": "<strong>Total Capital Recovery:</strong> Brought in cash flow of <span style=\"background-color: #fce7f3; color: #9d174d; padding: 0 4px; font-weight: bold;\">~1.75 Billion VND</span> from liquidating 2 Fashion & Shoes stores.",
      "pj_2_b3": "<strong>Exit Strategy:</strong> Cleared <span style=\"background-color: #fee2e2; color: #991b1b; padding: 0 4px; font-weight: bold;\">90% of inventory</span> and cut operational costs to 0 to shift resources.",
      "pj_2_btn1": "Shopee Mall (+71%)",
      "pj_2_btn2": "Shopee SYT+ (Clearance)",
      
      "pj_cm_title": "0106850906 - HANOI CAMERA INSTALLATION LLC",
      "pj_cm_date": "<ion-icon name=\"calendar-outline\" style=\"vertical-align: text-bottom;\"></ion-icon> Period: 2024 — 2025",
      
      "pj_3_header": "Camera Gia Dinh <span style=\"background-color: #ffe5e5; color: #d63031; padding: 2px 8px; border-radius: 4px; font-size: 0.75em; border: 1px solid #fab1a0;\">🏆 Top 3 Best Seller EZVIZ</span>",
      "pj_3_time": "<span>01/2024 — 12/2024</span> <span style=\"color: #0984e3; font-weight: 600; margin-left: 5px;\">| 🚀 Rapid Growth (First year)</span>",
      "pj_3_p1": "<strong>Strategy:</strong> Built a new shop relying on internal operation & content production capabilities.",
      "pj_3_p2": "<strong>📈 Key Metrics (2024):</strong>",
      "pj_3_b1": "<strong>Revenue:</strong> Scaled from 0 to <span style=\"background-color: #fff3cd; color: #856404; padding: 0 4px; font-weight: bold;\">12.5 Billion VND</span> in 12 months.",
      "pj_3_b2": "<strong>Shopee Performance:</strong> Optimized SEO & Platform Campaigns, achieving CR of <span style=\"background-color: #d4edda; color: #155724; padding: 0 4px; font-weight: bold;\">5.13%</span> (Double the industry average).",
      "pj_3_b3": "<strong>TikTok Performance:</strong> <span style=\"background-color: #cce5ff; color: #004085; padding: 0 4px; font-weight: bold;\">9.57 Billion</span> revenue generated from self-produced Livestreams & Short Videos (In-house).",
      "pj_3_btn1": "TikTok (9.5B)",
      "pj_3_btn2": "Shopee (CR 5.13%)",
      
      "pj_4_header": "Hanoi Camera Installation <span style=\"background-color: #e6fffa; color: #2c7a7b; padding: 2px 8px; border-radius: 4px; font-size: 0.75em; border: 1px solid #81e6d9;\">📈 +25% Growth YoY</span>",
      "pj_4_time": "<span>01/2024 — 01/2025</span> <span style=\"color: #d63031; font-weight: 600; margin-left: 5px;\">| 🛠️ Restructuring & Operation Optimization</span>",
      "pj_4_p1": "<strong>Strategy:</strong> Focused on optimizing internal resources (In-house), boosting Livestreams & Platform Campaigns.",
      "pj_4_p2": "<strong>📊 Self-Operation Results (2024):</strong>",
      "pj_4_b1": "<strong>Total Revenue:</strong> Reached <span style=\"background-color: #e6fffa; color: #004d40; padding: 0 4px; font-weight: bold;\">12.7 Billion VND</span> entirely from organic traffic & optimized ads.",
      "pj_4_b2": "<strong>Shopee Growth:</strong> <span style=\"background-color: #d4edda; color: #155724; padding: 0 4px; font-weight: bold;\">▲ 25.19%</span> thanks to product SEO optimization & participation in Mega Campaigns.",
      "pj_4_b3": "<strong>TikTok Breakthrough:</strong> Reached revenue of <span style=\"background-color: #fff3cd; color: #856404; padding: 0 4px; font-weight: bold;\">9.58 Billion</span> through regular Short Videos & Sales Livestreams.",
      "pj_4_btn1": "TikTok (9.58B)",
      "pj_4_btn2": "Shopee (+25% Growth)",
      
      "pj_5_header": "Kho Cong Nghe 86 <span style=\"background-color: #f3e8ff; color: #7e22ce; padding: 2px 8px; border-radius: 4px; font-size: 0.75em; border: 1px solid #d8b4fe;\">🛡️ Market Coverage Strategy</span>",
      "pj_5_time": "<span>08/2024 — 01/2025</span> <span style=\"color: #9333ea; font-weight: 600; margin-left: 5px;\">| ⚡ Ecosystem & Accessory Expansion</span>",
      "pj_5_p1": "<strong>Objective:</strong> Capture the Niche market, maximizing customer lifetime value with ancillary products beyond Cameras.",
      "pj_5_p2": "<strong>🚀 Initial Results (5 months operation):</strong>",
      "pj_5_b1": "<strong>Total Revenue:</strong> Reached <span style=\"background-color: #f3e8ff; color: #6b21a8; padding: 0 4px; font-weight: bold;\">~670 Million VND</span> during the Start-up phase (Aug 2024 - Jan 2025).",
      "pj_5_b2": "<strong>Shopee Performance:</strong> New shop achieved CR of <span style=\"background-color: #e0e7ff; color: #3730a3; padding: 0 4px; font-weight: bold;\">4.62%</span> with 100% organic operation.",
      "pj_5_b3": "<strong>Diversification Strategy:</strong> Covered <span style=\"background-color: #fce7f3; color: #9d174d; padding: 0 4px; font-weight: bold;\">50+ SKUs</span> of accessories, expanding the customer base outside the Camera industry.",
      "pj_5_btn1": "TikTok (333M)",
      "pj_5_btn2": "Shopee (CR 4.62%)",
      
      "blog_title": "Cases & Certifications",
      "bl_1_cat": "Hands-on marketing",
      "bl_1_date": "Aug 01, 2025",
      "bl_1_title": "F&B Ecommerce",
      "bl_1_desc": "Hands-on Category & Pricing Research → E-commerce Launch Campaigns → Driving Customer Loyalty, Conversion Rate & AOV.",
      "bl_2_cat": "Certification",
      "bl_2_date": "Dec 08, 2025",
      "bl_2_title": "Gemini Certified Educator",
      "bl_2_desc": "Demonstrated knowledge, skills, and basic competencies needed to use Google AI in education.",
      "bl_3_cat": "Support",
      "bl_3_date": "Feb 23, 2022",
      "bl_3_title": "Customer Support & After-Sales Service",
      "bl_3_desc": "We are committed to providing the best after-sales support, ensuring a smooth and hassle-free experience for our customers.",
      "bl_4_cat": "My Blog",
      "bl_4_date": "Feb 23, 2022",
      "bl_4_title": "Life, Tech & More",
      "bl_4_desc": "Truths and designs of a fulfilling life, explained.",
      
      "contact_title": "Contact",
      "contact_form_title": "Contact Form",
      "contact_ph_name": "Full name",
      "contact_ph_email": "Email address",
      "contact_ph_message": "Your Message",
      "contact_btn_send": "Send Message"
    }
  };

  const langBtns = document.querySelectorAll('[data-lang-target]');
  const i18nElements = document.querySelectorAll('[data-i18n]');

  let currentLang = localStorage.getItem('portfolio_lang') || 'vi';

  const updateLanguage = (lang) => {
    currentLang = lang;
    localStorage.setItem('portfolio_lang', lang); 

    i18nElements.forEach(el => {
      const key = el.getAttribute('data-i18n');
      if (translations[lang] && translations[lang][key]) {
        // Kiểm tra nếu là thẻ input hoặc textarea thì thay đổi phần placeholder
        if (el.tagName === 'INPUT' || el.tagName === 'TEXTAREA') {
          el.placeholder = translations[lang][key];
        } else {
          el.innerHTML = translations[lang][key]; 
        }
      }
    });

    langBtns.forEach(btn => {
      if (btn.getAttribute('data-lang-target') === lang) {
        btn.classList.add('active');
      } else {
        btn.classList.remove('active');
      }
    });
  };

  langBtns.forEach(btn => {
    btn.addEventListener('click', (e) => {
      const targetLang = e.target.getAttribute('data-lang-target');
      if(targetLang !== currentLang) {
        updateLanguage(targetLang);
      }
    });
  });

  // Chạy lần đầu khi mở website
  updateLanguage(currentLang);
});
