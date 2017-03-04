/*
usage: convert subtitles separated by lines to srt form
*/

var readLine = require('readline');
var fs = require('fs');
var path = require('path');
var config = require('./config');

var transformer = (function(){
  var filename;
  var lineCount = 1;
  var lineReader;
  function init(argv){
    filename = path.resolve(__dirname, argv[2]);
    lineReader = readLine.createInterface({
      input: fs.createReadStream(filename),
    });
    read();
  }
  function read(){
    var outputStream ='';
    var outputPah = path.join(__dirname, 'result', path.parse(filename).name +'_out.srt');
    lineReader.on('line', function (line) {
      if(line.trim().length !== 0){
          outputStream += lineCount 
                  +'\n'
                  + '00:00:00,000 --> 00:00:00,000'
                  + '\n' 
                  +  '{\\fn'+ config.font +'\\fs40}'+line 
                  + '\n';
          lineCount ++;
        }
        else{
          console.error('nothing in file');
        }
    });

    lineReader.on('close', function() {
      try{
        fs.writeFileSync(outputPah, outputStream)
        console.log('done,check' , outputPah);
      }
      catch(err){
          console.error(err);
      };
    });
  }
  return {
    init: init,
  }
})();

if (process.argv.length !== 3) {
  console.log('Usage: node lines-to-srt  FILENAME');
  process.exit(1);
}
else{
  transformer.init(process.argv)
}

