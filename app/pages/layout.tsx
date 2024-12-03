import React from 'react';

const Layout: React.FC = ({ children }:any) => {
    return (
        <div>
            <main>
                {children}
            </main>
            <footer>
                <p>&copy; 2024 Streamify. All rights reserved.</p>
            </footer>
        </div>
    );
};

export default Layout;