import {
  searchStations,
  getBookingDetails,
  getAllStations,
  rescheduleBooking,
} from "../api";

// Mock the setTimeout to speed up tests
jest.useFakeTimers();

describe("API Service", () => {
  beforeEach(() => {
    jest.clearAllTimers();
  });

  describe("searchStations", () => {
    it("returns filtered stations based on query", async () => {
      const promise = searchStations("Central");

      jest.runAllTimers();

      const result = await promise;

      expect(result).toHaveLength(1);
      expect(result[0].name).toBe("Central Station");
    });

    it("returns empty array for no matches", async () => {
      const promise = searchStations("NonExistent");

      jest.runAllTimers();

      const result = await promise;

      expect(result).toHaveLength(0);
    });

    it("searches by location as well", async () => {
      const promise = searchStations("Downtown");

      jest.runAllTimers();

      const result = await promise;

      expect(result).toHaveLength(1);
      expect(result[0].location).toBe("Downtown");
    });
  });

  describe("getBookingDetails", () => {
    it("returns booking details for valid ID", async () => {
      const promise = getBookingDetails("1");

      jest.runAllTimers();

      const result = await promise;

      expect(result).toBeTruthy();
      expect(result?.id).toBe("1");
      expect(result?.customerName).toBe("John Smith");
    });

    it("returns null for invalid ID", async () => {
      const promise = getBookingDetails("999");

      jest.runAllTimers();

      const result = await promise;

      expect(result).toBeNull();
    });
  });

  describe("getAllStations", () => {
    it("returns all stations", async () => {
      const promise = getAllStations();

      jest.runAllTimers();

      const result = await promise;

      expect(result).toHaveLength(12);
      expect(result[0].name).toBe("Central Station");
      expect(result[1].name).toBe("Airport Station");
    });
  });
});
