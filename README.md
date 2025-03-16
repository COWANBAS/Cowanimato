# SOBRE

Este script é projetado para tentar  melhorar a privacidade e segurança ao navegar na web. Ele bloqueia rastreadores, manipula o comportamento do navegador e dificulta o fingerprinting. Abaixo, explico cada parte do script e seu funcionamento.

# Bloqueio de cookies de rastreamento

- O script desativa o armazenamento de cookies e os remove periodicamente. Isso impede que os sites armazenem informações sobre você e seu comportamento de navegação.

**Como funciona?** O código define o "document.cookie" como vazio e o redefine a cada segundo para evitar que cookies de rastreamento sejam armazenados.

![image](https://github.com/user-attachments/assets/02d8a7d3-2301-431a-a8ad-91bcca0366e6)

# Bloqueio do referer

- O referer é uma informação enviada pelos navegadores indicando qual página você estava antes de acessar o site atual. O script impede que essa informação seja enviada para os sites, dificultando a coleta de dados sobre sua navegação.

**Como funciona?** A propriedade "document.referrer" é redefinida para uma string vazia, assim os sites não podem saber de onde você veio.

![image](https://github.com/user-attachments/assets/6259140c-f384-4a1c-9673-c98cfa97b22d)

#Alteração do User-Agent

- O User-Agent é uma string enviada pelo navegador que contém informações sobre o dispositivo e o navegador que você está usando. Ao modificá-lo, o script simula que você está usando um navegador diferente, dificultando o rastreamento.

**Como funciona?** O código altera o "navigator.userAgent" para um valor genérico que representa o Chrome rodando no Windows 10. Isso faz com que os sites vejam um "falso" navegador, impedindo a coleta de dados mais específicos.

![image](https://github.com/user-attachments/assets/e3608b51-1fe9-40e1-82f0-370e676c9834)


# Impedir fingerprinting através do Canvas

- O fingerprinting é uma técnica usada para identificar e rastrear dispositivos com base em características únicas, como o comportamento do Canvas (usado para desenhar na tela). O script altera o comportamento de getImageData para modificar a forma como o navegador gera dados gráficos, dificultando a coleta de informações únicas sobre o seu dispositivo.

**Como funciona?** Quando o script detecta o uso do Canvas, ele altera os dados gerados pelo método "getImageData" para fornecer um resultado "falsificado", distorcendo a identidade do dispositivo.

![image](https://github.com/user-attachments/assets/fdfafd7a-5836-4d1f-94a0-43fca715e6f3)

# Impedir fingerprinting através do WebGL

- O WebGL é outra técnica usada para identificar dispositivos, baseando-se nas informações gráficas do hardware. O script altera o comportamento do WebGL para mascarar o tipo de GPU que o site vê.

**Como funciona?** Quando o script detecta a chamada para "gl.getParameter", ele responde com valores falsificados para o modelo da GPU e fabricante, evitando que sites usem essas informações para identificar o dispositivo.

![image](https://github.com/user-attachments/assets/8c0d74c7-d20f-4b4b-bcdb-90a4beb1ac32)

Este script tenta fornecer uma camada extra de privacidade, dificultando a coleta de dados pessoais e a criação de perfis de usuário através de rastreadores, Ele funciona em vários navegadores compatíveis com Tampermonkey ou outras extensões de gerenciamento de scripts.

# FUNCIONALIDADE

Embora o script acima forneça uma série de medidas para aumentar sua privacidade, ele nunca será 100% eficaz por várias razões. 

1. Dependência de medidas que podem ser contornadas

Algumas técnicas de fingerprinting e rastreamento podem ser mais sofisticadas do que o bloqueio de cookies ou a alteração do User-Agent. Por exemplo:

- Fingerprinting avançado pode usar fontes de dados como comportamentos de digitação, a forma como o usuário interage com a página (como o tempo de resposta ou os padrões de movimento do mouse), que o script não altera.
- Rastreamento de IP e geolocalização: Mesmo que o script bloqueie cookies e rastreadores, o seu endereço IP e a localização aproximada ainda podem ser obtidos pelos sites, dependendo do tipo de rastreamento implementado.

2. Limitações de ferramentas de navegação
Navegadores e extensões como Tampermonkey ou Greasemonkey não podem alterar aspectos básicos do sistema operacional ou da rede de maneira tão profunda quanto seria necessário para garantir 100% de anonimato. Por exemplo:

- O endereço IP continua sendo exposto, a menos que você use uma rede privada virtual (VPN) ou um sistema de proxy.
- As interações em tempo real (como comportamento de navegação e clicagem) podem ser monitoradas por tecnologias como o fingerprinting de comportamento, que o script não consegue bloquear totalmente.

3. Configurações e permissões do navegador
Alguns navegadores, como o Chrome, têm comportamentos que podem sobrescrever ou contornar configurações feitas por scripts de usuários, especialmente se a política de segurança for alterada ou se o navegador tiver permissões de acesso específicas. Além disso, a configuração de privacidade e segurança pode ser diferente em cada navegador.

4. Impossibilidade de proteger completamente a identidade
A privacidade digital nunca pode ser garantida 100%, pois sempre há formas sutis de identificar comportamentos e padrões:

- Rastreamento por metadados: Sites podem identificar seu comportamento com base na hora do acesso, frequência de navegação, interações com diferentes sites e até mesmo os dados dos dispositivos conectados.
- Impressões digitais de dispositivos e sensores: Além de WebGL e Canvas, outros dados, como sensores de movimento (giroscópio e acelerômetro), podem ser usados para identificar o dispositivo e o usuário.

  # CONCLUSÃO

  O script aumenta significativamente sua privacidade online ao bloquear rastreadores, cookies, e alterar identificações, mas não oferece anonimato total devido à natureza das tecnologias de rastreamento e limitações de navegação. Para uma privacidade mais robusta, recomendo o uso de outras ferramentas, como VPNs, navegadores focados em privacidade (como Tor), e isolamento de redes e dispositivos, um navegador similar que estou utilizando bastante ultimamente e o "Min" ele tem como foco ser um navegador leve e de privacidade.

# Navegadores que recomendo para aumentar privacidade

- [Min](https://github.com/minbrowser/min)
- [Tor](https://github.com/TheTorProject/gettorbrowser)
- [Cromite](https://github.com/uazo/cromite)
