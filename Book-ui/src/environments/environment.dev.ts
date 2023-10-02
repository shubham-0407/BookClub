export const environment = {
    production: false,
    BASE_URL: "http://localhost:3000",
    BOOK_BASE_URL: "http://localhost:3000/book/",
    USER_BASE_URL: "http://localhost:3000/user/",
    SELLER_BASE_URL: "http://localhost:3000/seller/",
    CART_BASE_URL: "http://localhost:3000/cart/",
    ORDER_BASE_URL: "http://localhost:3000/myOrder/",
   
    BOOK:{
        GET_ALL_BOOKS: "list/",
        GET_BOOK: "view?bookId=",
        UPDATE_BOOK: "update",
        DELETE_BOOK: "delete?bookId=",
        SEARCH_BOOK: "search?id=",
        ADD_BOOK: "add",
        
    },
    USER:{
        GET_ALL_USER: "list/",
        GET_USER: "view?userId=",
        UPDATE_USER: "update/",
        DELETE_USER: "delete/",
        SEARCH_USER: "search?id=",
        ADD_USER: "add",
        
    },
    SELLER:{
        GET_ALL_SELLER: "list/",
        GET_SELLER: "view?userId=",
        UPDATE_SELLER: "update/",
        DELETE_SELLER: "delete/",
        SEARCH_SELLER: "search?id=",
        ADD_SELLER: "add"

    },
    CART:{
        REG_CART: "regCart",
        ADD_TO_CART: "add",
        VIEW_CART: "viewCart?email=",
        DELETE_CART_ITEM: "delete",
        DELETE_CART: "deleteCartItem",
        VIEW_USER_CART_ITEM: "viewCart?email="
    },
    ORDER: {
        REG_ORDER: "regOrder",
        ADD: "addOrder",
        VIEW_ORDER: "viewOrder?email="
    }

     
}

//call "BOOK.BASE_URL.GET_ALL_BOOKS "