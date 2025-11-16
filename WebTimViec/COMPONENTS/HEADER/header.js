// Tính đường dẫn tương đối tùy theo độ sâu thư mục hiện tại
function getRelativePath(target) {
  const currentPath = window.location.pathname;
  const depth = currentPath.split("/").length - 2; // Trừ domain + tên file
  return "../".repeat(depth) + target;
}

window.addEventListener("DOMContentLoaded", () => {
  fetch(getRelativePath("COMPONENTS/HEADER/header.html"))
    .then((response) => response.text())
    .then((data) => {
      document.getElementById("header-placeholder").innerHTML = data;

      // Gọi lại xử lý menu sau khi header đã load
      setupHeaderEvents();
    })
    .catch((error) => console.error("Lỗi tải header:", error));
});

function setupHeaderEvents() {
  const mobileMenuButton = document.getElementById("mobileMenuButton");
  const mobileMenu = document.getElementById("mobileMenu");

  if (!mobileMenuButton || !mobileMenu) return;

  mobileMenuButton.addEventListener("click", () => {
    const isExpanded =
      mobileMenuButton.getAttribute("aria-expanded") === "true";
    if (isExpanded) {
      closeMobileMenu();
    } else {
      mobileMenu.classList.add("active");
      mobileMenuButton.setAttribute("aria-expanded", "true");
      mobileMenuButton.querySelector("span").textContent = "close";

      const firstMobileLink = mobileMenu.querySelector("a");
      if (firstMobileLink) firstMobileLink.focus();
    }
  });

  mobileMenu.addEventListener("click", (event) => {
    if (event.target === mobileMenu) {
      closeMobileMenu();
    }
  });

  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape" && mobileMenu.classList.contains("active")) {
      closeMobileMenu();
      mobileMenuButton.focus();
    }
  });

  function closeMobileMenu() {
    mobileMenu.classList.remove("active");
    mobileMenuButton.setAttribute("aria-expanded", "false");
    mobileMenuButton.querySelector("span").textContent = "menu";
  }

  // Xử lý tìm kiếm
  const searchInput = document.querySelector(".search-input");
  const searchIcon = document.querySelector(".search-icon");

  function emitSearchEvent() {
    if (!searchInput) return;
    const keyword = searchInput.value.trim();
    window.dispatchEvent(new CustomEvent("search-story", { detail: keyword }));
  }

  if (searchInput) {
    searchInput.addEventListener("keydown", function (e) {
      if (e.key === "Enter") {
        emitSearchEvent();
      }
    });
  }
  if (searchIcon) {
    searchIcon.addEventListener("click", emitSearchEvent);
  }
}

document.addEventListener("DOMContentLoaded", function () {
  const dropdownBtn = document.querySelector(".dropdown-btn");
  const dropdownContent = document.querySelector(".genre-dropdown-content");

  if (dropdownBtn && dropdownContent) {
    dropdownBtn.addEventListener("click", function (e) {
      e.stopPropagation();
      dropdownContent.classList.toggle("show");
    });

    document.addEventListener("click", function () {
      dropdownContent.classList.remove("show");
    });
  }
});
