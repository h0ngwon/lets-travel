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
                }}
            >
                <Outlet />
            </div>
            <Footer />
        </>
    );
};

export default Layout;
