/*
usage: convert subtitles separated by lines to srt form
*/

var readLine = require('readline');
var fs = require('fs');

var transformer = (function(){
  var filename;
  var lineCount = 1;
  var lineReader;
  function init(argv){
    filename = argv[2];
    lineReader = readLine.createInterface({
      input: fs.createReadStream(filename),
    });
    read();
  }
  function read(){
    var outputStream ='';
    lineReader.on('line', function (line) {
      if(line.trim().length !== 0){
        outputStream += lineCount 
                +'\n'
                + '00:00:00,000 --> 00:00:00,000'
                + '\n' 
                +  '{\\fnMicrosoft JhengHei\\fs40}'+line 
                + '\n';
        lineCount ++;
        }
    });

    lineReader.on('close', function() {
      fs.writeFile( filename.split('.')[0] +'_out.srt', outputStream, function(err){
        if (err) {
            console.error(err)
        }
        else{
          console.log('done,check' , filename.slice(0, filename.indexOf('.')) + '_out.src');
        }
       });
    });
  }
  return {
    init: init,
  }
})();

if (process.argv.length !== 3) {
  console.log('Usage: node lines-to-src' + ' FILENAME');
  process.exit(1);
}
else{
  transformer.init(process.argv)
}


// var filename = process.argv[2],
// 	outputStream ='',
// 	lineCount = 1,
// 	writer = require('fs');

// var lineReader = readLine.createInterface({
//   input: fs.createReadStream(filename),
//  });
// lineReader.on('line', function (line) {
//   if(line.trim().length !== 0){
//     //console.log('Line from file:', line);
//     outputStream += lineCount 
//     				+'\n'
//     				+ '00:00:00,000 --> 00:00:00,000'
//     				+ '\n' 
//     				+  '{\\fnMicrosoft JhengHei\\fs40}'+line 
//     				+ '\n';
//     lineCount ++;
//     }
// });

// lineReader.on('close', function() {
//   // do something on finish here
// 	writer.writeFile( filename.split('.')[0] +'_out.srt', outputStream, function(err){
//      if (err) {
//           console.error(err)
//      }
//     else{
    
//       console.log('done,check' , process.argv[2].slice(0,process.argv[2].indexOf('.')) + '_out.src');
//     }
//    });
// });