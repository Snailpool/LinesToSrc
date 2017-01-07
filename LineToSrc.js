/*
usage: convert subtitles separated by lines to srt form
*/
if (process.argv.length < 3) {
  console.log('Usage: node ' + process.argv[1] + ' FILENAME');
  process.exit(1);
}
var filename = process.argv[2],
	outputStream ='',
	lineCount = 1,
	writer = require('fs');

var lineReader = require('readline').createInterface({
  input: require('fs').createReadStream(filename),
 });
lineReader.on('line', function (line) {
  if(line.trim().length !== 0){
    //console.log('Line from file:', line);
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
  // do something on finish here
	writer.writeFile( filename.split('.')[0] +'_out.srt', outputStream, function(err){
     if (err) {
          console.error(err)
     }
    else{
    
      console.log('done,check' , process.argv[2].slice(0,process.argv[2].indexOf('.')) + '_out.src');
    }
   });
});