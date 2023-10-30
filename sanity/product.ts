/* eslint-disable import/no-anonymous-default-export */
export default {
  name: "product",
  type: "document",
  title: "Product",
  fields: [
    {
      name: "name", 
      type: "string",
      title: "Name",
    },
    {
      name: "description",
      type: "text",
      title: "Description",
    },
    {
      name: "isNew",
      type: "boolean",
      title: "is Product New?",
    },
    {
      name: "isPopular",
      type: "boolean",
      title: "is Product Popular?",
    },
    {
      name: "isFeatured",
      type: "boolean",
      title: "is Product Featured?",
    },
    {
      name: "color",
      type: "array",
      title: "Color",
      of: [{ type: "string" }],
      options: {
        list: [
          { title: "Red", value: "red" },
          { title: "Black", value: "black" },
          { title: "White", value: "white" },
          { title: "Grey", value: "grey" },
        ],
      },
    },
    {
      name: "size",
      type: "array",
      title: "Size",
      of: [{ type: "string" }],
      options: {
        list: [
          { title: "XS", value: "xs" },
          { title: "S", value: "s" },
          { title: "M", value: "m" },
          { title: "L", value: "l" },
          { title: "XL", value: "xl" },
          { title: "XXL", value: "xxl" },
        ],
      },
    },
    {
      name: "price",
      type: "number",
      title: "Price",
    },
    {
      name: "gender",
      type: "array",
      of: [{ type: "string" }],
      options: {
        list: [
          { title: "Male", value: "male" },
          { title: "Female", value: "female" },
        ],
      },
    },
    {
      name: "category",
      type: "array",
      of: [{ type: "string" }],
      options: {
        list: [
          { title: "Shirts", value: "shirts" },
          { title: "Pants", value: "pants" },
          { title: "Shoes", value: "shoes" },
          { title: "Accessories", value: "accessories" },
          { title: "Jackets", value: "jackets" },
          { title: "Hoodies", value: "hoodies" },
          { title: "Sweaters", value: "sweaters" },
          { title: "T-Shirts", value: "t-shirts" },
          { title: "Jeans", value: "jeans" },
          { title: "Shorts", value: "shorts" },
          { title: "Socks", value: "socks" },
          { title: "Underwear", value: "underwear" },
          { title: "Swimwear", value: "swimwear" },
          { title: "Bags", value: "bags" },
          { title: "Hats", value: "hats" },
          { title: "Jewelry", value: "jewelry" },
          { title: "Watches", value: "watches" },
        ],
      },
    },
    {
      name: "image",
      type: "array",
      title: "Images",
      of: [{ type: "image" }],
    },
  ],
};
