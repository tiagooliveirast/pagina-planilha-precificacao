# Planilha de Precificação — Tiago Sheik

Landing page de vendas para a Planilha de Precificação de Tiago Sheik.  
Página estática em HTML + CSS + JS puro, pronta para deploy na Vercel.

## Abrir localmente

Basta abrir o arquivo `index.html` no navegador.  
Nenhum servidor ou build step é necessário.

## Onde trocar os links de checkout

Os links de checkout são placeholders. Faça uma busca por `{{` no projeto e substitua pelos links reais da sua plataforma de pagamento:

| Placeholder | Onde usar |
|---|---|
| `{{LINK_CHECKOUT_PLANILHA}}` | Botão "Só a Planilha — R$9,90" |
| `{{LINK_CHECKOUT_PRO}}` | Todos os CTAs da versão PRO |

## Onde colar os pixels de rastreamento

No arquivo `index.html`, dentro da tag `<head>`, há dois comentários:

```html
<!-- META PIXEL AQUI -->
<!-- GOOGLE TAG AQUI -->
```

Cole o código do Facebook Pixel (Meta) e do Google Tag (gtag.js) exatamente no lugar dos comentários correspondentes.

A função `trackCheckout(plano)` no `script.js` já dispara `console.log` nos cliques dos botões de checkout. Para conectar aos pixels, edite a função e descomente/adicione as chamadas `fbq('track', ...)` e/ou `gtag('event', ...)` conforme a documentação de cada plataforma.

## Imagens

- `assets/mockup-planilha.png` — mockup da planilha (substituir pela imagem real)
- `assets/og-image.png` — imagem para compartilhamento em redes sociais (substituir pela URL real no meta tag `og:image`)
- `favicon.ico` — favicon do site

## Deploy na Vercel (3 passos)

1. Faça o push do repositório para o GitHub.
2. No [Vercel](https://vercel.com), clique em **Add New → Project** e importe o repositório.
3. Em **Framework Preset**, selecione **Other / Static** e clique em **Deploy**.

Pronto. A Vercel detecta automaticamente que é um site estático e faz o deploy sem configuração adicional.
