import React from 'react';
import * as CollapsiblePrimitive from '@radix-ui/react-collapsible';

import { cn } from '~/lib/utils';

const Collapsible = CollapsiblePrimitive.Root;

const CollapsibleTrigger = CollapsiblePrimitive.CollapsibleTrigger;

const CollapsibleContent = React.forwardRef<
  HTMLDivElement,
  CollapsiblePrimitive.CollapsibleContentProps
>(({ className, ...props }, ref) => {
  return (
    <CollapsiblePrimitive.CollapsibleContent
      className={cn(
        className,
        'data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out data-[state=open]:fade-in',
      )}
      ref={ref}
      {...props}
    />
  );
});

CollapsibleContent.displayName = 'CollapsibleContent';

export { Collapsible, CollapsibleTrigger, CollapsibleContent };
