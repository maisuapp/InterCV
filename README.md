# InterCV

Criador de CVs internacionais com orientações por país, pré-visualização em tempo real e exportação para PDF.

## Destaques

- Modelos adaptados para EUA, Canadá, Irlanda, Reino Unido, Alemanha, Japão e Austrália.
- Editor responsivo com prévia lado a lado no desktop e fluxo confortável no celular.
- Otimização opcional de conquistas com IA, mantendo a chave exclusivamente no servidor.
- Impressão limpa em formato A4 e conteúdo orientado a ATS.

## Desenvolvimento local

1. Instale Node.js 18 ou superior.
2. Execute `npm install`.
3. Copie `.env.example` para `.env.local` e preencha `OPENAI_API_KEY` somente se quiser ativar a otimização com IA.
4. Execute `npm run dev` e abra http://localhost:3000.

Sem uma chave da OpenAI, o editor permanece funcional e usa uma sugestão local de fallback.

## Publicação

O projeto está preparado para Vercel. Configure `OPENAI_API_KEY` como variável de ambiente do projeto, nunca no navegador ou no repositório.

> As orientações de visto são informativas e devem ser confirmadas em fontes oficiais antes de uma candidatura ou decisão migratória.
