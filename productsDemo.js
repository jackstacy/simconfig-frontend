let currentPage = 1;

document.getElementById("filtersForm").addEventListener("submit", function (e) {
  e.preventDefault(); // Prevent the form from submitting in the traditional way

  currentPage = 1; // Reset to the first page when applying new filters
  applyFilters();
});

const applyFilters = () => {
  const brand = document.getElementById("brand").value;
  const maxPrice = document.getElementById("maxPrice").value;
  const wheelType = document.getElementById("wheelType").value;

  // Construct the API endpoint with query parameters based on selected filters
  let endpoint = `http://localhost:8000/wheels?page=${currentPage}`;
  if (brand) endpoint += `&brand=${brand}`;
  if (maxPrice) endpoint += `&price=${maxPrice}`;
  if (wheelType) endpoint += `&type=${wheelType}`;

  fetchWheels(endpoint); // Fetch wheels with the constructed endpoint
};

const fetchWheels = async (endpoint) => {
  try {
    const response = await fetch(endpoint);
    const data = await response.json();

    if (data.success) {
      renderWheels(data.data); // Function to render wheels as described previously
      updatePaginationInfo(data.page, data.totalPages, data.count, data.total);
    }
  } catch (error) {
    console.error("Error fetching data:", error);
  }
};

const renderWheels = (wheels) => {
  const container = document.getElementById("wheelsContainer");
  container.innerHTML = ""; // Clear the container

  wheels.forEach((wheel) => {
    const wheelElement = document.createElement("div");
    wheelElement.classList.add("wheel-cont");
    wheelElement.innerHTML = `
            <img src="${wheel.wheelImage}" alt="${wheel.wheelName}" class="product-img">
            <div class="item-info">
                <h3 class="brand">${wheel.wheelBrand}&#174</h3>
                <h3 class="model">${wheel.wheelName}</h3>               
                <p class="price">Normal Price: <span class="price-em">$${wheel.wheelPrice}</span></p>
                <button class="product-btn" data-id="${wheel._id}">Details and Retailers</button>
            </div>
        `;
    container.appendChild(wheelElement);

    const btn = wheelElement.querySelector(".product-btn");
    btn.addEventListener("click", function () {
      const productId = this.getAttribute("data-id");
      window.location.href = `wheelDetails.html?id=${productId}`; // Redirect to the wheel details page with the wheel _id as a query parameter
    });
  });
};

const updatePaginationInfo = (
  currentPage,
  totalPages,
  currentCount,
  totalCount
) => {
  document.getElementById(
    "currentPageInfo"
  ).textContent = `Page ${currentPage}`;
  document.getElementById("totalPagesInfo").textContent = `of ${totalPages}`;
  document.getElementById(
    "currentCountInfo"
  ).textContent = `Showing ${currentCount}`;
  document.getElementById(
    "totalCountInfo"
  ).textContent = `of ${totalCount} Results`;
  updatePaginationButtons(currentPage, totalPages); // Update the state of the pagination buttons
};

const updatePaginationButtons = (currentPage, totalPages) => {
  const prevButton = document.getElementById("prevPage");
  const nextButton = document.getElementById("nextPage");

  prevButton.disabled = currentPage <= 1;
  nextButton.disabled = currentPage >= totalPages;
};

document.getElementById("nextPage").addEventListener("click", () => {
  currentPage++;
  window.scrollTo({
    top: 0,
    left: 0,
    behavior: "smooth",
  });
  applyFilters(); // Reapply filters with the updated page
});

document.getElementById("prevPage").addEventListener("click", () => {
  if (currentPage > 1) {
    currentPage--;
    window.scrollTo({
      top: 0,
      left: 0,
      behavior: "smooth",
    });
    applyFilters(); // Reapply filters with the updated page
  }
});

// Initial fetch
applyFilters(); // Use applyFilters to include all filters and pagination in the initial fetch
