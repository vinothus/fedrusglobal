// Google Maps API Configuration
// 
// Instructions:
// 1. Get your Google Maps API key from: https://console.cloud.google.com/
// 2. Enable the following APIs:
//    - Maps JavaScript API
//    - Places API
// 3. Replace "YOUR_API_KEY" below with your actual API key
// 4. Save this file and refresh your website

window.GOOGLE_MAPS_CONFIG = {
    // Replace "YOUR_API_KEY" with your actual Google Maps API key
    apiKey: "AIzaSyC2PAy3OLNk7YBfHti6JcDvTkbePsuRDqg",
    
    // Libraries to load (don't change unless you know what you're doing)
    libraries: ["places"],
    
    // API version (leave as default)
    version: "quarterly"
};

// Auto-load Google Maps API if key is provided and not already loaded
(function() {
    if (window.GOOGLE_MAPS_CONFIG.apiKey && 
        window.GOOGLE_MAPS_CONFIG.apiKey !== "AIzaSyC2PAy3OLNk7YBfHti6JcDvTkbePsuRDqg" && 
        !window.google) {
        
        var script = document.createElement('script');
        script.src = 'https://maps.googleapis.com/maps/api/js?key=' + 
                     window.GOOGLE_MAPS_CONFIG.apiKey + 
                     '&libraries=' + window.GOOGLE_MAPS_CONFIG.libraries.join(',') + 
                     '&loading=async';
        script.async = true;
        script.defer = true;
        
        // Handle script loading
        script.onload = function() {
            console.log('Google Maps API loaded successfully');
        };
        
        script.onerror = function() {
            console.error('Failed to load Google Maps API. Please check your API key.');
        };
        
        document.head.appendChild(script);
    }
})(); 