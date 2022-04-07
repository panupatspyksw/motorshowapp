// Imports the Google Cloud client library.
const dotEnv = require('dotenv');
dotEnv.config();
const {Storage} = require('@google-cloud/storage');
const process = require('process'); // Required to mock environment variables
const {format} = require('util');
const projectId = process.env.PROJECT_ID
const keyFilename = './cloudstorage/jsonkey.json'
const storage = new Storage({projectId, keyFilename});
const bucket = storage.bucket(process.env.GCLOUD_STORAGE_BUCKET_BACKEND);
const bucketname = process.env.GCLOUD_STORAGE_BUCKET_BACKEND;
const crypto = require("crypto");
const resizeImg = require('resize-image-buffer');
const sizeOf = require('image-size')


module.exports.uploadfile =  async (file) => {
    return new Promise(async function(resolve, reject) {
        try{

            if (!file) {
                reject('No file uploaded.');
            }

            var filename = file.originalname;
            filename = filename.split('.')
            var orj = filename[0];
            filename = filename[filename.length-1]


            if(file.mimetype == 'image/png' || file.mimetype == 'image/jpeg' ||  file.mimetype == 'image/jpg'){
                file.buffer = await resizefile(file.buffer)
            }

            const id = crypto.randomBytes(10).toString("hex");
            filename = `${id}.${filename}`;
            const blob = bucket.file(filename);
            const blobStream = blob.createWriteStream();
        
            blobStream.on('error', err => {
            reject(err)
            });
        
            blobStream.on('finish', () => {
            // The public URL can be used to directly access the file via HTTP.
            const publicUrl = format(
                `https://storage.googleapis.com/${bucket.name}/${blob.name}`
            );
            resolve({orj,filename,publicUrl})
            });

            blobStream.end(file.buffer);
            

        }catch(err){
            console.log(err)
            reject(err)
        }
        
    })
}
module.exports.deletefile =  async (filename) => {
    return new Promise(async (resolve, reject) => {

    try{
    const fileName = filename
    await storage.bucket(bucketname).file(fileName).delete();  
    console.log(`gs://${bucketname}/${fileName} deleted`);
    resolve(`${fileName} delete successful`)
    }
    catch(err){
    reject(err)
    }
    })
}
  

module.exports.listfiles =  async (req,res) => {
    // Lists files in the bucket

    try{
    const [files] = await storage.bucket(bucketname).getFiles();
  
    console.log('Files:');
    files.forEach(file => {
      console.log(file.name);
    });
    return files
    }
    catch(err){
        return false
    }

}


const resizefile = async (imageFileBuffer) => {
    // let imageFileBuffer = await fs.readFileSync(path.resolve(__dirname, "./../public/media/afterhour.jpeg"));

var size = await sizeOf(imageFileBuffer)
var {newheight, newwidth} = getWidthHeithImageFilterByMaxWidthHeigth(size.width, size.height, 780, 520)
  const image = await resizeImg(imageFileBuffer, {
    width: newwidth,
    height: newheight,
  });

  return image //buffer
//  console.log(image)
//   fs.writeFileSync('logo123.png', image);
};



function getWidthHeithImageFilterByMaxWidthHeigth(rw, rh, mw, mh){

    var width = rw;
    var height = rh;
    var maxheight = mh;
    var maxwidth = mw;
    var newheight = height, newwidth = width
  
    // resize by max height  
    
  
    if(height > maxheight) {
      newheight = height + ((height/100) * relDiff(height, maxheight))
      newwidth = width + ((width/100) * relDiff(height, maxheight))
      height = newheight
      width = newwidth
  
    }
    if(width > maxwidth){
      newheight = height + ((height/100) * relDiff(width, maxwidth))
      newwidth = width + ((width/100) * relDiff(width, maxwidth))
  
    }
  
  
    return {newheight, newwidth}
    
}

function relDiff(oldn, newn) {
    var diff = (((newn-oldn)/oldn)*100).toFixed(2)
    return diff
}