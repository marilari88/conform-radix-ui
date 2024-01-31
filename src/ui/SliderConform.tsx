import { FieldConfig, conform, useInputEvent } from "@conform-to/react";
import * as Slider from "@radix-ui/react-slider";
import { useRef, useState } from "react";

export function SliderConform({
  config,
  onChange,
  ariaLabel,
  max = 100,
}: {
  config: FieldConfig<{ rate: number }>;
  onChange?: (value: string) => void;
  ariaLabel?: string;
  max?: number;
}) {
  const thumbRef = useRef<HTMLInputElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const defaultValue = config.defaultValue ?? 0;

  const [value, setValue] = useState<number>(defaultValue);

  const input = conform.input(config, {
    hidden: true,
  });

  const control = useInputEvent({
    ref: inputRef,
    onFocus: () => {
      thumbRef.current?.focus();
    },
  });

  return (
    <div className="flex items-center gap-4">
      <input ref={inputRef} {...input} aria-label={ariaLabel} />
      <Slider.Root
        className="relative flex items-center select-none touch-none w-full h-5"
        aria-invalid={!!config.error}
        defaultValue={[defaultValue]}
        max={max}
        onValueChange={(value) => {
          onChange?.(value[0].toString());
          control.change(value[0].toString());
          setValue(value[0]);
        }}
        onFocus={() => {
          control.focus();
        }}
        onBlur={() => {
          control.blur();
        }}
        step={1}
      >
        <Slider.Track className="bg-neutral-400 relative grow rounded-full h-1">
          <Slider.Range className="absolute bg-amber-700/40 rounded-full h-full" />
        </Slider.Track>
        <Slider.Thumb className="block size-5  shadow-md rounded-full bg-amber-700 focus:outline-none focus:border-neutral-500 border" />
      </Slider.Root>
      <div>{value}</div>
    </div>
  );
}
