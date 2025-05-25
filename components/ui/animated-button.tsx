import * as React from 'react';
import { motion } from 'framer-motion';
import { buttonVariants } from './button';
import { cn } from '@/lib/utils';
import type { VariantProps } from 'class-variance-authority';

// Animation config
const tapScale = 0.965;

// Use Framer Motion's button props for compatibility
export type AnimatedButtonProps = React.ComponentProps<typeof motion.button> & VariantProps<typeof buttonVariants>;

const AnimatedButton = React.forwardRef<HTMLButtonElement, AnimatedButtonProps>(
    ({ className, variant, size, ...props }, ref) => (
        <motion.button
            ref={ref}
            className={cn(buttonVariants({ variant, size }), className)}
            whileTap={{ scale: tapScale, transition: { type: 'spring', duration: 0.01 } }}
            {...props}
        />
    )
);
AnimatedButton.displayName = 'AnimatedButton';

export { AnimatedButton };
export default AnimatedButton; 