export const floorPlan = [
  {
    id: 'main_dining',
    name: 'Main Dining',
    tables: [
      // Left side booths
      { id: '11', label: '11', guests: 4, shape: 'rect', top: '10%', left: '10%', width: '80px', height: '60px' },
      { id: '12', label: '12', guests: 4, shape: 'rect', top: '30%', left: '10%', width: '80px', height: '60px' },
      { id: '13', label: '13', guests: 4, shape: 'rect', top: '50%', left: '10%', width: '80px', height: '60px' },
      
      // Large center tables
      { id: '14', label: '14', guests: 6, shape: 'circle', top: '25%', left: '40%', width: '100px', height: '100px' },
      { id: '15', label: '15', guests: 6, shape: 'circle', top: '60%', left: '40%', width: '100px', height: '100px' },
      
      // Right side 2-tops and 4-tops
      { id: '21', label: '21', guests: 2, shape: 'rect', top: '10%', left: '70%', width: '60px', height: '60px' },
      { id: '22', label: '22', guests: 2, shape: 'rect', top: '30%', left: '70%', width: '60px', height: '60px' },
      { id: '23', label: '23', guests: 2, shape: 'rect', top: '50%', left: '70%', width: '60px', height: '60px' },
      { id: '24', label: '24', guests: 4, shape: 'rect', top: '70%', left: '70%', width: '80px', height: '60px' },
      { id: '25', label: '25', guests: 4, shape: 'rect', top: '70%', left: '10%', width: '80px', height: '60px' },
    ]
  },
  {
    id: 'bar_area',
    name: 'Bar Area',
    tables: [
      // The physical bar
      { id: 'B1', label: 'B1', guests: 1, shape: 'circle', top: '20%', left: '20%', width: '50px', height: '50px' },
      { id: 'B2', label: 'B2', guests: 1, shape: 'circle', top: '35%', left: '20%', width: '50px', height: '50px' },
      { id: 'B3', label: 'B3', guests: 1, shape: 'circle', top: '50%', left: '20%', width: '50px', height: '50px' },
      { id: 'B4', label: 'B4', guests: 1, shape: 'circle', top: '65%', left: '20%', width: '50px', height: '50px' },
      { id: 'B5', label: 'B5', guests: 1, shape: 'circle', top: '80%', left: '20%', width: '50px', height: '50px' },
      
      // High tops
      { id: '31', label: '31', guests: 4, shape: 'circle', top: '30%', left: '60%', width: '80px', height: '80px' },
      { id: '32', label: '32', guests: 4, shape: 'circle', top: '50%', left: '60%', width: '80px', height: '80px' },
      { id: '33', label: '33', guests: 4, shape: 'circle', top: '70%', left: '60%', width: '80px', height: '80px' },
    ]
  },
  {
    id: 'patio',
    name: 'Patio',
    tables: [
      { id: '41', label: '41', guests: 4, shape: 'rect', top: '20%', left: '20%', width: '80px', height: '80px' },
      { id: '42', label: '42', guests: 4, shape: 'rect', top: '20%', left: '60%', width: '80px', height: '80px' },
      { id: '43', label: '43', guests: 6, shape: 'rect', top: '60%', left: '20%', width: '120px', height: '80px' },
      { id: '44', label: '44', guests: 6, shape: 'rect', top: '60%', left: '60%', width: '120px', height: '80px' },
    ]
  }
];
