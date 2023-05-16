import { vi } from "vitest";
import { useStore } from "./store";
import { useEffect } from "react";

vi.mock("zustand");

function TestComponent({ selector, effect }) {
  const items = useStore(selector);

  useEffect(() => effect(items), [items]);

  return null;
}
