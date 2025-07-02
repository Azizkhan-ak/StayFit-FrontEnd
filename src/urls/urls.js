export const productsUrls = {
    getProducts:"http://localhost:8080/stayfit/api/public/products.json/getProducts?category="
}

export const ordersUrls = {
    placeOrder : "http://localhost:8080/stayfit/api/public/order.json/placeOrder"
}

export const checkOutUrls ={
    getPaymentIntent:"http://localhost:8080/stayfit/api/public/api/payments/create-payment-intent"
}

export const userManagementUrls = {
    registerUrl:"http://localhost:8080/stayfit/api/public/register",
    loginUrl:"http://localhost:8080/stayfit/api/public/login",
    passwordResetEmail:"http://localhost:8080/stayfit/api/public/passwordResetEmail",
    passwordReset:"http://localhost:8080/stayfit/api/public/passwordReset"
}

export const adminUrls = {
    listInventoryUrl:"http://localhost:8080/stayfit/admin.json/inventory",
    deleteInventoryItemByIdUrl:"http://localhost:8080/stayfit/admin.json/inventory/delete?itemId="
}