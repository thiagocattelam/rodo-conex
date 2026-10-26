<?php
require 'config.php';

const TAMANHO_MAXIMO = 5 * 1024 * 1024;
const EXTENSOES = ['pdf', 'doc', 'docx'];

if ($_SERVER['REQUEST_METHOD'] !== 'POST' || !captchaValido()) voltar('erro');

$nome = campo('nome');
$email = filter_var(campo('email'), FILTER_VALIDATE_EMAIL);
$arquivo = $_FILES['curriculo'] ?? null;

if (!$nome || !$email || !$arquivo || $arquivo['error'] !== UPLOAD_ERR_OK) voltar('erro');

$extensao = strtolower(pathinfo($arquivo['name'], PATHINFO_EXTENSION));

if (!in_array($extensao, EXTENSOES) || $arquivo['size'] > TAMANHO_MAXIMO) voltar('erro');

$texto = "Nome: $nome\n"
    . 'Telefone: ' . campo('telefone') . "\n"
    . "E-mail: $email\n"
    . 'Cidade: ' . campo('cidade') . '/' . campo('estado') . "\n"
    . 'Vaga de interesse: ' . campo('vaga') . "\n\n"
    . campo('mensagem');

$nomeArquivo = 'curriculo-' . preg_replace('/[^a-z0-9]+/i', '-', $nome) . '.' . $extensao;
$limite = md5(uniqid());

$corpo = "--$limite\r\n"
    . "Content-Type: text/plain; charset=UTF-8\r\n\r\n"
    . $texto . "\r\n"
    . "--$limite\r\n"
    . "Content-Type: application/octet-stream; name=\"$nomeArquivo\"\r\n"
    . "Content-Transfer-Encoding: base64\r\n"
    . "Content-Disposition: attachment; filename=\"$nomeArquivo\"\r\n\r\n"
    . chunk_split(base64_encode(file_get_contents($arquivo['tmp_name'])))
    . "--$limite--";

$ok = enviar(
    EMAIL_CURRICULO,
    EMAIL_CURRICULO,
    "Currículo pelo site - $nome",
    $corpo,
    $email,
    "Content-Type: multipart/mixed; boundary=\"$limite\"\r\n"
);

voltar($ok ? 'enviado' : 'erro');
