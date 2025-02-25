import { Home } from "./screens/Home/Home";
import { App } from "./App";
import { Dashboard } from "../private/screens/Dashboard/Dashboard";
import { CalcularTaxas } from "../private/components/CalcularTaxas/CalcularTaxas";
import { Formulario } from "../private/components/Formulario/Formulario";
import GridClientes from "../private/components/GridClientes/GridClientes";
import { RouteObject } from "react-router-dom";


const routes: RouteObject[] = [
    {
        path: "/",
        element: <App />,
        children: [
            {
                index: true,
                element: <Home />
            }
        ],
        errorElement: <h1>Página não encontrada</h1>
    },
    {
        path: "dashboard",
        element: <Dashboard />,
        children: [
            {
                path: "calcular-taxas",
                element: <CalcularTaxas />
            },
            {
                path: "cadastrar-cliente",
                element: <Formulario />
            },
            {
                path: "clientes",
                element: <GridClientes />
            },
        ],
        errorElement: <h1>Página não encontrada</h1>
    }
];


export default routes;