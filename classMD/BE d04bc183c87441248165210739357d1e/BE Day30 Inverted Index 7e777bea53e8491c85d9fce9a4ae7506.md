# BE Day30 Inverted Index

---

  **목차**

  

---

# Postman을 활용한 기초 CRUD 실습

먼저 class 폴더 안에 `29-03-logstash-polling-mysql-with-time` 에서 서버를 docker로 실행시켜주세요. 

***실습은 elasticsearc 와 logstash가 실행되었다는 가정하에 진행하겠습니다.***

***Postman을 사용해 실습을 진행할 것이기 때문에 실행해주세요.***

## 게시글등록 ~ 테이블 삭제

가장 기본적인 게시글들을 등록하고 테이블을 삭제하는 실습을 진행해 보겠습니다.

![스크린샷 2022-03-07 오전 10.37.22.png](BE%20Day30%20Inverted%20Index%207e777bea53e8491c85d9fce9a4ae7506/%E1%84%89%E1%85%B3%E1%84%8F%E1%85%B3%E1%84%85%E1%85%B5%E1%86%AB%E1%84%89%E1%85%A3%E1%86%BA_2022-03-07_%E1%84%8B%E1%85%A9%E1%84%8C%E1%85%A5%E1%86%AB_10.37.22.png)

```
GET <http://localhost:9200>

```

`elasticesearch`가 잘 실행되었다면 `postman`에서 다음과 같이 요청을 보내면 기본 조회가 가능합니다.

![스크린샷 2022-03-07 오전 10.41.58.png](BE%20Day30%20Inverted%20Index%207e777bea53e8491c85d9fce9a4ae7506/%E1%84%89%E1%85%B3%E1%84%8F%E1%85%B3%E1%84%85%E1%85%B5%E1%86%AB%E1%84%89%E1%85%A3%E1%86%BA_2022-03-07_%E1%84%8B%E1%85%A9%E1%84%8C%E1%85%A5%E1%86%AB_10.41.58.png)

```
POST <[http://localhost:9200/myboard/_doc/1](http://localhost:9200/myboard/_doc/1)>
{
      "title": "제목입니다~",
      "contents": "내용입니다~"
}
```

**POST 메서드**를 사용해서 myboard 테이블을 만들고 1번 게시물을 등록했습니다.

![스크린샷 2022-03-07 오전 10.46.27.png](BE%20Day30%20Inverted%20Index%207e777bea53e8491c85d9fce9a4ae7506/%E1%84%89%E1%85%B3%E1%84%8F%E1%85%B3%E1%84%85%E1%85%B5%E1%86%AB%E1%84%89%E1%85%A3%E1%86%BA_2022-03-07_%E1%84%8B%E1%85%A9%E1%84%8C%E1%85%A5%E1%86%AB_10.46.27.png)

```
POST <http://localhost:9200/myproduct/_search>
```

**GET 메서드**를 사용해서 myboard 테이블의 1번 게시물이 잘 등록되었는지 확인해 보겠습니다.

![스크린샷 2022-03-07 오전 10.50.34.png](BE%20Day30%20Inverted%20Index%207e777bea53e8491c85d9fce9a4ae7506/%E1%84%89%E1%85%B3%E1%84%8F%E1%85%B3%E1%84%85%E1%85%B5%E1%86%AB%E1%84%89%E1%85%A3%E1%86%BA_2022-03-07_%E1%84%8B%E1%85%A9%E1%84%8C%E1%85%A5%E1%86%AB_10.50.34.png)

```
DELETE <http://localhost:9200/myboard>
```

**DELETE 메서드**를 사용해서 테이블 전체를 삭제해 보겠습니다.

## 상품 CRUD

`***Postman` 에서 상품 CRUD를 진행해보겠습니다.*** 

### Create

![스크린샷 2022-03-07 오전 10.58.43.png](BE%20Day30%20Inverted%20Index%207e777bea53e8491c85d9fce9a4ae7506/%E1%84%89%E1%85%B3%E1%84%8F%E1%85%B3%E1%84%85%E1%85%B5%E1%86%AB%E1%84%89%E1%85%A3%E1%86%BA_2022-03-07_%E1%84%8B%E1%85%A9%E1%84%8C%E1%85%A5%E1%86%AB_10.58.43.png)

```
POST <[http://localhost:9200/myboard/_doc/1](http://localhost:9200/myboard/_doc/1)>
{
    "name": "최신마우스",
    "description": "안녕하세요. Bestshop입니다! 국내 최고 Best 상품만 판매합니다!",
    "price": 10000
}
```

myboard 테이블을 만들고 1번 게시물 `최신마우스`를 등록했습니다.

![스크린샷 2022-03-07 오전 11.02.14.png](BE%20Day30%20Inverted%20Index%207e777bea53e8491c85d9fce9a4ae7506/%E1%84%89%E1%85%B3%E1%84%8F%E1%85%B3%E1%84%85%E1%85%B5%E1%86%AB%E1%84%89%E1%85%A3%E1%86%BA_2022-03-07_%E1%84%8B%E1%85%A9%E1%84%8C%E1%85%A5%E1%86%AB_11.02.14.png)

```
POST <[http://localhost:9200/myboard/_doc/1](http://localhost:9200/myboard/_doc/1)>
{
    "name": "기계식키보드",
    "description": "기계식 키보드 오늘만 특가!!",
    "price": 20000
}
```

myboard 테이블을 만들고 2번 게시물인 `기계식키보드`를 등록했습니다.

### Read

![스크린샷 2022-03-07 오전 11.05.10.png](BE%20Day30%20Inverted%20Index%207e777bea53e8491c85d9fce9a4ae7506/%E1%84%89%E1%85%B3%E1%84%8F%E1%85%B3%E1%84%85%E1%85%B5%E1%86%AB%E1%84%89%E1%85%A3%E1%86%BA_2022-03-07_%E1%84%8B%E1%85%A9%E1%84%8C%E1%85%A5%E1%86%AB_11.05.10.png)

![스크린샷 2022-03-07 오전 11.05.26.png](BE%20Day30%20Inverted%20Index%207e777bea53e8491c85d9fce9a4ae7506/%E1%84%89%E1%85%B3%E1%84%8F%E1%85%B3%E1%84%85%E1%85%B5%E1%86%AB%E1%84%89%E1%85%A3%E1%86%BA_2022-03-07_%E1%84%8B%E1%85%A9%E1%84%8C%E1%85%A5%E1%86%AB_11.05.26.png)

```
GET <http://localhost:9200/myproduct/_doc/1>
GET <http://localhost:9200/myproduct/_doc/2>

```

`기계식키보드` `최신마우스`가 잘 조회됩니다.

### Update

![스크린샷 2022-03-07 오전 11.12.56.png](BE%20Day30%20Inverted%20Index%207e777bea53e8491c85d9fce9a4ae7506/%E1%84%89%E1%85%B3%E1%84%8F%E1%85%B3%E1%84%85%E1%85%B5%E1%86%AB%E1%84%89%E1%85%A3%E1%86%BA_2022-03-07_%E1%84%8B%E1%85%A9%E1%84%8C%E1%85%A5%E1%86%AB_11.12.56.png)

```
PUT [http://localhost:9200/myproduct/_doc/2](http://localhost:9200/myproduct/_doc/2)
{
"name": "기계식키보드(청축)",
"description": "기계식 키보드 오늘만 특가!!",
"price": 20000
}
```

`기계식키보드 => 기계식키보드(청축)`으로 상품을 수정해보겠습니다.

![스크린샷 2022-03-07 오전 11.13.52.png](BE%20Day30%20Inverted%20Index%207e777bea53e8491c85d9fce9a4ae7506/%E1%84%89%E1%85%B3%E1%84%8F%E1%85%B3%E1%84%85%E1%85%B5%E1%86%AB%E1%84%89%E1%85%A3%E1%86%BA_2022-03-07_%E1%84%8B%E1%85%A9%E1%84%8C%E1%85%A5%E1%86%AB_11.13.52.png)

정상적으로 수정되었습니다.

### Delete

먼저 상품을 삭제하기 전에 상품 목록을 조회해보겠습니다.

![스크린샷 2022-03-07 오전 11.16.09.png](BE%20Day30%20Inverted%20Index%207e777bea53e8491c85d9fce9a4ae7506/%E1%84%89%E1%85%B3%E1%84%8F%E1%85%B3%E1%84%85%E1%85%B5%E1%86%AB%E1%84%89%E1%85%A3%E1%86%BA_2022-03-07_%E1%84%8B%E1%85%A9%E1%84%8C%E1%85%A5%E1%86%AB_11.16.09.png)

```
GET http://localhost:9200/myproduct/_search
```

상품 테이블에 있는 목록을 모두 조회해 보겠습니다.

![스크린샷 2022-03-07 오전 11.18.15.png](BE%20Day30%20Inverted%20Index%207e777bea53e8491c85d9fce9a4ae7506/%E1%84%89%E1%85%B3%E1%84%8F%E1%85%B3%E1%84%85%E1%85%B5%E1%86%AB%E1%84%89%E1%85%A3%E1%86%BA_2022-03-07_%E1%84%8B%E1%85%A9%E1%84%8C%E1%85%A5%E1%86%AB_11.18.15.png)

```
DELETE http://localhost:9200/myproduct/_doc/2
```

2번 데이터를 삭제합니다.

![스크린샷 2022-03-07 오전 11.19.22.png](BE%20Day30%20Inverted%20Index%207e777bea53e8491c85d9fce9a4ae7506/%E1%84%89%E1%85%B3%E1%84%8F%E1%85%B3%E1%84%85%E1%85%B5%E1%86%AB%E1%84%89%E1%85%A3%E1%86%BA_2022-03-07_%E1%84%8B%E1%85%A9%E1%84%8C%E1%85%A5%E1%86%AB_11.19.22.png)

상품 목록을 조회하니 정상적으로 삭제되어 조회되지 않습니다.

## 검색어로 조회하기

***이번에는 상품을 검색어 만으로 조회를 진행해보겠습니다.*** 

이전에 검색어로 조회하기 전에 검색할 데이터를 넣겠습니다.

![스크린샷 2022-03-07 오전 11.25.01.png](BE%20Day30%20Inverted%20Index%207e777bea53e8491c85d9fce9a4ae7506/%E1%84%89%E1%85%B3%E1%84%8F%E1%85%B3%E1%84%85%E1%85%B5%E1%86%AB%E1%84%89%E1%85%A3%E1%86%BA_2022-03-07_%E1%84%8B%E1%85%A9%E1%84%8C%E1%85%A5%E1%86%AB_11.25.01.png)

```
POST http://localhost:9200/myproduct/_doc/_bulk
{"index":{"_id":"1"}}
{"description":"Best"}
{"index":{"_id":"2"}}
{"description":"Bestshop"}
```

`bulk`를 사용해서 2개의 데이터를 생성했습니다.

![스크린샷 2022-03-07 오전 11.27.53.png](BE%20Day30%20Inverted%20Index%207e777bea53e8491c85d9fce9a4ae7506/%E1%84%89%E1%85%B3%E1%84%8F%E1%85%B3%E1%84%85%E1%85%B5%E1%86%AB%E1%84%89%E1%85%A3%E1%86%BA_2022-03-07_%E1%84%8B%E1%85%A9%E1%84%8C%E1%85%A5%E1%86%AB_11.27.53.png)

```
POST http://localhost:9200/myproduct/_search
{
    "query": {
    "match": {
        "description": "Best"
	    }
    }
}
```

`Best검색어`로 검색을 했더니 **1개의 데이터가 조회됩니다.**

![스크린샷 2022-03-07 오전 11.29.53.png](BE%20Day30%20Inverted%20Index%207e777bea53e8491c85d9fce9a4ae7506/%E1%84%89%E1%85%B3%E1%84%8F%E1%85%B3%E1%84%85%E1%85%B5%E1%86%AB%E1%84%89%E1%85%A3%E1%86%BA_2022-03-07_%E1%84%8B%E1%85%A9%E1%84%8C%E1%85%A5%E1%86%AB_11.29.53.png)

```
POST http://localhost:9200/myproduct/_search
{
    "query": {
    "match": {
        "description": "shop"
	    }
    }
}
```

이번에는 `shop 검색어`로 조회했더니 **아무것도 조회되지 않습니다.**

# Inverted Index

![https://media.vlpt.us/images/hkja0111/post/fc053a0c-f52a-4f12-a354-3dcf957b94dd/image.png](https://media.vlpt.us/images/hkja0111/post/fc053a0c-f52a-4f12-a354-3dcf957b94dd/image.png)

보통 **Mysql** 같은 `관계형 데이터베이스`에서는 위와 같이 테이블을 작성하여 데이터를 저장합니다. 

위와 같은 데이터베이스에서 `fox`로 검색을 하고자 한다면 테이블의 Row를 하나씩 살피면서 `fox`가 포함되면 Data를 가져오고 아니라면 넘어갈 것입니다.

SQL의 `LIKE` 검색은 위와 같은 방식의 검색을 하기 때문에 데이터가 늘어날수록 모든 Row를 확인해 읽어야 하여 검색 속도가 기본적으로 느릴 수 밖에 없습니다.

하지만, `Elasticsearch`는 **Data를 저장할 때 역색인(Inverted Index) 구조로 만들어 저장하여 빠른 속도로 검색이 가능합니다!**

![https://media.vlpt.us/images/hkja0111/post/cd0b32b5-5a32-49ab-8e9b-51480931703b/image.png](https://media.vlpt.us/images/hkja0111/post/cd0b32b5-5a32-49ab-8e9b-51480931703b/image.png)

Elasticsearch는 위와 같이 데이터로부터 Term이라는 키워드를 추출하여, 

Term이라는 Inverted Index가 가리키는 Id를 저장합니다. 

따라서 Mysql과 동일하게 `fox`로 검색을 하여도 **모든 Row를 방문할 필요 없이 저장된 Id의 배열**을 바로 얻을 수 있습니다.

이러한 **Inverted Index**는 데이터가 저장되는 과정에서 만들어지기에 `Elasticsearcch`에서는 **Data를 저장이 아닌 색인한다**고 표현합니다.

## Text Anaylsis

앞에서 Elasticsearch가 검색을 할 때 Inverted Index를 활용하고, 데이터를 색인할 때 Term이라는 키워드로 추출한다고 했습니다. 

그렇다면 Elasticsearch는 어떤 방식으로 문자열 Field를 Term으로 처리할까요?

> Elasticsearch는 검색어 Term을 저장하기 위해 **Text Analysis**라는 과정을 거치고, 이러한 과정을 처리하는 기능을 `Analyzer`라고 합니다. Analyzer는 0~3개의 **Character Filter**, 1개의 **Tokenizer**, 그리고 0~n개의 **Token Filter**로 이루어집니다.
> 

![https://media.vlpt.us/images/hkja0111/post/1668516d-372c-40bb-92bf-07e0c5153d80/image.png](https://media.vlpt.us/images/hkja0111/post/1668516d-372c-40bb-92bf-07e0c5153d80/image.png)

### Character Filter

**캐릭터 필터**는 **텍스트 분석 중 가장 먼저 처리되는 과정**으로, Tokenizer에 의해 색인된 Text가 Term으로 분리되기 전에 전체 Text에 대해 적용되는 **전처리 도구**입니다. 

Elasticsearch 7.0 기준으로 **HTML_Strip, Mapping, Pattern Replace** 총 3개가 존재합니다.

- **HTML Strip**

입력된 텍스트가 HTML 인 경우 **HTML 태그들을 제거**하여 일반 텍스트로 만듭니다. `<>`로 된 태그를 제거할 뿐 아니라 `&nbsp;` 같은 HTML 문법 용어들도 해석합니다.

- **Mapping**

Mapping 캐릭터 필터를 이용하면 **지정한 단어를 다른 단어로 치환이 가능**합니다. **특수문자 등을 포함하는 검색 기능**을 구현하려는 경우 **반드시 적용**해야 해서 실제로 캐릭터 필터 중에는 가장 많이 쓰입니다.

보통 `Standard Analyzer`는 +, -같은 특수문자를 **불용어(큰 의미가 없는 단어)로 간주**하고 제거하기 때문에 특수문자가 포함된 검색을 하기위해서는 먼저 특수문자를 다른 문자로 치환하여 저장해야 합니다. 

예를 들어 "c++"을 검색하기 위해서 `+`를 `_plus_`로 치환하는 Character Filter를 아래와 같이 만들어줍니다.

![https://media.vlpt.us/images/hkja0111/post/237b282b-80e0-4b98-807a-f756bab05c7b/charfil1.png](https://media.vlpt.us/images/hkja0111/post/237b282b-80e0-4b98-807a-f756bab05c7b/charfil1.png)

![https://media.vlpt.us/images/hkja0111/post/2f92c388-39f2-424c-a2a9-efc714db0872/image.png](https://media.vlpt.us/images/hkja0111/post/2f92c388-39f2-424c-a2a9-efc714db0872/image.png)

- **Pattern Replace**

Pattern Replace 캐릭터 필터는 **정규식(Regular Expression)을 이용해서 좀더 복잡한 패턴들을 치환**할 수 있는 캐릭터 필터입니다. 아래는 camelCase로 된 단어를 대문자가 시작하는 단위마다 공백을 삽입해 세부 단어로 Token이 생성될 수 있도록 하는 Character Filter입니다.

![https://media.vlpt.us/images/hkja0111/post/c26e09c5-b891-476b-bcea-26ac55543969/charfil2.png](https://media.vlpt.us/images/hkja0111/post/c26e09c5-b891-476b-bcea-26ac55543969/charfil2.png)

이제 camel 인덱스에서 "FooBazBar" 라는 단어를 분석 해 보면 "foo", "baz", "bar"와 같이 대문자 시작 단위로 Term이 쪼개어 색인되는 것을 확인할 수 있습니다.

![Untitled](BE%20Day30%20Inverted%20Index%207e777bea53e8491c85d9fce9a4ae7506/Untitled.png)

### Tokenizer

**Data Indexing**에서 가장 중요하고 큰 영향을 미치는 것이 바로 `Tokenizer`입니다. 

Tokenizer는 **Character Filter로 전처리된 Text에 속한 단어를 Term 단위로 하나씩 분리해 처리하는 과정**을 담당합니다. 데이터 분석 과정에서 Tokenizer는 반드시 한 개만 사용이 가능하며, 대표적인 3개의 Tokenizer를 살펴보겠습니다.

- **Standard Tokenizer**

Standard Tokenizer는 **공백으로 Term을 구분**하면서 "@"과 같은 **일부 특수문자를 제거**합니다. "jumped!"의 느낌표, "meters."의 마침표 처럼 단어 끝에 있는 특수문자는 제거되지만 "quick.brown_FOx" 또는 "3.5" 처럼 중간에 있는 **마침표나 밑줄 등은 제거되거나 분리되지 않습니다.**

- **Letter Tokenizer**

Letter Tokenizer는 **알파벳을 제외한 모든 공백, 숫자, 기호들을 기준으로 Term을 분리**합니다. "quick.brown_FOx" 같은 단어도 "quick", "brown", "FOx" 처럼 모두 분리됩니다.

- **White Tokenizer**

Whitespace Tokenizer는 **스페이스, 탭, 그리고 줄바꿈 같은 공백만을 기준으로 텀을 분리**합니다. 특수문자 "@" 그리고 "meters." 의 마지막에 있는 마침표도 사라지지 않고 그대로 남아있습니다.

3개의 토크나이저 중에 Letter Tokenizer의 경우 **검색 범위가 넓어져서 원하지 않는 결과**가 많이 나올 수 있고, 반대로 Whitespace의 경우 특수문자를 거르지 않기 때문에 **정확하게 검색을 하지 않으면 검색 결과가 나오지 않을 수** 있습니다. 따라서 **보통은 Standard Tokenizer를 많이 사용합니다.**

### Token Filter

Tokenizer로 Term을 분리해준 이후, 분리된 **각각의 Term을 지정한 규칙에 따라 처리**해줍니다. `filter` 항목에 배열 형태로 나열해서 지정해야 하며, **나열한 순서대로 적용**되기 때문에 순서를 잘 고려해야합니다.

- **Lowercase, Uppercase**

영어같은 경우 검색을 할때 대소문자를 구분하지 않고 검색할 수 있도록 처리해주어야 합니다. 보통은 Term을 모두 소문자로 변경하여 저장하는데, 이를 처리하는 Token Filter가 Lowercase 입니다.

- **Stop**

블로그나 뉴스 같은 글은 검색에서 큰 의미가 없는 조사나 전치사를 많이 포함하고 있습니다. 이렇게 검색할 때 쓰이지 않는 단어를 `불용어`(stopword)라 하여 **Stop Token Filter**를 적용해 불용어에 해당되는 Term을 제거할 수 있습니다.

![https://media.vlpt.us/images/hkja0111/post/91bc256c-e9d8-4289-93a2-8fa5ec7b4a18/charfil3.png](https://media.vlpt.us/images/hkja0111/post/91bc256c-e9d8-4289-93a2-8fa5ec7b4a18/charfil3.png)

위와 같이 `in`, `the`, `days`를 불용어로 처리하는 Custom Filter를 생성하여 적용할 수 있습니다.

이후 "Around the World in Eighty Days”로 문장 분석을 하면, 아래와 같은 결과를 얻을 수 있습니다.

```bash
{
  "tokens" : [
    {
      "token" : "around",
      "start_offset" : 0,
      "end_offset" : 6,
      "type" : "word",
      "position" : 0
    },
    {
      "token" : "world",
      "start_offset" : 11,
      "end_offset" : 16,
      "type" : "word",
      "position" : 2
    },
    {
      "token" : "eighty",
      "start_offset" : 20,
      "end_offset" : 26,
      "type" : "word",
      "position" : 4
    }
  ]
}
```

---

# Setting & Mapping

모든 Index는 **settings와 mapping의 두 개의 정보 단위**를 가지고 있습니다. 

Index를 처음 처음 생성한 뒤 `GET Index명`으로 조회하면 Index의 초기 settings와 mappings을 확인할 수 있습니다.

![https://media.vlpt.us/images/hkja0111/post/5e477771-0bda-45f2-9e23-48b72906fa01/map.png](https://media.vlpt.us/images/hkja0111/post/5e477771-0bda-45f2-9e23-48b72906fa01/map.png)

## Settings

Elasticsearch Index의 Settings는 쉽게 말해 **Index 정보 설정을 확인**할 수 있는 단위입니다. 처음 인덱스를 정의하면 Shard, Replica(복제본)의 수 같은 정보가 자동으로 생성됩니다. 어떤 설정은 운영 도중에도 변경할 수 있지만 대부분의 설정들은 생성시 **한번 지정되면 변경되지 않습니다.**

> **Full-Text Search를 하기 위하여 Analyzer를 사용해 데이터를 역색인합니다.** 상단에서 살펴본 Analyzer, Tokenizer, Filter 역시 Index의 Settings에서 정의해줍니다!
> 

Settings에서 정의하는 Analyzer의 기본 구조는 다음과 같습니다.

![https://media.vlpt.us/images/hkja0111/post/687034ee-b8f8-4463-9f8a-1816ac694e32/analyzer.png](https://media.vlpt.us/images/hkja0111/post/687034ee-b8f8-4463-9f8a-1816ac694e32/analyzer.png)

`"analysis"` 내부에서 `analyzer`, `char_filter`, `tokenizer`, `token_filter`를 생성하고 정의하여 사용합니다. 

처음 볼 때는 복잡해 보이지만1. `char_filter`, `tokenizer`, `filter` 내부에 사용자가 정의한 기능들을 작성하고2. 작성한 사용자 정의 기능을 `analyzer`에서 적용하여 사용하는 구조 입니다.

한 번 적용된 `analysis` 내용은 변경이 불가능하고, 이미 만들어진 Index에 Analyzer를 변경하거나 추가하기 위해서 Index를 `_close`한 후에 변경하고 다시 `_open`해주어야 합니다.

### Analyser

`Elasticsearch`의 검색 원리 분석해서 3가지의 Analyser를 사용해 실습을 진행해 보겠습니다.

먼저 class 폴더 안에 `29-03-logstash-polling-mysql-with-time` 에서 서버를 docker로 실행시켜주세요. 

***실습은 elasticsearc 와 logstash가 실행되었다는 가정하에 진행하겠습니다.***

***Postman을 사용해 실습을 진행할 것이기 때문에 실행해주세요.***

- **standard 애널라이저**

![스크린샷 2022-03-07 오전 11.42.32.png](BE%20Day30%20Inverted%20Index%207e777bea53e8491c85d9fce9a4ae7506/%E1%84%89%E1%85%B3%E1%84%8F%E1%85%B3%E1%84%85%E1%85%B5%E1%86%AB%E1%84%89%E1%85%A3%E1%86%BA_2022-03-07_%E1%84%8B%E1%85%A9%E1%84%8C%E1%85%A5%E1%86%AB_11.42.32.png)

```
POST <http://localhost:9200/myproduct/_analyze>
{
  "text": "안녕하세요. Bestshop입니다! Best"
}

```

`디폴트(Standard) 애널라이저`사용했습니다. 보편적으로 **가장 많이 사용되는 애널라이저입니다.**

- **whitespace 애널라이저**

![스크린샷 2022-03-07 오전 11.47.07.png](BE%20Day30%20Inverted%20Index%207e777bea53e8491c85d9fce9a4ae7506/%E1%84%89%E1%85%B3%E1%84%8F%E1%85%B3%E1%84%85%E1%85%B5%E1%86%AB%E1%84%89%E1%85%A3%E1%86%BA_2022-03-07_%E1%84%8B%E1%85%A9%E1%84%8C%E1%85%A5%E1%86%AB_11.47.07.png)

```
POST <http://localhost:9200/myproduct/_analyze>
{
  "analyzer": "whitespace",
  "text": "안녕하세요. Bestshop입니다! Best"
}

```

`whitespace 애널라이저` 사용했습니다. **공백을 기준으로 token을 나누어 저장합니다.**

- **keyword 애널라이저**

![스크린샷 2022-03-07 오전 11.50.30.png](BE%20Day30%20Inverted%20Index%207e777bea53e8491c85d9fce9a4ae7506/%E1%84%89%E1%85%B3%E1%84%8F%E1%85%B3%E1%84%85%E1%85%B5%E1%86%AB%E1%84%89%E1%85%A3%E1%86%BA_2022-03-07_%E1%84%8B%E1%85%A9%E1%84%8C%E1%85%A5%E1%86%AB_11.50.30.png)

```
POST <http://localhost:9200/myproduct/_analyze>
{
  "analyzer": "keyword",
  "text": "안녕하세요. Bestshop입니다! Best"
}
```

`keyword 애널라이저` 사용했습니다. 전체 **keyword를 token으로 저장합니다.**

### nGram Analyser

Elasticsearch는 빠른 검색을 위해 검색에 사용될 term을 미리 분리해 역색인하여 저장하는데, **Term이 아닌 일부 단어로 검색해야 하는 기능이 필요**할 때가 있습니다. 

주로 자동완성 기능에 유용한데, RDBMS의 `LIKE` 검색과 비슷한 기능을 하는 `wildcard` 나 `regexp` Query도 지원하지만 이런 쿼리는 메모리 소모가 많고 느리기 때문에 **빠른 검색을 지향하는 Elasticsearch의 장점을 활용하지 못합니다.**

이런 상황을 위해 Query가 아니라 처음 Indexing을 할 때 **검색 Term의 일부를 분리하여 저장**할 수 있는데, 이렇게 **단어를 나눈 부위를 `Ngram`**이라 합니다.

![https://media.vlpt.us/images/hkja0111/post/409a3429-5c27-42dc-a49f-4680b3e4b1aa/image.png](https://media.vlpt.us/images/hkja0111/post/409a3429-5c27-42dc-a49f-4680b3e4b1aa/image.png)

 `min_gram`과 `max_gram`으로 최소, 최대 문자 수 Token을 정의할 수 있는데, `house`라는 text를 최소 2, 최대 3의 gram으로 설정하면 상위와 같이 총 7개의 token을 저장합니다.

***nGram 애널라이저 settings 등록해보겠습니다.***

class 폴더 안에 `29-03-logstash-polling-mysql-with-time` 에서 서버를 docker로 실행시켜주세요. 

***실습은 elasticsearc 와 logstash가 실행되었다는 가정하에 진행하겠습니다.***

***Postman을 사용해 실습을 진행할 것이기 때문에 실행해주세요.***

![스크린샷 2022-03-07 오후 12.18.14.png](BE%20Day30%20Inverted%20Index%207e777bea53e8491c85d9fce9a4ae7506/%E1%84%89%E1%85%B3%E1%84%8F%E1%85%B3%E1%84%85%E1%85%B5%E1%86%AB%E1%84%89%E1%85%A3%E1%86%BA_2022-03-07_%E1%84%8B%E1%85%A9%E1%84%92%E1%85%AE_12.18.14.png)

```
PUT http://localhost:9200/myproduct2
{
  "settings": {
    "analysis": {
      "analyzer": {
        "my_ngram_analyzer": {
          "tokenizer": "my_ngram_tokenizer"	
        }
      },
      "tokenizer": {
        "my_ngram_tokenizer": {
          "type": "nGram",
          "min_gram": "1",
          "max_gram": "10"
        }
      }
    },
    "max_ngram_diff" : "10"
  }
}
```

`mgax_ngram_diff`는 `min_gram`과 `max_gram`의 허용된 최대 Difference로, **정의해주지 않으면 Error가 발생합니다.**

![스크린샷 2022-03-07 오후 12.22.01.png](BE%20Day30%20Inverted%20Index%207e777bea53e8491c85d9fce9a4ae7506/%E1%84%89%E1%85%B3%E1%84%8F%E1%85%B3%E1%84%85%E1%85%B5%E1%86%AB%E1%84%89%E1%85%A3%E1%86%BA_2022-03-07_%E1%84%8B%E1%85%A9%E1%84%92%E1%85%AE_12.22.01.png)

```
GET http://localhost:9200/myproduct2/_settings
```

`_settings`조회하여 **nGram 토크나이저 등록여부 확인하였습니다.**

![스크린샷 2022-03-07 오후 12.24.18.png](BE%20Day30%20Inverted%20Index%207e777bea53e8491c85d9fce9a4ae7506/%E1%84%89%E1%85%B3%E1%84%8F%E1%85%B3%E1%84%85%E1%85%B5%E1%86%AB%E1%84%89%E1%85%A3%E1%86%BA_2022-03-07_%E1%84%8B%E1%85%A9%E1%84%92%E1%85%AE_12.24.18.png)

```
POST http://localhost:9200/myproduct2/_analyze
{
  "analyzer": "my_ngram_analyzer",
  "text": "안녕하세요. Bestshop입니다! Best"
}
```

`setting` 적용한 `nGram 애널라이저`를 테스트하였습니다. **text 값에 적용했을 때 정상적으로 token이 나누어지는 걸 확인할 수 있습니다.**

## Mappings

> Settings에서 Index가 사용할 수 있는 analyzer를 정의해주었을 뿐, 아직 Data 역색인 과정에서 적용하지는 않았습니다. 사용할 수 있는 도구를 등록했으니, Mappings에서 사용해보도록 하겠습니다.
> 

Elasticsearch를 활용하며 가장 손이 많이 가고 중요한 작업이 Mapping 설정입니다. 

Elasticsearch는 Dynamic Mapping을 지원하기 때문에, **미리 정의하지 않아도 Index를 추가하면 자동으로 Mapping이 정의**됩니다. 인덱스 설정없이 `books`라는 Index에 다음 doc를 입력하면 아래와 같이 Mapping이 정의되는 것을 확인할 수 있습니다.

![https://media.vlpt.us/images/hkja0111/post/4b13e149-3d8a-4d41-8296-62e8cb719639/book.png](https://media.vlpt.us/images/hkja0111/post/4b13e149-3d8a-4d41-8296-62e8cb719639/book.png)

![https://media.vlpt.us/images/hkja0111/post/56a0a5d3-0d91-488a-9ea9-71f3fc1700e1/bookmap.png](https://media.vlpt.us/images/hkja0111/post/56a0a5d3-0d91-488a-9ea9-71f3fc1700e1/bookmap.png)

Index Mapping의 Field는 Property 항목 아래 지정됩니다. 위 예시를 보면 입력된 `doc` 데이터 형식에 맞게 `title`은 `text`와 `keyword`, `page`는 `long` Type으로 자동 지정되는 것을 확인할 수 있습니다.

이미 만들어진 mapping에 필드를 추가하는 것은 가능하지만, **필드를 삭제하거나 변경하는 것은 불가능**합니다. 따라서 필드 변경이 필요한 경우 인덱스를 새로 정의하고 재색인해주어야 합니다.

### Multi Field

Elasticsearch Document는 하나의 필드값만 존재하지만, 이 필드값을 **여러 개의 Field로 지정하여 색인**할 수 있습니다. 위 예시에서 `title`을 `text`와 `keyword` 두 개의 type으로 지정한 것이 바로 이런 경우입니다.

`text` 타입은 입력된 문자열을 term 단위로 쪼개 역색인 구조를 만들어주기 때문에 보통 Full-Text Search에 사용할 문자열 필드를 `text`로 지정합니다. 반면 `keyword` 타입은 입력된 문자열 자체를 하나의 token으로 저장합니다.

> text Type에는 우리가 settings에서 정의한 Analyzer를 적용하여 어떻게 색인할 것인지 정의할 수 있습니다! Multi Field를 사용해 하나의 field에 서로 다른 analyzer를 적용할 수도 있습니다.
> 

Mappings에서 적용할 수 있는 filed type은 `text`, `keyword`, `long` 외에도 수 많은 종류가 있습니다. 이러한 다양한 필드 타입은 공식 문서에서 확인할 수 있습니다.

***nGram 애널라이저 mappings 등록하겠습니다.***

class 폴더 안에 `29-03-logstash-polling-mysql-with-time` 에서 서버를 docker로 실행시켜주세요. 

***실습은 elasticsearc 와 logstash가 실행되었다는 가정하에 진행하겠습니다.***

***Postman을 사용해 실습을 진행할 것이기 때문에 실행해주세요.***

![스크린샷 2022-03-07 오후 12.31.24.png](BE%20Day30%20Inverted%20Index%207e777bea53e8491c85d9fce9a4ae7506/%E1%84%89%E1%85%B3%E1%84%8F%E1%85%B3%E1%84%85%E1%85%B5%E1%86%AB%E1%84%89%E1%85%A3%E1%86%BA_2022-03-07_%E1%84%8B%E1%85%A9%E1%84%92%E1%85%AE_12.31.24.png)

```
PUT http://localhost:9200/myproduct2/_mappings
{
  "properties": {
    "name": {
      "type": "text"
    },
    "description": {
      "type": "text",
      "analyzer": "my_ngram_analyzer"
    },
    "price": {
      "type": "long"
    }
  }
}
```

`nGram 애널라이저` 를 mappings에 등록해주었습니다.

![스크린샷 2022-03-07 오후 12.32.47.png](BE%20Day30%20Inverted%20Index%207e777bea53e8491c85d9fce9a4ae7506/%E1%84%89%E1%85%B3%E1%84%8F%E1%85%B3%E1%84%85%E1%85%B5%E1%86%AB%E1%84%89%E1%85%A3%E1%86%BA_2022-03-07_%E1%84%8B%E1%85%A9%E1%84%92%E1%85%AE_12.32.47.png)

```
GET http://localhost:9200/myproduct2/_mappings
```

`_mappings`조회하여 nGram 토크나이저 등록여부 확안했습니다. 정상적으로 등록되었습니다.

![스크린샷 2022-03-07 오후 12.34.36.png](BE%20Day30%20Inverted%20Index%207e777bea53e8491c85d9fce9a4ae7506/%E1%84%89%E1%85%B3%E1%84%8F%E1%85%B3%E1%84%85%E1%85%B5%E1%86%AB%E1%84%89%E1%85%A3%E1%86%BA_2022-03-07_%E1%84%8B%E1%85%A9%E1%84%92%E1%85%AE_12.34.36.png)

```
POST http://localhost:9200/myproduct2/_doc/1
{
  "name": "최신마우스",
  "description": "안녕하세요. Bestshop입니다! 국내 최고 Best 상품만 판매합니다!",
  "price": 10000
}
```

상품 검색을 진행하기 전에 검색할 상품을 먼저 등록하겠습니다.

![스크린샷 2022-03-07 오후 12.36.46.png](BE%20Day30%20Inverted%20Index%207e777bea53e8491c85d9fce9a4ae7506/%E1%84%89%E1%85%B3%E1%84%8F%E1%85%B3%E1%84%85%E1%85%B5%E1%86%AB%E1%84%89%E1%85%A3%E1%86%BA_2022-03-07_%E1%84%8B%E1%85%A9%E1%84%92%E1%85%AE_12.36.46.png)

![스크린샷 2022-03-07 오후 12.37.11.png](BE%20Day30%20Inverted%20Index%207e777bea53e8491c85d9fce9a4ae7506/%E1%84%89%E1%85%B3%E1%84%8F%E1%85%B3%E1%84%85%E1%85%B5%E1%86%AB%E1%84%89%E1%85%A3%E1%86%BA_2022-03-07_%E1%84%8B%E1%85%A9%E1%84%92%E1%85%AE_12.37.11.png)

```
POST http://localhost:9200/myproduct2/_search
{
  "query": {
    "match": {
      "description": "Bestshop"
    }
  }
}

POST http://localhost:9200/myproduct2/_search
{
  "query": {
    "match": {
      "description": "Best"
    }
  }
}
```

**다음과 같이 성공적으로 검색이 가능합니다.**

---

## **Prefix Query**

class 폴더 안에 `29-03-logstash-polling-mysql-with-time` 에서 서버를 docker로 실행시켜주세요. 

***실습은 elasticsearc 와 logstash가 실행되었다는 가정하에 진행하겠습니다.***

***Postman을 사용해 실습을 진행할 것이기 때문에 실행해주세요.***

먼저 Elasticsearch 역인덱스 생성해보겠습니다.  역인덱스를 진행할때는 POSTMAN을 사용하겠습니다. `POSTMAN`을 실행해주세요.

![스크린샷 2022-03-05 오후 2.54.37.png](BE%20Day30%20Inverted%20Index%207e777bea53e8491c85d9fce9a4ae7506/%E1%84%89%E1%85%B3%E1%84%8F%E1%85%B3%E1%84%85%E1%85%B5%E1%86%AB%E1%84%89%E1%85%A3%E1%86%BA_2022-03-05_%E1%84%8B%E1%85%A9%E1%84%92%E1%85%AE_2.54.37.png)

***데이터 입력을 할 때는 PUT 메서드를 사용하는데 Inverted Index Mapping을 진행할 때도 PUT 메서드를 사용합니다.***

**word에 2가지 속성으로 색인을 하였습니다**

**`text`** type은 형태소 분석를 통해서 색인 키를 가지게 됩니다. 따로 설정이 없으면 Standard Analyzer로 색인되는데 기본적으로 **`불용어, lowercase, whitespace`**로 색인 됩니다. 

예를들어 **스팀게임 추천 :** **`스팀게임`** **`추천`** 두개의 단어로 키가 잡힙니다. 

***호출로 색인 키를 확인 할 수 있습니다.***

![스크린샷 2022-03-05 오후 2.58.53.png](BE%20Day30%20Inverted%20Index%207e777bea53e8491c85d9fce9a4ae7506/%E1%84%89%E1%85%B3%E1%84%8F%E1%85%B3%E1%84%85%E1%85%B5%E1%86%AB%E1%84%89%E1%85%A3%E1%86%BA_2022-03-05_%E1%84%8B%E1%85%A9%E1%84%92%E1%85%AE_2.58.53.png)

**`keyword`** type은 텍스트 자체를 키로 색인을 합니다.

**스팀게임 추천 :** **`스팀게임 추천`**이라는 문장으로 키가 잡힙니다.

**그전에 예제의 사용할 데이터를 생성하겠습니다. POSTMAN을 실행해주세요.**

![스크린샷 2022-03-06 오후 9.23.18.png](BE%20Day30%20Inverted%20Index%207e777bea53e8491c85d9fce9a4ae7506/%E1%84%89%E1%85%B3%E1%84%8F%E1%85%B3%E1%84%85%E1%85%B5%E1%86%AB%E1%84%89%E1%85%A3%E1%86%BA_2022-03-06_%E1%84%8B%E1%85%A9%E1%84%92%E1%85%AE_9.23.18.png)

![스크린샷 2022-03-06 오후 9.23.44.png](BE%20Day30%20Inverted%20Index%207e777bea53e8491c85d9fce9a4ae7506/%E1%84%89%E1%85%B3%E1%84%8F%E1%85%B3%E1%84%85%E1%85%B5%E1%86%AB%E1%84%89%E1%85%A3%E1%86%BA_2022-03-06_%E1%84%8B%E1%85%A9%E1%84%92%E1%85%AE_9.23.44.png)

`_bulk`를 사용해서 다수의 데이터를 생성했습니다.

***이제 본론으로 들어가 `Prefix Query`에 대해서 알아보겠습니다.***

**`Prefix Query`**는 Elastic에서 제공하는 앞글자 일치 검색기능 입니다.

 쿼리를 통해서 **`text`**와**`keyword`** type들에 대해 어떻게 검색이 다르게 되는지 살펴 보겠습니다.

**`*Prefix Query` 는 text와 keyword에 따라서 다르게 검색되는데 번갈아 가면서 어떻게 다르게 검색되는지 살펴보겠습니다.***

형태소 분석이된 **`Text Type`**에 대한 검색입니다.

예를 들어 **`스팀게임 추천`**이라는 문장은 **`스팀게임`**과 **`추천`** 이라는 2개의 키워드를 통해 검색됩니다.

`Prefix쿼리`로 먼저 앞글자 단어 일치를 확인해보겠습니다.

![스크린샷 2022-03-06 오후 9.27.54.png](BE%20Day30%20Inverted%20Index%207e777bea53e8491c85d9fce9a4ae7506/%E1%84%89%E1%85%B3%E1%84%8F%E1%85%B3%E1%84%85%E1%85%B5%E1%86%AB%E1%84%89%E1%85%A3%E1%86%BA_2022-03-06_%E1%84%8B%E1%85%A9%E1%84%92%E1%85%AE_9.27.54.png)

![https://renuevo.github.io/static/86783b78d8a731062ae5c2c491c7049f/ad08f/search-prefix-text.png](https://renuevo.github.io/static/86783b78d8a731062ae5c2c491c7049f/ad08f/search-prefix-text.png)

정상적으로 모든 `스팀게임`의 키워드를 기준 앞글자가 일치하는 모든 결과가 검색된걸 확인할 수 있습니다. 

다음은 **`Keyword Type`**에대해 Prefix쿼리로 검색해보겠습니다.

![스크린샷 2022-03-06 오후 9.29.11.png](BE%20Day30%20Inverted%20Index%207e777bea53e8491c85d9fce9a4ae7506/%E1%84%89%E1%85%B3%E1%84%8F%E1%85%B3%E1%84%85%E1%85%B5%E1%86%AB%E1%84%89%E1%85%A3%E1%86%BA_2022-03-06_%E1%84%8B%E1%85%A9%E1%84%92%E1%85%AE_9.29.11.png)

![https://renuevo.github.io/static/86783b78d8a731062ae5c2c491c7049f/ad08f/search-prefix-keyword.png](https://renuevo.github.io/static/86783b78d8a731062ae5c2c491c7049f/ad08f/search-prefix-keyword.png)

Text Type과 같이 모든 단어가 검색된걸 확인할 수 있습니다.

둘의 검색을 비교해 보면 다음과 같습니다.

![https://renuevo.github.io/static/c009d0460c0bf063d7e2def06c54b256/36727/elastic-search-index.png](https://renuevo.github.io/static/c009d0460c0bf063d7e2def06c54b256/36727/elastic-search-index.png)

둘 모두 같은 결과를 내놓았습니다. 만약 Text Type에 형태소에서 **`스팀게임`**이라는 단어를 **`Index Key`**로 잡지 않았다면 전혀 다른 결과가 나오게 됩니다.

다음으로 **`Text Type`**에 **`추천`**으로 검색해 보겠습니다.

![스크린샷 2022-03-06 오후 9.37.28.png](BE%20Day30%20Inverted%20Index%207e777bea53e8491c85d9fce9a4ae7506/%E1%84%89%E1%85%B3%E1%84%8F%E1%85%B3%E1%84%85%E1%85%B5%E1%86%AB%E1%84%89%E1%85%A3%E1%86%BA_2022-03-06_%E1%84%8B%E1%85%A9%E1%84%92%E1%85%AE_9.37.28.png)

![https://renuevo.github.io/static/5423fa975b866c8462f7ee1ede430215/aa4a2/search-prefix-text2.png](https://renuevo.github.io/static/5423fa975b866c8462f7ee1ede430215/aa4a2/search-prefix-text2.png)

예상한것과 같이 추천이 뒤에 포함된 결과들이 검색된걸 확인할 수 있습니다.

![추천.png](BE%20Day30%20Inverted%20Index%207e777bea53e8491c85d9fce9a4ae7506/%E1%84%8E%E1%85%AE%E1%84%8E%E1%85%A5%E1%86%AB.png)

다음과 같이 뒤에 단어까지 확장된 검색이 필요하다면 Text Type의 색인된 검색결과를 입력하는게 효율적입니다.

다음으로 **`Keyword Type`**에 **`추천`** 키워드로 검색해 보겠습니다

![스크린샷 2022-03-06 오후 9.40.28.png](BE%20Day30%20Inverted%20Index%207e777bea53e8491c85d9fce9a4ae7506/%E1%84%89%E1%85%B3%E1%84%8F%E1%85%B3%E1%84%85%E1%85%B5%E1%86%AB%E1%84%89%E1%85%A3%E1%86%BA_2022-03-06_%E1%84%8B%E1%85%A9%E1%84%92%E1%85%AE_9.40.28.png)

![https://renuevo.github.io/static/124f7b7122e57fc9095fea6badfc50d8/8928d/search-prefix-keyword2.png](https://renuevo.github.io/static/124f7b7122e57fc9095fea6badfc50d8/8928d/search-prefix-keyword2.png)

추천과 관련된 word가 3개가 있는데 검색 결과는 **0건**이 나왔습니다.

![https://renuevo.github.io/static/17a51ebc717ffeb8bc102da4c48b93e0/36727/elastic-search-index2.png](https://renuevo.github.io/static/17a51ebc717ffeb8bc102da4c48b93e0/36727/elastic-search-index2.png)

Text Type과 달리 들어오는 키워드 자체로 색인되기 때문에 추천이라는 글자가 포함되더라도 검색되지 않습니다.

**그럼 무조건 Text Type의 검색일 사용하면 되는 걸까요?**Text Type으로 설정시 **치명적인 단점**을 가지고 있습니다.

다음과 같이 각각의 키워드는 있으나 결합된 키워드로 검색시 결과가 나오지 않을 수 있습니다.

![스크린샷 2022-03-06 오후 9.42.02.png](BE%20Day30%20Inverted%20Index%207e777bea53e8491c85d9fce9a4ae7506/%E1%84%89%E1%85%B3%E1%84%8F%E1%85%B3%E1%84%85%E1%85%B5%E1%86%AB%E1%84%89%E1%85%A3%E1%86%BA_2022-03-06_%E1%84%8B%E1%85%A9%E1%84%92%E1%85%AE_9.42.02.png)

![https://renuevo.github.io/static/867001024aabe2448998c7c9263cf186/6e872/search-prefix-text3.png](https://renuevo.github.io/static/867001024aabe2448998c7c9263cf186/6e872/search-prefix-text3.png)

자동완성처럼 한글자씩 치면서 아래 계속해서 list를 펼쳐줘야 하는데, 이는 치명적인 단점으로 다가오게 됩니다.

반면 Keyword Type의 경우 색인된 결과와 앞글자를 일치 시켜주면 검색이 됩니다.

![스크린샷 2022-03-06 오후 9.42.45.png](BE%20Day30%20Inverted%20Index%207e777bea53e8491c85d9fce9a4ae7506/%E1%84%89%E1%85%B3%E1%84%8F%E1%85%B3%E1%84%85%E1%85%B5%E1%86%AB%E1%84%89%E1%85%A3%E1%86%BA_2022-03-06_%E1%84%8B%E1%85%A9%E1%84%92%E1%85%AE_9.42.45.png)

![https://renuevo.github.io/static/b8fd34642ace5bc20a8e873dad1582ac/54ef9/search-prefix-keyword3.png](https://renuevo.github.io/static/b8fd34642ace5bc20a8e873dad1582ac/54ef9/search-prefix-keyword3.png)

이 때문에 높은 **`recall(재현율)`**을 위해서 두가지 타입을 **`OR`**로 사용해서 서비스 할 수도 있습니다.