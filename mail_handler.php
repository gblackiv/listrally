<?php
require_once('config/email_config.php');
include_once('config/mySqlCredentials.php');
require('phpmailer/PHPMailer/PHPMailerAutoload.php');
$mail = new PHPMailer;
$mail->SMTPDebug = 0;           // Enable verbose debug output. Change to 0 to disable debugging output.

$mail->isSMTP();                // Set mailer to use SMTP.
$mail->Host = 'smtp.gmail.com'; // Specify main and backup SMTP servers.
$mail->SMTPAuth = true;         // Enable SMTP authentication


$mail->Username = EMAIL_USER;   // SMTP username
$mail->Password = EMAIL_PASS;   // SMTP password
$mail->SMTPSecure = 'tls';      // Enable TLS encryption, `ssl` also accepted, but TLS is a newer more-secure encryption
$mail->Port = 587;              // TCP port to connect to
$options = array(
    'ssl' => array(
        'verify_peer' => false,
        'verify_peer_name' => false,
        'allow_self_signed' => true
    )
);


$query = "SELECT users.name as usersName, email, lists.name as listsName, eventTime, items.name as itemsName FROM users JOIN items ON users.ID=assignedUserID JOIN list_to_users ON users.ID=userID JOIN lists ON list_to_users.listID = lists.ID WHERE (eventTime <= DATE(NOW()) + INTERVAL 7 DAY AND items.listID = list_to_users.listID AND notifications=true AND email IS NOT NULL) ORDER BY usersName";

$result = mysqli_query( $conn, $query );

if (mysqli_num_rows($result) > 0) {
    // output data of each row
    while($row = mysqli_fetch_assoc($result)) {
        print_r($row);

        $mail->smtpConnect($options);
        $mail->From = 'listrally@gmail.com';  // sender's email address (shows in "From" field)
        $mail->FromName = 'List Rally App';   // sender's name (shows in "From" field)
        $mail->addAddress($row['email']);  // Add a recipient
        $mail->addReplyTo('listrally@gmail.com');                          // Add a reply-to address

        $mail->Subject = 'A friendly reminder from ListRally';
        $mail->Body    = 'Hello, '.$row['usersName'].', '.$row['listsName'].' is coming up this week. The planned time is '.$row['eventTime'].' and you are signed up to bring '.$row['itemsName'].'. We hope the party goes well!';
        
        if(!$mail->send()) {
            echo 'Message could not be sent.';
            echo 'Mailer Error: ' . $mail->ErrorInfo;
        } else {
            echo 'Message has been sent';
        }
    }
} else {
    echo "0 results";
}





// //$mail->addAddress('ellen@example.com');                        // Name is optional
// //$mail->addCC('cc@example.com');
// //$mail->addBCC('bcc@example.com');

// //$mail->addAttachment('/var/tmp/file.tar.gz');         // Add attachments
// //$mail->addAttachment('/tmp/image.jpg', 'new.jpg');    // Optional name
// // $mail->isHTML(true);                                  // Set email format to HTML

// // $mail->AltBody = 'This is the body in plain text for non-HTML mail clients';


?>
