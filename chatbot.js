const qrcode = require('qrcode-terminal');
const { Client } = require('whatsapp-web.js');
const client = new Client({
    puppeteer: {
        args: [
            '--no-sandbox',
            '--disable-setuid-sandbox',
            '--disable-dev-shm-usage',
            '--disable-accelerated-2d-canvas',
            '--no-first-run',
            '--no-zygote',
            '--disable-gpu'
        ],
        headless: true
    }
});
const delay = ms => new Promise(res => setTimeout(res, ms));

// Estado por usuário (mapeado pelo número)
const userState = new Map();

client.on('qr', qr => {
    qrcode.generate(qr, { small: true });
});

client.on('ready', () => {
    console.log('Tudo certo! WhatsApp conectado.');
});

client.initialize();

client.on('message', async msg => {
    const chat = await msg.getChat();
    const userId = msg.from;

    if (/^(menu|oi|olá|ola|bom dia|boa tarde|boa noite)$/i.test(msg.body) && userId.endsWith('@c.us')) {
        await delay(2000);
        await chat.sendStateTyping();
        await delay(2000);
        await client.sendMessage(userId, `Olá! Bem-vindo à Smart Blin 👋\nQual o seu nome?`);
        userState.set(userId, { step: 'aguardando_nome' });
        return;
    }

    const state = userState.get(userId);

    if (state?.step === 'aguardando_nome') {
        const nome = msg.body.split(" ")[0];
        userState.set(userId, { step: 'menu', nome });

        await delay(2000);
        await chat.sendStateTyping();
        await delay(2000);
        await client.sendMessage(userId, `Muito prazer, ${nome}! 😊`);

        await delay(2000);
        await chat.sendStateTyping();
        await delay(2000);
        await client.sendMessage(userId,
            `Em que posso te ajudar?\n\n` +
            `1️⃣ Informações sobre boleto\n` +
            `2️⃣ Informações sobre iPhone\n` +
            `3️⃣ Localização\n` +
            `4️⃣ Outras dúvidas`
        );
        return;
    }

    if (state?.step === 'menu') {
        switch (msg.body) {
            case '1':
                await delay(2000);
                await chat.sendStateTyping();
                await delay(2000);
                await client.sendMessage(userId,
                    `📋 *Informações sobre compras via boleto*\n\n` +
                    `📄 Documentos: Comprovante de residência, CPF e RG\n` +
                    `🔍 Não fazemos consulta ao SPC/Serasa\n` +
                    `📱 Disponível apenas para Androids\n` +
                    `💸 Entrada de 20% a 30% do valor do aparelho\n\n` +
                    `📍 ENDEREÇO: RUA SANTA ELISA 134, PIABETÁ - MAGÉ / RJ`
                );

                await delay(2000);
                await chat.sendStateTyping();
                await delay(2000);
                await client.sendMessage(userId, 'Vamos adquirir seu novo aparelho no boleto? (responda "sim" para atendimento humano)');
                userState.set(userId, { step: 'aguardando_confirmacao_boleto' });
                return;

            case '2':
                await delay(2000);
                await chat.sendStateTyping();
                await delay(2000);
                await client.sendMessage(userId, 'Como você deseja o seu novo iPhone? 📱\n\n1️⃣ Lacrado\n2️⃣ Semi novo');

                userState.set(userId, { step: 'aguardando_tipo_iphone' });

                await delay(2000);
                await chat.sendStateTyping();
                await delay(2000);
                await client.sendMessage(userId, '⚠️ Atenção: iPhones NÃO entram na modalidade boleto.');
                return;

            case '3':
                await delay(2000);
                await chat.sendStateTyping();
                await delay(2000);
                await client.sendMessage(userId, '📍 RUA SANTA ELISA 134, PIABETÁ - MAGÉ / RJ\nGoogle Maps: https://www.google.com/maps/place/R.+Santa+Elisa,+134+-+Piabet%C3%A1,+Mag%C3%A9+-+RJ,+25931-762/@-22.6106199,-43.1776175,3a,75y,230.45h,90t/data=!3m7!1e1!3m5!1s01MfVKUz5PvKzchYL3vY0Q!2e0!6shttps:%2F%2Fstreetviewpixels-pa.googleapis.com%2Fv1%2Fthumbnail%3Fcb_client%3Dmaps_sv.tactile%26w%3D900%26h%3D600%26pitch%3D0%26panoid%3D01MfVKUz5PvKzchYL3vY0Q%26yaw%3D230.4527269199961!7i16384!8i8192!4m6!3m5!1s0x990a79da652827:0x17cbc961d5853264!8m2!3d-22.61074!4d-43.177783!16s%2Fg%2F11tnf5y1h2?entry=ttu&g_ep=EgoyMDI1MDYwMS4wIKXMDSoASAFQAw%3D%3D ' 
                );
                return;

            case '4':
                await delay(2000);
                await chat.sendStateTyping();
                await delay(2000);
                await client.sendMessage(userId, 'Por favor, envie sua dúvida que logo alguém do nosso time vai te responder. 💬');
                userState.set(userId, { step: 'aguardando_duvida' });
                return;

            default:
                await client.sendMessage(userId, '❌ Opção inválida. Por favor, responda com 1, 2, 3 ou 4.');
        }
    }

    if (state?.step === 'aguardando_confirmacao_boleto') {
        if (msg.body.toLowerCase() === 'sim') {
            await client.sendMessage(userId, '✅ Encaminhando você para um atendente... Por favor, aguarde.');
            userState.delete(userId);
        } else {
            await client.sendMessage(userId, 'Tudo bem! Se quiser mais informações, envie "menu" para voltar ao início.');
            userState.set(userId, { step: 'menu', nome: state.nome });
        }
        return;
    }

    if (state?.step === 'aguardando_tipo_iphone') {
        let resposta = '';
        if (msg.body === '1') {
            resposta = '📦 iPhones lacrados tem garantia de 1 ano Apple e acompanha brindes como: *BLINDAGEM, PELÍCULA, CAPA, FONTE DE CARREGAMENTO E FONE!* ';
        } else if (msg.body === '2') {
            resposta = '♻️ Os semi novos são de alta qualidade, testados e revisados, com garantia de 6 meses e acompanha brindes como: *BLINDAGEM, PELÍCULA, CAPA, FONTE DE CARREGAMENTO E FONE!*';
        } else {
            await client.sendMessage(userId, '❌ Opção inválida. Responda com 1 para Lacrado ou 2 para Semi novo.');
            return;
        }

        await delay(2000);
        await chat.sendStateTyping();
        await delay(2000);
        await client.sendMessage(userId, resposta);

        await delay(2000);
        await chat.sendStateTyping();
        await delay(2000);
        await client.sendMessage(userId, 'Qual modelo de iPhone você deseja adquirir? (ex: iPhone 11, iPhone 12, etc.)');

        userState.set(userId, { step: 'aguardando_modelo_iphone' });
        return;
    }

    if (state?.step === 'aguardando_modelo_iphone') {
        const modelo = msg.body.trim();

        await delay(2000);
        await chat.sendStateTyping();
        await delay(2000);
        await client.sendMessage(userId, `Ótima escolha! Vamos verificar a disponibilidade do modelo *${modelo}* para você.`);

        await delay(2000);
        await chat.sendStateTyping();
        await delay(2000);
        await client.sendMessage(userId, '✅ Encaminhando você para um de nossos especialistas... Por favor, aguarde.');

        userState.delete(userId);
        return;
    }

    if (state?.step === 'aguardando_duvida') {
        await client.sendMessage(userId, '✅ Obrigado! Sua dúvida foi registrada e em breve um atendente entrará em contato.');
        userState.delete(userId);
        return;
    }
});
