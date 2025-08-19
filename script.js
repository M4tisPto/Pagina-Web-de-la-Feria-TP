function scaleImageMap() {
    const img = document.getElementById('map-image');
    if (!img.complete) {
        // Si la imagen aún no terminó de cargar, esperar
        img.addEventListener('load', scaleImageMap);
        return;
    }

    const map = document.querySelector('map[name="' + img.useMap.slice(1) + '"]');
    const areas = map.querySelectorAll('area');

    const originalWidth = img.naturalWidth;
    const originalHeight = img.naturalHeight;

    const displayedWidth = img.clientWidth;
    const displayedHeight = img.clientHeight;

    const widthRatio = displayedWidth / originalWidth;
    const heightRatio = displayedHeight / originalHeight;

    areas.forEach(area => {
        const originalCoords = area.dataset.originalCoords 
            ? area.dataset.originalCoords.split(',') 
            : area.coords.split(',');

        if (!area.dataset.originalCoords) {
            area.dataset.originalCoords = area.coords;
        }

        const scaledCoords = originalCoords.map((coord, i) => {
            return i % 2 === 0 
                ? Math.round(coord * widthRatio) 
                : Math.round(coord * heightRatio);
        });

        area.coords = scaledCoords.join(',');
    });
}

window.addEventListener('load', scaleImageMap);
window.addEventListener('resize', scaleImageMap);
