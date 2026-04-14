import { useState, useRef } from "react";
import { DoublyLinkedList } from "../core/DoublyLinkedList";

export function useDoublyLinkedList<T>(initialValues: T[] = []) {
  const ddlRef = useRef(new DoublyLinkedList<T>());
  const [state, setState] = useState({
    nodes: ddlRef.current.getNodes(),
    head: ddlRef.current.head?.value ?? null,
    tail: ddlRef.current.tail?.value ?? null,
    size: ddlRef.current.size,
  });

  // Initialize with initial values
  // Only runs on first mount
  if (ddlRef.current.size === 0 && initialValues.length > 0) {
    initialValues.forEach((v) => ddlRef.current.insertTail(v));
    setState({
      nodes: ddlRef.current.getNodes(),
      head: ddlRef.current.head?.value ?? null,
      tail: ddlRef.current.tail?.value ?? null,
      size: ddlRef.current.size,
    });
  }

  const updateState = () => {
    setState({
      nodes: ddlRef.current.getNodes(),
      head: ddlRef.current.head?.value ?? null,
      tail: ddlRef.current.tail?.value ?? null,
      size: ddlRef.current.size,
    });
  };

  const insertHead = (value: T) => {
    ddlRef.current.insertHead(value);
    updateState();
  };

  const insertTail = (value: T) => {
    ddlRef.current.insertTail(value);
    updateState();
  };

  const removeByIndex = (index: number) => {
    ddlRef.current.removeByIndex(index);
    updateState();
  };

  const removeByValue = (value: T) => {
    ddlRef.current.removeByValue(value);
    updateState();
  };

  const removeDuplicates = () => {
    ddlRef.current.removeDuplicates();
    updateState();
  };

  const search = (value: T): number | null => {
    return ddlRef.current.search(value);
  };

  return {
    state,
    insertHead,
    insertTail,
    removeByIndex,
    removeByValue,
    removeDuplicates,
    search,
  };
}
