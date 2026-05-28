import { useState, useEffect } from 'react';
import { menuData } from '../data/menu';
import './POSSystem.css';
import ModifierModal from './ModifierModal';

export default function POSSystem({ serverName, tableInfo, onCloseTable }) {
  const [activeCategory, setActiveCategory] = useState(menuData.categories[0].id);
  const [activeSeat, setActiveSeat] = useState(1);
  const [orderItems, setOrderItems] = useState([]);
  const [selectedItemIds, setSelectedItemIds] = useState([]); // Array of selected items on ticket
  const [modifierQueue, setModifierQueue] = useState([]); 
  const [agePromptItem, setAgePromptItem] = useState(null);
  const [tLog, setTLog] = useState([]);
  const [tick, setTick] = useState(0); // Force re-render for timers
  const [kdsAlerts, setKdsAlerts] = useState([]); 

  // Phase 5 Advanced States
  const [activeCheckId, setActiveCheckId] = useState(1); // 1 or 2
  const [isSplitMode, setIsSplitMode] = useState(false);
  const [showReceipt, setShowReceipt] = useState(false);
  const [showPayment, setShowPayment] = useState(false);
  const [showTransfer, setShowTransfer] = useState(false);
  const [showDiscountModal, setShowDiscountModal] = useState(false);
  const [showHoldModal, setShowHoldModal] = useState(false);
  const [checkDiscounts, setCheckDiscounts] = useState([]);
  
  const discountOptions = [
    { id: 'senior', name: '10% Senior', type: 'percent', value: 0.10, scope: 'check' },
    { id: 'veteran', name: '15% Veteran', type: 'percent', value: 0.15, scope: 'check' },
    { id: 'employee', name: '50% Employee Meal', type: 'percent', value: 0.50, scope: 'item' },
    { id: 'comp100', name: '100% Manager Comp', type: 'percent', value: 1.00, scope: 'item' },
    { id: 'promo5', name: '$5 Off Promo', type: 'fixed', value: 5.00, scope: 'check' }
  ];

  const calculateCheckMath = (checkId) => {
    const items = orderItems.filter(i => i.checkId === checkId);
    let subtotal = 0;
    items.forEach(item => {
      const basePrice = item.price + (item.modifiers || []).reduce((s, m) => s + m.price, 0);
      let itemDiscountAmount = 0;
      if (item.discount) {
        if (item.discount.type === 'percent') itemDiscountAmount = basePrice * item.discount.value;
        if (item.discount.type === 'fixed') itemDiscountAmount = item.discount.value;
      }
      subtotal += (basePrice - itemDiscountAmount);
    });
    let checkDiscountAmount = 0;
    checkDiscounts.filter(d => d.checkId === checkId).forEach(d => {
       if (d.type === 'percent') checkDiscountAmount += (subtotal * d.value);
       if (d.type === 'fixed') checkDiscountAmount += d.value;
    });
    subtotal = Math.max(0, subtotal - checkDiscountAmount);
    return { subtotal, checkDiscountAmount, tax: subtotal * 0.07, total: subtotal * 1.07 };
  };

  // Current item being modified
  const currentModTask = modifierQueue[0] || null;

  const getCookTimeMs = (item) => {
    if (item.isApp) return 10 * 60 * 1000;
    const min15 = ['burgers', 'zingers', 'seafood', 'house'];
    const min10 = ['starters', 'salads', 'soups', 'kids'];
    const min5 = ['desserts'];
    
    if (min15.includes(item.categoryId)) return 15 * 60 * 1000;
    if (min10.includes(item.categoryId)) return 10 * 60 * 1000;
    if (min5.includes(item.categoryId)) return 5 * 60 * 1000;
    return 2 * 60 * 1000; // drinks
  };

  // --- KITCHEN SIMULATOR TIMER ---
  useEffect(() => {
    const interval = setInterval(() => {
      const now = Date.now();
      setTick(t => t + 1);

      setOrderItems(prev => {
        let changed = false;
        const newItems = prev.map(item => {
          // Transition HELD -> SENT
          if (item.status === 'HELD' && !item.isManualHold && now >= item.holdReleaseTime) {
            changed = true;
            logAction(`AUTO_SEND_HELD: ${item.name}`);
            return { ...item, status: 'SENT', sentAt: now, cookCompleteTime: now + getCookTimeMs(item) };
          }
          // Transition SENT -> UP
          if (item.status === 'SENT' && now >= item.cookCompleteTime) {
            changed = true;
            logAction(`ORDER_UP: ${item.name}`);
            setKdsAlerts(alerts => [...alerts, { id: Date.now(), msg: `ORDER UP: ${item.name} (${item.printStation || 'Expo'})` }]);
            return { ...item, status: 'UP' };
          }
          return item;
        });
        return changed ? newItems : prev;
      });
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  // Remove KDS alerts after 5 seconds
  useEffect(() => {
    if (kdsAlerts.length > 0) {
      const timer = setTimeout(() => {
        setKdsAlerts(alerts => alerts.slice(1));
      }, 5000);
      return () => clearTimeout(timer);
    }
  }, [kdsAlerts]);

  const logAction = (action) => {
    const time = new Date().toISOString();
    setTLog(prev => [...prev, `[${time}] SERVER:${serverName} TBL:${tableInfo.tableNumber} ACT:${action}`]);
  };

  const handleCategoryClick = (categoryId) => setActiveCategory(categoryId);

  const handleItemClick = (item) => {
    if (item.tags && item.tags.includes('alcohol')) {
      setAgePromptItem(item);
    } else {
      processItemClick(item);
    }
  };

  const verifyAge = (approved) => {
    if (approved) {
      logAction(`AGE_VERIFY_PASS: ${agePromptItem.name}`);
      const itemToProcess = agePromptItem;
      setAgePromptItem(null);
      processItemClick(itemToProcess);
    } else {
      logAction(`AGE_VERIFY_FAIL: ${agePromptItem.name}`);
      setAgePromptItem(null);
    }
  };

  const processItemClick = (item) => {
    if (item.requiresModifiers && item.modifierGroupIds) {
      setModifierQueue([...modifierQueue, {
        item: { ...item, seatNumber: activeSeat, modifiers: [], status: 'PENDING' },
        groupList: item.modifierGroupIds,
        currentIndex: 0
      }]);
    } else {
      addToOrder({ ...item, seatNumber: activeSeat, status: 'PENDING' }, []);
    }
  };

  const addToOrder = (item, modifiers = []) => {
    const orderItem = {
      ...item,
      orderItemId: item.orderItemId || (Date.now() + Math.random().toString()),
      modifiers: item.modifiers || modifiers,
      status: 'PENDING',
      checkId: activeCheckId // Default to current check
    };
    
    // If we are replacing an existing item (from Modify)
    const existingIndex = orderItems.findIndex(oi => oi.orderItemId === orderItem.orderItemId);
    if (existingIndex >= 0) {
      const newItems = [...orderItems];
      newItems[existingIndex] = orderItem;
      setOrderItems(newItems);
      logAction(`MODIFIED_ITEM: ${item.id}`);
    } else {
      setOrderItems([...orderItems, orderItem]);
      logAction(`ADD_ITEM: ${item.id} SEAT:${activeSeat}`);
    }
  };

  // --- MODAL SAVING ---
  const handleModifierSave = (selectedMods) => {
    if (!currentModTask) return;
    const updatedItem = {
      ...currentModTask.item,
      modifiers: [...currentModTask.item.modifiers, ...selectedMods]
    };
    const nextIndex = currentModTask.currentIndex + 1;
    if (nextIndex < currentModTask.groupList.length) {
      const updatedQueue = [...modifierQueue];
      updatedQueue[0] = { ...currentModTask, item: updatedItem, currentIndex: nextIndex };
      setModifierQueue(updatedQueue);
    } else {
      addToOrder(updatedItem, []);
      setModifierQueue(modifierQueue.slice(1));
    }
  };
  const handleModifierCancel = () => setModifierQueue(modifierQueue.slice(1));

  // --- TICKET SELECTION ---
  const toggleSelectTicketItem = (orderItemId) => {
    if (selectedItemIds.includes(orderItemId)) {
      setSelectedItemIds(selectedItemIds.filter(id => id !== orderItemId));
    } else {
      setSelectedItemIds([...selectedItemIds, orderItemId]);
    }
  };

  // --- UTILITY ACTIONS ---
  const handleHoldClick = () => {
    if (selectedItemIds.length === 0) return;
    setShowHoldModal(true);
  };

  const handleHoldSubmit = (minutes) => {
    const now = Date.now();
    setOrderItems(orderItems.map(item => {
      if (selectedItemIds.includes(item.orderItemId) && item.status === 'PENDING') {
        logAction(`HOLD_ITEM: ${item.id} MIN:${minutes}`);
        return { 
          ...item, 
          status: 'HELD', 
          isManualHold: minutes === 'manual',
          holdReleaseTime: minutes === 'manual' ? null : now + (minutes * 60 * 1000) 
        };
      }
      return item;
    }));
    setSelectedItemIds([]);
    setShowHoldModal(false);
  };

  const handleDelete = () => {
    if (selectedItemIds.length === 0) return;
    const remaining = [];
    orderItems.forEach(item => {
      if (selectedItemIds.includes(item.orderItemId)) {
        if (item.status === 'PENDING' || item.status === 'HELD') {
          logAction(`DELETE_ITEM: ${item.id}`);
        } else {
          // If SENT or UP, it's a void. For now we just remove it but log as VOID
          logAction(`VOID_ITEM: ${item.id}`);
          // In real Aloha, it would stay on ticket with a cross-out.
        }
      } else {
        remaining.push(item);
      }
    });
    setOrderItems(remaining);
    setSelectedItemIds([]);
  };

  const handleModify = () => {
    if (selectedItemIds.length !== 1) {
      alert("Select exactly ONE item to modify.");
      return;
    }
    const itemToModify = orderItems.find(i => i.orderItemId === selectedItemIds[0]);
    if (itemToModify.status !== 'PENDING') {
      alert("Cannot modify items that have already been sent to the kitchen.");
      return;
    }
    if (!itemToModify.requiresModifiers) return;
    
    // Wipe existing modifiers and re-queue
    setModifierQueue([{
      item: { ...itemToModify, modifiers: [] },
      groupList: itemToModify.modifierGroupIds,
      currentIndex: 0
    }]);
    setSelectedItemIds([]);
  };

  const handleSend = () => {
    const now = Date.now();
    setOrderItems(orderItems.map(item => {
      if (item.status === 'PENDING' || (item.status === 'HELD' && selectedItemIds.includes(item.orderItemId))) {
        logAction(`SEND_ITEM: ${item.id}`);
        return { ...item, status: 'SENT', sentAt: now, cookCompleteTime: now + getCookTimeMs(item), isManualHold: false };
      }
      return item;
    }));
    setSelectedItemIds([]);
  };

  const handleDone = () => {
    handleSend();
    console.log("T-LOG DUMP:", tLog);
    onCloseTable();
  };

  // --- PHASE 5 ADVANCED ACTIONS ---
  const handleAsApp = () => {
    if (selectedItemIds.length === 0) return;
    const now = Date.now();
    setOrderItems(orderItems.map(item => {
      if (selectedItemIds.includes(item.orderItemId) && item.status === 'PENDING') {
        logAction(`SEND_AS_APP: ${item.id}`);
        return { ...item, status: 'SENT', sentAt: now, cookCompleteTime: now + (10 * 60 * 1000), isApp: true };
      }
      return item;
    }));
    setSelectedItemIds([]);
  };

  const handleRepeat = () => {
    if (selectedItemIds.length === 0) return;
    const newItems = [];
    orderItems.forEach(item => {
      if (selectedItemIds.includes(item.orderItemId)) {
        logAction(`REPEAT_ITEM: ${item.id}`);
        newItems.push({
          ...item,
          orderItemId: Date.now() + Math.random().toString(),
          status: 'PENDING',
          isApp: false,
          sentAt: null,
          cookCompleteTime: null,
          holdReleaseTime: null
        });
      }
    });
    setOrderItems([...orderItems, ...newItems]);
    setSelectedItemIds([]);
  };

  const handleMoveToOtherCheck = (orderItemId) => {
    if (!isSplitMode) return;
    setOrderItems(orderItems.map(item => {
      if (item.orderItemId === orderItemId) {
        return { ...item, checkId: item.checkId === 1 ? 2 : 1 };
      }
      return item;
    }));
  };

  const handleTransferSubmit = (newTableNum) => {
    logAction(`TRANSFER_TABLE: ${tableInfo.tableNumber} -> ${newTableNum}`);
    alert(`Ticket successfully transferred to Table ${newTableNum}`);
    onCloseTable();
  };

  const handlePaymentSubmit = () => {
    logAction(`CLOSE_CHECK: PAID`);
    alert(`Check Closed. Payment processed.`);
    onCloseTable();
  };

  const handleApplyDiscount = (discountDef) => {
    if (discountDef.scope === 'check') {
      logAction(`APPLY_CHECK_DISCOUNT: ${discountDef.name}`);
      setCheckDiscounts([...checkDiscounts, { ...discountDef, checkId: activeCheckId }]);
    } else {
      if (selectedItemIds.length === 0) {
        alert("Select an item to apply this discount to.");
        return;
      }
      logAction(`APPLY_ITEM_DISCOUNT: ${discountDef.name}`);
      setOrderItems(orderItems.map(item => {
        if (selectedItemIds.includes(item.orderItemId)) {
          return { ...item, discount: discountDef };
        }
        return item;
      }));
      setSelectedItemIds([]);
    }
    setShowDiscountModal(false);
  };

  // FORMAT TIME Helper
  const formatTimeDiff = (start, end) => {
    const diff = Math.max(0, Math.floor((end - start) / 1000));
    const m = Math.floor(diff / 60).toString().padStart(2, '0');
    const s = (diff % 60).toString().padStart(2, '0');
    return `${m}:${s}`;
  };

  return (
    <div className="pos-container">
      {/* KDS ALERTS */}
      <div className="kds-alert-container absolute top-4 left-1/2 flex-col gap-2 z-50 pointer-events-none" style={{ transform: 'translateX(-50%)' }}>
        {kdsAlerts.map(alert => (
          <div key={alert.id} className="bg-green text-white p-4 font-bold text-xl rounded shadow-lg border-2 border-white">
            {alert.msg}
          </div>
        ))}
      </div>

      {/* 1. TOP BAR ZONE */}
      <div className="pos-top-bar">
        <div className="top-block">
          <button className="aloha-btn">Table</button>
          <button className="aloha-btn" onClick={() => setOrderItems([])}>Clear</button>
          <button className={`aloha-btn ${isSplitMode ? 'bg-orange text-black' : ''}`} onClick={() => setIsSplitMode(!isSplitMode)}>Split</button>
        </div>
        <button className="aloha-btn btn-green" style={{ padding: '16px 40px', fontSize: '1.2rem' }} onClick={handleDone}>Done</button>
        <div className="top-block">
          <button className="aloha-btn">Order</button>
          <button className="aloha-btn">To Go</button>
          <button className="aloha-btn" onClick={handleAsApp}>AS APP</button>
          <button className="aloha-btn" onClick={handleSend}>SEND</button>
        </div>
      </div>

      {/* 2. LEFT COLUMN ZONE (Ticket) */}
      <div className="pos-left-col">
        <div className="p-2 border-b font-bold text-center bg-white text-black flex justify-between" style={{ borderBottom: '1px solid black' }}>
          <span>Table {tableInfo.tableNumber}</span>
          <span>{isSplitMode ? 'SPLIT MODE' : `Check ${activeCheckId}`}</span>
        </div>
        <div className="flex-1 overflow-y-auto bg-white text-black p-2 ticket-window flex">
          
          {/* Check 1 */}
          <div className="flex-1" style={{ borderRight: isSplitMode ? '2px dashed #ccc' : 'none', paddingRight: isSplitMode ? '4px' : '0' }}>
            {isSplitMode && <div className="text-center font-bold border-b mb-2 pb-1 bg-gray-200">Check 1</div>}
            {orderItems.filter(i => i.checkId === 1).map((item) => {
            const isSelected = selectedItemIds.includes(item.orderItemId);
            const now = Date.now();
            
            // Status specific styling
            let statusClass = 'text-black';
            let statusText = '';
            if (item.isApp) {
              statusText = `[APP]`;
            } else if (item.status === 'HELD') {
              statusClass = 'text-orange-500 font-bold';
              statusText = item.isManualHold ? `[HOLD]` : `[HOLD ${formatTimeDiff(now, item.holdReleaseTime)}]`;
            } else if (item.status === 'SENT') {
              statusClass = 'text-red-600';
              statusText = `[${formatTimeDiff(item.sentAt, now)}]`;
            } else if (item.status === 'UP') {
              statusClass = 'text-green-600 font-bold';
              statusText = `[UP]`;
            }

            return (
              <div 
                key={item.orderItemId} 
                className={`mb-2 pb-1 border-b cursor-pointer ${isSelected ? 'bg-blue-100' : ''}`} 
                onClick={() => isSplitMode ? handleMoveToOtherCheck(item.orderItemId) : toggleSelectTicketItem(item.orderItemId)}
                style={{ backgroundColor: isSelected ? '#cce5ff' : 'transparent' }}
              >
                <div className="flex justify-between">
                  <span className={statusClass}>
                    {item.name} {statusText}
                  </span>
                  <span>${item.price.toFixed(2)}</span>
                </div>
                {item.modifiers && item.modifiers.map(mod => (
                  <div key={mod.id} className="text-sm ml-4 flex justify-between text-gray-700">
                    <span className={mod.name.startsWith('NO ') ? 'text-red-600 font-bold' : ''}>- {mod.name}</span>
                    {mod.price > 0 && <span>${mod.price.toFixed(2)}</span>}
                  </div>
                ))}
                {item.discount && (
                  <div className="text-sm ml-4 flex justify-between text-red-600 font-bold">
                    <span>{item.discount.name}</span>
                    <span>-(Discount Applied)</span>
                  </div>
                )}
              </div>
            );
          })}
          </div>

          {/* Check 2 (Only visible in Split Mode) */}
          {isSplitMode && (
          <div className="flex-1 pl-1">
            <div className="text-center font-bold border-b mb-2 pb-1 bg-gray-200" onClick={() => setActiveCheckId(2)}>Check 2</div>
            {orderItems.filter(i => i.checkId === 2).map((item) => {
              const now = Date.now();
              return (
                <div key={item.orderItemId} className="mb-2 pb-1 border-b cursor-pointer" onClick={() => handleMoveToOtherCheck(item.orderItemId)}>
                  <div className="flex justify-between">
                    <span className="text-black">{item.name}</span>
                    <span>${item.price.toFixed(2)}</span>
                  </div>
                </div>
              );
            })}
          </div>
          )}

        </div>
        
        {checkDiscounts.filter(d => d.checkId === activeCheckId).map((d, idx) => (
          <div key={idx} className="p-2 border-t bg-gray-100 text-red-600 font-bold flex justify-between text-sm">
            <span>{d.name}</span>
            <span>-</span>
          </div>
        ))}
        
        <div className="p-4 text-center font-bold text-2xl border-t bg-white text-black flex justify-between items-center">
          <span className="text-sm text-gray-700">Seat {activeSeat}</span>
          <span>${calculateCheckMath(activeCheckId).total.toFixed(2)}</span>
        </div>
        <div className="flex gap-2 p-2 bg-panel border-t">
          <button className="aloha-btn flex-1" onClick={() => setShowPayment(true)}>Close</button>
          <button className="aloha-btn flex-1" onClick={() => setActiveSeat(prev => prev + 1)}>Add</button>
          <button className="aloha-btn flex-1" onClick={() => setShowTransfer(true)}>Transfer</button>
        </div>
      </div>

      {/* 3. MIDDLE COLUMN ZONE (Categories) */}
      <div className="pos-mid-col">
        <div className="cat-list">
          {menuData.categories.map(cat => (
            <button 
              key={cat.id} 
              className={`aloha-btn cat-btn ${activeCategory === cat.id ? 'btn-dark' : ''}`}
              onClick={() => handleCategoryClick(cat.id)}
            >
              {cat.name}
            </button>
          ))}
        </div>
        <div className="p-2 border-t">
          <button className="aloha-btn btn-green w-full">▼▼</button>
        </div>
      </div>

      {/* 4. RIGHT AREA ZONE (Item Grid) */}
      <div className="pos-right-area">
        <div className="item-grid">
          {menuData.items.filter(i => i.categoryId === activeCategory).map(item => (
            <button 
              key={item.id} 
              className="aloha-btn item-btn" 
              onClick={() => handleItemClick(item)}
              style={{ position: 'relative', overflow: 'hidden' }}
            >
              {item.image && <img src={`/${item.image}`} style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', objectFit: 'cover', opacity: 0.4 }} />}
              <span style={{ position: 'relative', zIndex: 1, textShadow: '1px 1px 2px black, 0px 0px 4px rgba(0,0,0,0.8)' }}>
                {item.name}
              </span>
            </button>
          ))}
        </div>
      </div>

      {/* 5. BOTTOM RIGHT ZONE (Utilities) */}
      <div className="pos-bot-right">
        <button className="aloha-btn util-btn" onClick={() => setShowReceipt(true)}>Get Check</button>
        <button className="aloha-btn util-btn" onClick={() => setShowDiscountModal(true)}>Discount</button>
        <button className="aloha-btn util-btn" onClick={handleRepeat}>Repeat</button>
        <button className="aloha-btn util-btn" onClick={handleHoldClick}>Hold</button>
        <button className="aloha-btn util-btn" onClick={handleModify}>Modify</button>
        <button className="aloha-btn util-btn" onClick={handleDelete}>Delete</button>
      </div>

      {/* ADVANCED POPUPS */}
      {showReceipt && (
        <div className="modal-overlay" onClick={() => setShowReceipt(false)}>
          <div className="bg-white text-black p-8 font-mono shadow-lg rounded" style={{ width: '350px' }} onClick={e => e.stopPropagation()}>
            <div className="text-center mb-4">
              <h2 className="text-xl font-bold">Sports Bar</h2>
              <p>Table {tableInfo.tableNumber} - Server {serverName}</p>
              <p>{new Date().toLocaleString()}</p>
            </div>
            <div className="border-t border-b border-dashed border-gray-400 py-4 mb-4">
              {orderItems.filter(i => i.checkId === activeCheckId).map(item => (
                <div key={item.orderItemId} className="flex justify-between mb-1">
                  <span>{item.name}</span>
                  <span>${item.price.toFixed(2)}</span>
                </div>
              ))}
            </div>
            {checkDiscounts.filter(d => d.checkId === activeCheckId).map((d, idx) => (
              <div key={idx} className="flex justify-between mb-1 text-sm text-red-600">
                <span>{d.name}</span>
                <span>-(Applied)</span>
              </div>
            ))}
            <div className="flex justify-between font-bold text-lg mt-2 pt-2 border-t border-gray-400">
              <span>SUBTOTAL</span>
              <span>${calculateCheckMath(activeCheckId).subtotal.toFixed(2)}</span>
            </div>
            <div className="flex justify-between font-bold text-lg">
              <span>TAX</span>
              <span>${calculateCheckMath(activeCheckId).tax.toFixed(2)}</span>
            </div>
            <div className="flex justify-between font-bold text-xl mt-2">
              <span>TOTAL</span>
              <span>${calculateCheckMath(activeCheckId).total.toFixed(2)}</span>
            </div>
            <div className="mt-8">
              <button className="aloha-btn w-full" onClick={() => setShowReceipt(false)}>Close Receipt</button>
            </div>
          </div>
        </div>
      )}

      {showPayment && (
        <div className="modal-overlay">
          <div className="modal-content p-6">
            <h2 className="text-2xl font-bold mb-4 text-center">Payment: Check {activeCheckId}</h2>
            <div className="text-center text-3xl font-bold text-green-500 mb-6">
              BALANCE DUE: ${calculateCheckMath(activeCheckId).total.toFixed(2)}
            </div>
            <div className="grid grid-cols-2 gap-4">
              <button className="aloha-btn btn-green p-4 text-xl" onClick={handlePaymentSubmit}>EXACT CASH</button>
              <button className="aloha-btn bg-blue-500 text-white p-4 text-xl" onClick={handlePaymentSubmit}>CREDIT CARD</button>
            </div>
            <button className="aloha-btn mt-6 w-full" onClick={() => setShowPayment(false)}>Cancel Payment</button>
          </div>
        </div>
      )}

      {showTransfer && (
        <div className="modal-overlay">
          <div className="modal-content p-6">
            <h2 className="text-xl font-bold mb-4 text-center">Transfer Table {tableInfo.tableNumber} To:</h2>
            <div className="grid grid-cols-3 gap-4 mb-6">
              {[11, 12, 13, 21, 22, 31, 32].map(tbl => (
                <button key={tbl} className="aloha-btn p-4 text-xl" onClick={() => handleTransferSubmit(tbl)}>Tbl {tbl}</button>
              ))}
            </div>
            <button className="aloha-btn bg-red text-white w-full" onClick={() => setShowTransfer(false)}>Cancel</button>
          </div>
        </div>
      )}

      {showDiscountModal && (
        <div className="modal-overlay">
          <div className="modal-content p-6">
            <h2 className="text-xl font-bold mb-4 text-center">Manager Comps & Discounts</h2>
            <div className="grid grid-cols-2 gap-4 mb-6">
              {discountOptions.map(d => (
                <button key={d.id} className="aloha-btn p-4" onClick={() => handleApplyDiscount(d)}>{d.name}</button>
              ))}
            </div>
            <button className="aloha-btn bg-red text-white w-full" onClick={() => setShowDiscountModal(false)}>Cancel</button>
          </div>
        </div>
      )}

      {showHoldModal && (
        <div className="modal-overlay">
          <div className="modal-content p-6 text-center">
            <h2 className="text-xl font-bold mb-4">Hold Options</h2>
            <div className="grid grid-cols-2 gap-4 mb-6">
              <button className="aloha-btn p-4 text-red-600 font-bold" onClick={() => handleHoldSubmit('manual')}>Manual Fire</button>
              <button className="aloha-btn p-4" onClick={() => handleHoldSubmit(5)}>Hold 5 Min</button>
              <button className="aloha-btn p-4" onClick={() => handleHoldSubmit(10)}>Hold 10 Min</button>
              <button className="aloha-btn p-4" onClick={() => handleHoldSubmit(15)}>Hold 15 Min</button>
              <button className="aloha-btn p-4" onClick={() => handleHoldSubmit(20)}>Hold 20 Min</button>
              <button className="aloha-btn p-4" onClick={() => handleHoldSubmit(25)}>Hold 25 Min</button>
            </div>
            <button className="aloha-btn bg-red text-white w-full" onClick={() => setShowHoldModal(false)}>Cancel</button>
          </div>
        </div>
      )}

      {/* OTHER POPUPS */}
      {agePromptItem && (
        <div className="modal-overlay">
          <div className="modal-content p-6 items-center text-center">
            <h2 className="text-2xl font-bold mb-4 text-red-500">AGE VERIFICATION REQUIRED</h2>
            <p className="mb-6">Customer must be born on or before today's date in {new Date().getFullYear() - 21}.</p>
            <div className="flex gap-4 w-full">
              <button className="aloha-btn btn-green flex-1 p-4" onClick={() => verifyAge(true)}>Verify & Approve</button>
              <button className="aloha-btn bg-red flex-1 p-4" onClick={() => verifyAge(false)}>Deny</button>
            </div>
          </div>
        </div>
      )}

      {currentModTask && (
        <ModifierModal 
          item={currentModTask.item} 
          modifierGroupId={currentModTask.groupList[currentModTask.currentIndex]}
          step={currentModTask.currentIndex + 1}
          totalSteps={currentModTask.groupList.length}
          onCancel={handleModifierCancel} 
          onSave={handleModifierSave} 
        />
      )}
    </div>
  );
}
