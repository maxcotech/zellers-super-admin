import React from 'react'
import CIcon from '@coreui/icons-react'
import { resourceStatus } from 'src/config/helpers/resource_helpers'
import { UserStatus } from 'src/config/app_config/user_config'

const _nav =  [
  {
    _tag: 'CSidebarNavItem',
    name: 'Dashboard',
    to: '/dashboard',
    icon: <CIcon name="cil-speedometer" customClasses="c-sidebar-nav-icon"/>,
    badge: {
      color: 'success',
      text: 'NEW',
    }
  },
  {
    _tag: 'CSidebarNavDropdown',
    name: 'Manage Widgets',
    to: '/widgets',
    icon: <CIcon name="cil-calculator" customClasses="c-sidebar-nav-icon"/>,
    badge: {
      color: 'success',
      text: 'NEW',
    },
    _children:[
      {
        _tag: 'CSidebarNavItem',
        name: 'Home Banners',
        to: '/home-banners',
        badge: {
          color: 'success',
          text: 'NEW',
        },
      },
      {
        _tag: 'CSidebarNavItem',
        name: 'Create Widget',
        to: '/widget/create',
        badge: {
          color: 'success',
          text: 'NEW',
        },
      },
      {
        _tag: 'CSidebarNavItem',
        name: 'All Widgets',
        to: '/widgets',
        badge: {
          color: 'success',
          text: 'NEW',
        },
      },
      {
        _tag: 'CSidebarNavItem',
        name: 'Active Widgets',
        to: '/widgets/'+resourceStatus.active,
        badge: {
          color: 'success',
          text: 'NEW',
        },
      },
      {
        _tag: 'CSidebarNavItem',
        name: 'Inactive Widgets',
        to: '/widgets/'+resourceStatus.inactive,
        badge: {
          color: 'success',
          text: 'NEW',
        },
      },
      {
        _tag: 'CSidebarNavItem',
        name: 'Draft Widgets',
        to: '/widgets/'+resourceStatus.in_draft,
        badge: {
          color: 'success',
          text: 'NEW',
        },
      },
      {
        _tag: 'CSidebarNavItem',
        name: 'Review Widgets',
        to: '/widgets/'+resourceStatus.in_review,
        badge: {
          color: 'success',
          text: 'NEW',
        },
      },
      {
        _tag: 'CSidebarNavItem',
        name: 'Blacklisted Widgets',
        to: '/widgets/'+resourceStatus.blacklisted,
        badge: {
          color: 'success',
          text: 'NEW',
        },
      }
    ]
  },
  {
    _tag: 'CSidebarNavDropdown',
    name: 'Manage Categories',
    to: '/categories',
    icon: <CIcon name="cil-calculator" customClasses="c-sidebar-nav-icon"/>,
    badge: {
      color: 'success',
      text: 'NEW',
    },
    _children:[
      {
        _tag: 'CSidebarNavItem',
        name: 'Categories',
        to: '/categories',
        badge: {
          color: 'success',
          text: 'NEW',
        },
      },
    ]
  },
  {
    _tag: 'CSidebarNavDropdown',
    name: 'Manage Users',
    to: '/users',
    icon: <CIcon name="cil-user" customClasses="c-sidebar-nav-icon"/>,
    badge: {
      color: 'success',
      text: 'NEW',
    },
    _children:[
      {
        _tag: 'CSidebarNavItem',
        name: 'All Users',
        to: '/users',
        badge: {
          color: 'success',
          text: 'NEW',
        },
      },
      {
        _tag: 'CSidebarNavItem',
        name: 'Active Users',
        to: '/users/'+UserStatus.active,
        badge: {
          color: 'success',
          text: 'NEW',
        },
      },
      {
        _tag: 'CSidebarNavItem',
        name: 'Inactive Users',
        to: '/users/'+UserStatus.inactive,
        badge: {
          color: 'success',
          text: 'NEW',
        },
      },
      {
        _tag: 'CSidebarNavItem',
        name: 'Read Only Users',
        to: '/users/'+UserStatus.readOnly,
        badge: {
          color: 'success',
          text: 'NEW',
        },
      }
    ]
  },
  {
    _tag: 'CSidebarNavDropdown',
    name: 'Manage Stores',
    to: '/stores',
    icon: <CIcon name="cil-grid" customClasses="c-sidebar-nav-icon"/>,
    badge: {
      color: 'success',
      text: 'NEW',
    },
    _children:[
      {
        _tag: 'CSidebarNavItem',
        name: 'All Stores',
        to: '/stores',
        badge: {
          color: 'success',
          text: 'NEW',
        },
      },
      {
        _tag: 'CSidebarNavItem',
        name: 'Active Stores',
        to: `/stores/${resourceStatus.active}`,
        badge: {
          color: 'success',
          text: 'NEW',
        },
      },
      {
        _tag: 'CSidebarNavItem',
        name: 'Inactive Stores',
        to: `/stores/${resourceStatus.inactive}`,
        badge: {
          color: 'success',
          text: 'NEW',
        },
      },
      {
        _tag: 'CSidebarNavItem',
        name: 'Draft Stores',
        to: `/stores/${resourceStatus.in_draft}`,
        badge: {
          color: 'success',
          text: 'NEW',
        },
      },
      {
        _tag: 'CSidebarNavItem',
        name: 'Review Stores',
        to: `/stores/${resourceStatus.in_review}`,
        badge: {
          color: 'success',
          text: 'NEW',
        },
      },
      {
        _tag: 'CSidebarNavItem',
        name: 'Blacklisted Stores',
        to: `/stores/${resourceStatus.blacklisted}`,
        badge: {
          color: 'success',
          text: 'NEW',
        },
      },

    ]
  },
  {
    _tag: 'CSidebarNavDropdown',
    name: 'Manage Products',
    to: '/products',
    icon: <CIcon name="cil-puzzle" customClasses="c-sidebar-nav-icon"/>,
    badge: {
      color: 'success',
      text: 'NEW',
    },
    _children:[
      {
        _tag: 'CSidebarNavItem',
        name: 'All Products',
        to: '/products',
        badge: {
          color: 'success',
          text: 'NEW',
        },
      },
      {
        _tag: 'CSidebarNavItem',
        name: 'Active Products',
        to: `/products/${resourceStatus.active}`,
        badge: {
          color: 'success',
          text: 'NEW',
        },
      },
      {
        _tag: 'CSidebarNavItem',
        name: 'Inactive Products',
        to: `/products/${resourceStatus.inactive}`,
        badge: {
          color: 'success',
          text: 'NEW',
        },
      },
      {
        _tag: 'CSidebarNavItem',
        name: 'Draft Products',
        to: `/products/${resourceStatus.in_draft}`,
        badge: {
          color: 'success',
          text: 'NEW',
        },
      },
      {
        _tag: 'CSidebarNavItem',
        name: 'Review Products',
        to: `/products/${resourceStatus.in_review}`,
        badge: {
          color: 'success',
          text: 'NEW',
        },
      },
      {
        _tag: 'CSidebarNavItem',
        name: 'Blacklisted Products',
        to: `/products/${resourceStatus.blacklisted}`,
        badge: {
          color: 'success',
          text: 'NEW',
        },
      }
    ]
  },
  {
    _tag: 'CSidebarNavDropdown',
    name: 'Manage Brands',
    to: '/',
    icon: <CIcon name="cil-drop" customClasses="c-sidebar-nav-icon"/>,
    badge: {
      color: 'success',
      text: 'NEW',
    },
    _children:[
      {
        _tag: 'CSidebarNavItem',
        name: 'All Brands',
        to: '/brands',
        badge: {
          color: 'success',
          text: 'NEW',
        },
      },
      {
        _tag: 'CSidebarNavItem',
        name: 'Active Brands',
        to: `/brands/${resourceStatus.active}`,
        badge: {
          color: 'success',
          text: 'NEW',
        },
      },
      {
        _tag: 'CSidebarNavItem',
        name: 'Inactive Brands',
        to: `/brands/${resourceStatus.inactive}`,
        badge: {
          color: 'success',
          text: 'NEW',
        },
      },
      {
        _tag: 'CSidebarNavItem',
        name: 'Draft Brands',
        to: `/brands/${resourceStatus.in_draft}`,
        badge: {
          color: 'success',
          text: 'NEW',
        },
      },
      {
        _tag: 'CSidebarNavItem',
        name: 'Review Brands',
        to: `/brands/${resourceStatus.in_review}`,
        badge: {
          color: 'success',
          text: 'NEW',
        },
      },
      {
        _tag: 'CSidebarNavItem',
        name: 'Blacklisted Brands',
        to: `/brands/${resourceStatus.blacklisted}`,
        badge: {
          color: 'success',
          text: 'NEW',
        },
      },

    ]
  },
  {
    _tag: 'CSidebarNavDropdown',
    name: 'Manage Funds',
    to: '/funds',
    icon: <CIcon name="cil-credit-card" customClasses="c-sidebar-nav-icon"/>,
    badge: {
      color: 'success',
      text: 'NEW',
    },
    _children:[
      {
        _tag: 'CSidebarNavItem',
        name: 'Admin Wallet',
        to: '/funds/wallet',
        badge: {
          color: 'success',
          text: 'NEW',
        },
      },
      {
        _tag: 'CSidebarNavItem',
        name: 'Withdrawal Requests',
        to: '/funds/withdrawal-requests',
        badge: {
          color: 'success',
          text: 'NEW',
        },
      }
     
      
    ]
  },
  {
    _tag: 'CSidebarNavDropdown',
    name: 'Manage Locations',
    to: '/locations',
    icon: <CIcon name="cil-credit-card" customClasses="c-sidebar-nav-icon"/>,
    badge: {
      color: 'success',
      text: 'NEW',
    },
    _children:[
      {
        _tag: 'CSidebarNavItem',
        name: 'Supported Countries',
        to: '/locations',
        badge: {
          color: 'success',
          text: 'NEW',
        },
      },
     
      
    ]
  },
  {
    _tag: 'CSidebarNavDropdown',
    name: 'Manage Account',
    to: '/settings',
    icon: <CIcon name="cil-credit-card" customClasses="c-sidebar-nav-icon"/>,
    badge: {
      color: 'success',
      text: 'NEW',
    },
    _children:[
      {
        _tag: 'CSidebarNavItem',
        name: 'Account Settings',
        to: '/settings',
        badge: {
          color: 'success',
          text: 'NEW',
        },
      },
     
      
    ]
  },
  {
    _tag: 'CSidebarNavDropdown',
    name: 'Support Messages',
    to: '/supports',
    icon: <CIcon name="cil-pencil" customClasses="c-sidebar-nav-icon"/>,
    badge: {
      color: 'success',
      text: 'NEW',
    },
    _children:[
      {
        _tag: 'CSidebarNavItem',
        name: 'Unread Messages',
        to: '/supports/0',
        badge: {
          color: 'success',
          text: 'NEW',
        },
      },
      {
        _tag: 'CSidebarNavItem',
        name: 'Read Messages',
        to: '/supports/1',
        badge: {
          color: 'success',
          text: 'NEW',
        },
      },
      {
        _tag: 'CSidebarNavItem',
        name: 'All Messages',
        to: '/supports',
        badge: {
          color: 'success',
          text: 'NEW',
        },
      }
     
      
    ]
  },
  {
    _tag: 'CSidebarNavItem',
    name: 'Logout',
    to: '/logout',
    icon: <CIcon name="cil-user-unfollow" customClasses="c-sidebar-nav-icon"/>,
    badge: {
      color: 'success',
      text: 'NEW',
    }
  }

  
  
  
  
  
  
  
  
  
  
/*
  
  {
    _tag: 'CSidebarNavTitle',
    _children: ['Theme']
  },
  {
    _tag: 'CSidebarNavItem',
    name: 'Colors',
    to: '/theme/colors',
    icon: 'cil-drop',
  },
  {
    _tag: 'CSidebarNavItem',
    name: 'Typography',
    to: '/theme/typography',
    icon: 'cil-pencil',
  },
  {
    _tag: 'CSidebarNavTitle',
    _children: ['Components']
  },
  {
    _tag: 'CSidebarNavDropdown',
    name: 'Base',
    route: '/base',
    icon: 'cil-puzzle',
    _children: [
      {
        _tag: 'CSidebarNavItem',
        name: 'Breadcrumb',
        to: '/base/breadcrumbs',
      },
      {
        _tag: 'CSidebarNavItem',
        name: 'Cards',
        to: '/base/cards',
      },
      {
        _tag: 'CSidebarNavItem',
        name: 'Carousel',
        to: '/base/carousels',
      },
      {
        _tag: 'CSidebarNavItem',
        name: 'Collapse',
        to: '/base/collapses',
      },
      {
        _tag: 'CSidebarNavItem',
        name: 'Forms',
        to: '/base/forms',
      },
      {
        _tag: 'CSidebarNavItem',
        name: 'Jumbotron',
        to: '/base/jumbotrons',
      },
      {
        _tag: 'CSidebarNavItem',
        name: 'List group',
        to: '/base/list-groups',
      },
      {
        _tag: 'CSidebarNavItem',
        name: 'Navs',
        to: '/base/navs',
      },
      {
        _tag: 'CSidebarNavItem',
        name: 'Navbars',
        to: '/base/navbars',
      },
      {
        _tag: 'CSidebarNavItem',
        name: 'Pagination',
        to: '/base/paginations',
      },
      {
        _tag: 'CSidebarNavItem',
        name: 'Popovers',
        to: '/base/popovers',
      },
      {
        _tag: 'CSidebarNavItem',
        name: 'Progress',
        to: '/base/progress-bar',
      },
      {
        _tag: 'CSidebarNavItem',
        name: 'Switches',
        to: '/base/switches',
      },
      {
        _tag: 'CSidebarNavItem',
        name: 'Tables',
        to: '/base/tables',
      },
      {
        _tag: 'CSidebarNavItem',
        name: 'Tabs',
        to: '/base/tabs',
      },
      {
        _tag: 'CSidebarNavItem',
        name: 'Tooltips',
        to: '/base/tooltips',
      },
    ],
  },
  {
    _tag: 'CSidebarNavDropdown',
    name: 'Buttons',
    route: '/buttons',
    icon: 'cil-cursor',
    _children: [
      {
        _tag: 'CSidebarNavItem',
        name: 'Buttons',
        to: '/buttons/buttons',
      },
      {
        _tag: 'CSidebarNavItem',
        name: 'Brand buttons',
        to: '/buttons/brand-buttons',
      },
      {
        _tag: 'CSidebarNavItem',
        name: 'Buttons groups',
        to: '/buttons/button-groups',
      },
      {
        _tag: 'CSidebarNavItem',
        name: 'Dropdowns',
        to: '/buttons/button-dropdowns',
      }
    ],
  },
  {
    _tag: 'CSidebarNavItem',
    name: 'Charts',
    to: '/charts',
    icon: 'cil-chart-pie'
  },
  {
    _tag: 'CSidebarNavDropdown',
    name: 'Icons',
    route: '/icons',
    icon: 'cil-star',
    _children: [
      {
        _tag: 'CSidebarNavItem',
        name: 'CoreUI Free',
        to: '/icons/coreui-icons',
        badge: {
          color: 'success',
          text: 'NEW',
        },
      },
      {
        _tag: 'CSidebarNavItem',
        name: 'CoreUI Flags',
        to: '/icons/flags',
      },
      {
        _tag: 'CSidebarNavItem',
        name: 'CoreUI Brands',
        to: '/icons/brands',
      },
    ],
  },
  {
    _tag: 'CSidebarNavDropdown',
    name: 'Notifications',
    route: '/notifications',
    icon: 'cil-bell',
    _children: [
      {
        _tag: 'CSidebarNavItem',
        name: 'Alerts',
        to: '/notifications/alerts',
      },
      {
        _tag: 'CSidebarNavItem',
        name: 'Badges',
        to: '/notifications/badges',
      },
      {
        _tag: 'CSidebarNavItem',
        name: 'Modal',
        to: '/notifications/modals',
      },
      {
        _tag: 'CSidebarNavItem',
        name: 'Toaster',
        to: '/notifications/toaster'
      }
    ]
  },
  {
    _tag: 'CSidebarNavItem',
    name: 'Widgets',
    to: '/widgets',
    icon: 'cil-calculator',
    badge: {
      color: 'info',
      text: 'NEW',
    },
  },
  {
    _tag: 'CSidebarNavDivider'
  },
  {
    _tag: 'CSidebarNavTitle',
    _children: ['Extras'],
  },
  {
    _tag: 'CSidebarNavDropdown',
    name: 'Pages',
    route: '/pages',
    icon: 'cil-star',
    _children: [
      {
        _tag: 'CSidebarNavItem',
        name: 'Login',
        to: '/login',
      },
      {
        _tag: 'CSidebarNavItem',
        name: 'Register',
        to: '/register',
      },
      {
        _tag: 'CSidebarNavItem',
        name: 'Error 404',
        to: '/404',
      },
      {
        _tag: 'CSidebarNavItem',
        name: 'Error 500',
        to: '/500',
      },
    ],
  },
  {
    _tag: 'CSidebarNavItem',
    name: 'Disabled',
    icon: 'cil-ban',
    badge: {
      color: 'secondary',
      text: 'NEW',
    },
    addLinkClass: 'c-disabled',
    'disabled': true
  },
  {
    _tag: 'CSidebarNavDivider',
    className: 'm-2'
  },
  {
    _tag: 'CSidebarNavTitle',
    _children: ['Labels']
  },
  {
    _tag: 'CSidebarNavItem',
    name: 'Label danger',
    to: '',
    icon: {
      name: 'cil-star',
      className: 'text-danger'
    },
    label: true
  },
  {
    _tag: 'CSidebarNavItem',
    name: 'Label info',
    to: '',
    icon: {
      name: 'cil-star',
      className: 'text-info'
    },
    label: true
  },
  {
    _tag: 'CSidebarNavItem',
    name: 'Label warning',
    to: '',
    icon: {
      name: 'cil-star',
      className: 'text-warning'
    },
    label: true
  },
  {
    _tag: 'CSidebarNavDivider',
    className: 'm-2'
  }*/
]

export default _nav
