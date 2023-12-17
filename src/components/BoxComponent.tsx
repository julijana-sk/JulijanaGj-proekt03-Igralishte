import React from 'react'
import { BoxComponentType } from '@/types/types'


interface Props {
  boxItem: BoxComponentType;
  onClick: () => void;
  expanded: boolean;
  padding?: string;
}
const BoxComponent: React.FC<Props> = ({boxItem, onClick, expanded, padding}) => {
    
  return (
      <div className='container-fluid mb-3'onClick={onClick} style={{padding}}>
        <div className="row flex-row align-items-center">
          <div className="col-10 p-3 border" style={{borderRadius: "4px"}}>
            <div className="flex-row align-items-center justify-content-start">
              <div className='col-12 p-0 flex-row justify-content-between'>
                  <img src={`${boxItem.img}`} alt="box-icon-picture" style={{width: '29px', height: '29px'}}/>
                  <h5 style={{color: "#8A8328"}}>{boxItem.title}</h5>
                  <div >{expanded ? <img src="../pictures/box/X.png" alt="minus" />: <img src="../pictures/box/+.png" alt="expanded plus" /> }</div>
                </div>
              </div>
            {expanded && 
            <div style={{color: "#666560", marginTop: "20px"}}>
              <p>{boxItem.first_content}</p>
              <hr className='border-0 my-3'/>
              <p>{boxItem.second_content}</p>
            </div>}
          </div>
        </div>
      </div>
  )

};

export default BoxComponent