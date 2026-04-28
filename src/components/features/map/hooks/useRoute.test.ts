import { renderHook } from "@testing-library/react";
import { useRoute } from "./useRoute";
import { getRoute } from "../model/route";

jest.mock("../model/route", () => ({
  getRoute: jest.fn(),
}));

describe("useRoute", () => {
  it("does not call API if endPoint is null", () => {
    renderHook(() => useRoute({ lat: 1, lng: 1 }, null));

    expect(getRoute).not.toHaveBeenCalled();
  });

  it("calls API when both points exist", async () => {
    (getRoute as jest.Mock).mockResolvedValue([
      [1, 1],
      [2, 2],
    ]);

    renderHook(() => useRoute({ lat: 1, lng: 1 }, { lat: 2, lng: 2 }));

    expect(getRoute).toHaveBeenCalled();
  });
});
