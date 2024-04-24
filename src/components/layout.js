import React, { useEffect, useState } from 'react';
import Header from './Header';
import Footer from './Footer';

const Layout = ({ children }) => {
    const [navigation, setNavigation] = useState([]);

    useEffect(() => {
        fetch('/api/navigation')
            .then(response => response.json())
            .then(data => setNavigation(data))
            .catch(error => console.error('Error fetching navigation:', error));
    }, []);

    return (
        <div style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
            <Header navigation={navigation} />
            <main style={{ flex: 1 }}>{children}</main>
            <Footer />
        </div>
    );
};
export default Layout;