
import emailjs from 'emailjs-com';

class Emailjs{
/**
 *    generic email model to help send emails for user registration / forgot password / new work orders
 *     data parameter = to_name 
 */
static async sendEmailData(data){
    const EMAILJSPUBLICKEY = 'cX_TRtkwLTuzVnJBm'
    emailjs.init(EMAILJSPUBLICKEY)
    const templateParams = {
    from_name:"Work Order Portal",
    to_name:data.to_name,
    to_email:data.to_email,
    message:data.message
}
emailjs.send('service_yp7btdx', 'template_spo8d7m', templateParams)
.then(function() {
    console.log('SUCCESS!');
}, function(error) {
    console.log('FAILED...', error);
});
}
}


export default Emailjs;