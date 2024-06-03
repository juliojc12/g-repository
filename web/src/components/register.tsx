import React, { useState, ChangeEvent, FormEvent } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { z } from "zod";

const numeric = z.string().regex(/^\d+$/);

interface RegisterProps {
  onAddRecord: (record: TableProps) => void;
}

interface TableProps {
  id: number;
  numeroPatrimonio: string;
  defeito: string;
}

const Register: React.FC<RegisterProps> = ({ onAddRecord }) => {
  const [formData, setFormData] = useState<TableProps>({
    id: 0,
    numeroPatrimonio: "",
    defeito: "",
  });

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;

    let isValid = true;
    if (name === "numeroPatrimonio") {
      try {
        numeric.parse(value);
      } catch (error) {
        isValid = false;
      }
    }
    if (isValid || value === "") {
      setFormData((prevFormData) => ({
        ...prevFormData,
        [name]: value,
      }));
    }
  };

  const handleSubmit = async (event: FormEvent) => {
    event.preventDefault();
    await onAddRecord(formData);
    setFormData({ id: 0, numeroPatrimonio: "", defeito: "" });
  };

  return (
    <>
      <main className="rounded-3xl bg-[#f8d636] w-3/4 flex justify-between h-32 items-center px-4 gap-3 shadow-lg shadow-zinc-500 opacity-90 hover:opacity-100">
        <div className="flex flex-col items-start px-2 w-2/3 justify-between gap-2">
          <Label className="text-xl text-zinc-800">Nº Patrimônio</Label>
          <Input
            required
            inputMode="numeric"
            maxLength={10}
            className="bg-zinc-200 text-zinc-800 font-bold text-lg focus:border-zinc-200"
            name="numeroPatrimonio"
            onChange={handleChange}
            value={formData.numeroPatrimonio}
          />
        </div>
        <div className="flex flex-col items-start px-2 w-2/3 justify-between gap-2">
          <Label className="text-2xl text-zinc-800">Defeito</Label>
          <Input
            required
            className="bg-zinc-200 text-zinc-800 font-bold text-lg focus:border-zinc-200"
            name="defeito"
            onChange={handleChange}
            value={formData.defeito}
          />
        </div>
        <Button
          variant="ghost"
          className="mt-9 bg-zinc-800 shadow-md shadow-zinc-300 hover:shadow-2xl text-xl hover:bg-zinc-700 hover:text-zinc-200"
          onClick={handleSubmit}
        >
          Novo
        </Button>
      </main>
    </>
  );
};

export default Register;
