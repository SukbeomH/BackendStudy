import { MaskedNum, NumInputFront, NumInputback, isDividerValid, isNumValid }
    from './resident-registration-number.js'


function CheckRegNumber(number) {
    if (isDividerValid(number) && isNumValid(NumInputFront(number), NumInputback(number))) {
        MaskedNum(number);
    }
}
CheckRegNumber("920324-1038293");