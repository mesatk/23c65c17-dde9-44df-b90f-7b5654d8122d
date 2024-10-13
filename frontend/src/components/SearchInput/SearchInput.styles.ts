// SearchInput.styles.ts
import { CSSProperties } from "react";

export const searchInputStyle: CSSProperties = {
  top: 0,
  left: 0,
  width: "600px",
  marginBottom: 16,
  zIndex: 1000, // Üstte kalmasını sağlamak için
};

export const containerStyle: CSSProperties = {
  marginTop: "60px", // SearchInput altında boşluk bırakmak için
};
