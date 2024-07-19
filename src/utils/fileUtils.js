import { isElectron } from './environment';

export const openFile = async () => {
  if (isElectron()) {
    return window.electron.openFile();
  } else {
    // Implementação para o navegador
    const input = document.createElement('input');
    input.type = 'file';
    input.accept = '*/*';
    return new Promise((resolve) => {
      input.onchange = (e) => {
        const file = e.target.files[0];
        resolve(file.path);
      };
      input.click();
    });
  }
};

export const readFile = async (filePath) => {
  if (isElectron()) {
    return window.electron.readFile(filePath);
  } else {
    // Implementação para o navegador
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = (event) => resolve(event.target.result);
      reader.onerror = (error) => reject(error);
      reader.readAsText(filePath);
    });
  }
};

export const saveFile = async (filePath, content) => {
  if (isElectron()) {
    return window.electron.saveFile(filePath, content);
  } else {
    // Implementação para o navegador
    const blob = new Blob([content], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = filePath || 'file.txt';
    a.click();
    URL.revokeObjectURL(url);
  }
};
