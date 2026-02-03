import "@testing-library/jest-dom";

// Mock Next.js router
jest.mock("next/navigation", () => ({
  useRouter: () => ({
    push: jest.fn(),
    replace: jest.fn(),
    prefetch: jest.fn(),
    back: jest.fn(),
  }),
  useSearchParams: () => new URLSearchParams(),
  usePathname: () => "/",
}));

// Mock Next.js Link component
jest.mock("next/link", () => {
  const MockLink = ({ children, href, ...props }) => {
    return <a href={href} {...props}>{children}</a>;
  };
  MockLink.displayName = "MockLink";
  return MockLink;
});
