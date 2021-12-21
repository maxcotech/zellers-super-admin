import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import {
  CCreateElement,
  CSidebar,
  CSidebarBrand,
  CSidebarNav,
  CSidebarNavDivider,
  CSidebarNavTitle,
  CSidebarMinimizer,
  CSidebarNavDropdown,
  CSidebarNavItem,
} from '@coreui/react'


// sidebar nav config
import navigation from './_nav'
import { setSideBarStatus } from 'src/redux/actions/AppActions'

const TheSidebar = () => {
  const dispatch = useDispatch()
  const show = useSelector(state => state.app.sidebar)

  return (
    <CSidebar
      show={show}
      onShowChange={(val) => dispatch(setSideBarStatus(val))}
    >
      <CSidebarBrand className="d-md-down-none" to="/">
        <h3>ZELLER<span className="text-danger">SUPER</span></h3>
        {/*<CIcon
          className="c-sidebar-brand-full"
          name="logo-negative"
          height={35}
        />
        <CIcon
          className="c-sidebar-brand-minimized"
          name="sygnet"
          height={35}
        />*/}
      </CSidebarBrand>
      <CSidebarNav>

        <CCreateElement
          items={navigation}
          components={{
            CSidebarNavDivider,
            CSidebarNavDropdown,
            CSidebarNavItem,
            CSidebarNavTitle
          }}
        />
      </CSidebarNav>
      <CSidebarMinimizer className="c-d-md-down-none"/>
    </CSidebar>
  )
}

export default React.memo(TheSidebar)
