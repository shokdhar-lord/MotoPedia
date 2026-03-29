const container = document.getElementById("bikeContainer");

function displayBikes(bikesToShow) {
    container.innerHTML = "";

    if (!bikesToShow || bikesToShow.length === 0) {
        const message = document.createElement("h2");
        message.textContent = " Bikes Not Found";
        message.style.color = "red";
        message.style.textAlign = "center";
        message.style.marginTop = "20px";
        container.appendChild(message);
        return;
    }

    bikesToShow.forEach((bike, index) => {
        const card = document.createElement("div");
        card.classList.add("bike-card");
        card.style.animationDelay = `${index * 0.05}s`;

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

document.getElementById("searchInput").addEventListener("input", function () {
    const value = this.value.toLowerCase();

    const filtered = bikes.filter(bike =>
        bike.brand.toLowerCase().includes(value) ||
        bike.model.toLowerCase().includes(value)
    );

    displayBikes(filtered);
});

displayBikes(bikes);


