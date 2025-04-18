# 기아 FAQ 프로젝트

이 프로젝트는 [Next.js](https://nextjs.org)를 기반으로 제작된 기아 FAQ 웹사이트입니다.

![image](https://github.com/user-attachments/assets/e5df8dcb-3685-4261-aab7-797b18134f6c)

## 시작하기 전에

### 필수 설치 항목

프로젝트를 실행하기 전에 다음 항목들이 설치되어 있어야 합니다.

- [Node.js](https://nodejs.org/) (v18 이상 권장)
- [pnpm](https://pnpm.io/installation) (패키지 관리자)

### 패키지 설치

프로젝트 디렉토리에서 다음 명령어를 실행하여 필요한 패키지를 설치합니다.

```bash
pnpm install
```

## 개발 서버 실행

개발 서버를 실행하려면 다음 명령어를 사용합니다.

```bash
pnpm dev
```

브라우저에서 [http://localhost:3000](http://localhost:3000)을 열어 결과를 확인할 수 있습니다.

## 목 API 서버 실행

### 정상 작동 API 서버

항상 성공하는 API 응답을 받기 위한 서버를 실행하려면 다음 명령어를 사용합니다.

```bash
pnpm mock-api
```

이 프로젝트는 [json-server](https://github.com/typicode/json-server)를 사용하여 간이 백엔드가 구현되어 있습니다. 이를 통해 실제 백엔드 없이도 API 요청 및 응답을 테스트할 수 있습니다.

### 에러 테스트용 API 서버

에러 페이지를 테스트하기 위한 목 API 서버를 실행하려면 별도의 터미널에서 다음 명령어를 실행합니다.

```bash
pnpm mock-error-api
```

이 서버는 50% 확률로 API 호출이 실패하도록 설정되어 있으며, 400, 401, 403, 404, 500 중 랜덤으로 에러 코드를 발생시킵니다.

**참고**: 개발 서버와 목 API 서버를 동시에 실행해야 합니다.
**참고**: 모든 mock data는 실제 kia page에서 가져왔습니다.

## 프로젝트 구조

이 프로젝트는 FSD(Feature-Sliced Design) 아키텍처를 차용하여 구성되었습니다. FSD는 기능 중심의 모듈화된 구조로, 코드의 재사용성과 유지보수성을 높이는 데 중점을 둡니다. features, pages 폴더 구조는 프로젝트 규모 상 필요하지 않아 사용하지 않았습니다.

```
kia-faq/
├── src/                # 소스 코드
│   ├── app/            # 애플리케이션 진입점 및 글로벌 설정
│   │   ├── api/        # API 라우트 (Next.js API Routes)
│   │   │   ├── categories/ # 카테고리 API
│   │   │   ├── faq/    # FAQ API
│   │   │   └── terms/  # 이용약관 API
│   │   ├── components/ # 앱 레벨 컴포넌트
│   │   ├── styles/     # 글로벌 스타일
│   │   ├── page.tsx    # 메인 페이지
│   │   └── error.tsx   # 에러 페이지
│   │
│   ├── entities/       # 비즈니스 엔티티 (데이터 모델, 상태)
│   │   ├── faq/        # FAQ 관련 엔티티
│   │   │   └── model/  # FAQ 데이터 모델
│   │   └── terms/      # 이용약관 관련 엔티티
│   │       ├── model/  # 이용약관 데이터 모델
│   │       └── ui/     # 이용약관 UI 컴포넌트
│   │           └── TermsDialog/ # 이용약관 다이얼로그
│   │
│   ├── shared/         # 공통 유틸리티 및 UI 컴포넌트
│   │   ├── api/        # API 클라이언트 및 훅
│   │   │   ├── faq/    # FAQ API 통신
│   │   │   └── terms/  # 이용약관 API 통신
│   │   ├── assets/     # 정적 자산
│   │   │   ├── fonts/  # 폰트
│   │   │   └── icons/  # 아이콘
│   │   └── ui/         # 재사용 가능한 UI 컴포넌트
│   │       ├── Accordion/ # 아코디언 컴포넌트
│   │       ├── Button/ # 버튼 컴포넌트
│   │       ├── Dialog/ # 다이얼로그 컴포넌트
│   │       ├── Input/  # 입력 필드 컴포넌트
│   │       ├── ScrollToTop/ # 스크롤 버튼 컴포넌트
│   │       ├── Select/ # 선택 컴포넌트
│   │       ├── Spinner/ # 로딩 컴포넌트
│   │       └── Tab/    # 탭 컴포넌트
│   │
│   └── widgets/        # 복합 UI 블록 (여러 기능과 엔티티 조합)
│       ├── AppDownload/ # 앱 다운로드 섹션
│       ├── FaqTabs/    # FAQ 탭 컴포넌트
│       ├── ProcessGuide/ # 프로세스 가이드 컴포넌트
│       ├── ServiceInquiry/ # 서비스 문의 컴포넌트
│       └── layout/     # 레이아웃 컴포넌트
│           ├── footer/ # 푸터 컴포넌트
│           └── header/ # 헤더 컴포넌트
│
├── public/             # 정적 파일 ex. 로고 이미지
├── db.json             # JSON Server 데이터베이스 파일
└── package.json        # 프로젝트 의존성 및 스크립트
```

### FSD 계층 구조 설명

- **app**: 애플리케이션의 진입점으로, 페이지, 라우팅, 글로벌 스타일 등을 포함합니다.
- **entities**: 비즈니스 엔티티를 정의합니다. 각 엔티티는 데이터 모델, 상태 관리, UI 표현을 포함합니다.

  - ex: `terms` - 이용약관 관련 모델 및 UI

- **shared**: 프로젝트 전체에서 재사용되는 코드를 포함합니다.

  - `api`: API 클라이언트, 통신 로직, 커스텀 훅
  - `ui`: 버튼, 입력 필드, 아코디언 등 기본 UI 컴포넌트

- **widgets**: 여러 기능과 엔티티를 조합한 복합 UI 블록입니다.
  - 예: `FaqTabs` - FAQ 탭 시스템, `layout` - 헤더 및 푸터

## UI 디자인 및 레이아웃

### 반응형 디자인

프로젝트는 다양한 화면 크기에 맞게 최적화된 반응형 디자인을 적용했습니다. 반응형의 디자인 레이아웃은 실제 기아 사이트를 참고하였습니다.

![image](https://github.com/user-attachments/assets/f81dcaeb-a0bc-4baf-a297-eb9fc4e33baf)

### 다크모드 지원

이 프로젝트는 사용자의 브라우저 시스템 설정에 따라 자동으로 다크모드를 지원합니다. SCSS 변수를 활용하여 테마 전환을 구현했습니다.

![image](https://github.com/user-attachments/assets/93641b96-0d3c-4567-93a3-06aa6f077bb5)

```scss
// 라이트 모드 (기본)
:root {
  --color-background: #ffffff;
  --color-text-primary: #05141f;
  --color-border: #dee2e6;
  // 기타 변수들...
}

// 다크모드 - 시스템 설정 기반 자동 전환
@media (prefers-color-scheme: dark) {
  :root {
    --color-background: #05141f;
    --color-text-primary: #ffffff;
    --color-border: #495057;
    // 기타 변수들...
  }
}
```

### Footer 구성

Footer에는 다음과 같은 요소들이 포함되어 있습니다.

- **회사 정보**: 로고, 저작권 정보, 회사 주소, 대표자 정보 등
- **정책 링크**:
  - 개인정보 처리방침: 외부 링크(https://privacy.kia.com/overview/full-policy)로 연결
  - 이용약관: 클릭 시 다이얼로그 표시
- **연락처 정보**:
  - 고객센터 전화번호
  - 이메일 주소(kiabiz@kia.com): mailto 링크 적용 및 밑줄 스타일 추가
  - 이메일 링크 스타일

## 주요 기능

### FAQ 시스템

- 탭 기반 카테고리 필터링 (서비스 도입, 서비스 이용)
- 카테고리별 FAQ 목록 표시
- 검색 기능 (제목, 내용 기반 검색)
- "더보기" 버튼을 통한 페이지네이션

### 탭 시스템

- 합성 컴포넌트(Compound Component) 패턴으로 구현된 탭 컴포넌트
- 탭 전환 시 해당 탭의 카테고리만 표시
- 탭 헤더의 스타일이 변경 될 일이 많아 보여 UI headless하게 구현

### 스크롤 맨 위로 이동 기능

- 페이지를 아래로 스크롤할 때 자동으로 나타나는 '맨 위로' 버튼
- 사용자가 긴 FAQ 목록을 탐색한 후 쉽게 페이지 상단으로 돌아갈 수 있음
- 스크롤 위치에 따라 자동으로 표시/숨김 처리

### API 통합

- React Query와 Axios를 사용한 API 통신
- 탭별 카테고리 목록 조회 API
- FAQ 검색 및 페이지네이션 API

## 기술 스택

### 프론트엔드

- [Next.js](https://nextjs.org/) - Nextjs 14.2.26
- [TypeScript](https://www.typescriptlang.org/) - 정적 타이핑
- [SCSS Modules](https://github.com/css-modules/css-modules) - 스타일링
- [@tanstack/react-query](https://tanstack.com/query) - 서버 상태 관리
- [Axios](https://axios-http.com/) - HTTP 클라이언트

### 테스트

- [Jest](https://jestjs.io/) - 테스트 프레임워크
- [React Testing Library](https://testing-library.com/docs/react-testing-library/intro/) - 컴포넌트 테스트

## 테스트

프로젝트에는 Jest와 React Testing Library를 사용한 테스트가 포함되어 있습니다. 테스트 범위는 일정상 UI 컴포넌트의 동작 단위 테스트에 초점을 맞추어 커버되었습니다.
Pull Request 생성 시 자동으로 테스트 코드 실행 하도록 github workflow를 생성 해 두었습니다.

![image](https://github.com/user-attachments/assets/36bb4839-f623-49fc-becd-c288be25effd)

### 테스트 실행

```bash
# 모든 테스트 실행
pnpm test

# 테스트 감시 모드 실행 (파일 변경 시 자동 재실행)
pnpm test:watch

# 테스트 커버리지 보고서 생성
pnpm test:coverage
```

### 에러 처리

이 프로젝트는 다양한 에러 상황을 처리하기 위한 시스템을 갖추고 있습니다.
실제 기아 사이트에서는 나중에 다시 이용해 달라는 error dialog를 띄우지만 현재 프로젝트에서는 에러 페이지를 띄웁니다.
사용자에게 다시 시도 할 수 있는 선택지를 줌으로써 사용성을 높입니다.

- **에러 경계 컴포넌트**: 컴포넌트 렌더링 중 발생하는 에러를 캐치하여 사용자에게 친숙한 에러 메시지를 표시합니다.
- **에러 페이지**: API 호출 실패 시 적절한 에러 페이지를 표시합니다.
- **에러 테스트**: `pnpm mock-error-api` 명령어를 사용하여 다양한 에러 상황(400, 401, 403, 404, 500)을 테스트할 수 있습니다.

## 문제 해결 경험

프로젝트를 진행하면서 마주친 몇 가지 기술적 문제와 해결 방법을 공유합니다.

### Tab 컴포넌트 Headless UI 적용

**문제**: Tab 컴포넌트의 헤더 스타일이 변경되는 경우가 있어 일관된 UI를 유지하기 어려웠습니다.

**해결**: UI 로직과 스타일을 분리하는 Headless UI 패턴을 적용하여 Tab 컴포넌트를 재구성했습니다. 이를 통해 스타일 변경에 영향을 받지 않는 안정적인 컴포넌트를 구현할 수 있었습니다.

### 이용약관 Dialog 개선

**문제**: 실제 기아 사이트의 이용약관 Dialog는 헤더 영역이 fixed 되지 않아, 사용자가 긴 내용을 읽은 후 닫기 버튼을 클릭하려면 스크롤을 다시 맨 위로 올려야 하는 불편함이 있었습니다.

**해결**: 이용약관 Dialog의 헤더 영역을 fixed 포지션으로 설정하고, 내용 영역에만 스크롤이 적용되도록 개선했습니다. 이를 통해 사용자는 스크롤 위치와 관계없이 언제든지 닫기 버튼에 접근할 수 있게 되었습니다.

### Next.js에서의 Scroll-to-Top 구현

**문제**: Next.js 환경에서 window 객체에 정상적으로 접근하지 못하는 현상으로 인해 일반적인 방식으로 Scroll-to-Top 기능을 구현하기 어려웠습니다.

**해결**: 스크롤이 생성되는 DOM 객체에 직접 접근하여 스크롤 이벤트를 등록하는 방식으로 문제를 해결했습니다. useRef를 사용하여 스크롤 컨테이너를 참조하고, 이 참조를 통해 scrollTo 메서드를 호출하여 스크롤 기능을 구현했습니다.

### 네트워크 패킷 분석을 통한 백엔드 구현

**문제**: 실제 기아 사이트의 API 구조와 데이터 형식을 파악하여 동일한 형태의 데이터를 제공해야 했습니다.

**해결**: 브라우저 개발자 도구의 네트워크 탭을 활용하여 실제 기아 사이트의 네트워크 패킷을 분석했습니다. 이를 통해 API 엔드포인트, 요청/응답 형식, 데이터 구조를 파악하고, 이에 맞춰 Next.js API 라우트를 활용한 간이 백엔드를 구현했습니다. 실제 데이터를 JSON 파일로 저장하여 API 응답으로 제공함으로써 실제 서비스와 유사한 환경을 구축했습니다.

## 개선 사항 및 아쉬운 점

프로젝트를 진행하면서 완벽하게 구현하지 못한 부분들이 있습니다. 향후 개선이 필요한 사항들은 다음과 같습니다

### 다크모드 완성도

- 다크모드를 지원하도록 구현했으나, 일부 컴포넌트와 이미지에서 완벽한 대응이 이루어지지 않았습니다.
- 특히 기아 사이트에서 가져온 검정색 계열 이미지와 아이콘은 다크모드에서 시인성이 떨어질 수 있습니다.
- SVG 아이콘을 활용하여 테마에 따라 색상이 자동으로 변경되도록 개선할 필요가 있습니다.

### 폰트 적용

- 실제 기아 웹사이트에서 사용하는 전용 폰트를 적용하지 못했습니다.
- 라이센스 문제로 인해 시스템 기본 폰트를 사용했으나, 향후 적절한 대체 폰트나 공식 폰트를 적용하면 디자인 일관성이 향상될 것입니다.

### 테스트 커버리지

- 시간 제약으로 인해 테스트 커버리지가 충분하지 않습니다.
- 현재는 주요 UI 컴포넌트에 대한 단위 테스트만 구현되어 있으며, 통합 테스트와 E2E 테스트가 부족합니다.
- 특히 API 통신 부분과 에러 처리에 대한 테스트를 강화할 필요가 있습니다.
