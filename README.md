# Rodo Conex

Site institucional da **Rodo Conex Transportes e Logística**, transportadora de Estância Velha (RS) que atua desde 2005 com transporte de cargas dedicadas para todo o Brasil, além de movimentação, paletização e armazenagem.

🔗 **No ar:** [rodoconex.com.br](https://rodoconex.com.br)

## Páginas

| Página | Conteúdo |
|---|---|
| Home | Banner principal, destaques, serviços em carrossel e seguros |
| Empresa | História e diferenciais da transportadora |
| Serviços | Transporte com frota própria e agregados, armazenagem e operação logística |
| Área de atendimento | Mapa de cobertura no território nacional |
| Clientes | Carrossel de logos dos clientes |
| Contato | Formulário de contato, "Trabalhe conosco" com envio de currículo e mapa |

## Tecnologias

- **HTML e CSS puros**, sem framework nem etapa de build, com CSS aninhado (nesting nativo) e layout responsivo mobile-first
- **JavaScript vanilla** para o menu mobile, os carrosséis, a máscara de telefone e o envio pelo WhatsApp
- **PHP** para enviar os formulários por e-mail, com o currículo anexado
- **Google reCAPTCHA v2** (caixa "Não sou um robô"), validado no navegador e no servidor
- Imagens em **WebP**, com versões separadas de banner para desktop e mobile

## Formulários de contato

A página de contato tem dois formulários:

- **Contato:** pode ser enviado por e-mail (`enviar.php`) ou aberto direto no WhatsApp com a mensagem já preenchida.
- **Trabalhe conosco:** envia os dados e o currículo anexado, em PDF, DOC ou DOCX de até 5 MB (`curriculo.php`).

Os dois validam o reCAPTCHA, o e-mail e o telefone com DDD (10 ou 11 dígitos), tanto no navegador quanto no PHP. O botão de envio só fica ativo depois que a caixa do reCAPTCHA é marcada. Depois do envio, o visitante volta para a página com um aviso de sucesso ou de erro.

## Estrutura

```
├── index.html              Home
├── empresa/                Uma pasta por página, cada uma com seu index.html
├── servicos/
├── areadeatendimento/
├── clientes/
├── contato/
├── assets/                 Imagens e fontes, organizadas por página
├── scripts/
│   ├── menu.js             Menu mobile
│   ├── carrossel.js        Carrosséis reutilizáveis
│   └── contato.js          Máscara de telefone, WhatsApp, reCAPTCHA e avisos
├── styles/styles.css
├── config.php              Funções de validação e de envio de e-mail
├── enviar.php              Formulário de contato
├── curriculo.php           Formulário "Trabalhe conosco"
└── segredos.php            Chaves e e-mails (fora do git)
```

## Rodando localmente

As páginas são estáticas: basta abrir com um servidor local, como o [Live Server](https://marketplace.visualstudio.com/items?itemName=ritwickdey.LiveServer) do VS Code, e acessar `http://127.0.0.1:5500`.

O envio dos formulários depende de PHP e de um servidor de e-mail, então só funciona na hospedagem.

## Configuração

Crie um `segredos.php` na raiz do projeto. Esse arquivo está no `.gitignore`.

```php
<?php

const RECAPTCHA_SECRET = 'sua-chave-secreta';

const EMAIL_CONTATO_DE = 'remetente@seudominio.com.br';
const EMAIL_CONTATO_PARA = 'destino1@seudominio.com.br, destino2@seudominio.com.br';

const EMAIL_CURRICULO = 'rh@seudominio.com.br';
```

- **Chaves:** gere-as no [console do reCAPTCHA](https://www.google.com/recaptcha/admin) escolhendo o tipo **v2 com caixa de seleção**. A chave do site vai nos atributos `data-sitekey` de `contato/index.html`.
- **E-mails:** os remetentes precisam ser contas que existem no domínio, porque a hospedagem só envia e-mail por elas.

## Deploy

Hospedado na KingHost. O deploy é feito por FTP: envie o conteúdo do projeto para a pasta pública, sem `.git`, `.gitignore` e `README.md`. Como o `segredos.php` não está no repositório, ele precisa ser enviado manualmente.
