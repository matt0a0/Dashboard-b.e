import React, { useState } from 'react';
import './UserMenu.css';
import { Link } from 'react-router-dom';

const UserMenu = () => {
    const [expanded, setExpanded] = useState(false);

    const toggleMenu = () => {
        setExpanded(prev => !prev);
    };

    return (
        <div className="user-menu">
            <button className="user-menu-toggle" onClick={toggleMenu}>
                Menu Usuário
            </button>
            <div className={`user-menu-options ${expanded ? 'expanded' : ''}`}>
                {/* Link para Histórico */}
                <Link to="/historico" className="user-menu-option">
                    Histórico
                </Link>

                {/* Link para Configuração */}
                <Link to="/configuracao" className="user-menu-option">
                    Configuração
                </Link>
            </div>
        </div>
    );
};

export default UserMenu;
