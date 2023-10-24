# Stajyer Elemesi İçin Web Uygulaması Görevi

## Görev Açıklaması

Aşağıda bulunan görevlendirmeyi, hangi alanda başvuru yapmak istiyor iseniz. Ona göre yapmanız istenmektedir. 
Backend alanında başvuru yaptıysanız. Aşağıda bulunan backend ile ilişkili tarafı yapmanız yeterlidir.
## Görev Hedefleri

- Temel frontend ve backend becerilerinin test edilmesi.
- API kullanımının anlaşılması ve uygulanması.
- Veri filtreleme, sıralama ve sayfalama işlevselliğinin oluşturulması.
- Temiz ve okunaklı kod yazma yeteneğinin değerlendirilmesi.
- Büyük bir veri tabanını sağlıklı ve hızlı bir şekilde işleyen bir backend/frontend yazılması yeteneğinin değerlendirilmesi.

## Görev Gereksinimleri

### Frontend:

1. Kullanıcılar için kullanıcı dostu bir web arayüzü oluşturun. Bu arayüzde aşağıdaki özellikler bulunmalıdır:

   - Verileri filtrelemek için metin girişleri veya düğmeler.
   - Verileri sıralamak için seçenekler veya düğmeler.
   - Verileri göstermek için bir sonuç listesi veya tablo.

2. Kullanıcılar, API'yi kullanarak verileri filtreleyebilmeli ve sıralayabilmelidir. Örneğin, yaşa göre filtreleme veya isme göre sıralama yapabilmelidir.
   
3. Ön arayüzde kullanılacak kütüphane React yada benzeri bir kütüphane olmalıdır. State yönetimi içeren bir kütüphane olması yeterlidir. 

5. Kullanıcılar sayfa boyutunu (kaç sonucun görüntüleneceği) ayarlayabilmelidir.

6. Hata yönetimi: Kullanıcılar yanlış bir API isteği gönderdiğinde veya bir hata oluştuğunda bilgilendirilmelidir.

### Backend:

1. Go web framework veya Python web framework kullanarak bir API oluşturun. API, aşağıdaki temel işlevselliği sunmalıdır:

   - Verileri almak için bir endpoint (`/assignment/query`) oluşturun.
   - İstekleri işleyin, verileri filtreleyin, sıralayın ve sayfalayın.

2. API, kullanıcıların gönderdiği filtreler ve sıralama isteklerini kabul etmeli ve sonuçları bu kriterlere göre döndürmelidir.

3. Verileri döndürmek için örnek veri kullanabilirsiniz veya kendi örnek veri setinizi oluşturabilirsiniz.

4. Hata yönetimi: İsteklerin doğru bir şekilde işlenmesi ve hataların uygun şekilde yönetilmesi gereklidir.

## Ek Gereksinimler:

1. Kod temizliği ve düzeni çok önemlidir. İyi bir kod yapısı kullanın ve kodunuzu yorumlarla açıklayın.

2. İşlevselliği test edin ve hata durumlarını ele alın. Kodunuzun güvenli olduğundan emin olun.

3. Frontend ve backend kodlarınızı ayrı ayrı gönderin ve her ikisini de çalıştırılabilir durumda tutun.

4. Başvuranların, projelerini belirli bir süre içinde tamamlamaları gerekecektir.

## Değerlendirme Kriterleri:

1. Frontend: Kullanıcı dostu bir arayüz oluşturulmuş mu? Filtreleme, sıralama ve sayfalama işlevselliği doğru bir şekilde çalışıyor mu?

2. Backend: API, doğru istekleri işleyip sonuçları filtreleyebiliyor mu?

3. Kod Kalitesi: Kod temiz ve düzenli mi? Hata yönetimi doğru bir şekilde uygulanmış mı?

4. Genel Etkililik: Web uygulaması genel olarak iyi bir şekilde çalışıyor mu?

## Teslim Tarihi ve Değerlendirme

- Görevin son teslim tarihi 27 Ekim Cuma 17:00'dır.
- Başvuruların değerlendirilmesi sırasında, her bir adayın oluşturduğu web uygulaması ve kodu incelenecek ve değerlendirilecektir.
- Başvuru süreci sonunda, her bir adayın kodunu ve uygulamasını değerlendiren bir inceleme yapılacaktır.

# API Kullanım Kılavuzu

Bu kılavuz, MassBio API'nin kullanımını ve işlevselliğini açıklar. MassBio API, verilerinizi filtreleme, sıralama ve sayfalama işlevselliği sunar. 

Backend yazıcak arkadaşların aşağıda bulunduğu gibi istekleri kabul edip döndürmesi beklenmektedir. Testler buna göre yapılacaktır.
## API Temel Bilgileri

- **Base URL**: `https://api-dev.massbio.info/assignment/query`

## İstekler ve Yanıtlar

### İstek

- **URL**: `https://api-dev.massbio.info/assignment/query?page=<int>&page_size=<int>`
- **HTTP Metodu**: `POST`
- **İstek Başlığı (Headers)**: `'Content-Type': 'application/json'`

### İstek Gövdesi (JSON)

```json
{
    "filters": {"kolon adı": <filter>, "kolon adı": <filter>, "kolon adı": <filter>},
    "ordering": [{"kolon adı": <direction>}, {"kolon adı": <direction>}, {"kolon adı": <direction>}]
}```

- `filters`: Verileri filtrelemek için kullanılır. Filtreler, belirli kolonların belirli değerlere eşleşmesini sağlar.
- `filtres`: Verileri birden farklı veri tipinde istek kabul edebilir olmalıdır. 3 farklı veri tipi mevcuttur.
	- `enum`: Tipi enum olan kolonlar için `<filter> : [<string>, <string>, <string>]`olmalıdır.
	- `number`: Tipi enum olan kolonlar için `<filter>`: `<number>`  yada `[<number>, <number>]`olmalıdır.
	- `free_form`: Tipi free_form olan kolonlar için `<filter>:<string>` olmalıdır. 
- `ordering`: Verileri sıralamak için kullanılır. Sıralama, belirli kolonların artan (`"ASC"`) veya azalan (`"DESC"`) sıraya göre sıralanmasını sağlar.
- Kullanmanız gereken şema yapısını, tekil değerler ile birlikte ekte verilecektir. Filtreleme ve tablo yapısını bu şemaya göre kurgulanmanız istenmektedir.
- Kullanmanız beklenen kolon bilgileri ise: 
  ```
    main.uploaded_variation - ENUM
    main.existing_variation - ENUM
    main.symbol - ENUM  
    main.af_vcf - NUMERIC  
    main.dp - NUMERIC  
    details2.dann_score - NUMERIC  
    links.mondo - FREE FORM  
    links.pheno pubmed - FREE FORM  
    details2.provean - FREE FORM 
  ```
  
  - **HTTP Durum Kodları**:
    
    - `200 OK`: Başarılı bir istek sonrasında veriler başarıyla döndürüldü.
    - `400 Bad Request`: Geçersiz istek gönderildi.
    - `500 Internal Server Error`: Sunucu tarafında bir hata oluştu.
- **Yanıt Gövdesi (JSON)**
  ```json
  {
    "page": <int>,
    "page_size": <int>,
    "count": <int>,
    "results": [
        {"kolon adı": "değeri", "kolon adı": "değeri", "kolon adı": "değeri"},
        {"kolon adı": "değeri", "kolon adı": "değeri", "kolon adı": "değeri"},
        {"kolon adı": "değeri", "kolon adı": "değeri", "kolon adı": "değeri"}
    ]
}
  ```
  
### Örnek 1: Filtreleme

- **İstek Gövdesi**:

```json 
{ "filters": {"age": 25} }
```

Bu istek, `age` kolonu değeri 25 olan tüm sonuçları getirecektir.

### Örnek 2: Sıralama

- **İstek Gövdesi**:

```json 
{"ordering": [{"name": "ASC"}] }
```

Bu istek, `name` kolonuna göre artan sırayla sonuçları getirecektir.

### Örnek 3: Sayfalama

- **URL**: `https://api-dev.massbio.info/assignment/query?page=2&page_size=5`

Bu istek, ikinci sayfayı ve her sayfada en fazla 5 sonucu getirecektir.