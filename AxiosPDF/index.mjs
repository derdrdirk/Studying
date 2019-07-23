import express from 'express'
import axios from 'axios'
import toBase64  from 'arraybuffer-base64'
const stamperyClientId = 'fb04fde6adf092f';
const stamperySecret = 'abad3702-839f-4e60-a8a4-6456a27f0cad';
const stampery = axios.create({
  baseURL: 'https://api-prod.stampery.com',
  timeout: 1000,
  maxContentLength: 1000000,
  auth: {
    username: stamperyClientId,
    password: stamperySecret
  }
});
function toArrayBuffer(buf) {
  var ab = new ArrayBuffer(buf.length);
  var view = new Uint8Array(ab);
  for (var i = 0; i < buf.length; ++i) {
    view[i] = buf[i];
  }
  return ab;
}
function isAbv(value) {
  return value && value.buffer instanceof ArrayBuffer && value.byteLength !== undefined;
}

const app = express()

global.btoa = function (str) {return new Buffer(str).toString('base64');};
function _arrayBufferToBase64( buffer ) {
  var binary = '';
  var bytes = new Uint8Array( buffer );
  var len = bytes.byteLength;
  for (var i = 0; i < len; i++) {
    binary += String.fromCharCode( bytes[ i ] );
  }
  return binary;
}

app.get('/', function(req, res) {
  console.log('stamp');
  stampery.get(`/stamps/5b2a612680e0190004bcccc8.pdf`, {
    responseType: 'arraybuffer',
  })
    .then(result => {
      console.log('res')
      const buffer = Buffer.from(result.data)
      const base64 = buffer.toString('base64')
      const buf2 = Buffer.from(base64, 'base64')
      res.setHeader('Content-Type', 'application/pdf')
      res.send(buf2)
    }).catch(err => {
      console.log('err')
      console.log(err)
      res.send('error')
    }).then(() => {
      console.log('callback')
    })
})

app.listen(3000, () => console.log('Listening on port 3000!'))
