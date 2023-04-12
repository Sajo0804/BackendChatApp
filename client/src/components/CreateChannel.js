import React, {useState} from 'react'
import {AiOutlinePlusCircle} from 'react-icons/ai'
import {BsPlusCircle} from 'react-icons/bs'
import axios from 'axios'
import { createChannelRoute } from '../utils/Routes'

const CreateChannel = ({currentUser}) => {
    const [theme, setTheme] = useState();
    const [openModal, setOpenModal] = useState(false);

    const handleCreateChannel = async (e) => {    
        const config = {
          headers:{
            // authorization: "Bearer " + JSON.parse(localStorage.getItem("jwt")),
          }
        };
    
        await axios.put(`${createChannelRoute}`, {
            createdBy: currentUser._id,
            theme: theme,
        }, config);
      }

      const handleOpenModal = () => {
        setOpenModal(!openModal)
      }

  return (
    <div>
        <BsPlusCircle className='add-btn' onClick={handleOpenModal}/>
            {openModal && 
            <div className='modal'>
              <div className='modal-content'>
                  <span onClick={() => {setOpenModal(false)}} class="close">&times;</span>
                  <form onSubmit={handleCreateChannel}>
                    <label htmlFor="">Skapa ett nytt rum</label>
                    <input
                    type="text"
                    placeholder='Rummets ämne...'
                    onChange={(e) => setTheme(e.target.value)}
                    value={theme}
                    />
                    <button type='submit'>Skapa rum</button>
                  </form>
              </div>
            </div>
            }          

    </div>
  )
}

export default CreateChannel