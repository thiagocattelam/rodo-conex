<?php
require 'config.php';

if ($_SERVER['REQUEST_METHOD'] !== 'POST' || !captchaValido()) voltar('erro');

$nome = campo('nome');
$email = filter_var(campo('email'), FILTER_VALIDATE_EMAIL);

if (!$nome || !$email || !telefoneValido()) voltar('erro');

$corpo = "Nome: $nome\n"
    . 'Telefone: ' . campo('telefone') . "\n"
    . "E-mail: $email\n"
    . 'Cidade: ' . campo('cidade') . '/' . campo('estado') . "\n\n"
    . campo('mensagem');

$ok = enviar(
    EMAIL_CONTATO_DE,
    EMAIL_CONTATO_PARA,
    "Contato pelo site - $nome",
    $corpo,
    $email,
    "Content-Type: text/plain; charset=UTF-8\r\n"
);

voltar($ok ? 'enviado' : 'erro');
