export const menuData = {
  categories: [
    { id: 'starters', name: 'Starters' },
    { id: 'zingers', name: 'Zingers & Wings' },
    { id: 'burgers', name: 'Burgers & Sandwiches' },
    { id: 'seafood', name: 'Seafood, Steak & Pasta' },
    { id: 'house', name: 'House Favorites' },
    { id: 'desserts', name: 'Desserts' },
    { id: 'kids', name: 'Kids Menu' },
    { id: 'drinks', name: 'Beverages' }
  ],
  subcategories: {
    drinks: [
      { id: 'draft_beer', name: 'Draft Beer' },
      { id: 'bottled_beer', name: 'Bottled/Can Beer' },
      { id: 'cocktails', name: 'Signature Cocktails' },
      { id: 'wine', name: 'Wine' },
      { id: 'non_alcoholic', name: 'Non-Alcoholic' }
    ]
  },
  items: [
    // --- STARTERS ---
    { id: 's1', categoryId: 'starters', name: 'Sports Bar Nachos', price: 12.99, requiresModifiers: true, modifierGroupIds: ['protein_add', 'nacho_mods'], printStation: 'expo', tags: ['food'], image: 'nachos_img_1779983100168.png' },
    { id: 's2', categoryId: 'starters', name: 'Boom Boom Shrimp', price: 11.49, printStation: 'expo', tags: ['food'], image: 'shrimp_img_1779983311922.png' },
    { id: 's3', categoryId: 'starters', name: 'Mozzarella Sticks', price: 9.99, printStation: 'expo', tags: ['food'], image: 'mozz_sticks_img_1779983326474.png' },
    { id: 's4', categoryId: 'starters', name: 'Spinach & Artichoke Dip', price: 10.99, printStation: 'expo', tags: ['food'], image: 'spinach_dip_img_1779983339779.png' },
    { id: 's9', categoryId: 'starters', name: 'Buffalo Chicken Dip', price: 11.99, printStation: 'expo', tags: ['food'], image: 'buffalo_dip_img_1779983355225.png' },

    // --- ZINGERS & WINGS ---
    { id: 'z1', categoryId: 'zingers', name: 'Zingers® (Boneless)', price: 13.99, requiresModifiers: true, modifierGroupIds: ['sauces', 'dressing'], printStation: 'expo', tags: ['food'], image: 'wings_img_1779983088830.png' },
    { id: 'z2', categoryId: 'zingers', name: 'Zingers Mountain Melt®', price: 16.99, requiresModifiers: true, modifierGroupIds: ['sauces', 'melt_mods'], printStation: 'expo', tags: ['food'], image: 'wings_img_1779983088830.png' },
    { id: 'z3', categoryId: 'zingers', name: 'Traditional Wings (10)', price: 15.99, requiresModifiers: true, modifierGroupIds: ['sauces', 'dressing', 'wing_prep'], printStation: 'expo', tags: ['food'], image: 'wings_img_1779983088830.png' },

    // --- BURGERS & SANDWICHES ---
    { id: 'b1', categoryId: 'burgers', name: 'Prime Burger', price: 15.99, requiresModifiers: true, modifierGroupIds: ['burger_temps', 'burger_mods', 'sides'], printStation: 'grill', tags: ['food'], image: 'burger_img_1779983070354.png' },
    { id: 'b2', categoryId: 'burgers', name: 'Classic Cheeseburger', price: 13.99, requiresModifiers: true, modifierGroupIds: ['burger_temps', 'burger_mods', 'sides'], printStation: 'grill', tags: ['food'], image: 'burger_img_1779983070354.png' },
    { id: 'b6', categoryId: 'burgers', name: 'Prime Rib French Dip', price: 16.99, requiresModifiers: true, modifierGroupIds: ['sandwich_mods', 'sides'], printStation: 'grill', tags: ['food'], image: 'burger_img_1779983070354.png' },

    // --- SEAFOOD, STEAK & PASTA ---
    { id: 'sp1', categoryId: 'seafood', name: 'English Pub Fish & Chips', price: 16.99, requiresModifiers: true, modifierGroupIds: ['seafood_mods'], printStation: 'expo', tags: ['food'], image: 'fish_chips_img_1779983368666.png' },
    { id: 'sp6', categoryId: 'seafood', name: '12oz Ribeye Steak', price: 24.99, requiresModifiers: true, modifierGroupIds: ['burger_temps', 'sides', 'sides'], printStation: 'grill', tags: ['food'], image: 'steak_img_1779983135075.png' },
    
    // --- HOUSE FAVORITES ---
    { id: 'hf1', categoryId: 'house', name: 'Baby Back Ribs (Full Rack)', price: 23.99, requiresModifiers: true, modifierGroupIds: ['sides', 'sides'], printStation: 'grill', tags: ['food'], image: 'ribs_img_1779983387702.png' },
    { id: 'hf4', categoryId: 'house', name: 'Mimi’s Fiesta Bowl (Chicken)', price: 14.99, printStation: 'expo', tags: ['food'], image: 'fiesta_bowl_img_1779983400522.png' },

    // --- DESSERTS ---
    { id: 'ds1', categoryId: 'desserts', name: 'Stadium Sundae', price: 9.99, printStation: 'salad', tags: ['food'], image: 'dessert_img_1779983149779.png' },
    { id: 'ds2', categoryId: 'desserts', name: 'Strawberry Cheesecake', price: 7.99, printStation: 'salad', tags: ['food'], image: 'dessert_img_1779983149779.png' },

    // --- KIDS MENU ---
    { id: 'k1', categoryId: 'kids', name: 'Kid Burger', price: 6.99, requiresModifiers: true, modifierGroupIds: ['kids_sides'], printStation: 'grill', tags: ['food'], image: 'kid_burger_img_1779983412593.png' },

    // --- BEVERAGES (DRAFT BEER) ---
    { id: 'd1', categoryId: 'drinks', subcategoryId: 'draft_beer', name: 'Miller Lite Draft (Pint)', price: 4.50, printStation: 'bar', tags: ['alcohol'], image: 'beer_img_1779983121786.png' },
    { id: 'd3', categoryId: 'drinks', subcategoryId: 'draft_beer', name: 'Blue Moon Draft (Pint)', price: 5.50, printStation: 'bar', tags: ['alcohol'], image: 'beer_img_1779983121786.png' },

    // --- BEVERAGES (BOTTLED/CAN) ---
    { id: 'd7', categoryId: 'drinks', subcategoryId: 'bottled_beer', name: 'Corona Extra Bottle', price: 5.50, printStation: 'bar', tags: ['alcohol'], image: 'corona_img_1779983426883.png' },

    // --- BEVERAGES (COCKTAILS) ---
    { id: 'd11', categoryId: 'drinks', subcategoryId: 'cocktails', name: 'House Margarita', price: 7.00, printStation: 'bar', tags: ['alcohol'], image: 'margarita_img_1779983440984.png' },

    // --- BEVERAGES (WINE) ---
    { id: 'd15', categoryId: 'drinks', subcategoryId: 'wine', name: 'House Red Blend (Glass)', price: 6.50, printStation: 'bar', tags: ['alcohol'], image: 'wine_img_1779983462417.png' },

    // --- BEVERAGES (NON-ALCOHOLIC) ---
    { id: 'd18', categoryId: 'drinks', subcategoryId: 'non_alcoholic', name: 'Coke', price: 2.99, printStation: 'server', tags: ['na_bev'] },
    { id: 'd21', categoryId: 'drinks', subcategoryId: 'non_alcoholic', name: 'Sweet Tea', price: 2.99, printStation: 'server', tags: ['na_bev'] },
  ],
  modifiers: {
    sauces: { name: 'Choose Sauce', multiSelect: false, options: [{ id: 'sauce1', name: 'Mild', price: 0 }, { id: 'sauce2', name: 'Medium', price: 0 }] },
    dressing: { name: 'Choose Dressing', multiSelect: false, options: [{ id: 'dres1', name: 'Ranch', price: 0 }] },
    wing_prep: { name: 'Wing Prep', multiSelect: true, options: [{ id: 'wp1', name: 'All Drums', price: 1.50 }, { id: 'wp3', name: 'Extra Crispy', price: 0 }] },
    burger_temps: { name: 'Meat Temp', multiSelect: false, options: [{ id: 'temp1', name: 'Rare', price: 0 }, { id: 'temp3', name: 'Medium', price: 0 }] },
    burger_mods: { name: 'Burger Mods', multiSelect: true, allowPrefixes: true, options: [{ id: 'bm1', name: 'Lettuce', price: 0 }, { id: 'bm5', name: 'Bacon', price: 1.50 }] },
    sandwich_mods: { name: 'Sandwich Mods', multiSelect: true, allowPrefixes: true, options: [{ id: 'sm1', name: 'Lettuce', price: 0 }, { id: 'sm3', name: 'Mayo', price: 0 }] },
    sides: { name: 'Choose Side', multiSelect: false, options: [{ id: 'sd1', name: 'Fries', price: 0 }, { id: 'sd4', name: 'Onion Rings', price: 1.50 }] },
    kids_sides: { name: 'Kids Side', multiSelect: false, options: [{ id: 'ks1', name: 'Fries', price: 0 }] },
    protein_add: { name: 'Add Protein', multiSelect: false, options: [{ id: 'pa1', name: 'Smoked Chicken', price: 2.00 }, { id: 'pa3', name: 'No Protein', price: 0 }] },
    nacho_mods: { name: 'Nacho Mods', multiSelect: true, allowPrefixes: true, options: [{ id: 'nm1', name: 'Jalapenos', price: 0 }, { id: 'nm3', name: 'Sour Cream', price: 0 }] },
    melt_mods: { name: 'Melt Mods', multiSelect: true, allowPrefixes: true, options: [{ id: 'mm1', name: 'Bacon', price: 0 }, { id: 'mm2', name: 'Scallions', price: 0 }] },
    seafood_mods: { name: 'Seafood Mods', multiSelect: true, allowPrefixes: true, options: [{ id: 'sf1', name: 'Tartar Sauce', price: 0 }] },
  }
};
