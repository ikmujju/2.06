import React, { useEffect, useState } from "react";
import "./orders.css";
import Adminheader from "../src/Admin/Adminheader";
import axios from "axios";

function TotalOrders() {
    const [orders, setOrders] = useState([]);
    const [loading, setLoading] = useState(true);

    axios.defaults.withCredentials = true;

    useEffect(() => {
        fetchOrders();
    }, []);

    const fetchOrders = async () => {
        try {
            const { data } = await axios.get("http://localhost:3001/auth/disporder");
            setOrders(data);
        } catch (error) {
            console.error("Error fetching orders:", error);
        } finally {
            setLoading(false);
        }
    };

    const handleStatusChange = async (orderId, newStatus) => {
        try {
            await axios.put(`http://localhost:3001/auth/updateorder/${orderId}`, { status: newStatus });
            setOrders(prevOrders =>
                prevOrders.map(order =>
                    order._id === orderId ? { ...order, status: newStatus } : order
                )
            );
        } catch (error) {
            console.error("Error updating order status:", error);
        }
    };

    const handleDelete = async (orderId) => {
        try {
            const response = await axios.delete(`http://localhost:3001/auth/deleteorder/${orderId}`);
            
            if (response.status === 200) {
                // Remove order from UI
                setOrders(prevOrders => prevOrders.filter(order => order._id !== orderId));

                // Update total sales after deletion
                await axios.put("http://localhost:3001/auth/updatetotalsales");
            } else {
                console.error("Failed to delete order:", response.data);
            }
        } catch (error) {
            console.error("Error deleting order:", error);
        }
    };

    if (loading) return <p>Loading orders...</p>;

    return (
        <>
            <Adminheader />
            <div className="orders-container">
                <h2>Total Orders</h2>
                <table>
                    <thead>
                        <tr>
                            <th>Order ID</th>
                            <th>Customer</th>
                            <th>Amount</th>
                            <th>Status</th>
                            <th>Address</th>
                            <th>Phone</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {orders.length > 0 ? (
                            orders.map(order => (
                                <tr key={order._id}>
                                    <td>{order._id}</td>
                                    <td>{order.userEmail}</td>
                                    <td>₹{order.totalPrice}</td>
                                    <td>
                                        <select
                                            value={order.status || "Pending"}
                                            onChange={(e) => handleStatusChange(order._id, e.target.value)}
                                        >
                                            <option value="Pending">Pending</option>
                                            <option value="Shipping">Shipping</option>
                                            <option value="Delivered">Delivered</option>
                                        </select>
                                    </td>
                                    <td>{order.shippingAddress.address}</td>
                                    <td>{order.shippingAddress.phone}</td>
                                    <td>
                                        <button onClick={() => handleDelete(order._id)}>Delete</button>
                                    </td>
                                </tr>
                            ))
                        ) : (
                            <tr>
                                <td colSpan="7">No orders found.</td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>
        </>
    );
}

export default TotalOrders;
