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
- 앱 내 결제(IAP): 현재 프리미엄 결제는 웹에서만. iOS는 외부 결제 금지 →
  StoreKit / Play Billing 도입 필요. 웹 결제와 사용자 동기화 전략 필요.
- Live Updates (Capgo / Ionic Live Update): 심사 없이 웹 자산만 OTA 업데이트

---

## 5. 빠른 빌드 검증 명령

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
