# BE Day28 Redis / Search Process

---

  **목차**

  

---

# Trigger

트리거(Trigger)란 영어로 방아쇠라는 뜻인데, 방아쇠를 당기면 그로 인해 총기 내부에서 알아서 일련의 작업을 실행하고 총알이 날아갑니다. 이처럼 데이터베이스에서도 **트리거(Trigger)는 특정 테이블에 INSERT, DELETE, UPDATE 같은 DML 문이 수행되었을 때**, **데이터베이스에서 자동으로 동작하도록 작성된 프로그램입니다.** 즉 사용자가 직접 호출하는 것이 아니라, 데이터베이스에서 **자동적으로 호출하는 것이 가장 큰 특징**입니다

## Why Trigger?

어떤 쇼핑몰에 하루에 수만 건의 주문이 들어옵니다. 주문 데이터는 주문 일자, 주문 상품, 수량, 가격이 있으며, 수천 명의 임직원이 일자별, 상품별 총 판매수량과 총 판매 가격으로 구성된 주문 실적을 실시간으로 온라인상에 조회를 했을 때, 한 사람의 임직원이 조회할 때마다 수만 건의 데이터를 읽고 계산해야 합니다. 만약 임직원이 수만 명이고, 데이터가 수백만 건이라면, 또 거의 동시다발적으로 실시간 조회가 요청된다면 시스템 퍼포먼스가 떨어질 것입니다.

따라서 트리거(Trigger)를 사용하여 주문한 건이 입력될 때마다, 일자별 상품별로 판매수량과 판매금액을 집계하여 집계 자료를 보관하면 미리 계산된 일자별 판매 집계 테이블을 조회하게 하여 실시간 조회 할 수 있습니다.

# **BigQuery**

BigQuery는 이름에서 알 수 있듯이 엄청나게 큰 데이터에 대한 SQL 쿼리를 빠르게 수행해주는 platform의 서비스 중 하나입니다. 무려 페타바이트에 달하는 데이터도 빠르게 분석할 수 있다고 합니다. 자체 클러스터를 구성하고 운영하는 수고로움은 덜고, 데이터 분석에만 집중할 수 있는 툴로 많은 기업들에서 데이터 웨어하우스로 도입하고 있습니다. 그렇다면 BigQuery를 사용해보면서 어떻게 동작하는지 알아보겠습니다.

## 서비스 계정 생성

빅쿼리를 사용하기 위한 서비스 계정을 먼저 만들겠습니다.

GCP 메뉴에서 **IAM 및 관리자  > 서비스 계정**을 클릭하세요.

![Untitled](BE%20Day28%20Redis%20Search%20Process%2067e462d188484bb9bafb7089bc1f5bb4/Untitled.png)

`서비스 계정 만들기`를 클릭합니다. 

![Untitled](BE%20Day28%20Redis%20Search%20Process%2067e462d188484bb9bafb7089bc1f5bb4/Untitled%201.png)

이름을 적고, 만들고 계속하기를 누릅니다.

![Untitled](BE%20Day28%20Redis%20Search%20Process%2067e462d188484bb9bafb7089bc1f5bb4/Untitled%202.png)

빅쿼리 관리자로 역할을 부여합니다. 

![Untitled](BE%20Day28%20Redis%20Search%20Process%2067e462d188484bb9bafb7089bc1f5bb4/Untitled%203.png)

`계속`을 누르고 `완료`를 눌러 계정을 만들어줍니다.

아래와 같이 생성되었다면 `키 관리`에 들어갑니다. 

![Untitled](BE%20Day28%20Redis%20Search%20Process%2067e462d188484bb9bafb7089bc1f5bb4/Untitled%204.png)

키 관리 페이지에 들어왔다면  `키 추가`를 누르고, `새 키 만들기`를 누릅니다. 

![Untitled](BE%20Day28%20Redis%20Search%20Process%2067e462d188484bb9bafb7089bc1f5bb4/Untitled%205.png)

JSON 형식으로 비공개 키를 만들어 저장해줍니다. 

![Untitled](BE%20Day28%20Redis%20Search%20Process%2067e462d188484bb9bafb7089bc1f5bb4/Untitled%206.png)

이 JSON 파일은 이름을 `gcp-biqquery.json` 파일로 이름을 바꿔, 프로젝트 폴더에 넣어줍니다. 

![Untitled](BE%20Day28%20Redis%20Search%20Process%2067e462d188484bb9bafb7089bc1f5bb4/Untitled%207.png)

## Setting Up **BigQuery**

1. GCP 상단 검색창에 BigQuery를 검색해서 들어가 주세요.

![스크린샷 2022-03-01 오후 2.38.18.png](BE%20Day28%20Redis%20Search%20Process%2067e462d188484bb9bafb7089bc1f5bb4/%E1%84%89%E1%85%B3%E1%84%8F%E1%85%B3%E1%84%85%E1%85%B5%E1%86%AB%E1%84%89%E1%85%A3%E1%86%BA_2022-03-01_%E1%84%8B%E1%85%A9%E1%84%92%E1%85%AE_2.38.18.png)

1. 데이터 세트를 만들기를 눌러서 만들어주세요.
    
    ![스크린샷 2022-03-01 오후 2.39.43.png](BE%20Day28%20Redis%20Search%20Process%2067e462d188484bb9bafb7089bc1f5bb4/%E1%84%89%E1%85%B3%E1%84%8F%E1%85%B3%E1%84%85%E1%85%B5%E1%86%AB%E1%84%89%E1%85%A3%E1%86%BA_2022-03-01_%E1%84%8B%E1%85%A9%E1%84%92%E1%85%AE_2.39.43.png)
    

![스크린샷 2022-03-01 오후 2.39.36.png](BE%20Day28%20Redis%20Search%20Process%2067e462d188484bb9bafb7089bc1f5bb4/%E1%84%89%E1%85%B3%E1%84%8F%E1%85%B3%E1%84%85%E1%85%B5%E1%86%AB%E1%84%89%E1%85%A3%E1%86%BA_2022-03-01_%E1%84%8B%E1%85%A9%E1%84%92%E1%85%AE_2.39.36.png)

1. 이제 이전에 만들어 놓은 데이터 셋에 테이블을 만들어주세요.

![스크린샷 2022-03-01 오후 2.39.58.png](BE%20Day28%20Redis%20Search%20Process%2067e462d188484bb9bafb7089bc1f5bb4/%E1%84%89%E1%85%B3%E1%84%8F%E1%85%B3%E1%84%85%E1%85%B5%E1%86%AB%E1%84%89%E1%85%A3%E1%86%BA_2022-03-01_%E1%84%8B%E1%85%A9%E1%84%92%E1%85%AE_2.39.58.png)

![스크린샷 2022-03-01 오후 2.40.27.png](BE%20Day28%20Redis%20Search%20Process%2067e462d188484bb9bafb7089bc1f5bb4/%E1%84%89%E1%85%B3%E1%84%8F%E1%85%B3%E1%84%85%E1%85%B5%E1%86%AB%E1%84%89%E1%85%A3%E1%86%BA_2022-03-01_%E1%84%8B%E1%85%A9%E1%84%92%E1%85%AE_2.40.27.png)

1. 스키마를 수정해서 다음과 같이 설정해 주세요. 데이터 타입을 잘 지정해 주세요.
    
    ![스크린샷 2022-03-01 오후 2.41.12.png](BE%20Day28%20Redis%20Search%20Process%2067e462d188484bb9bafb7089bc1f5bb4/%E1%84%89%E1%85%B3%E1%84%8F%E1%85%B3%E1%84%85%E1%85%B5%E1%86%AB%E1%84%89%E1%85%A3%E1%86%BA_2022-03-01_%E1%84%8B%E1%85%A9%E1%84%92%E1%85%AE_2.41.12.png)
    
    ![스크린샷 2022-03-01 오후 2.42.14.png](BE%20Day28%20Redis%20Search%20Process%2067e462d188484bb9bafb7089bc1f5bb4/%E1%84%89%E1%85%B3%E1%84%8F%E1%85%B3%E1%84%85%E1%85%B5%E1%86%AB%E1%84%89%E1%85%A3%E1%86%BA_2022-03-01_%E1%84%8B%E1%85%A9%E1%84%92%E1%85%AE_2.42.14.png)
    

이제 코드를 작성해서 BigQuery를 사용해 보겠습니다.

class 폴더 안에 28-01-trigger 폴더를 만들어 주세요.

28-01-trigger 폴더 안에 26-05-file-upload-thumbnail 폴더 안에 있는 모든 파일을 복사 붙여넣기 해주세요.

먼저 필요한 모듈을 설치하겠습니다.

`$yarn add @google-cloud/bigquery`

`./src/apis/product/entities` 에  `product.subscriber.ts`를 추가해주세요.

```tsx
import { BigQuery } from '@google-cloud/bigquery';
import {
  Connection,
  EntitySubscriberInterface,
  EventSubscriber,
  InsertEvent,
} from 'typeorm';
import { Product } from './product.entity';

@EventSubscriber()
export class ProductSubscriber implements EntitySubscriberInterface<Product> {
  constructor(connection: Connection) {
    connection.subscribers.push(this);
  }

  listenTo() {
    return Product;
  }

  afterInsert(event: InsertEvent<Product>) {
    const bigQuery = new BigQuery({
      keyFilename: process.env.BIGQUERY_KEY_FILENAME,
      projectId: process.env.BIGQUERY_PROJECT_ID,
    });

    bigQuery
      .dataset('codecamp_project')
      .table('codecamp -productlog')
      .insert([
        {
          id: event.entity.id,
          name: event.entity.name,
          description: event.entity.description,
          price: event.entity.price,
          isSoldout: event.entity.isSoldout,
        },
      ]);
  }
}
```

typeorm이 제공하는 connection을 이용해 Product와 연결해 주었습니다. 

여기서 **this**가 가리키는 것은 `ProductSubscriber` **클래스**입니다.

afterInsert 함수는 데이터가 DB에 추가되고 나서 수행할 로직이 작성되어 있는데 앞서 다운로드 받았던 `gcp-biqquery.json` 파일과 프로젝트 아이디가 필요합니다.

이제 BigQuery에 생성할 데이터 베이스와 테이블과 스키마 설정할 값들을 지정해 주세요.

![provider.png](BE%20Day28%20Redis%20Search%20Process%2067e462d188484bb9bafb7089bc1f5bb4/provider.png)

product.module.ts를 실행해서 ProductSubscriber를 주입해 주세요.

![스크린샷 2022-02-09 오후 5.11.38.png](BE%20Day26%20ACID%20Transaction%20&%20Isolation%20c63a3f8c82e04669a3ee8dc2f6e4fd44/%E1%84%89%E1%85%B3%E1%84%8F%E1%85%B3%E1%84%85%E1%85%B5%E1%86%AB%E1%84%89%E1%85%A3%E1%86%BA_2022-02-09_%E1%84%8B%E1%85%A9%E1%84%92%E1%85%AE_5.11.38.png)

`yarn start:dev`를 입력해 서버를 실행해주세요.

![스크린샷 2022-03-01 오후 2.43.01.png](BE%20Day28%20Redis%20Search%20Process%2067e462d188484bb9bafb7089bc1f5bb4/%E1%84%89%E1%85%B3%E1%84%8F%E1%85%B3%E1%84%85%E1%85%B5%E1%86%AB%E1%84%89%E1%85%A3%E1%86%BA_2022-03-01_%E1%84%8B%E1%85%A9%E1%84%92%E1%85%AE_2.43.01.png)

localhost:3000/graphql에 브라우저를 실행해서 상품 데이터를 만들어주세요.

![스크린샷 2022-03-01 오후 2.58.49.png](BE%20Day28%20Redis%20Search%20Process%2067e462d188484bb9bafb7089bc1f5bb4/%E1%84%89%E1%85%B3%E1%84%8F%E1%85%B3%E1%84%85%E1%85%B5%E1%86%AB%E1%84%89%E1%85%A3%E1%86%BA_2022-03-01_%E1%84%8B%E1%85%A9%E1%84%92%E1%85%AE_2.58.49.png)

![스크린샷 2022-03-01 오후 2.44.08.png](BE%20Day28%20Redis%20Search%20Process%2067e462d188484bb9bafb7089bc1f5bb4/%E1%84%89%E1%85%B3%E1%84%8F%E1%85%B3%E1%84%85%E1%85%B5%E1%86%AB%E1%84%89%E1%85%A3%E1%86%BA_2022-03-01_%E1%84%8B%E1%85%A9%E1%84%92%E1%85%AE_2.44.08.png)

BigQuery에 SQL 쿼리 비문으로 방금 전 생성한 데이터가 잘 들어갔는지 확인해 볼 수 있습니다. 조회해 보세요.

# **PROCEDURE**

특정 작업을 수행 하는, 이름이 있는 PL/SQL BLOCK 입니다. 매개 변수를 받을 수 있고, 반복적으로 사용 할 수 있는 BLOCK 입니다. 보통 연속 실행 또는 구현이 복잡한 트랜잭션을 수행하는 PL/SQL BLOCK을 데이터베이스에 저장하기 위해 생성 합니다. 즉 일련의 쿼리를 마치 하나의 함수처럼 실행하기 위한 쿼리의 집합입니다.

우리는 Procedure를 사용해서 많은 양의 DUMMY DATA를 직접 생성해 보겠습니다.

먼저 dbeaver를 실행해 SCRIPT를 열어주세요.

![스크린샷 2022-02-28 오후 4.36.10.png](BE%20Day28%20Redis%20Search%20Process%2067e462d188484bb9bafb7089bc1f5bb4/%E1%84%89%E1%85%B3%E1%84%8F%E1%85%B3%E1%84%85%E1%85%B5%E1%86%AB%E1%84%89%E1%85%A3%E1%86%BA_2022-02-28_%E1%84%8B%E1%85%A9%E1%84%92%E1%85%AE_4.36.10.png)

다음 쿼리는 기존에 만들어져 있다면 삭제하고 다시 만듭니다. 다음과 같이 작성해서 쿼리를 실행해 주세요.

![스크린샷 2022-02-28 오후 4.37.10.png](BE%20Day28%20Redis%20Search%20Process%2067e462d188484bb9bafb7089bc1f5bb4/%E1%84%89%E1%85%B3%E1%84%8F%E1%85%B3%E1%84%85%E1%85%B5%E1%86%AB%E1%84%89%E1%85%A3%E1%86%BA_2022-02-28_%E1%84%8B%E1%85%A9%E1%84%92%E1%85%AE_4.37.10.png)

다음 쿼리는 `procedure`를 생성합니다. 

즉 1부터 10000000까지 루프가 돌아서 방대한 양의 데이터를 생성합니다. 

데이터를 생성하는데 10분 이상 걸립니다. 기다려주세요.

![Untitled](BE%20Day28%20Redis%20Search%20Process%2067e462d188484bb9bafb7089bc1f5bb4/Untitled%208.png)

`procedure` 를 확인해봅니다.

![스크린샷 2022-02-28 오후 4.47.16.png](BE%20Day28%20Redis%20Search%20Process%2067e462d188484bb9bafb7089bc1f5bb4/%E1%84%89%E1%85%B3%E1%84%8F%E1%85%B3%E1%84%85%E1%85%B5%E1%86%AB%E1%84%89%E1%85%A3%E1%86%BA_2022-02-28_%E1%84%8B%E1%85%A9%E1%84%92%E1%85%AE_4.47.16.png)

![스크린샷 2022-02-28 오후 2.58.01.png](BE%20Day28%20Redis%20Search%20Process%2067e462d188484bb9bafb7089bc1f5bb4/%E1%84%89%E1%85%B3%E1%84%8F%E1%85%B3%E1%84%85%E1%85%B5%E1%86%AB%E1%84%89%E1%85%A3%E1%86%BA_2022-02-28_%E1%84%8B%E1%85%A9%E1%84%92%E1%85%AE_2.58.01.png)

![스크린샷 2022-02-28 오후 2.58.22.png](BE%20Day28%20Redis%20Search%20Process%2067e462d188484bb9bafb7089bc1f5bb4/%E1%84%89%E1%85%B3%E1%84%8F%E1%85%B3%E1%84%85%E1%85%B5%E1%86%AB%E1%84%89%E1%85%A3%E1%86%BA_2022-02-28_%E1%84%8B%E1%85%A9%E1%84%92%E1%85%AE_2.58.22.png)

데이터를 조회해보면 데이터가 많이 생겨난 걸 확인할 수 있습니다.

---

# Understanding Index Search

MySQL에서 인덱스는 테이블을 빨리 조회하기 위해 테이블 데이터에 포인터를 주는 검색 방법입니다. 인덱스는 책의 목차와도 같아서 특정 컬럼에 인덱스를 지정해주면 테이블 조회 시 인덱스를 이용해 빠르게 조회할 수 있게 됩니다. 

그렇다고 인덱스를 도배하면, 금방 찾을 수 있는 일을 인덱스를 사용해 찾느라 더 느려지게 됩니다. 

컬럼 값에 NULL이 많이 들어가는 경우에도 인덱스를 사용하면 오히려 역효과가 납니다.

대체적으로 INDEX는 테이블에 데이터 양이 엄청나게 많을 경우 주로 사용하는데 

지나치게 많은 INDEX를 지정하거나 NULL이 많은 컬럼, 삽입 수정이 자주 이루어지는 테이블에는 INDEX 사용을 **지양**하는 것이 좋습니다.

실습을 위해 DBeaver를 실행해서 SQL script를 실행해주세요.

![스크린샷 2022-02-28 오후 4.36.10.png](BE%20Day28%20Redis%20Search%20Process%2067e462d188484bb9bafb7089bc1f5bb4/%E1%84%89%E1%85%B3%E1%84%8F%E1%85%B3%E1%84%85%E1%85%B5%E1%86%AB%E1%84%89%E1%85%A3%E1%86%BA_2022-02-28_%E1%84%8B%E1%85%A9%E1%84%92%E1%85%AE_4.36.10.png)

먼저 데이터 전체 갯수를 확인해보겟습니다. 이전에 Procedure로 생성해 놓은 데이터의 개수가 조회됩니다.

![스크린샷 2022-03-01 오후 3.20.41.png](BE%20Day28%20Redis%20Search%20Process%2067e462d188484bb9bafb7089bc1f5bb4/%E1%84%89%E1%85%B3%E1%84%8F%E1%85%B3%E1%84%85%E1%85%B5%E1%86%AB%E1%84%89%E1%85%A3%E1%86%BA_2022-03-01_%E1%84%8B%E1%85%A9%E1%84%92%E1%85%AE_3.20.41.png)

쿼리 검색 속도 비교하기 위해서 쿼리문을 작성해서 데이터를 조회해보겠습니다. 데이터가 조회되지 않는데 2.765s가 걸립니다.

![스크린샷 2022-03-01 오후 3.25.24.png](BE%20Day28%20Redis%20Search%20Process%2067e462d188484bb9bafb7089bc1f5bb4/%E1%84%89%E1%85%B3%E1%84%8F%E1%85%B3%E1%84%85%E1%85%B5%E1%86%AB%E1%84%89%E1%85%A3%E1%86%BA_2022-03-01_%E1%84%8B%E1%85%A9%E1%84%92%E1%85%AE_3.25.24.png)

![스크린샷 2022-03-01 오후 3.26.11.png](BE%20Day28%20Redis%20Search%20Process%2067e462d188484bb9bafb7089bc1f5bb4/%E1%84%89%E1%85%B3%E1%84%8F%E1%85%B3%E1%84%85%E1%85%B5%E1%86%AB%E1%84%89%E1%85%A3%E1%86%BA_2022-03-01_%E1%84%8B%E1%85%A9%E1%84%92%E1%85%AE_3.26.11.png)

옵티마이저와 실행계획을 확인하기 위해서 다음과 같이 쿼리를 실행해 봤습니다. 

![스크린샷 2022-03-01 오후 3.28.06.png](BE%20Day28%20Redis%20Search%20Process%2067e462d188484bb9bafb7089bc1f5bb4/%E1%84%89%E1%85%B3%E1%84%8F%E1%85%B3%E1%84%85%E1%85%B5%E1%86%AB%E1%84%89%E1%85%A3%E1%86%BA_2022-03-01_%E1%84%8B%E1%85%A9%E1%84%92%E1%85%AE_3.28.06.png)

옵티마이저는 사용자가 질의한 SQL 문에 대해 최적의 실행 방법을 결정하는 역할을 수행합니다. 

이러한 최적의 실행 방법을 실행계획이라고 합니다. 

쿼리문을 실행한 결과에서 row의 개수는 900만이 넘습니다. 900만이 넘는 row를 검색해야 합니다.

이제 board의 title 칼럼을 이용해서 인덱스를 생성해 보겠습니다. 조금 시간이 걸릴 수 있습니다.

![스크린샷 2022-03-01 오후 3.29.10.png](BE%20Day28%20Redis%20Search%20Process%2067e462d188484bb9bafb7089bc1f5bb4/%E1%84%89%E1%85%B3%E1%84%8F%E1%85%B3%E1%84%85%E1%85%B5%E1%86%AB%E1%84%89%E1%85%A3%E1%86%BA_2022-03-01_%E1%84%8B%E1%85%A9%E1%84%92%E1%85%AE_3.29.10.png)

인덱스를 생성 후에 생성된 인덱스를 조회해 보겠습니다. 기본적으로 PK 값은 인덱스가 생성되어 있습니다.

![스크린샷 2022-03-01 오후 3.39.55.png](BE%20Day28%20Redis%20Search%20Process%2067e462d188484bb9bafb7089bc1f5bb4/%E1%84%89%E1%85%B3%E1%84%8F%E1%85%B3%E1%84%85%E1%85%B5%E1%86%AB%E1%84%89%E1%85%A3%E1%86%BA_2022-03-01_%E1%84%8B%E1%85%A9%E1%84%92%E1%85%AE_3.39.55.png)

인덱스 생성 후, 옵티마이저 실행 계획을 재확인했을 때 row의 수가 1개로 줄어들었습니다.

![스크린샷 2022-03-01 오후 3.30.00.png](BE%20Day28%20Redis%20Search%20Process%2067e462d188484bb9bafb7089bc1f5bb4/%E1%84%89%E1%85%B3%E1%84%8F%E1%85%B3%E1%84%85%E1%85%B5%E1%86%AB%E1%84%89%E1%85%A3%E1%86%BA_2022-03-01_%E1%84%8B%E1%85%A9%E1%84%92%E1%85%AE_3.30.00.png)

인덱싱된 컬럼으로 재쿼리 후, 성능 비교했더니 1ms으로 확연히 시간이 줄었습니다.

![스크린샷 2022-03-01 오후 3.30.26.png](BE%20Day28%20Redis%20Search%20Process%2067e462d188484bb9bafb7089bc1f5bb4/%E1%84%89%E1%85%B3%E1%84%8F%E1%85%B3%E1%84%85%E1%85%B5%E1%86%AB%E1%84%89%E1%85%A3%E1%86%BA_2022-03-01_%E1%84%8B%E1%85%A9%E1%84%92%E1%85%AE_3.30.26.png)

![스크린샷 2022-03-01 오후 3.30.30.png](BE%20Day28%20Redis%20Search%20Process%2067e462d188484bb9bafb7089bc1f5bb4/%E1%84%89%E1%85%B3%E1%84%8F%E1%85%B3%E1%84%85%E1%85%B5%E1%86%AB%E1%84%89%E1%85%A3%E1%86%BA_2022-03-01_%E1%84%8B%E1%85%A9%E1%84%92%E1%85%AE_3.30.30.png)

---

# Redis

Redis는 Memcached와 비슷한 `캐시 시스템`으로서 동일한 기능을 제공하면서 영속성, 다양한 데이터 구조와 같은 부가적인 기능을 지원하고 있습니다. 

`레디스는 모든 데이터를 메모리에 저장하고 조회`합니다. 즉, `인메모리 데이터베이스` 입니다. 

이 말만 들으면 Redis에 모든 데이터를 메모리에 저장하는 빠른 DB일 뿐이라고 생각할지도 모릅니다. 하지만 빠른 성능은 레디스의 특징 중 일부분 입니다. 

다른 인메모리 디비들과의 가장 큰 차이점은 `레디스의 다양한 자료구조` 입니다.

![https://miro.medium.com/max/700/1*tMiZs3RCrmxLGiFZgWRP6g.png](https://miro.medium.com/max/700/1*tMiZs3RCrmxLGiFZgWRP6g.png)

이렇게 다양한 자료구조를 지원하게 되면 `개발의 편의성이 좋아지고 난이도가 낮아진다`는 장점이 있습니다.

예를 들어, 어떤 데이터를 정렬 할 때, DBMS를 이용한다면 DB에 데이터를 저장하고, 저장된 데이터를 정렬하여 다시 읽어오는 과정은 디스크에 직접 접근을 해야하기 때문에 시간이 더 걸린다는 단점이 있습니다. 

하지만 이 때 `In-Memory` 데이터베이스인 `Redis`를 이용하고 레디스에서 제공하는 `Sorted-Set`이라는 자료구조를 사용하면 더 빠르고 간단하게 데이터를 정렬할 수 있습니다.

![https://miro.medium.com/max/700/1*zArWVI0y5u_WVj0gktm92Q.png](https://miro.medium.com/max/700/1*zArWVI0y5u_WVj0gktm92Q.png)

## Feature of Redis

NoSQL로서 Key-Value 타입의 저장소인 `레디스(Redis, Remote Dictionary Server)`의 주요 특징은 아래와 같습니다.

- `영속성을 지원하는 인메모리 데이터 저장소`
- `읽기 성능 증대를 위한 서버 측 복제를 지원`
- `쓰기 성능 증대를 위한 클라이언트 측 샤딩(Sharding) 지원`
- `다양한 서비스에서 사용되며 검증된 기술`
- `문자열, 리스트, 해시, 셋, 정렬된 셋과 같은 다양한 데이터형을 지원. 메모리 저장소임에도 불구하고 많은 데이터형을 지원하므로 다양한 기능을 구현`

그래서 최종적으로 Redis를 한 문장으로 정의하면 아래와 같습니다.

**레디스는 고성능 키-값 저장소로서 문자열, 리스트, 해시, 셋, 정렬된 셋 형식의 데이터를 지원하는 NoSQL입니다.**

## ****Redis vs. Memcached****

### **공통점**

1.  **1ms 이하의 응답대기시간**

1ms 이하의 응답시간을 제공합니다. 데이터를 메모리에 저장하기 때문에, 디스크 기반의 데이터 베이스보다 빠르게 데이터를 읽을 수 있습니다.

1. **개발의 용이성**

문법적으로 사용하기 쉽고, 개발코드 양 또한 적습니다.

1.  **데이터 파티셔닝**

데이터를 여러 노드에 분산하여 저장시킬 수 있습니다. 따라서 수요가 증가할 때 더 많은 데이터를 효과적으로 처리하기 위하여 스케일아웃이 가능합니다.

1.  **다양한 프로그래밍 언어 지원**

여러 개발언어를 지원합니다. 자바, 파이썬, C, C++, C#, JavaScript, Node.Js, Ruby, Go 그리고 다른 언어들을 지원합니다.

### **Memcached만 의 특징**

`멀티스레드`를 지원하기 때문에, `멀티프로세스코어`를 사용할 수 있습니다. 따라서, 스케일업을 통하여 더욱 많은 작업처리를 할 수 있습니다.

### **Redis만 의 특징**

**1. 더욱 다양한 데이터 구조**

문자열 뿐만 아니라 `List`, `Set`, `정렬된 Set`, `Hash`, `Bit 배열`, `hyperloglogs` (매우 적은 메모리로 집합의 개수를 추정할 수 있는 방법)을 지원합니다. 프로그램에서 위의 다양한 자료구조를 사용할 수 있습니다. 예를 들어, `Sorted Set`을 활용하여 게임유저의 상위랭크 정보를 쉽게 제공할 수 있습니다.

**2. Snapshots**

레디스는 특정시점에 데이터를 디스크에 저장하여 파일 보관이 가능합니다. 또한, 장애 상황시 복구에 사용할 수 있습니다.

**3. 복제**

`Master — Salves` 구조로, 여러개의 복제본을 만들 수 있습니다. 따라서 데이터베이스 읽기를 확장할 수 있기 때문에 높은 가용성(오랜 시간동안 고장나지 않음) 클러스터를 제공합니다.

**3. 트랜젝션**

트렌젝션이란 데이터베이스 상태를 변경시키는 작업 단위를 의미하고, 원자성, 일관성, 독립성, 지속성의 특징을 가지고 있습니다. Redis는 이러한 특징을 지원합니다.

**4. Pub / Sub messaging**

Publish(발행)과 Sub(구독)방식의 메시지를 패턴 검색이 가능합니다. 따라서 높은 성능을 요구하는 채팅, 실시간 스트리밍, SNS 피드 그리고 서버상호통신에 사용할 수 있습니다.

**5. 루아 스크립트 지원**

매우 경량화된 절차스크립트 언어인 루아를 지원합니다. eval 명령어를 사용하여 루아스크립트를 실행시킬 수 있습니다. 따라서, 프로그램을 명료하게하고 성능을 높일 수 있습니다.

**6. 위치기반 데이터 타입 지원**

Redis는 실시간 위치기반데이터를 지원합니다. 따라서, 두 위치의 거리를 찾거나, 사이에 있는 요소 찾기등의 작업을 수행할 수 있습니다. 이를 활용하여 맛집, 길찾기 그리고 지도기반의 고성능 서비스를 제공할 수 있습니다.

## 실습

이번에는 fetchProducts에서 redis를 사용해 조회하는 실습을 진행해 보겠습니다.

**class** 폴더 안에 `28-04-redis` 폴더를 만들어 주세요.

28-04-redis 폴더 안에 28-01-trigger 폴더 안에 있는 모든 파일을 복사 붙여넣기 해주세요.

먼저 필요한 모듈을 설치해 보겠습니다.

`yarn add cache-manager`를 입력해 설치해 주세요.

`yarn add redis`를 입력해 설치해 주세요.

`yarn add cache-manager-redis-store` 를 입력해 설치해주세요.

redis에서 조회 생성을 사용하기 위해서 필요합니다.

이전에 만들어 놓았던 `product.resolver.ts`에 **fetchProduct**를 다음과 같이 수정해 주세요.

![ㅠㅠㅠㅠㅠ.png](BE%20Day28%20Redis%20Search%20Process%2067e462d188484bb9bafb7089bc1f5bb4/%E3%85%A0%E3%85%A0%E3%85%A0%E3%85%A0%E3%85%A0.png)

생성자 안에 typeorm에서 제공하는 `CACHE_MANAGER`를 주입했습니다. `chcaheManager`를 DI시켜주어 `redis`에 조회와 생성이 가능합니다.

이전에는 직접 `DB`에 검색을 진행했지만 이번에는 **캐시저장소인 redis를 먼저 거쳐서 조회를 합니다.** 

**만약 redis에 존재한다면 redis에 조회된 데이터를 반환하고 함수를 종료하고,** 

**만약 redis에  존재하지 않는다면 DB에서 조회해서 조회된 값을 redis에 저장합니다.**

```yaml
version: '3.3'

services:
  my_backend:
    build:
      context: .
      dockerfile: Dockerfile
    env_file:
      - ./.env
    volumes:
      - ./src:/my_backend/src
    ports:
      - 3000:3000

  my_database:
    platform: linux/x86_64
    image: mysql:latest
    environment:
      MYSQL_DATABASE: 'myproject'
      MYSQL_ROOT_PASSWORD: 'root'
    command:
      - --character-set-server=utf8mb4
      - --collation-server=utf8mb4_unicode_ci
      - --skip-character-set-client-handshake
    # cap_add:
    #   - SYS_NICE
    ports:
      - 3306:3306

  my_redis:
    image: redis:latest
    ports:
      - 6379:6379
```

**redis container**를 하나 띄우기 위해 `docker-compose.yaml` 파일을 위와 같이 수정했습니다.

```tsx
import { CacheModule, Module } from '@nestjs/common';
// import { AppController } from './app.controller';
// import { AppService } from './app.service';
import { GraphQLModule } from '@nestjs/graphql';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from './apis/auth/auth.module';
import { BoardModule } from './apis/board/board.module';
import { PointTransactionModule } from './apis/pointTransaction/pointTransaction.module';
import { ProductModule } from './apis/product/product.module';
import { ProductCategoryModule } from './apis/productCategory/productCategory.module';
import { FileModule } from './apis/file/file.module';
import { UserModule } from './apis/user/user.module';
import type { RedisClientOptions } from 'redis';
import * as redisStore from 'cache-manager-redis-store';

@Module({
  imports: [
    AuthModule,
    BoardModule,
    FileModule,
    PointTransactionModule,
    ProductModule,
    ProductCategoryModule,
    UserModule,
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'my_database',
      port: 3306,
      username: 'root',
      password: 'root',
      database: 'myproject',
      entities: [__dirname + '/apis/**/*.entity.*'],
      synchronize: true,
      logging: true,
    }),
    GraphQLModule.forRoot({
      autoSchemaFile: 'src/common/graphql/schema.gql',
      context: ({ req, res }) => ({ req, res }),
    }),
    CacheModule.register<RedisClientOptions>({
      store: redisStore,
      url: 'redis://my_redis:6379',
      isGlobal: true,
    }),
  ],
  // controllers: [AppController],
  // providers: [AppService],
})
export class AppModule {}
```

redis를 backend server와 연결해 주기 위해서 `app.module.ts`에 **CacheModule**을 장착해 주었습니다.

`docker-compose build`

`docker-compose up`

을 입력해 image를 build 하고 container를 실행시켜주세요.

![스크린샷 2022-03-01 오후 6.42.36.png](BE%20Day28%20Redis%20Search%20Process%2067e462d188484bb9bafb7089bc1f5bb4/%E1%84%89%E1%85%B3%E1%84%8F%E1%85%B3%E1%84%85%E1%85%B5%E1%86%AB%E1%84%89%E1%85%A3%E1%86%BA_2022-03-01_%E1%84%8B%E1%85%A9%E1%84%92%E1%85%AE_6.42.36.png)

DB도 정상적으로 연결되었고 `redis`도 정상적으로 실행되었습니다.

![스크린샷 2022-03-01 오후 6.43.58.png](BE%20Day28%20Redis%20Search%20Process%2067e462d188484bb9bafb7089bc1f5bb4/%E1%84%89%E1%85%B3%E1%84%8F%E1%85%B3%E1%84%85%E1%85%B5%E1%86%AB%E1%84%89%E1%85%A3%E1%86%BA_2022-03-01_%E1%84%8B%E1%85%A9%E1%84%92%E1%85%AE_6.43.58.png)

`localhost:3000/graphql`에 들어가서 상품을 먼저 만들어 주세요.

![스크린샷 2022-03-01 오후 6.44.37.png](BE%20Day28%20Redis%20Search%20Process%2067e462d188484bb9bafb7089bc1f5bb4/%E1%84%89%E1%85%B3%E1%84%8F%E1%85%B3%E1%84%85%E1%85%B5%E1%86%AB%E1%84%89%E1%85%A3%E1%86%BA_2022-03-01_%E1%84%8B%E1%85%A9%E1%84%92%E1%85%AE_6.44.37.png)

`fetchProduct`에 요청을 보내보겠습니다.

![스크린샷 2022-03-01 오후 6.46.08.png](BE%20Day28%20Redis%20Search%20Process%2067e462d188484bb9bafb7089bc1f5bb4/%E1%84%89%E1%85%B3%E1%84%8F%E1%85%B3%E1%84%85%E1%85%B5%E1%86%AB%E1%84%89%E1%85%A3%E1%86%BA_2022-03-01_%E1%84%8B%E1%85%A9%E1%84%92%E1%85%AE_6.46.08.png)

`docker ps -a` 를 입력해 실행 중인 redis의 container id를 찾습니다.

![스크린샷 2022-03-01 오후 6.47.06.png](BE%20Day28%20Redis%20Search%20Process%2067e462d188484bb9bafb7089bc1f5bb4/%E1%84%89%E1%85%B3%E1%84%8F%E1%85%B3%E1%84%85%E1%85%B5%E1%86%AB%E1%84%89%E1%85%A3%E1%86%BA_2022-03-01_%E1%84%8B%E1%85%A9%E1%84%92%E1%85%AE_6.47.06.png)

redis cli를 실행하기 위해서 docker exec -it <container id> redis-cli를 입력해주세요.

![스크린샷 2022-03-01 오후 6.48.22.png](BE%20Day28%20Redis%20Search%20Process%2067e462d188484bb9bafb7089bc1f5bb4/%E1%84%89%E1%85%B3%E1%84%8F%E1%85%B3%E1%84%85%E1%85%B5%E1%86%AB%E1%84%89%E1%85%A3%E1%86%BA_2022-03-01_%E1%84%8B%E1%85%A9%E1%84%92%E1%85%AE_6.48.22.png)

`keys *` 를 입력해서 모든 key를 조회합니다.

![스크린샷 2022-03-01 오후 6.49.32.png](BE%20Day28%20Redis%20Search%20Process%2067e462d188484bb9bafb7089bc1f5bb4/%E1%84%89%E1%85%B3%E1%84%8F%E1%85%B3%E1%84%85%E1%85%B5%E1%86%AB%E1%84%89%E1%85%A3%E1%86%BA_2022-03-01_%E1%84%8B%E1%85%A9%E1%84%92%E1%85%AE_6.49.32.png)

`get "product:상품ID"`를 입력해서 redis의 데이터를 조회합니다. 

![스크린샷 2022-03-01 오후 6.53.14.png](BE%20Day28%20Redis%20Search%20Process%2067e462d188484bb9bafb7089bc1f5bb4/%E1%84%89%E1%85%B3%E1%84%8F%E1%85%B3%E1%84%85%E1%85%B5%E1%86%AB%E1%84%89%E1%85%A3%E1%86%BA_2022-03-01_%E1%84%8B%E1%85%A9%E1%84%92%E1%85%AE_6.53.14.png)

`del "product:상품 ID"`를 입력해서 redis의 데이터를 삭제하고 다시 상품 검색 요청을 보내겠습니다.

**(nil)**은 null과 비슷한 뜻입니다.

![스크린샷 2022-03-01 오후 6.44.37.png](BE%20Day28%20Redis%20Search%20Process%2067e462d188484bb9bafb7089bc1f5bb4/%E1%84%89%E1%85%B3%E1%84%8F%E1%85%B3%E1%84%85%E1%85%B5%E1%86%AB%E1%84%89%E1%85%A3%E1%86%BA_2022-03-01_%E1%84%8B%E1%85%A9%E1%84%92%E1%85%AE_6.44.37.png)

![스크린샷 2022-03-01 오후 6.54.05.png](BE%20Day28%20Redis%20Search%20Process%2067e462d188484bb9bafb7089bc1f5bb4/%E1%84%89%E1%85%B3%E1%84%8F%E1%85%B3%E1%84%85%E1%85%B5%E1%86%AB%E1%84%89%E1%85%A3%E1%86%BA_2022-03-01_%E1%84%8B%E1%85%A9%E1%84%92%E1%85%AE_6.54.05.png)

`fetchProduct` API 요청 후, 다시 `redis`에 조회해 보니 정상적으로 데이터가 조회됩니다.