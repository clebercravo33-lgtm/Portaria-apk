# Controle Portaria e Expedição — PWA

Arquivos prontos para publicar no GitHub Pages:

- `index.html` — aplicativo original com suporte PWA
- `manifest.webmanifest` — instalação/atalho
- `sw.js` — funcionamento offline/cache
- `icon.svg` — ícone do aplicativo

## Publicar no GitHub Pages

1. Crie um repositório no GitHub.
2. Envie os quatro arquivos para a raiz do repositório.
3. Vá em **Settings → Pages**.
4. Em **Build and deployment**, selecione **Deploy from a branch**.
5. Escolha a branch `main` e a pasta `/ (root)`.
6. Abra o endereço do GitHub Pages no Chrome/Edge e use **Adicionar à tela inicial/Instalar app**.

Observação: o PWA precisa ser aberto por HTTPS (como GitHub Pages) para o Service Worker funcionar.
