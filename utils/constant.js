
// let ipconfig = ''
// if(process.env.NODE_ENV === 'development'){
//     console.log('开发环境')
// 	ipconfig = 'http://192.168.3.5:9007'
// }else{
let	ipconfig = 'http://161.189.168.218:9007'
    console.log('生产环境')
// }

export const action =ipconfig+ "/sys/upload/uploadImage";
export const actionJx =ipconfig+ "/user/image/BusinessImagedemo";
export const actionJs = ipconfig+'/user/image/DriverCardLicense';
