"use client";

import Link from "next/link";
import "./error.scss";
import { FC } from "react";
import { Container } from "../Container";
import { Button } from "../Button";
import { debounce } from "@/utils";

interface ErrorComponentProps {
  title: string;
  message: string;
  reset?: () => void;
  code?: string | number;
}

const ErrorComponent: FC<ErrorComponentProps> = ({
  title,
  message,
  reset,
  code,
}) => {
  return (
    <section>
      <Container>
        <div className="error-comp-container">
          <div className="error-comp">
            <h1 className="error-comp-title">{title}</h1>
            {code && <span className="error-comp-code">{code}</span>}
            <p className="error-comp-message">{message}</p>
            <div className="error-comp-actions">
              {reset && (
                <Button
                  onClick={() => debounce(reset, 2000)}
                  className="error-comp-actions-reset bg-primary text-white min-w-[9em]"
                >
                  اعادة المحاولة
                </Button>
              )}
              <div className="error-comp-actions-links">
                <Link href="/" className="error-comp-actions-link mx-l">
                  العودة للصفحة الرئيسية
                </Link>
              </div>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
};

export default ErrorComponent;
