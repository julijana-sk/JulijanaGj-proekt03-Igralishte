import Link from 'next/link';
import React from 'react'

interface Props {
    breadcrumbs: any;
}

const Breadcrumbs: React.FC<Props> = ({ breadcrumbs }) => {

 return (
    <div className="breadcrumbs col-12 justify-content-start p-0 align-items-center align-self-center text-capitalize">
      {breadcrumbs.map((breadcrumb: any, index: any) => {
        const isLast = index === breadcrumbs.length - 1;
        return (
          <React.Fragment key={breadcrumb.url}>
            <Link href={breadcrumb.url}>
              <p>{breadcrumb.name}</p>
            </Link>
            {!isLast && <span className="breadcrumb-separator mx-2"><img src="../../pictures/icons/arrow-small.png" alt="arrow small" /></span>}
          </React.Fragment>
        );
      })}
   </div>
 );
};

export default Breadcrumbs;


