/*
 * @Author: kasuie
 * @Date: 2024-06-12 19:52:57
 * @LastEditors: kasuie
 * @LastEditTime: 2024-06-29 15:40:01
 * @Description:
 */
"use client";
import { motion } from "framer-motion"; // 动画库
import { AppConfig } from "@/config/config"; // 导入 AppConfig 类型
import { AppRules } from "@/lib/rules"; // 导入配置规则
import { Form, FormObj } from "../ui/form/Form"; // 导入表单组件和表单对象类型
import { memo, useRef, useState } from "react"; // 从 React 导入的钩子
import { Button } from "../ui/button/Button";
import fetch from "@/lib/fetch"; // 导入的自定义 fetch 函数
import { useRouter } from "next/navigation"; // 导入的路由钩子
import message from "@/components/message";
import { Accordion, AccordionItem } from "@nextui-org/accordion"; // 导入的手风琴组件
import Link from "next/link"; // 从 next/link 导入的链接组件

const MemoizedForm = memo(Form); // 使用 memo 对 Form 组件进行性能优化，避免不必要的重新渲染

export const Settings = ({
  config,
  cardOpacity = 0.3,
}: {
  config: AppConfig;
  cardOpacity?: number;
}) => {
  const [result, setResult] = useState<FormObj>(config);
  const [loading, setLoading] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const router = useRouter();

  const onMerge = (data: FormObj, field?: string) => {
    setResult({
      ...result,
      ...(field ? { [field]: data } : data),
    });
  };

  const handleFileChange = (event: any) => {
    const file = event.target.files[0];
    if (!file) return;
    setLoading(true);
    const reader = new FileReader();
    reader.onload = (e: any) => {
      try {
        const config = JSON.parse(e.target.result);
        config && onSubmit(config);
      } catch (error) {
        setLoading(false);
        message.error("JSON 文件加载失败");
      }
    };
    reader.readAsText(file);
  };

  const onSubmit = (data?: FormObj) => {
    setLoading(true);
    fetch
      .post("/api/config", data || result)
      .then((res) => {
        if (res.success) {
          message.success(data ? "上传成功，配置已更新~" : "保存成功~");
          router.refresh();
        } else {
          message.error(res.message || "操作失败！");
        }
      })
      .catch((_) => message.error("操作失败！"))
      .finally(() => setLoading(false));
  };

  return (
    <motion.div className="flex h-[85vh] w-[95vw] flex-col items-center gap-4 overflow-hidden rounded p-4 text-[hsl(var(--mio-foreground)/1)] shadow-mio-link backdrop-blur-lg md:w-[65vw]">
      <div className="relative w-full md:text-center">
        <h1 className="text-2xl font-bold">当前配置</h1>
        <div className="absolute right-2 top-2 flex w-full flex-row items-center justify-end gap-2">
          <input
            ref={fileInputRef}
            onChange={handleFileChange}
            type="file"
            name="upload"
            accept=".json"
            hidden
          />
          <span
            className="cursor-pointer underline"
            onClick={() =>
              fileInputRef?.current && fileInputRef.current.click()
            }
          >
            上传配置
          </span>
          <Link className="underline" href={`/api/file`}>
            下载配置
          </Link>
        </div>
      </div>
      <Accordion
        showDivider
        className="mio-scroll flex w-full flex-col overflow-y-auto px-2"
        selectionMode="multiple"
      >
        {AppRules?.map(({ title, rules, field }) => {
          const form = field ? (config as any)[field as any] : config;
          return (
            <AccordionItem
              key={title}
              aria-label={title}
              title={
                <span className="flex flex-nowrap items-center gap-2">
                  <span className="h-2 w-2 rounded-full bg-[var(--primary-color)]"></span>
                  <span className="font-semibold">{title}</span>
                </span>
              }
            >
              {/* 用来显示和填写各种数据的表单 */}
              <MemoizedForm
                key={title}
                title={title}
                onMerge={(data: FormObj) => onMerge(data, field)}
                rules={rules}
                form={form}
              />
            </AccordionItem>
          );
        })}
      </Accordion>
      <div>
        <Button
          loading={loading}
          className="rounded-2xl"
          onClick={() => onSubmit()}
        >
          保存
        </Button>
      </div>
    </motion.div>
  );
};
