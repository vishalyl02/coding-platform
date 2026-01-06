import CodeMirror from '@uiw/react-codemirror';
import { cpp } from '@codemirror/lang-cpp';
import { java } from '@codemirror/lang-java';
import { python } from '@codemirror/lang-python';
import { EditorView } from '@codemirror/view';
import { oneDark } from '@codemirror/theme-one-dark';
import './CodeEditor.css';

function CodeEditor({ 
  code, 
  setCode, 
  testStarted, 
  testSubmitted, 
  language 
}) {
  // Get language extension based on selected language
  const getLanguageExtension = () => {
    switch(language) {
      case 'cpp': return cpp();
      case 'java': return java();
      case 'python': return python();
      default: return python();
    }
  };

  const placeholder = language === "cpp"
    ? "// Write your C++ solution here"
    : language === "java"
    ? "// Write your Java solution here"
    : "# Write your Python solution here";

  return (
    <div className="code-editor-wrapper">
      <CodeMirror
        value={code}
        height="500px"
        theme={oneDark}
        extensions={[
          getLanguageExtension(),
          EditorView.lineWrapping,
        ]}
        onChange={(value) => setCode(value)}
        editable={testStarted && !testSubmitted}
        placeholder={placeholder}
        basicSetup={{
          lineNumbers: true,
          highlightActiveLineGutter: true,
          highlightSpecialChars: true,
          foldGutter: true,
          drawSelection: true,
          dropCursor: true,
          allowMultipleSelections: true,
          indentOnInput: true,
          bracketMatching: true,
          closeBrackets: true,
          autocompletion: true,
          rectangularSelection: true,
          crosshairCursor: true,
          highlightActiveLine: true,
          highlightSelectionMatches: true,
          closeBracketsKeymap: true,
          searchKeymap: true,
          foldKeymap: true,
          completionKeymap: true,
          lintKeymap: true,
        }}
        className={`custom-code-editor ${!testStarted || testSubmitted ? 'disabled' : ''}`}
      />
    </div>
  );
}

export default CodeEditor;