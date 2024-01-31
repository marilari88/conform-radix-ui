import { FieldConfig, useInputEvent } from "@conform-to/react";
import * as Switch from "@radix-ui/react-switch";
import { ElementRef, useRef } from "react";

export function SwitchConform({ config }: { config: FieldConfig<boolean> }) {
  const switchRef = useRef<ElementRef<typeof Switch.Root>>(null);
  const control = useInputEvent({
    ref: () => switchRef.current?.form?.elements.namedItem(config.name),
    onFocus: () => {
      switchRef.current?.focus();
    },
  });
  return (
    <Switch.Root
      ref={switchRef}
      id={config.id}
      name={config.name}
      onCheckedChange={(value) => {
        control.change(value);
      }}
      onBlur={control.blur}
      className="w-[42px] h-[25px] bg-amber-700/30 rounded-full relative focus:border focus:border-neutral-400 data-[state=checked]:bg-amber-700 outline-none cursor-default"
    >
      <Switch.Thumb className="block size-5 bg-white rounded-full transition-transform duration-100 translate-x-0.5 will-change-transform data-[state=checked]:translate-x-[19px]" />
    </Switch.Root>
  );
}
