import { useInputEvent, type FieldConfig } from "@conform-to/react";
import * as Checkbox from "@radix-ui/react-checkbox";
import { CheckIcon } from "@radix-ui/react-icons";
import { ElementRef, useRef } from "react";

export function CheckboxConform({ config }: { config: FieldConfig<boolean> }) {
  const checkboxRef = useRef<ElementRef<typeof Checkbox.Root>>(null);
  const control = useInputEvent({
    ref: () => checkboxRef.current?.form?.elements.namedItem(config.name),
    onFocus: () => {
      checkboxRef.current?.focus();
    },
  });
  return (
    <Checkbox.Root
      ref={checkboxRef}
      id={config.id}
      name={config.name}
      onCheckedChange={(e) => {
        control.change(e);
      }}
      onBlur={control.blur}
      defaultChecked={config.defaultValue == "on"}
      className="hover:bg-amber-50 flex size-5 appearance-none items-center justify-center rounded-md bg-white outline-none border focus:border-neutral-400"
    >
      <Checkbox.Indicator className="text-amber-900">
        <CheckIcon />
      </Checkbox.Indicator>
    </Checkbox.Root>
  );
}
