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

const Editor = ({ content, setContent, theme }) => {
  const editorRef = useRef(null);
  const monacoRef = useRef(null);

  useEffect(() => {
    if (editorRef.current) {
      monacoRef.current = monaco.editor.create(editorRef.current, {
        value: content,
        language: 'javascript',
        theme: theme === 'light' ? 'vs-light' : 'vs-dark',
      });

      monacoRef.current.onDidChangeModelContent(() => {
        const value = monacoRef.current.getValue();
        setContent(value);
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
      const currentValue = model.getValue();
      if (currentValue !== content) {
        model.setValue(content);
      }
    }
  }, [content]);

  return <EditorContainer ref={editorRef} />;
};

export default Editor;
