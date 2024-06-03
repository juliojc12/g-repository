import { useEffect, useState } from "react";
import Table from "@/components/table";
import Header from "./components/header";
import Register from "./components/register";
import { api } from "./services/api";
import { ThemeProvider } from "./components/theme-provider";

interface TableProps {
  id: number;
  numeroPatrimonio: string;
  defeito: string;
}

export default function App() {
  const [data, setData] = useState<TableProps[]>([]);

  const fetchData = async () => {
    try {
      const response = await api.get("/");
      console.log(response.data);
      setData(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const addNewRecord = async (newRecord: TableProps) => {
    try {
      const response = await api.post("/", newRecord);
      if (response.status === 200) {
        fetchData();
      } else {
        console.error("erro ao adiocionar novo registro. " + response);
      }
    } catch (error) {
      console.error("erro ao adiocionar novo registro. " + error);
    }
  };

  return (
    <>
      <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
        <div className="min-h-screen flex items-center flex-col w-full bg-zinc-900 text-zinc-300">
          <Header />
          <div className="w-full flex justify-center items-center">
            <Register onAddRecord={addNewRecord} />
          </div>
          <div className="w-3/4 flex justify-center items-center mt-8">
            <Table initialData={data} />
          </div>
        </div>
      </ThemeProvider>
    </>
  );
}
