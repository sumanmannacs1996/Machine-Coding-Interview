import { useState } from "react";
import "./App.css";
import explorer from "./data/FolderData";
import Folder from "./components/Folder";
import useTraversalTree from "./hooks/useTraversalTree";

function App() {
  const [explorerData, setExplorerData] = useState(explorer);
  const { insertNode } = useTraversalTree();

  const handleInsertNode = (folderId, itemName, isFolder) => {
    const finalTree = insertNode(explorerData, folderId, itemName, isFolder);
    setExplorerData(finalTree);
  };
  return (
    <div className="App">
      <Folder explorer={explorerData} handleInsertNode={handleInsertNode} />
    </div>
  );
}

export default App;
