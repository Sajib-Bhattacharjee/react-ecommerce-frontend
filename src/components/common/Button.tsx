import React, { ButtonHTMLAttributes, ReactNode } from "react";
import { Link } from "react-router-dom";
import { Spinner } from "react-bootstrap";

type ButtonVariant =
  | "primary"
  | "secondary"
  | "outline"
  | "link"
  | "success"
  | "danger"
  | "warning"
  | "info";
type ButtonSize = "sm" | "md" | "lg";

interface BaseButtonProps {
  variant?: ButtonVariant;
  size?: ButtonSize;
  fullWidth?: boolean;
  rounded?: boolean;
  isLoading?: boolean;
  loadingText?: string;
  disabled?: boolean;
  leftIcon?: ReactNode;
  rightIcon?: ReactNode;
  className?: string;
  children?: ReactNode;
}

interface ButtonProps
  extends BaseButtonProps,
    ButtonHTMLAttributes<HTMLButtonElement> {
  href?: never;
  to?: never;
}

interface LinkButtonProps extends BaseButtonProps {
  href: string;
  to?: never;
  target?: string;
  rel?: string;
  onClick?: React.MouseEventHandler<HTMLAnchorElement>;
}

interface RouterLinkButtonProps extends BaseButtonProps {
  to: string;
  href?: never;
  onClick?: React.MouseEventHandler<HTMLAnchorElement>;
}

type CombinedButtonProps =
  | ButtonProps
  | LinkButtonProps
  | RouterLinkButtonProps;

const Button: React.FC<CombinedButtonProps> = (props) => {
  const {
    variant = "primary",
    size = "md",
    fullWidth = false,
    rounded = false,
    isLoading = false,
    loadingText,
    disabled = false,
    leftIcon,
    rightIcon,
    children,
    className = "",
    ...rest
  } = props;

  const baseClassName = `btn btn-${variant} btn-${size} ${
    fullWidth ? "btn-block" : ""
  } ${rounded ? "btn-rounded" : ""} ${
    isLoading ? "loading" : ""
  } ${className}`.trim();

  const buttonContent = (
    <>
      {isLoading && (
        <Spinner
          as="span"
          animation="border"
          size="sm"
          role="status"
          aria-hidden="true"
          className="me-2"
        />
      )}
      {leftIcon && !isLoading && (
        <span className="btn-icon btn-icon-left">{leftIcon}</span>
      )}
      {isLoading && loadingText ? loadingText : children}
      {rightIcon && !isLoading && (
        <span className="btn-icon btn-icon-right">{rightIcon}</span>
      )}
    </>
  );

  // Check if it's a router link (to prop exists)
  if ("to" in props && props.to) {
    return (
      <Link
        to={props.to}
        className={baseClassName}
        {...(rest as Omit<RouterLinkButtonProps, "to">)}
      >
        {buttonContent}
      </Link>
    );
  }

  // Check if it's an external link (href prop exists)
  if ("href" in props && props.href) {
    return (
      <a
        href={props.href}
        className={baseClassName}
        target={props.target}
        rel={
          props.rel ||
          (props.target === "_blank" ? "noopener noreferrer" : undefined)
        }
        {...(rest as Omit<LinkButtonProps, "href" | "target" | "rel">)}
      >
        {buttonContent}
      </a>
    );
  }

  // Default button
  return (
    <button
      className={baseClassName}
      disabled={disabled || isLoading}
      {...(rest as ButtonProps)}
    >
      {buttonContent}
    </button>
  );
};

export default Button;
