const fs = require('fs');
const path = require('path');

// Target directory on Desktop
const desktopPath = 'C:\\Users\\IRISPH\\OneDrive\\Escritorio';
const desktopVideosDir = path.join(desktopPath, 'Videos Fondos Arzon');

// Project public videos directory
const projectVideosDir = path.join(__dirname, '..', 'public', 'assets', 'videos');

// Service folders
const services = [
  'roofing',
  'painting',
  'siding',
  'windows-doors',
  'kitchen',
  'deck',
  'full-remodeling'
];

console.log('--- Sincronizador de Videos de Fondo ---');

// 1. Ensure Desktop folder and service subfolders exist
if (!fs.existsSync(desktopVideosDir)) {
  try {
    fs.mkdirSync(desktopVideosDir, { recursive: true });
    console.log(`Creada carpeta principal en el Escritorio: ${desktopVideosDir}`);
  } catch (err) {
    console.error('Error al crear la carpeta en el Escritorio:', err.message);
  }
}

services.forEach(service => {
  const serviceDesktopDir = path.join(desktopVideosDir, service);
  if (!fs.existsSync(serviceDesktopDir)) {
    try {
      fs.mkdirSync(serviceDesktopDir, { recursive: true });
      console.log(`  -> Creada subcarpeta de servicio: ${service}`);
      // Add a small README.txt in each folder explaining what to put here
      const readmeText = `Coloca el video de fondo para el servicio "${service}" aquí.\nEl video debe llamarse obligatoriamente: bg.mp4\n\nAl iniciar el servidor o construir la app, se copiará automáticamente.`;
      fs.writeFileSync(path.join(serviceDesktopDir, 'INSTRUCCIONES.txt'), readmeText, 'utf8');
    } catch (err) {
      console.error(`Error al crear subcarpeta ${service}:`, err.message);
    }
  }
});

// 2. Ensure project videos directory and service subfolders exist
if (!fs.existsSync(projectVideosDir)) {
  fs.mkdirSync(projectVideosDir, { recursive: true });
}

services.forEach(service => {
  const serviceProjectDir = path.join(projectVideosDir, service);
  if (!fs.existsSync(serviceProjectDir)) {
    fs.mkdirSync(serviceProjectDir, { recursive: true });
  }
});

// 3. Sync bg.mp4 from Desktop to Project
let syncCount = 0;
services.forEach(service => {
  const srcFile = path.join(desktopVideosDir, service, 'bg.mp4');
  const destFile = path.join(projectVideosDir, service, 'bg.mp4');

  if (fs.existsSync(srcFile)) {
    // Check if we need to copy (either dest doesn't exist or size/mtime differs)
    let shouldCopy = false;
    if (!fs.existsSync(destFile)) {
      shouldCopy = true;
    } else {
      const srcStat = fs.statSync(srcFile);
      const destStat = fs.statSync(destFile);
      if (srcStat.size !== destStat.size || srcStat.mtimeMs > destStat.mtimeMs) {
        shouldCopy = true;
      }
    }

    if (shouldCopy) {
      try {
        fs.copyFileSync(srcFile, destFile);
        console.log(`Sincronizado: ${service}/bg.mp4 -> Copiado al proyecto.`);
        syncCount++;
      } catch (err) {
        console.error(`Error al copiar video para ${service}:`, err.message);
      }
    }
  }
});

if (syncCount === 0) {
  console.log('Todo sincronizado. No se encontraron nuevos videos para copiar.');
} else {
  console.log(`Se sincronizaron ${syncCount} video(s) con éxito.`);
}
console.log('----------------------------------------');
