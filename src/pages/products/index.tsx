import React, { useEffect, useRef, useState } from 'react'
import Head from 'next/head';
import { GetServerSideProps, NextPage } from 'next';
import ProductItem from '@/components/ProductItem';
import { ProductType } from '@/types/types';
import { useRouter } from 'next/router';
import PrimaryBtn from '@/components/PrimaryBtn';
import Breadcrumbs from '@/components/Breadcrumbs';

interface Props {
  searchedProductsData: ProductType[];
}

const ProductPage: NextPage<Props> = ({  searchedProductsData }) => {

    const breadcrumbs = [
        { name: 'Почетна', url: '/' },
        { name: 'Сите', url: '/products?' },
    ];

    const router = useRouter();
    const [sortedProducts, setSortedProducts] = useState(searchedProductsData);
    const [isSorted, setIsSorted] = useState(false);

    const [toggleSearch, setToggleSearch] = useState(false);
    const searchRef = useRef<HTMLInputElement>(null);
    const [currentPage, setCurrentPage] = useState<number>(1);
    const totalPages = Math.ceil(sortedProducts.length / 10);
    const start = (currentPage - 1) * 10;
    const end = start + 10;
    const paginationProductsForDisplaying = sortedProducts.slice(start, end);

    
  useEffect(() => {
    setSortedProducts(searchedProductsData);
  }, [router.query, searchedProductsData, sortedProducts]);


    let someArray: ProductType[] = []
    searchedProductsData.map((item: ProductType) => {
        if (item.discount > 0) {
            someArray.push(item)
        }
    })

    useEffect(() => {
        if (router.query.category === 'vintage' || router.query.category === 'accessories') {
            setIsSorted(false);
        } else if (router.query.query === 'discount') {
            setSortedProducts(someArray)
        } else {
            setSortedProducts(searchedProductsData);
        }
    }, []);


    const handlePageChange = (page: number) => {
        if (page < 1 || page > totalPages) return;
        setCurrentPage(page);
     };

    const renderPages = () => {
        return Array.from({ length: totalPages }, (_, index) => (
                <a
                key={index}
                className={`flex-c-m how-pagination1 trans-04 m-all-7 pointer font-weight-bold ${
                    currentPage === index + 1
                    ? "active-pagination1 text-danger"
                    : ""
                }`}
                onClick={() => handlePageChange(index + 1)}>
                {index + 1}
                </a>
        ));
    };

    const handleToggleSearch = () => {
        setToggleSearch(!toggleSearch);
        setIsSorted(false);
    }


    function useSortProductsByNewestDate () {
      const sortProducts = (products: ProductType[]) => {
        return products.sort((a, b) => {
          const dateA = new Date(a.date).getTime();
          const dateB = new Date(b.date).getTime();
          return dateB - dateA;
        });
      };
      const sortedProducts = sortProducts(searchedProductsData);
      setSortedProducts(sortedProducts);
      setIsSorted(true);
      return sortedProducts;
    };

    function useSortProductsByOldestDate () {
      const sortProducts = (products: ProductType[]) => {
        return products.sort((a, b) => {
          const dateA = new Date(a.date).getTime();
          const dateB = new Date(b.date).getTime();
          return dateA - dateB;
        });
      };
      const sortedProducts = sortProducts(searchedProductsData);
      setSortedProducts(sortedProducts);
      setIsSorted(true);
      return sortedProducts;
    };


    const handleFilterBySubcategory = (selectedSubcategories: string[]) => {
        const updatedQuery = {
            ...router.query,
            subcategory: selectedSubcategories,
        };
        router.push({
            pathname: "/products",
            query: updatedQuery,
        });
        setCurrentPage(1);
    };

    const handleFilterByColor = (selectedColors: string[]) => {
        const updatedQuery = {
            ...router.query,
            color: selectedColors,
        };
        router.push({
        pathname: "/products",
        query: updatedQuery,
        });
        setCurrentPage(1);
    };

    const handleFilterBySize = (selectedSizes: string[]) => {
        const updatedQuery = {
            ...router.query,
            color: selectedSizes,
        };
        router.push({
        pathname: "/products",
        query: updatedQuery
        });
        setCurrentPage(1);
    };

    const handleFilterByPrice500 = (price: string) => {
        for (let i = 500; i <= 1000; i++ ) {
            router.push({
            pathname: "/products",
            query: {
                ...router.query,
                price_gte: 500,
                price_lte: 1000,
                },
            });
        }
        setCurrentPage(1);        
    }

    const handleFilterByPrice1500 = (price: string) => {
        for (let i = 1500; i <= 2000; i++ ) {
            router.push({
            pathname: "/products",
            query: {
                ...router.query,
                price_gte: 1500,
                price_lte: 2000,
                },
            });
        }
        setCurrentPage(1);
    }
    
    const handleFilterByPrice2000 = (price: string) => {
        for (let i = 2000; i <= 2500; i++ ) {
            router.push({
            pathname: "/products",
            query: {
                ...router.query,
                price_gte: 2000,
                price_lte: 2500,
                },
            });
        }
        setCurrentPage(1);        
    }

    const handleFilterByPrice2500 = (price: string) => {
            router.push({
            pathname: "/products",
            query: {
                ...router.query,
                price_gte: price,
                },
            });
        setCurrentPage(1);
    }

    const handleFilterByDisount = (discount: string) => {
        if (router.query.query === 'discount') {
            router.push({
            pathname: "/products",
            query: {
                ...router.query,
                discount: discount,
            },
            });
        setSortedProducts(someArray)
        setCurrentPage(1);
        };
    }

    const filteringBySearchRefValue = (value: string | undefined) => {
        searchRef.current?.value === ""
        ? router.push({
            pathname: "/products",
            })
        : router.replace({
            pathname: "/products",
            query: {
                ...router.query,
                query: searchRef.current?.value,
            },
            });
        setCurrentPage(1);
        setSortedProducts(searchedProductsData)
    };


return (
    <>
      <Head>
        <title>Igralishte-Product</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
        <div className='col-12 p-0 search-navbar'>
            <div className={`${toggleSearch ? "activeSearch" : "search"} flex-column justify-content-start text-left`}>
            <div className="col-10 p-0 my-5 mr-auto ml-auto">
                <div className="wrap-search-header flex-w p-l-15 align-items-center">
                    <div className="col-12 p-0 m-0 text-center mr-auto ml-auto">
                        <input
                            className="w-100 pl-3"
                            style={{height: '34px'}}
                            type="text"
                            name="search-product"
                            placeholder="Пребарувај ..."
                            ref={searchRef}
                            onChange={() => {
                            filteringBySearchRefValue(searchRef.current?.value);
                            }}/>
                    <img src="../pictures/icons/search.png" className="btn-search btn-search-products" alt="search close btn" onClick={handleToggleSearch}/>
                    </div>
                </div>
                <ul>
                    <li  className="flex-column justify-content-start">
                    <p className="menu-list w-100 mt-5">
                        Категорија
                    </p>
                    <hr className='ml-0 mb-2 mt-3 w-50' style={{paddingBottom: '0.5px', background: "linear-gradient(99.4deg, #FFF0BF -10.68%, #EFC990 100%, #FDD292 100%, rgba(240, 199, 73, 0.42) 81.17%, #D4AF37 100%)"}}/>
                    <div className="d-flex flex-column mr-auto ">
                        <div className="input-group-text">
                            <input type="checkbox" aria-label="Checkbox for following text input"
                                data-filter=".блузи"
                                onClick={() => {
                                    handleFilterBySubcategory(["блузи"]);
                                }} />
                            <p className="p-0 ml-3" >Блузи</p>
                        </div>
                        <div className="input-group-text">
                            <input type="checkbox" aria-label="Checkbox for following text input"
                                data-filter=".панталони"
                                onClick={() => {
                                    handleFilterBySubcategory(["панталони"]);
                                }} />
                            <p className="p-0 ml-3" >Панталони</p>
                        </div>
                        <div className="input-group-text">
                            <input type="checkbox" aria-label="Checkbox for following text input"
                                data-filter=".здолништа-шорцеви"
                                onClick={() => {
                                    handleFilterBySubcategory(["здолништа-шорцеви"]);
                                }} />
                            <p className="p-0 ml-3" >Здолништа / шорцеви</p>
                        </div>
                        <div className="input-group-text">
                            <input type="checkbox" aria-label="Checkbox for following text input"
                                data-filter=".фустани"
                                onClick={() => {
                                    handleFilterBySubcategory(["фустани"])
                                }} />
                            <p className="p-0 ml-3" >Фустани</p>
                        </div>
                        <div className="input-group-text">
                            <input type="checkbox" aria-label="Checkbox for following text input"
                                data-filter=".палта-јакни"
                                onClick={() => {
                                    handleFilterBySubcategory(["палта-јакни"])
                                }} />
                            <p className="p-0 ml-3" >Палта и јакни</p>
                        </div>
                        <div className="input-group-text">
                            <input type="checkbox" aria-label="Checkbox for following text input"
                                data-filter=".долна-облека"
                                onClick={() => {
                                    handleFilterBySubcategory(["долна-облека"])
                                }} />
                            <p className="p-0 ml-3" >Долна облека</p>
                        </div>                        
                    </div>
                    </li>
                    <li  className="flex-column justify-content-start">
                    <p className="menu-list w-100 mt-5">
                        Брендови
                    </p>
                    <hr className='ml-0 mb-2 mt-3 w-50' style={{paddingBottom: '0.5px', background: "linear-gradient(99.4deg, #FFF0BF -10.68%, #EFC990 100%, #FDD292 100%, rgba(240, 199, 73, 0.42) 81.17%, #D4AF37 100%)"}}/>
                        <div className="input-group-text">
                            <input type="checkbox" aria-label="Checkbox for following text input"
                                onClick={() => {
                                    router.push({
                                        pathname: "/products",
                                        query: {
                                            ...router.query,
                                            brand: "pincPartywear",
                                            },
                                    });
                                }} />
                            <p className="p-0 ml-3" >Pinc Partywear</p>
                        </div>
                        <div className="input-group-text">
                            <input type="checkbox" aria-label="Checkbox for following text input"
                                onClick={() => {
                                    router.push({
                                        pathname: "/products",
                                        query: {
                                            ...router.query,
                                            brand: "factoryGirl",
                                            },
                                    });
                                }} />
                            <p className="p-0 ml-3" >Factory Girl</p>
                        </div>
                        <div className="input-group-text">
                            <input type="checkbox" aria-label="Checkbox for following text input"
                                onClick={() => {
                                    router.push({
                                        pathname: "/products",
                                        query: {
                                            ...router.query,
                                            brand: "mainDays",
                                            },
                                    });
                                }} />
                            <p className="p-0 ml-3" >Main Days</p>
                        </div>
                        <div className="input-group-text">
                            <input type="checkbox" aria-label="Checkbox for following text input"
                                onClick={() => {
                                    router.push({
                                        pathname: "/products",
                                        query: {
                                            ...router.query,
                                            brand: "nezno",
                                            },
                                    });
                                }} />
                            <p className="p-0 ml-3" >Нежно</p>
                        </div>
                        <div className="input-group-text">
                            <input type="checkbox" aria-label="Checkbox for following text input"
                                onClick={() => {
                                    router.push({
                                        pathname: "/products",
                                        query: {
                                            ...router.query,
                                            brand: "red",
                                            },
                                    });
                                }} />
                            <p className="p-0 ml-3" >Ред</p>
                        </div>
                        <div className="input-group-text">
                            <input type="checkbox" aria-label="Checkbox for following text input"
                                onClick={() => {
                                    router.push({
                                        pathname: "/products",
                                        query: {
                                            ...router.query,
                                            brand: "nas",
                                            },
                                    });
                                }} />
                            <p className="p-0 ml-3" >Наш</p>
                        </div>
                        <div className="input-group-text">
                            <input type="checkbox" aria-label="Checkbox for following text input"
                                onClick={() => {
                                    router.push({
                                        pathname: "/products",
                                        query: {
                                            ...router.query,
                                            brand: "zsDaNe",
                                            },
                                    });
                                }} />
                            <p className="p-0 ml-3" >Зш да не</p>
                        </div>
                        <div className="input-group-text">
                            <input type="checkbox" aria-label="Checkbox for following text input"
                                onClick={() => {
                                    router.push({
                                        pathname: "/products",
                                        query: {
                                            ...router.query,
                                            brand: "fraeil",
                                            },
                                    });
                                }} />
                            <p className="p-0 ml-3" >Fraeil</p>
                        </div>
                        <div className="input-group-text">
                            <input type="checkbox" aria-label="Checkbox for following text input"
                                onClick={() => {
                                    router.push({
                                        pathname: "/products",
                                        query: {
                                            ...router.query,
                                            brand: "urma",
                                            },
                                    });
                                }} />
                            <p className="p-0 ml-3" >Urma</p>
                        </div>
                        <div className="input-group-text">
                            <input type="checkbox" aria-label="Checkbox for following text input"
                                onClick={() => {
                                    router.push({
                                        pathname: "/products",
                                        query: {
                                            ...router.query,
                                            brand: "candleNest",
                                            },
                                    });
                                }} />
                            <p className="p-0 ml-3" >Candle Nest</p>
                        </div>
                        <div className="input-group-text">
                            <input type="checkbox" aria-label="Checkbox for following text input"
                                onClick={() => {
                                    router.push({
                                        pathname: "/products",
                                        query: {
                                            ...router.query,
                                            brand: "beyondGreen",
                                            },
                                    });
                                }} />
                            <p className="p-0 ml-3" >Beyond Green</p>
                        </div>
                        <div className="input-group-text">
                            <input type="checkbox" aria-label="Checkbox for following text input"
                                onClick={() => {
                                    router.push({
                                        pathname: "/products",
                                        query: {
                                            ...router.query,
                                            brand: "gatta",
                                            },
                                    });
                                }} />
                            <p className="p-0 ml-3" >Gatta</p>
                        </div>
                    </li>
                    <li  className="flex-column justify-content-start">
                    <p className="menu-list w-100 mt-5">
                        Аксесоари
                    </p>
                    <hr className='ml-0 mb-2 mt-3 w-50' style={{paddingBottom: '0.5px', background: "linear-gradient(99.4deg, #FFF0BF -10.68%, #EFC990 100%, #FDD292 100%, rgba(240, 199, 73, 0.42) 81.17%, #D4AF37 100%)"}}/>
                        <div className="input-group-text">
                            <input type="checkbox" aria-label="Checkbox for following text input"
                                data-filter=".ташни"
                                onClick={() => {
                                    handleFilterBySubcategory(["ташни"]);
                                }} />
                            <p className="p-0 ml-3" >Ташни</p>
                        </div>
                        <div className="input-group-text">
                            <input type="checkbox" aria-label="Checkbox for following text input"
                                data-filter=".накит"
                                onClick={() => {
                                    handleFilterBySubcategory(["накит"]);
                                }} />
                            <p className="p-0 ml-3" >Накит</p>
                        </div>
                    </li>
                    <li  className="flex-column justify-content-start">
                    <p className="menu-list w-100 mt-5">
                        Величина
                    </p>
                    <hr className='ml-0 mb-2 mt-3 w-50' style={{paddingBottom: '0.5px', background: "linear-gradient(99.4deg, #FFF0BF -10.68%, #EFC990 100%, #FDD292 100%, rgba(240, 199, 73, 0.42) 81.17%, #D4AF37 100%)"}}/>
                    <div className="input-group-text">
                            <input type="checkbox" aria-label="Checkbox for following text input"
                               data-filter=".XL"
                                onClick={() => {
                                    handleFilterBySize(["XL"]);
                                }} />
                            <p className="p-0 ml-3" >XL</p>
                        </div>
                        <div className="input-group-text">
                            <input type="checkbox" aria-label="Checkbox for following text input"
                                data-filter=".L"
                                onClick={() => {
                                    handleFilterBySize(["L"]);
                                }} />
                            <p className="p-0 ml-3" >L</p>
                        </div>
                        <div className="input-group-text">
                            <input type="checkbox" aria-label="Checkbox for following text input"
                                 data-filter=".M"
                                onClick={() => {
                                    handleFilterBySize(["M"]);
                                }} />
                            <p className="p-0 ml-3" >M</p>
                        </div>
                        <div className="input-group-text">
                            <input type="checkbox" aria-label="Checkbox for following text input"
                                 data-filter=".S"
                                onClick={() => {
                                    handleFilterBySize(["S"]);
                                }} />
                            <p className="p-0 ml-3" >S</p>
                        </div>
                        <div className="input-group-text">
                            <input type="checkbox" aria-label="Checkbox for following text input"
                                 data-filter=".XS"
                                onClick={() => {
                                    handleFilterBySize(["XS"]);
                                }} />
                            <p className="p-0 ml-3" >XS</p>
                        </div>
                    </li>
                    <li  className="flex-column justify-content-start">
                    <p className="menu-list w-100 mt-5">
                        Боја
                    </p>
                    <hr className='ml-0 mb-2 mt-3 w-25' style={{paddingBottom: '0.5px', background: "linear-gradient(99.4deg, #FFF0BF 0%, #EFC990 100%, #FDD292 100%)"}}/>
                    <div className="flex-row justify-content-start mt-3 mb-1">
                        <div className="input-group-text">
                            <input type="color" value="#ff0000" onChange={(event) => {event?.target.value; event.preventDefault}} aria-label="Checkbox for following text input"  className="color-filter mr-2"
                                data-filter=".црвена"
                                onClick={(event) => {
                                    event?.preventDefault();
                                    handleFilterByColor(["црвена"]);
                                }} />
                        </div>
                        <div className="input-group-text">
                            <input type="color" value="#ffa500" onChange={(event) => {event?.target.value; event.preventDefault}} aria-label="Checkbox for following text input"  className="color-filter mr-2"
                                data-filter=".портокалова"
                                onClick={(event) => {
                                    event?.preventDefault();
                                    handleFilterByColor(["портокалова"]);
                                }} />
                        </div>
                        <div className="input-group-text">
                            <input type="color" value="#ffff00" onChange={(event) => {event?.target.value; event.preventDefault}} aria-label="Checkbox for following text input"  className="color-filter mr-2"
                                data-filter=".жолта"
                                onClick={(event) => {
                                    event?.preventDefault();
                                    handleFilterByColor(["жолта"]);
                                }} />
                        </div>
                        <div className="input-group-text">
                            <input type="color" value="#008000" onChange={(event) => {event?.target.value; event.preventDefault}} aria-label="Checkbox for following text input"  className="color-filter mr-2"
                                data-filter=".зелена"
                                onClick={(event) => {
                                    event?.preventDefault();
                                    handleFilterByColor(["зелена"]);
                                }} />
                        </div>
                        <div className="input-group-text">
                            <input type="color" value="#0000ff" onChange={(event) => {event?.target.value; event.preventDefault}} aria-label="Checkbox for following text input"  className="color-filter mr-2"
                                data-filter=".сина"
                                onClick={(event) => {
                                    event?.preventDefault();
                                    handleFilterByColor(["сина"]);
                                }} />
                        </div>
                    </div>
                    <div className="flex-row justify-content-start">                       
                        <div className="input-group-text">
                            <input type="color" value="#ffc0cb" onChange={(event) => {event?.target.value; event.preventDefault}} aria-label="Checkbox for following text input"  className="color-filter mr-2"
                                data-filter=".розева"
                                onClick={(event) => {
                                    event?.preventDefault();
                                    handleFilterByColor(["розева"]);
                                }} />
                        </div>
                        <div className="input-group-text">
                            <input type="color" value="#ee82ee" onChange={(event) => {event?.target.value; event.preventDefault}} aria-label="Checkbox for following text input"  className="color-filter mr-2"
                                data-filter=".виолетова"
                                onClick={(event) => {
                                    event?.preventDefault();
                                    handleFilterByColor(["виолетова"]);
                                }} />
                        </div>
                        <div className="input-group-text">
                            <input type="color" value="#808080" onChange={(event) => {event?.target.value; event.preventDefault}} aria-label="Checkbox for following text input"  className="color-filter mr-2"
                                data-filter=".сива"
                                onClick={(event) => {
                                    event?.preventDefault();
                                    handleFilterByColor(["сива"]);
                                }} />
                        </div>
                        <div className="input-group-text" >
                            <input type="color" value="#ffffff" onChange={(event) => {event?.target.value; event.preventDefault}} aria-label="Checkbox for following text input"  className="color-filter mr-2 border"
                                data-filter=".бела"
                                onClick={(event) => {
                                    event?.preventDefault();
                                    handleFilterByColor(["бела"]);
                                }} />
                        </div>
                        <div className="input-group-text">
                            <input type="color" value="#000000" onChange={(event) => {event?.target.value; event.preventDefault}} aria-label="Checkbox for following text input"  className="color-filter mr-2"
                                data-filter=".црна"
                                onClick={(event) => {
                                    event?.preventDefault();
                                    handleFilterByColor(["црна"]);
                                }} />
                        </div>
                        </div>
                    </li>
                    <li  className="flex-column justify-content-start">
                    <p className="menu-list w-100 mt-5">
                        Цена
                    </p>
                    <hr className='ml-0 mb-2 mt-3 w-25' style={{paddingBottom: '0.5px', background: "linear-gradient(99.4deg, #FFF0BF -10.68%, #EFC990 100%, #FDD292 100%, rgba(240, 199, 73, 0.42) 81.17%, #D4AF37 100%)"}}/>
                    <div className="input-group-text">
                            <input type="checkbox" aria-label="Checkbox for following text input"
                               data-filter=".discount"
                                onClick={() => {
                                    handleFilterByDisount("discount");
                                }} />
                            <p className="p-0 ml-3" style={{color: "#FF5B29"}}>На попуст*</p>
                        </div>
                        <div className="input-group-text">
                            <input type="checkbox" aria-label="Checkbox for following text input"
                                data-filter=".price"
                                onClick={() => {
                                    handleFilterByPrice500("500 д. ер.");
                                }} />
                            <p className="p-0 ml-3" >500 - 1000 ден.</p>
                        </div>
                        <div className="input-group-text">
                            <input type="checkbox" aria-label="Checkbox for following text input"
                                data-filter=".price"
                                onClick={() => {
                                    handleFilterByPrice1500("1500 д. ер.");
                                }} />
                            <p className="p-0 ml-3" >1500 - 2000 ден.</p>
                        </div>
                        <div className="input-group-text">
                            <input type="checkbox" aria-label="Checkbox for following text input"
                                data-filter=".price"
                                onClick={() => {
                                    handleFilterByPrice2000("2000 д. ер.");
                                }} />
                            <p className="p-0 ml-3" >2000 - 2500 ден.</p>
                        </div>
                        <div className="input-group-text">
                            <input type="checkbox" aria-label="Checkbox for following text input"
                                data-filter=".price"
                                onClick={() => {
                                    handleFilterByPrice2500("2500 д. ер.");
                                }} />
                            <p className="p-0 ml-3" >Над 2500 ден.</p>
                        </div>
                    </li>
                   </ul>
            </div>
            <div className='col-11 text-center bottom-sticky mb-4 mr-auto ml-auto' onClick={handleToggleSearch}>
                <PrimaryBtn title="Филтрирај" btnClass={"PrimaryBtn w-100 btn-gold btn-gold-text mb-3"}  backgroundColor={"btn-gold"} color='black' border='none' height="51px"/>
                <button className='border-0 bg-transparent w-100' onClick={handleToggleSearch}><u>oткажи</u></button>
            </div>
            </div>
        </div>
        
        <div className="container-fluid mb-5">
          <div  className="row flex-column">
            <div className="container-fluid">
              <div  className="row flex-row">
                <div className='col-12 ml-5 my-3 px-2 flex-row justify-content-start'><Breadcrumbs breadcrumbs={breadcrumbs} /></div>
                <div className='col-12 flex-row justify-content-between align-items-center mb-3'>
                    <button onClick={handleToggleSearch} className='col-2 p-0 bg-transparent border-0'>
                        <img src="../../pictures/icons/search-group.png"/>
                    </button>
                    <div className="col-10 form-group flex-row flex-nowrap justify-content-end align-items-center p-0 mb-0">
                        <div className="col-11 align-self-center flex-row justify-content-end mr-3 p-0">
                        <label htmlFor="exampleFormControlSelect1" className='dropdown-sort align-self-center mb-0 mr-2'>Подреди според:</label>
                            <select className="form-control mr-1 px-2 py-1" id="exampleFormControlSelect1" style={{height: '5%'}}>
                                <option className='dropdown-sort-select' onClick={useSortProductsByNewestDate}>Најнови</option>
                                <option className='dropdown-sort-select' onClick={useSortProductsByOldestDate}>Најстари</option>
                            </select>
                        </div>
                    </div>
                </div>
                <div className="col-12 flex-row flex-wrap justify-content-around">
                  <div className="row flex-row mr-auto ml-auto justify-content-around isotope-grid">
                    {isSorted ? 
                    (
                      sortedProducts.length < 1 ? (
                        <p>There are no results for your search..</p>
                        ) : (
                            paginationProductsForDisplaying.map((product, productIndex) => {
                            let columnSize = "col-5 product-img-small";
                            let columnText = "product-text-a"
                            for (let i = 2; i < sortedProducts.length; i += 5) {
                            if (productIndex === i ) {columnSize = "col-11"; columnText = "product-text"}}
                            return (
                                <div key={productIndex} className={`${columnSize} ${columnText} p-0 mb-2`}>
                                    <ProductItem key={product.id} {...product} />
                                </div>
                                );
                            })
                            )
                        ) : (
                            searchedProductsData.length < 1 ? (
                            <p>There are no results for your search.</p>
                            ) : (
                                paginationProductsForDisplaying.map((product, productIndex) => {
                                let columnSize = "col-5 product-img-small";
                                let columnText = "product-text-a"
                                for (let i = 2; i < sortedProducts.length; i += 5) {
                                if (productIndex === i ) {columnSize = "col-11"; columnText = "product-text"}}
                                    return (
                                        <div key={productIndex} className={`${columnSize} ${columnText} p-0 mb-2`}>
                                            <ProductItem key={product.id} {...product} />
                                        </div>
                                        );
                                    })
                                )
                            )}
                    </div>
                <div className="flex-l-m flex-w w-full p-t-10 m-lr--7" style={{ letterSpacing: "5px" }}>
                    <button onClick={() => handlePageChange(currentPage - 1)} className='bg-transparent border-0 mr-1'>
                        {"<"}
                    </button>
                    {renderPages()}
                    <button onClick={() => handlePageChange(currentPage + 1)} className='bg-transparent border-0 ml-1'>
                        {">"}
                    </button>
                </div>
                </div>
              </div>
            </div>
          </div>
        </div>
    </>
  ); 
};

export default ProductPage;


export const getServerSideProps: GetServerSideProps = async ({ query }) => { 
    
    const { category, subcategory, color, size, price, brand, q} = query ;

    const queryFilters = { category, subcategory, color, size, brand, price, q};

    const queryParams = Object.entries(queryFilters)
        .filter(([key, value]) => value)
        .map(([key, value]) => {
            if (Array.isArray(value)) {
                return value.map(v => `${key}_like=${v}`).join("&");
            } else {
                return `${key}_like=${value}`;
            }
        })
        .join("&");

    const resSearchedProducts = await fetch(`http://localhost:5001/products?${queryParams}`);

    const searchedProductsData: ProductType[] = await resSearchedProducts.json();

    return { 
        props: { 
            searchedProductsData, 
        }, 
    };
};