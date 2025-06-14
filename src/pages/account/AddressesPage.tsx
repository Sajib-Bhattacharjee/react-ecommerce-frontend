import React, { useState } from "react";
import { Card, Button, Row, Col, Form, Modal, Badge } from "react-bootstrap";
import { FaEdit, FaTrash, FaPlus } from "react-icons/fa";
import { Icon } from "../../utils/IconHelper";
import "./AddressesPage.css";

// Mock addresses for demo
const mockAddresses = [
  {
    id: 1,
    type: "Home",
    default: true,
    fullName: "John Doe",
    address1: "123 Main Street",
    address2: "Apt 4B",
    city: "San Francisco",
    state: "CA",
    zipCode: "94105",
    country: "United States",
    phone: "555-123-4567",
  },
  {
    id: 2,
    type: "Work",
    default: false,
    fullName: "John Doe",
    address1: "456 Market Street",
    address2: "Suite 300",
    city: "San Francisco",
    state: "CA",
    zipCode: "94102",
    country: "United States",
    phone: "555-765-4321",
  },
];

interface Address {
  id: number;
  type: string;
  default: boolean;
  fullName: string;
  address1: string;
  address2: string;
  city: string;
  state: string;
  zipCode: string;
  country: string;
  phone: string;
}

const AddressesPage: React.FC = () => {
  const [addresses, setAddresses] = useState<Address[]>(mockAddresses);
  const [showModal, setShowModal] = useState(false);
  const [editingAddress, setEditingAddress] = useState<Address | null>(null);

  const initialFormState = {
    id: 0,
    type: "Home",
    default: false,
    fullName: "",
    address1: "",
    address2: "",
    city: "",
    state: "",
    zipCode: "",
    country: "United States",
    phone: "",
  };

  const [formData, setFormData] = useState<Address>(initialFormState);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleEdit = (address: Address) => {
    setEditingAddress(address);
    setFormData(address);
    setShowModal(true);
  };

  const handleAdd = () => {
    setEditingAddress(null);
    setFormData(initialFormState);
    setShowModal(true);
  };

  const handleDelete = (id: number) => {
    setAddresses((prev) => prev.filter((address) => address.id !== id));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    // If it's a new default address, remove default from others
    if (formData.default) {
      setAddresses((prev) =>
        prev.map((addr) => ({
          ...addr,
          default: false,
        }))
      );
    }

    if (editingAddress) {
      // Update existing address
      setAddresses((prev) =>
        prev.map((addr) => (addr.id === editingAddress.id ? formData : addr))
      );
    } else {
      // Add new address
      const newId = Math.max(0, ...addresses.map((a) => a.id)) + 1;
      setAddresses((prev) => [...prev, { ...formData, id: newId }]);
    }

    setShowModal(false);
  };

  return (
    <div className="addresses-page">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h3>My Addresses</h3>
        <Button
          variant="primary"
          className="add-address-btn"
          onClick={handleAdd}
        >
          <Icon icon={FaPlus} /> Add New Address
        </Button>
      </div>

      {addresses.length === 0 ? (
        <Card className="text-center p-5">
          <Card.Body>
            <h5>You haven't saved any addresses yet</h5>
            <p className="text-muted">
              Add a shipping or billing address to make checkout faster.
            </p>
            <Button variant="outline-primary" onClick={handleAdd}>
              Add Address
            </Button>
          </Card.Body>
        </Card>
      ) : (
        <Row>
          {addresses.map((address) => (
            <Col md={6} key={address.id} className="mb-4">
              <Card className="address-card h-100">
                <Card.Body>
                  <div className="d-flex justify-content-between align-items-start mb-2">
                    <Badge bg="secondary" className="address-type">
                      {address.type}
                    </Badge>
                    {address.default && <Badge bg="success">Default</Badge>}
                  </div>
                  <h5 className="mb-2">{address.fullName}</h5>
                  <div className="address-details">
                    <p>{address.address1}</p>
                    {address.address2 && <p>{address.address2}</p>}
                    <p>
                      {address.city}, {address.state} {address.zipCode}
                    </p>
                    <p>{address.country}</p>
                    <p>Phone: {address.phone}</p>
                  </div>
                </Card.Body>
                <Card.Footer className="bg-white d-flex">
                  <Button
                    variant="link"
                    className="text-primary me-2"
                    onClick={() => handleEdit(address)}
                  >
                    <Icon icon={FaEdit} /> Edit
                  </Button>
                  <Button
                    variant="link"
                    className="text-danger"
                    onClick={() => handleDelete(address.id)}
                  >
                    <Icon icon={FaTrash} /> Delete
                  </Button>
                </Card.Footer>
              </Card>
            </Col>
          ))}
        </Row>
      )}

      {/* Add/Edit Address Modal */}
      <Modal
        show={showModal}
        onHide={() => setShowModal(false)}
        backdrop="static"
        size="lg"
      >
        <Modal.Header closeButton>
          <Modal.Title>
            {editingAddress ? "Edit Address" : "Add New Address"}
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={handleSubmit}>
            <Row>
              <Col md={6}>
                <Form.Group className="mb-3">
                  <Form.Label>Address Type</Form.Label>
                  <Form.Select
                    name="type"
                    value={formData.type}
                    onChange={(e) =>
                      setFormData({ ...formData, type: e.target.value })
                    }
                  >
                    <option value="Home">Home</option>
                    <option value="Work">Work</option>
                    <option value="Other">Other</option>
                  </Form.Select>
                </Form.Group>
              </Col>
              <Col md={6}>
                <Form.Group className="mb-3 d-flex align-items-center h-100">
                  <Form.Check
                    type="checkbox"
                    id="default-address"
                    name="default"
                    label="Set as default address"
                    checked={formData.default}
                    onChange={handleChange}
                    className="pt-3"
                  />
                </Form.Group>
              </Col>
            </Row>

            <Form.Group className="mb-3">
              <Form.Label>Full Name</Form.Label>
              <Form.Control
                type="text"
                name="fullName"
                value={formData.fullName}
                onChange={handleChange}
                required
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Address Line 1</Form.Label>
              <Form.Control
                type="text"
                name="address1"
                value={formData.address1}
                onChange={handleChange}
                required
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Address Line 2 (Optional)</Form.Label>
              <Form.Control
                type="text"
                name="address2"
                value={formData.address2}
                onChange={handleChange}
              />
            </Form.Group>

            <Row>
              <Col md={6}>
                <Form.Group className="mb-3">
                  <Form.Label>City</Form.Label>
                  <Form.Control
                    type="text"
                    name="city"
                    value={formData.city}
                    onChange={handleChange}
                    required
                  />
                </Form.Group>
              </Col>
              <Col md={6}>
                <Form.Group className="mb-3">
                  <Form.Label>State/Province</Form.Label>
                  <Form.Control
                    type="text"
                    name="state"
                    value={formData.state}
                    onChange={handleChange}
                    required
                  />
                </Form.Group>
              </Col>
            </Row>

            <Row>
              <Col md={6}>
                <Form.Group className="mb-3">
                  <Form.Label>Zip/Postal Code</Form.Label>
                  <Form.Control
                    type="text"
                    name="zipCode"
                    value={formData.zipCode}
                    onChange={handleChange}
                    required
                  />
                </Form.Group>
              </Col>
              <Col md={6}>
                <Form.Group className="mb-3">
                  <Form.Label>Country</Form.Label>
                  <Form.Control
                    type="text"
                    name="country"
                    value={formData.country}
                    onChange={handleChange}
                    required
                  />
                </Form.Group>
              </Col>
            </Row>

            <Form.Group className="mb-3">
              <Form.Label>Phone Number</Form.Label>
              <Form.Control
                type="tel"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                required
              />
            </Form.Group>

            <div className="d-flex justify-content-end gap-2 mt-4">
              <Button
                variant="outline-secondary"
                onClick={() => setShowModal(false)}
              >
                Cancel
              </Button>
              <Button variant="primary" type="submit">
                {editingAddress ? "Update Address" : "Add Address"}
              </Button>
            </div>
          </Form>
        </Modal.Body>
      </Modal>
    </div>
  );
};

export default AddressesPage;
