import { useInputEvent, type FieldConfig, useForm } from "@conform-to/react";
import { parse } from "@conform-to/zod";
import * as Checkbox from "@radix-ui/react-checkbox";
import { CheckIcon } from "@radix-ui/react-icons";
import { ElementRef, useRef } from "react";
import { z } from "zod";

const schema = z.object({
  hasAgreedToTerms: z
    .boolean()
    .optional()
    .refine((val) => val, {
      message: "You must agree to the terms and conditions.",
    }),
  selectedCarType: z.enum(["sedan", "hatchback", "suv"]),
  userCountry: z.enum(["usa", "canada", "mexico"]),
  estimatedKilometersPerYear: z.number().min(0).max(100000),
  hasAdditionalDriver: z.boolean(),
  desiredContractType: z.enum(["full", "part"]),
});

function App() {
  const [
    form,
    {
      hasAgreedToTerms,
      selectedCarType,
      userCountry,
      estimatedKilometersPerYear,
      hasAdditionalDriver,
      desiredContractType,
    },
  ] = useForm({
    id: "car-rent",
    onValidate({ formData }) {
      return parse(formData, { schema });
    },
  });

  return (
    <main className="flex flex-col gap-4 p-12 font-sans">
      <h1 className="font-bold text-3xl">Radix UI + Conform</h1>
      <form
        {...form.props}
        className="bg-neutral-100 flex flex-col gap-4 p-4 rounded-md"
      >
        <div className="flex flex-col gap-2">
          <h2 className="font-medium">Checkbox</h2>
          <div className="flex items-center gap-2">
            <CheckboxConform config={hasAgreedToTerms} />
            <label htmlFor={hasAgreedToTerms.id}>
              Accept terms and conditions.
            </label>
          </div>
          {hasAgreedToTerms.error && (
            <span className="text-red-800">{hasAgreedToTerms.error}</span>
          )}
        </div>

        <h2>Radio Group</h2>
        <h2>Select</h2>
        <h2>Slider</h2>
        <h2>Switch</h2>
        <h2>Toggle group</h2>
        <button
          type="submit"
          className="bg-amber-800 p-3 rounded-lg text-white hover:opacity-90"
        >
          Continue
        </button>
      </form>
    </main>
  );
}

const CheckboxConform = ({ config }: { config: FieldConfig<boolean> }) => {
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
      className="hover:bg-amber-100 flex h-[25px] w-[25px] appearance-none items-center justify-center rounded-md bg-white outline-none border"
    >
      <Checkbox.Indicator className="text-violet-900">
        <CheckIcon />
      </Checkbox.Indicator>
    </Checkbox.Root>
  );
};

export default App;
