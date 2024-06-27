let myMap = L.map("map", {
    center: [37.09, -95.71],
    zoom: 2
});

//Create Layers
let baseMaps = {
    "Greyscale": L.tileLayer('https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}.png', {
        attribution: '&copy; <a href="https://www.carto.com/">Carto</a> contributors, &copy; <a href="https://openstreetmap.org">OpenStreetMap</a> contributors'
    }),
    "Satellite": L.tileLayer('https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}', {
        attribution: 'Tiles &copy; Esri &mdash; Source: Esri, i-cubed, USDA, USGS, AEX, GeoEye, Getmapping, Aerogrid, IGN, IGP, UPR-EGP, and the GIS User Community'
    }),
    "Outdoor": L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
    })
};

baseMaps["Satellite"].addTo(myMap);

let overlays = {};

L.control.layers(baseMaps, overlays).addTo(myMap);

// Load GeoJSON data using D3.js

d3.json("data/merged_country_data.geojson", function(error, data) {
    if (error) {
        console.error("Error loading the GeoJSON file:", error);
    } else {
        // Process the loaded data here
        data.features.forEach(function(feature) {
            // Extract latitude and longitude from the GeoJSON properties
            var lat = parseFloat(feature.properties.lat); // Convert latitude to float
            var lng = parseFloat(feature.properties.lng); // Convert longitude to float
            
            var popupContent = ""; // Initialize popup content as an empty string
            if (feature.properties) {
                // Add properties to the popup content
                for (var key in feature.properties) {
                    popupContent += key + ": " + feature.properties[key] + "<br>";
                }
            }
            
            // Create marker
            var marker = L.marker([lat, lng]);
            
            // Bind popup to marker
            marker.bindPopup(popupContent);
            
            // Add mouseover event listener to marker
            marker.on('mouseover', function(event) {
                // Open popup when mouse goes over the marker
                this.openPopup();
            });
            
            // Add mouseout event listener to marker (optional)
            marker.on('mouseout', function(event) {
                // Close popup when mouse leaves the marker
                this.closePopup();
            });
            
            // Add marker to the map
            marker.addTo(myMap);
        });
    }
});
