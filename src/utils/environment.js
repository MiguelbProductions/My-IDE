export const isElectron = () => {
    return (window.electron ? true : false);
};