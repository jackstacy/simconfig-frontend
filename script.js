// Wait for the DOM to load
document.addEventListener("DOMContentLoaded", function () {
  const browseButton = document.querySelector(".subnav-browse");
  const dropdownMenu = document.querySelector(".browse-dropdwn");
  dropdownMenu.style.display = "none";

  // Show the dropdown when mouse enters the button area
  browseButton.addEventListener("mouseenter", function () {
    dropdownMenu.style.display = "block";
    browseButton.classList.add("subnav-sel");
  });

  // Hide the dropdown when mouse leaves the button and dropdown area
  browseButton.addEventListener("mouseleave", function (event) {
    if (!event.relatedTarget || !dropdownMenu.contains(event.relatedTarget)) {
      dropdownMenu.style.display = "none";
      browseButton.classList.remove("subnav-sel");
    }
  });

  dropdownMenu.addEventListener("mouseleave", function () {
    dropdownMenu.style.display = "none";
    browseButton.classList.remove("subnav-sel");
  });
});
