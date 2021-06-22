
const input = require('./input.json')
const writeCsv  = require('objects-to-csv')

// const parsed = JSON.parse(input)
// console.log(input.records.length);

const records = input.records
const totalElement = records.length

const totalNumber = 30 
/**
 * 
 * @param {Array} input 
 * @returns  maximum  in seconds
 */
const totalTimeinSecons = (input)=>{
    var records = []

    // console.log(input[0]);

    for(let i = 0 ; i<input.length ; i++){
        const element = input[i]
        const seconds =element.Sec
        if(seconds===undefined || seconds ===null ||seconds ==='' || seconds ==='undefined'){
            // console.log(seconds);
        }else{
        records.push(parseFloat(seconds))
        }
       
    }
    // console.log(records);
    // records.sort()
    // records.reverse()
    return Math.max(...records)
}

const maxRpmFromArray = (input)=>{
    var records = []

    // console.log(input[0]);

    for(let i = 0 ; i<input.length ; i++){
        const element = input[i]
        const rpm =element.RPM
        if(rpm===undefined || rpm ===null ||rpm ==='' || rpm ==='undefined'){
            console.log(rpm);
        }else{
        records.push(parseFloat(rpm))
        }
       
    }

    // console.log(records);
    return Math.max(...records)

}


/**
 * before noise remove
 * Total time in seconds
 */

// const totalTime = totalTimeinSecons(records)
// console.log("Total time in seconds", totalTime);
// const maxRpm= maxRpmFromArray(records)
// console.log("Maximun RPM" ,maxRpm);
// const agvCt = totalTime /   totalNumber
// console.log("Average" ,agvCt)

// console.log(totalTime.forEach(element => {
//     console.log(element);  
// }));


/**
 * Solving time serise data using least sqaure method
 * trend equation = a +bx 
 * a - constant
 * b - constant
 * x - variable
 * a  = sigma (y) /N 
 * where N = total number of entry
 * b = sigma(xy) / sigma(x^2)
 */

/**
 * 
 * Need to create table of
 * time value |x=x-A |x^2|xy
 */


/**
 * Step 1 remove data entry if data is missing
 * removing anamolies
 */
var _data = []

records.forEach(element =>{
    // console.log(element);
    if(element.Sec ===""|| element.Sec ===undefined ||element.Sec==="undefined"){
        // console.log(element);
    }else{
        _data.push(element)
    }
})
var N = _data.length
var middle = N/2 
middle  = parseInt(middle)

var ASSUMEDMEAN  = parseFloat(_data[middle].Sec)
// console.log(ASSUMEDMEAN);
var SIGMA_Y = 0 
var SIGMA_Xy = 0
var SIGMA_SQX  =  0 


var arr = [] ; 
_data.forEach(element=>{
    const x  = parseFloat(element.Sec) - ASSUMEDMEAN
    // console.log(Z);
    const _item = {
        X:parseFloat(element.Sec),
        Y:parseFloat(element.RPM),
        x:x,
        sqx:Math.pow(x,2),
        xy:(x*parseFloat(element.RPM))
    }
    SIGMA_Y  = SIGMA_Y +(parseFloat(element.RPM))
    arr.push(_item)
})

console.log("Sigma y" , SIGMA_Y);
const a = SIGMA_Y / N 
console.log("a"  , a);
arr.forEach(element=>{
    // console.log(element);
    SIGMA_Xy  = SIGMA_Xy +parseFloat(element.xy)
    SIGMA_SQX  = SIGMA_SQX +parseFloat(element.sqx)
})
console.log("Sigma xy" ,SIGMA_Xy)
console.log("Sigma x^2" , SIGMA_SQX)
const b = SIGMA_Xy  /SIGMA_SQX
console.log("b" , b);


var finalTable = []
arr.forEach(element=>{
    // console.log(element);
    const te  = parseFloat(a) + (parseFloat(b)*parseFloat(element.sqx))
    const item ={
        X:parseFloat(element.X),
        Y:parseFloat(element.Y),
        x:element.x,
        sqx:element.sqx,
        xy:element.xy,
        te:te
    }
     finalTable.push(item)
})


// finalTable.forEach(item=>{
//     console.log(item);
// })


const csv  = new  writeCsv(finalTable)
csv.toDisk('./output.csv')














