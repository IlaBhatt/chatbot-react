import React, {ReactNode} from 'react';
import Sidebar from '../sidebar/Sidebar';
import Header from '../header/Header';
import styles from './Layout.module.css';

interface LayoutProps {
    children: ReactNode;  // This type accepts any valid React child (string, number, JSX, array of JSX, etc.)
}
const Layout: React.FC<LayoutProps> = ({ children }) => {
    return (
        <div className={styles.layout}>
            <Sidebar />
            <Header />
            <main className={styles.content}>
                {children}
            </main>
        </div>
    );
};

export default Layout;
