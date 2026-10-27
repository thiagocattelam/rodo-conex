<?php

require __DIR__ . '/segredos.php';

function captchaValido()
{
    $ch = curl_init('https://www.google.com/recaptcha/api/siteverify');
    curl_setopt_array($ch, [
        CURLOPT_POST => true,
        CURLOPT_POSTFIELDS => http_build_query([
            'secret' => RECAPTCHA_SECRET,
            'response' => $_POST['g-recaptcha-response'] ?? '',
            'remoteip' => $_SERVER['REMOTE_ADDR'],
        ]),
        CURLOPT_RETURNTRANSFER => true,
        CURLOPT_TIMEOUT => 10,
    ]);
    $resposta = json_decode(curl_exec($ch), true);
    curl_close($ch);

    return !empty($resposta['success']);
}

function campo($nome)
{
    return trim(strip_tags($_POST[$nome] ?? ''));
}

function telefoneValido()
{
    $digitos = strlen(preg_replace('/\D/', '', campo('telefone')));

    return $digitos === 10 || $digitos === 11;
}

function voltar($status)
{
    header('Location: contato/?status=' . $status);
    exit;
}

function enviar($de, $para, $assunto, $corpo, $emailUsuario, $headersExtras = '')
{
    $headers = 'From: Rodo Conex <' . $de . ">\r\n"
        . 'Cc: ' . $emailUsuario . "\r\n"
        . 'Reply-To: ' . $emailUsuario . "\r\n"
        . "MIME-Version: 1.0\r\n"
        . $headersExtras;

    return mail(
        $para,
        '=?UTF-8?B?' . base64_encode($assunto) . '?=',
        $corpo,
        $headers,
        '-r' . $de
    );
}
