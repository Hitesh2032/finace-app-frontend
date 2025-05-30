export function buildTree(data) {
  const map = {};
  const roots = [];

  data.forEach(item => {
    map[item.id] = { ...item, children: [] };
  });

  data.forEach(item => {
    if (item.parentId) {
      map[item.parentId].children.push(map[item.id]);
    } else {
      roots.push(map[item.id]);
    }
  });

  return roots;
}
