# 로또픽 스튜디오 — 앱 출시 가이드

이 문서는 iOS App Store / Google Play Store에 새 빌드를 올릴 때마다
훑고 가는 체크리스트입니다. 코드 변경이 있을 때 같이 갱신해 주세요.

---

## 1. 매 출시마다 손대는 곳

### 버전 올리기

| 위치 | 파일 | 값 |
| --- | --- | --- |
| iOS marketing version | `ios/App/App.xcodeproj/project.pbxproj` | `MARKETING_VERSION = 1.0.0` → 다음 버전 |
| iOS build number | `ios/App/App.xcodeproj/project.pbxproj` | `CURRENT_PROJECT_VERSION = 1` → 빌드마다 +1 |
| Android versionName | `android/app/build.gradle` | `versionName "1.0.0"` → 다음 버전 |
| Android versionCode | `android/app/build.gradle` | `versionCode 1` → 빌드마다 +1 |
| 웹 캐시 무효화 | `index.html` 의 `?v=...` 쿼리 | 변경분이 있을 때만 |

> Apple은 같은 build number를 재업로드 못 함. Play는 versionCode 충돌 시 거절.

### 빌드 명령

```bash
# 1. 웹 자산 → www/ 복사 + 네이티브 동기화
npm run cap:sync

# 2. iOS
npm run cap:open:ios     # Xcode 열림 → Product > Archive → App Store Connect
# 또는 CLI 자동화는 별도 Fastlane 도입 시 추가

# 3. Android
npm run cap:open:android # Android Studio 열림 → Build > Generate Signed Bundle
```

---

## 2. 출시 전 1회만 하면 되는 항목

### AdMob 실제 ID 교체 (필수)

현재는 Google이 제공하는 **테스트 ID**가 박혀 있습니다. 실광고가 안 뜨고,
실수로 자기 광고 클릭해도 계정 정지 안 됩니다. 출시 직전 교체합니다.

| 위치 | 파일 | 변경 |
| --- | --- | --- |
| App ID (iOS) | `capacitor.config.json` `plugins.AdMob.appIdIos` | `ca-app-pub-XXXX~XXXX` |
| App ID (iOS Info.plist) | `ios/App/App/Info.plist` `GADApplicationIdentifier` | 위와 동일 값 |
| App ID (Android) | `capacitor.config.json` `plugins.AdMob.appIdAndroid` | `ca-app-pub-XXXX~XXXX` |
| App ID (Manifest) | `android/app/src/main/AndroidManifest.xml` `APPLICATION_ID` meta | 위와 동일 값 |
| Banner / Interstitial 단위 ID | `scripts/app-init.js` `AD_IDS` 객체 | 4개 (iOS/Android × banner/interstitial) |
| 테스트 플래그 | `scripts/app-init.js` `isTesting: true` → `false` | 실광고 노출 |

AdMob 콘솔에서 새 앱을 등록하면 App ID와 광고 단위 ID들을 받을 수 있습니다.
새 광고 단위는 노출/수익 데이터가 잡히기까지 며칠 걸리므로 일찍 만들어두세요.

### iOS Sign-In / Provisioning

- Apple Developer Program 가입 ($99/년)
- App Store Connect → My Apps → "+" → 새 앱 등록
  - Bundle ID: `com.lottopick.studio`
  - SKU: 임의 (예: `LOTTOPICK001`)
  - 기본 언어: 한국어
- Xcode → App 타깃 → Signing & Capabilities
  - "Automatically manage signing" 체크
  - Team 선택 (Apple Developer 계정)
- Archive 후 App Store Connect로 업로드

### Android Sign-In / Keystore

처음 한 번 키스토어 생성:

```bash
keytool -genkey -v -keystore ~/lottopick-release.keystore \
  -alias lottopick -keyalg RSA -keysize 2048 -validity 10000
```

`android/app/build.gradle`의 `release` 블록에 signing 설정 추가 (또는
`android/keystore.properties` + signingConfigs 패턴).

> ⚠️ 키스토어 분실 시 Play Console에서 같은 앱 갱신이 영원히 불가능.
> 안전한 곳에 백업하세요 (Apple ID에 안 묶임).

### 스토어 메타데이터 / 자료

#### App Store Connect
- 앱 아이콘 1024×1024 (이미 `resources/icon.png` 있음 — 디자인 마스터로 교체 권장)
- 스크린샷
  - iPhone 6.7" (Pro Max): 1290×2796 — 최소 3장
  - iPhone 6.5" / 5.5": 자동 스케일 허용
  - iPad 12.9": 필요 시
- 앱 설명, 키워드, 카테고리 (게임 > 카지노? 또는 라이프스타일? — **카지노 카테고리 피하기**, "엔터테인먼트" 또는 "유틸리티")
- 개인정보처리방침 URL (필수)
- 이용약관 URL (선택)
- 등급 설문 (도박 콘텐츠 여부 — "비공식 번호 생성 도구" 명시)
- AdMob 사용으로 "광고 식별자 사용" 체크 + ATT 프롬프트 활성 (이미 코드에 있음)

#### Google Play Console
- 앱 아이콘 512×512
- 그래픽 이미지 1024×500 (Feature Graphic, 필수)
- 스크린샷: 폰 16:9 또는 9:16, 최소 2장
- 짧은 설명 80자, 자세한 설명 4,000자
- 개인정보처리방침 URL (필수)
- 콘텐츠 등급 설문 (도박 항목에서 "비공식 도구" 명시)
- 광고 포함 체크
- 데이터 보안 설문 (수집 데이터: 이메일, 광고 식별자 등)

---

## 3. 심사 거절 자주 받는 항목 — 미리 보강

- **"단순 WebView 래퍼"로 보이는 앱**: Apple Guideline 4.2 거절 흔함.
  → 네이티브 기능(카메라 QR, 푸시, IAP 등) 최소 1개 동작 보여줘야 안전.
  현재 빌드는 카메라 권한 + AdMob 네이티브 광고가 있으므로 어느 정도 방어됨.
- **로또 = 도박 콘텐츠 오해**: 명세에 "실제 복권 구매·당첨 보장 X. 번호
  생성·기록용 비공식 도구" 명시. 등급 설문에서도 "Simulated Gambling" 아님.
- **Sign in with Apple 누락**: 다른 소셜 로그인이 있으면 Apple 로그인도
  넣어야 함. **현재 빌드는 앱에서 소셜 로그인을 숨기고 게스트만 노출** →
  이 규칙은 피해감. (소셜 로그인 다시 켤 때는 Apple 로그인도 필수.)
- **테스트 광고를 실제로 노출**: `isTesting: true`인 채 출시하면 정책 위반
  가능. 실 ID 교체 시 플래그도 `false`로 바꿔야 함.

---

## 4. v2에서 다룰 워크스트림 (이번 출시엔 미포함)

- Firebase Auth 네이티브 마이그레이션 (`@capacitor-firebase/authentication`)
  + GoogleService-Info.plist / google-services.json
- Kakao 네이티브 SDK 통합
- 푸시 알림 (FCM): 추첨일 D-1 리마인더 등
- **인앱 결제(IAP)** — 아래 5절 참고
- Live Updates (Capgo / Ionic Live Update): 심사 없이 웹 자산만 OTA 업데이트

---

## 5. 인앱 결제(IAP) 기획안

현재 코드의 결제 상태: **UI는 갖춰져 있으나 실제 과금 없음**.
`setMembershipTier()` (main.js:7083)가 localStorage + Firestore에만 멤버십
정보를 기록한다. 외부 결제 게이트웨이 호출 0건. 앱 출시하려면 양 스토어
정책상 반드시 IAP를 채워야 한다.

### 5.1 정책 제약

| 스토어 | 디지털 구독 결제 | 수수료 |
| --- | --- | --- |
| Apple App Store | StoreKit 의무 (외부 결제 금지) | 30% / 13개월차 이상 자동갱신 구독자는 15% |
| Google Play | Play Billing 의무 | 15% (구독 기본), 매출 100만$ 이상 30% |

외부 결제로 우회 시도 → 거절 또는 계정 정지.

### 5.2 상품 설계

타입: **자동 갱신 구독 (Auto-renewable Subscription)**.
"첫 달 0원, 2개월부터 자동결제"는 각 스토어의 **Introductory Offer
(Pay As You Go)** 로 구현.

상품 ID(양 스토어 동일):
```
com.lottopick.studio.gold_monthly
com.lottopick.studio.platinum_monthly
com.lottopick.studio.master_monthly
```

### 5.3 가격 정책 — 미결정. 세 선택지

| 옵션 | 사용자 가격 | 사업자 수령액 | 비고 |
| --- | --- | --- | --- |
| A. 웹과 동일 (₩9,900 / ₩14,900 / ₩19,900) | 통일 | 수수료 30%만큼 수익 ↓ | 단순, 사용자 친화 |
| B. 앱 인상 (~₩14,000 / ₩21,000 / ₩28,000) | 앱 사용자 부담 ↑ | 웹과 동일 수령 | Spotify·Netflix 패턴 |
| C. 앱은 인상하면서 "더 저렴한 웹 가입 안내" 명시 | 동일 | 웹 사용자 더 저렴 | Apple Reader App 룰 — Lotto는 적용 불가, 즉 안내만 가능하고 외부 결제 링크는 금지 |

> 권장 진입점: **A로 출시 → 데이터 보고 B/C 검토**. 첫 출시에서 가격 인상은
> 사용자 반발 큼.

### 5.4 기술 스택

권장: **RevenueCat** (`@revenuecat/purchases-capacitor`).
- 양 플랫폼 추상화 (한 API)
- Receipt 서버 검증 자동
- Webhook으로 Firestore 동기화 가능
- 환불·갱신실패·Grace Period·Family Sharing 이벤트 처리 내장
- 매출 월 1만$ 까지 무료, 이후 매출의 1%

대안: `@capacitor-community/in-app-purchases` (직접 통제, receipt 검증
직접 구현 필요 — 한 달은 잡아야 함).

### 5.5 백엔드 흐름

```
[앱]
  ├─ Purchases.purchasePackage(package) — RevenueCat SDK
  ▼
[StoreKit / Play Billing]
  ├─ receipt
  ▼
[RevenueCat]
  ├─ verified entitlement
  ├─ webhook → 우리 백엔드
  ▼
[Firestore] users/{uid}.membershipTier 업데이트
  ▼
[앱이 polling 또는 SDK 콜백으로 수신]
```

현재 `setMembershipTier()`의 분기 지점에서 `window.appAds.isApp`이면
RevenueCat 호출, 아니면 기존 흐름 (또는 추후 도입될 웹 결제 게이트웨이).

### 5.6 필수 UI 요소

- 플랜 선택 화면 — 이미 있음. 가격은 RevenueCat이 반환하는 현지 통화로
  바인딩 (하드코딩된 ₩ 문자열을 동적 값으로 교체).
- **"구매 복원" 버튼** — Apple 심사 필수. 누락 시 거절. `Purchases.restorePurchases()`
- 구독 관리 링크 — iOS: `https://apps.apple.com/account/subscriptions`,
  Android: `https://play.google.com/store/account/subscriptions?sku=<id>&package=<bundle>`
- 자동갱신 약관 안내 — 가격 / 갱신 주기 / 취소 방법 명시. Apple 필수
- 이용약관 / 개인정보처리방침 링크
- 현재 구독 상태 표시 — 활성, 갱신 예정일, 만료 임박 등

### 5.7 웹 ↔ 앱 동기화

| 시나리오 | 처리 |
| --- | --- |
| 웹 가입 → 앱 사용 | 같은 Firebase Auth uid → Firestore `membershipTier` 공유. 앱은 entitlement 없어도 Firestore 값을 신뢰 (단, 만료일은 검증) |
| 앱 가입 → 웹 사용 | RevenueCat webhook → Firestore 업데이트 → 웹이 그 값 사용 |
| 양쪽 동시 가입 | UI에서 차단: 결제 직전 서버에 "이미 활성 구독 있나?" 체크 후 차단/안내 |
| 구독 취소 | iOS는 앱 외부에서만 가능. 앱 UI는 "App Store에서 관리" 링크만 |

### 5.8 단계별 구현 로드맵 (예상 8~12일)

| # | 작업 | 작업 소요 | 사용자 의존 |
| --- | --- | --- | --- |
| 0 | App Store Connect / Play Console 앱 등록 (Bundle ID 매칭) | 0.5일 | Apple / Google 결제 프로필 |
| 1 | RevenueCat 계정 + 양 스토어 연동 + Webhook URL 등록 | 0.5일 | RevenueCat 가입 |
| 2 | 양 스토어에 상품 3개 등록 + Introductory Offer 설정 | 1일 (심사 대기 며칠 별도) | - |
| 3 | `@revenuecat/purchases-capacitor` 설치, 초기화, plug-in 등록 | 0.5일 | API Key |
| 4 | 플랜 선택 → `purchase()` 호출 → 결과 처리 | 1~2일 | - |
| 5 | 구매 복원 / 구독 관리 / 자동갱신 고지 UI | 0.5일 | - |
| 6 | `setMembershipTier()` 분기 — 앱은 RevenueCat 진실, 웹은 기존 | 1일 | - |
| 7 | Sandbox 테스트 (iOS Sandbox account / Android tester) | 1~2일 | 테스트 계정 |
| 8 | 환불 / 갱신 실패 / Grace Period 케이스 | 1일 | - |
| 9 | 심사 제출 (인앱결제 활성 상태로) | - | - |

### 5.9 사용자 사전 준비 자료

- Apple Developer Program 가입 + 세금/은행 정보 등록 (Paid Apps 계약)
- Google Play Console 결제 프로필 (Merchant account 연결)
- RevenueCat 계정 (revenuecat.com — 무료 가입)
- 가격 정책 결정 (위 5.3)
- 자동갱신 약관 문구 (법무 검토 권장)
- 개인정보처리방침 + 이용약관 URL (결제 활성화 전 필수)
- 사업자 정보 (정기결제 운영 시)

### 5.10 잠재 함정

- **Apple Sandbox 빠른 갱신**: 월 구독이 5분 단위로 갱신됨. 갱신 동작
  테스트 시 혼란 주의
- **Family Sharing 충돌**: 한 명 결제로 가족 다 사용 가능. 디지털 상품은
  Family Sharing 비활성화 권장
- **카드 만료 등 갱신 실패**: Grace Period 동안 유저는 계속 쓸 수 있음.
  UI에 "결제 정보 업데이트 필요" 안내 필요
- **iOS 환불 정책**: Apple은 자동 환불 처리. 우리 서버는 RevenueCat
  webhook으로 통보받아 entitlement 회수
- **국가별 가격**: RevenueCat이 현지 통화 자동 표기. 한국 외 거주
  한국인 사용자 대비

---

## 6. 빠른 빌드 검증 명령

```bash
# 시뮬레이터 부팅 + iOS 빌드/설치/실행
xcrun simctl boot 84156FDB-D84E-4B04-A4FB-9B83D3A1455A 2>/dev/null
open -a Simulator
npm run cap:run:ios

# Android (Java 17 설치 필요)
brew install --cask zulu@17 2>/dev/null   # 또는 다른 JDK
npm run cap:run:android

# 자산만 새로 fan-out
node scripts/build-master-icon.mjs
npx capacitor-assets generate

# Safari Web Inspector 디버깅
# Mac Safari > 환경설정 > 고급 > "개발자용 메뉴" 체크
# 시뮬레이터에서 앱 실행 중 > Safari > 개발자용 > Simulator > "로또픽 스튜디오"
```
