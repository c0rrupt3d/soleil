export const mainAnim = {
    initial: { opacity: 0, scale: 0.88 },
    animate: {
      opacity: 1,
      scale: 1,
    },
  };

export const delayAnim = {
    initial: { opacity: 1 },
    animate: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };