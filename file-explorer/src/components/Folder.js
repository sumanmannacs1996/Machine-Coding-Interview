import React, { useState } from "react";
import "./style.css";

function Folder({ explorer, handleInsertNode }) {
  const [expand, setExpand] = useState(false);
  const [showInput, setShowInput] = useState({
    isFolder: null,
    visible: false,
  });

  const handleNewFolder = (e, isFolder) => {
    e.stopPropagation();
    setExpand(true);
    setShowInput({
      visible: true,
      isFolder: isFolder,
    });
  };

  const onAddFolder = (e) => {
    if (e.keyCode === 13 && e.target.value) {
      handleInsertNode(explorer.id, e.target.value, showInput.isFolder);
      setShowInput({ visible: false, isFolder: null });
    }
  };

  if (explorer.isFolder) {
    return (
      <div>
        <div
          className="folder"
          onClick={() => setExpand(!expand)}
          key={explorer.id}
        >
          <span>📁{explorer.name}</span>

          <div>
            <button onClick={(e) => handleNewFolder(e, true)}>📁+</button>
            <button onClick={(e) => handleNewFolder(e, false)}>📄+</button>
          </div>
        </div>

        <div style={{ display: expand ? "block" : "none", marginLeft: 25 }}>
          {showInput.visible && (
            <div>
              <span>{showInput.isFolder ? "📁" : "📄"}</span>
              <input
                type="text"
                autoFocus
                onBlur={() => setShowInput({ visible: false, isFolder: null })}
                onKeyDown={onAddFolder}
              />
            </div>
          )}
          {explorer.items.map((exp) => (
            <Folder
              key={exp.id}
              explorer={exp}
              handleInsertNode={handleInsertNode}
            />
          ))}
        </div>
      </div>
    );
  } else {
    return (
      <div>
        <span>📄{explorer.name}</span>
      </div>
    );
  }
}

export default Folder;
