export function delay(s: number = 5) {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(null);
    }, s * 1000);
  });
}
