import { createContext, useEffect, useState } from "react";
import { toast } from "react-toastify";
import axios from "axios";

// Create context
export const Admincontext = createContext();

const AdmincontextProvider = (props) => {
    const [token, setToken] = useState(localStorage.getItem("token") || "");
    const [products, setProducts] = useState([]);
    const [orders, setOrders] = useState([]);

    const backendUrl = import.meta.env.VITE_META_BACKEND_URL;
    const currencySymbol = "$";

    // Fetch all products
    const getAllProducts = async () => {
        try {
            const { data } = await axios.get(`${backendUrl}/api/products/get-products`);
            if (data.success) {
                setProducts(data.products);
            } else {
                toast.error(data.message);
            }
        } catch (error) {
            toast.error(error.message );
        }
    };

    // Fetch all orders
    const getAllOrders = async () => {
        try {
            const { data } = await axios.get(`${backendUrl}/api/order/allOrders`, {
                headers: { token },
            });
            if (data.success) {
                setOrders(data.orders);
            } else {
                toast.error(data.message);
            }
        } catch (error) {
            toast.error(error.message );
        }
    };

    // Update order status
    const handleStatus = async (orderId, status) => {
        try {
            const response = await axios.post(
                `${backendUrl}/api/order/updateStatus`,
                { orderId, status },
                { headers: { token } }
            );
            if (response.data.success) {
                await getAllOrders();
                toast.success("Order status updated");
            } else {
                toast.error(response.data.message);
            }
        } catch (error) {
            toast.error(error.message );
        }
    };

    // Remove a product
    const removeProduct = async (productId) => {
        try {
            const { data } = await axios.post(
                `${backendUrl}/api/products/remove-product`,
                { productId },
                { headers: { token } }
            );
            if (data.success) {
                await getAllProducts();
                toast.success(data.message);
            } else {
                toast.error(data.message);
            }
        } catch (error) {
            toast.error(error.message || "Error removing product");
        }
    };

    useEffect(() => {
        if (token) {
            getAllProducts();
            getAllOrders();
        }
    }, [token]);

    
    const value = {
        token,
        setToken,
        backendUrl,
        products,
        currencySymbol,
        removeProduct,
        orders,
        handleStatus,
    };

    return (
        <Admincontext.Provider value={value}>
            {props.children}
        </Admincontext.Provider>
    );
};

export default AdmincontextProvider;
