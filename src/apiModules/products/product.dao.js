const ProductModel = require('./product.model');

module.exports = {
    getCount: (query = {}) => {
        return new Promise(async (resolve, reject) => {
            try {
                resolve(await ProductModel.countDocuments(query));
            } catch (error) {
                reject(error);
            }
        });
    },

    getProductByName: (name) => {
        return new Promise(async (resolve, reject) => {
            try {
                resolve(await ProductModel.findByName(name));
            } catch (error) {
                reject(error);
            }
        });
    },

    getProductById: (id) => {
        return new Promise(async (resolve, reject) => {
            try {
                resolve(
                    await ProductModel.findById(id).populate([
                        {path: 'category', select: 'name uid slug'},
                        {path: 'user', select: {uid: 1, email: 1}},
                    ])
                );
            } catch (error) {
                reject(error);
            }
        });
    },

    getProductList: (filters, {page, limit}) => {
        return new Promise(async (resolve, reject) => {
            try {
                const offset = limit * (page - 1);

                const data = await ProductModel.find(filters)
                    .skip(offset)
                    .limit(limit)
                    .populate([
                        {path: 'category', select: 'name uid slug'},
                        {
                            path: 'user',
                            select: {
                                uid: 1,
                                email: 1,
                            },
                        },
                    ]);

                resolve(data);
            } catch (error) {
                reject(error);
            }
        });
    },

    createProduct: (categoryDto) => {
        return new Promise(async (resolve, reject) => {
            try {
                const user = await ProductModel.create(categoryDto);

                resolve(user);
            } catch (error) {
                reject(error);
            }
        });
    },

    updateProduct: (id, categoryDto) => {
        return new Promise(async (resolve, reject) => {
            try {
                const {...editCategoryInfo} = categoryDto;
                const user = await ProductModel.findByIdAndUpdate(id, editCategoryInfo, {new: true});

                resolve(user);
            } catch (error) {
                reject(error);
            }
        });
    },

    deleteProduct: (id) => {
        return new Promise(async (resolve, reject) => {
            try {
                const user = await ProductModel.findByIdAndRemove(id);

                resolve(user);
            } catch (error) {
                reject(error);
            }
        });
    },
};
