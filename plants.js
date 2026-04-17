// ЖасылБақ - Система управления растениями

// Хранилище растений в localStorage
const STORAGE_KEY = 'jasylbaq_plants';

// Список доступных эмодзи растений
const PLANT_EMOJIS = {
    'Алма ағашы': '🍎',
    'Раушан гүлі': '🌹',
    'Шырша': '🌲',
    'Монстера': '🪴',
    'Кактус': '🌵',
    'Тобылғы': '🌿',
    'Лилия': '🌸',
    'Орхидея': '🌺',
    'Роза': '🌷',
    'Нарцисс': '🌼'
};

// Инициализация приложения
function initPlants() {
    loadPlantsFromStorage();
    updateStats();
    renderPlants();
}

// Получить все растения из localStorage
function getPlantsFromStorage() {
    const data = localStorage.getItem(STORAGE_KEY);
    return data ? JSON.parse(data) : [];
}

// Сохранить растения в localStorage
function savePlantsToStorage(plants) {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(plants));
}

// Загрузить растения из хранилища
function loadPlantsFromStorage() {
    return getPlantsFromStorage();
}

// Добавить новое растение
function addPlant(plantData) {
    const plants = getPlantsFromStorage();

    // Создаём объект нового растения
    const newPlant = {
        id: Date.now(),
        name: plantData.name,
        type: plantData.type,
        sector: plantData.sector,
        plantedDate: plantData.plantedDate,
        waterFrequency: plantData.waterFrequency,
        notes: plantData.notes,
        emoji: PLANT_EMOJIS[plantData.name] || '🌿',
        health: 100,
        moisture: 50,
        temperature: 20,
        lastWatered: new Date().toISOString(),
        createdAt: new Date().toISOString()
    };

    plants.push(newPlant);
    savePlantsToStorage(plants);

    return newPlant;
}

// Удалить растение
function deletePlant(plantId) {
    const plants = getPlantsFromStorage();
    const filteredPlants = plants.filter(p => p.id !== plantId);
    savePlantsToStorage(filteredPlants);
    updateStats();
    renderPlants();
}

// Обновить данные растения
function updatePlant(plantId, updates) {
    const plants = getPlantsFromStorage();
    const plant = plants.find(p => p.id === plantId);

    if (plant) {
        Object.assign(plant, updates);
        savePlantsToStorage(plants);
    }

    return plant;
}

// Обновить статистику на странице
function updateStats() {
    const plants = getPlantsFromStorage();

    // Подсчёт здоровых растений
    const healthyPlants = plants.filter(p => p.health >= 70).length;
    const cautionPlants = plants.filter(p => p.health >= 40 && p.health < 70).length;
    const urgentPlants = plants.filter(p => p.health < 40).length;

    // Обновление статистики в DOM
    const statCards = document.querySelectorAll('.stat-card');
    if (statCards.length >= 4) {
        // Всего растений
        statCards[0].querySelector('.stat-value').textContent = plants.length;
        statCards[0].querySelector('.stat-change').textContent = '↑ +' + plants.length + ' осы айда';

        // Здоровые растения
        statCards[1].querySelector('.stat-value').textContent = healthyPlants;
        const healthyPercent = plants.length > 0 ? Math.round((healthyPlants / plants.length) * 100) : 0;
        statCards[1].querySelector('.stat-change').textContent = healthyPercent + '% жалпы';

        // Требуют внимания
        statCards[2].querySelector('.stat-value').textContent = cautionPlants;
        const prevCaution = cautionPlants > 0 ? cautionPlants - 1 : 0;
        statCards[2].querySelector('.stat-change').textContent = '↓ -' + prevCaution + ' кешеден';

        // Критические
        statCards[3].querySelector('.stat-value').textContent = urgentPlants;
        if (urgentPlants > 0) {
            statCards[3].querySelector('.stat-change').textContent = 'Дереу шара керек';
            statCards[3].querySelector('.stat-change').style.color = '#ef4444';
        }
    }
}

// Отобразить растения на странице
function renderPlants() {
    const plants = getPlantsFromStorage();
    const plantsGrid = document.querySelector('.plants-grid');

    if (!plantsGrid) return;

    // Очистить существующие карты (оставить только примеры)
    const existingCards = plantsGrid.querySelectorAll('.plant-card-detail');
    existingCards.forEach(card => card.remove());

    // Добавить новые растения из хранилища
    plants.forEach(plant => {
        const card = createPlantCard(plant);
        plantsGrid.appendChild(card);
    });
}

// Создать карточку растения
function createPlantCard(plant) {
    const healthColor = plant.health >= 70 ? 'dot-green' :
        plant.health >= 40 ? 'dot-yellow' : 'dot-red';

    const healthTextColor = plant.health >= 70 ? 'var(--green-main)' :
        plant.health >= 40 ? '#f59e0b' : '#ef4444';

    const card = document.createElement('div');
    card.className = 'plant-card-detail';
    card.innerHTML = `
    <div class="plant-card-top">
      <div class="plant-big-icon">${plant.emoji}</div>
      <div class="plant-status-dot ${healthColor}"></div>
    </div>
    <div class="plant-card-info">
      <div class="plant-card-name">${plant.name}</div>
      <div class="plant-card-type">${plant.type} · ${plant.sector}</div>
      <div class="plant-mini-stats">
        <div class="plant-mini-stat">
          <div class="plant-mini-val">${plant.moisture}%</div>
          <div class="plant-mini-label">💧 Ылғалдылық</div>
        </div>
        <div class="plant-mini-stat">
          <div class="plant-mini-val">${plant.temperature}°C</div>
          <div class="plant-mini-label">🌡️ Температура</div>
        </div>
      </div>
      <div class="plant-health-label">
        <span>Денсаулық</span>
        <span style="color:${healthTextColor}">${plant.health}%</span>
      </div>
      <div class="health-bar-wrap">
        <div class="health-bar-fill" style="width:${plant.health}%;background:${plant.health >= 70 ? 'linear-gradient(90deg, #22c55e, #4ade80)' :
            plant.health >= 40 ? 'linear-gradient(90deg, #f59e0b, #fbbf24)' :
                'linear-gradient(90deg, #ef4444, #f87171)'
        }"></div>
      </div>
    </div>
    <div class="plant-card-footer" style="background:${plant.health >= 70 ? '#e8f5ec' :
            plant.health >= 40 ? '#fff8e6' : '#fee2e2'
        }">
      <span class="plant-card-date">Отырғызылды: ${formatDate(plant.plantedDate)}</span>
      <span class="plant-card-action" style="color:${healthTextColor};cursor:pointer" onclick="deletePlant(${plant.id})">Өшіру →</span>
    </div>
  `;

    return card;
}

// Форматировать дату
function formatDate(dateString) {
    const date = new Date(dateString);
    return `${date.getDate().toString().padStart(2, '0')}.${(date.getMonth() + 1).toString().padStart(2, '0')}.${date.getFullYear()}`;
}

// Обработчик формы добавления растения
function handleAddPlant(event) {
    event.preventDefault();

    const form = event.target;
    const plantData = {
        name: form.querySelector('[name="plantName"]')?.value || 'Неизвестное растение',
        type: form.querySelector('[name="plantType"]')?.value || 'Растение',
        sector: form.querySelector('[name="sector"]')?.value || 'А-01',
        plantedDate: form.querySelector('[name="plantedDate"]')?.value || new Date().toISOString().split('T')[0],
        waterFrequency: form.querySelector('[name="waterFrequency"]')?.value || 'Аптасына бір рет',
        notes: form.querySelector('[name="notes"]')?.value || ''
    };

    // Добавить растение
    addPlant(plantData);

    // Закрыть модальное окно
    closeModal();

    // Обновить список
    updateStats();
    renderPlants();

    // Очистить форму
    form.reset();

    // Показать уведомление
    alert(`${plantData.name} сәтті қосылды!`);
}

// Инициализировать при загрузке страницы
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initPlants);
} else {
    initPlants();
}
