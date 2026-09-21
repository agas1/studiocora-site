# CMS editorial — Studio Cora

## Decisão

**Aprovado em 2026-09-02:** o blog passa a usar Sanity como fonte editorial, com o Studio incorporado em `/admin`. O CMS controla artigos, rascunhos, publicação, imagens, SEO e relacionamento PT/EN. Os artigos locais permanecem como fallback durante a migração e um documento publicado no CMS substitui o local quando usa o mesmo slug.

## Configuração inicial

1. Criar um projeto em `https://www.sanity.io/manage` com o dataset `production`.
2. Copiar `.env.example` para `.env.local` e preencher as variáveis `NEXT_PUBLIC_SANITY_*`.
3. Criar um token com permissão **Viewer** e salvar somente como `SANITY_API_READ_TOKEN` no ambiente local e na Vercel.
4. Adicionar `http://localhost:3000` e `https://usestudiocora.com` em **API > CORS Origins**, com credenciais permitidas para o preview.
5. Repetir as variáveis em **Vercel > Project > Settings > Environment Variables** e publicar um novo deploy.
6. Abrir `/admin`, autenticar com a conta autorizada no projeto e convidar as demais editoras pelo painel do Sanity.

O ID do projeto e o nome do dataset podem aparecer no navegador. Tokens e o segredo de webhook nunca podem usar o prefixo `NEXT_PUBLIC_`.

## Publicação

- criar um artigo e escolher o idioma;
- preencher título, slug, resumo, categoria, autor, data, capa e texto alternativo;
- escrever o conteúdo usando títulos, listas, links e imagens;
- preencher os campos de SEO;
- relacionar a tradução, quando existir;
- usar **Presentation** para revisar o rascunho;
- clicar em **Publish** para disponibilizar o artigo.

Rascunhos não aparecem no site público nem no sitemap. Artigos publicados são consultados novamente em até 60 segundos mesmo sem webhook.

## Atualização imediata por webhook

1. Gerar um segredo longo e salvar como `SANITY_REVALIDATE_SECRET` na Vercel.
2. Criar um webhook no Sanity apontando para `https://usestudiocora.com/api/revalidate`.
3. Selecionar o evento de criação, atualização e exclusão, filtrar `_type == "article"` e assinar com o mesmo segredo.
4. Usar a projeção `{_type, "slug": slug.current}`.

## Migração

Os oito artigos existentes continuam sendo servidos pelo fallback em `src/content/articles.ts`. Eles devem ser recriados no CMS gradualmente, preservando cada slug para manter a URL e substituir automaticamente a versão local. Depois de validar paridade PT/EN, metadata, links e imagens, o fallback poderá ser removido em uma mudança separada.

