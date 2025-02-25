import { CardHomeProps } from "../../components/CardHome/CardHome";
import { FiUsers } from "react-icons/fi";
import { FaRegFileLines } from "react-icons/fa6";
import { LuCalculator } from "react-icons/lu";

export const dataCards = [
    {
        icon: <FiUsers />,
        titulo: 'Gestão de Clientes',
        paragrafo: 'Cadastro completo de clientes com histórico de interações e documentos'
    },
    {
        icon: <FaRegFileLines />,
        titulo: 'Controle de Contratos',
        paragrafo: 'Acompanhamento de contratos, vencimentos e renovações'
    },
    {
        icon: <LuCalculator />,
        titulo: 'Cálculos Financeiros',
        paragrafo: 'Simulações e cálculos de parcelas, juros e amortizações'
    }
] as CardHomeProps[]