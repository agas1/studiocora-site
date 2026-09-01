# Design system — Studio Cora

## Direção

O sistema deve comunicar precisão, repertório e confiança por meio de tipografia, espaço, contraste e movimento controlado. Minimalismo significa reduzir ruído, não remover informação necessária para decisão.

## Estado das decisões

- **Aprovado:** azul institucional como cor principal.
- **Aprovado:** estética premium, moderna, minimalista e estratégica.
- **Aprovado:** Cave Create como referência de ritmo, hierarquia, espaçamento, grid e navegação — nunca como fonte para cópia.
- **Aprovado:** paleta institucional `#6966F0`, `#7473F5` e `#6F6BF1`.
- **Pendente:** valores oficiais de tipografia, escala, grid, raios e direção de imagem.

### Paleta institucional

- `#6966F0`: cor principal para CTAs, foco e superfícies de marca;
- `#7473F5`: acento e variação clara;
- `#6F6BF1`: hover e final de gradientes.

Azuis e vermelhos fora dessa paleta não devem ser introduzidos. Preto, branco e cinzas permanecem como cores neutras do sistema.

## Tokens propostos para aprovação

Antes de alterar os estilos globais, definir tokens semânticos para:

- `color-brand`, `color-brand-strong` e `color-brand-soft`;
- `color-bg`, `color-surface`, `color-text` e `color-muted`;
- borda, foco, sucesso e erro;
- escala tipográfica de display, títulos, corpo e apoio;
- escala de espaçamento e largura máxima de conteúdo;
- raios, bordas, sombras e durações de movimento.

Não registrar hexadecimais aproximados como cores oficiais. Obter os valores da identidade da marca ou aprová-los visualmente.

## Hierarquia e layout

- uma mensagem principal inequívoca no primeiro viewport;
- grid consistente, margens responsivas e linhas de texto confortáveis;
- espaço vertical usado para separar ideias e sustentar ritmo editorial;
- contraste entre títulos expressivos e corpo altamente legível;
- densidade menor nas áreas de posicionamento e maior onde comparação ou prova exigir;
- mobile tratado como composição própria, não como desktop comprimido.

## Componentes essenciais

- header e navegação;
- hero;
- apresentação de serviços;
- bloco de posicionamento/diferenciais;
- processo;
- cases e provas;
- depoimentos/logos, quando verificáveis;
- CTA editorial;
- formulário de contato/qualificação;
- footer;
- estados de botão, link, input, erro, sucesso, loading e vazio.

Componentes devem nascer de padrões reais do produto. Variantes precisam representar diferenças semânticas ou de comportamento, não pequenas exceções visuais.

## Movimento

- usar movimento para indicar relação, ordem ou feedback;
- evitar animação que retarde a leitura, o CTA ou o LCP;
- não esconder conteúdo essencial até o JavaScript executar;
- respeitar `prefers-reduced-motion`;
- manter durações e curvas consistentes;
- evitar parallax pesado, scroll hijacking e animações contínuas sem função.

## Acessibilidade

- contraste compatível com WCAG 2.2 AA;
- foco visível e consistente;
- áreas interativas confortáveis em toque;
- estados não comunicados apenas por cor;
- labels reais em formulários;
- ordem visual compatível com a ordem do DOM;
- zoom e reflow sem perda de conteúdo.

## Critério de aceite visual

Uma interface está pronta quando mantém identidade e hierarquia em mobile e desktop, torna a próxima ação evidente, não depende de efeitos para ser compreendida e usa apenas padrões/tokens aprovados.
