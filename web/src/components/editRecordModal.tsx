import React, { useState } from "react";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { Input } from "@/components/ui/input";

interface EditRecordModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: (data: { numeroPatrimonio: string; defeito: string }) => void;
  initialData: {
    id: number;
    numeroPatrimonio: string;
    defeito: string;
  };
}

const EditRecordModal: React.FC<EditRecordModalProps> = ({
  isOpen,
  onClose,
  onConfirm,
  initialData,
}) => {
  const [numeroPatrimonio, setNumeroPatrimonio] = useState(
    initialData.numeroPatrimonio
  );
  const [defeito, setDefeito] = useState(initialData.defeito);

  return (
    <>
      <AlertDialog open={isOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Editar Registro</AlertDialogTitle>
          </AlertDialogHeader>
          <AlertDialogDescription>
            Atualize as informações do registro.
          </AlertDialogDescription>
          <div>
            <label>Número do Patrimônio:</label>
            <Input
              value={numeroPatrimonio}
              onChange={(e) => setNumeroPatrimonio(e.target.value)}
            />
            <label>Defeito:</label>
            <Input
              value={defeito}
              onChange={(e) => setDefeito(e.target.value)}
            />
          </div>
          <AlertDialogFooter>
            <AlertDialogCancel onClick={onClose}>Cancelar</AlertDialogCancel>
            <AlertDialogAction
              onClick={() => onConfirm({ numeroPatrimonio, defeito })}
            >
              Salvar
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
};

export default EditRecordModal;
