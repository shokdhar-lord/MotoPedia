document.addEventListener("DOMContentLoaded", () => {
    const urlParams = new URLSearchParams(window.location.search);
    const modelName = urlParams.get('model');

    if (!modelName) {
        document.getElementById('detailsContent').innerHTML = "<h2 style='text-align:center; color:white; margin-top:150px;'>Bike not found!</h2>";
        return;
    }

    const bike = bikes.find(b => b.model === modelName);

    if (!bike) {
        document.getElementById('detailsContent').innerHTML = "<h2 style='text-align:center; color:white; margin-top:150px;'>Bike not found in database!</h2>";
        return;
    }

    const detailsHTML = `
        <div class="details-container">
            <div class="details-image">
                <img src="${bike.image}" alt="${bike.brand} ${bike.model}">
            </div>
            <div class="details-info">
                <h1>${bike.model}</h1>
                <h2>${bike.brand}</h2>
                
                <div class="spec-item">
                    <span class="spec-label">Year:</span>
                    <span>${bike.year}</span>
                </div>
                <div class="spec-item">
                    <span class="spec-label">Engine size:</span>
                    <span>${bike.cc} cc</span>
                </div>
                <div class="spec-item">
                    <span class="spec-label">Category:</span>
                    <span>${bike.type}</span>
                </div>
                <div class="spec-item">
                    <span class="spec-label">Price:</span>
                    <span>${bike.price}</span>
                </div>
                
                <p style="margin-top:20px; line-height:1.6; color:#ddd; font-family: 'Montserrat', sans-serif;">
                    The <strong>${bike.brand} ${bike.model}</strong> is a premium ${bike.type} motorcycle from ${bike.year}. Renowned for its performance, it features a powerful ${bike.cc}cc engine and cutting-edge design. Whether you're conquering the track or cruising the streets, the ${bike.model} delivers an unforgettable riding experience. 
                    <br><br>
                    Experience the ultimate adrenaline rush and the perfect combination of speed, agility, and style with this incredible machine from ${bike.brand}.
                </p>

                <!-- Wikipedia Info Snippet -->
                <div id="wikiInfo" style="margin-top: 25px; padding: 15px; background: rgba(0, 255, 255, 0.05); border-left: 4px solid #00ffff; border-radius: 4px; color: #ddd; font-size: 0.95rem; line-height: 1.6; font-family: 'Montserrat', sans-serif;">
                    <em>Fetching live Wikipedia data...</em>
                </div>

                <a href="index.html" class="back-btn" style="margin-top: 30px;">⬅ Back to MotoPedia</a>
            </div>
        </div>
    `;

    document.getElementById('detailsContent').innerHTML = detailsHTML;

    // Fetch Wikipedia Info Client-Side
    const wikiUrl = `https://en.wikipedia.org/w/api.php?action=query&prop=extracts&explaintext=1&titles=${encodeURIComponent(bike.brand + ' ' + bike.model)}&format=json&origin=*`;

    fetch(wikiUrl)
        .then(response => response.json())
        .then(data => {
            const pages = data.query.pages;
            const pageId = Object.keys(pages)[0];
            const extract = pages[pageId].extract;

            const wikiDiv = document.getElementById('wikiInfo');

            // Helper function to format Wikipedia plain text sections into HTML headers
            const formatExtract = (text) => {
                return text
                    .replace(/====(.*?)====/g, '<h5 style="color:#ccc; margin-top:10px; font-size: 1rem;">$1</h5>')
                    .replace(/===(.*?)===/g, '<h4 style="color:#ff0055; margin-top:15px; font-size: 1.1rem;">$1</h4>')
                    .replace(/==(.*?)==/g, '<h3 style="color:#00ffff; margin-top:25px; margin-bottom: 10px; border-bottom: 1px solid #333; padding-bottom: 5px; font-size: 1.3rem;">$1</h3>')
                    .replace(/\n\n/g, '<br><br>')
                    .replace(/\n/g, ' ');
            };

            if (pageId === "-1" || !extract) {
                // Fallback attempt: query just the brand
                fetch(`https://en.wikipedia.org/w/api.php?action=query&prop=extracts&explaintext=1&titles=${encodeURIComponent(bike.brand + ' motorcycle')}&format=json&origin=*`)
                    .then(res => res.json())
                    .then(d => {
                        const brandPages = d.query.pages;
                        const brandId = Object.keys(brandPages)[0];
                        if (brandId !== "-1" && brandPages[brandId].extract) {
                            wikiDiv.innerHTML = `<strong style="color:white; font-size: 1.3rem;">Full Article: ${bike.brand}</strong><br><br>${formatExtract(brandPages[brandId].extract)} <br><br> <a href="https://en.wikipedia.org/wiki/${encodeURIComponent(bike.brand + ' motorcycle')}" target="_blank" style="color: #ff0055; font-weight:bold; text-decoration:none;">View on Wikipedia</a>`;
                        } else {
                            wikiDiv.innerHTML = "<em>No Wikipedia article found for this specific model or brand.</em>";
                        }
                    });
            } else {
                wikiDiv.innerHTML = `<strong style="color:white; font-size: 1.3rem;">Full Article: ${bike.brand} ${bike.model}</strong><br><br>${formatExtract(extract)} <br><br> <a href="https://en.wikipedia.org/wiki/${encodeURIComponent(bike.brand + ' ' + bike.model)}" target="_blank" style="color: #ff0055; font-weight:bold; text-decoration:none;">View on Wikipedia</a>`;
            }
        })
        .catch(err => {
            document.getElementById('wikiInfo').innerHTML = "<em>Failed to load Wikipedia data.</em>";
        });
});
