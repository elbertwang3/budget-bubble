module.exports = {
  files: [
    {
      fileId: "1DrMqyehNmfgfULmjYEwieqyHitc4xjiiu-SgZKsCTLo",
      type: "sheet",
      name: "data",
      dataDir: "src/data/",
    },
  ],
  /**
   * The dataMutators option makes it possible to modify what's returned by
   * the data fetchers. This is a good place to restructure the raw data, or
   * to do joins with other data you may have.
   */

  dataMutators: {
    data(originalData) {
      const { data, descriptions, department } = originalData;
      originalData.descriptions = descriptions.reduce((obj, item) => {
        obj[item.name] = item.description;
        return obj;
      }, {});

      originalData.department = department.reduce((obj, item) => {
        obj[item.old] = item.new;
        return obj;
      }, {});
      return originalData;
    },
  },

  /**
   * `createAPI` makes it possible to bake out a series of JSON files that get
   * deployed with your project. This is a great way to break up data that users
   * only need a small slice of based on choices they make. The toolkit expects
   * this to return an array of objects. Each object should have a "key" and
   * a "value" - the "key" determines the URL, the "value" is what is saved at
   * that URL.
   */
  apis: [],
};

function objectify(array) {
  return array.reduce((obj, item) => {
    obj[item.old] = item.new;
    return obj;
  }, {});
}
