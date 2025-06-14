import React from "react";
import { Container } from "react-bootstrap";
import "./PageHeader.css";

interface PageHeaderProps {
  title: string;
  description?: string;
  bgImage?: string;
}

const PageHeader: React.FC<PageHeaderProps> = ({
  title,
  description,
  bgImage = "/images/public/images/page-header-bg.jpg",
}) => {
  return (
    <div className="page-header" style={{ backgroundImage: `url(${bgImage})` }}>
      <Container className="text-center">
        <h1 className="page-title">{title}</h1>
        {description && <p className="page-description">{description}</p>}
      </Container>
    </div>
  );
};

export default PageHeader;
