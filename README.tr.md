[![en](https://img.shields.io/badge/readme-en-red.svg)](https://github.com/angelbruni/BeautyFox/blob/main/README.md)
[![pt](https://img.shields.io/badge/leia--me-pt-green.svg)](https://github.com/angelbruni/BeautyFox/blob/main/README.pt.md)
[![es](https://img.shields.io/badge/léame-es-yellow.svg)](https://github.com/angelbruni/BeautyFox/blob/main/README.es.md)
[![tr](https://img.shields.io/badge/benioku-tr-aqua.svg)](https://github.com/angelbruni/BeautyFox/blob/main/README.tr.md)
# BeautyFox nedir?
BeautyFox, Firefox 115 Uzatılmış Destek Sürümü (ESR) için tasarlanmış geniş kapsamlı bir temadır, Internet Explorer 9, 10, 11 görünüm ve hissiyatını taklit eder.
# Önemli Notlar
* Windows 7, Windows 8.1/10/11'de varsayılan tema, ve eğer mevcutsa Aero teması ile test edilmiştir;
* Beautyfox, WindowBlinds ile uyumlu değildir.
* Beautyfox, Glass8 ile uyumludur.
* Firefox profilinizin başka temalar tarafından değiştirilmediğinden emin olun. Eğer başka bir tema kullanıyorsanız, lütfen değiştirilmiş dosyaları silip yeni bir profil oluşturun.

# Yükleme Talimatları

1. Dosyaları kopyalama:

1.1.	`Firefox Folder` içindeki dosyaları `firefox.exe` dosyasının bulunduğu klasöre kopyalayın;

1.1.1. **(İsteğe Bağlı)** Gizli sekmelerin görünümünü değiştirmek istiyorsanız, `browser` klasörünü de kopyalamanız gerekecektir.

1.2.	`Profile Folder` klasörü içindeki dosyaları `Kök profil` klasörüne kopyalayın (Klasörün yerini öğrenmek için adres çubuğuna about:profiles yazın ve aktif profili bulun).

2.	[Resource Hacker](https://angusj.com/resourcehacker/) programını indirip yükleyin. İşletim sisteminiz Windows Vista/7 değilse, şeffaf gezinme paneli istiyorsanız bu adım gereklidir.

2.1.	Firefox'u tamamen kapatın ve Resource Hacker'ı yönetici olarak çalıştırın.

2.2.	Dosya > Aç > `firefox.exe` dosyasını bulun ve açın > Manifest sekmesine gidin ve aşağıda görülen satırları silin:
```xml
<supportedOS Id="{8e0f7a12-bfb3-4fe8-b9a5-48fd50a15a9a}"/>
<supportedOS Id="{1f676c76-80e1-4239-95bb-83d0f6d0da78}"/>
<supportedOS Id="{4a2f28e3-53b9-4441-ba9c-d69d4a4a6e38}"/>
```
2.3.	Değişiklikleri uyguladıktan sonra şeffaf gezinme paneli çalışmazsa bilgisayarınızı yeniden başlatın.

3. Firefox'u açın ve ekranda beliren sihirbazın talimatlarını izleyin.

4.	Eklentiler:

4.1	**(İsteğe Bağlı)** `about:config` sayfasında, `xpinstall.signatures.required` değerini `false` olarak ayarlayın ve `suggestedSites.xpi` dosyasını Firefox'a sürükleyip bırakın

4.2	**(İsteğe Bağlı)** RSS akışları için [FeedBro](https://addons.mozilla.org/en-US/firefox/addon/feedbroreader/) eklentisini yükleyin.

5. Arayüzü [Bu şekilde özelleştirmek istiyorsanız...](https://www.techrepublic.com/wp-content/uploads/2011/03/6202428.png) 

5.1 Sekmeler çubuğu'ndaki boş alana sağ tıklayın ve `Araç Çubuğu'nu özelleştir...` seçeneğine tıklayın.

6. **(İsteğe Bağlı)** - İşletim sistemi temasına uygun kontroller (kaydırma çubukları, onay kutuları, vs...):

6.1. [Firefox için temaya uygun kontroller deposu](https://github.com/ephemeralViolette/firefox-native-controls) GitHub sayfasına gidin.

6.2. `releases` sekmesine gidin ve Firefox sürümünüzle uyumlu olan `xul.dll` dosyasını indirin.

6.3. Firefox'u **tamamen kapatın** ve indirdiğiniz `xul.dll` dosyasını Firefox'un yüklü olduğu klasöre kopyalayın, mevcut olan `xul.dll` dosyası ile değiştirin.

6.4. Firefox'u tekrar açtığınızda, temaya uygun olarak değişen kontrolleri göreceksiniz. (Unutmayın ki bu düzenleme Firefox tarafından yüklenen ve görüntülenen ***her şeye*** uygulanacaktır. Gireceğiniz internet siteleri de buna dahildir. Discord gibi siteler bu tarz kontrollerle tuhaf görünebilir.)

Tadını çıkartın! :D

# Özel Teşekkürler
* [AngelBruni](https://github.com/angelbruni) - Tema Geliştiricisi, README.pt.md dosyasının yaratıcısı;
* SQUEeAK - Trailer;
* [luisl173](https://github.com/luisl173) - README.md ve README.es.md dosyalarının yaratıcısı, İspanyolca çeviri, test ve geri bildirim;
* [ephemeralViolette](https://github.com/ephemeralViolette) - `Firefox için temaya uygun kontroller`in geliştiricisi;
* [MaTe](https://github.com/MisforMaTe) - Portekizce (Brezilya) çeviri, test ve geri bildirim;
* [catneptune](https://github.com/catneptune) - Portekizce (Brezilya) çeviri, test ve geri bildirim;
* [Brawllux](https://github.com/EndlessLuck) - Türkçe çeviri, test ve geri bildirim;
* [ImSwordQueen](https://github.com/ImSwordQueen) - Bir sürü harika küçük fikir için;
* Test Takımı - Tema içindeki hata oranını sıfıra indirmede konusunda kararlılıkları için;
* Microsoft - Internet Explorer ve Windows yazılımı ve bileşenleri;
* Mozilla - Firefox yazılımının geliştiricileri.


This work is licensed under a
[Creative Commons Attribution-NonCommercial-ShareAlike 4.0 International License][cc-by-nc-sa].

[![CC BY-NC-SA 4.0][cc-by-nc-sa-image]][cc-by-nc-sa]

[cc-by-nc-sa]: http://creativecommons.org/licenses/by-nc-sa/4.0/
[cc-by-nc-sa-image]: https://licensebuttons.net/l/by-nc-sa/4.0/88x31.png