// footer.js

// Tính đường dẫn tương đối tùy theo độ sâu thư mục hiện tại
function getRelativePath(target) {
  const currentPath = window.location.pathname;
  const depth = currentPath.split("/").length - 2; // Trừ domain + tên file
  return "../".repeat(depth) + target;
}

fetch(getRelativePath("COMPONENTS/FOOTER/footer.html"))
  .then((response) => response.text())
  .then((data) => {
    const footerPlaceholder = document.getElementById("footer-placeholder");
    if (!footerPlaceholder) return;

    footerPlaceholder.innerHTML = data;

    // Gọi hàm xử lý logic sau khi footer được chèn xong
    initFooterBehavior();
  })
  .catch((error) => console.error("Lỗi tải footer:", error));

function initFooterBehavior() {
  // Highlight liên kết đang active
  const currentPath = window.location.pathname;
  const footerLinks = document.querySelectorAll(".footer-links a");

  footerLinks.forEach((link) => {
    const href = link.getAttribute("href");
    if (href && currentPath.includes(href)) {
      link.classList.add("active-footer-link");
    }
  });

  // Hiệu ứng focus vào icon
  const socialLinks = document.querySelectorAll(".social-link");
  socialLinks.forEach((link) => {
    link.addEventListener("focus", () => link.classList.add("focused"));
    link.addEventListener("blur", () => link.classList.remove("focused"));
  });
}
