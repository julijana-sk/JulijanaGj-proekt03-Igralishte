import React, {  useEffect, useState } from 'react'
import { GetStaticPaths, GetStaticProps, GetStaticPropsContext, NextPage } from 'next';
import { BoxComponentType, ProductType } from '@/types/types';
import Head from 'next/head';
import BoxComponent from '@/components/BoxComponent';
import RelatedProducts from '@/components/RelatedProducts';
import Link from 'next/link';
import Slider from '@/components/Slider';
import PaginationId from '@/components/PaginationId';
import Breadcrumbs from '@/components/Breadcrumbs';


interface Props {
  product: ProductType;
  products: ProductType[];
  randomProducts: ProductType[];
  boxItemsData: BoxComponentType[];
}

const ProductDetailPage: NextPage<Props> = ({ product, boxItemsData, randomProducts }) => {

  const breadcrumbs = [
      { name: 'Почетна', url: '/' },
      { name: `${product.category}`, url: `/products?category_like=${product.category}`},
      { name: `${product.subcategory}`, url: `/products?subcategory_like=${product.subcategory}}`}
  ];

  const [expandedBox, setExpandedBox] = useState(null);
  
  const [isFavorite, setIsFavorite] = useState(false);
  const [isAddToCard, setIsAddToCard] = useState(false);
  const [favorites, setFavorites] = useState<ProductType[]>([]);
  const [addToCardProducts, setAddToCardProducts] = useState<ProductType[]>([]);  
  const [currentProduct, setCurrentProduct] = useState<ProductType>(product);
  const [productAmounts, setProductAmounts] = useState({});


useEffect(() => {

  if (product.id !== currentProduct.id) {
      localStorage.setItem('amount', JSON.stringify(product.amount));
      currentProduct.amount = product.amount;
        setCurrentProduct(product);
        setIsAddToCard(false);
        setIsFavorite(false);
    }
    const savedFavorites = localStorage.getItem('favorites');
    const savedAddToCardProducts = localStorage.getItem('addToCardProducts');
    const savedProductAmounts = localStorage.getItem('productAmounts');
    
      if (savedFavorites) {
        setFavorites(JSON.parse(savedFavorites));
        setIsFavorite(savedFavorites.includes(product.id));
      }
      
      if (savedAddToCardProducts) {
        setAddToCardProducts(JSON.parse(savedAddToCardProducts));
        setIsAddToCard(savedAddToCardProducts.includes(product.id));
      }

      if (savedProductAmounts) {
          setProductAmounts(JSON.parse(savedProductAmounts));
      }
      
}, [product.id]);


 const toggleFavorite = (id: any) => {
    const updatedFavorites = isFavorite
      ? favorites.filter((favId: any) => favId !== id)
      : [...favorites, id];
    localStorage.setItem('favorites', JSON.stringify(updatedFavorites));
    setFavorites(updatedFavorites);

    setIsFavorite(!isFavorite);
};


  const updateProductAmount = (productId: any, amount: number) => {
      const updatedProductAmounts = {
        ...productAmounts,
        [productId]: amount,
      };

      setProductAmounts(updatedProductAmounts);
      localStorage.setItem('amount', JSON.stringify(amount));
      localStorage.setItem('productAmounts', JSON.stringify(updatedProductAmounts)); 
    }
    
const toggleAddToCard = (id: any, selectedAmount: number) => { 
  // Produktite vo koshnicka kako niza, zaradi presmetki na cena, popust...
  const updatedAddToCard = isAddToCard
      ? addToCardProducts.filter((favId: any) => favId !== id)
      : [...addToCardProducts, id];
    localStorage.setItem('addToCardProducts', JSON.stringify(updatedAddToCard));
    setAddToCardProducts(updatedAddToCard);

  // Podesuvanje selektirana kolicina
  const updatedProductAmounts = {
        ...productAmounts,
        [id]: selectedAmount,
      };

      setProductAmounts(updatedProductAmounts);
      localStorage.setItem('amount', JSON.stringify(selectedAmount));
      localStorage.setItem('productAmounts', JSON.stringify(updatedProductAmounts)); 

  if (isAddToCard === false) { 
    const updatedProductAmounts = { 
      ...productAmounts, 
      [id]: 0 }; 
      setProductAmounts(updatedProductAmounts); 
      localStorage.setItem('productAmounts', JSON.stringify(updatedProductAmounts)); 

    } else { 
      const updatedProductAmounts = { 
        ...productAmounts, 
        [id]: selectedAmount 
      }; 
        setProductAmounts(updatedProductAmounts); 
        localStorage.setItem('productAmounts', JSON.stringify(updatedProductAmounts)); 
      } 

    setIsAddToCard(!isAddToCard); 
    updateProductAmount(id, isAddToCard ? 0 : currentProduct.amount); 
  }

  function onRemoveItem() {
      if (currentProduct.amount <= 0) {
        setCurrentProduct((prevState) => {
            return {
              ...prevState,
              amount: prevState.amount = 0,
            };
          });
        } else {
      if (product.amount >= 1) {
        setCurrentProduct((prevState) => { 
          return {
            ...prevState, 
            amount: prevState.amount - 1 ,
          }
        });
      }
  }}

  function onAddItem() {
      setCurrentProduct(prevState => ({
        ...prevState, 
        amount: prevState.amount + 1 
      }));
  }

  const handleBoxClick = (box: any) => {
    setExpandedBox(box === expandedBox ? null : box);
  }
  

  return (
    <>
      <Head>
        <title>Igralishte-Product Detail</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

        <div className="container-fluid mb-5">
          <div className="row flex-column justify-content-center">
            <div className="col-11 my-3 mr-auto ml-auto">
              <Breadcrumbs breadcrumbs={breadcrumbs} />
              <div>
                <h1 className='title' style={{textAlign: 'left'}}>{product.title}</h1>
                <Slider product={product}/>
              </div>
                <div className='flex-column add-to-card-fixed'>
                { isFavorite ? (
                    <button className={`${isFavorite ? "d-flex" : "d-none"} bg-transparent border-0 menu-footer-button p-0 mb-3`}
                            onClick={(event: React.MouseEvent<HTMLElement>) => {
                                      event.preventDefault();
                                      toggleFavorite(product.id);
                                    }}>
                            <img src="../pictures/icons/heart-full.png" /></button>
                  ) : (  
                    <button className={`${isFavorite ? "d-none" : "d-flex"} bg-transparent border-0 menu-footer-button p-0 mb-3`}
                            onClick={(event: React.MouseEvent<HTMLElement>) => {
                                      event.preventDefault();
                                      toggleFavorite(product.id);
                                    }}>
                            <img src="../pictures/icons/heart-empty.png"/></button>
                  ) }
                  { isAddToCard ? (
                    <button className={`${isAddToCard ? "d-flex" : "d-none"} p-0 menu-footer-button`}
                            onClick={(event: React.MouseEvent<HTMLElement>) => {
                                    event.preventDefault();
                                    toggleAddToCard(product.id, product.amount);
                            }}>
                            <img src="../pictures/icons/Check-floating-icon.png" /></button>
                  ) : (  
                    <button className={`${isAddToCard ? "d-none" : "d-flex"} p-0 menu-footer-button`}
                            onClick={(event: React.MouseEvent<HTMLElement>) => {
                                    event.preventDefault();
                                    toggleAddToCard(product.id, product.amount);
                                }}>
                            <img src="../pictures/icons/shopping cart.png"/></button>
                  ) }
                </div>
                <div className="mt-4">
                <span className="title text-left">{product.price}  ден.</span>
                <p className="text-left my-4">{product.description}</p>
                <div className="row flex-row title justify-content-start ml-auto mr-auto align-items-center text-left mb-2">
                    <p className='mb-1'>Количина: </p>
                    <div className="flex-row justify-content-left ml-3 align-items-center align-self-center">
                    <div className="col-12 p-0">
                      <button onClick={onRemoveItem} className='bg-transparent border-0'><img src='../pictures/icons/minus-amount.png' className='w-50 mb-1 mr-1' alt="alt" /></button>
                      {currentProduct.amount}
                      <button onClick={onAddItem} className='bg-transparent border-0'><img src='../pictures/icons/plus-amount.png' className='w-50 mb-1 ml-1' alt="alt" /></button>
                      </div>
                    </div>
                </div>
                </div>
                <div className="flex-row justify-content-start align-items-center align-self-center">
                  { isAddToCard ? (
                    <div className={`${isAddToCard ? "d-flex" : "d-none"} col-7 text-left p-0`} style={{marginRight: '10px'}}>
                      <button onClick={(event: React.MouseEvent<HTMLElement>) => {
                              event.preventDefault();
                              toggleAddToCard(product.id, product.amount);
                            }} 
                            className='bg-transparent p-0 border-0'>
                      <img src="../pictures/icons/gift-added.png" className='p-0 h-100 w-100' alt="added to card"/></button>
                      </div>
                  ) : 
                    ( <button onClick={(event: React.MouseEvent<HTMLElement>) => {
                              event.preventDefault();
                              toggleAddToCard(product.id, product.amount);
                            }} 
                          className='col-7 addToCardButton add'>Додај во кошничка</button>
                  ) }
                  <i className={isFavorite ? "fas fa-heart fa-2x" : "far fa-heart fa-2x"}
                      onClick={(event: React.MouseEvent<HTMLElement>) => {
                              event.preventDefault();
                              toggleFavorite(product.id);}}></i>
                </div>
                <hr style={{paddingTop: '0.5px', background: "linear-gradient(99.4deg, #FFF0BF -10.68%, #EFC990 18.14%, #FDD292 43.87%, rgba(240, 199, 73, 0.42) 81.17%, #D4AF37 100%)"}}/>
                <div className='flex-row my-4 justify-content-start align-items-center text-left '>
                  <p className='title '>Величина: </p>
                  <div className="border-0 px-2 mx-3" style={{backgroundColor: "#FFDBDB", borderRadius: '4px'}}>{product.model_size}</div>
                  <p className='about-text text-dark'>*само 1 парче</p>
                </div>
                <p>{product.size_description}</p>
                <Link href='#'><p style={{textDecoration: 'underline'}}>види ги димензиите</p></Link>
                <hr style={{paddingBottom: '0.5px', background: "linear-gradient(99.4deg, #FFF0BF -10.68%, #EFC990 18.14%, #FDD292 43.87%, rgba(240, 199, 73, 0.42) 150%, #D4AF37 0%)"}}/>
                <div className='flex-row my-4 title justify-content-start align-items-center text-left '>
                  <p>Боја: </p>
                  <div className="border mx-2 p-2" style={{background: `${product.color_name}`, borderRadius: '4px'}} />
                  <p className='about-text text-dark'>{product.color}</p>
                </div>
                <p className='title text-left'>Материјал: </p>
                  {product.material}
                <div className="flex-row justify-content-start align-items-center">
                  <p className='mr-2'>Постава:</p> 
                  {product.composition}
                </div>
                <div className="flex-row my-4 justify-content-start align-items-center">
                  <p className='title mr-3'>Состојба: {product.condition}</p>
                  <Link href='#'><p style={{textDecoration: 'underline'}}>прочитај повеќе</p></Link>
                </div>
                <p className='title text-left'>Насоки за одржување: </p>
                {product.care_instructions}
                <hr style={{paddingBottom: '0.5px', background: "linear-gradient(99.4deg, #FFF0BF -10.68%, #EFC990 18.14%, #FDD292 43.87%, rgba(240, 199, 73, 0.42) 150%, #D4AF37 0%)"}}/>
                <p className='title text-left'>Ознаки:</p>
                <div className="flex-row mt-2 my-4 justify-content-start align-items-center">
                  <Link href="#" className="badge badge-pill badge-light mb-2 py-2 px-3 mr-1 border-2" style={{boxShadow: "0px 0px 2.3195877075195312px 0px #C2C2C2"}}>{product.subcategory}</Link>
                  <Link href="#" className="badge badge-pill badge-light mb-2 py-2 px-3 mr-1 border-2" style={{boxShadow: "0px 0px 2.3195877075195312px 0px #C2C2C2"}}>{product.category}</Link>
                  <Link href="#" className="badge badge-pill badge-light mb-2 py-2 px-3 mr-1 border-2" style={{boxShadow: "0px 0px 2.3195877075195312px 0px #C2C2C2"}}>{product.material}</Link>
                </div>
            </div>

          {boxItemsData.map((boxItem, index) => {
            return (
              <BoxComponent key={index} boxItem={boxItem} onClick={() => handleBoxClick(boxItem)} expanded={boxItem === expandedBox}/>
            )
          })}

          <RelatedProducts products={randomProducts}/>
          <PaginationId id={product.id} products={randomProducts}/>
      </div>
    </div>
  </>
  );
};


export default ProductDetailPage;



export const getStaticPaths: GetStaticPaths = async () => {

  const response = await fetch('http://localhost:5001/products'); 
  const products: ProductType[] = await response.json();

  const paths = products.map((product: ProductType) => ({
      params: {
        id: product.id,
      },
    }));

  
  return {
    paths,
    fallback: false,
  };
};


export const getStaticProps: GetStaticProps = async ({ params }: GetStaticPropsContext) => {
  
  let product: ProductType | undefined;
  let randomNo: number | undefined;
  
  
  const resBoxItems = await fetch('http://localhost:5001/boxComponents');
  const boxItemsData: BoxComponentType[] = await resBoxItems.json();

  
  const response = await fetch('http://localhost:5001/products'); 
  const products: ProductType[] = await response.json();


  products.map(() => {
    if (products.length > 6) {
      randomNo = Math.floor(Math.random() * (products.length - 6));
    }
  });
  

  const resRandomProducts = await fetch(`http://localhost:5001/products?_start=${randomNo}&_limit=6`);
  const randomProducts: ProductType[] = await resRandomProducts.json();


  const  resProduct = await fetch(`http://localhost:5001/products/${params?.id}`);
  product = await resProduct.json();


  return {
    props: {
      product,
      products,
      randomProducts,
      boxItemsData
    },
  };
};