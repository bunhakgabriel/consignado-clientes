import { Outlet } from 'react-router-dom';
import { NavBar } from './components/NavBar/NavBar';

export const App = () => {
    return (
        <>
            <NavBar />
            <Outlet />
        </>
    )
}