import React from 'react';
import Sidebar from './Sidebar';
import UserIcon from '@/components/icons/UserIcon';
import SecurityIcon from '@/components/icons/SecurityIcon';
import HelpIcon from '@/components/icons/HelpIcon';
import InfoIcon from '@/components/icons/InfoIcon';
import styles from './LogoutSidebar.module.css';

interface LogoutSidebarProps {
    isOpen: boolean;
    onClose: () => void;
    onLogout: () => void;
}

export default function LogoutSidebar({ isOpen, onClose, onLogout }: LogoutSidebarProps) {
    return (
        <Sidebar isOpen={isOpen} onClose={onClose}>
            <div className={styles.sidebarContent}>
                <h2>Profile Settings</h2>
                <div className={styles.sidebarGroup}>
                    <a>
                        <UserIcon />
                        <p>Profile Settings</p>
                    </a>
                    <a>
                        <SecurityIcon />
                        <p>Security and Privacy</p>
                    </a>
                </div>
                <div className={styles.sidebarGroup}>
                    <a>
                        <HelpIcon />
                        <p>Help</p>
                    </a>
                    <a>
                        <InfoIcon />
                        <p>About Us</p>
                    </a>
                </div>
            </div>
            <button className={styles.sidebarButton} onClick={onLogout}>
                Sign out
            </button>
        </Sidebar>
    );
}
