/**
 * Generates sample raster graphics on an offscreen canvas for instant demonstration,
 * or handles user file uploads.
 */
export function generateAcademicTestPattern(width = 48, height = 48): ImageData {
  const canvas = document.createElement('canvas');
  canvas.width = width;
  canvas.height = height;
  const ctx = canvas.getContext('2d')!;

  // Pure white academic background
  ctx.fillStyle = '#FFFFFF';
  ctx.fillRect(0, 0, width, height);

  // Dark Teal geometric header / emblem banner
  ctx.fillStyle = '#147D78';
  ctx.fillRect(4, 4, width - 8, 10);

  // Diagonal cross-bars simulating diagrams / line art
  ctx.strokeStyle = '#202124';
  ctx.lineWidth = 2;
  ctx.beginPath();
  ctx.moveTo(8, 20);
  ctx.lineTo(width - 8, height - 8);
  ctx.moveTo(width - 8, 20);
  ctx.lineTo(8, height - 8);
  ctx.stroke();

  // Accent circles
  ctx.fillStyle = '#147D78';
  ctx.beginPath();
  ctx.arc(width / 2, height / 2, 6, 0, Math.PI * 2);
  ctx.fill();

  return ctx.getImageData(0, 0, width, height);
}

export function generateGeometricIconPattern(width = 36, height = 36): ImageData {
  const canvas = document.createElement('canvas');
  canvas.width = width;
  canvas.height = height;
  const ctx = canvas.getContext('2d')!;

  // Solid clean background
  ctx.fillStyle = '#FAFAFA';
  ctx.fillRect(0, 0, width, height);

  // Concentric squares
  ctx.strokeStyle = '#147D78';
  ctx.lineWidth = 3;
  ctx.strokeRect(6, 6, width - 12, height - 12);

  ctx.fillStyle = '#202124';
  ctx.fillRect(12, 12, width - 24, height - 24);

  return ctx.getImageData(0, 0, width, height);
}
