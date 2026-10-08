# SEO — Studio Cora

## Objetivo

Construir aquisição orgânica sustentável e garantir que páginas usadas em Google Ads tenham alta relevância, velocidade e clareza. SEO não deve produzir páginas genéricas nem alterar o posicionamento premium.

## Princípios aprovados

- uma intenção principal por página indexável;
- conteúdo útil e específico para empresas brasileiras;
- arquitetura simples, links internos contextuais e URLs estáveis;
- conteúdo importante renderizado no servidor e disponível sem interação;
- performance, acessibilidade e confiança tratadas como parte da qualidade da página;
- sem keyword stuffing, doorway pages ou duplicação por cidade/serviço sem valor real.

## Mapa inicial aprovado

| Tema | Intenção provável | Destino proposto |
| --- | --- | --- |
| Studio Cora | Navegacional/institucional | Home |
| Gestão de redes sociais | Comercial | Página de serviço |
| Branding | Comercial | Página de serviço |
| Identidade visual | Comercial | Página de serviço ou cluster de branding |
| Direção criativa | Comercial/educacional | Página de serviço |
| Landing pages | Comercial | Página de serviço |
| Desenvolvimento web | Comercial | Página de serviço |

**Correção de status (2026-09-21):** as páginas-base de serviços existem em PT/EN, mas o usuário esclareceu que sua criação e modelo visual não foram aprovados. O registro anterior de aprovação estava incorreto. As URLs permanecem disponíveis com `noindex, follow`, fora do sitemap e sem links no header, rodapé e artigos, até uma revisão aprovada. Os links de serviços nesses pontos levam à seção da home.

**Aprovado (2026-09-21):** priorizar conteúdo editorial em português para empresas brasileiras, mantendo a versão em inglês. A apresentação do blog passa a explicar seus temas e sua utilidade. A primeira revisão aprofunda os artigos sobre orçamento de redes sociais e branding versus identidade visual, com exemplos identificados como ilustrativos e referência ao projeto GD Law já documentado. Autoria fica visível; datas de atualização refletem revisões efetivas. Preços, depoimentos e resultados não devem ser inventados.

**Pendente:** pesquisa de demanda, revisão dos demais artigos e validação de resultados no Search Console do domínio publicado. Metadados e conteúdo local não comprovam indexação ou posicionamento.

## Requisitos por página

- `title` único, específico e coerente com a intenção;
- meta description útil, sem promessas não comprovadas;
- canonical absoluto e consistente;
- exatamente um `h1` que descreva a página;
- hierarquia de headings lógica;
- texto original, provas relevantes e CTA contextual;
- imagens com dimensões, formatos eficientes e `alt` adequado;
- links internos com âncoras descritivas;
- Open Graph e, quando necessário, Twitter metadata;
- status HTTP e regras de indexação corretos.

## Next.js

- centralizar defaults em `src/app/layout.tsx` e sobrescrever metadata por rota;
- usar `generateMetadata` apenas quando os dados forem dinâmicos;
- manter `src/app/sitemap.ts` e `src/app/robots.ts` coerentes com o ambiente público;
- usar JSON-LD apenas para entidades e conteúdo realmente presentes na página;
- não marcar avaliações, endereços ou dados comerciais não verificáveis;
- revisar `hreflang` e canonicals antes de indexar versões `/pt` e `/es`.

## Core Web Vitals

- **LCP:** priorizar o conteúdo principal, otimizar hero, imagens e fontes;
- **INP:** limitar JavaScript no cliente e trabalho síncrono em interações;
- **CLS:** reservar espaço para mídia, embeds, fontes e mensagens dinâmicas.

As metas finais devem usar dados de campo. Como referência operacional inicial: LCP até 2,5 s, INP até 200 ms e CLS até 0,1 no percentil 75.

## Conteúdo e autoridade

- explicar processo, entregáveis, adequação e resultados de cada serviço;
- publicar cases com contexto, desafio, decisão e impacto verificável;
- incluir autoria, dados empresariais e meios de contato consistentes;
- responder objeções reais do público sem inflar volume de palavras;
- manter datas e informações comerciais atualizadas.

## Mensuração pendente de aprovação

- domínio canônico e ambientes que devem ser indexáveis;
- Google Search Console e ferramenta de analytics;
- consentimento e política de privacidade;
- conversão primária e eventos secundários;
- integração das conversões com Google Ads;
- keywords prioritárias, localidades e concorrentes de busca.

### Eventos recomendados — proposto em 2026-08-19

O GTM existente permanece como ponto único de carregamento. Antes de implementar eventos, definir ferramenta de destino, consentimento e convenção de nomes.

- `contact_form_submit`: envio aceito pela API, com idioma e página de origem;
- `contact_cta_click`: clique em CTA de contato, com serviço ou artigo de origem;
- `email_click`: clique no endereço de e-mail;
- `service_cta_click`: avanço de uma página de serviço para contato;
- `language_switch`: troca entre páginas equivalentes PT/EN.

Não enviar nome, e-mail, mensagem ou outros dados pessoais ao `dataLayer`.

## Checklist de lançamento

- build e páginas públicas sem erro;
- robots e sitemap acessíveis;
- canonicals, idioma e alternates corretos;
- metadata e previews sociais revisados;
- redirects e páginas 404 testados;
- links e formulários funcionais;
- dados estruturados validados;
- Lighthouse usado como diagnóstico e Core Web Vitals monitorados em campo;
- Search Console configurado após aprovação.
