# Studio Cora — Constituição do projeto

Este arquivo orienta pessoas e agentes de IA que trabalham neste repositório. As regras valem para toda a árvore do projeto. Um `AGENTS.md` mais específico pode complementar estas regras dentro de uma subpasta, sem contrariar os princípios abaixo.

## 1. Contexto do negócio

A Studio Cora é um estúdio de design especializado em:

- gestão de redes sociais;
- branding;
- identidade visual;
- direção criativa;
- landing pages;
- desenvolvimento web.

A proposta central é **construir presença digital para empresas**. A marca não deve parecer uma agência de marketing tradicional, uma fábrica de posts ou uma prestadora genérica de serviços. A percepção desejada é a de um estúdio criativo premium, moderno, minimalista e estratégico.

O público prioritário são empresas brasileiras estabelecidas que procuram uma operação profissional. Freelancers e MEIs sem estrutura não são o foco comercial.

## 2. Objetivos do site

Toda decisão de produto, UX, conteúdo e engenharia deve contribuir para pelo menos um destes objetivos:

1. transmitir autoridade;
2. gerar confiança;
3. converter visitantes qualificados em leads;
4. formar uma base sólida para SEO;
5. funcionar como destino eficiente para campanhas de Google Ads.

Quando houver conflito entre impacto visual e clareza, a clareza prevalece. Quando houver conflito entre animação e performance/acessibilidade, performance e acessibilidade prevalecem.

## 3. Princípios de experiência e identidade

- Usar o azul institucional da Studio Cora como cor principal e evitar excesso de cores.
- Manter uma linguagem visual minimalista, autoral e premium.
- Usar a Cave Create (`https://www.cavecreate.com.br/`) apenas como referência de ritmo, hierarquia tipográfica, espaçamento, grid e navegação. Não copiar identidade, composição, texto, ativos ou código.
- Criar hierarquia clara, leitura escaneável e CTAs coerentes com a intenção de cada seção.
- Demonstrar valor com especificidade, processo, provas e resultados; evitar slogans vazios e clichês de agência.
- Priorizar uma jornada que qualifique empresas estabelecidas sem criar fricção desnecessária.
- Manter navegação e formulários plenamente utilizáveis por teclado e tecnologias assistivas.

## 4. Engenharia

Stack desejada: Next.js, React, TypeScript, Tailwind CSS, Framer Motion e SEO técnico. O repositório usa atualmente Next.js 16, embora o briefing original mencione Next.js 15. Não fazer downgrade ou migração de versão sem proposta e aprovação.

Regras de implementação:

- usar HTML semântico e preservar uma hierarquia correta de títulos;
- preferir Server Components; adicionar `"use client"` somente quando houver necessidade real de estado, eventos ou APIs do navegador;
- criar componentes reutilizáveis quando existir repetição ou um limite conceitual claro, sem abstrações prematuras;
- manter TypeScript estrito e evitar `any` sem justificativa;
- usar Tailwind de forma consistente com os tokens documentados; não espalhar valores arbitrários equivalentes;
- usar Framer Motion com parcimônia, sem bloquear conteúdo e respeitando `prefers-reduced-motion`;
- otimizar imagens, fontes, scripts e carregamento para Core Web Vitals;
- evitar dependências novas quando a plataforma ou a stack existente resolverem o problema;
- preservar URLs, redirecionamentos e contratos públicos ao refatorar;
- validar entradas no servidor e nunca expor segredos no cliente ou no repositório.

## 5. SEO e conversão

- Usar Metadata API do Next.js, canonical, Open Graph, robots e sitemap conforme a estratégia de indexação.
- Cada página indexável deve ter intenção de busca definida, `title`, description, um `h1` claro e conteúdo original.
- Não criar páginas em massa, texto repetitivo, keyword stuffing ou conteúdo sem utilidade.
- Não sacrificar conteúdo rastreável por efeitos visuais ou renderização exclusivamente no cliente.
- CTAs devem descrever a próxima ação. Evitar rótulos vagos como “saiba mais” quando houver alternativa específica.
- Formulários devem pedir apenas os dados necessários, informar estados de envio/erro e oferecer uma expectativa clara do próximo passo.
- Instrumentação de analytics deve ser planejada com nomes de eventos consistentes e respeito à privacidade.

Detalhes e critérios ficam em [`docs/seo.md`](docs/seo.md) e [`docs/copywriting.md`](docs/copywriting.md).

## 6. Processo de decisão

Atuar com postura de Tech Lead:

1. antes de codificar, explicar brevemente a solução e como ela favorece UX, conversão, SEO, performance e manutenção;
2. quando houver mais de uma solução relevante, apresentar prós, contras e uma recomendação;
3. mudanças estruturais exigem aprovação prévia;
4. depois da aprovação, implementar apenas o escopo alinhado;
5. não mudar a direção durante uma sprint sem novo alinhamento.

São mudanças estruturais, entre outras:

- alterar arquitetura de pastas ou fronteiras principais de componentes;
- mudar layout global, navegação, ordem ou objetivo das seções;
- adicionar/trocar dependências, CMS, hospedagem, analytics ou integrações;
- alterar estratégia de rotas, idiomas, renderização, dados ou formulários;
- modificar tokens centrais, tipografia, identidade ou direção visual;
- mudar estratégia de SEO, URLs ou modelo de conversão.

Correções localizadas, testes, ajustes de acessibilidade e refinamentos que preservem o comportamento aprovado podem seguir sem uma rodada adicional de aprovação, desde que sejam explicados e verificados.

## 7. Qualidade e entrega

Antes de concluir uma alteração:

- executar, conforme o impacto, lint, checagem de tipos, build e testes disponíveis;
- verificar responsividade, teclado, foco, contraste e redução de movimento;
- avaliar efeitos sobre LCP, CLS e INP;
- conferir metadata, links, headings, imagens e estados de formulário afetados;
- informar arquivos alterados, verificações executadas e riscos ou pendências;
- não misturar refatorações alheias ao escopo;
- preservar mudanças existentes do usuário.

## 8. Documentação viva

Consultar e atualizar, quando a decisão correspondente for aprovada:

- [`docs/roadmap.md`](docs/roadmap.md): fases, prioridades e critérios de conclusão;
- [`docs/seo.md`](docs/seo.md): estratégia orgânica e requisitos técnicos;
- [`docs/design-system.md`](docs/design-system.md): tokens, componentes e comportamento visual;
- [`docs/arquitetura.md`](docs/arquitetura.md): estrutura técnica e decisões arquiteturais;
- [`docs/copywriting.md`](docs/copywriting.md): voz, mensagens, CTAs e regras editoriais.

Não registrar hipótese como decisão definitiva. Identificar claramente itens como **Aprovado**, **Proposto**, **Em validação** ou **Pendente**.
