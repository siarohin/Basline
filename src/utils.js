export const pause = time => new Promise((resolve) => {
  setTimeout(() => {
    resolve();
  }, time);
});

export const getDataFromLocalStorage = () => JSON.parse(localStorage.getItem('user-data'));

export const saveDataToLocalStorage = (field, value) => {
  const userData = Object.assign({}, getDataFromLocalStorage(), { [field]: value });
  localStorage.setItem('user-data', JSON.stringify(userData));
};

export const removeDataFromLocalStorage = () => {
  localStorage.removeItem('user-data');
};
