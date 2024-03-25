import { categoryGroup, categoryTemplate } from "../core/selector";

export const createCategory = (categoryName) => {
  const template = categoryTemplate.content.cloneNode(true);
  template.querySelector(".cat-btn").innerText = categoryName;
  return template;
};

export const renderCategory = (categories) => {
  categories.forEach((cat) => categoryGroup.append(createCategory(cat)));
};
