import React, { useRef, useState } from 'react';
import ReactDOM from 'react-dom';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { FaArrowRight } from 'react-icons/fa6';
import WriteCaption_Modal from './WriteCaption_Modal';
import { HandleImg } from '../../../Store/MenuBarSlices';



const SelectImageModal = props => {

  

  return ReactDOM.createPortal(
    <>
    {props.children}
    </>,
    document.getElementById('root')
  );
};

export default SelectImageModal;
