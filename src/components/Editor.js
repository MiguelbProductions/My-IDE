import React, { useRef, useEffect } from 'react';
import * as monaco from 'monaco-editor';
import styled from 'styled-components';

const EditorContainer = styled.div`
  flex-grow: 1;
  background-color: ${({ theme }) => theme.editorBackground};
  color: ${({ theme }) => theme.text};
  padding: 10px;
  height: calc(100vh - 60px); /* Adjust based on your header height */
`;

const Editor = ({ content, setContent, activeFile, theme }) => {
  const editorRef = useRef(null);
  const monacoRef = useRef(null);
  const activeFileRef = useRef(activeFile);

  useEffect(() => {
    activeFileRef.current = activeFile;
  }, [activeFile]);

  useEffect(() => {
    if (editorRef.current) {
      monacoRef.current = monaco.editor.create(editorRef.current, {
        value: content || '',
        language: 'javascript', // You can set the default language or make it dynamic
        theme: theme === 'light' ? 'vs-light' : 'vs-dark',
      });

      monacoRef.current.onDidChangeModelContent(() => {
        const value = monacoRef.current.getValue();
        setContent(activeFileRef.current, value);
      });
    }
    return () => monacoRef.current && monacoRef.current.dispose();
  }, []);

  useEffect(() => {
    if (monacoRef.current) {
      const currentTheme = theme === 'light' ? 'vs-light' : 'vs-dark';
      monaco.editor.setTheme(currentTheme);
    }
  }, [theme]);

  useEffect(() => {
    if (monacoRef.current) {
      const model = monacoRef.current.getModel();
      if (model.getValue() !== (content || '')) {
        model.setValue(content || '');
      }
    }
  }, [content]);

  return <EditorContainer ref={editorRef} />;
};

export default Editor;
