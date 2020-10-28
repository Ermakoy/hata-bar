import React from 'react';
import Tippy from '@tippyjs/react/headless';
import styled from 'styled-components';
import { useSpring, motion } from 'framer-motion';

const Box = styled(motion.div)`
  background: #333;
  color: white;
  padding: 5px 10px;
  border-radius: 4px;
`;

export function Tooltip({ children, render, content, ...other }) {
  const springConfig = { damping: 15, stiffness: 300 };
  const initialScale = 0.5;
  const opacity = useSpring(0, springConfig);
  const scale = useSpring(initialScale, springConfig);

  function onMount() {
    scale.set(1);
    opacity.set(1);
  }

  function onHide({ unmount }) {
    const cleanup = scale.onChange(value => {
      if (value <= initialScale) {
        cleanup();
        unmount();
      }
    });

    scale.set(initialScale);
    opacity.set(0);
  }
  return (
    <Tippy
      render={attrs => (
        <Box style={{ scale, opacity }} {...attrs}>
          {content}
        </Box>
      )}
      animation={true}
      onMount={onMount}
      onHide={onHide}
      {...other}
    >
      {children}
    </Tippy>
  );
}
