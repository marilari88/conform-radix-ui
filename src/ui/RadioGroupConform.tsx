import { conform, useInputEvent, type FieldConfig } from "@conform-to/react";
import * as RadioGroup from "@radix-ui/react-radio-group";
import clsx from "clsx";
import { useRef } from "react";

export function RadioGroupConform({
  config,
  items,
}: {
  config: FieldConfig<string>;
  items: Array<{ value: string; label: string }>;
}) {
  const shadowInputRef = useRef<HTMLInputElement>(null);
  const control = useInputEvent({ ref: shadowInputRef });
  return (
    <>
      <input
        ref={shadowInputRef}
        {...conform.input(config, { hidden: true })}
      />
      <RadioGroup.Root
        className="flex items-center gap-4"
        onValueChange={(value) => {
          control.change(value);
        }}
        onFocus={() => control.focus()}
        onBlur={() => control.blur()}
        defaultValue={config.defaultValue}
      >
        {items.map((item) => {
          return (
            <div className="flex items-center gap-2" key={item.value}>
              <RadioGroup.Item
                value={item.value}
                id={`${item.label}Id`}
                className={clsx(
                  "size-5 rounded-full outline-none cursor-default",
                  "border hover:bg-amber-50 focus:border-neutral-400",
                  "flex items-center justify-center",
                  "bg-white",
                )}
              >
                <RadioGroup.Indicator className="flex items-center justify-center w-full h-full relative after:content-[''] after:block after:size-2.5 after:rounded-full after:bg-amber-700" />
              </RadioGroup.Item>
              <label htmlFor={`${item.label}Id`}>{item.label}</label>
            </div>
          );
        })}
      </RadioGroup.Root>
    </>
  );
}
