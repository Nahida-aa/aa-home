/*
 * @Author: kasuie
 * @Date: 2024-06-06 21:23:41
 * @LastEditors: kasuie
 * @LastEditTime: 2024-06-11 17:28:55
 * @Description:
 */
"use client";

import { forwardRef, memo, useState } from "react";
import { motion } from "framer-motion";
import type {
  HTMLMotionProps,
  MotionProps,
  Spring,
  Target,
  TargetAndTransition,
} from "framer-motion";
import type {
  ForwardRefExoticComponent,
  PropsWithChildren,
  RefAttributes,
} from "react";
import type { BaseTransitionProps } from "./typings";

// import { isHydrationEnded } from '~/components/common/HydrationEndDetector'
import { microReboundPreset } from "@kasuie/utils";

export interface TransitionViewParams {
  from?: Target;
  to?: Target;
  initial?: Target;
  preset?: Spring;
}

export const createTransitionView = (params: TransitionViewParams) => {
  const { from, to, initial, preset } = params;

  const TransitionView = forwardRef<
    HTMLElement,
    PropsWithChildren<BaseTransitionProps>
  >((props, ref) => {
    const {
      timeout = {},
      duration = 0.5,
      animate = true,
      animation = {},
      as = "div",
      delay = 0,
      lcpOptimization = false,
      ...rest
    } = props;

    const { enter = delay, exit = delay } = timeout;

    const MotionComponent = motion[as] as ForwardRefExoticComponent<
      HTMLMotionProps<any> & RefAttributes<HTMLElement>
    >;

    const [stableIsHydrationEnded] = useState(true);

    if (!animate) {
      return <MotionComponent {...rest}>{props.children}</MotionComponent>
    }

    const motionProps: MotionProps = {
      initial: initial || from,
      animate: {
        ...to,
        transition: {
          duration,
          ...(preset || microReboundPreset),
          ...animation.enter,
          delay: enter / 1000,
        },
      },
      transition: {
        duration,
      },
      exit: {
        ...from,
        transition: {
          duration,
          ...animation.exit,
          delay: exit / 1000,
        } as TargetAndTransition["transition"],
      },
    };

    // if (lcpOptimization && !stableIsHydrationEnded) {
    //   motionProps.initial = to;
    //   delete motionProps.animate;
    // }

    return (
      <MotionComponent ref={ref} {...motionProps} {...rest}>
        {props.children}
      </MotionComponent>
    );
  });
  TransitionView.displayName = `forwardRef(TransitionView)`;
  const MemoedTransitionView = memo(TransitionView); // 优化性能，防止不必要的重新渲染
  MemoedTransitionView.displayName = `MemoedTransitionView`;
  return MemoedTransitionView;
};
