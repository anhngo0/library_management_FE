import { createContext, useState } from "react";

export const NavbarContext = createContext();
export const UIContext = createContext();
export const SelectedItemContext = createContext();

const ContextProvider = ({ children }) => {
    const [tab, setTab] = useState(1);

    const handleTabUi = (index) => {
        setTab(index)
    }

    const uiContextValue = {
        tab,
        handleTabUi
    }

    const [navbarTab, setNavbarTab] = useState(1);
    const handleNavbarTabUi = (index) => {
        setNavbarTab(index)
    }
    const navbarContextValue = {
        navbarTab,
        handleNavbarTabUi
    }

    const [selectedItemId, setSelectedItemId] = useState(null);
    const selectedItemContextValue = {
        selectedItemId,
        setSelectedItemId
    };

    return (
        <NavbarContext.Provider value={navbarContextValue}>
            <UIContext.Provider value={uiContextValue}>
                <SelectedItemContext.Provider value={selectedItemContextValue}>
                    {children}
                </SelectedItemContext.Provider>
            </UIContext.Provider>
        </NavbarContext.Provider>
    );
};

export default ContextProvider;