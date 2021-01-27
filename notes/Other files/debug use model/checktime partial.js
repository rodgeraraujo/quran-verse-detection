console.time('test');
var fs = require('fs');
var tf = require('@tensorflow/tfjs');
var use = require('@tensorflow-models/universal-sentence-encoder');
require('@tensorflow/tfjs-node');

//dataNames = ["ahmedali","ahmedraza","arberry","daryabadi","hilali","itani","maududi","mubarakpuri","pickthall","qarai","qaribullah","sahih","sarwar","shakir","wahiduddin","yusufali"]
dataNames = ["sahih"]

extension = ".txt"
prestr = "en."
dataArr = []
embeddedDataArr = []
// No of verses
datalenght = 6236

// Array with 0 to 6235 integers
//oneArr = [...Array(datalenght).keys()]
oneArr = []
single = new Array(datalenght).fill(0)

for (i=0;i<single.length;i++){
  temp = [...single]
  temp[i]=1
  oneArr.push(temp)
}

targetArr = []


for (name of dataNames){
var buffer = fs.readFileSync(__dirname+"\\data\\"+prestr+name+extension);
        dataArr= dataArr.concat(buffer.toString().split(/\r?\n/))
targetArr = targetArr.concat(oneArr)
}

// Load the model.
fulltensor = tf.tensor([])

 function embedder(){
// return use.load().then(modeler => modeler.embed(dataset.splice(0,5000))).then( data => {
 use.load().then(model => model.embed(dataArr.splice(0,6300))).then( data => {
fulltensor = fulltensor.concat(data)

if(dataArr.length>0){
  embedder()
}else{

  console.log("embedding completed")
  console.timeEnd('test');
}
})
.catch(console.error)

}
embedder()
