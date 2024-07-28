window.addEventListener("load", () => {

    let apiBase = "https://geo.ipify.org/api/v2/country,city?apiKey=at_g5kRgTZgHEKy1ddvj8a3uOwzKoYo0";
    let apiWithIp = apiBase + "&ipAddress=";
    let $filtrarIp = document.getElementById("filtrar-ip");

    let $resultIp = document.getElementById("result-ip");
    let $resultLocation = document.getElementById("result-location");
    let $resultTimezone = document.getElementById("result-timezone");
    let $resultIsp = document.getElementById("result-isp");

    // Inicializar el mapa
    let map = L.map('map').setView([0, 0], 2); // Coordenadas iniciales y zoom

    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
    }).addTo(map);

    let marker = L.marker([0, 0]).addTo(map); // Crear un marcador inicial

    async function obtenerDatos(apiUrl) {
        const request = await fetch(apiUrl, { method: "GET" });
        const data = await request.json();

        $resultIp.innerText = data.ip;
        $resultLocation.innerText = `${data.location.region}, ${data.location.country}`;
        $resultTimezone.innerText = "UTC" + data.location.timezone;
        $resultIsp.innerText = data.isp;

        console.log(data);
        // Verificar latitud y longitud recibidas
        let lat = data.location.lat;
        let lng = data.location.lng;
        console.log(`Latitud: ${lat}, Longitud: ${lng}`);

        // Actualizar el mapa y el marcador con la nueva ubicación
        map.setView([lat, lng], 13); // Centrar el mapa en la nueva ubicación
        marker.setLatLng([lat, lng]); // Mover el marcador a la nueva ubicación

    }

    obtenerDatos(apiBase);
    $filtrarIp.addEventListener("click", () => {
        let $searchInput = document.getElementById("search");
        let $search = $searchInput.value;

        obtenerDatos(apiWithIp + $search);
        $searchInput.value = "";

    });
});
