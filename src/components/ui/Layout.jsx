import { Outlet } from 'react-router-dom';
import Footer from './Footer';
import Navbar from './Navbar';

const Layout = () => {
    return (
        <>
            <Navbar />
            <div
                style={{
                    height: 'auto',
                    minHeight: '100vh',
                }}
            >
                <Outlet />
            </div>

            <Footer />
        </>
    );
};

export default Layout;
