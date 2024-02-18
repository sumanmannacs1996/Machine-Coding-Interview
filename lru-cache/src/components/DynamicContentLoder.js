import React from "react";
import { useState } from "react";
import { useLRUCache } from "../hooks/useLRUCache";

function DynamicContentLoder() {
  const [conent, setContent] = useState([]);
  const { get, put } = useLRUCache(3);
  const loadContent = async (id) => {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        resolve({
          id,
          text: `Tab ${id} Data`,
        });
      }, 1000);
    });
  };

  const handleButtonClick = async (id) => {
    const cachedContent = get(id);
    if (cachedContent) {
      console.log(`Content ${id} loded from cache!`);
      setContent((prev) => [...prev, cachedContent.value]);
    } else {
      console.log(`Loading content ${id}`);
      const response = await loadContent(id);
      put(id, response);
      setContent((prev) => [...prev, response]);
    }
  };
  return (
    <div>
      <h1>Dynamic Content Loader With LRU Cache</h1>
      <div>
        <button onClick={() => handleButtonClick(1)}>Tab1</button>
        <button onClick={() => handleButtonClick(2)}>Tab2</button>
        <button onClick={() => handleButtonClick(3)}>Tab3</button>
        <button onClick={() => handleButtonClick(4)}>Tab4</button>
        <button onClick={() => handleButtonClick(5)}>Tab5</button>
      </div>
      <div>
        <h2>Loaded Content</h2>
        <ul>
          {conent.map((item, idx) => (
            <li key={`${item.id}-${idx}`}>{item.text}</li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default DynamicContentLoder;
