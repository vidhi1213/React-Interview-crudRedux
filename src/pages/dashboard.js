import React, { useState } from 'react'
// import Cookies from 'universal-cookie';
import TextField from 'components/TextField';
import Tabledata from 'components/Tabledata';
import { useDispatch } from 'react-redux';
import {addItemAction, searchItemAction, PageItemAction} from 'store/actions/index'
import { useSelector } from 'react-redux'


const Dashboard = () => {
    // const cookies = new Cookies();
    const dispatch = new useDispatch()
    const [search, setsearch] = useState('')
    const [itemmodal, setitemmodal] = useState(false)
    const [itemdata, setitemdata] = useState({ name:'', price:null})
    // let allitemArr = useSelector((state) => state?.rootReducer?.itemArray);
    // let itemArr = useSelector((state) => state?.rootReducer?.searchArray);
    // let perpage = useSelector((state) => state?.rootReducer?.perpage);
    let StartIndex = useSelector((state) => state?.rootReducer?.pageStartIndex);
    
    const handleChange = (e) => {
        const {name, value} = e?.target
        setitemdata({...itemdata,[name]:value})
    }
    const handleSearch = (e) => {
        setsearch(e?.target?.value)
        dispatch(searchItemAction(e?.target?.value))
    }

    const AddItemModal = () => {
        setitemmodal(true)
    }

    const CancleItem = () => {
        setitemmodal(false)
    }
    const ItemSubmit = (e) => {
        e.preventDefault()
        dispatch(addItemAction(itemdata))
        setitemmodal(false)
        setitemdata({name:'', price:''})
        dispatch(PageItemAction(StartIndex))
    }
  return (
     <>
        {console.log("search",search)}
        <div className='container'>
            <h1 className='text_center address_title'>List Book</h1>
            <div className='text_center search_row'>
                <div className='field_row '>
                    <input type="text" className='bglight' value={search} name='search' placeholder='Search here...' onChange={handleSearch} />
                </div>
            </div>
                {
                    <Tabledata  />
                }
                <div className='text_center button_wrapper'>
                    <button className='link_btn' onClick={() => AddItemModal()}>Add New Item</button>
                </div>
        </div>
        {
            itemmodal && <div className='popup_overlay d_flex jus_center align_center'>
                    <div className='popup'>
                        <h4 className='text_center'>ADD ITEM</h4>
                        <form onSubmit={(e) => ItemSubmit(e)}>
                            <TextField name="name" label="Name" value={itemdata?.name} handleChange={handleChange}   />
                            <TextField name="price" label="Price" value={itemdata?.price} handleChange={handleChange}   />
                            <div className='btn_wrp'>
                                <button onClick={CancleItem}>Cancle</button>
                                <button  type='submit'>Yes</button>
                            </div>
                        </form>
                    </div>
                </div>
        }
       

        


     </> 
  )
}

export default Dashboard