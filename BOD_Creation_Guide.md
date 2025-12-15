# Protocolo de Criação de Posts para "Bebi o Dicionário" (BOD)

Este documento detalha o padrão estrutural, estilístico e técnico para a criação e catalogação de posts do projeto *Bebi o Dicionário*.

## 1. Estrutura do Arquivo (Markdown)

Todo post deve ser um arquivo `.md` nomeado `BODXXX.md` (onde XXX é o número sequencial).

### Frontmatter (YAML)
O cabeçalho deve seguir estritamente este formato:

```yaml
---
id: BODXXX           # OBRIGATÓRIO: Formato BOD + Número. SEM aspas. Ex: BOD417
title: "#XXX Título" # Ex: #417 Caderno de Degustação
description: "Uma breve frase resumindo a piada ou tema."
tags:
  - Tag 1
  - Tag 2
---
```

**Regras de Tags:**
*   **Sem Prefixos:** Use `3D` em vez de `Estilo: 3D`. Use `Borgonha` em vez de `Região: Borgonha`.
*   **Relevância:** Priorize termos técnicos (ex: `Maceração Carbônica`, `Tanino`), regiões, castas e estilo visual.
*   **Consistência:** Utilize tags já existentes no ecossistema (ex: `Vinho Natural`, `Sommelier`, `Humor`).

## 2. Corpo do Post

O corpo do post é dividido em seções obrigatórias separadas por títulos de nível 3 (`###`) ou 2 (`##`).

### 2.1. Imagem (`### Imagem`)
**Base URL:** Todas as mídias devem ser hospedadas no bucket S3: `https://bebiodicionario-com.s3-sa-east-1.amazonaws.com/`

**Caminhos Permitidos:**
*   `/media/posts/` (Padrão para novos posts)
*   `/media/other/`
*   `/media/reels/`
*   `/media/igtv/`

*   **Imagem Única:**
    `![](https://bebiodicionario-com.s3-sa-east-1.amazonaws.com/media/posts/YYYYMM/arquivo.jpg)`
*   **Múltiplas Imagens (Carrossel):** SE houver mais de uma imagem, você **DEVE** utilizar o componente `<Tabs>` do Docusaurus e incluir os imports necessários:
    ```javascript
    import Tabs from '@theme/Tabs';
    import TabItem from '@theme/TabItem';
    ```
    Em seguida, utilize a estrutura `<Tabs>` para envolver as imagens.
*   **Vídeo:** Use a tag HTML `<video>` com `controls` e `width="100%"`. Link direto para o arquivo mp4 no S3.

### 2.2. Legenda (`### Legenda`)
Copie e cole a legenda original da postagem do Instagram. Se houver emojis ou formatação, mantenha-os.

*(Separador horizontal `---`)*

### 2.3. Transcrição (`## Transcrição`)
Descreva a imagem detalhadamente. Isso serve tanto para acessibilidade quanto para contextualizar a análises.
*   **Estilo Visual:** Identifique o estilo (ex: *pixel art*, *ilustração vetorial*, *colagem*, *fotografia*).
*   **Elementos:** Descreva quem está na imagem, o cenário, as cores predominantes e qualquer texto escrito na própria imagem.

### 2.4. Explicação (`## Explicação`)
Esta é a parte mais importante. Você deve "dissecar a piada".
*   **Objetivo:** Explicar por que a imagem é engraçada ou relevante para o mundo do vinho.
*   **Estrutura:**
    1.  **Resumo:** Uma frase explicando o conceito geral (ex: "Este post é uma sátira sobre...").
    2.  **Decomposição:** Liste os elementos da piada (ex: "1. O Trocadilho...", "2. A Referência Técnica...").
    3.  **Contexto Técnico:** Explique os termos de vinho envolvidos (ex: se a piada cita "maceração carbônica", explique brevemente o que é).
    4.  **Referências Pop:** Se houver paródias de filmes, músicas ou celebridades (ex: *Matrix*, *Bell Marques*), explique a conexão.

### 2.5. Originalmente publicado (`### Originalmente publicado`)
*   Link para a postagem no Instagram.
*   Data da publicação original.

## 3. Exemplo Prático (Template)

```markdown
---
id: BOD999
title: "#999 Exemplo de Post"
description: "Descrição curta para SEO."
tags:
  - Exemplo
  - Tutorial
---

### Imagem

![](https://link-da-imagem.com/imagem.jpg)

### Legenda

Texto original da legenda do Instagram.

---

## Transcrição

A imagem é uma ilustração em estilo 3D mostrando uma garrafa de vinho com pernas correndo de um saca-rolhas gigante.

## Explicação

Este post brinca com o termo "vinho com pernas" (chorume), levando-o ao sentido literal.

1.  **O Termo Técnico:** "Pernas" ou "lágrimas" são os filetes de líquido que escorrem pela taça devido ao efeito Marangoni (álcool/tensão superficial).
2.  **A Piada Visual:** A ilustração personifica a garrafa fugindo, criando um trocadilho visual surrealista.

### Originalmente publicado

- [Instagram](https://instagram.com/p/link)
- Data: 01 de janeiro de 2025
```

## 4. Diretrizes de Manutenção (O que aprendemos)

*   **Identificadores (IDs):** Nunca use apenas números (`id: 123`) ou strings (`id: "123"`). Sempre use `id: BOD123`.
*   **Limpeza de Código:** Evite importar componentes React (`import Tabs...`) se eles não forem utilizados no arquivo.
*   **Links Internos:** Ao referenciar outros posts, use o caminho relativo ou o ID (ex: `[#355](/docs/arquivo/2021/BOD355)`). Verifique sempre se o arquivo existe.
## 5. Extração de Conteúdo (Legado)

Para posts antigos que precisam ser migrados ou recuperados, utilizamos os arquivos de dump do Facebook localizados em `extract/posts_1.html` e `extract/posts_2.html`.

### Processo de Extração:

1.  **Localize a Imagem:**
    *   No diretório `docs/arquivo/media`, encontre o nome do arquivo de imagem que você está catalogando (ex: `17919112675694582.jpg`).
    *   Abra `extract/posts_1.html` ou `extract/posts_2.html` no navegador ou editor de texto.
    *   Use `Ctrl+F` (ou `Cmd+F`) para procurar pelo nome do arquivo (apenas os números, ex: `17919112675694582`).

2.  **Identifique os Elementos:**
    *   **Bloco do Post:** Cada post está contido em um container `div` (classe `pam _3-95...`).
    *   **Legenda:** O texto está localizado **acima** da imagem, dentro de uma tag `<h2>`.
    *   **Data:** A data de publicação está localizada **abaixo** da imagem/vídeo, no formato `Mon DD, YYYY H:MM am/pm` (ex: `Jul 06, 2021 2:14 pm`).

3.  **Copie os Dados:**
    *   **Legenda:** Copie o texto do `<h2>` e cole na seção `### Legenda` do seu arquivo Markdown. Mantenha emojis e formatação.
    *   **Data:** Copie a data do rodapé do bloco e cole na seção `### Originalmente publicado`.

### Dica:
Se a imagem não for encontrada pelo nome do arquivo, tente buscar por trechos da legenda que você já conhece ou palavras-chave visíveis na imagem.

## 6. Fluxo de Trabalho Otimizado (Batch Mode - "The Fast Way")

Para manter a velocidade e consistência (padrão "BOD 100-150"), siga este fluxo para criar múltiplos posts de uma vez:

### 1. Extração em Lote (Metadata First)
Não procure um por um. Extraia os dados de uma faixa de datas ou IDs de uma só vez usando scripts ou grep no `posts_2.html`.
*   **Input:** Faixa de datas (ex: "Maio de 2018").
*   **Output:** Lista com `[ID, Data, Legenda]` para 5 a 10 posts.

### 2. URL Direta (Skip Local Copy)
Não copie a imagem para a pasta `images/`. Não é necessário.
*   Verifique se o arquivo existe em `media/other/ID.jpg`.
*   Se existir, construa a URL S3 diretamente: `https://bebiodicionario-com.s3-sa-east-1.amazonaws.com/media/other/ID.jpg`.
*   Isso economiza comandos de `cp`, `mv` e problemas de caminho.

### 3. Template Unificado (Copy-Paste God)
Use este esqueleto exato para **todos** os arquivos, mudando apenas os valores variáveis. Não escreva do zero.

```markdown
---
id: BODXXX
title: "#XXX Título"
description: "Descrição."
date: YYYY-MM-DD
tags:
  - Tag1
  - Tag2
---

### Imagem

![Título da Imagem](https://bebiodicionario-com.s3-sa-east-1.amazonaws.com/media/other/ID_DA_IMAGEM.jpg)

### Legenda

Legenda original do post.

## Transcrição

Descrição detalhada da imagem.

## Explicação

Explicação da piada ou contexto.

### Originalmente publicado

- Data: DD de Mês de YYYY
```

### 4. Validação em Bloco
Crie 5 arquivos `.md` de uma vez. Somente depois de criados, revise-os em lote. Isso reduz a troca de contexto entre "codificação" e "escrita criativa".
