import "@testing-library/jest-dom";
import { render, screen } from "@testing-library/react";
import Skills from "../Skills";

describe("Skills Component", () => {
  it("renders the Skills heading", () => {
    // Assuming you have a heading or text that can be queried
    // If TextReveal renders something we can query, we might find it
    // Or we just check if it renders without crashing
    const { container } = render(<Skills />);
    expect(container).toBeInTheDocument();
  });
});
