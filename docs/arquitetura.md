# Arquitetura — Studio Cora

## Estado atual observado

- App Router em `src/app`;
- página raiz e versões em `/pt` e `/en`;
- componentes em `src/components`, incluindo uma implementação `v2`;
- estilos globais em `src/styles/globals.css`;
- rotas de `robots`, `sitemap`, Open Graph e API de contato;
- TypeScript, Tailwind CSS 4 e Framer Motion;
- Next.js 16.1.6 e React 19.2.3 instalados no momento.

O briefing cita Next.js 15. A versão instalada é 16; qualquer downgrade, migração ou padronização diferente precisa de proposta, avaliação de impacto e aprovação.

## Princípios

- Server Components por padrão;
- Client Components limitados a ilhas interativas;
- conteúdo, metadata e estrutura semântica próximos da rota responsável;
- componentes compartilhados somente quando houver uso ou conceito compartilhado;
- regras de negócio e integrações fora da camada puramente visual;
- fronteiras claras entre apresentação, conteúdo, validação e infraestrutura;
- nenhuma reestruturação ampla sem uma decisão arquitetural aprovada.

## Organização atual

```text
src/
├── app/                  # rotas, layouts, metadata e endpoints
├── components/           # componentes de interface existentes
└── styles/               # estilos globais
```

Essa seção descreve, não ratifica, toda decisão atual. A presença de `Landing.tsx` e `components/v2` sugere versões paralelas que devem ser auditadas antes de consolidação. Não mover ou excluir esses arquivos sem alinhamento.

## Proposta de evolução — pendente

Se a auditoria demonstrar necessidade, avaliar uma estrutura por responsabilidade:

```text
src/
├── app/
├── components/
│   ├── layout/
│   ├── sections/
│   └── ui/
├── lib/
├── content/
└── styles/
```

Prós: descoberta mais rápida, fronteiras explícitas e melhor escala para novas páginas. Contras: migração gera churn e pode criar abstrações antes da demanda. Recomendação: decidir somente após inventário dos componentes e definição da arquitetura de páginas.

## Renderização e dados

- preferir geração estática para páginas institucionais estáveis;
- usar renderização dinâmica apenas quando o conteúdo ou a personalização exigirem;
- manter segredos e envio de contato no servidor;
- validar e normalizar payloads na fronteira da API;
- definir comportamento de erro, timeout, spam e observabilidade antes de expandir o formulário;
- não introduzir CMS antes de mapear frequência editorial, responsáveis e fluxo de aprovação.

## Internacionalização

**Aprovado em 2026-08-19:** `/` preserva a Home original, enquanto `/pt` e `/en` usam root layouts próprios para emitir `lang="pt-BR"` e `lang="en"` diretamente no HTML. Conteúdo e componentes são compartilhados; URLs equivalentes são declaradas por canonical e `hreflang`.

As páginas internas usam slugs editoriais próprios em cada idioma e templates estáticos compartilhados. Blog e portfolio possuem modelos e rotas dinâmicas preparadas, mas nenhum artigo ou case é publicado sem conteúdo real e autorização.

Pontos ainda sujeitos a validação editorial:

- paridade de conteúdo entre idiomas;
- URLs indexáveis e redirecionamentos;
- manutenção de traduções.

Evitar páginas traduzidas parcialmente ou alternates apontando para conteúdo não equivalente.

## Performance

## Publicação temporária

**Aprovado em 2026-08-31:** durante a finalização do site, somente `/pt/sobre` e `/pt/contato` ficam públicas. A raiz `/` redireciona temporariamente para `/pt/sobre`; as demais rotas de páginas são reescritas para `/manutencao`. Arquivos estáticos, metadata técnica e a API de contato permanecem disponíveis. A liberação é centralizada em `src/proxy.ts` para permitir reversão simples no lançamento completo.

O sitemap lista apenas a raiz e as duas páginas públicas. O `robots.txt` impede o rastreamento das demais rotas durante esse período.

- limitar JavaScript enviado ao cliente;
- usar `next/image` e `next/font` quando adequados;
- reservar dimensões para elementos visuais;
- carregar scripts de terceiros somente com justificativa e estratégia;
- medir bundle e Web Vitals após mudanças relevantes;
- preservar conteúdo e CTA em HTML inicial.

## Decisões que exigem registro

Mudanças de framework/versão, CMS, analytics, hospedagem, formulários, internacionalização, estrutura de rotas, design tokens ou organização principal devem ser registradas aqui com: contexto, opções, decisão, consequências, responsável e data.
