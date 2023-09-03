export const checkProxy = async (treshold = 1000) => {
  var ip = ['224', Math.floor(Math.random() * 255), Math.floor(Math.random() * 255), Math.floor(Math.random() * 255)].join('.');
  var path = Math.floor(Math.random() * 1000000);
  const image = new Image();

  let start = Date.now();
  let end = 0;
  let resolve = null;

  let onload = function () {
    end = Date.now();
    let duration = end - start;
    resolve(duration);
  }
  image.onerror = onload;
  image.onload = onload;
  image.src = `https://${ip}/${path}`;

  setTimeout(() => {
    resolve(treshold);
  }, treshold);

  return new Promise((r) => {
    resolve = r;
  });
}