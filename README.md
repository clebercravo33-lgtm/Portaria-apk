# PWA para GitHub Pages

Arquivos:
- `index.html` — aplicação original adaptada para PWA
- `manifest.webmanifest` — configuração de instalação
- `sw.js` — cache/offline básico

## Publicar no GitHub Pages

1. Crie um repositório no GitHub.
2. Envie os 3 arquivos para a raiz do repositório.
3. Em **Settings → Pages**, escolha **Deploy from a branch**.
4. Selecione a branch (normalmente `main`) e a pasta `/ (root)`.
5. Abra a URL do GitHub Pages. Em navegador compatível, a opção de instalar o app poderá aparecer.

> O PWA precisa ser servido por HTTPS (GitHub Pages já fornece HTTPS).
