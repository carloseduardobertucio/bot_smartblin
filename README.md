# Bot WhatsApp Smart Blin

Bot de WhatsApp desenvolvido para automatizar interações e respostas.

## Requisitos

- Node.js (versão 16 ou superior)
- NPM (Node Package Manager)
- PM2 (Process Manager 2)

## Instalação

1. Clone o repositório:
```bash
git clone [URL_DO_REPOSITÓRIO]
cd bot_smartblin
```

2. Instale as dependências:
```bash
npm install
```

3. Instale o PM2 globalmente:
```bash
sudo npm install -g pm2
```

## Executando a Aplicação

### Iniciar o Bot
```bash
pm2 start chatbot.js --name "whatsapp-bot"
```

### Verificar Status
```bash
pm2 status
```

### Ver Logs (QR Code)
```bash
pm2 logs whatsapp-bot
```

### Comandos Úteis do PM2

#### Gerenciamento Básico
- Reiniciar: `pm2 restart whatsapp-bot`
- Parar: `pm2 stop whatsapp-bot`
- Remover: `pm2 delete whatsapp-bot`

#### Monitoramento
- Ver logs: `pm2 logs whatsapp-bot`
- Monitor em tempo real: `pm2 monit`
- Detalhes do processo: `pm2 show whatsapp-bot`

#### Configuração do Sistema
- Iniciar com o sistema: 
```bash
pm2 startup
pm2 save
```

#### Logs Específicos
- Últimas 100 linhas: `pm2 logs whatsapp-bot --lines 100`
- Apenas erros: `pm2 logs --err`
- Apenas saída padrão: `pm2 logs --out`

## Manutenção

### Backup
- Salvar configuração: `pm2 save`
- Restaurar configuração: `pm2 resurrect`

### Atualização
- Atualizar PM2: `pm2 update`
- Recarregar aplicação: `pm2 reload whatsapp-bot`

## Solução de Problemas

1. Se o bot não iniciar:
   - Verifique os logs: `pm2 logs whatsapp-bot`
   - Verifique o status: `pm2 status`
   - Tente reiniciar: `pm2 restart whatsapp-bot`

2. Se o QR Code não aparecer:
   - Verifique os logs: `pm2 logs whatsapp-bot`
   - Reinicie a aplicação: `pm2 restart whatsapp-bot`

3. Se precisar remover completamente:
   - Pare o processo: `pm2 stop whatsapp-bot`
   - Remova o processo: `pm2 delete whatsapp-bot`
   - Remova a inicialização automática: `pm2 unstartup`

## Notas Importantes

- O bot continuará rodando mesmo após fechar o terminal
- Use `pm2 logs whatsapp-bot` para ver o QR Code
- Configure `pm2 startup` para iniciar automaticamente com o sistema
- Mantenha o PM2 atualizado com `pm2 update`

## Suporte

Para mais informações sobre o PM2, consulte a [documentação oficial](https://pm2.keymetrics.io/docs/usage/quick-start/). 
