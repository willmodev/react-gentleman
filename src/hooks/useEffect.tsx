import { useEffect, useState } from 'react'
import { useFetch } from './custom/usefetch';

export interface Products {
    id:          number;
    title:       string;
    price:       number;
    description: string;
    category:    Category;
    image:       string;
    rating:      Rating;
}

export enum Category {
    Electronics = "electronics",
    Jewelery = "jewelery",
    MenSClothing = "men's clothing",
    WomenSClothing = "women's clothing",
}

export interface Rating {
    rate:  number;
    count: number;
}

const URL = "https://fakestoreapi.com/products";


// const getData = async () => {

//     const respone = await fetch("https://fakestoreapi.com/products");
//     const data =  (await respone.json()) as Products[];

//     console.log(data)

//     return data;
// }



export const ProductList = () => {

    const {data: products, loading, error} = useFetch<Products[]>(URL);


    // const [products, setProducts] = useState<Products[]>();
    // useEffect(() => {
    //     getData()
    //     .then( data => setProducts(data) )
    //     .catch( err => console.log(err) );
    // }, []);

    if (loading) { 
        return <div className='text-purple-600 font-semibold text-4xl'>Cargando...</div>
    }

     if (error) {
       return <div className='text-red-600 font-semibold text-4xl'>UPS! Hay un error: {error.message}</div>;
     }

    return (
        <>
            <h1 className='text-2xl font-bold tracking-wider py-5'> Show Product List </h1>
        <section className='grid grid-cols-1 md:grid-cols-3'>

            {
                products?.map( (product) =>  {
                   return  <div key={product.id} className="py-4 px-8 shadow-lg border border-gray-100">
                        <img src={product.image} alt={product.title} className='w-full h-72 object-cover'/>
                        <h1 className='text-lg font-semibold mt-4'>{product.title}</h1>
                        <p className='text-sm text-gray-500'>{product.description}</p>
                        <p className='text-lg font-semibold mt-4'>${product.price}</p>
                   </div>;
                })
            }

        </section>
        </>
    )
}