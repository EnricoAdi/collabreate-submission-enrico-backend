import { DateTime } from "luxon";

export function dateNowSql(){  
    return DateTime.now().toJSDate()
}
export function convertDateSql(dateTime: DateTime){  
    return dateTime.toJSDate()
}
export function convertToRFCFromString(date: string){  
    //delete anything from the 4th space
    return DateTime.fromISO(date).toRFC2822()?.split(" ").slice(0,4).join(" ")
}
export function convertToRFCFromStringIndo(date: string){
    return DateTime.fromISO(date)
    .setLocale('id') // Set locale to Indonesian
    .toLocaleString({ 
      weekday: 'long', 
      day: '2-digit', 
      month: 'short', 
      year: 'numeric' 
    })
    .replace(/\./g, ''); // Remove dots from abbreviated month
}
export function getDateFromString(date: string){
    //from iso string return to <month> <day>, <year>
    return DateTime.fromISO(date).toLocaleString(DateTime.DATE_MED)
}
export function trimDate(date:string, reverse:boolean = false){
    //received yyyy-mm-dd
    const dateSub = date.substring(0,10)
    if(!reverse) return dateSub
    //reverse to dd-mm-yyyy
    return dateSub.split("-").reverse().join("-")
}
export function getDateAndTimeFromString(date: string){
    return DateTime.fromISO(date).toLocaleString(DateTime.DATETIME_MED)
}
export function convertNumberToMonthIndo(month_in_number:number){
    switch (month_in_number) {
        case 1:
            return "Januari";
        case 2:
            return "Februari";
        case 3:
            return "Maret";
        case 4:
            return "April";
        case 5:
            return "Mei";
        case 6:
            return "Juni";
        case 7:
            return "Juli";
        case 8:
            return "Agustus";
        case 9:
            return "September";
        case 10:
            return "Oktober";
        case 11:
            return "November";
        case 12:
            return "Desember";
        default:
            return "January";
    }
}