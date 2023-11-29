[![en](https://img.shields.io/badge/readme-en-red.svg)](https://github.com/angelbruni/BeautyFox/blob/main/README.md)
[![pt](https://img.shields.io/badge/leia--me-pt-green.svg)](https://github.com/angelbruni/BeautyFox/blob/main/README.pt.md)
[![es](https://img.shields.io/badge/léame-es-yellow.svg)](https://github.com/angelbruni/BeautyFox/blob/main/README.es.md)
# O que é o BeautyFox?
BeautyFox é um tema para o Firefox 115 ESR que tem como objetivo replicar a aparência do Internet Explorer 9, 10 e 11.
# Notas
- O tema foi testado no Windows 7, Windows 8.1/10 com o tema predefinido e temas Aero com Glass8 ativado e Windows 11.
- Não funciona corretamente com o WindowBlinds
- Certifique-se de que o seu perfil não foi modificado por outros temas. Se for o caso, apague os arquivos modificados *ou* crie um novo perfil.

# Instruções
1. Copiar arquivos:

1.1 Copiar o conteúdo da pasta `Firefox Folder` para onde está localizado o `firefox.exe`.

1.1.1. **(Opcional)** Para ter a página InPrivate (apenas em inglês) copie também a pasta `browser` para a pasta acima mencionada.

1.2 Copie o conteúdo da pasta `Profile Folder` para o diretório raiz do seu perfil (se você não sabe qual é, abra o Firefox e digite `about:profiles` na barra de endereços).

2. Descarregue e instale o [Resource Hacker](https://angusj.com/resourcehacker/) (se o seu sistema operativo **não for** o Windows Vista/7/8.x)

2.1 Abra o Resource Hacker como administrador.

2.2 Arquivo > Abrir > procure por `firefox.exe` > Manifest > apague/comente estas linhas:
```xml
<supportedOS Id="{8e0f7a12-bfb3-4fe8-b9a5-48fd50a15a9a}"/>
<supportedOS Id="{1f676c76-80e1-4239-95bb-83d0f6d0da78}"/>
<supportedOS Id="{4a2f28e3-53b9-4441-ba9c-d69d4a4a6e38}"/>
```

2.3 Reinicie o seu PC se o aero não funcionar após estas alterações.

3. Abra o Firefox e siga as instruções do assistente que aparece na tela.

4. Extensões:

4.1. **(Opcional)** Em `about:config`, marque `xpinstall.signatures.required` como `false`, reinicie o Firefox e arraste e solte o arquivo `suggestedSites.xpi` na janela do Firefox.

4.2. **(Opcional)** Instale o [FeedBro](https://addons.mozilla.org/en-US/firefox/addon/feedbroreader/) para cabeçalhos RSS.

5. Clique com o botão direito do mouse sobre um espaço vazio na barra de separadores e clique em `Personalizar barra de ferramentas...`.

5.1. Edite a interface de modo a ficar parecida com [esta imagem](https://www.techrepublic.com/wp-content/uploads/2011/03/6202428.png)

6. **(Opcional)** - Habilite os controles nativos (barras de rolagem, caixas de seleção):

6.1 Acesse o [repositório Firefox Native Controls](https://github.com/ephemeralViolette/firefox-native-controls)

6.2 Vá para `releases` e faça download do arquivo `xul.dll` correspondente à sua versão do Firefox.

6.3 Feche completamente o Firefox e substitua o arquivo `xul.dll` na pasta em que o Firefox está instalado pelo arquivo `xul.dll` que você baixou.

6.4 Abra o Firefox novamente e você terá controles nativos! (Observe que isso se aplicará a ***tudo*** que o Firefox carregar, inclusive sites, portanto, sites como o Discord Web parecerão um pouco estranhos devido a essas alterações).

Desfrutem da pista!

# Créditos/Agradecimentos
* [AngelBruni](https://github.com/angelbruni) - Criador do tema, criador do README.pt.md;
* [luisl173](https://github.com/luisl173) - Criador do README.md e README.es.md, tradução para espanhol e teste;
* [ephemeralViolette](https://github.com/ephemeralViolette) - Firefox Native Controls;
* [MaTe](https://github.com/MisforMaTe) - tradutor de português (brasileiro) e teste;
* [catneptune](https://github.com/catneptune) - tradutor de português (brasileiro) e teste;
* [Brawllux](https://github.com/EndlessLuck) - tradução em turco e teste;
* Equipa de testes - por garantir que todos os erros fossem corrigidos e sugerir melhorias;
* Microsoft - pelos recursos e software do Internet Explorer e do Windows;
* Mozilla - pelo o Firefox.
