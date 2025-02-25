import { Home } from "./screens/Home/Home";
import { Registro } from "./screens/Registro/Registro";
import { Login } from "./screens/Login/Login";
import { App } from "./App";
import { Dashboard } from "../private/screens/Dashboard/Dashboard";
import { CalcularTaxas } from "../private/components/CalcularTaxas/CalcularTaxas";
import { Formulario } from "../private/components/Formulario/Formulario";
import GridClientes from "../private/components/GridClientes/GridClientes";

type RouteObject = {
    index?: boolean;
    path?: string;
    element: React.ReactNode;
    errorElement?: React.ReactNode;
    children?: RouteObject[];
};

const routes: RouteObject[] = [
    {
        path: "/",
        element: <App />,
        children: [
            {
                index: true,
                element: <Home />
            },
            {
                path: "login",
                element: <Login />
            },
            {
                path: "registro",
                element: <Registro />
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