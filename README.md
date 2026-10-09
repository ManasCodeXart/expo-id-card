# expo-id-card

A lanyard-style ID card that hangs, swings, and flips — drag it like a real badge on a strap. A Skia-rendered twisted-ribbon lanyard curls and bows as the card flips between its front and back faces, with spring-driven bounce throughout.

<img width="1280" height="720" alt="km_20261009-4_1080p_60f_20261009_164951-ezgif com-video-to-gif-converter" src="https://github.com/user-attachments/assets/67253c90-7712-4434-aa23-07f022551752" />


---

## ✨ Features

- 🪢 **Twisted-ribbon strap** — a Skia vertex mesh ribbon that curls and untwists with the card's flip, bowing side-to-side when kicked by flip velocity and ringing out on a damped spring.
- 🕰️ **Finger-driven pendulum swing** — drag the card and it swings like it's really hanging from a lanyard; released, it settles back to center with natural damping, no abrupt stop.
- 🔄 **Swing-coupled flip** — the card flips front-to-back automatically as it swings past a configurable angle band, driven by a bouncy spring follower instead of a snap.
- ⏸️ **Back-face hold + eased return** — pauses briefly on the back face before the restoring force eases back in, so it never feels like it's fighting gravity.
- 🎯 **Settles on the front at rest** — rest-snap logic parks the flip exactly on its target, so once the swing dies out the card always rests showing the front face (it still visits the back mid-swing).
- 💥 **Drop-and-bounce on return** — a vertical spring fires when the swing crosses center, giving the whole stack a little top-drop bounce as it arrives.
- 🧠 **TypeScript-first** — `HangingCardProps` fully typed; hook return types are derived via `ReturnType`, never hand-duplicated.


---

## ⚙️ Installation

This isn't published as an npm package yet — copy the source directly into your project.

```bash
git clone https://github.com/ManasCodeXart/expo-id-card
```

Copy `components/`, `constants/`, and `hooks/` from `src/`, plus `assets/lottie/wave-bg.json` (default front-face background) and `assets/images/zayx.png` (strap print — see [Important](#-important-no-bundled-personal-data-but-one-bundled-asset) below) from the project root, into your project, then install the peer dependencies:

```bash
npx expo install react-native-reanimated react-native-gesture-handler @shopify/react-native-skia expo-linear-gradient lottie-react-native
```

> No Reanimated Babel plugin needed — this project targets Reanimated 4.x (SDK 57), where compilation ships via `react-native-worklets`.

> Requires a `GestureHandlerRootView` somewhere up your tree — standard `react-native-gesture-handler` setup.

> On Reanimated 4.x, `react-native-worklets` ships as a separate required peer dependency.

---

## 🚀 Usage

```tsx
import { HangingCard } from './components/HangingCard';

export function ProfileScreen() {
  return (
    <HangingCard
      name="Manas Sharma"
      role="Mobile design engineer"
      avatarSource={require('./assets/images/avatar.png')}
      phone="+91 98765 43210"
      email="you@example.com"
      qrCodeSource={require('./assets/images/qrcode.png')}
      backLogoSource={require('./assets/images/logo.png')}
    />
  );
}
```

`phone`, `email`, `qrCodeSource`, and `backLogoSource` are all optional — omit any of them and that element simply isn't rendered, rather than falling back to placeholder content:

```tsx
<HangingCard
  name="Priya Nair"
  role="Product designer"
  avatarSource={require('./assets/images/avatar.png')}
/>
```

## Preview

PASTE_PREVIEW_VIDEO_URL_HERE

---

## ⚠️ Important: No bundled personal data, but one bundled asset

Every identity field — name, role, phone, email, avatar, QR code, back logo — is a prop, with no fallback to any hardcoded content. Leave `phone`, `email`, `qrCodeSource`, or `backLogoSource` unset and that element doesn't render at all.

The one asset still bundled is the strap's lanyard print (`assets/images/zayx.png`, used directly inside `Strap.tsx`) — swap that file for your own branding before shipping it in another project.

---

## 🧱 Component Anatomy

```
<HangingCard>
  ├─ Strap   — Skia twisted-ribbon mesh, driven by flipAngle + useStrapBow
  └─ Card    — RN views for the front/back faces; visibility is computed from
               flipAngle rather than native backfaceVisibility, so it always
               tracks the live flip state
```

```
useCardPhysics
  ├─ usePendulum   — finger-driven swing (Gesture.Pan) + drop-and-bounce on return
  └─ useCardFlip   — flip angle derived from the swing angle, bouncy spring follower

Strap.tsx calls useStrapBow directly — sideways ribbon bow kicked by flip velocity
```

---

## 🧩 API

### `<HangingCard>` props

| Prop | Type | Default | Description |
|---|---|---|---|
| `name` | `string` | — | **Required.** Name shown on the front face. |
| `role` | `string` | — | **Required.** Role/title shown above the name. |
| `avatarSource` | `ImageSourcePropType` | — | **Required.** Avatar image on the front face. |
| `phone` | `string` | — | Optional. Rendered only if provided. |
| `email` | `string` | — | Optional. Rendered only if provided. |
| `qrCodeSource` | `ImageSourcePropType` | — | Optional. Rendered only if provided. |
| `backLogoSource` | `ImageSourcePropType` | — | Optional. Shown on the back face; omitted entirely if not provided. |
| `frontGradientColors` | `[string, string]` | `['#2A2330', '#FFFFFF']` | Optional 2-stop gradient for the front face. |
| `backGradientColors` | `[string, string]` | `['#2A2330', '#FFFFFF']` | Optional 2-stop gradient for the back face. |
| `waveBackgroundSource` | `object` | bundled `wave-bg.json` | Optional Lottie source for the front-face background wave. |

### Types

```ts
interface HangingCardProps {
  name: string;
  role: string;
  phone?: string;
  email?: string;
  avatarSource: ImageSourcePropType;
  qrCodeSource?: ImageSourcePropType;
  backLogoSource?: ImageSourcePropType;
  frontGradientColors?: [string, string];
  backGradientColors?: [string, string];
  waveBackgroundSource?: object;
}
```

---

## 🔤 Fonts

Text elements use the **SpaceGrotesk** family (`SpaceGroteskMedium`, `SpaceGroteskSemiBold`), loaded in `_layout.tsx` via `expo-font` / `useFonts`. If the family isn't loaded, React Native falls back to the default system font silently — everything still works, you'll just get system-font weights instead of SpaceGrotesk.

---

## 📄 License

MIT — see [LICENSE](./LICENSE).

---

## 🧱 Stack

[Expo SDK 57](https://expo.dev/changelog) · [React Native Reanimated](https://docs.swmansion.com/react-native-reanimated/) · [React Native Gesture Handler](https://docs.swmansion.com/react-native-gesture-handler/) · [React Native Skia](https://shopify.github.io/react-native-skia/) · [Lottie React Native](https://github.com/lottie-react-native/lottie-react-native) · [Expo Linear Gradient](https://docs.expo.dev/versions/latest/sdk/linear-gradient/)
