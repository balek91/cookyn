import { TabBarIOS } from "react-native";

getDifference = (date) => {
    let firstMs = new Date().getTime()
    let secondMs = date.getTime()

    let result = firstMs - secondMs
    if (result < 1000){
        return('0 sec')
    }else if( result > 1000 && result < 60000 ){
        return(`${Math.trunc(result/1000)} sec`)
    } else if(result > 60000 && result < 3600000){
        return(`${Math.trunc(result/60000)} min`)
    } else if(result > 3600000 && result < 86400000){
        if( (Math.trunc(result/3600000)) ==1 ){
            return(`${Math.trunc(result/3600000)} heure`)
        } else {
            return(`${Math.trunc(result/3600000)} heures`)
        }
    } else if (result > 86400000  && result < 604800000 ){
        if( (Math.trunc(result/86400000)) ==1 ){
            return(`${Math.trunc(result/86400000)} jour`)
        } else {
            return(`${Math.trunc(result/86400000)} jours`)
        }
    } else if (result > 604800000){
        if( (Math.trunc(result/604800000)) == 1 ){
            return(`${Math.trunc(result/604800000)} semaine`)
        } else {
            return(`${Math.trunc(result/604800000)} semaines`)
        }
    }
}

function stringToDate(_date,_format,_delimiter)
{
            var formatLowerCase=_format.toLowerCase();
            var formatItems=formatLowerCase.split(_delimiter);
            var dateItems=_date.split(_delimiter);
            var monthIndex=formatItems.indexOf("mm");
            var dayIndex=formatItems.indexOf("dd");
            var yearIndex=formatItems.indexOf("yyyy");
            var month=parseInt(dateItems[monthIndex]);
            month-=1;
            var formatedDate = new Date(dateItems[yearIndex],month,dateItems[dayIndex]);
            var finalDate = new Date(formatedDate.getTime() + 7200000)
            return finalDate;
}

function  stringToDateCalandar(_date, _delimiter, _delimiter2) {
    var tab = _date.split(_delimiter)
    var year = tab[0]
    var month = tab[1]
    var tabDay = tab[2].split(_delimiter2)
    var day = tabDay[0]
    console.log(year)
    console.log(month)
    console.log(day)

   var date = new Date(year, month, day)
   
   return date.getTime();
}

export default {getDifference, stringToDate, stringToDateCalandar}