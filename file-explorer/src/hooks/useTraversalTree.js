function useTraversalTree() {
  function insertNode(tree, folderId, itemName, isFolder) {
    // edge case
    if (tree.id === folderId && tree.isFolder) {
      tree.items.unshift({
        id: Math.random().toString(),
        name: itemName,
        isFolder: isFolder,
        items: [],
      });
      return tree;
    } else {
      let latestNode = [];
      latestNode = tree.items.map((node) => {
        return insertNode(node, folderId, itemName, isFolder);
      });
      return { ...tree, items: latestNode };
    }
  }
  return { insertNode };
}

export default useTraversalTree;
