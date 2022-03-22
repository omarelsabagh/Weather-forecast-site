
let dayIndex = document.getElementById(`dayIndexId`);
let dateIndex = document.getElementById(`dateIndexId`);
let cityIndex = document.getElementById(`cityIndexId`);
let degreeIndex = document.getElementById(`degreeIndexId`) ;
let icon1Index = document.getElementById(`icon1IndexId`);
let status1Index = document.getElementById(`status1IndexId`);
let humidityIndex = document.getElementById(`humidityIndexId`);
let windSpeedInedx = document.getElementById(`windSpeedInedxId`);
let windDirectionIndex = document.getElementById(`windDirectionIndexId`);
// let secondDayindex = document.getElementById(`secondDayIndexId`)
// let icon2Index = document.getElementById(`icon2IndexId`)
// let maxC2 = document.getElementById(`maxC2Id`)
// let minC2 = document.getElementById(`minC2Id`)
// let status2 = document.getElementById(`status2Id`)
// let thirdDayIndex =document.getElementById(`thirdDayIndexId`)
let nextDayIndex = document.getElementsByClassName(`nextDayIndexClass`);
let nextIconIndex = document.getElementsByClassName(`icon2IndexClass`);
let maxC2 = document.getElementsByClassName(`maxC2Class`);
let minC2 = document.getElementsByClassName(`minC2Class`);
let status2Index = document.getElementsByClassName(`status2`);
let searchIndex = document.getElementById(`searching`);
let searchingBtn = document.getElementById(`searchingBtn`);
let errorMsg = document.getElementById(`errorMsgId`);

let responseData ;

async function getWeatherData(currentCity=`london`)
{
    let apiResponse = await fetch(`https://api.weatherapi.com/v1/forecast.json?key=eadba02829834d60bde193241221703&q=${currentCity}&days=3`);
     responseData = await apiResponse.json();
     if(responseData.error)
     {
         errorMsg.classList.replace(`d-none`,`d-flex`);

     }
     else
     {
        displayFirstCard();
        displaySecondCard();
        errorMsg.classList.replace(`d-flex`,`d-none`);
       
     }
    

  
    //  displayThirdCard()
    
}

    
getWeatherData()

let days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
let months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul","Aug", "Sep", "Oct", "Nov", "Dec"];

function displayFirstCard()
{
    let day = new Date();
    dayIndex.innerHTML=days[day.getDay()];
    dateIndex.innerHTML=day.getDate()+` `+months[day.getMonth()];
    cityIndex.innerHTML=responseData.location.name;
    degreeIndex.innerHTML=responseData.current.temp_c;
    icon1Index.setAttribute(`src`,`https:${responseData.current.condition.icon}`);
    status1Index.innerHTML=responseData.current.condition.text;
    humidityIndex.innerHTML=responseData.current.humidity + "%";
    windSpeedInedx.innerHTML=responseData.current.wind_kph ;
    windDirectionIndex.innerHTML=responseData.current.wind_dir;
   
     
}
function displaySecondCard()
{
     
    for(let i=0 ;i<nextDayIndex.length;i++)
    {
        nextDayIndex[i].innerHTML=days[new Date(responseData.forecast.forecastday[i+1].date).getDay()] ;
        nextIconIndex[i].setAttribute(`src`,`https:${responseData.forecast.forecastday[i+1].day.condition.icon}`);
        maxC2[i].innerHTML=responseData.forecast.forecastday[i+1].day.maxtemp_c;
        minC2[i].innerHTML=responseData.forecast.forecastday[i+1].day.mintemp_c;
        status2Index[i].innerHTML=responseData.forecast.forecastday[i+1].day.condition.text;
    }

    // secondDayindex.innerHTML=days[day.getDay()+1]
    // icon2Index.setAttribute(`src`,`https:${responseData.forecast.forecastday[0].day.condition.icon}`)
    // maxC2.innerHTML=responseData.forecast.forecastday[0].day.maxtemp_c
    // minC2.innerHTML=responseData.forecast.forecastday[0].day.mintemp_c
    // status2.innerHTML=responseData.forecast.forecastday[0].day.condition.text
}





// searchIndex.addEventListener(`keyup`,searchingMethod)
searchingBtn.addEventListener(`click`,searchingMethod);
function searchingMethod(){
let searchValue=searchIndex.value;


getWeatherData(searchValue);
}
