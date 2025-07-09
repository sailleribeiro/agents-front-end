# Agents Front-end

Interface web para sistema de salas e agentes desenvolvida com React e TypeScript. O projeto permite criar e gerenciar salas para interação com agentes.

## Tecnologias Utilizadas

- **React 19** - Biblioteca principal para construção da interface
- **TypeScript** - Tipagem estática para JavaScript
- **Vite** - Build tool e servidor de desenvolvimento
- **TailwindCSS** - Framework CSS para estilização
- **React Router DOM** - Roteamento client-side
- **TanStack Query** - Gerenciamento de estado e cache de dados
- **Radix UI** - Componentes primitivos acessíveis
- **Lucide React** - Biblioteca de ícones

## Estrutura do Projeto

```
src/
├── components/ui/     # Componentes reutilizáveis
├── pages/            # Páginas da aplicação
├── lib/              # Utilitários e configurações
└── assets/           # Recursos estáticos
```

## Padrões de Projeto

- **Component Composition** - Uso de componentes compostos do Radix UI
- **Custom Hooks** - Hooks personalizados para lógica de negócio
- **Path Aliases** - Importações absolutas com `@/` para melhor organização
- **TypeScript First** - Tipagem rigorosa em toda aplicação

## Setup e Configuração

### Pré-requisitos
- Node.js 18+
- npm ou yarn

### Instalação

```bash
# Clone o repositório
git clone <repository-url>
cd agents-front-end

# Instale as dependências
npm install

# Execute o servidor de desenvolvimento
npm run dev
```

### Scripts Disponíveis

```bash
npm run dev      # Servidor de desenvolvimento
npm run build    # Build para produção
npm run preview  # Preview do build
npm run lint     # Verificação de código
```

### Configuração da API

O projeto está configurado para consumir uma API REST em `http://localhost:3333`. Certifique-se de que o backend esteja rodando na porta correta.

## Funcionalidades

- ✅ Listagem de salas disponíveis
- ✅ Navegação entre páginas
- ✅ Interface responsiva com TailwindCSS
- 🔄 Em desenvolvimento: Criação de novas salas
- 🔄 Em desenvolvimento: Interação com agentes

## Ambiente de Desenvolvimento

O projeto usa Vite para desenvolvimento com Hot Module Replacement (HMR) e ESLint para verificação de código. A configuração do TypeScript está otimizada para desenvolvimento moderno com strict mode habilitado.
