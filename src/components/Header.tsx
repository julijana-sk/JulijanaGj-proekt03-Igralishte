import React, { useContext, useEffect, useState } from "react";
import { UserContext } from "@/context/UserContext";
import { useRouter } from "next/router";
import Link from "next/link";
import { ProductType } from "@/types/types";
import ProductItem from "./ProductItem";


const Header = () => {

  const { products } = useContext(UserContext);
 
  const router = useRouter();
  const [toggleSearch, setToggleSearch] = useState(false);
  const [toggleNav, setToggleNav] = useState(false);
  const [searchState, setSearchState] = useState("");
  const [userValue, setUserValue] = useState("");
  const [searchedProducts, setSearchedProducts] = useState<ProductType[]>([]);
  const [sortedProducts, setSortedProducts] = useState<ProductType[]>([]);
  const [isSorted, setIsSorted] = useState(false);


  const handleSearchSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    router.push({
      pathname: '/',
      query: { query: searchState },
    });
    const filteredProducts: ProductType[] = products.filter((product) =>
      product?.subcategory?.includes(searchState.toLowerCase())
    );
    setSearchedProducts(filteredProducts);
    setSearchState('');
  };

  const toggleSearchForm = () => {
    setSearchState('');
    setToggleSearch(!toggleSearch);
  };

  const handleToggleSearch = () => {
    setToggleSearch(!toggleSearch);
    router.replace("/");
  }

  const handleToggleNav = () => {
    setToggleNav(!toggleNav);
  }

  useEffect(() => {
      const userValueInput = localStorage.getItem("userValue");
      if (userValueInput) {
        setUserValue(userValueInput);
      }
  }, []);

  const handleLogout = () => {
      localStorage.removeItem("userValue");
      localStorage.removeItem("passwordValue");
      router.push("/login");
  };

  function useSortProductsByNewestDate () {
      const sortProducts = (products: ProductType[]) => {
        return products.sort((a, b) => {
          const dateA = new Date(a.date).getTime();
          const dateB = new Date(b.date).getTime();
          return dateB - dateA;
        });
      };
      const sortedProducts = sortProducts(products);
      setSortedProducts(products);
      setIsSorted(true);
      return sortedProducts;
    };
 
return (
    <div className="px-4 py-3">
      <div className="container flex-row justify-content-between text-dark pl-2 pr-0">
          <button onClick={handleToggleNav} className="hamburger-btn" >
            <p className={toggleNav ? "activeHamburger" : "hamburber"} />
            <p className={toggleNav ? "activeHamburger-top" : "hamburber-top"} />
            <p className={toggleNav ? "activeHamburger-bottom" : "hamburber-bottom"} />
          </button>
          <Link href={"/"} className="navbar-brand m-0 text-center">
          <img src="../pictures/icons/Logo Igralishte final version 1.png" alt="logo"/>
          </Link>
          <button className="btn-search p-0" onClick={toggleSearchForm}>
            <img src="../pictures/icons/fluent_search-48-regular.png" alt="search icon" />
          </button>

          <div className={`${toggleSearch ? "show-modal-search" : "d-none " } modal-search-header flex-c-m trans-04 js-hide-modal-search`}>
            <div className="container-search-header">
              <form className="wrap-search-header flex-w p-l-15 align-items-center" onSubmit={handleSearchSubmit}>
                <button className="btn-search px-3" onClick={handleToggleSearch}>
                  <i className="fas fa-chevron-left fa-1x" style={{color: "lightgrey"}}/>
                </button>
                <input className="plh3 p-2" type="search" value={searchState} onChange={event => setSearchState(event.target.value)} name="search" placeholder="Пребарувај..." />
                <button className="btn-search flex-c-m btn-hide-modal-search trans-04 p-0">
                <img src="../pictures/icons/fluent_search-48-regular.png" alt="search close btn" />
              </button>
              </form>
               <div className="row flex-row justify-content-between mt-5 ml-3">
                    <div className="col-12 mr-auto ml-auto">
                    {searchedProducts.length > 0 && (
                      <div className="flex-row justify-content-around">
                      {searchedProducts?.map(product => (
                          <div key={product.id} className="col-5 mr-2 p-0">
                          <div key={product.id}>
                            <ProductItem {...product} />
                          </div>
                            </div>
                        ))}
                        </div>
                      )}
                    </div>
                </div>
            </div>
          </div>
        
          <div className={toggleNav ? "activeSidenav px-4 py-3" : "sidenav px-4 pt-3" }>
            <div className="container flex-row justify-content-between text-dark pl-2 pr-0">
              <button onClick={handleToggleNav} className="hamburger-btn" >
                <p className={toggleNav ? "activeHamburger" : "hamburber"} />
                <p className={toggleNav ? "activeHamburger-top" : "hamburber-top"} />
                <p className={toggleNav ? "activeHamburger-bottom" : "hamburber-bottom"} />
              </button>
              <Link href={"/"} className="navbar-brand m-0 text-center" onClick={handleToggleNav}>
              <img src="../pictures/icons/Logo Igralishte final version 1.png" alt="logo"/>
              </Link>
              <button className="btn-search p-0" onClick={toggleSearchForm}>
                <img src="../pictures/icons/fluent_search-48-regular.png" alt="search icon" />
              </button>

              <div className={`${toggleSearch ? "show-modal-search" : "d-none" } modal-search-header flex-c-m trans-04 js-hide-modal-search`}>
                <div className="container-search-header">
                  <form className="wrap-search-header flex-w p-l-15 align-items-center" onSubmit={handleSearchSubmit}>
                    <button className="btn-search px-3" onClick={handleToggleSearch}>
                      <i className="fas fa-chevron-left fa-1x" style={{color: "lightgrey"}} />
                    </button>
                    <input className="plh3 p-2" type="text" value={searchState} 
                            onChange={(event) => {setSearchState(event.target.value);
                            router.push({
                              pathname: "/",
                              query: {
                                ...router.query,
                                query: event.target.value,
                                },
                            });
                          }}
                          name="search" placeholder="Пребарувај..." />
                    <button className="btn-search flex-c-m btn-hide-modal-search trans-04 p-0">
                    <img src="../pictures/icons/fluent_search-48-regular.png" alt="search close btn" />
                  </button>
                  </form>
                  <div className={`${toggleSearch && searchedProducts.length > 0 ? "show-search-results" : ""} modal-search-header flex-c-m trans-04 js-hide-modal-search`}>
                  <div className="row flex-row justify-content-between mt-5 ml-3">
                    <div className="col-12 mr-auto ml-auto">
                    {searchedProducts.length > 0 && (
                      <div className="flex-row justify-content-around">
                      {searchedProducts?.map(product => (
                          <div key={product.id} className="col-5 mr-2 p-0">
                          <div key={product.id}>
                            <ProductItem {...product} />
                          </div>
                            </div>
                        ))}
                        </div>
                      )}
                    </div>
                  </div>
                </div>
               </div>
              </div>
            </div>
            <ul className="flex-column justify-content-start text-left mx-3 my-5" style={{paddingBottom: '100%'}}>
              <div className="menu-ul mb-5">
                <Link href={'/products'}  onClick={handleToggleNav}><li className='contact-text font-italic font-weight-bold text-left mb-3' onClick={useSortProductsByNewestDate}><u>Ново</u></li></Link>
                    <li className="dropdown dropdown1">
                      <p className="dropdown-toggle  menu-list w-100 mb-3" role="button" data-toggle="dropdown" aria-expanded="false">
                        Vintage облека
                      </p>
                      <div className={`dropdown-menu menu-list text-left {aria-expanded ? ".dropdown-menu.show " : "" }`}  onClick={handleToggleNav}>
                        <div className="d-flex flex-column mr-auto ">
                        <button className="border-0 bg-transparent"
                              onClick={() => {
                              router.push({
                              pathname: "/products",
                              query: {
                                    category: "vintage",
                                    },
                              });
                              }}>
                              <p className="dropdown-item pl-0 font-italic" style={{color: "#8A8328"}}><img src="../pictures/icons/sparks-removebg.png" alt="stars" className="mr-1" /> Види ги сите</p>
                              </button>
                        <button  className="border-0 bg-transparent"
                                onClick={() => {
                                  const { category, ...rest } = router.query;
                                  router.push({
                                  pathname: "/products",
                                  query: {
                                      ...rest,
                                      subcategory: "блузи",
                                      },
                                      });
                                  }}>
                                <p className="dropdown-item dropdown-inside pl-5 pr-0" >Блузи</p>
                              </button >
                        <button  className="border-0 bg-transparent"
                                onClick={() => {
                                  const { category, ...rest } = router.query;
                                  router.push({
                                  pathname: "/products",
                                  query: {
                                      ...rest,
                                    subcategory: "панталони",
                                    },
                                    });
                                }}>
                                <p className="dropdown-item dropdown-inside pl-5 pr-0" >Пантолони</p>
                              </button >
                        <button  className="border-0 bg-transparent"
                                 onClick={() => {
                                  const { category, ...rest } = router.query;
                                  router.push({
                                  pathname: "/products",
                                  query: {
                                      ...rest,
                                    subcategory: "здолништа-шорцеви",
                                    },
                                    });
                                }}>
                                <p className="dropdown-item dropdown-inside pl-5 pr-0" >Здолништа / Шорцеви</p>
                              </button >
                        <button  className="border-0 bg-transparent"
                                onClick={() => {
                                  const { category, ...rest } = router.query;
                                  router.push({
                                  pathname: "/products",
                                  query: {
                                      ...rest,
                                      subcategory: "фустани",
                                      },
                                      });
                                  }}>
                                <p className="dropdown-item dropdown-inside pl-5 pr-0" >Фустани</p>
                              </button >
                        <button  className="border-0 bg-transparent"
                                 onClick={() => {
                                  const { category, ...rest } = router.query;
                                  router.push({
                                  pathname: "/products",
                                  query: {
                                      ...rest,
                                    subcategory: "палта-јакни",
                                    },
                                    });
                                }}>
                                <p className="dropdown-item dropdown-inside pl-5 pr-0" >Палта и јакни</p>
                              </button >
                        <button  className="border-0 bg-transparent"
                                 onClick={() => {
                                  const { category, ...rest } = router.query;
                                  router.push({
                                  pathname: "/products",
                                  query: {
                                      ...rest,
                                    subcategory: "долна-облека",
                                    },
                                    });
                                }}>
                                <p className="dropdown-item dropdown-inside pl-5 pr-0" >Долна облека</p>
                              </button>
                          </div>
                      </div>
                    </li>
                    <li className="dropdown dropdown2 flex-row justify-content-between">
                      <p className="dropdown-toggle menu-list w-100 mb-3" role="button" data-toggle="dropdown" aria-expanded="false">
                        Брендови
                      </p>
                      <div className={`dropdown-menu menu-list text-left {aria-expanded ? ".dropdown-menu.show " : "" } mb-5`}  onClick={handleToggleNav}>
                        <button className="bg-transparent border-0 dropdown-item pl-0 font-italic" style={{color: "#8A8328"}}
                                onClick={() => {
                                  router.replace({
                                  pathname: "/brands",
                                  });
                                  }}>
                                  <img src="../pictures/icons/sparks-removebg.png" alt="stars" className="mr-2" /> Види ги сите</button>
                        <Link href={'/brands/FF54325FCHT'} 
                              className="bg-transparent border-0 dropdown-item pl-5 pr-0 ml-3" >Pinc Partywear</Link>
                        <Link href={'/brands/FF33345FVHT'} 
                              className="bg-transparent border-0 dropdown-item pl-5 pr-0 ml-3" >Factory Girl</Link>
                        <Link href={'/brands/FF4673RRR7S'} 
                              className="bg-transparent border-0 dropdown-item pl-5 pr-0 ml-3" >Main Days</Link>
                        <Link href={'/brands/FF537222THT'} 
                              className="bg-transparent border-0 dropdown-item pl-5 pr-0 ml-3" >Нежно</Link>
                        <Link href={'/brands/FF598599YHT'} 
                              className="bg-transparent border-0 dropdown-item pl-5 pr-0 ml-3" >Ред</Link>
                        <Link href={'/brands/FMJ7633FYHT'} 
                              className="bg-transparent border-0 dropdown-item pl-5 pr-0 ml-3" >Наш</Link>
                        <Link href={'/brands/FF39487FYHT'} 
                              className="bg-transparent border-0 dropdown-item pl-5 pr-0 ml-3" >Зш да не</Link>
                        <Link href={'/brands/FX73633FYHT'} 
                              className="bg-transparent border-0 dropdown-item pl-5 pr-0 ml-3" >Fraeil</Link>
                        <Link href={'/brands/FF54345SWXD'} 
                              className="bg-transparent border-0 dropdown-item pl-5 pr-0 ml-3" >Urma</Link>
                        <Link href={'/brands/FWQC553FYHT'} 
                              className="bg-transparent border-0 dropdown-item pl-5 pr-0 ml-3" >Candle Nest</Link>
                        <Link href={'/brands/FF57ER8FIHT'} 
                              className="bg-transparent border-0 dropdown-item pl-5 pr-0 ml-3" >Beyond Green</Link>
                        <Link href={'/brands/FF5463ISY6E'} 
                              className="bg-transparent border-0 dropdown-item pl-5 pr-0 ml-3" >Gatta</Link>
                      </div>
                    </li>
                    <li className="dropdown dropdown3 flex-row justify-content-between">
                      <p className="dropdown-toggle menu-list w-100 mb-3" role="button" data-toggle="dropdown" aria-expanded="false">
                        Accessories
                      </p>
                      <div className={`dropdown-menu menu-list text-left {aria-expanded ? ".dropdown-menu.show " : "" }`}  onClick={handleToggleNav}>
                        <button className="bg-transparent border-0 dropdown-item pl-0 font-italic" style={{color: "#8A8328"}}
                                onClick={() => {
                                  router.push({
                                  pathname: "/products",
                                  query: {
                                    category: "accessories",
                                    },
                                    });
                                  }}>
                                  <img src="../pictures/icons/sparks-removebg.png" alt="stars" className="mr-2" /> Види ги сите</button>
                        <button className="bg-transparent border-0 dropdown-item pl-5 pr-0 ml-3" 
                                onClick={() => {
                                  router.replace({
                                  pathname: "/products",
                                  query: {
                                      ...router.query,
                                      subcategory: "ташни",
                                      },
                                      });
                                  }}>Ташни</button>
                        <button className="bg-transparent border-0 dropdown-item pl-5 pr-0 ml-3" 
                                onClick={() => {
                                  router.replace({
                                  pathname: "/products",
                                  query: {
                                      ...router.query,
                                      subcategory: "накит",
                                      },
                                      });
                                  }}>Накит</button>
                      </div>
                    </li>
                    <li className="menu-list mb-3" onClick={handleToggleNav}>Lifestyle</li>
                    <Link href={"/gifts"} onClick={handleToggleNav}><li className="menu-list mb-3">Подари картичка*</li></Link>
                    <li className="menu-list font-italic text-red mb-5"  onClick={() => {
                            router.push({
                              pathname: "/products",
                              query: {
                                ...router.query,
                                query: "discount",
                              },
                            });
                            handleToggleNav}}>Попуст</li>
                  <div className="menu-footer my-5">
                    <li className="nav-item" onClick={handleToggleNav}>
                      <Link href={"/order"} className="nav-link d-flex flex-row justify-content-start" >
                        <button className="menu-footer-button menu-pink"><img src="../pictures/icons/shopping vehicle.png" /> </button>
                        <p>Кошничка</p>
                      </Link>
                    </li>
                    <li className="nav-item" onClick={handleToggleNav}>
                      <Link href={"/favorites"} className="nav-link d-flex flex-row justify-content-start">
                        <button className="menu-footer-button"><img src="../pictures/icons/heart-straight-thin.png" /> </button>
                        <p>Омилени</p>
                      </Link>
                    </li>
                    <li className="nav-item"  onClick={handleToggleNav}>
                      <div className="nav-link d-flex flex-row justify-content-start align-items-center" >
                        <button className="menu-footer-button"><img src="../pictures/icons/user-light.png" /></button>
                        {userValue ? (
                          <div className="ml-3 d-flex flex-row flex-wrap justify-content-between">
                            <Link href={"/profile"}> Мој профил /</Link>  
                            <button className='bg-transparent text-left px-2 ml-2 rounded-circle text-center'
                                    onClick={handleLogout}>Logout</button>
                            </div>
                            ) : (
                            <Link href="/login">Регистрирај се/Логирај се</Link>
                          )}
                      </div>
                    </li>
                  </div>
                </div>
              </ul>
          </div>
        </div>
    </div>
  );
};

export default Header;
