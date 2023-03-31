const timeEl = document.getElementById('time');
const dateEl = document.getElementById('date');
const currentWeatherItemsEl = document.getElementById('wether-other-items');
const timezoneel = document.getElementById('timezone');
const countryEl = document.getElementById('place');
const weatherforcasteEl = document.getElementById('weather-forcaste');
const currenttempEl = document.getElementById('current-temp');

const dayel1 = document.getElementById('day1');
const tempel1 = document.getElementById('temp1');
const tempel11 = document.getElementById('temp11');

const dayel2 = document.getElementById('day2');
const tempel2 = document.getElementById('temp2');
const tempel21 = document.getElementById('temp21');

const dayel3 = document.getElementById('day3');
const tempel3 = document.getElementById('temp3');
const tempel31 = document.getElementById('temp31');


const dayel4 = document.getElementById('day4');
const tempel4 = document.getElementById('temp4');
const tempel41 = document.getElementById('temp41');

const dayel5 = document.getElementById('day5');
const tempel5 = document.getElementById('temp5');
const tempel51 = document.getElementById('temp51');


// const days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"]
const months = ["Jnauary", "February", "march", "April", "May", "June", "July", "August", "September", "October", "November" ,"December"]

const API_KEY = `da58749268e8278d39aefc821a97146f`;
setInterval(() => { 

    const days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"]

    const time = new Date();
    const month = time.getMonth();
    const date = time.getDate();
    const day = time.getDay();
   
    const hour = time.getHours();
    const hoursIn12hrFormat = hour >= 13 ? hour %12 : hour
    const minutes = time.getMinutes();
    const ampm = hour>=12 ? 'PM' : 'AM'

    timeEl.innerHTML= (hoursIn12hrFormat<10 ? '0'+hoursIn12hrFormat : hoursIn12hrFormat)+ ":" + (minutes<10 ? '0'+minutes : minutes) + " " +`<span id="am-pm">${ampm}</span>`

    dateEl.innerHTML = days[day] +", "+ date +" "+months[month]
    // currenttempEl.innerHTML = `<div class="day">${days[day]}</div>`
    dayel1.innerHTML = days[day]
    
    
    if(day==6){
        dayel2.innerHTML = days[0]
        dayel3.innerHTML = days[1]
        dayel4.innerHTML = days[2]
        dayel5.innerHTML = days[3]

    }

    if(day==0){
        dayel2.innerHTML = days[1]
        dayel3.innerHTML = days[2]
        dayel4.innerHTML = days[3]
        dayel5.innerHTML = days[4]

    }

    if(day==1){
        dayel2.innerHTML = days[2]
        dayel3.innerHTML = days[3]
        dayel4.innerHTML = days[4]
        dayel5.innerHTML = days[5]

    }

    if(day==2){
        dayel2.innerHTML = days[3]
        dayel3.innerHTML = days[4]
        dayel4.innerHTML = days[5]
        dayel5.innerHTML = days[6]

    }
    if(day==3){
        dayel2.innerHTML = days[4]
        dayel3.innerHTML = days[5]
        dayel4.innerHTML = days[6]
        dayel5.innerHTML = days[0]

    }
    if(day==4){
        dayel2.innerHTML = days[5]
        dayel3.innerHTML = days[6]
        dayel4.innerHTML = days[0]
        dayel5.innerHTML = days[1]

    }
    if(day==5){
        dayel2.innerHTML = days[6]
        dayel3.innerHTML = days[0]
        dayel4.innerHTML = days[1]
        dayel5.innerHTML = days[2]

    }
    
    
    
},1000);


//function call
getWeatherData();
function getWeatherData () {

    navigator.geolocation.getCurrentPosition((success)=>{
        // console.log(success);
        let {latitude, longitude} = success.coords;
        countryEl.innerHTML = ` <div class="place" id="place">${latitude+'N'+longitude+'E'}</div>`
        fetch(`https://api.openweathermap.org/data/2.5/forecast?lat=${latitude}&lon=${longitude}&units=metric&appid=${API_KEY}`).then(res=>res.json()).then(data=>{
            console.log(data);
            
         showweatherdata(data);
        })
    })
}

function showweatherdata(data){
    let{temp_max, temp_min ,humidity, pressure} = data.list[0].main;
    let{sunrise,sunset,timezone, country, name}=data.city;
    let{speed} = data.list[0].wind;

    
    

    timezoneel.innerHTML = `<div class="timezone" id="timezone">${name} / ${country}</div>`

    tempel11.innerHTML = ` <div class="temp">Temp_min : ${temp_min}&#176;</div>`
    tempel1.innerHTML = ` <div class="temp">Temp_max : ${temp_max}&#176;</div>`
    

    tempel2.innerHTML =  ` <div class="temp">Temp_max - ${data.list[8].main.temp_max}&#176;</div>`
    tempel21.innerHTML =  ` <div class="temp">Temp_min - ${data.list[8].main.temp_min}&#176;</div>`

    tempel3.innerHTML =  ` <div class="temp">Temp_max - ${data.list[16].main.temp_max}&#176;</div>`
    tempel31.innerHTML =  ` <div class="temp">Temp_min - ${data.list[16].main.temp_min}&#176;</div>`


    tempel4.innerHTML =  ` <div class="temp">Temp_max - ${data.list[24].main.temp_max}&#176;</div>`
    tempel41.innerHTML =  ` <div class="temp">Temp_min - ${data.list[24].main.temp_min}&#176;</div>`


    tempel5.innerHTML =  ` <div class="temp">Temp_max - ${data.list[32].main.temp_max}&#176;</div>`
    tempel51.innerHTML =  ` <div class="temp">Temp_min - ${data.list[32].main.temp_min}&#176;</div>`

  
   

   
    currentWeatherItemsEl.innerHTML =
    // `<div class="weather-item">
    // <div>Temprature</div>
    // <div>${temp}&#176;</div>
    // </div>
    `<div class="weather-item">
    <div>Humidity</div>
    <div>${humidity}%</div>
     </div>
    <div class="weather-item">
    <div>Pressure</div>
    <div>${pressure}</div>
    </div>

    <div class="weather-item">
    <div>Wind_speed</div>
    <div>${speed}</div>
    </div>
    <div class="weather-item">
    <div>Sunrise</div>
    <div>${window.moment(sunrise*1000).format('HH:mm a')}</div>
    </div>

   <div class="weather-item">
   <div>Sunset</div>
   <div>${window.moment(sunset*1000).format('HH:mm a')}</div>
   </div>`;

   

}