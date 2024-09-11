/*
 * @Author: kasuie
 * @Date: 2024-06-04 14:50:02
 * @LastEditors: kasuie
 * @LastEditTime: 2024-06-04 21:19:57
 * @Description:
 */
export const Slider = ({
  className = "",
  warpClass = "",
  children,
  value = 0,
  title,
  color = "#fff",
  time, // 新增 time 属性
}: {
  className?: string;
  warpClass?: string;
  children?: React.ReactNode | string;
  value?: number;
  title?: string;
  color?: string;
  time?: string; // 新增 time 属性
}) => {
  return (
    <li title={title} className={`flex w-full flex-col gap-1 ${warpClass}`}>
      <div>
        <label className="text-xs font-medium">{title}</label>
        {time && <span className="text-xs ml-2">({time})</span>}
      </div>
      <div className="relative h-[3px] w-full overflow-hidden rounded-full bg-white/30">
        <div
          className="absolute h-full duration-150"
          style={{
            left: "0",
            width: `${value}%`,
            background: color,
          }}
        ></div>
      </div>
    </li>
  );
};
