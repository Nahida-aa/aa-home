import { Suspense } from 'react';
import { Loader } from '@/components/ui/loader/Loader';
// import { WakaTime } from "@aa/icon/WakaTime";
import { WakaTime } from "@/components/@aa/icon/WakaTime";

export default function WakaTimePage() {
  return (
    <Suspense fallback={<Loader />}>
      <h1>WakaTimePage</h1>
      <p>This is the WakaTimePage page.</p>
      <WakaTime />
    </Suspense>
  );
}