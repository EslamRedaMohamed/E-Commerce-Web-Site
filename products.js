const products=await fetchProducts()
async function fetchProducts() {
    try {
        var response = await fetch('https://dummyjson.com/products');
        var data = await response.json();
        return data.products;
    } catch (error) {
        console.error('Error fetching products:', error);
    }
    finally{
        console.log("Data Fetched");
    }
}
export default products