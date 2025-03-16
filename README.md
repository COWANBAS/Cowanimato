# SOBRE

Este script é projetado para tentar  melhorar a privacidade e segurança ao navegar na web. Ele bloqueia rastreadores, manipula o comportamento do navegador e dificulta o fingerprinting. Abaixo, explico cada parte do script e seu funcionamento.

# Bloqueio de cookies de rastreamento

- O script desativa o armazenamento de cookies e os remove periodicamente. Isso impede que os sites armazenem informações sobre você e seu comportamento de navegação.

**Como funciona?** O código define o "document.cookie" como vazio e o redefine a cada segundo para evitar que cookies de rastreamento sejam armazenados.

![image](https://github.com/user-attachments/assets/02d8a7d3-2301-431a-a8ad-91bcca0366e6)

# Bloqueio do referer

- O referer é uma informação enviada pelos navegadores indicando qual página você estava antes de acessar o site atual. O script impede que essa informação seja enviada para os sites, dificultando a coleta de dados sobre sua navegação.

**Como funciona?** A propriedade document.referrer é redefinida para uma string vazia, assim os sites não podem saber de onde você veio.

![image](https://github.com/user-attachments/assets/6259140c-f384-4a1c-9673-c98cfa97b22d)
