export const menuData = {
  categories: [
    { id: 'starters', name: 'Starters' },
    { id: 'zingers', name: 'Zingers & Wings' },
    { id: 'burgers', name: 'Burgers & Sandwiches' },
    { id: 'seafood', name: 'Seafood, Steak & Pasta' },
    { id: 'salads', name: 'Soups & Salads' },
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
    { id: 's1', categoryId: 'starters', name: 'Sports Bar Nachos', price: 12.99, requiresModifiers: true, modifierGroupIds: ['protein_add', 'nacho_mods'], printStation: 'expo', tags: ['food'] },
    { id: 's2', categoryId: 'starters', name: 'Boom Boom Shrimp', price: 11.49, printStation: 'expo', tags: ['food'] },
    { id: 's3', categoryId: 'starters', name: 'Mozzarella Sticks', price: 9.99, printStation: 'expo', tags: ['food'] },
    { id: 's4', categoryId: 'starters', name: 'Spinach & Artichoke Dip', price: 10.99, printStation: 'expo', tags: ['food'] },
    { id: 's5', categoryId: 'starters', name: 'Buffalo Chicken Dip', price: 11.99, printStation: 'expo', tags: ['food'] },
    { id: 's6', categoryId: 'starters', name: 'Bavarian Pretzel Bites', price: 10.49, printStation: 'expo', tags: ['food'] },
    { id: 's7', categoryId: 'starters', name: 'Loaded Cheese Fries', price: 11.99, requiresModifiers: true, modifierGroupIds: ['melt_mods'], printStation: 'expo', tags: ['food'] },
    { id: 's8', categoryId: 'starters', name: 'Zinger Flatbread', price: 13.49, printStation: 'expo', tags: ['food'] },

    // --- ZINGERS & WINGS ---
    { id: 'z1', categoryId: 'zingers', name: 'Zingers® (Boneless)', price: 14.99, requiresModifiers: true, modifierGroupIds: ['sauces', 'dressing'], printStation: 'expo', tags: ['food'] },
    { id: 'z2', categoryId: 'zingers', name: 'Zingers Mountain Melt®', price: 17.99, requiresModifiers: true, modifierGroupIds: ['sauces', 'melt_mods'], printStation: 'expo', tags: ['food'] },
    { id: 'z3', categoryId: 'zingers', name: 'Traditional Wings (10)', price: 16.99, requiresModifiers: true, modifierGroupIds: ['sauces', 'dressing', 'wing_prep'], printStation: 'expo', tags: ['food'] },
    { id: 'z4', categoryId: 'zingers', name: 'Traditional Wings (20)', price: 28.99, requiresModifiers: true, modifierGroupIds: ['sauces', 'dressing', 'wing_prep'], printStation: 'expo', tags: ['food'] },
    { id: 'z5', categoryId: 'zingers', name: 'Zingers Mac & Cheese', price: 16.49, requiresModifiers: true, modifierGroupIds: ['sauces'], printStation: 'expo', tags: ['food'] },

    // --- BURGERS & SANDWICHES ---
    { id: 'b1', categoryId: 'burgers', name: 'Prime Burger', price: 15.99, requiresModifiers: true, modifierGroupIds: ['burger_temps', 'burger_mods', 'sides'], printStation: 'grill', tags: ['food'] },
    { id: 'b2', categoryId: 'burgers', name: 'Classic Cheeseburger', price: 13.99, requiresModifiers: true, modifierGroupIds: ['burger_temps', 'burger_mods', 'sides'], printStation: 'grill', tags: ['food'] },
    { id: 'b3', categoryId: 'burgers', name: 'Bacon Cheeseburger', price: 14.99, requiresModifiers: true, modifierGroupIds: ['burger_temps', 'burger_mods', 'sides'], printStation: 'grill', tags: ['food'] },
    { id: 'b4', categoryId: 'burgers', name: 'Mahi Mahi Sandwich', price: 16.99, requiresModifiers: true, modifierGroupIds: ['sandwich_mods', 'sides'], printStation: 'grill', tags: ['food'] },
    { id: 'b5', categoryId: 'burgers', name: 'Prime Rib French Dip', price: 17.99, requiresModifiers: true, modifierGroupIds: ['sandwich_mods', 'sides'], printStation: 'grill', tags: ['food'] },
    { id: 'b6', categoryId: 'burgers', name: 'Philly Cheesesteak', price: 15.99, requiresModifiers: true, modifierGroupIds: ['sandwich_mods', 'sides'], printStation: 'grill', tags: ['food'] },
    { id: 'b7', categoryId: 'burgers', name: 'Blackened Chicken Sandwich', price: 14.49, requiresModifiers: true, modifierGroupIds: ['sandwich_mods', 'sides'], printStation: 'grill', tags: ['food'] },

    // --- SOUPS & SALADS ---
    { id: 'sl1', categoryId: 'salads', name: 'Zingers® Salad', price: 15.99, requiresModifiers: true, modifierGroupIds: ['sauces', 'dressing'], printStation: 'salad', tags: ['food'] },
    { id: 'sl2', categoryId: 'salads', name: 'Southwest Chicken Salad', price: 14.99, requiresModifiers: true, modifierGroupIds: ['dressing'], printStation: 'salad', tags: ['food'] },
    { id: 'sl3', categoryId: 'salads', name: 'Caesar Salad (Chicken)', price: 13.99, printStation: 'salad', tags: ['food'] },
    { id: 'sl4', categoryId: 'salads', name: 'French Onion Soup', price: 6.99, printStation: 'salad', tags: ['food'] },
    { id: 'sl5', categoryId: 'salads', name: 'New England Clam Chowder', price: 6.49, printStation: 'salad', tags: ['food'] },

    // --- SEAFOOD, STEAK & PASTA ---
    { id: 'sp1', categoryId: 'seafood', name: 'English Pub Fish & Chips', price: 16.99, requiresModifiers: true, modifierGroupIds: ['seafood_mods'], printStation: 'expo', tags: ['food'] },
    { id: 'sp2', categoryId: 'seafood', name: '12oz Center-Cut Ribeye', price: 26.99, requiresModifiers: true, modifierGroupIds: ['burger_temps', 'sides', 'sides'], printStation: 'grill', tags: ['food'] },
    { id: 'sp3', categoryId: 'seafood', name: '8oz Sirloin Steak', price: 18.99, requiresModifiers: true, modifierGroupIds: ['burger_temps', 'sides', 'sides'], printStation: 'grill', tags: ['food'] },
    { id: 'sp4', categoryId: 'seafood', name: 'Atlantic Salmon', price: 21.99, requiresModifiers: true, modifierGroupIds: ['sides', 'sides'], printStation: 'grill', tags: ['food'] },
    { id: 'sp5', categoryId: 'seafood', name: 'Blackened Chicken Pasta', price: 16.99, printStation: 'expo', tags: ['food'] },
    { id: 'sp6', categoryId: 'seafood', name: 'Chicken & Shrimp Fajitas', price: 19.99, printStation: 'grill', tags: ['food'] },

    // --- HOUSE FAVORITES ---
    { id: 'hf1', categoryId: 'house', name: 'Baby Back Ribs (Full Rack)', price: 24.99, requiresModifiers: true, modifierGroupIds: ['sides', 'sides'], printStation: 'grill', tags: ['food'] },
    { id: 'hf2', categoryId: 'house', name: 'Baby Back Ribs (Half Rack)', price: 17.99, requiresModifiers: true, modifierGroupIds: ['sides', 'sides'], printStation: 'grill', tags: ['food'] },
    { id: 'hf3', categoryId: 'house', name: 'Dad’s Homemade Meatloaf', price: 15.99, requiresModifiers: true, modifierGroupIds: ['sides', 'sides'], printStation: 'expo', tags: ['food'] },
    { id: 'hf4', categoryId: 'house', name: 'Mimi’s Fiesta Bowl (Chicken)', price: 14.99, printStation: 'expo', tags: ['food'] },
    { id: 'hf5', categoryId: 'house', name: 'Pork Ossobuco', price: 21.99, requiresModifiers: true, modifierGroupIds: ['sides'], printStation: 'expo', tags: ['food'] },

    // --- DESSERTS ---
    { id: 'ds1', categoryId: 'desserts', name: 'Capt. Jack\'s Buried Treasure®', price: 9.99, printStation: 'salad', tags: ['food'] },
    { id: 'ds2', categoryId: 'desserts', name: 'Ghirardelli® Brownie Sundae', price: 8.99, printStation: 'salad', tags: ['food'] },
    { id: 'ds3', categoryId: 'desserts', name: 'Strawberry Cheesecake', price: 7.99, printStation: 'salad', tags: ['food'] },

    // --- KIDS MENU ---
    { id: 'k1', categoryId: 'kids', name: 'Kid Burger', price: 6.99, requiresModifiers: true, modifierGroupIds: ['kids_sides'], printStation: 'grill', tags: ['food'] },
    { id: 'k2', categoryId: 'kids', name: 'Kid Zingers', price: 6.99, requiresModifiers: true, modifierGroupIds: ['kids_sides'], printStation: 'expo', tags: ['food'] },
    { id: 'k3', categoryId: 'kids', name: 'Kid Mac & Cheese', price: 5.99, printStation: 'expo', tags: ['food'] },

    // --- BEVERAGES (DRAFT BEER) ---
    { id: 'd1', categoryId: 'drinks', subcategoryId: 'draft_beer', name: 'Miller Lite Draft (Pint)', price: 4.50, printStation: 'bar', tags: ['alcohol'] },
    { id: 'd2', categoryId: 'drinks', subcategoryId: 'draft_beer', name: 'Blue Moon Draft (Pint)', price: 5.50, printStation: 'bar', tags: ['alcohol'] },
    { id: 'd3', categoryId: 'drinks', subcategoryId: 'draft_beer', name: 'Stella Artois (Pint)', price: 6.00, printStation: 'bar', tags: ['alcohol'] },

    // --- BEVERAGES (BOTTLED/CAN) ---
    { id: 'd7', categoryId: 'drinks', subcategoryId: 'bottled_beer', name: 'Corona Extra Bottle', price: 5.50, printStation: 'bar', tags: ['alcohol'] },
    { id: 'd8', categoryId: 'drinks', subcategoryId: 'bottled_beer', name: 'Michelob Ultra Bottle', price: 4.50, printStation: 'bar', tags: ['alcohol'] },
    { id: 'd9', categoryId: 'drinks', subcategoryId: 'bottled_beer', name: 'High Noon Seltzer', price: 6.00, printStation: 'bar', tags: ['alcohol'] },

    // --- BEVERAGES (COCKTAILS) ---
    { id: 'd11', categoryId: 'drinks', subcategoryId: 'cocktails', name: 'House Margarita', price: 7.00, printStation: 'bar', tags: ['alcohol'] },
    { id: 'd12', categoryId: 'drinks', subcategoryId: 'cocktails', name: 'Tito\'s Lemonade', price: 8.50, printStation: 'bar', tags: ['alcohol'] },

    // --- BEVERAGES (WINE) ---
    { id: 'd15', categoryId: 'drinks', subcategoryId: 'wine', name: 'House Red Blend (Glass)', price: 6.50, printStation: 'bar', tags: ['alcohol'] },
    { id: 'd16', categoryId: 'drinks', subcategoryId: 'wine', name: 'House Pinot Grigio (Glass)', price: 6.50, printStation: 'bar', tags: ['alcohol'] },

    // --- BEVERAGES (NON-ALCOHOLIC) ---
    { id: 'd18', categoryId: 'drinks', subcategoryId: 'non_alcoholic', name: 'Coca-Cola', price: 2.99, printStation: 'server', tags: ['na_bev'] },
    { id: 'd19', categoryId: 'drinks', subcategoryId: 'non_alcoholic', name: 'Diet Coke', price: 2.99, printStation: 'server', tags: ['na_bev'] },
    { id: 'd20', categoryId: 'drinks', subcategoryId: 'non_alcoholic', name: 'Sprite', price: 2.99, printStation: 'server', tags: ['na_bev'] },
    { id: 'd21', categoryId: 'drinks', subcategoryId: 'non_alcoholic', name: 'Sweet Tea', price: 2.99, printStation: 'server', tags: ['na_bev'] },
    { id: 'd22', categoryId: 'drinks', subcategoryId: 'non_alcoholic', name: 'Unsweet Tea', price: 2.99, printStation: 'server', tags: ['na_bev'] },
  ],
  modifiers: {
    sauces: { name: 'Choose Sauce', multiSelect: false, options: [{ id: 'sauce1', name: 'Mild', price: 0 }, { id: 'sauce2', name: 'Medium', price: 0 }, { id: 'sauce3', name: 'Hot', price: 0 }, { id: 'sauce4', name: 'Mt. St. Helens', price: 0 }, { id: 'sauce5', name: 'Honey BBQ', price: 0 }, { id: 'sauce6', name: 'Garlic Parmesan', price: 0 }, { id: 'sauce7', name: 'Teriyaki', price: 0 }] },
    dressing: { name: 'Choose Dressing', multiSelect: false, options: [{ id: 'dres1', name: 'Ranch', price: 0 }, { id: 'dres2', name: 'Blue Cheese', price: 0 }, { id: 'dres3', name: 'Honey Mustard', price: 0 }, { id: 'dres4', name: 'Balsamic Vinaigrette', price: 0 }] },
    wing_prep: { name: 'Wing Prep', multiSelect: true, options: [{ id: 'wp1', name: 'All Drums', price: 1.50 }, { id: 'wp2', name: 'All Flats', price: 1.50 }, { id: 'wp3', name: 'Extra Crispy', price: 0 }, { id: 'wp4', name: 'Extra Wet', price: 0 }, { id: 'wp5', name: 'Sauce on Side', price: 0 }] },
    burger_temps: { name: 'Meat Temp', multiSelect: false, options: [{ id: 'temp1', name: 'Rare', price: 0 }, { id: 'temp2', name: 'Med Rare', price: 0 }, { id: 'temp3', name: 'Medium', price: 0 }, { id: 'temp4', name: 'Med Well', price: 0 }, { id: 'temp5', name: 'Well Done', price: 0 }] },
    burger_mods: { name: 'Burger Mods', multiSelect: true, allowPrefixes: true, options: [{ id: 'bm1', name: 'Lettuce', price: 0 }, { id: 'bm2', name: 'Tomato', price: 0 }, { id: 'bm3', name: 'Onion', price: 0 }, { id: 'bm4', name: 'Pickle', price: 0 }, { id: 'bm5', name: 'Bacon', price: 1.50 }, { id: 'bm6', name: 'American Cheese', price: 1.00 }, { id: 'bm7', name: 'Cheddar Cheese', price: 1.00 }] },
    sandwich_mods: { name: 'Sandwich Mods', multiSelect: true, allowPrefixes: true, options: [{ id: 'sm1', name: 'Lettuce', price: 0 }, { id: 'sm2', name: 'Tomato', price: 0 }, { id: 'sm3', name: 'Mayo', price: 0 }] },
    sides: { name: 'Choose Side', multiSelect: false, options: [{ id: 'sd1', name: 'Fries', price: 0 }, { id: 'sd2', name: 'Coleslaw', price: 0 }, { id: 'sd3', name: 'Broccoli', price: 0 }, { id: 'sd4', name: 'Onion Rings', price: 1.50 }, { id: 'sd5', name: 'Mac & Cheese', price: 2.00 }, { id: 'sd6', name: 'Side Salad', price: 2.50 }] },
    kids_sides: { name: 'Kids Side', multiSelect: false, options: [{ id: 'ks1', name: 'Fries', price: 0 }, { id: 'ks2', name: 'Mandarin Oranges', price: 0 }] },
    protein_add: { name: 'Add Protein', multiSelect: false, options: [{ id: 'pa1', name: 'Smoked Chicken', price: 3.00 }, { id: 'pa2', name: 'Beef Chili', price: 3.00 }, { id: 'pa3', name: 'No Protein', price: 0 }] },
    nacho_mods: { name: 'Nacho Mods', multiSelect: true, allowPrefixes: true, options: [{ id: 'nm1', name: 'Jalapenos', price: 0 }, { id: 'nm2', name: 'Pico de Gallo', price: 0 }, { id: 'nm3', name: 'Sour Cream', price: 0 }, { id: 'nm4', name: 'Guacamole', price: 1.50 }] },
    melt_mods: { name: 'Melt Mods', multiSelect: true, allowPrefixes: true, options: [{ id: 'mm1', name: 'Bacon', price: 0 }, { id: 'mm2', name: 'Scallions', price: 0 }] },
    seafood_mods: { name: 'Seafood Mods', multiSelect: true, allowPrefixes: true, options: [{ id: 'sf1', name: 'Tartar Sauce', price: 0 }, { id: 'sf2', name: 'Cocktail Sauce', price: 0 }, { id: 'sf3', name: 'Lemon Wedge', price: 0 }] },
  }
};
