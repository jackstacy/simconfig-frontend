document.addEventListener("DOMContentLoaded", () => {
  const params = new URLSearchParams(window.location.search);
  const wheelId = params.get("id"); // Get the wheel _id from the query parameter

  if (wheelId) {
    fetchWheelDetails(wheelId);
  }
});

const fetchWheelDetails = async (wheelId) => {
  try {
    const response = await fetch(
      `http://localhost:8000/api/getwheel/${wheelId}`
    );
    const data = await response.json();

    if (data.success) {
      displayWheelDetails(data.data);
    } else {
      console.error("Wheel not found");
    }
  } catch (error) {
    console.error("Error fetching wheel details:", error);
  }
};

const displayWheelDetails = (wheel) => {
  const container = document.getElementById("wheelDetailContainer");
  const retailers = document.getElementById("wheelRetailersContainer");
  const linktree = document.getElementById("linktree");

  container.innerHTML = `
    <img src="${wheel.wheelImage}" alt="${wheel.wheelName}" class="product-img">
    <div class="item-info">
        <h3 class="brand">${wheel.wheelBrand}&#174</h3>
        <h3 class="model">${wheel.wheelName}</h3>
        <p class="price">Normal Price: <span class="price-em">$${wheel.wheelPrice}</span></p>
        <p class="description">${wheel.wheelDescription}</p>
        <p class="type">Type: ${wheel.wheelSpecs.type}</p>
  `;

  wheel.wheelRetailers.forEach((retailer) => {
    retailers.innerHTML += `
      <div class="retailer">
        <div class="retailer-info">
            <h3 class="retailer-name">${retailer.name}</h3>
            <p class="retailer-location">${retailer.location}</p>
        </div>
        <a href="${retailer.website}" target="_blank"><button class="retailer-website">Retailer Website</button></a>
      </div>`;
  });

  linktree.innerHTML = `
    <a href="demo-v2.html" class="linktree-link">Home</a>
    <span> / </span>
    <a href="productsDemo.html" class="linktree-link">Wheels</a>
    <span> / </span>
    <span class="linktree-current">${wheel.wheelName}</span>`;

  // Add more elements for wheel details as needed
};
