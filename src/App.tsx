import { useForm } from "@conform-to/react";
import { parse } from "@conform-to/zod";
import { z } from "zod";
import { RadioGroupConform } from "./ui/RadioGroupConform";
import { CheckboxConform } from "./ui/CheckboxConform";
import { SliderConform } from "./ui/SliderConform";

const schema = z.object({
  hasAgreedToTerms: z
    .boolean()
    .optional()
    .refine((val) => val, {
      message: "You must agree to the terms and conditions.",
    }),
  selectedCarType: z.enum(["sedan", "hatchback", "suv"]),
  userCountry: z.enum(["usa", "canada", "mexico"]),
  estimatedKilometersPerYear: z.number().min(1).max(100000),
  hasAdditionalDriver: z.boolean(),
  desiredContractType: z.enum(["full", "part"]),
});

export function App() {
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
    defaultValue: {
      selectedCarType: "sedan",
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
        <div className="flex flex-col gap-2">
          <h2 className="font-medium">Radio Group</h2>
          <div className="flex flex-col gap-2">
            Car type:
            <RadioGroupConform
              config={selectedCarType}
              items={[
                { value: "sedan", label: "Sedan" },
                { value: "hatchback", label: "Hatchback" },
                { value: "suv", label: "SUV" },
                { value: "other", label: "Other (not valid choice)" },
              ]}
            />
            {selectedCarType.error && (
              <span className="text-red-800">{selectedCarType.error}</span>
            )}
          </div>
        </div>
        <h2>Select</h2>
        <div className="flex flex-col gap-2">
          <h2>Slider</h2>
          <div className="flex flex-col gap-2">
            Estimated kilometers per year:
            <SliderConform
              config={estimatedKilometersPerYear}
              ariaLabel="Estimated kilometers per year"
              max={10_000}
            />
            {estimatedKilometersPerYear.error && (
              <span className="text-red-800">
                {estimatedKilometersPerYear.error}
              </span>
            )}
          </div>
        </div>
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
