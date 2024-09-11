/*
 * @Author: kasuie
 * @Date: 2024-06-04 14:53:15
 * @LastEditors: kasuie
 * @LastEditTime: 2024-06-18 11:39:49
 * @Description:
 */
"use client";

import { clsx, isValidUrl } from "@kasuie/utils";
import { motion } from "framer-motion";
import { SlidersConfig, Slider as SliderType } from "@/config/config";
import { Slider } from "../ui/slider/Slider";
import { useEffect, useState } from "react";
import { wakatimeStatSkill } from "@/lib/Wakatime/WakaTimeApi";

export const Sliders = ({
  dataSource = "self", // 新增 dataSource 属性，默认为 "self"
  data=[],
  color,
  title,
  cardOpacity,
  column = 2,
  motions = {},
}: SlidersConfig & {
  dataSource?: string; // 新增 dataSource 属性
  motions?: object;
  cardOpacity?: number;
}) => {
  console.log(`dataSource: ${dataSource}`)
  const [skills, setSkills] = useState<SliderType[]>(data);
  // console.log(`skills: ${skills}`)
  useEffect(() => {
    // DEBUG
    console.log(`useEffect: ${dataSource}`)
    const fetchData = async () => {
      try {
        const res = await fetch('/api/stat/wakatime/stats/skill');
        console.log(`res: ${res}`)
        if (res.ok) {
          const result = await res.json(); // 解析 JSON 格式的响应体
          setSkills(result);
        } else {
          const errorResult = await res.json();
          console.error('Error fetching data:', errorResult.error);
        }
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    if (dataSource === 'wakatime') {
      console.log(`dataSource: ${dataSource}`);
      fetchData();
    } else {
      setSkills(data);
    }
  }, [dataSource, data]);
  
  if (!skills?.length) return null;

  return (
    <motion.div
      style={{
        backgroundColor: `rgba(var(--mio-main), ${cardOpacity})`,
      }}
      className="z-[1] mb-8 w-[95vw] rounded p-4 pb-8 text-white/90 shadow-mio-link backdrop-blur md:w-[65vw]"
      {...motions}
    >
      {title && (
        <div className="mb-2 flex flex-nowrap items-center gap-2">
            <span className="ml-1 h-2 w-2 rounded-full bg-[var(--primary-color)]"></span>
          <span className="text-sm">{title}</span>
        </div>
      )}
      <ul className="relative flex flex-wrap justify-between gap-y-2 px-[2px]">
        {skills?.map((v: SliderType, index: number) => {
          return (
            <Slider
              key={index}
              warpClass={clsx("", {
                "md:w-[49%]": column === 2,
                "lg:w-[33%] md:w-[49%]": column === 3,
                "xl:w-[24%] lg:w-[33%] md:w-[49%]": column >= 4,
              })}
              {...v}
              color={v.color || color}
              // time={v.time} // 传递 time 属性
              // time={"605 hrs 53 mins"} // 传递 time 属性
            >
              {v.title}
            </Slider>
          );
        })}
      </ul>
    </motion.div>
  );
};
