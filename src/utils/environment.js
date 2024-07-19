export const isElectron = () => {
    return typeof window !== 'undefined' && window.process && window.process.type === 'renderer';
};
  