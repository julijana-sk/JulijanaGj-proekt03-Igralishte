import { GetStaticProps, NextPage } from 'next'
import Banner from '../components/Banner';
import AnnouncementBar from '@/components/AnnouncementBar';
import { ProductType } from '@/types/types';
import CarouselComponent from '@/components/CarouselComponent';


interface Props {
  products: ProductType[]
}

const HomePage: NextPage<Props> = ({products}) => {

  return (
      <div className='banner-bcg'>
        <AnnouncementBar />      
          <Banner toPage="/products" classOfPicture='banner-picture1' offset={"offset-1 col-11"} imageBanner='../pictures/banner.png' bgColor='btn-pink-circle btn-circle1' img="../pictures/icons/sparks-removebg.png" title='Valentines gal Kолекција' description='Погледни ги свежите љубовни парчиња'>  
            <div className='banner-span'>
              <img className="img1" src="../pictures/icons/Star-big.png" alt="golden star" />
              <span>Ново</span><img className="img2" src="../pictures/icons/Star-small.png" alt="golden star mini" />
            </div>
          </Banner>
          <CarouselComponent products={products}/>
          <Banner toPage="/products" classOfPicture='banner-picture2' offset={"col-11"} imageBanner='../pictures/product-banner.png' bgColor='btn-pink-circle btn-circle2' img="../pictures/icons/sparks-removebg.png" title='Козметика & аксесоари' description='Погледни ги свежите љубовни парчиња'/>
          <div className='relative'>
            <img src="../pictures/Rectangle-gift-banner.png" alt="star" className='rectangle-gift-banner'/>
            <img src="../pictures/icons/Star.png" alt="star" className='star-banner' />
          <Banner toPage="/gifts" classOfPicture='gift-banner' offset={"offset-1 col-11"} imageBanner='../pictures/gift-banner.png' bgColor='btn-white-circle btn-circle1' img="../pictures/icons/sparks-removebg.png" title='GIFT CARDS' description='Избери уникатен подарок за твоите најблиски со нашиот избор на ultra fancy картички за подарок.'/>  
          </div>
      </div>
  );
}

export default HomePage;



export const getStaticProps: GetStaticProps = async () => {

  const resProducts = await fetch("http://localhost:5001/products");
  const products: ProductType[] = await resProducts.json();

 return {
    props: {
      products,  
    },
 };
};

