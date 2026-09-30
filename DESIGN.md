---
version: alpha
name: "Sinan Mert Şener Portfolio"
description: "Yumusak komur siyahi, kirik beyaz tipografi, kalin basliklar; teal yalnizca durum vurgusu. Once kisi, sonra kanit; kolay taranan metin."
colors:
  primary: "#f5f2ed"
  body: "#dcd8d1"
  secondary: "#a39e95"
  tertiary: "#58d7bf"
  tertiary-hover: "#7ae2cf"
  neutral: "#151413"
  surface: "#1d1c1a"
  surface-hover: "#242320"
  on-surface: "#f5f2ed"
  border: "#2e2c29"
  border-strong: "#3f3c38"
  tag: "#262421"
  on-tag: "#d5d1ca"
  on-tertiary: "#0a0a0a"
  warning: "#eab765"
  error: "#ff9b8f"
  focus-ring: "#58d7bf"
typography:
  display:
    fontFamily: Onest
    fontSize: "76px"
    fontWeight: 800
    lineHeight: 1
    letterSpacing: -0.04em
  headline-lg:
    fontFamily: Onest
    fontSize: "44px"
    fontWeight: 800
    lineHeight: 1.05
    letterSpacing: -0.035em
  headline-md:
    fontFamily: Onest
    fontSize: "34px"
    fontWeight: 750
    lineHeight: 1.15
    letterSpacing: -0.025em
  title-md:
    fontFamily: Onest
    fontSize: "26px"
    fontWeight: 750
    lineHeight: 1.15
  figure:
    fontFamily: Onest
    fontSize: "48px"
    fontWeight: 800
    lineHeight: 1
  body-lg:
    fontFamily: Onest
    fontSize: "22px"
    fontWeight: 420
    lineHeight: 1.5
  body-md:
    fontFamily: Onest
    fontSize: "18px"
    fontWeight: 420
    lineHeight: 1.65
  body-sm:
    fontFamily: Onest
    fontSize: "16px"
    fontWeight: 420
    lineHeight: 1.5
  label-md:
    fontFamily: Onest
    fontSize: "16px"
    fontWeight: 600
    lineHeight: 1.2
  caption:
    fontFamily: Onest
    fontSize: "14px"
    fontWeight: 500
    lineHeight: 1.4
rounded:
  sm: "8px"
  md: "12px"
  lg: "20px"
  full: "999px"
spacing:
  unit: "4px"
  control-gap: "12px"
  content-gap: "24px"
  section-gap: "104px"
components:
  button-primary:
    backgroundColor: "{colors.primary}"
    textColor: "{colors.neutral}"
    typography: "{typography.label-md}"
    rounded: "{rounded.md}"
    padding: "12px 20px"
  button-secondary:
    backgroundColor: "{colors.neutral}"
    textColor: "{colors.primary}"
    typography: "{typography.label-md}"
    rounded: "{rounded.md}"
    padding: "12px 20px"
  surface:
    backgroundColor: "{colors.surface}"
    rounded: "{rounded.lg}"
    padding: "32px"
  tag:
    backgroundColor: "{colors.tag}"
    textColor: "{colors.on-tag}"
    typography: "{typography.body-sm}"
    rounded: "{rounded.sm}"
    padding: "5px 12px"
---

# Sinan Mert Şener Portfolio

## Overview

Hedef okur Türkiye'deki İK ve işe alım uzmanları. İlk bakışta kişi görünür: büyük portre, isim, rol, CV. Hemen yanında iddia ("Sahada üç ürün") ve kanıtı olan ürünler. Masaüstünde sol profil kartı sabit kalır.

Sahibin geri bildirimi (2026-09-30): renkler yumuşak olsun, yazılar "duvar gibi" durmasın, okuma isteği artsın. Bu yüzden: büyük gövde yazısı, tek okunaklı font, kısa cümleler, kalın anahtar kelimeler, ikonlu özellik listesi, teknoloji etiketleri, deneyimde iki büyük sayı.

- Audience and feel: developer, calm, trustworthy, premium. Göz yormayan sıcak kömür siyahı, parlama yok, animasyon yok.
- Page shape: **Photographic**, portre ilk ekranın odağı. Sonrası kısa, taranabilir bir kanıt listesi.
- Structure: Deep Tide (glass-deep-tide) katmanları; zemin, çalışma yüzeyi, yüzen kontroller.

## Colors

Soft warm charcoal canvas #151413 (never pure black), surfaces #1d1c1a, hairlines #2e2c29. Headings soft white #f5f2ed (16.5:1), reading text #dcd8d1 (13:1), labels #a39e95 (6.4:1 on surface). Primary action is soft white on charcoal. Teal #58d7bf only as the brand signal: "Sahada" badges, availability, fact and feature icons, usage counts, focus ring, active mobile tab. Amber #eab765 only for "in development".

## Typography

One family, **Onest** (variable 300–800, large x-height, open shapes), self-hosted from `src/fonts`, latin + latin-ext for Turkish. Hierarchy comes from a decisive scale (76px claim, 44px sections, 26–34px titles, 18px body) and weight (800 headings, 420 body, 650 bold keywords).

- Body text 18px on desktop, 17px on phones; nothing readable below 14px.
- Key phrases in sentences are bold and one step brighter so a scanning reader catches them.
- Sentence case; no eyebrows, no uppercase tracked labels, no painted headline words.

## Layout

- Desktop: sticky profile card on the left (portrait, name, status, CV, section links), content on the right.
- Products are surfaces; the featured one lists four features with icons (no boxes inside the card); every product ends with technology tags. Technologies sit on the canvas as ruled rows.
- Experience opens with two large figures (1 yıl yazılım, 25+ ülke; süreler "1 yıl 2 ay" biçiminde yazılır), then a CV-like list with duration badges.
- Mobile: profile first, then content; the floating bottom navigation the owner explicitly wants stays.

## Elevation & Depth

Depth by lightness steps. Resting surfaces: 1px #2e2c29 border, no shadow; hover lightens the surface. Only the floating mobile navigation carries shadow and blur.

## Shapes

8px tags and small controls, 12px buttons and feature tiles, 20px surfaces; badges are pills.

## Components

- Every control ships hover, focus-visible (teal ring), active; icon-only controls have an accessible name.
- Icons: Lucide outline 1.75px, only where they depict the thing (role, education, languages, QR, stations, offline, data protection, download, mail).
- Motion: only 160–180ms colour/border transitions on interaction.

## Do's and Don'ts

- Do: short sentences, one idea each; bold the phrase that matters.
- Do: real content from the owner's CV and live site only.
- Don't: walls of text, label/value forms, product diagrams in the hero, gradients, glow, reveal-on-scroll, glass on resting surfaces.
