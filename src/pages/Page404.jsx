import React from 'react'
import {
  CButton,
  CCol,
  CContainer,
  CFormInput,
  CInputGroup,
  CInputGroupText,
  CRow,
} from '@coreui/react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons'

const Page404 = () => {
  return (
    <div className="bg404 min-vh-100 d-flex flex-row align-items-center">
      <CContainer>
        <CRow className="justify-content-center">
          <CCol md={6}>
            <div className="clearfix">
              <h1 className="float-start display-3 me-4">404</h1>
              <h4 className="pt-3">Lỗi mất rồi!</h4>
              <p className="text-medium-emphasis float-start">
                Chúng tôi không thể tìm thấy trang bạn tìm kiếm.
              </p>
            </div>
            <CInputGroup className="input-prepend">
              <CInputGroupText>
                <FontAwesomeIcon icon={faMagnifyingGlass} />
              </CInputGroupText>
              <CFormInput type="text" placeholder="Bạn muốn tìm gì?" />
              <CButton color="info">Search</CButton>
            </CInputGroup>
          </CCol>
        </CRow>
      </CContainer>
    </div>
  )
}

export default Page404
