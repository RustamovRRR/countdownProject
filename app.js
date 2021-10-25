const months = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];
const weekdays = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];

const giveaway = document.querySelector('.giveaway');
const deadline = document.querySelector('.deadline');
const items = document.querySelectorAll('.deadline-format h4');

let tempDate = new Date();
let tempYear = tempDate.getFullYear();
let tempMonth = tempDate.getMonth();
let tempDay = tempDate.getDate();

let futureDate = new Date(tempYear, tempMonth, tempDay + 10, 11, 30, 0);

const year = futureDate.getFullYear();
const hours = futureDate.getHours();
const minutes = futureDate.getMinutes();

let month = futureDate.getMonth();
month = months[month];
const date = futureDate.getDate();
let weekDay = futureDate.getDay();
weekDay = weekdays[weekDay];
giveaway.innerHTML = `giveaway ends on ${weekDay} ${date} ${month} ${year} ${hours}:${minutes}am`;

//future time in ms
const futureTime = futureDate.getTime();

getRemainingTime = () => {
  const today = new Date().getTime();
  const t = futureTime - today; 

  //1s = 1000ms
  //1m = 60s
  //1h = 60m
  //1d = 24h

  //values in ms
  const oneDay = 24 * 60 * 60 * 1000;
  const oneHour = 60 * 60 * 1000;
  const oneMinute = 60 * 1000;
  const oneSecond = 1000;

  //calculate how many days hours minutes left
  let days = Math.floor(t / oneDay);
  let hours = Math.floor((t % oneDay) / oneHour);
  let minutes = Math.floor((t % oneHour)/oneMinute);
  let seconds = Math.floor((t % oneMinute)/oneSecond);
  
  //set values to array
  const values = [days, hours, minutes, seconds];

  // for adding 0 in front of numbers which are smaller than 10
  format = item => {
    if (item < 10) {
      return item = `0${item}`      
    }
    return item;
  }

  items.forEach((item, index) => {
    item.innerHTML = format(values[index]);
  });

  if (t < 0) {
    clearInterval(countdown);
    deadline.innerHTML = `<h4 class="expired">sorry, this giveaway has expired</h4>`;    
  }
};

//countdown
let countdown = setInterval(getRemainingTime, 1000);

getRemainingTime();