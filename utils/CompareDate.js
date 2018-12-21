getDifference = (date) => {
    console.log("dkaqbfkqfek " + date)
    let firstMs = new Date().getTime()
    let secondMs = date.getTime()

    console.log("fristttt" + firstMs)
    console.log("secccccpoond " + secondMs)

    let result = firstMs - secondMs
    console.log("résssssullt " +result)
    if (result < 1000){
        return('0 sec')
    }else if( result > 1000 && result < 6000 ){
        return(`${Math.trunc(result/1000)} sec`)
    } else if(result > 6000 && result < 3600000){
        return(`${Math.trunc(result/6000)} min`)
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

export default {getDifference, stringToDate}