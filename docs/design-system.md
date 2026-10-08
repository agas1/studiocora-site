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

## Faixa de parceiros demonstrativos — 2026-09-28

**Aprovado:** substituir a faixa de serviços por “Nossos parceiros”, com cinco marcas fictícias e logos vetoriais monocromáticos: Valora, Oliva, Vértice, Nume e Casa Vero. A composição usa grid responsivo estático, sem fontes ou imagens externas adicionais.

**Em validação:** os nomes e símbolos são demonstrativos, identificados visivelmente como fictícios em PT/EN; não constituem prova de relacionamento comercial. Substituir por parceiros verificados antes de usar a seção como prova comercial.

## Layout e movimento da home — 2026-10-07

**Aprovado:** aproximar layout, animações e hover da referência Stodio (https://stodio.webflow.io/), preservando cores, marca, família tipográfica, conteúdo e ativos da Studio Cora. A hero mantém a altura de tela solicitada. Não importar preços, métricas, depoimentos ou imagens da referência.

**Implementado:** botões com texto rolante no hover/foco; métricas com rolagem vertical de dígitos; projetos com deslocamento vertical suave, imagens sempre visíveis e introdução no fluxo normal, sem título fixo ou desaparecimento no scroll; serviços com prévia ativa inicial; carrossel de colaboração com indicadores sincronizados; títulos editoriais com quebra natural; redução de movimento também nos efeitos CSS e faixas contínuas.

A faixa estática descrita na decisão de 2026-09-28 foi substituída pelo carrossel a pedido do usuário. Os nomes continuam fictícios e identificados como demonstração.

**Em validação:** equivalência visual final com a referência e aprovação dos ajustes em PT/EN.

## Artigos e entrada das páginas — 2026-10-07

**Aprovado:** aproximar os artigos do layout e movimento da página de blog individual do Stodio, preservando identidade, conteúdo, autoria, URLs, metadata e schema da Cora.

**Implementado:** hero centralizada em painel arredondado; autoria, data e tempo de leitura agrupados; conteúdo com apoio lateral e índice nos artigos estruturados; cards de outros artigos e link “Todos os artigos” com hover/foco; CTA final; revelação dos blocos e entrada suave em cada navegação PT/EN por templates do App Router. A entrada de página usa somente opacidade, sem deslocar elementos fixos ou interferir no layout. Respeita redução de movimento.

**Em validação:** aprovação visual final pelo usuário.

## Hidratação e preferência de movimento — 2026-10-07

**Implementado:** leitura de `prefers-reduced-motion` por `useSyncExternalStore`, com snapshot inicial compartilhado entre servidor e primeira renderização do cliente. A preferência real é aplicada após a hidratação e continua reagindo às alterações do sistema. Corrige a divergência de estilos reproduzida com redução de movimento ativa, sem suprimir avisos.
