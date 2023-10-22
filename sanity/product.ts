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
            {title: "Male", value: "male"},
            {title: "Female", value: "female"}
          ]
      }
    }
  ],
};
