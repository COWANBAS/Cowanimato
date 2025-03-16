# SOBRE

Este script é projetado para tentar  melhorar a privacidade e segurança ao navegar na web. Ele bloqueia rastreadores, manipula o comportamento do navegador e dificulta o fingerprinting. Abaixo, explico cada parte do script e seu funcionamento.

# Bloqueio de cookies de rastreamento

- O script desativa o armazenamento de cookies e os remove periodicamente. Isso impede que os sites armazenem informações sobre você e seu comportamento de navegação.

**Como funciona?** O código define o "document.cookie" como vazio e o redefine a cada segundo para evitar que cookies de rastreamento sejam armazenados.

![image](https://github.com/user-attachments/assets/02d8a7d3-2301-431a-a8ad-91bcca0366e6)
