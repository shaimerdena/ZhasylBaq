// ЖасылБақ - Примеры использования скрипта plants.js
// Откройте консоль браузера (F12) и вставьте эти примеры

// ============================================================
// 1. ДОБАВЛЕНИЕ ОДНОГО РАСТЕНИЯ
// ============================================================

addPlant({
    name: 'Алма ағашы',
    type: 'Жеміс ағашы',
    sector: 'А-01',
    plantedDate: '2024-03-15',
    waterFrequency: 'Аптасына бір рет',
    notes: 'Крупный сорт, требует солнца'
});

// ============================================================
// 2. ДОБАВЛЕНИЕ НЕСКОЛЬКИХ РАСТЕНИЙ СРАЗУ
// ============================================================

const initialPlants = [
    {
        name: 'Роза',
        type: 'Гүл',
        sector: 'Б-02',
        plantedDate: '2024-05-10',
        waterFrequency: 'Күнде бір рет',
        notes: 'Красная роза'
    },
    {
        name: 'Кактус',
        type: 'Шөлді өсімдік',
        sector: 'В-03',
        plantedDate: '2024-07-20',
        waterFrequency: '2 күнде бір рет',
        notes: 'Мало воды требует'
    },
    {
        name: 'Монстера',
        type: 'Үй өсімдігі',
        sector: 'Г-04',
        plantedDate: '2023-08-12',
        waterFrequency: 'Аптасына 2 рет',
        notes: 'Высокая влажность'
    },
    {
        name: 'Лилия',
        type: 'Гүл',
        sector: 'Б-05',
        plantedDate: '2024-06-01',
        waterFrequency: 'Күнде бір рет',
        notes: 'Белая ароматная'
    },
    {
        name: 'Шырша',
        type: 'Қылқан жапырақты',
        sector: 'А-06',
        plantedDate: '2020-11-10',
        waterFrequency: '2 аптада бір рет',
        notes: 'Морозостойкая'
    }
];

// Добавляем все растения
initialPlants.forEach(plant => addPlant(plant));

// ============================================================
// 3. ПОЛУЧИТЬ ВСЕ РАСТЕНИЯ
// ============================================================

const allPlants = getPlantsFromStorage();
console.log('Все растения:', allPlants);
console.log('Количество:', allPlants.length);

// ============================================================
// 4. ПОЛУЧИТЬ ТОЛЬКО ЗДОРОВЫЕ РАСТЕНИЯ (90-100% здоровья)
// ============================================================

const healthyPlants = getPlantsFromStorage().filter(p => p.health >= 90);
console.log('Здоровые растения:', healthyPlants);

// ============================================================
// 5. ПОЛУЧИТЬ РАСТЕНИЯ, ТРЕБУЮЩИЕ ВНИМАНИЯ (40-70%)
// ============================================================

const cautionPlants = getPlantsFromStorage().filter(p => p.health >= 40 && p.health < 70);
console.log('Требуют внимания:', cautionPlants);

// ============================================================
// 6. ПОЛУЧИТЬ РАСТЕНИЯ В КРИТИЧНОМ СОСТОЯНИИ (<40%)
// ============================================================

const criticalPlants = getPlantsFromStorage().filter(p => p.health < 40);
console.log('Критичное состояние:', criticalPlants);

// ============================================================
// 7. ПОИСК РАСТЕНИЯ ПО НАЗВАНИЮ
// ============================================================

const findByName = (name) => {
    return getPlantsFromStorage().find(p => p.name.toLowerCase().includes(name.toLowerCase()));
};

console.log('Поиск розы:', findByName('Роза'));

// ============================================================
// 8. ПОИСК РАСТЕНИЙ ПО СЕКТОРУ
// ============================================================

const findBySector = (sector) => {
    return getPlantsFromStorage().filter(p => p.sector === sector);
};

console.log('Растения в секторе А:', findBySector('А-01'));

// ============================================================
// 9. НАЙТИ РАСТЕНИЕ С НАИМЕНЬШЕЙ ВЛАЖНОСТЬЮ
// ============================================================

const driest = getPlantsFromStorage().reduce((min, plant) =>
    plant.moisture < min.moisture ? plant : min
);
console.log('Самое сухое растение:', driest);

// ============================================================
// 10. НАЙТИ САМОЕ ТЕПЛОЕ МЕСТО
// ============================================================

const hottest = getPlantsFromStorage().reduce((max, plant) =>
    plant.temperature > max.temperature ? plant : max
);
console.log('Самое теплое место:', hottest);

// ============================================================
// 11. ОБНОВИТЬ ЗДОРОВЬЕ РАСТЕНИЯ
// ============================================================

const plants = getPlantsFromStorage();
if (plants.length > 0) {
    const firstPlant = plants[0];
    updatePlant(firstPlant.id, { health: 85, moisture: 65 });
    console.log('Обновлено первое растение');
}

// ============================================================
// 12. СТАТИСТИКА РАСТЕНИЙ
// ============================================================

const stats = () => {
    const plants = getPlantsFromStorage();
    return {
        total: plants.length,
        healthy: plants.filter(p => p.health >= 70).length,
        caution: plants.filter(p => p.health >= 40 && p.health < 70).length,
        critical: plants.filter(p => p.health < 40).length,
        avgHealth: (plants.reduce((sum, p) => sum + p.health, 0) / plants.length).toFixed(1),
        avgMoisture: (plants.reduce((sum, p) => sum + p.moisture, 0) / plants.length).toFixed(1)
    };
};

console.table(stats());

// ============================================================
// 13. ЭКСПОРТИРОВАТЬ В JSON
// ============================================================

const exportToJSON = () => {
    const plants = getPlantsFromStorage();
    const dataStr = JSON.stringify(plants, null, 2);
    console.log(dataStr);
    // Скопируйте это и сохраните в файл
};

exportToJSON();

// ============================================================
// 14. УДАЛИТЬ ВСЕ РАСТЕНИЯ
// ============================================================

const deleteAll = () => {
    localStorage.removeItem('jasylbaq_plants');
    location.reload();
};

// deleteAll(); // Раскомментируйте если хотите удалить все

// ============================================================
// 15. ОБНОВИТЬ СТАТИСТИКУ И ПЕРЕРИСОВАТЬ
// ============================================================

updateStats();
renderPlants();

console.log('✓ Готово! Проверьте страницу.');
