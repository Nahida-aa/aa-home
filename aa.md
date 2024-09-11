# aa

**project structure**
```yml
aa_modules/:
  - @aa/:
    - icon./:
      - dist/
      - node_modules/
      - package.json
.next/   # Next.js 构建输出目录，通常不需要手动修改
public/ # 静态文件目录，放置在这里的文件可以通过根路径访问
src/:
  app/:
    api/:
      - config/: route.ts
      - file/: route.ts
      - manifest/: route.ts
      - verfy/: route.ts
      - weather/: route.ts
      - stat/:
        - route.ts
        - wakatime/:
          - route.ts
    - test/: page.tsx
    - config/: page.tsx
    - error.tsx
    - layout.tsx
    - page.tsx
  components/:
    - cards/: FlipCard.tsx
    - content/:
      - Horizontal.tsx
      - Vertical.tsx
    - controller/: Controller.tsx
    - effect/: # 效果组件
      - HoriTextEffect.tsx
      - MainEffect.tsx
      - TextEffect.tsx
    - layout/:
      - Footer.tsx
      - Layout.tsx
      - StyleRegistry.tsx
    - links/: Links.tsx
    - message/: 
      - Message.tsx
      - index.tsx
    - player/: Player.tsx # 播放器组件
    - settings/: Settings.tsx
    - sliders/: Sliders.tsx # 滑块组件
    - social-icons/: SocialIcons.tsx # 社交图标组件
    - ui/:
      - button/: Button.tsx
      - checkbox/: Checkbox.tsx
      - form/:
        - Form.tsx
        - FormList.tsx
      - image/:
        - Avatar.tsx
        - Image.tsx
      - input/: Input.tsx
      - loader/: Loader.tsx
      - modal/: 
        - Modal.tsx
        - useModal.tsx
      - radio/: Radio.tsx
      - select/: Select.tsx
      - slider/: Slider.tsx
      - switch/:
        - MuteSwitcher.tsx
        - ThemeSwitcher.tsx
      - textarea/: Textarea.tsx
      - transition/: 
        - ATransition.tsx
        - factor.tsx
        - TextUpView.tsx
        - typings.ts
    - verify/: Verify.tsx
    - weather/: Weather.tsx
  config/:
    - config.d.ts
    - config.json
  constants/: - api.ts
  lib/:
    - api.ts
    - config.ts
    - fetch.ts
    - motion.ts
    - rules.ts
    - utils.ts
  providers/: # 上下文提供者组件
    - index.tsx # 上下文提供者组件入口文件
    - StyleJsxProvider.tsx # 样式提供者组件
  style/:
    - global.css
    - index.css # 引入其他css
    - tailwind.css
    - theme.css
  middleware.ts
.commitlintrc.js # Commitlint 配置文件，用于规范 Git 提交信息
next-env.d.ts
next.config.mjs
package.json
postcss.config.mjs
tailwind.config.ts
tsconfig.json
.env
```

## ./

### package.json
```json
{
  "name": "remio-home",
  "version": "0.1.0",
  "private": true,
  "scripts": {
    "dev": "next dev",
    "build": "next build",
    "start": "next start",
    "lint": "next lint",
    "lint-staged": "lint-staged --allow-empty",
    "prepare": "husky install"
  },
  "author": "kasuie <i@kasuie.cc>",
  "license": "MIT",
  "dependencies": {
    "@kasuie/http": "^0.0.16",
    "@kasuie/icon": "^0.0.14",
    "@kasuie/utils": "^0.0.14",
    "@next/third-parties": "^14.2.3",
    "@nextui-org/accordion": "^2.0.34",
    "@nextui-org/checkbox": "^2.1.1",
    "@nextui-org/input": "^2.2.1",
    "@nextui-org/radio": "^2.1.1",
    "@nextui-org/select": "^2.2.1",
    "@nextui-org/system": "^2.2.1",
    "@nextui-org/theme": "^2.2.5",
    "crypto-js": "^4.2.0", // 加密库
    "framer-motion": "^11.2.9", // 动画库
    "next": "14.2.3",
    "next-pwa": "^5.6.0",  // 用于 PWA 支持的 Next.js 插件
    "next-themes": "^0.3.0",  // 用于主题切换的 Next.js 插件
    "react": "^18",
    "react-dom": "^18"  // React 及其 DOM 渲染库
  },
  "devDependencies": {
    "@commitlint/cli": "^19.1.0",
    "@commitlint/config-conventional": "^19.1.0",
    "@kasuie/prettier": "^0.1.9",
    "@types/crypto-js": "^4.2.2",
    "@types/node": "^20",
    "@types/react": "^18",
    "@types/react-dom": "^18",
    "eslint": "^8",
    "eslint-config-next": "14.2.3",
    "husky": "^9.0.11",
    "lint-staged": "^15.2.2",
    "postcss": "^8",
    "tailwindcss": "^3.4.1",
    "typescript": "^5"
  },
  "lint-staged": {
    //  在提交时对所有 JavaScript 和 TypeScript 文件运行 eslint --fix
    "*.{js,jsx,ts,tsx}": "eslint --fix"
  },
  "config": {
    "commitizen": {
      "path": "./node_modules/cz-conventional-changelog"
    }
  }
}
```

### next.config.mjs
```js
/** @type {import('next').NextConfig} */
import nextPWA from "next-pwa";

const isProd = process.env.NODE_ENV === "production";

const withPWA = nextPWA({
  dest: "public", // PWA 文件的输出目录
  register: true, // 是否注册 service worker
  skipWaiting: true, // 是否跳过等待，立即激活新的 service worker
  disable: !isProd, // 是否禁用 PWA 功能，非生产环境下禁用
});

const nextConfig = {
  output: "standalone", //  standalone，使应用可以作为独立的服务器运行
  eslint: {
    ignoreDuringBuilds: true, // 在构建过程中忽略 ESLint 错误
  },
  webpack: (config, { isServer }) => {
    if (!isServer) { // 在客户端环境下
      config.resolve.fallback = {
        fs: false, // 禁用 fs 模块
      };
    }
    return config;
  },
  images: { // 图片优化配置
    minimumCacheTTL: 60, // 设置图片缓存的最小生存时间
    remotePatterns: [ // 配置允许加载远程图片的域名
      {
        protocol: "https",
        hostname: "cdn.staticaly.com",
      },
      {
        protocol: "https",
        hostname: "cdn.jsdelivr.net",
      },
      {
        protocol: "https",
        hostname: "pixiv.re",
      },
    ],
  },
};

export default withPWA(nextConfig);
```

### tsconfig.json
定义了 TypeScript 编译器的行为和项目的结构
```json
{
  "compilerOptions": {
    "lib": ["dom", "dom.iterable", "esnext"], // 指定要包含在编译中的库
    "allowJs": true, // 允许编译 JavaScript 文件
    "skipLibCheck": true, //跳过库文件的类型检查
    "strict": true, // 启用所有严格类型检查选项
    "noEmit": true, // 不生成输出文件
    "esModuleInterop": true, // 启用 ES 模块互操作性
    "module": "esnext", // 指定生成的模块代码类型
    "moduleResolution": "bundler", // 指定模块解析策略
    "resolveJsonModule": true, // 允许导入 JSON 模块
    "isolatedModules": true, // 启用每个文件的单独编译
    "jsx": "preserve", // 指定 JSX 代码的处理方式
    "incremental": true, // 启用增量编译
    "plugins": [
      {
        "name": "next"
      }
    ],
    "paths": { // 配置模块路径别名
      "@/*": ["./src/*"]
    }
  },
  "include": ["next-env.d.ts", "**/*.ts", "**/*.tsx", ".next/types/**/*.ts"], // 指定要包含在编译中的文件
  "exclude": ["node_modules"] // 指定要排除在编译之外的文件
}
```

## src/app/

### src/app/page.tsx
应用的主页组件,应用的主要入口和渲染逻辑

### src/app/layout.tsx
布局组件，通常用于定义应用的整体布局结构，如头部、底部和主要内容区域

### src/app/error.tsx

### src/app/test/

```tsx
import { Suspense } from "react";
import { Loader } from '@/components/ui/loader/Loader';

// 写法 1
const Test = () => {
  return (
    <Suspense fallback={<Loader />}>
      <h1>Test</h1>
      <p>This is the Test page.</p>
    </Suspense>
  );
};

export default Test;

// 写法 2
export default () => {
  return (
    <Suspense fallback={<Loader />}>
      <h1>Test</h1>
      <p>This is the Test page.</p>
    </Suspense>
  );
};

// 写法 3
export default function Test() {
  return (
    <Suspense fallback={<Loader />}>
      <h1>Test</h1>
      <p>This is the Test page.</p>
    </Suspense>
  );
}

// 写法 4
function Test() {
  return (
    <Suspense fallback={<Loader />}>
      <h1>Test</h1>
      <p>This is the Test page.</p>
    </Suspense>
  );
}
export default Test;
```

### src/app/config/

## src/app/api/

## src/components/

## src/style/

### src/style/index.css
```css
@import "./theme.css";
@import "./tailwindcss.css";
@import "./globals.css";
@import "@kasuie/icon/dist/index.css";
```

### src/style/theme.css
```css
:root {
  --mio-main: 255, 255, 255;

  --mio-bg: 249, 249, 249;
  --mio-out-bg: 255, 255, 255;
  --mio-header-bg: 255, 255, 255;
  --mio-aside-bg: 240, 242, 244;

  --mio-text-color: 51, 51, 51;
  --mio-text-default: 0, 0, 0;

  --background-start-rgb: 214, 219, 220;
  --background-end-rgb: 255, 255, 255;

  /* #18ef30 #1c77ff #ffc007 #f13443*/
  --mio-message-success: 24, 239, 48;
  --mio-message-info: 28, 119, 255;
  --mio-message-warning: 255, 192, 7;
  --mio-message-error: 241, 52, 67;
}

@media (prefers-color-scheme: dark) {
  .dark,
  [data-theme="dark"] {
    /*dark*/
    color-scheme: dark;
    --mio-main: 0, 0, 0;

    --mio-bg: 27, 29, 31;
    --mio-out-bg: 44, 46, 47;
    --mio-header-bg: 34, 36, 37;
    --mio-aside-bg: 44, 46, 47;

    --mio-text-color: 198, 201, 207;
    --mio-text-default: 255, 255, 255;

    --background-start-rgb: 0, 0, 0;
    --background-end-rgb: 0, 0, 0;

    --mio-message-success: 24, 239, 48;
    --mio-message-info: 28, 119, 255;
    --mio-message-warning: 255, 192, 7;
    --mio-message-error: 241, 52, 67;
  }
}
```
