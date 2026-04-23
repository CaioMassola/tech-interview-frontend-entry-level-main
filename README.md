# RD Station - Recomendador de Produtos

## 📌 Sobre o Projeto

Este projeto foi desenvolvido como parte do processo seletivo da RD Station para a vaga de Engenhario de Software Frontend Pleno - React

O objetivo principal é implementar um sistema de recomendação de produtos dentro de uma aplicação React.js, permitindo que o usuário selecione preferências e receba sugestões de produtos de forma dinâmica.

---
## ⚙️ Requisitos Técnicos

* Node.js >= 18.3

---
## 🚀 Tecnologias Utilizadas

* React.js (Frontend)
* json-server (API fake REST)
* Tailwind CSS (estilização)
* Node.js

---

## 📦 Instalação

### 1. Clone o repositório

```bash
git clone https://github.com/CaioMassola/tech-interview-frontend-entry-level-main.git
cd tech-interview-frontend-entry-level-main
```

### 2. Instale as dependências

```bash
yarn install
```

> ⚠️ Observação: pode ser necessário entrar nas pastas `backend` e `frontend` e executar `yarn install` também.

### 3. Execute o script de instalação (caso exista)

```bash
./install.sh
```

---

## ▶️ Como Rodar o Projeto

### Rodar aplicação padrão

```bash
yarn start
```

### Rodar apenas o frontend

```bash
yarn start:frontend
```

### Rodar apenas o backend (json-server)

```bash
yarn start:backend
```

---

## 📁 Escopo do Desenvolvimento

A implementação foi focada principalmente nos seguintes arquivos:

* App.js → Controle da lista de recomendações
* Form.js → Processamento das entradas do usuário
* recommendation.service.js → Lógica de negócio das recomendações

---

## 🧠 Regras de Negócio

O sistema de recomendação deve:

* Receber preferências do usuário via formulário
* Retornar recomendações baseadas nessas preferências
* Suportar dois modos:

  * SingleProduct → retorna apenas um produto
  * MultipleProducts → retorna uma lista de produtos
* Em caso de empate, retornar o último produto válido
* Lidar com diferentes tipos de preferências

---

## 🧪 Testes Unitários

* O projeto deve cobrir os principais casos de uso
* Entrar na pasta **frontend**;
```bash
cd frontend
yarn test
```
---

### Funcionalidade Adicional

* Botão de limpar preferências

---

## 📈 Futuras Melhorias

* Melhoria da UI/UX
* Otimização da lógica de recomendação
* Uso de React Query ou similar para gerenciamento de dados
* Melhorias de acessibilidade (a11y)
* Opção de Light Mode e Dark Mode
* Internacionalização com i18n