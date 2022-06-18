export const parseSessionVariable = () => {
  const script = document.querySelectorAll('script');
  let session = null;
  script.forEach((item) => {
    if (item.innerHTML === '') return;
    if (item.innerHTML.includes('session')) {
      session = JSON.parse(
        item.innerHTML.split('var session = ')[1].split(';')[0]
      );
    }
  });
  return session;
};
