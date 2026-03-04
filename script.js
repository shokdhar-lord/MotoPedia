const container = document.getElementById("bikeContainer");

function displayBikes(bikesToShow) {
    container.innerHTML = "";

    // ❌ If no bikes found
    if (bikesToShow.length === 0) {
        container.innerHTML = `
            <h2 style="color:red; text-align:center;">
                ❌ Result Not Found
            </h2>
        `;
        return;
    }

    // ✅ If bikes exist
    bikesToShow.forEach(bike => {
        const card = document.createElement("div");
        card.classList.add("bike-card");

        card.innerHTML = `
            <img src="${bike.image}" alt="${bike.model}" class="bike-img">
            <h3>${bike.brand} ${bike.model}</h3>
            <p>Year: ${bike.year}</p>
            <p>CC: ${bike.cc}</p>
            <p>Type: ${bike.type}</p>
        `;

        container.appendChild(card);
    });
}

function filterCategory(category) {
    if (category === "All") {
        displayBikes(bikes);
    } else {
        const filtered = bikes.filter(bike => bike.type === category);
        displayBikes(filtered);
    }
}

document.getElementById("searchInput").addEventListener("input", function() {
    const value = this.value.toLowerCase();

    const filtered = bikes.filter(bike =>
        bike.brand.toLowerCase().includes(value) ||
        bike.model.toLowerCase().includes(value)
    );

    displayBikes(filtered);
});

displayBikes(bikes);
