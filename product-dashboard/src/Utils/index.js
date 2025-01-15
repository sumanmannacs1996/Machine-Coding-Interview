export const fetchData = async (url) => {
  return fetch(url)
    .then((res) => {
      return res.json();
    })
    .then((data) => {
      console.log(data);
      return data;
    })
    .catch((error) => {
      console.log(error);
      return [];
    });
};

export function myThrottel(cb, delay) {
  let flag = true;
  return (e) => {
    const totalHeight = e.target.scrollHeight;
    const scrollBarHeight = e.target.offsetHeight;
    const scroolBarTopPosition = e.target.scrollTop;
    if (flag && totalHeight - (scrollBarHeight + scroolBarTopPosition) < 100) {
      flag = false;
      cb(e);
      setTimeout(() => {
        flag = true;
      }, delay);
    }
  };
}
