<?php

$email = $_POST['email'];


require 'mailer/PHPMailerAutoload.php';

$mail = new PHPMailer;

//$mail->SMTPDebug = 3;                               // Enable verbose debug output

$mail->isSMTP();                                      // Set mailer to use SMTP
$mail->Host = '	server169.web-hosting.com';  // Specify main and backup SMTP servers
$mail->SMTPAuth = true;                               // Enable SMTP authentication
$mail->Username = 'jhernandez@technologyonbusiness.com';                 // SMTP username
$mail->Password = 'hola8326';                           // SMTP password
$mail->SMTPSecure = 'ssl';                            // Enable TLS encryption, `ssl` also accepted
$mail->Port =465;                                    // TCP port to connect to

$mail->setFrom('jhernandez@technologyonbusiness.com','Anonimo' );
$mail->addAddress('joseandres.hernandezsolano@gmail.com', 'Ignacio');     // Add a recipient


$mail->addAttachment('/var/tmp/file.tar.gz');         // Add attachments
$mail->addAttachment('/tmp/image.jpg', 'new.jpg');    // Optional name
$mail->isHTML(true);                                  // Set email format to HTML

$mail->Subject = 'Sugerencias';
$mail->Body    = 'Por favor enviarme informacion'.'<br>'.'correo enviado por: '.$email;
$mail->AltBody = 'This is the body in plain text for non-HTML mail clients';

if(!$mail->send()) {
   echo "<script language='javascript'>
alert('Mensaje no se ha enviado, porfavor intente de nuevo.');
window.location.href = 'index.html';
</script>";
}
 else {
    echo "<script language='javascript'>
alert('Mensaje enviado, muchas gracias.');
window.location.href = 'index.html';
</script>";
}
?>