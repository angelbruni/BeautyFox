[![en](https://img.shields.io/badge/readme-en-red.svg)](https://github.com/angelbruni/BeautyFox/blob/main/README.md)
[![pt](https://img.shields.io/badge/leia--me-pt-green.svg)](https://github.com/angelbruni/BeautyFox/blob/main/README.pt.md)
[![es](https://img.shields.io/badge/léame-es-yellow.svg)](https://github.com/angelbruni/BeautyFox/blob/main/README.es.md)
[![tr](https://img.shields.io/badge/benioku-tr-aqua.svg)](https://github.com/angelbruni/BeautyFox/blob/main/README.tr.md)
# ¿Qué es BeautyFox?
BeautyFox es un tema para Firefox 115 ESR que pretende replicar la apariencia e interfaz de Internet Explorer 9, 10 y 11.
# Notas
- El tema se ha probado en Windows 7, Windows 8.1/10 con el tema predeterminado y temas de Aero con Glass8 activado y Windows 11
- No funciona correctamente con WindowBlinds
- Asegúrate de que tu perfil no haya sido modificado por otros temas, de ser así, elimina los archivos modificados *o* crea un nuevo perfil

# Instrucciones
  1. Copia de archivos:

1.1. Copia los contenidos de la carpeta `Firefox Folder` a donde esté ubicado `firefox.exe`.

1.1.1. **(Opcional)** Para tener la pagina de InPrivate (sólo en inglés) copia tambien la carpeta `browser` dentro de la carpeta mencionada anteriormente.

1.2. Copia los contenidos de la carpeta `Profile Folder` al Directorio raíz de tu perfil (si no sabes cual es, abre Firefox y escribe `about:profiles` en la barra de direcciones)

2. **(Opcional, pero recomendado)** - Activar aero en en panel de navegación (para Windows 10/11):

**¡Advertencia!** Modificar el manifiesto puede causar que algunas sitios web de streaming (como Netflix) ya no funcionen. Continúa bajo tu propio riesgo.

Si tienes Windows Vista (con el kernel extendido), Windows 7, 8 u 8.1, no necesitas hacer esto y puedes saltarte este paso.

2.1. Descarga e instala [Resource Hacker](https://angusj.com/resourcehacker/) y ejecútalo como administrador

2.2. File > Open > encuentra `firefox.exe` > Manifest > borra/comenta estas líneas:
```xml
<supportedOS Id="{8e0f7a12-bfb3-4fe8-b9a5-48fd50a15a9a}"/>
<supportedOS Id="{1f676c76-80e1-4239-95bb-83d0f6d0da78}"/>
<supportedOS Id="{4a2f28e3-53b9-4441-ba9c-d69d4a4a6e38}"/>
```

2.3. Reinicia tu PC si aero no sirve despues de estos cambios.

3. Abre Firefox y sigue las instrucciones del asistente que aparece en pantalla.

4. Extensiones:

4.1. **(Opcional)** En `about:config`, marca `xpinstall.signatures.required` como `false`, reinicia Firefox y arrastra y suelta el archivo `suggestedSites.xpi` en la ventana de Firefox

4.2. **(Opcional)**  Instala [FeedBro](https://addons.mozilla.org/en-US/firefox/addon/feedbroreader/) para los encabezados RSS.

5. Haz clic derecho en un espacio vacío de la barra de pestañas y haz clic en `Personalizar barra de herramientas...`

5.1. Edita la interfaz para que se asemeje a [esta imagen](https://www.techrepublic.com/wp-content/uploads/2011/03/6202428.png)

6. **(Opcional)** - Activar los controles nativos (barras de desplazamiento, casillas):

6.1. Ve al [repositorio de Firefox native controls](https://github.com/ephemeralViolette/firefox-native-controls)

6.2. Ve a `releases` y descarga el archivo `xul.dll` correspondiente a tu versión de Firefox.

6.3. Cierra Firefox completamente y reemplaza el archivo `xul.dll` de la carpeta en la que esta instalado Firefox con el archivo `xul.dll` que descargaste.

6.4. Abre Firefox nuevamente y ya tienes los controles nativos! (Nota, esto aplicará a ***todo*** lo que Firefox cargue, incluyendo sitios web, ¡¡¡así que sitios como Discord Web se verán algo raros por estos cambios!!!).

Disfruta del tema!

# Créditos/Agradecimientos
* [AngelBruni](https://github.com/angelbruni) - Desarrollador del tema, creador de README.pt.md;
* SQUEeAK - Trailer;
* [luisl173](https://github.com/luisl173) - Creador de README.md y README.es.md, traducción al español y tester;
* [ephemeralViolette](https://github.com/ephemeralViolette) - Firefox Native Controls;
* [MaTe](https://github.com/MisforMaTe) - Traducción al portugués (brasileño) y tester;
* [catneptune](https://github.com/catneptune) - Traducción al portugués (brasileño) y tester;
* [Brawllux](https://github.com/EndlessLuck) - Creador de README.tr.md, traducción al turco y tester;
* Equipo de pruebas - Por asegurarse de que todos los errores fueran arreglados y sugerir mejoras.
* Microsoft - por los recursos y software de Internet Explorer y Windows;
* Mozilla - por Firefox.
