import { ProductType } from "@/types/types";
import Link from "next/link";
import { useEffect, useState } from "react";

interface Props {
    products: ProductType[];
    id: string;
}

const Pagination: React.FC<Props> = ({ products, id }) => {

    const [displayAllPages, setDisplayAllPages] = useState(false);
    const [currentPage, setCurrentPage] = useState(1);
    const [productsForPage, setProductsForPage] = useState<ProductType[]>([]);
    const totalPages = Math.ceil((products?.length));

    
    useEffect(() => {
    const indexOfLastProduct = currentPage * 6;
    const indexOfFirstProduct = indexOfLastProduct - 6;
    const currentProducts = products.slice(indexOfFirstProduct, indexOfLastProduct);

        setProductsForPage(currentProducts);
    }, [currentPage]);
            
        
    const handleArrowClick = (direction: string, clickedPage: any) => {
        if (direction === 'previous') {
            setCurrentPage(currentPage - 1);
        } else {
            setCurrentPage(currentPage + 1);
        }
        handleClick(clickedPage);

    };


    const handleClick = (pageNumber: number) => {
     if (pageNumber === currentPage) {
        return;
        }
        setCurrentPage(pageNumber);
    };

    const handleDotsClick = () => {
        setDisplayAllPages(!displayAllPages);
    };



    const displayPageNumbers = () => {
        let pageNumbers = [];
        for (let i = 1; i <= totalPages; i++) {
            const isActive = (i === currentPage) ? "text-red" : "text-dark";
            if (displayAllPages) {
                pageNumbers.push(
                    <Link href={`/products/${id}?page=${i}`} key={i} className={`bg-transparent border-0 font-weight-bold ${isActive}`} onClick={() => handleClick(i)}> {i} </Link>
                );
            } else {
                if (i === 1 || i === 2 || i === 3 || i === 4 ) {
                    pageNumbers.push(
                        <Link href={`/products/${id}?page=${i}`} key={i} className={`bg-transparent border-0 font-weight-bold ${isActive}`} onClick={() => handleClick(i)}> {i} </Link>
                    );
                } else if (i === totalPages) {
                    pageNumbers.push(
                        <div className='d-flex flex-row' key={i}>
                            <button className='bg-transparent border-0 font-weight-bold' onClick={handleDotsClick}>•••</button>
                            <Link href={`/products/${id}?page=${i}`} key={i} className={`bg-transparent border-0 font-weight-bold ${isActive}`} onClick={() => handleClick(i)}> {i} </Link>
                        </div>
                    );
                }
            }
        }
        return pageNumbers;
    };

    return (
        <div className="d-flex flex-row text-center mb-5" style={{ letterSpacing: "3px" }}>
            <button className="bg-transparent border-0 font-weight-bold">
                <Link href={`/products/${id}?page=${currentPage - 1}`} onClick={() => handleArrowClick('previous', currentPage)}>
                    {"<"}
                </Link>
            </button>
            {displayPageNumbers()}
            <button className="bg-transparent border-0 font-weight-bold">
                <Link href={`/products/${id}?page=${currentPage + 1}`} onClick={() => handleArrowClick('next', currentPage)}>
                    {">"}
                </Link>
            </button>
        </div>
    );
};

export default Pagination;