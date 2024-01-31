import { FieldConfig, conform, useInputEvent } from "@conform-to/react";
import * as ToggleGroup from "@radix-ui/react-toggle-group";
import { ElementRef, useRef } from "react";

export function ToggleGroupConform({
  config,
  items,
}: {
  config: FieldConfig<string>;
  items: Array<{ label: string; value: string }>;
}) {
  const shadowInputRef = useRef<HTMLInputElement>(null);
  const toggleGroupRef = useRef<ElementRef<typeof ToggleGroup.Root>>(null);
  const control = useInputEvent({ ref: shadowInputRef });
  return (
    <>
      <input
        ref={shadowInputRef}
        {...conform.input(config, {
          hidden: true,
        })}
        onFocus={() => {
          toggleGroupRef.current?.focus();
        }}
      />
      <ToggleGroup.Root
        type="single"
        ref={toggleGroupRef}
        defaultValue={config.defaultValue}
        className={
          "flex flex-row items-center p-1 gap-0 bg-neutral-200 rounded-md max-w-md"
        }
        onValueChange={(value) => {
          control.change(value);
        }}
        onBlur={() => control.blur()}
      >
        {items.map((item) => (
          <ToggleGroup.Item
            key={item.value}
            className="p-1 hover:bg-amber-700/30 color-amber-100 data-[state=on]:bg-amber-800 data-[state=on]:text-white flex grow items-center justify-center bg-transparent first:rounded-l last:rounded-r focus:z-10 focus:shadow-md focus:outline-none focus:border focus:border-neutral-400"
            value={item.value}
            aria-label={item.label}
          >
            {item.label}
          </ToggleGroup.Item>
        ))}
      </ToggleGroup.Root>
    </>
  );
}
