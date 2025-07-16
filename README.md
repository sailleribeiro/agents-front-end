# Agents Front-end

Interface web moderna para sistema de salas e agentes de IA desenvolvida com React e TypeScript. O projeto permite criar salas virtuais onde usuários podem fazer perguntas e receber respostas geradas por inteligência artificial em tempo real.

## 🎯 Sobre o Projeto

Este é um sistema de Q&A (Questions & Answers) inteligente que oferece:

- **Criação de Salas**: Crie salas temáticas para diferentes contextos de perguntas
- **Interação com IA**: Faça perguntas e receba respostas geradas por IA
- **Gravação de Áudio**: Grave perguntas por voz que são processadas automaticamente
- **Interface Responsiva**: Design moderno e acessível que funciona em todos os dispositivos
- **Tempo Real**: Visualize perguntas e respostas sendo processadas em tempo real

## 🚀 Tecnologias Utilizadas

- **React 19** - Biblioteca principal com as últimas funcionalidades
- **TypeScript** - Tipagem estática para maior segurança e produtividade
- **Vite** - Build tool ultra-rápido para desenvolvimento
- **TailwindCSS 4** - Framework CSS moderno para estilização
- **React Router DOM** - Roteamento client-side
- **TanStack Query** - Gerenciamento de estado servidor e cache inteligente
- **Radix UI** - Componentes primitivos acessíveis
- **React Hook Form** - Gerenciamento de formulários performático
- **Zod** - Validação de schemas TypeScript-first
- **Lucide React** - Biblioteca de ícones moderna

## 📁 Estrutura do Projeto

```
src/
├── components/           # Componentes reutilizáveis
│   ├── ui/              # Componentes base do design system
│   ├── dialogs/         # Modais e diálogos
│   ├── create-room-form.tsx
│   ├── question-form.tsx
│   ├── question-item.tsx
│   └── room-list.tsx
├── pages/               # Páginas da aplicação
│   ├── create-room.tsx  # Página inicial com criação de salas
│   └── room.tsx         # Página da sala com Q&A
├── http/                # Camada de API e hooks
│   ├── types/           # Tipos TypeScript para API
│   ├── use-create-room.ts
│   ├── use-create-question.ts
│   └── user-rooms.ts
├── lib/                 # Utilitários e configurações
├── utils/               # Funções auxiliares
└── assets/              # Recursos estáticos
```

## 🏗️ Padrões de Projeto

- **Component Composition** - Composição de componentes com Radix UI
- **Custom Hooks** - Hooks personalizados para lógica de negócio e API
- **Path Aliases** - Importações absolutas com `@/` para melhor organização
- **TypeScript First** - Tipagem rigorosa em toda aplicação
- **Optimistic Updates** - Atualizações otimistas para melhor UX

## ⚙️ Setup e Configuração

### Pré-requisitos

- **Node.js** 18+ (recomendado: 20+)
- **npm** ou **yarn** 
- **Backend API** rodando em `http://localhost:3333`

### 🚀 Como Rodar o Projeto

1. **Clone o repositório**
   ```bash
   git clone <repository-url>
   cd agents-front-end
   ```

2. **Instale as dependências**
   ```bash
   npm install
   # ou
   yarn install
   ```

3. **Configure o ambiente**
   - Certifique-se de que o backend esteja rodando em `http://localhost:3333`
   - O frontend rodará em `http://localhost:5173`

4. **Execute o servidor de desenvolvimento**
   ```bash
   npm run dev
   # ou
   yarn dev
   ```

5. **Acesse a aplicação**
   - Abra seu navegador em `http://localhost:5173`
   - Comece criando uma nova sala
   - Faça perguntas e veja as respostas da IA em tempo real

### 📝 Scripts Disponíveis

```bash
npm run dev      # Servidor de desenvolvimento com HMR
npm run build    # Build otimizado para produção
npm run preview  # Preview do build de produção
npm run lint     # Verificação de código com ESLint
```

### 🔧 Configuração da API

O projeto consome uma API REST que deve estar rodando em `http://localhost:3333`. 

**Endpoints utilizados:**
- `GET /rooms` - Lista todas as salas
- `POST /room` - Cria uma nova sala
- `GET /room/:id/questions` - Lista perguntas de uma sala
- `POST /room/:id/questions` - Cria uma nova pergunta
- `POST /room/:id/audio` - Upload de áudio para processamento

## ✨ Funcionalidades

### ✅ Implementado
- Listagem de salas com informações detalhadas
- Criação de novas salas com nome e descrição
- Sistema de perguntas e respostas com IA
- Gravação de áudio para perguntas por voz
- Interface responsiva e acessível
- Navegação fluida entre páginas
- Feedback visual para operações assíncronas
- Formatação de datas relativas

### 🔄 Em Desenvolvimento
- Sistema de autenticação
- Compartilhamento de salas
- Histórico de conversas
- Configurações avançadas de IA

## 🌟 Características Técnicas

- **Performance**: Otimizado com React 19 e Vite
- **Acessibilidade**: Componentes acessíveis com Radix UI
- **Responsividade**: Design adaptável para todos os dispositivos
- **Type Safety**: TypeScript rigoroso em toda aplicação
- **UX Moderna**: Animações suaves e feedback visual
- **Offline Ready**: Cache inteligente com TanStack Query

## 🛠️ Ambiente de Desenvolvimento

O projeto utiliza:
- **Vite** para desenvolvimento com Hot Module Replacement (HMR)
- **ESLint** para verificação de código
- **TypeScript** em modo strict para máxima segurança
- **TailwindCSS** para estilização rápida e consistente

## 🤝 Contribuindo

1. Faça um fork do projeto
2. Crie uma branch para sua feature (`git checkout -b feature/nova-feature`)
3. Commit suas mudanças (`git commit -m 'Adiciona nova feature'`)
4. Push para a branch (`git push origin feature/nova-feature`)
5. Abra um Pull Request

## 📄 Licença

Este projeto está sob a licença MIT. Veja o arquivo `LICENSE` para mais detalhes.