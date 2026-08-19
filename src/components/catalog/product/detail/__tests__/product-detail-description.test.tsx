import { render, screen, waitFor } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import { ProductDetailDescription } from "@/components/catalog/product/detail/product-detail-description";

const defaultProps = {
  title: "Test Product",
  resumen: "",
  stock: 10,
  prices: 100,
  priceb: 90,
  exchange: 3.7,
  subCategories: "laptops",
  product: {
    id: 1,
    isActive: true,
    slug: "test-product",
    resumen: "",
    relay: {
      productId: "P001",
      productName: "Test Product",
      classificationCode: {
        brandCode: "BR001",
        brandName: "Test Brand",
        brands: "Test Brand",
      },
      categoryCode: {
        categoryCode: "CAT001",
        categoryName: "Test Category",
        categoryWeb: "test-category",
      },
      subcategoryCode: {
        subcategoryCode: "SUB001",
        subcategoryName: "Test Subcategory",
        subcategoryweb: "test-subcategory",
      },
      priceSale: 100,
      priceBulk: 90,
      totalStock: 10,
    },
    productsimages: [],
  },
};

describe("XSS sanitization — product-detail-description", () => {
  it("renders clean HTML with formatting tags preserved", async () => {
    const cleanHtml = "<p>AMD Ryzen 7 <b>8-core</b> processor</p>";
    render(
      <ProductDetailDescription {...defaultProps} resumen={cleanHtml} />
    );
    // DOMPurify is loaded via a dynamic import and committed asynchronously
    // (see product-detail-description.tsx), so the sanitized markup is not
    // in the DOM synchronously after render — it must be awaited.
    const container = await screen.findByTestId("product-description");
    await waitFor(() => {
      expect(container.innerHTML).toContain("<b>8-core</b>");
    });
    expect(container.innerHTML).toContain("<p>");
  });

  it("strips script tags from description", async () => {
    const maliciousHtml =
      '<script>alert("xss")</script><p>Safe text</p>';
    render(
      <ProductDetailDescription {...defaultProps} resumen={maliciousHtml} />
    );
    const container = await screen.findByTestId("product-description");
    await waitFor(() => {
      expect(container.innerHTML).toContain("Safe text");
    });
    expect(container.innerHTML).not.toContain("<script");
    expect(container.innerHTML).not.toContain("alert");
  });

  it("strips event handler attributes", async () => {
    const maliciousHtml =
      '<img src="x.jpg" onerror="fetch(\'/steal?c=\'+document.cookie)" />';
    render(
      <ProductDetailDescription {...defaultProps} resumen={maliciousHtml} />
    );
    const container = await screen.findByTestId("product-description");
    await waitFor(() => {
      expect(container.innerHTML).toContain("<img");
    });
    expect(container.innerHTML).not.toContain("onerror");
    expect(container.innerHTML).not.toContain("fetch");
  });

  it("handles null/undefined/empty descriptions without crashing", () => {
    const { rerender } = render(
      <ProductDetailDescription {...defaultProps} resumen={"" as unknown as string} />
    );
    expect(document.body).toBeTruthy(); // no crash

    rerender(
      <ProductDetailDescription
        {...defaultProps}
        resumen={null as unknown as string}
      />
    );
    expect(document.body).toBeTruthy(); // no crash

    rerender(
      <ProductDetailDescription
        {...defaultProps}
        resumen={undefined as unknown as string}
      />
    );
    expect(document.body).toBeTruthy(); // no crash
  });

  it("preserves allowed tags like table, img, a", async () => {
    const html =
      '<p>See <a href="https://example.com">this link</a></p>' +
      '<table><tr><td>Cell</td></tr></table>' +
      '<img src="image.jpg" />';
    render(
      <ProductDetailDescription {...defaultProps} resumen={html} />
    );
    const container = await screen.findByTestId("product-description");
    await waitFor(() => {
      expect(container.innerHTML).toContain("<table>");
    });
    expect(container.innerHTML).toContain('<a href="https://example.com">');
    expect(container.innerHTML).toContain('<img src="image.jpg">');
  });
});
