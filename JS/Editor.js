var editor = CodeMirror.fromTextArea(document.getElementById("IDEContainer"), {
    theme: "dracula",
    lineNumbers: true,  
    autoCloseBrackets: true,

    mode:  "javascript",
    value: "function myScript(){return 100;}\n",
});