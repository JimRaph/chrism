'use client';

import { useState } from 'react';
import { usePrices } from '@/context/PriceContext';
import { useAuth } from '@/context/AuthContext';
import { supabase, Product, LPGSize } from '@/lib/supabase';
import { 
  FaGasPump, FaFire, FaSignOutAlt, FaSave, FaCheck, 
  FaUsers, FaSpinner, FaLock, FaKey, FaTrash, FaPlus 
} from 'react-icons/fa';
import { motion } from 'framer-motion';
import {toast} from 'sonner';

export default function CommandCenter() {
  const { products, lpgSizes, refreshProducts, refreshLPGSizes } = usePrices();
  const { signOut, user } = useAuth();
  

  const [savingProducts, setSavingProducts] = useState(false);
  const [savingLPG, setSavingLPG] = useState(false);
  const [isAddingProduct, setIsAddingProduct] = useState(false);
  const [isAddingLPG, setIsAddingLPG] = useState(false);
  

  const [newPassword, setNewPassword] = useState('');
  const [changingPassword, setChangingPassword] = useState(false);
  const [passwordMessage, setPasswordMessage] = useState({ text: '', type: '' });
  

  const [editedProducts, setEditedProducts] = useState<Record<string, Partial<Product>>>({});
  const [editedLPG, setEditedLPG] = useState<Record<string, Partial<LPGSize>>>({});


  const [newProduct, setNewProduct] = useState({ name: '', code: '', price: '', unit: 'litre' });
  const [newLPGSize, setNewLPGSize] = useState({ size_kg: '', price: '' });


  const handleProductChange = (id: string, field: keyof Product, value: any) => {
    setEditedProducts(prev => ({
      ...prev,
      [id]: { ...prev[id], [field]: value }
    }));
  };

  const saveProduct = async (product: Product) => {
    setSavingProducts(true);
    const updates = editedProducts[product.id] || {};
    
    if (Object.keys(updates).length > 0) {
      const { error } = await supabase.from('products').update(updates).eq('id', product.id);
      if (!error) {
        const newEdits = { ...editedProducts };
        delete newEdits[product.id];
        setEditedProducts(newEdits);
        await refreshProducts(); 
        toast.success('{product.code} updated')
      } else {
        toast.error('Failed to update product');
      }
    }
    setSavingProducts(false);
  };

  const toggleProductAvailability = async (product: Product) => {
    const {error} = await supabase.from('products').update({ is_available: !product.is_available }).eq('id', product.id);
    if(!error) {
      await refreshProducts();
      toast.success(`${product.code} status is updated`)
    } else {
      toast.error(`Error updating ${product.code} status. Try again.`)
    }
  };

  const handleAddProduct = async () => {
    if (!newProduct.name || !newProduct.code || !newProduct.price) return toast.error('Please fill all fields');
    setIsAddingProduct(true);
    
    const { error } = await supabase.from('products').insert([{
      name: newProduct.name,
      code: newProduct.code,
      price: parseFloat(newProduct.price),
      unit: newProduct.unit,
      is_available: true
    }]);

    if (!error) {
      setNewProduct({ name: '', code: '', price: '', unit: 'litre' });
      await refreshProducts();
      toast.success(`${newProduct.code} added!`)
    } else {
      toast.error(`Error adding product: ${error.message}`);
    }
    setIsAddingProduct(false);
  };

  const handleDeleteProduct = async (id: string) => {
    if (!window.confirm('Are you sure you want to delete this product?')) return;
    const { error } = await supabase.from('products').delete().eq('id', id);
    if (!error) {
      await refreshProducts()
      toast.success(`item deleted.`)
    }else{
      toast.error(`Error deleting item.`)
    }
  };


  const handleLPGChange = (id: string, field: keyof LPGSize, value: any) => {
    setEditedLPG(prev => ({
      ...prev,
      [id]: { ...prev[id], [field]: value }
    }));
  };

  const saveLPG = async (size: LPGSize) => {
    setSavingLPG(true);
    const updates = editedLPG[size.id] || {};
    
    if (Object.keys(updates).length > 0) {
      const { error } = await supabase.from('lpg_sizes').update(updates).eq('id', size.id);
      if (!error) {
        const newEdits = { ...editedLPG };
        delete newEdits[size.id];
        setEditedLPG(newEdits);
        await refreshLPGSizes();
        toast.success(`{size} price updated.`)

      } else {
        toast.error('Failed to update LPG price.');
      }
    }
    setSavingLPG(false);
  };

  const toggleLPGAvailability = async (size: LPGSize) => {
    const {error} = await supabase.from('lpg_sizes').update({ is_available: !size.is_available }).eq('id', size.id);
    if (!error) {
      await refreshLPGSizes()
      toast.success(`size ${size.size_kg} LPG status updated`)
    } else {
      toast.error(`Error updating size ${size.size_kg} LPG`)
    }
  };

  const handleAddLPG = async () => {
    if (!newLPGSize.size_kg || !newLPGSize.price) return toast.error('Please fill all fields');
    setIsAddingLPG(true);
    
    const { error } = await supabase.from('lpg_sizes').insert([{
      size_kg: parseFloat(newLPGSize.size_kg),
      price: parseFloat(newLPGSize.price),
      is_available: true
    }]);

    if (!error) {
      setNewLPGSize({ size_kg: '', price: '' });
      await refreshLPGSizes();
      toast.success(`${newLPGSize.size_kg}kg LPG added`)
    } else {
      toast.error(`Error adding LPG size: ${newLPGSize.size_kg}`);
    }
    setIsAddingLPG(false);
  };

  const handleDeleteLPG = async (id: string) => {
    if (!window.confirm('Are you sure you want to delete this LPG size?')) return;
    const { error } = await supabase.from('lpg_sizes').delete().eq('id', id);
    if (!error) {
      await refreshLPGSizes()
      toast.success('LPG item deleted')
    } else {
      toast.error('Error deleting LPG')
    }
  };


  const handlePasswordChange = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newPassword || newPassword.length < 6) {
      setPasswordMessage({ text: 'Password must be at least 6 characters.', type: 'error' });
      return;
    }
    setChangingPassword(true);
    setPasswordMessage({ text: '', type: '' });

    const { error } = await supabase.auth.updateUser({ password: newPassword });
    if (error) {
      setPasswordMessage({ text: error.message, type: 'error' });
    } else {
      setPasswordMessage({ text: 'Password updated successfully', type: 'success' });
      setNewPassword('');
    }
    setChangingPassword(false);
  };

  return (
    <div className="min-h-screen bg-gray-50 pb-20">
      
   
      <header className="bg-slate-deep text-white shadow-lg sticky top-8 mt-8 z-30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="w-8 h-8 rounded-lg bg-primary flex items-center justify-center font-bold">C</div>
            <span className="font-bold text-lg hidden sm:inline">Command Center</span>
          </div>
          
          <div className="flex items-center space-x-4">
            <div className="text-sm text-gray-300 hidden sm:block">{user?.email}</div>
            <button 
              onClick={async () => {
                await signOut();
                window.location.href = '/command-center/login';
              }}
              className="px-4 py-2 bg-red-600/20 hover:bg-red-600/40 text-red-200 rounded-lg text-sm font-medium transition-colors flex items-center space-x-2"
            >
              <FaSignOutAlt />
              <span>Sign Out</span>
            </button>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
        

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
             <div className="flex items-center justify-between mb-4">
               <div>
                 <p className="text-sm text-gray-500">Products Active</p>
                 <p className="text-2xl font-bold text-slate-deep">
                    {products.filter(p => p.is_available).length} <span className="text-gray-400 text-sm font-normal">/ {products.length}</span>
                 </p>
               </div>
               <div className="w-10 h-10 rounded-full bg-green-50 flex items-center justify-center text-green-600">
                 <FaGasPump />
               </div>
             </div>
          </div>

          <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
             <div className="flex items-center justify-between mb-4">
               <div>
                 <p className="text-sm text-gray-500">LPG Inventory</p>
                 <p className="text-2xl font-bold text-slate-deep">
                    {lpgSizes.filter(p => p.is_available).length} <span className="text-gray-400 text-sm font-normal">/ {lpgSizes.length}</span>
                 </p>
               </div>
               <div className="w-10 h-10 rounded-full bg-orange-50 flex items-center justify-center text-orange-600">
                 <FaFire />
               </div>
             </div>
          </div>
          
          <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 opacity-60">
             <div className="flex items-center justify-between mb-4">
               <div>
                 <p className="text-sm text-gray-500">Total Orders</p>
                 <p className="text-2xl font-bold text-slate-deep">Coming Soon</p>
               </div>
               <div className="w-10 h-10 rounded-full bg-blue-50 flex items-center justify-center text-blue-600">
                 <FaUsers />
               </div>
             </div>
          </div>
        </div>



        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
          <div className="p-6 border-b border-gray-100 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <h2 className="text-lg font-bold text-slate-deep flex items-center space-x-2">
                <FaGasPump className="text-primary" />
                <span>Fuel Products Management</span>
              </h2>
              <p className="text-sm text-gray-500">Manage prices and availability for the ticker</p>
            </div>
          </div>

          <div className="overflow-x-auto [&::-webkit-scrollbar]:h-0.5">
            <table className="w-full">
              <thead className="bg-gray-50 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">
                <tr>
                  <th className="px-6 py-4">Product</th>
                  <th className="px-6 py-4">Current Price (₦)</th>
                  <th className="px-6 py-4">Status</th>
                  <th className="px-6 py-4 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                
                {/* add new product row */}
                <tr className="bg-blue-50/30">
                  <td className="px-6 py-4">
                    <div className="flex flex-col space-y-2">
                      <input 
                        type="text" placeholder="Name (e.g. Premium Motor Spirit)" 
                        value={newProduct.name} onChange={(e) => setNewProduct({...newProduct, name: e.target.value})}
                        className="w-full px-2 py-1 text-sm border rounded"
                      />
                      <div className="flex space-x-2">
                        <input 
                          type="text" placeholder="Code (PMS)" 
                          value={newProduct.code} onChange={(e) => setNewProduct({...newProduct, code: e.target.value})}
                          className="w-1/2 px-2 py-1 text-sm border rounded"
                        />
                        <select 
                          value={newProduct.unit} onChange={(e) => setNewProduct({...newProduct, unit: e.target.value})}
                          className="w-1/2 px-2 py-1 text-sm border rounded bg-white"
                        >
                          <option value="litre">litre</option>
                          <option value="kg">kg</option>
                        </select>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 align-top">
                    <input 
                      type="number" placeholder="Price" 
                      value={newProduct.price} onChange={(e) => setNewProduct({...newProduct, price: e.target.value})}
                      className="w-32 px-3 py-2 border rounded-lg outline-none"
                    />
                  </td>
                  <td className="px-6 py-4 align-top">
                    <span className="text-sm text-gray-400">Default: Active</span>
                  </td>
                  <td className="px-6 py-4 text-right align-top">
                    <button 
                      onClick={handleAddProduct} disabled={isAddingProduct}
                      className="inline-flex items-center px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 text-sm font-medium"
                    >
                      {isAddingProduct ? <FaSpinner className="animate-spin" /> : <FaPlus />} <span className="ml-2">Add</span>
                    </button>
                  </td>
                </tr>

                {/* products */}
                {products.map((product) => {
                  const isEdited = !!editedProducts[product.id];
                  const currentPrice = editedProducts[product.id]?.price ?? product.price;

                  return (
                    <motion.tr key={product.id} layout className="hover:bg-gray-50/50 transition-colors">
                      <td className="px-6 py-4">
                        <div className="text-sm font-bold text-gray-900">{product.name}</div>
                        <div className="text-xs text-gray-500">{product.code}</div>
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex items-center space-x-2">
                          <span className="text-gray-400">₦</span>
                          <input
                            type="number" value={currentPrice}
                            onChange={(e) => handleProductChange(product.id, 'price', parseFloat(e.target.value))}
                            className="w-32 px-3 py-2 border border-gray-200 rounded-lg outline-none transition-all"
                          />
                          <span className="text-gray-400 text-sm">/ {product.unit}</span>
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <button
                          onClick={() => toggleProductAvailability(product)}
                          className={`relative inline-flex h-6 w-11 shrink-0 cursor-pointer rounded-full transition-colors duration-200 ease-in-out ${product.is_available ? 'bg-green-500' : 'bg-gray-200'}`}
                        >
                          <span className={`inline-block h-5 w-5 transform rounded-full bg-white shadow transition duration-200 ease-in-out ${product.is_available ? 'translate-x-5' : 'translate-x-0'}`} />
                        </button>
                      </td>
                      <td className="px-6 py-4 text-right space-x-2 ">
                        {isEdited && (
                          <button
                            onClick={() => saveProduct(product)} disabled={savingProducts}
                            className="inline-flex items-center px-2 py-2 text-sm font-medium text-white bg-primary rounded-lg hover:bg-primary-dark"
                          >
                             {savingProducts ? <FaSpinner className="animate-spin" /> : <FaSave />}
                          </button>
                        )}
                        <button onClick={() => handleDeleteProduct(product.id)} className="inline-flex items-center px-2 py-2 text-sm font-medium text-red-600 bg-red-50 rounded-lg hover:bg-red-100">
                          <FaTrash />
                        </button>
                      </td>
                    </motion.tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>



        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
          <div className="p-6 border-b border-gray-100 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <h2 className="text-lg font-bold text-slate-deep flex items-center space-x-2">
                <FaFire className="text-orange-500" />
                <span>LPG Sizes Management</span>
              </h2>
              <p className="text-sm text-gray-500">Manage cooking gas cylinder prices</p>
            </div>
          </div>

          <div className="overflow-x-auto [&::-webkit-scrollbar]:h-0.5">
            <table className="w-full">
              <thead className="bg-gray-50 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">
                <tr>
                  <th className="px-6 py-4">Size (kg)</th>
                  <th className="px-6 py-4">Current Price (₦)</th>
                  <th className="px-6 py-4">Status</th>
                  <th className="px-6 py-4 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
              
                {/* add lpg */}
                <tr className="bg-blue-50/30">
                  <td className="px-6 py-4">
                    <div className="flex items-center space-x-2">
                      <input 
                        type="number" placeholder="e.g. 12.5" 
                        value={newLPGSize.size_kg} onChange={(e) => setNewLPGSize({...newLPGSize, size_kg: e.target.value})}
                        className="w-24 px-3 py-2 text-sm border rounded-lg"
                      />
                      <span className="text-gray-500 text-sm">kg</span>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <input 
                      type="number" placeholder="Price" 
                      value={newLPGSize.price} onChange={(e) => setNewLPGSize({...newLPGSize, price: e.target.value})}
                      className="w-32 px-3 py-2 border rounded-lg outline-none"
                    />
                  </td>
                  <td className="px-6 py-4">
                    <span className="text-sm text-gray-400">Default: Active</span>
                  </td>
                  <td className="px-6 py-4 text-right">
                    <button 
                      onClick={handleAddLPG} disabled={isAddingLPG}
                      className="inline-flex items-center px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 text-sm font-medium"
                    >
                      {isAddingLPG ? <FaSpinner className="animate-spin" /> : <FaPlus />} <span className="ml-2">Add</span>
                    </button>
                  </td>
                </tr>

                {/* lpgs */}
                {lpgSizes.map((size) => {
                  const isEdited = !!editedLPG[size.id];
                  const currentPrice = editedLPG[size.id]?.price ?? size.price;

                  return (
                    <motion.tr key={size.id} layout className="hover:bg-gray-50/50 transition-colors">
                      <td className="px-6 py-4">
                        <div className="text-sm font-bold text-gray-900">{size.size_kg} kg Cylinder</div>
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex items-center space-x-2">
                          <span className="text-gray-400">₦</span>
                          <input
                            type="number" value={currentPrice}
                            onChange={(e) => handleLPGChange(size.id, 'price', parseFloat(e.target.value))}
                            className="w-32 px-3 py-2 border border-gray-200 rounded-lg outline-none transition-all"
                          />
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <button
                          onClick={() => toggleLPGAvailability(size)}
                          className={`relative inline-flex h-6 w-11 shrink-0 cursor-pointer rounded-full transition-colors duration-200 ease-in-out ${size.is_available ? 'bg-green-500' : 'bg-gray-200'}`}
                        >
                          <span className={`inline-block h-5 w-5 transform rounded-full bg-white shadow transition duration-200 ease-in-out ${size.is_available ? 'translate-x-5' : 'translate-x-0'}`} />
                        </button>
                      </td>
                      <td className="px-6 py-4 text-right space-x-2">
                        {isEdited && (
                          <button
                            onClick={() => saveLPG(size)} disabled={savingLPG}
                            className="inline-flex items-center px-3 py-2 text-sm font-medium text-white bg-primary rounded-lg hover:bg-primary-dark"
                          >
                             {savingLPG ? <FaSpinner className="animate-spin" /> : <FaSave />}
                          </button>
                        )}
                        <button onClick={() => handleDeleteLPG(size.id)} className="inline-flex items-center px-3 py-2 text-sm font-medium text-red-600 bg-red-50 rounded-lg hover:bg-red-100">
                          <FaTrash />
                        </button>
                      </td>
                    </motion.tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>



        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
          <div className="p-6 border-b border-gray-100">
            <h2 className="text-lg font-bold text-slate-deep flex items-center space-x-2">
              <FaLock className="text-red-500" />
              <span>Admin Security Settings</span>
            </h2>
            <p className="text-sm text-gray-500">Update your administrative credentials</p>
          </div>
          
          <div className="p-6 max-w-md">
            <form onSubmit={handlePasswordChange} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">New Password</label>
                <div className="relative">
                  <FaKey className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                  <input
                    type="password" value={newPassword} onChange={(e) => setNewPassword(e.target.value)}
                    className="w-full pl-10 pr-4 py-2 border border-gray-200 rounded-lg outline-none focus:border-primary focus:ring-1"
                    placeholder="Enter new password"
                  />
                </div>
              </div>

              {passwordMessage.text && (
                <div className={`p-3 rounded-lg text-sm ${passwordMessage.type === 'success' ? 'bg-green-50 text-green-700' : 'bg-red-50 text-red-700'}`}>
                  {passwordMessage.text}
                </div>
              )}

              <button
                type="submit" disabled={changingPassword}
                className="inline-flex items-center px-6 py-2 bg-slate-deep text-white rounded-lg font-medium hover:bg-black transition-colors disabled:opacity-50"
              >
                {changingPassword ? <FaSpinner className="animate-spin mr-2" /> : <FaSave className="mr-2" />}
                Update Password
              </button>
            </form>
          </div>
        </div>
      </main>
    </div>
  );
}