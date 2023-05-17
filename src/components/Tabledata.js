import React, { useState } from 'react'
import { useDispatch } from 'react-redux';
import {removeItemAction} from 'store/actions/index'
import { useSelector } from 'react-redux'
import Modal from 'components/Modal';
import { CSVLink } from "react-csv";
import Pagination from 'components/Pagination';

function Tabledata() {
    const [modal, Setdmodal] = useState()
    const [deleteId, SetdeleteId] = useState()
    let allitemArr = useSelector((state) => state?.rootReducer?.itemArray);
    let paginArray = useSelector((state) => state?.rootReducer?.paginArray);
    let searchText = useSelector((state) => state?.rootReducer?.searchText);
    let searchArr = useSelector((state) => state?.rootReducer?.searchArray);
    let itemsPerPage = useSelector((state) => state?.rootReducer?.perpage);
    const dispatch = new useDispatch()
    const headers = [
        { label: "Name", key: "name" },
        { label: "Price", key: "price" },
      ];
    const RemoveItem = (id) => {
        Setdmodal(true)
        SetdeleteId(id)
    } 
    const DeleteYesClick = () => {
        dispatch(removeItemAction(deleteId))
        SetdeleteId('')
        Setdmodal(false)
    }
    const Cancleclick = () => {
        Setdmodal(false)
    }
    const SortItem = (e) => {
        // dispatch(sortItemAction(e?.target?.value))
        SortFunc(e?.target?.value)
    }

    const SortFunc = (sort) => {
        if(sort === 'price'){
           allitemArr.sort(function(a, b) {
                if(parseInt(a[sort]) < parseInt(b[sort])) return -1;
                if(parseInt(a[sort]) > parseInt(b[sort])) return 1;
                return 0;
               })
        }else{
           allitemArr.sort(function(a, b) {
                if(a[sort].toLowerCase() < b[sort].toLowerCase()) return -1;
                if(a[sort].toLowerCase() > b[sort].toLowerCase()) return 1;
                return 0;
            })
        }
    }


   
  return (
      <>
        <div className='d_flex jus_spbtw mb_20'>
            <div>
                <CSVLink data={allitemArr} headers={headers}>
                    Download CSV
                </CSVLink>
            </div>
            <div>
                <p>Sort By</p>
                <select onChange={SortItem}>
                    <option >Select </option>
                    <option value="name">Name</option>
                    <option value="price">Price</option>
                </select>
            </div>
        </div>
      
        <div className='table_item'>
            <table>
                <thead>
                    <tr>
                        <th>No</th>
                        <th>Name</th>
                        <th>Price</th>
                        <th>Action</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        searchText.length === 0 ? paginArray?.map((item, i) => {
                            return  <tr key={i}>
                                        <td>{i+1}</td>
                                        <td>{item?.name}</td>
                                        <td>{item?.price}</td>
                                        <td>
                                            <button className='link_btn' onClick={() => RemoveItem(item?.id)}>X</button>
                                        </td>
                                    </tr>
                        }) : searchArr.length > 0 ? searchArr?.map((item, i) => {
                            return  <tr key={i}>
                                        <td>{i+1}</td>
                                        <td>{item?.name}</td>
                                        <td>{item?.price}</td>
                                        <td>
                                            <button className='link_btn' onClick={() => RemoveItem(item?.id)}>X</button>
                                        </td>
                                    </tr>
                        }) : "No Data Fopund"
                    }
                    {
                       
                    }
                </tbody>
            </table>
                {/* {
                        searchArr.length === 0 && "No Data Fopund"
                } */}
        </div>
        <div className='pagination'>
            {
                allitemArr.length > itemsPerPage && <Pagination  />
            }
        </div>
        {
            modal && <Modal message="Are you want to sure Delete" Cancleclick={Cancleclick} DeleteYes={DeleteYesClick} />
        }
      </>
  )
}

export default Tabledata