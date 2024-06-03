import { useEffect, useState } from "react";
import {
  TableBody,
  Table as TableComponent,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import { api } from "@/services/api";
import EditRecordModal from "./editRecordModal";

const tableHeadStyle = "text-2xl text-bold";

interface TableProps {
  id: number;
  numeroPatrimonio: string;
  defeito: string;
}

function Table({ initialData }: { initialData: TableProps[] }): JSX.Element {
  const [tableData, setTableData] = useState<TableProps[]>(initialData);
  const [selectedItemId, setSelectedItemId] = useState<number | null>(null);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [selectedItem, setSelectedItem] = useState<TableProps | null>(null);

  useEffect(() => {
    setTableData(initialData);
  }, [initialData]);

  const handleDeleteClick = (id: number) => {
    setSelectedItemId(id);
  };

  const handleConfirmDelete = async () => {
    if (selectedItemId !== null) {
      try {
        await api.delete(`/${selectedItemId}`);
        setTableData((prevData) =>
          prevData.filter((item) => item.id !== selectedItemId)
        );
      } catch (error) {
        console.error("Erro ao excluir registro:", error);
      } finally {
        setSelectedItemId(null);
      }
    }
  };

  const openEditModal = (item: TableProps) => {
    setSelectedItem(item);
    setIsEditModalOpen(true);
  };

  const handleSaveEdit = async (editedData: {
    numeroPatrimonio: string;
    defeito: string;
  }) => {
    if (selectedItem) {
      try {
        await api.put(`/${selectedItem.id}`, editedData);
        setTableData((prevData) =>
          prevData.map((item) =>
            item.id === selectedItem.id ? { ...item, ...editedData } : item
          )
        );
        setIsEditModalOpen(false);
        setSelectedItem(null); // Clear the selected item after editing
      } catch (error) {
        console.error("Erro ao atualizar registro:", error);
      }
    }
  };

  return (
    <>
      <TableComponent>
        <TableHeader>
          <TableRow>
            <TableHead className={`${tableHeadStyle} w-[150px]`}>
              Nº Patrimônio
            </TableHead>
            <TableHead className={`${tableHeadStyle} pl-32`}>Defeito</TableHead>
            <TableHead className={`${tableHeadStyle} w-[200px] pl-12`}>
              Ações
            </TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {tableData.length > 0 ? (
            tableData.map((item) => (
              <TableRow key={item.id}>
                <TableHead className="text-xl text-bold">
                  {item.numeroPatrimonio}
                </TableHead>
                <TableHead className="pl-32 text-xl text-bold uppercase">
                  {item.defeito}
                </TableHead>
                <TableHead>
                  <Button
                    className="bg-blue-700 hover:bg-blue-500 text-white mx-2"
                    onClick={() => openEditModal(item)}
                  >
                    Editar
                  </Button>
                  <AlertDialog>
                    <AlertDialogTrigger asChild>
                      <Button
                        className="bg-red-700 hover:bg-red-500 text-white"
                        onClick={() => handleDeleteClick(item.id)}
                      >
                        Excluir
                      </Button>
                    </AlertDialogTrigger>
                    <AlertDialogContent>
                      <AlertDialogHeader>
                        <AlertDialogTitle>
                          Tem certeza que deseja excluir?
                        </AlertDialogTitle>
                        <AlertDialogDescription>
                          {" "}
                          {item.numeroPatrimonio} - {item.defeito}
                          <br />
                          Esta ação não pode ser desfeita. Isso excluirá
                          permanentemente o registro e removerá seus dados de
                          nossos servidores.
                        </AlertDialogDescription>
                      </AlertDialogHeader>
                      <AlertDialogFooter>
                        <AlertDialogCancel
                          onClick={() => setSelectedItemId(null)}
                        >
                          Cancelar
                        </AlertDialogCancel>
                        <AlertDialogAction onClick={handleConfirmDelete}>
                          Excluir
                        </AlertDialogAction>
                      </AlertDialogFooter>
                    </AlertDialogContent>
                  </AlertDialog>
                </TableHead>
              </TableRow>
            ))
          ) : (
            <TableRow>
              <TableHead colSpan={3} className="text-center text-3xl">
                Nenhum registro encontrado. Que tal adicionar um novo? ✌️
              </TableHead>
            </TableRow>
          )}
        </TableBody>
      </TableComponent>
      {selectedItem && (
        <EditRecordModal
          isOpen={isEditModalOpen}
          onClose={() => setIsEditModalOpen(false)}
          onConfirm={handleSaveEdit}
          initialData={selectedItem}
        />
      )}
    </>
  );
}

export default Table;
