import React, { useRef, useEffect } from 'react';
import * as monaco from 'monaco-editor';

const Editor = ({ content, setContent }) => {
  const editorRef = useRef(null);
  const monacoRef = useRef(null);

  useEffect(() => {
    if (editorRef.current) {
      monacoRef.current = monaco.editor.create(editorRef.current, {
        value: content,
        language: 'javascript',
        theme: 'vs-dark'
      });

      monacoRef.current.onDidChangeModelContent(() => {
        const value = monacoRef.current.getValue();
        setContent(value);
      });
    }
  }, []);

  useEffect(() => {
    if (monacoRef.current) {
      const model = monacoRef.current.getModel();
      const currentValue = model.getValue();
      if (currentValue !== content) {
        model.setValue(content);
      }
    }
  }, [content]);

  return (
    <div
      ref={editorRef}
      style={{ height: '100%', width: '100%' }}
    ></div>
  );
};

export default Editor;
