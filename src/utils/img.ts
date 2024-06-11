

export const preLoadImage = (link: string) => {
  return new Promise((resolve, reject) => {
    const img = new Image();
    img.src = link;
    img.onload = () => {
      resolve({ width: img.width, height: img.height });
    };
    img.onerror = (err) => {
      reject(err);
    };
  });
}