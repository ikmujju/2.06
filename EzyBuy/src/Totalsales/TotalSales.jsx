import { useEffect, useState } from "react";
import React from "react";
import axios from "axios";

function TotalSales() {
    const [sales, setSales] = useState(null);
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchSalesData();
    }, []);

    const fetchSalesData = () => {
        axios.get("http://localhost:3001/auth/dissale")
            .then((response) => {
                setSales(response.data);
                setLoading(false);
            })
            .catch((err) => {
                console.error("Something went wrong", err);
                setError("Can't load sales data");
                setLoading(false);
            });
    };

    if (loading) return <p className="sales-load">Loading sales data...</p>;
    if (error) return <p className="sales-err">{error}</p>;

    return (
        <>
         
            <div className="sales-container">
                <h2>Total Sales</h2>
                <table>
                    <thead>
                        <tr>
                            <th>Total Revenue</th>
                            <th>Total Orders</th>
                            <th>Total Products Sold</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td>₹{sales?.totalRevenue || 0}</td>
                            <td>{sales?.totalOrders || 0}</td>
                            <td>{sales?.totalProductsSold || 0}</td>
                        </tr>
                    </tbody>
                </table>
                <button onClick={fetchSalesData} className="refresh-button">Refresh</button>
            </div>
        </>
    );
}

export default TotalSales;
