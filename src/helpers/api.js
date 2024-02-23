import axiosClient from './axiosClient'

const apiProducts = {
    getProducts() {
        const url = 'products'
        return axiosClient.get(url)
    },
    getAboutProducts(id) {
        const url = 'products/' + id
        return axiosClient.get(url)
    },
    searchProducts(str) {
        const url = 'products/search?q=' + str
        return axiosClient.get(url)
    },
    getCategory() {
        const url = 'products/categories'
        return axiosClient.get(url)
    },
    getAboutCategory(name) {
        const url = 'products/category/' + name
        return axiosClient.get(url)
    },
    getProductsSingle(skip) {
        const url = `products?skip=${skip}`
        return axiosClient.get(url)
    },
    getComments(skip, limit) {
        const url = `comments?skip=${skip}&limit=${limit}`
        return axiosClient.get(url)
    }
}

export default apiProducts;