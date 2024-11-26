const menuItems = {
  items: [
    {
      id: 'navigation',
      title: 'Navigation',
      type: 'group',
      icon: 'icon-navigation',
      children: [
        {
          id: 'dashboard',
          title: 'Dashboard',
          type: 'item',
          icon: 'feather icon-home',
          url: '/app/dashboard/default'
        },
        {
          id: 'Point of Sale',
          title: 'Point of Sale',
          type: 'item',
          icon: 'feather icon-slack',
          url: '/pos'
          
        },
        
        {
          id: 'Inventory',
          title: 'Inventory',
          type: 'item',
          icon: 'feather icon-package',
          url: '/Inventory'
          
        },
        {
          id: 'Accounts',
          title: 'Accounts',
          type: 'item',
          icon: 'feather icon-layers',
          url: '/Accounts'
          
        },
        {
          id: 'Production',
          title: 'Production',
          type: 'item',
          icon: 'feather icon-aperture',
          url: '/Production'
          
        },
        
        {
          id: 'Article Search',
          title: 'Article Search',
          type: 'item',
          icon: 'feather icon-search',
          url: '/Article'
          
        },
        {
          id: 'Settings',
          title: 'Settings',
          type: 'item',
          icon: 'feather icon-settings',
          url: '/Settings'
        },
        {
          id: 'Logout',
          title: 'Logout',
          type: 'item',
          icon: 'feather icon-log-out',
          url: '/Logout'
        }
      ]
    },
  ]
};

export default menuItems;
