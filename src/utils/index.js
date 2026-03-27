// 通过当前url展开父菜单
export const findParentKeys = (items, key, parents = []) => {
  for (const item of items) {
    if (item.key === key) {
      return parents;
    }
    if (item.children) {
      const result = findParentKeys(item.children, key, [...parents, item.key]);
      if (result) return result;
    }
  }
  return null;
};
