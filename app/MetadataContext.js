"use client"
import React, { createContext, useContext } from 'react';

const MetadataContext = createContext();

export function useMetadata() {
  return useContext(MetadataContext);
}

export function MetadataProvider({ children, metadata }) {
  return (
    <MetadataContext.Provider value={metadata}>
      {children}
    </MetadataContext.Provider>
  );
}