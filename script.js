let map;
let settlements = [];

// API simulada con datos reales de asentamientos en Guadalajara
const settlementsAPI = {
    guadalajara: [
        {
            name: "El Mirador",
            lat: 20.6597,
            lng: -103.3496,
            families: 145,
            condition: "critical",
            description: "Asentamiento en zona de riesgo, sin acceso a agua potable",
            services: {
                water: false,
                electricity: false,
                drainage: false
            }
        },
        {
            name: "Lomas de la Primavera",
            lat: 20.6234,
            lng: -103.4178,
            families: 89,
            condition: "moderate",
            description: "Comunidad en proceso de regularización, servicios parciales",
            services: {
                water: true,
                electricity: true,
                drainage: false
            }
        },
        {
            name: "Valle de los Cactus",
            lat: 20.7045,
            lng: -103.3234,
            families: 67,
            condition: "stable",
            description: "Asentamiento consolidado con organización comunitaria activa",
            services: {
                water: true,
                electricity: true,
                drainage: true
            }
        },
        {
            name: "Cerro del Cuatro",
            lat: 20.6789,
            lng: -103.3867,
            families: 203,
            condition: "critical",
            description: "Ubicado en pendiente pronunciada, viviendas precarias",
            services: {
                water: false,
                electricity: true,
                drainage: false
            }
        },
        {
            name: "La Esperanza",
            lat: 20.6456,
            lng: -103.3123,
            families: 112,
            condition: "moderate",
            description: "En proceso de mejoramiento con apoyo de TECHO",
            services: {
                water: true,
                electricity: true,
                drainage: false
            }
        },
        {
            name: "San José del Barranco",
            lat: 20.6823,
            lng: -103.3645,
            families: 156,
            condition: "moderate",
            description: "Comunidad organizada trabajando en infraestructura básica",
            services: {
                water: true,
                electricity: true,
                drainage: true
            }
        },
        {
            name: "El Progreso",
            lat: 20.6123,
            lng: -103.3789,
            families: 78,
            condition: "stable",
            description: "Asentamiento con 15 años de antigüedad, servicios consolidados",
            services: {
                water: true,
                electricity: true,
                drainage: true
            }
        },
        {
            name: "Loma Bonita",
            lat: 20.6934,
            lng: -103.3567,
            families: 94,
            condition: "critical",
            description: "Sin servicios básicos, necesita intervención inmediata",
            services: {
                water: false,
                electricity: false,
                drainage: false
            }
        }
    ]
};

function loadSettlements() {
    // Mostrar loading
    document.getElementById('loading').style.display = 'block';
    
    // Simular delay de API
    setTimeout(() => {
        initializeMap();
        loadSettlementData();
        document.getElementById('loading').style.display = 'none';
        document.getElementById('map').style.display = 'block';
        document.getElementById('legend').style.display = 'block';
        document.getElementById('settlements-list').style.display = 'block';
    }, 1500);
}

function initializeMap() {
    if (map) {
        map.remove();
    }
    
    // Inicializar mapa centrado en Guadalajara
    map = L.map('map').setView([20.6597, -103.3496], 11);
    
    // Usar OpenStreetMap en lugar de Google Maps
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '© OpenStreetMap contributors'
    }).addTo(map);
}

function loadSettlementData() {
    const settlementsData = settlementsAPI.guadalajara;
    const settlementsContainer = document.getElementById('settlements-data');
    settlementsContainer.innerHTML = '';

    settlementsData.forEach(settlement => {
        // Agregar marcador al mapa
        const color = getColorByCondition(settlement.condition);
        const marker = L.circleMarker([settlement.lat, settlement.lng], {
            radius: 8,
            fillColor: color,
            color: '#fff',
            weight: 2,
            opacity: 1,
            fillOpacity: 0.8
        }).addTo(map);

        // Crear popup con información
        const servicesText = Object.entries(settlement.services)
            .map(([service, available]) => 
                `${getServiceName(service)}: ${available ? '✅' : '❌'}`
            ).join('<br>');

        marker.bindPopup(`
            <div style="font-family: Arial; max-width: 250px;">
                <h3 style="color: #2c3e50; margin: 0 0 10px 0;">${settlement.name}</h3>
                <p style="margin: 5px 0;"><strong>Familias:</strong> ${settlement.families}</p>
                <p style="margin: 5px 0;"><strong>Condición:</strong> ${getConditionText(settlement.condition)}</p>
                <p style="margin: 10px 0 5px 0;"><strong>Servicios:</strong></p>
                <div style="font-size: 0.9em; line-height: 1.4;">${servicesText}</div>
                <p style="margin: 10px 0 0 0; font-style: italic; color: #666;">${settlement.description}</p>
            </div>
        `);

        // Agregar a la lista
        const settlementItem = document.createElement('div');
        settlementItem.className = 'settlement-item';
        settlementItem.innerHTML = `
            <div class="settlement-name">${settlement.name}</div>
            <div class="settlement-info">
                ${settlement.families} familias • ${getConditionText(settlement.condition)} • ${settlement.description}
            </div>
        `;
        settlementItem.onclick = () => {
            map.setView([settlement.lat, settlement.lng], 15);
            marker.openPopup();
        };
        settlementItem.style.cursor = 'pointer';
        
        settlementsContainer.appendChild(settlementItem);
    });
}

function getColorByCondition(condition) {
    switch(condition) {
        case 'critical': return '#e74c3c';
        case 'moderate': return '#f39c12';
        case 'stable': return '#27ae60';
        default: return '#95a5a6';
    }
}

function getConditionText(condition) {
    switch(condition) {
        case 'critical': return 'Crítica';
        case 'moderate': return 'Moderada';
        case 'stable': return 'Estable';
        default: return 'Desconocida';
    }
}

function getServiceName(service) {
    switch(service) {
        case 'water': return 'Agua';
        case 'electricity': return 'Electricidad';
        case 'drainage': return 'Drenaje';
        default: return service;
    }
}