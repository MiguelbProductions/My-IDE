import { isElectron } from './environment';

export const openFile = async () => {
  if (isElectron()) {
    const result = await window.electron.openFile();
    if (result) {
      return { name: result.path.split('/').pop(), path: result.path, content: result.content };
    }
    return null;
  } else {
    const input = document.createElement('input');
    input.type = 'file';
    input.accept = '*/*';
    return new Promise((resolve) => {
      input.onchange = (e) => {
        const file = e.target.files[0];
        resolve({ name: file.name, path: null, content: file });
      };
      input.click();
    });
  }
};

export const readFile = async (file) => {
  if (isElectron()) {
    return file.content;
  } else {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = (event) => resolve(event.target.result);
      reader.onerror = (error) => reject(error);
      reader.readAsText(file.content);
    });
  }
};

export const saveFile = async (filePath, content) => {
  if (isElectron()) {
    await window.electron.saveFile(filePath, content);
  } else {
    const blob = new Blob([content], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = filePath || 'file.txt';
    a.click();
    URL.revokeObjectURL(url);
  }
};

export const saveFileAs = async (content) => {
  if (isElectron()) {
    const filePath = await window.electron.saveFileAs(content);
    return filePath;
  } else {
    const blob = new Blob([content], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'file.txt';
    a.click();
    URL.revokeObjectURL(url);
  }
};
