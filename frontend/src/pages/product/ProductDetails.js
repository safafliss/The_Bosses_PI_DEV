import React from 'react'
//date fns
import formatDistanceToNow from 'date-fns/formatDistanceToNow'
import { Link } from 'react-router-dom'
function ProductDetails({product}) {
  return (
    <div className="product-details">
            <h4>{product.category}</h4>
            <p><strong>type: </strong>{product.type}</p>
            <p><strong>brand: </strong>{product.brand}</p>
            <p><strong>price: </strong>{product.price}</p>
            <p><strong>quantity: </strong>{product.quantity}</p>
            <p><strong>expiry_date: </strong>{formatDistanceToNow(new Date(product.expiry_date), {addSuffix: true})}</p>
            <p><strong>description: </strong>{product.description}</p>
            <img src={product.image.url} alt = ""/>
            <span className="material-symbols-outlined">delete</span>
            <br/>
            <Link><button>Update Product</button></Link>
    </div>
  )
}

export default ProductDetails