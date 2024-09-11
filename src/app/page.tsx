/*
 * @Author: kasuie
 * @Date: 2024-05-20 16:08:41
 * @LastEditors: aa
 * @LastEditTime: 2024-08-18 14:34:34
 * @Description: ./src/app/page.tsx
 */
import { Loader } from "@/components/ui/loader/Loader";
import { Suspense } from "react";
import { getConfig, transformConfig } from "@/lib/config";
import { MainEffect } from "@/components/effect/MainEffect";
import { getMotion } from "@/lib/motion";
import { Footer } from "@/components/layout/Footer";
import dynamic from "next/dynamic";
import { Controller } from "@/components/controller/Controller";
import { Weather } from "@/components/weather/Weather";

// 静态属性 revalidate 用于设置静态页面的重新验证时间 用于 Next.js 的增量静态再生成（ISR），表示页面不需要重新验证
export const revalidate = 0;
// 动态导入组件 以实现懒加载
const Horizontal = dynamic(
  async () => (await import("@/components/content/Horizontal")).Horizontal
);

const Vertical = dynamic(
  async () => (await import("@/components/content/Vertical")).Vertical
);

export default async function Home() {
  const {
    staticSites,
    modalSites,
    varStyle,
    istTransition,
    gapSize,
    style,
    bgConfig,
    footer,
    globalStyle,
    resources,
    ...others
  } = transformConfig(await getConfig("config.json"));

  const { bodyHtml } = resources || {};
  // 渲染主内容 据配置中的 style 属性，选择渲染 Horizontal 或 Vertical 组件
  const renderMain = (props: any) => {
    if (style === "horizontal") {
      return <Horizontal {...props} />;
    } else {
      return <Vertical {...props} />;
    }
  };

  // Suspense 组件包裹异步加载的内容，并在加载时显示 Loader 组件
  return (
    <Suspense
      fallback={
        <Loader warpClass="h-screen bg-black" miao>
          ᓚᘏᗢ猫猫正在努力加载...
        </Loader>
      }
    >
      {globalStyle?.weather && <Weather size={18} />}
      {renderMain({
        ...others,
        gapSize,
        istTransition,
        staticSites,
        modalSites,
        style: varStyle,
      })}
      {/* 渲染 MainEffect 组件，传递背景配置和动画效果  吃GPU */}
      <MainEffect
        bgArr={bgConfig.bgs}
        // 手机端背景
        mbgArr={bgConfig.mbgs}
        // 背景样式 主要是漂浮 特效
        bgStyle={bgConfig?.bgStyle}
        // 背景模糊特效 （特别吃GPU）
        blur={bgConfig?.blur || "sm"}
        theme={globalStyle?.theme} // 白天,黑夜模式
        motions={getMotion(0.1, 4, 0.2, istTransition)}
      />
      {/* 如果有 footer 配置，则渲染 Footer 组件 */}
      {footer ? (
        <Footer
          motions={getMotion(0.1, 4, 0.2, istTransition)}
          footer={footer}
        />
      ) : null}
      {/* 如果有 bodyHtml，则使用 dangerouslySetInnerHTML 渲染 HTML 内容 */}
      {bodyHtml && (
        <section
          id="remio-bodyHtml"
          className="relative z-20"
          dangerouslySetInnerHTML={{ __html: bodyHtml }}
        ></section>
      )}
    </Suspense>
  );
}
