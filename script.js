/*
Hacer que al cambiar el tamaño de la imagen por css con height and width, las areas y mapa singan en las mismas cordenadas 
*/
// Obtener todas las imágenes con mapas de imagen
const images = document.querySelectorAll('img[usemap]');
// Función para ajustar las coordenadas del mapa de imagen
function resizeImageMap() { 
    images.forEach(img => {
        const mapName = img.getAttribute('usemap').substring(1);
        const map = document.querySelector(`map[name="${mapName}"]`);
        if (map) {
            const originalWidth = img.naturalWidth;
            const originalHeight = img.naturalHeight;
            const currentWidth = img.clientWidth;
            const currentHeight = img.clientHeight;
            const widthRatio = currentWidth / originalWidth;
            const heightRatio = currentHeight / originalHeight;
            map.querySelectorAll('area').forEach(area => {
                const originalCoords = area.getAttribute('data-original-coords');
                if (!originalCoords) {
                    area.setAttribute('data-original-coords', area.coords);
                }
                const coords = area.getAttribute('data-original-coords').split(',').map(Number);
                const newCoords = coords.map((coord, index) => 
                    index % 2 === 0 ? Math.round(coord * widthRatio) : Math.round(coord * heightRatio)
                );
                area.coords = newCoords.join(',');
            });
        }
    });
}