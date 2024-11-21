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
          icon: 'feather icon-box',
          url: '/pos'
          
        },
        
        {
          id: 'Inventory',
          title: 'Inventory',
          type: 'item',
          icon: 'feather icon-box',
          url: '/Inventory'
          
        },
        {
          id: 'Accounts',
          title: 'Accounts',
          type: 'item',
          icon: 'feather icon-box',
          url: '/Accounts'
          
        },
        {
          id: 'Production',
          title: 'Production',
          type: 'item',
          icon: 'feather icon-box',
          url: '/Production'
          
        },
        
        {
          id: 'Article Search',
          title: 'Article Search',
          type: 'item',
          icon: 'feather icon-box',
          url: '/Article'
          
        },
        {
          id: 'Settings',
          title: 'Settings',
          type: 'item',
          icon: 'feather icon-box',
          url: '/Settings'
        }
      ]
    },
    
    
    
  ]
};

export default menuItems;
