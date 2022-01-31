import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import {
  CHeader,
  CToggler,
  CHeaderBrand,
  CHeaderNav,
  CHeaderNavItem,
  CHeaderNavLink,
  CSubheader,
  CBreadcrumbRouter,
} from '@coreui/react'

// routes config
import routes from '../routes'
import { setSideBarStatus } from 'src/redux/actions/AppActions'
import SelectCurrencyInput from 'src/components/SelectCurrencyInput'
import ExpandableImage from 'src/components/ExpandableImage'

const TheHeader = () => {
  const dispatch = useDispatch()
  const sidebarShow = useSelector(state => state.app.sidebar)

  const toggleSidebar = () => {
    const val = [true, 'responsive'].includes(sidebarShow) ? false : 'responsive'
    dispatch(setSideBarStatus(val))
  }

  const toggleSidebarMobile = () => {
    const val = [false, 'responsive'].includes(sidebarShow) ? true : 'responsive'
    dispatch(setSideBarStatus(val))
  }

  const {first_name,last_name} = useSelector(state => state.auth?.user)

  return (
    <CHeader withSubheader>
      <CToggler
        inHeader
        className="ml-md-3 d-lg-none"
        onClick={toggleSidebarMobile}
      />
      <CToggler
        inHeader
        className="ml-3 d-md-down-none"
        onClick={toggleSidebar}
      />
      <CHeaderBrand className="mx-auto d-lg-none" to="/">
        <h3>ZELLER<span className="text-success">SUPER</span></h3> {/*<CIcon name="logo" height="48" alt="Logo"/>*/}
      </CHeaderBrand>

      <CHeaderNav className="d-md-down-none mr-auto">
        <CHeaderNavItem className="px-3" >
          <CHeaderNavLink to="/dashboard">Dashboard</CHeaderNavLink>
        </CHeaderNavItem>
        <CHeaderNavItem  className="px-3">
          <CHeaderNavLink to={`/users`}>Manage Users</CHeaderNavLink>
        </CHeaderNavItem>
        <CHeaderNavItem className="px-3">
          <CHeaderNavLink to="/stores">Stores</CHeaderNavLink>
        </CHeaderNavItem>
      </CHeaderNav>

      <CHeaderNav className="px-3">
        <CHeaderNavItem  className="px-3">
        <CHeaderNavLink to="/settings"><span className="inline-block" style={{fontSize:"1.2em",textTransform:"capitalize"}}>{first_name ?? ""} {last_name ?? ""}</span></CHeaderNavLink>
        </CHeaderNavItem>
        <CHeaderNavItem className="px-3">
          <ExpandableImage height="40px" width="auto" borderRadius="50%" src={'images/avatar.jpg'} />
        </CHeaderNavItem>
      </CHeaderNav>

      <CSubheader className="px-3 justify-content-between">
        <CBreadcrumbRouter 
          className="border-0 c-subheader-nav m-0 px-0 px-md-3" 
          routes={routes} 
        />
          <div className="d-md-down-none mfe-2 c-subheader-nav">
            <SelectCurrencyInput />
          </div>
      </CSubheader>
    </CHeader>
  )
}

export default TheHeader
