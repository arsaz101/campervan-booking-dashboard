import React from "react";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import Autocomplete from "../Autocomplete";

// Mock data
const mockStations = [
  { id: "1", name: "Central Station", location: "Downtown" },
  { id: "2", name: "Airport Station", location: "Airport Terminal" },
  { id: "3", name: "Beach Station", location: "Coastal Area" },
];

const mockSearchFunction = jest.fn();

describe("Autocomplete", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("renders with placeholder text", () => {
    render(
      <Autocomplete
        placeholder="Search stations..."
        onSearch={mockSearchFunction}
        onSelect={jest.fn()}
        displayKey="name"
        valueKey="id"
      />
    );

    expect(
      screen.getByPlaceholderText("Search stations...")
    ).toBeInTheDocument();
  });

  it("calls onSearch when user types", async () => {
    mockSearchFunction.mockResolvedValue(mockStations);

    render(
      <Autocomplete
        placeholder="Search stations..."
        onSearch={mockSearchFunction}
        onSelect={jest.fn()}
        displayKey="name"
        valueKey="id"
      />
    );

    const input = screen.getByPlaceholderText("Search stations...");
    fireEvent.change(input, { target: { value: "Central" } });

    await waitFor(() => {
      expect(mockSearchFunction).toHaveBeenCalledWith("Central");
    });
  });

  it("displays search results", async () => {
    mockSearchFunction.mockResolvedValue(mockStations);

    render(
      <Autocomplete
        placeholder="Search stations..."
        onSearch={mockSearchFunction}
        onSelect={jest.fn()}
        displayKey="name"
        valueKey="id"
      />
    );

    const input = screen.getByPlaceholderText("Search stations...");
    fireEvent.change(input, { target: { value: "Station" } });

    await waitFor(() => {
      expect(screen.getByText("Central Station")).toBeInTheDocument();
      expect(screen.getByText("Airport Station")).toBeInTheDocument();
      expect(screen.getByText("Beach Station")).toBeInTheDocument();
    });
  });

  it("calls onSelect when an item is clicked", async () => {
    const mockOnSelect = jest.fn();
    mockSearchFunction.mockResolvedValue(mockStations);

    render(
      <Autocomplete
        placeholder="Search stations..."
        onSearch={mockSearchFunction}
        onSelect={mockOnSelect}
        displayKey="name"
        valueKey="id"
      />
    );

    const input = screen.getByPlaceholderText("Search stations...");
    fireEvent.change(input, { target: { value: "Central" } });

    await waitFor(() => {
      const centralStation = screen.getByText("Central Station");
      fireEvent.click(centralStation);
    });

    expect(mockOnSelect).toHaveBeenCalledWith(mockStations[0]);
  });

  it("debounces search calls", async () => {
    mockSearchFunction.mockResolvedValue([]);

    render(
      <Autocomplete
        placeholder="Search stations..."
        onSearch={mockSearchFunction}
        onSelect={jest.fn()}
        displayKey="name"
        valueKey="id"
      />
    );

    const input = screen.getByPlaceholderText("Search stations...");

    // Type multiple characters quickly
    fireEvent.change(input, { target: { value: "C" } });
    fireEvent.change(input, { target: { value: "Ce" } });
    fireEvent.change(input, { target: { value: "Cen" } });

    await waitFor(() => {
      expect(mockSearchFunction).toHaveBeenCalledTimes(1);
      expect(mockSearchFunction).toHaveBeenCalledWith("Cen");
    });
  });

  it("does not search for queries less than 2 characters", async () => {
    render(
      <Autocomplete
        placeholder="Search stations..."
        onSearch={mockSearchFunction}
        onSelect={jest.fn()}
        displayKey="name"
        valueKey="id"
      />
    );

    const input = screen.getByPlaceholderText("Search stations...");
    fireEvent.change(input, { target: { value: "C" } });

    await waitFor(() => {
      expect(mockSearchFunction).not.toHaveBeenCalled();
    });
  });
});
