// Limiters (Safe to change values)
const maxChars = 17; // 17 is max before wrap
const maxItems = 100; // 10 is max before overflow


// For functionality (Don't change values)
let allowItemDelete = true; // If item from list should be deleted
let currInput; // current value of listInput
               // doesn't change when navigating prevInputs

let prevInputs = []; // max length should be 5
let prevInputsPos = -1; // position held in prevInputs
                       // when navigaing
                       
let errorFade; // Name for timeout in addError();