const sharp = require('sharp');
const fs = require('fs');
const path = require('path');

const assetsDir = path.join(__dirname, 'public', 'assets');

if (!fs.existsSync(assetsDir)) {
  console.error("public/assets directory not found");
  process.exit(1);
}

const files = fs.readdirSync(assetsDir);

async function optimize() {
  console.log("Starting asset optimization scan...");
  
  for (const file of files) {
    const filePath = path.join(assetsDir, file);
    const ext = path.extname(file).toLowerCase();
    
    // Ignore folders or non-image files
    if (fs.statSync(filePath).isDirectory()) continue;
    
    if (ext === '.png' || ext === '.jpg' || ext === '.jpeg') {
      const stats = fs.statSync(filePath);
      
      // Target images larger than 400KB
      if (stats.size > 400000) {
        const sizeMB = (stats.size / (1024 * 1024)).toFixed(2);
        console.log(`Optimizing ${file} (${sizeMB} MB)...`);
        
        const tempPath = filePath + '.temp';
        try {
          if (ext === '.png') {
            // Compress PNG using palletized quantization and high compression
            await sharp(filePath)
              .png({ quality: 80, compressionLevel: 9, palette: true })
              .toFile(tempPath);
          } else {
            // Compress JPG using high efficiency mozjpeg
            await sharp(filePath)
              .jpeg({ quality: 80, mozjpeg: true })
              .toFile(tempPath);
          }
          
          if (fs.existsSync(tempPath)) {
            const newStats = fs.statSync(tempPath);
            // Replace only if compression actually made it smaller
            if (newStats.size < stats.size) {
              fs.unlinkSync(filePath);
              fs.renameSync(tempPath, filePath);
              const newSizeMB = (newStats.size / (1024 * 1024)).toFixed(2);
              console.log(`✓ Completed ${file}: ${sizeMB}MB → ${newSizeMB}MB`);
            } else {
              console.log(`- Skipped ${file}: compression did not yield size savings`);
              fs.unlinkSync(tempPath);
            }
          }
        } catch (err) {
          console.error(`✗ Error optimizing ${file}:`, err.message);
          if (fs.existsSync(tempPath)) {
            try { fs.unlinkSync(tempPath); } catch (e) {}
          }
        }
      }
    }
  }
  console.log("Asset optimization completed.");
}

optimize();
