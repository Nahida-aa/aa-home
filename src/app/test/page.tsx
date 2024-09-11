import { Suspense } from "react";
import { Loader } from '@/components/ui/loader/Loader';
import { getConfig, transformConfig } from "@/lib/config";
import { MainEffect } from "@/components/effect/MainEffect";
import { getMotion } from "@/lib/motion";

export default async function Test() {
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
  return (
    <Suspense fallback={<Loader />}>
      <h1>Test</h1>
      <p>This is the Test page.</p>
      <img src="/public/star-192-rect.svg" alt="没有预料到的" />
      <MainEffect
        // bgArr={bgConfig.bgs}
        bgArr={[]}
        mbgArr={bgConfig.mbgs}
        bgStyle={bgConfig?.bgStyle}
        blur={bgConfig?.blur || "sm"}
        theme={globalStyle?.theme}
        // motions={getMotion(0.1, 4, 0.2, istTransition)}
      />
    </Suspense>
  );
}