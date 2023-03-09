import { FridgeItem } from "../constants/Types";

export default function expirationLevel(item: FridgeItem) {
    const msInDay = 24 * 60 * 60 * 1000;

    var today = Date.now();
    var diff = ( item.expirationDate.getTime() - today) / msInDay;

    if(diff > 3 && diff <= 10){
        return 2;
    }else if(diff > 10){
        return 3;
    }
}