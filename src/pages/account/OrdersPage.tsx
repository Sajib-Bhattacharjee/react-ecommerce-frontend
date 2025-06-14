import React, { useState } from "react";
import { Card, Table, Badge, Button, Collapse } from "react-bootstrap";
import { FaChevronDown, FaChevronUp } from "react-icons/fa";
import { Icon } from "../../utils/IconHelper";
import "./OrdersPage.css";

// Mock data for demo purposes
const mockOrders = [
  {
    id: "ORD-12345",
    date: "April 15, 2023",
    status: "Delivered",
    total: 129.99,
    items: [
      { id: 1, name: "Wireless Headphones", price: 79.99, quantity: 1 },
      { id: 2, name: "Phone Case", price: 24.99, quantity: 2 },
    ],
    tracking: "TRK928374651",
    address: "123 Main St, Anytown, CA 91234",
  },
  {
    id: "ORD-12346",
    date: "April 2, 2023",
    status: "Processing",
    total: 199.99,
    items: [{ id: 3, name: "Smart Watch", price: 199.99, quantity: 1 }],
    tracking: null,
    address: "123 Main St, Anytown, CA 91234",
  },
  {
    id: "ORD-12347",
    date: "March 27, 2023",
    status: "Cancelled",
    total: 49.99,
    items: [{ id: 4, name: "Bluetooth Speaker", price: 49.99, quantity: 1 }],
    tracking: null,
    address: "123 Main St, Anytown, CA 91234",
  },
];

const OrdersPage: React.FC = () => {
  const [openOrder, setOpenOrder] = useState<string | null>(null);

  const toggleOrderDetails = (orderId: string) => {
    if (openOrder === orderId) {
      setOpenOrder(null);
    } else {
      setOpenOrder(orderId);
    }
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "Delivered":
        return <Badge bg="success">Delivered</Badge>;
      case "Processing":
        return <Badge bg="primary">Processing</Badge>;
      case "Shipped":
        return <Badge bg="info">Shipped</Badge>;
      case "Cancelled":
        return <Badge bg="danger">Cancelled</Badge>;
      default:
        return <Badge bg="secondary">{status}</Badge>;
    }
  };

  return (
    <div className="orders-page">
      <h3>My Orders</h3>

      {mockOrders.length === 0 ? (
        <Card className="text-center p-5">
          <Card.Body>
            <h5>You haven't placed any orders yet</h5>
            <p className="text-muted">
              When you place orders, they will appear here.
            </p>
            <Button variant="outline-primary" href="/shop">
              Start Shopping
            </Button>
          </Card.Body>
        </Card>
      ) : (
        <div className="orders-list">
          {mockOrders.map((order) => (
            <Card key={order.id} className="order-card mb-3">
              <Card.Header className="d-flex justify-content-between align-items-center">
                <div>
                  <h5 className="mb-0">{order.id}</h5>
                  <small className="text-muted">Ordered on {order.date}</small>
                </div>
                <div className="d-flex align-items-center">
                  {getStatusBadge(order.status)}
                  <Button
                    variant="link"
                    className="details-toggle"
                    onClick={() => toggleOrderDetails(order.id)}
                    aria-expanded={openOrder === order.id}
                  >
                    {openOrder === order.id ? (
                      <Icon icon={FaChevronUp} />
                    ) : (
                      <Icon icon={FaChevronDown} />
                    )}
                  </Button>
                </div>
              </Card.Header>
              <Collapse in={openOrder === order.id}>
                <div>
                  <Card.Body>
                    <h6>Order Details</h6>
                    <Table responsive className="items-table">
                      <thead>
                        <tr>
                          <th>Product</th>
                          <th>Price</th>
                          <th>Quantity</th>
                          <th>Total</th>
                        </tr>
                      </thead>
                      <tbody>
                        {order.items.map((item) => (
                          <tr key={item.id}>
                            <td>{item.name}</td>
                            <td>${item.price.toFixed(2)}</td>
                            <td>{item.quantity}</td>
                            <td>${(item.price * item.quantity).toFixed(2)}</td>
                          </tr>
                        ))}
                        <tr className="total-row">
                          <td colSpan={3} className="text-end">
                            <strong>Order Total:</strong>
                          </td>
                          <td>
                            <strong>${order.total.toFixed(2)}</strong>
                          </td>
                        </tr>
                      </tbody>
                    </Table>

                    <div className="order-meta">
                      <div className="delivery-address">
                        <h6>Delivery Address</h6>
                        <p>{order.address}</p>
                      </div>
                      {order.tracking && (
                        <div className="tracking-info">
                          <h6>Tracking Number</h6>
                          <p>{order.tracking}</p>
                        </div>
                      )}
                    </div>
                  </Card.Body>
                </div>
              </Collapse>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
};

export default OrdersPage;
