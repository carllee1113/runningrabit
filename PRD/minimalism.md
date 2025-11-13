# Minimalism UI Design System (Monochrome Variant)

Version: v2.0 — 2025-11-11

Purpose
- A reusable, app-agnostic minimal UI spec for any project.
- Encodes the ArleeLedger visual language with no accent color; use neutral/black CTAs.
 - When referencing the legacy JSON below, ignore accent guidance and follow monochrome notes.

Design Principles
- Less is more: prioritize clarity and function over decoration.
- Mobile-first: design starts at small viewports with scalable spacing and type.
- Flat design: no gradients or heavy shadows; subtle borders and clean surfaces.
- Consistent rhythm: 8px spacing grid; limited colors; clear hierarchy.

Color System
- Background: `#FFFFFF` (`bg-white`), surface: `#F9FAFB` (`bg-gray-50`).
- Text: `#111827` (`text-gray-900`), secondary: `#374151` (`text-gray-700`).
- CTAs (primary): neutral/black (`bg-black text-white`).
- Neutrals: gray ramp `#374151` → `#E5E7EB` (`gray-800` to `gray-200`).
- Danger: `#DC2626` Tailwind `red-600` (`bg-red-600`, `text-red-600`).
- Disabled: `#A9A9A9` (approx `text-gray-400` / `bg-gray-300`).

CSS Tokens (recommended)
```css
:root {
  --color-primary: #000000; /* neutral/black primary CTA */
  --color-bg: #FFFFFF;
  --color-text: #111827; /* gray-900 */
  --color-muted: #374151; /* gray-700 */
  --color-border: #E5E7EB; /* gray-200 */
}
```

Typography
- Font family: `Inter` as primary Sans-serif.
- Headings: weight 600–700, sizes 24–48px; tracking-tight for titles.
- Body: weight 400, 14–16px; line-height 1.6–1.8.
- Small text: 12–13px for labels/hints.
- Accessibility: maintain WCAG AA contrast; avoid ultra-light grays for text.

Layout & Spacing
- Grid: 8px spacing baseline (e.g., `p-4`, `gap-4`).
- Containers: width responsive; ample whitespace around content blocks.
- Cards: `bg-white border border-gray-200 rounded-md p-4 shadow-sm` (optional shadow; keep subtle).

Components
- Primary Button
 - Style: `bg-black text-white hover:opacity-90 disabled:opacity-60`
  - Size: `px-3–4 py-1.5–2`, radius `rounded-md`.
- Secondary Button
  - Style: `bg-gray-200 text-gray-900 hover:bg-gray-300`
- Danger Button
  - Style: `bg-red-600 text-white hover:bg-red-700`
- Links
 - Primary action: `text-gray-900 underline` for navigational CTAs.
  - Regular navigation: `text-gray-700 hover:text-gray-900`.
- Inputs
  - Base: `border border-gray-300 rounded-md px-3 py-2`
  - Focus: `focus:outline-none focus:ring-2 focus:ring-gray-500`
  - Error: `border-red-600 text-red-600` with friendly message.

Charts (Dashboard)
- Line/Bar Chart
 - Income series: neutral black `#111827` or gray-800 `#1F2937` (`stroke`/`fill`).
  - Expense series: neutral gray `#6B7280`.
  - Net series: light gray `#9CA3AF`.
  - Axes/labels: `#9CA3AF` for ticks; labels at `10–12px`.
  - Container: card style as above; responsive `viewBox`.
- Pie Chart (Expense by Category)
 - First slice: neutral black `#111827` or gray-800 `#1F2937`.
  - Remaining slices: gray ramp `#374151`, `#4B5563`, `#6B7280`, `#9CA3AF`, `#D1D5DB`, `#E5E7EB`.
  - Legend: small colored dot + label + percentage.

States & Feedback
 - Success/info: `text-gray-900` for confirmations.
- Errors: `text-red-600` with concise, helpful copy.
- Loading: small, unobtrusive indicators; avoid spinners dominating layout.

Accessibility & Usability
- Touch targets: ≥44×44px (buttons, links with large tap areas).
 - Keyboard: visible focus rings (`ring-gray-500` for primary actions).
- Alt text: all images and icons should have descriptive alt or `aria-label`.
- Contrast: verify with tooling; avoid low-contrast text on light backgrounds.

Responsive Rules
- Mobile-first: stack content vertically; `w-full` containers; readable sizes.
- Breakpoints: enhance spacing (`gap-6`), type sizes for larger screens (`md:text-xl`).
- Avoid hiding critical actions behind non-obvious menus on mobile.

Tailwind Class Reference (quick map)
 - CTAs: `bg-black text-white`, `ring-gray-500`.
- Neutrals: `bg-gray-50/200`, `text-gray-700/900`, `border-gray-200/300`.
- Cards: `bg-white border border-gray-200 rounded-md p-4 shadow-sm`.
- Buttons: `rounded-md px-3 py-1.5 text-sm` with role-based colors.

Product Page Style Alignment
- Adopt clean product pages with uncluttered layouts and minimal CTAs.
- Emphasize whitespace and short copy; avoid dense feature lists on the hero.
- Default to neutral surfaces and black/gray text; eliminate colored accents and use black for CTAs.
- Cards: prefer border-only, shadow-free at rest; keep `shadow-sm` optional.
- CTAs: use neutral/black across the app; remove colored accents entirely.
- Navigation and sections are simple, flat, and legible; no decorative backgrounds.

Landing Page Guidelines (app overview)
- Hero: short statement of aim/purpose in one sentence; supporting line ≤120 characters.
- Primary CTA: `bg-black text-white`.
- Secondary CTA: `bg-gray-200 text-gray-900` or link `text-gray-900 underline`.
- Features grid: 4–6 concise cards; each card ≤2 lines of description.
- Footer or note: point to dashboard after auth; keep copy short and direct.

Adoption Checklist (for any app)
- Install and use `Inter`; set body `bg-white text-gray-900`.
- Define CSS tokens and Tailwind class usage as above.
- Standardize buttons (primary/secondary/danger) and inputs.
- Use black for primary actions; grays for supporting visuals.
- Ensure charts use monochrome neutrals; no colored accents.
- Validate contrast and keyboard focus across pages.

Monochrome Adoption Notes
- This variant removes accent colors entirely. Use neutral/black CTAs (`bg-black text-white`) and gray focus rings (`ring-gray-500`).
- Charts must use grayscale tones only (`#111827`, `#374151`, `#6B7280`, `#9CA3AF`, `#D1D5DB`, `#E5E7EB`).
- Replace legacy accent classes with monochrome equivalents: `text-gray-900`, `bg-black`, `ring-gray-500`.

Changelog
- v2.0 (2025-11-11): Adopt monochrome variant, remove legacy accent references, unify chart colors, apply minimal card styles and Inter font.

---
# 極簡主義 UI 設計描述文檔 (JSON)

```json
{
  "design_philosophy": {
    "name": "極簡主義 UI 設計",
    "english_name": "Minimalism UI Design",
    "core_principle": "少即是多（Less is More）",
    "philosophy_description": "以簡約、功能性和去除不必要元素為核心的設計理念，強調簡潔、清晰和功能優先的視覺體驗",
    "historical_influence": [
      "包豪斯（Bauhaus）",
      "荷蘭風格派（De Stijl）",
      "日本禪宗美學"
    ]
  },
  "core_design_principles": {
    "simplicity": {
      "name": "簡約與清晰性",
      "description": "僅保留必要的元素來創建功能性且美觀的界面",
      "key_points": [
        "每個元素都必須有明確的目的",
        "移除所有多餘的裝飾",
        "減少用戶的認知負擔",
        "快速的理解和互動"
      ]
    },
    "whitespace": {
      "name": "留白空間（Negative Space）",
      "description": "為視覺元素提供呼吸空間，引導用戶視線",
      "key_points": [
        "不一定要是白色，可以是任何空間",
        "增強視覺平衡",
        "提升內容可讀性",
        "減少視覺擁擠感"
      ]
    },
    "function_first": {
      "name": "功能優於形式",
      "description": "優先考慮功能性而非純粹的美學",
      "key_points": [
        "支持用戶旅程",
        "與產品目的保持一致",
        "美學與功能相協調",
        "實用性為首要目標"
      ]
    }
  },
  "visual_characteristics": {
    "design_style": {
      "name": "扁平化設計（Flat Design）",
      "description": "避免擬物化的紋理和效果，強調二維元素和純色",
      "characteristics": [
        "無漸變效果",
        "無陰影效果",
        "無 3D 效果",
        "簡化的圖標設計",
        "乾淨現代的美學"
      ]
    },
    "color_palette": {
      "name": "有限的色彩調色板",
      "description": "採用有限或單色調色板，主要使用中性色調",
      "primary_colors": {
        "white": {
          "hex": "#FFFFFF",
          "meaning": "純淨、簡約、清潔感"
        },
        "black": {
          "hex": "#000000",
          "meaning": "強烈對比、優雅、奢華"
        },
        "gray": {
          "hex": "#808080",
          "meaning": "柔和外觀、深度、精緻感"
        },
        "beige_cream": {
          "hex": "#F5E6D3",
          "meaning": "溫暖感、柔和感"
        }
      },
      "accent_colors": {
        "soft_gray": {
          "hex": "#A9A9A9",
          "meaning": "中立、禁用狀態",
          "usage": "禁用按鈕、次要操作"
        }
      },
      "recommendation": "1-3 種主要色調 + 1-2 種強調色"
    },
    "typography": {
      "name": "簡潔的字體排版",
      "font_family": {
        "primary": "Sans-serif（無襯線字體）",
        "examples": [
          "Helvetica",
          "Inter",
          "Roboto",
          "Open Sans",
          "Segoe UI"
        ]
      },
      "font_characteristics": [
        "乾淨易讀",
        "均勻的筆畫寬度",
        "現代感",
        "高度可讀性"
      ],
      "font_usage": {
        "font_family_count": "1-2 種字體家族",
        "heading": {
          "font_weight": "600-700（Semi-bold to Bold）",
          "size_range": "24px-48px",
          "description": "強調主標題，建立視覺層次"
        },
        "body": {
          "font_weight": "400（Regular）",
          "size_range": "14px-16px",
          "description": "正文內容，易於閱讀"
        },
        "small_text": {
          "font_weight": "400-500",
          "size_range": "12px-13px",
          "description": "幫助性文字、標籤、提示"
        }
      },
      "best_practices": [
        "充足的行間距（1.5-1.8）",
        "充足的字母間距",
        "清晰的對比度（WCAG AA 標準最少）",
        "使用字體大小和粗細建立層次"
      ]
    },
    "visual_hierarchy": {
      "name": "清晰的視覺層次",
      "methods": [
        {
          "method": "大小",
          "description": "重要元素使用更大的尺寸"
        },
        {
          "method": "對比度",
          "description": "主要操作使用高對比色"
        },
        {
          "method": "間距",
          "description": "使用間距分隔和分組元素"
        },
        {
          "method": "顏色",
          "description": "強調色用於吸引注意力到主要操作"
        },
        {
          "method": "字體粗細",
          "description": "粗體用於強調，正常體用於支持"
        }
      ]
    },
    "icon_design": {
      "name": "圖標設計",
      "characteristics": [
        "簡化的幾何形狀",
        "一致的線條寬度",
        "易於識別",
        "可縮放的向量格式（SVG）",
        "單色或雙色設計"
      ],
      "style": "扁平化、線性或面性圖標"
    }
  },
  "layout_components": {
    "grid_system": {
      "name": "網格佈局結構",
      "description": "使用規則的網格系統組織內容",
      "characteristics": [
        "對齐和秩序",
        "一致的間距",
        "適應式設計",
        "易於維護性"
      ]
    },
    "buttons": {
      "name": "按鈕設計",
      "primary_button": {
        "background": "強調色（如柔和藍色）",
        "text": "白色或對比色",
        "padding": "12px-16px",
        "border_radius": "4px-8px",
        "shadow": "無"
      },
      "secondary_button": {
        "background": "淡色或透明",
        "border": "1px 實線邊框",
        "text": "深色文字",
        "padding": "12px-16px",
        "border_radius": "4px-8px"
      },
      "characteristics": [
        "清晰的操作意圖",
        "足夠的點擊區域（最小 44x44px）",
        "明確的懸停和活動狀態",
        "無複雜的漸變或陰影"
      ]
    },
    "cards": {
      "name": "卡片組件",
      "characteristics": [
        "簡潔的邊框或淡色背景",
        "清晰的內容分隔",
        "足夠的內部間距",
        "可選的柔和陰影或邊框"
      ]
    },
    "navigation": {
      "name": "導航設計",
      "characteristics": [
        "簡化的導航結構",
        "清晰的標籤",
        "直觀的流程",
        "最小化的菜單項"
      ],
      "types": [
        "頂部導航欄",
        "側邊欄導航",
        "底部標籤欄（移動端）",
        "麵包屑導航"
      ]
    }
  },
  "design_benefits": [
    {
      "benefit": "提升可用性",
      "description": "快速理解和互動，更滿意的用戶體驗"
    },
    {
      "benefit": "更快的載入時間",
      "description": "圖形元素較少，代碼結構簡單"
    },
    {
      "benefit": "專注於內容",
      "description": "將焦點直接放在內容和功能上"
    },
    {
      "benefit": "永恆的美學",
      "description": "乾淨整潔的外觀經得起時間考驗"
    },
    {
      "benefit": "易於維護",
      "description": "簡單的代碼和設計系統更容易維護"
    }
  ],
  "trae_prompt_templates": {
    "basic_description": "極簡 UI 設計，採用扁平化風格，大量留白空間，有限的中性色調色板（白色、灰色、米色），乾淨的無襯線字體排版，簡潔的幾何圖形元素，清晰的視覺層次，功能性優先，無陰影、漸變或裝飾性元素，直觀的導航流程，專注於核心內容和操作",
    "detailed_description": "現代極簡主義界面設計，以白色和淺灰為主色調，搭配單一強調色（如柔和藍色 #5B9BD5），使用大量負空間營造呼吸感，採用簡潔的 Sans-serif 字體（如 Inter 或 Roboto），扁平化圖標設計，無紋理和陰影效果，清晰的按鈕和 CTA 元素，網格佈局結構，內容居中排版，簡化的導航模式，專注於用戶任務流程",
    "minimalist_dashboard": "極簡主義數據儀表板設計，白色背景，灰色文字，單色圖表，扁平化圖標，清晰的網格佈局，大量留白，簡潔的 KPI 卡片，無複雜的視覺效果，強調信息層次，易於掃描和閱讀",
    "mobile_minimalist": "極簡主義移動應用界面，白色和淺灰色調，單一強調色，大尺寸可點擊目標（最小 44x44px），寬敞的垂直間距，簡潔的底部導航，扁平化設計，無陰影或深度效果，內容優先，快速加載"
  },
  "dos_and_donts": {
    "dos": [
      "✓ 使用充足的留白空間",
      "✓ 保持調色板有限（3-5 種顏色）",
      "✓ 使用乾淨的無襯線字體",
      "✓ 優先考慮功能性",
      "✓ 建立清晰的視覺層次",
      "✓ 使用一致的間距和對齊",
      "✓ 測試可讀性和可訪問性",
      "✓ 使用單色或雙色圖標"
    ],
    "donts": [
      "✗ 避免過度使用顏色",
      "✗ 避免複雜的紋理和效果",
      "✗ 避免使用太多字體家族（>2）",
      "✗ 避免陰影、漸變和 3D 效果",
      "✗ 避免擁擠的佈局",
      "✗ 避免不必要的動畫",
      "✗ 避免低對比度的文字",
      "✗ 避免混亂的導航結構"
    ]
  },
  "implementation_checklist": {
    "color": [
      "選定主色調（白色、淡灰色）",
      "選定次要中性色（深灰色、米色）",
      "選定 1-2 種強調色",
      "驗證對比度符合 WCAG 標準"
    ],
    "typography": [
      "選定 1-2 種 Sans-serif 字體",
      "定義標題、正文和小文字的大小",
      "設定適當的行高和字母間距",
      "測試可讀性"
    ],
    "layout": [
      "建立網格系統（如 8px 或 12px）",
      "定義間距規範",
      "設計基本組件（按鈕、卡片、表單等）",
      "驗證適應式設計"
    ],
    "icons": [
      "建立一致的圖標風格",
      "使用向量格式（SVG）",
      "定義圖標大小規範",
      "確保清晰度和可識別性"
    ],
    "accessibility": [
      "驗證所有對比度",
      "確保可點擊元素足夠大（最小 44x44px）",
      "提供替代文本",
      "測試鍵盤導航"
    ]
  }
}
```
