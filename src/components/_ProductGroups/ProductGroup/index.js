import React, { useEffect, useState } from 'react';
import { db } from '@db'; // Adjust the path if necessary
import { collection, query, where, getDocs, doc, getDoc } from 'firebase/firestore';
import { useParams, navigate } from '@reach/router';
import { Link } from 'gatsby';

const ProductGroup = ({slug}) => {
  const [productGroup, setProductGroup] = useState(null);
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProductGroupBySlug = async () => {
      try {
        // Step 1: Query for the product group with the specified slug
        const productGroupsQuery = query(
          collection(db, 'productGroup'),
          where('slug', '==', slug)
        );
        const querySnapshot = await getDocs(productGroupsQuery);

        if (!querySnapshot.empty) {
          const productGroupDoc = querySnapshot.docs[0];
          const productGroupData = productGroupDoc.data();
          setProductGroup({ id: productGroupDoc.id, ...productGroupData });

          // Step 2: Fetch products associated with this product group
          const productGroupRef = doc(db, 'productGroup', productGroupDoc.id);
          const productGroupsQuery = query(
            collection(db, 'product'),
            where('productGroupId', '==', productGroupRef) // Use category document reference
          );
          const productsSnapshot = await getDocs(productGroupsQuery);
          const productsList = productsSnapshot.docs.map(doc => ({
            id: doc.id,
            ...doc.data(),
          }));
          setProducts(productsList);
        } else {
          console.error('Product group not found');
        }
      } catch (error) {
        console.error('Error fetching product group:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchProductGroupBySlug();
  }, [slug]);

  if (loading) return <p>Loading product group and products...</p>;

  return (
    <div className="container mx-auto py-10">
      {productGroup && (
        <div className="relative flex min-w-0 mb-10 px-4 break-words bg-white shadow rounded-2xl bg-clip-border items-center">
          <div className="flex-auto p-4">
            <div className="flex flex-wrap -mx-3">
              <div className="max-w-full px-3 lg:w-1/2 lg:flex-none">
                <div className="flex flex-col h-full">
                  <h5 className="font-bold">{productGroup.title}</h5>
                  <p className="mb-12">{productGroup.description}</p>
                  <div className="flex gap-4">
                    <Link to={`/productGroups/editProductGroup/${productGroup.id}`}>Edit</Link>
                  </div>
                </div>
              </div>
              <div className="max-w-full ml-auto text-center lg:mt-0 w-24 lg:flex-none">
                <div className="rounded-xl">
                  <img src={productGroup.image} alt={productGroup.title} />
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      <div className="flex items-center">
        <h2 className="text-2xl font-semibold mb-4">Products</h2>
        <Link to="/products/addProduct" className="text-blue-500 ms-auto">Add New Product</Link>
      </div>

      <div className="relative flex min-w-0 mb-10 px-4 break-words bg-white shadow rounded-2xl bg-clip-border items-center">
        <div className="flex-auto p-4">
          <div className="flex-auto px-0 pt-0 pb-2">
            <div className="p-4 overflow-x-auto">
              {products.length > 0 ? (
                <table className="items-center w-full mb-0 align-top border-gray-200 text-slate-500">
                  <thead className="align-bottom">
                    <tr>
                      <th className="px-6 py-3 font-bold text-left uppercase align-middle bg-transparent border-b border-gray-200 shadow-none text-xxs border-b-solid tracking-none whitespace-nowrap text-slate-400 opacity-70">Id</th>
                      <th className="px-6 py-3 pl-2 font-bold text-left uppercase align-middle bg-transparent border-b border-gray-200 shadow-none text-xxs border-b-solid tracking-none whitespace-nowrap text-slate-400 opacity-70">Name</th>
                      <th className="px-6 py-3 pl-2 font-bold text-left uppercase align-middle bg-transparent border-b border-gray-200 shadow-none text-xxs border-b-solid tracking-none whitespace-nowrap text-slate-400 opacity-70">Unit Cost</th>
                      <th className="px-6 py-3 pl-2 font-bold text-left uppercase align-middle bg-transparent border-b border-gray-200 shadow-none text-xxs border-b-solid tracking-none whitespace-nowrap text-slate-400 opacity-70">Status</th>
                      <th className="px-6 py-3 pl-2 font-bold text-left uppercase align-middle bg-transparent border-b border-gray-200 shadow-none text-xxs border-b-solid tracking-none whitespace-nowrap text-slate-400 opacity-70">Estimated Shipping Cost</th>
                      <th className="px-6 py-3 font-bold text-center uppercase align-middle bg-transparent border-b border-gray-200 shadow-none text-xxs border-b-solid tracking-none whitespace-nowrap text-slate-400 opacity-70">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {products.map((product, index) => (
                      <tr key={product.id}>
                        <td className="p-2 align-middle bg-transparent border-b whitespace-nowrap shadow-transparent">
                          <p className="mb-0 font-semibold leading-tight text-xs">{index + 1}</p>
                        </td>
                        <td className="p-2 align-middle bg-transparent border-b whitespace-nowrap shadow-transparent">
                          <div className="flex px-2 py-1 items-center">
                            <div>
                              <img src={`/images/${product.slug}.png`} className="inline-flex mb-0 items-center justify-center mr-4 text-white transition-all duration-200 ease-in-out text-sm h-9 w-9 rounded-xl" alt={product.name} />
                            </div>
                            <div className="flex flex-col justify-center">
                              <h6 className="mb-0 leading-normal text-sm">{product.name}</h6>
                            </div>
                          </div>
                        </td>
                        <td className="p-2 align-middle bg-transparent border-b whitespace-nowrap shadow-transparent">
                          ${product.unitCost}
                        </td>
                        <td className="p-2 align-middle bg-transparent border-b whitespace-nowrap shadow-transparent">
                          {product.state}
                        </td>
                        <td className="p-2 align-middle bg-transparent border-b whitespace-nowrap shadow-transparent">
                          ${product.estShippingCost}
                        </td>
                        <td className="p-2 align-middle bg-transparent border-b whitespace-nowrap shadow-transparent">
                          <Link to={`/product/${product.id}`} className="infoBtn">View</Link>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              ) : (
                <p>No products found for this product group.</p>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductGroup;
