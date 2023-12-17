import React, { useEffect, useState } from 'react'
import Head from 'next/head';
import { GetServerSideProps, NextPage } from 'next';
import BoxComponent from '@/components/BoxComponent';
import RelatedProducts from '@/components/RelatedProducts';
import { BoxComponentType, ProductType } from '@/types/types';
import PrimaryBtn from '@/components/PrimaryBtn';
import { ToggleBtn } from '@/components/ToggleBtn';
import Favorites from '@/components/Favorites';
import PaginationId from '@/components/PaginationId';
import ProductItem from '@/components/ProductItem';
import { useRouter } from 'next/router';


interface Props {
  products: ProductType[];
  randomProducts: ProductType[];
  boxItemsData: BoxComponentType[];
}

type ActiveView = "addToCard" | "favorites";

const OrderPage: NextPage<Props> = ({ products, boxItemsData, randomProducts }) => {

  const [view, setView] = useState<ActiveView>("addToCard");

  const router = useRouter();
  const [expandedBox, setExpandedBox] = useState(null);
  const [favorites, setFavorites] = useState<ProductType[]>([]);
  const [addToCardProducts, setAddToCardProducts] = useState<ProductType[]>([]);  
  const [productAmounts, setProductAmounts] = useState([]);
  const [orderProducts, setOrderProducts] = useState<ProductType[]>([]);
  const [totalPrice, setTotalPrice] = useState<number>(0);
  const [totalDiscount, setTotalDiscount] = useState<number>(0);


   useEffect(() => {
    const savedFavorites = localStorage.getItem('favorites');
    const savedAddToCardProducts = localStorage.getItem('addToCardProducts');
    const savedProductAmounts = localStorage.getItem('productAmounts');


    if (savedFavorites) {
      const favoritesIds = JSON.parse(savedFavorites);
      const favoritesProducts = products.filter((product) => favoritesIds.includes(product.id));
      setFavorites(favoritesProducts);
    }

    if (savedAddToCardProducts) {
      const addToCardProductIds = JSON.parse(savedAddToCardProducts);
      const productsToOrder = products.filter((product) => addToCardProductIds.includes(product.id));

      setAddToCardProducts(productsToOrder);
      setOrderProducts(productsToOrder);
    }
    if (savedProductAmounts) {
      const productAmountsData = JSON.parse(savedProductAmounts);
      setProductAmounts(productAmountsData);
    }
  }, [products]);


  // --- Цени и пресметки за попуст --- 
  useEffect(() => {
    let priceProducts = 0;
    let price = 0;
    addToCardProducts.forEach((p) => {
        priceProducts += p.price * (getAmountOfProduct(productAmounts, products)[p.id]);
        price = 150 + priceProducts;
      });

      setTotalPrice(price);
    }, [addToCardProducts]);

       
    useEffect(() => {
    let discounts: any = [];

    addToCardProducts.forEach((item) => {
      if (!discounts.includes(item.discount) && item.discount !== 0) {
        discounts.push(item.discount);
      }
    });

    let totalDiscountedPrice = 0;
    discounts.forEach((discount: any) => {
      const productsWithDiscounts = addToCardProducts.filter((p) => p.discount === discount);
      const discountAmount = productsWithDiscounts.length;
      const discountValue = (productsWithDiscounts[0].price * discount) / 100;
      totalDiscountedPrice += discountValue * discountAmount;
    });

    setTotalDiscount(totalDiscountedPrice);
  }, [addToCardProducts]);


        
  const renderDiscount = (discount: any, orderedProducts: any) => {
    let productsWithDiscounts = 0;
    let totalDiscountedPrice = 0;

    orderedProducts.forEach((orderedProduct: any) => {
        if (orderedProduct.discount === discount) {
          productsWithDiscounts++;
          totalDiscountedPrice += (orderedProduct.price * orderedProduct.discount) / 100;
        }
    });

    return { productsWithDiscounts, totalDiscountedPrice };
  };
  // --------- //


  const emptyBasket = () => {
    setAddToCardProducts([]);
    setOrderProducts([]);
    localStorage.removeItem('addToCardProducts');
    localStorage.removeItem('productAmounts');
  };

  // Povlekuvanje podatok za selektirana kolicina na produktot
  const getAmountOfProduct = (productAmounts: { [productId: string] : any }, products: ProductType[]): { [productId: string]: number } => {
      const amountOfProduct: { [productId: string]: number } = {};

      Object.keys(productAmounts).map((productId: any) => {
        const product = products.filter((p) => p.id === productId);
        const amount: number = productAmounts[productId];

        product.map((item: ProductType) => {
          amountOfProduct[item.id] = amount;
        });
      });

      return amountOfProduct;
    };
  
 function continueOrder() {
    const orderedProducts = localStorage.getItem('addToCardProducts');
    if (!orderedProducts) {
      alert('Кошничката е празна, Ве молиме изберете продукти')
    } else {
      router.push({
      pathname: "/order/orderForm",
      });
    }
  }

  const handleBoxClick = (box: any) => {
    setExpandedBox(box === expandedBox ? null : box);
  };


  return (
    <>
      <Head>
        <title>Igralishte-Order</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

        <div className="row d-flex flex-row justify-content-center mt-5">
            <div className="col-12 p-0 flex-row">
              <div className='col-5 align-items-center p-0 text-center mr-2'><img src="../pictures/icons/shopping vehicle.png" /><ToggleBtn title="Кошничка" onClick={() => setView("addToCard")} /></div>
              <div className='col-5 align-items-center text-center p-0'><img src="../pictures/icons/heart-straight-thin.png" /><ToggleBtn title="Омилени" onClick={() => setView("favorites")} /></div>
            </div>
            <div className="col-10 mt-3">
            <hr style={{marginTop: '0', paddingTop: '0.5px', background: "linear-gradient(99.4deg, #FFF0BF -10.68%, #EFC990 18.14%, #FDD292 43.87%, rgba(240, 199, 73, 0.42) 81.17%, #D4AF37 100%)"}}/>
            </div>
          </div>

          {view === "addToCard" ? 
           <div className="container mr-auto ml-auto">
            <div className="row flex-column">
             <div className="col-11 mr-auto ml-auto">
               {addToCardProducts.map((item) => {
                const amountOfProduct = getAmountOfProduct(productAmounts, products)[item.id];
                  if (amountOfProduct > 0) {
                    return (
                        <div key={item.id} style={{position: 'relative'}}>
                          <ProductItem {...item} />
                        </div>
                        )
                      }
                      return null;
                  })}

                {addToCardProducts.map((orderedProduct) => {
                  const amountOfProduct = getAmountOfProduct(productAmounts, products)[orderedProduct.id];
                    if (amountOfProduct > 0) {
                      return (
                        <div key={orderedProduct.id}>                  
                          <div className='flex-row justify-content-between address-text mr-auto ml-auto mb-2' style={{color: 'darkgrey'}}>
                          <div className='mb-2'>{orderedProduct.title} (х{getAmountOfProduct(productAmounts, products)[orderedProduct.id]})</div>
                          <div>{orderedProduct.price} ден.</div>  
                          </div>
                        </div>
                      )
                    }
                    return null;
                })}

                {addToCardProducts.length === 0 ? (
                  <p className='title text-center text-red'>Празна кошничка</p>
                  ) : (
                    <div className='flex-row justify-content-between address-text mr-auto ml-auto mb-2'style={{color:'#8a8328'}}>
                      <p>+  достава до адреса</p>
                      <p>150 ден.</p>
                  </div> ) 
              }  

              <div className='address-text text-red' >
                {(() => {
                  let uniqueDiscounts: any = [];
                  addToCardProducts.forEach((item) => {
                    if (!uniqueDiscounts.includes(item.discount) && item.discount !== 0) {
                      uniqueDiscounts.push(item.discount);
                    }
                  });

                  return uniqueDiscounts.map((discount: any) => {
                    const { productsWithDiscounts, totalDiscountedPrice } = renderDiscount(discount, addToCardProducts);

                    return (
                      <div key={discount} className='flex-row justify-content-between mb-2 align-items-center align-self-center'>
                        <p>{productsWithDiscounts}x  - {discount}% попуст!</p>
                        <p> - {totalDiscountedPrice} ден.</p>
                      </div>
                    );
                  }); 
                })()}
              </div>

                <div className='flex-column my-3'>
                  <div className="col-12 p-0  mr-auto ml-auto">
                    <hr style={{paddingBottom: '0.5px', background: "linear-gradient(99.4deg, #FFF0BF -10.68%, #EFC990 18.14%, #FDD292 43.87%, rgba(240, 199, 73, 0.42) 81.17%, #D4AF37 100%)"}}/>
                    <div className='flex-row justify-content-between my-4 align-items-center align-self-center'>
                        <h2 className='title'>Вкупно: </h2>
                        <h2><strong>{totalPrice - totalDiscount} ден.</strong></h2>                       
                    </div>
                    <hr style={{paddingTop: '0.5px', background: "linear-gradient(99.4deg, #FFF0BF -10.68%, #EFC990 18.14%, #FDD292 43.87%, rgba(240, 199, 73, 0.42) 81.17%, #D4AF37 100%)"}}/>
                  </div>
              </div>
              <div className='flex-row justify-content-start mb-5 align-items-center align-self-center'>
                <li onClick={continueOrder} className='w-75 border-0 bg-transparent mr-3' style={{textDecoration: 'none', listStyle: 'none'}}>
                  <PrimaryBtn title="Продолжи" btnClass={"PrimaryBtn w-100 btn-gold btn-gold-text"} backgroundColor={"btn-gold"} color='black' border='none' height="51px"/></li>
                <div onClick={emptyBasket} style={{cursor: 'pointer'}}>
                   <img src="../../pictures/icons/Basket.png" alt="empty"/> 
                </div>
              </div> 
            </div> 
          </div> 

          {boxItemsData.map((boxItem, index) => {
            return (
                <BoxComponent key={index} boxItem={boxItem} onClick={() => handleBoxClick(boxItem)} expanded={boxItem === expandedBox} padding='0px'/>
              )
            })} 
        </div> : null }

        {view === "favorites" ? <Favorites products={favorites} /> : null}

        <RelatedProducts products={randomProducts}/>
        <PaginationId id='' products={randomProducts}/> 
   </>
   );
 };


export default OrderPage;


export const getServerSideProps: GetServerSideProps = async ({query}) => { 
     
    const page = parseInt(query.page as string, 10) || 1;
    let randomNo: number | undefined;
     
    const response = await fetch('http://localhost:5001/products'); 
    const products: ProductType[] = await response.json();
   
    const resBoxItems = await fetch('http://localhost:5001/boxComponents');
    const boxItemsData: BoxComponentType[] = await resBoxItems.json(); 
    

    products.map(() => {
      if (products.length > 6) {
        randomNo = Math.floor(Math.random() * (products.length - 6));
      }
    });
    

    const resRandomProducts = await fetch(`http://localhost:5001/products?_start=${randomNo}&_limit=6`);
    const randomProducts: ProductType[] = await resRandomProducts.json();


    return { 
        props: { 
            products,
            randomProducts,
            boxItemsData,
            }
        }
}