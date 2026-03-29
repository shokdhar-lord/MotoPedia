const container = document.getElementById("bikeContainer");
const brandContainer = document.getElementById("brandContainer");

const brandLogos = {
    "Yamaha": "https://upload.wikimedia.org/wikipedia/commons/8/8b/Yamaha_Motor_Logo_%281%29.svg",
    "Royal Enfield": "https://upload.wikimedia.org/wikipedia/commons/d/dd/Royal_enfield_logo_new.svg",
    "Kawasaki": "https://upload.wikimedia.org/wikipedia/commons/6/69/Kawasaki_Motorcycle_logo.svg",
    "Zero": "https://upload.wikimedia.org/wikipedia/commons/4/4e/Zero_Motorcycles_logo.svg",
    "Honda": "https://upload.wikimedia.org/wikipedia/commons/c/c5/Honda-logo.svg",
    "Ducati": "https://upload.wikimedia.org/wikipedia/commons/1/1a/Ducati_logo.svg",
    "KTM": "https://upload.wikimedia.org/wikipedia/commons/6/66/KTM_logo.svg",
    "BMW": "https://upload.wikimedia.org/wikipedia/commons/4/44/BMW.svg",
    "Harley-Davidson": "https://upload.wikimedia.org/wikipedia/commons/d/d6/Harley-Davidson_logo.svg",
    "Aprilia": "https://upload.wikimedia.org/wikipedia/commons/9/91/Aprilia_logo.svg",
    "MV Agusta": "https://upload.wikimedia.org/wikipedia/commons/e/ee/Logo-mv-agusta.svg",
    "Triumph": "https://upload.wikimedia.org/wikipedia/commons/d/dd/Triumph_Motorcycles_logo.svg",
    "Suzuki": "https://upload.wikimedia.org/wikipedia/commons/1/12/Suzuki_logo_2.svg",
    "Indian": "https://upload.wikimedia.org/wikipedia/commons/5/5a/Indian_Motorcycle_Logo.svg",
    "LiveWire": "https://upload.wikimedia.org/wikipedia/commons/d/dc/LiveWire_logo_%282021%29.svg",
    "Energica": "https://upload.wikimedia.org/wikipedia/commons/0/07/Energica_logo.svg",
    "TVS": "https://upload.wikimedia.org/wikipedia/commons/3/30/TVS_Motor_Company_Logo.svg",
    "Bajaj": "https://upload.wikimedia.org/wikipedia/commons/0/0b/Bajaj_Auto_Logo.svg"
};

function renderBrands() {
    brandContainer.innerHTML = "";
    const brands = [...new Set(bikes.map(b => b.brand))];
    brands.forEach(brand => {
        const btn = document.createElement("button");
        btn.classList.add("brand-logo-btn");
        btn.onclick = () => filterBrand(brand);
        
        if (brandLogos[brand]) {
            btn.innerHTML = `<img src="${brandLogos[brand]}" alt="${brand}" class="brand-logo-img">`;
        } else {
            btn.textContent = brand; // fallback
        }
        
        brandContainer.appendChild(btn);
    });
}


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
            <div class="card-img-wrapper">
                <img src="${bike.image}" alt="${bike.model}" class="bike-img">
                <span class="bike-type-badge">${bike.type}</span>
            </div>
            <div class="card-content">
                <h3>${bike.brand} ${bike.model}</h3>
                <div class="bike-specs">
                    <span class="spec-badge">📅 ${bike.year}</span>
                    <span class="spec-badge">⚙️ ${bike.cc}cc</span>
                    <span class="spec-badge">💰 ${bike.price}</span>
                </div>
            </div>
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

function filterBrand(brand) {
    const filtered = bikes.filter(bike => bike.brand === brand);
    displayBikes(filtered);
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
renderBrands();


