function getCentureCode(year){
    centure = Number(year.slice(0, 2));
    let startCenture = 19;
    if(centure >= startCenture){
        let arrayCodesOfCenture = [0, 6, 4, 2]; 
        return arrayCodesOfCenture[ (centure - startCenture) % 4]
    }
    else{
        let arrayCodesOfCenture = [0, 2, 4, 6]; 
        return arrayCodesOfCenture[ (startCenture - centure) % 4]

    }
}

function getYearCode(year, centureCode){
    twoLastNumbersOfYear = Number(year.slice(2, 4));
    return (centureCode + twoLastNumbersOfYear + (twoLastNumbersOfYear - twoLastNumbersOfYear % 4) / 4) % 7;
}

function getDayCode(day, monthCode, yearCode){
    return (day + monthCode + yearCode) % 7;
}

function writeCalendar(startDay, daysInMonthNumber){
    startDay = (startDay + 5) % 7;
    let dayOfMonth = 1;
    let calendar = document.getElementById('calendar');
    let week = '';
    for( let i = 0; i < startDay; i++){
        week += "<td></td>"
    } 

    while(dayOfMonth <= daysInMonthNumber){
        for(let i = startDay; i <= 6; i++){
            if(daysInMonthNumber >= dayOfMonth){
                week += `<td>${dayOfMonth}</td>`;
                dayOfMonth += 1;
            }
            else{
                week += '<td></td>'
            }
            
        }
        let tr = document.createElement('tr');
        tr.innerHTML = week;
        calendar.appendChild(tr);
        week = '';
        startDay = 0;
    }
}

function getCalendar(){
    const day = 1;
    const arrayCodesOfMonth = [1, 4, 4, 0, 2, 5, 0, 3, 6, 1, 4, 6]; 
    let userMonth = prompt('Введите номер месяца');
    let userYear = prompt('Введите год');
    if( ( (1 <=Number(userMonth) && Number(userMonth) <= 12) ) && (1000 <= Number(userYear) && Number(userYear) <= 9999) ){
        let title = document.getElementById('title');
        title.innerHTML = `${userMonth}.${userYear}`;
        let arrayOfDaysInMonth = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
        if(Number(userYear) % 4 === 0){
            arrayOfDaysInMonth[1] = 29;
        }
        let centureCode = getCentureCode(userYear);
        let yearCode = getYearCode(userYear, centureCode);
        let startDay = getDayCode(day, arrayCodesOfMonth[Number(userMonth) - 1], yearCode);
        if(Number(userYear) % 4 === 0 && Number(userMonth) <= 2){
            startDay = (startDay - 1) % 7;
            if(startDay < 0){
                startDay = 7 - startDay;
            }
        }
        writeCalendar(startDay, arrayOfDaysInMonth[Number(userMonth) - 1]);
    }
    else{
        if (!(1 <=Number(userMonth) && Number(userMonth) <= 12) ){
            alert('Введите корректный номер месяца(1 - 12)');
        }

        if ( !(1000 <= Number(userYear) && Number(userYear) <= 9999) ){
            alert('Введите корректный номер года (1000 - 9999)');
        }
    }
        
}
        
getCalendar();